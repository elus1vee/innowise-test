<template>
  <div class="wrapper">
    <h1>CALCULATOR</h1>
    <div class="content">
      <div class="content__element">
        <SelectComponent
          :values="currencyList || []"
          v-model="currencyFrom"
          :defaultValue="currencyFrom"
          @change="selectHandler"
        />
        <InputComponent
          v-model="inputValueFrom"
          :label="currencyFrom"
          @input="inputHandler"
        />
      </div>
      <img src="../assets/svg/arrow.svg" width="39" height="39" />
      <div class="content__element">
        <InputComponent
          v-model="inputValueTo"
          :label="currencyTo"
          :disabled="true"
        />
        <SelectComponent
          :values="currencyList || []"
          v-model="currencyTo"
          :defaultValue="currencyTo"
          @change="selectHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputComponent from "@/components/BaseComponents/InputComponent.vue";
import SelectComponent from "@/components/BaseComponents/SelectComponent.vue";
import { useCurrencyStore } from "@/store/currency";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useCurrencyStore();

const { currencyList, currencyRateList } = storeToRefs(store);
const { fetchCurrencyList, fetchCurrencyRate } = store;

const inputValueFrom = ref<number>(0);
const currencyFrom = ref<string>("USD");
const currencyTo = ref<string>("EUR");
let timeout: ReturnType<typeof setTimeout> | null = null;

const currencyRate = computed(() => {
  return currencyRateList.value?.currencies.find(
    (item) => item.currency === currencyTo.value
  )?.value;
});
const inputValueTo = computed(() => {
  const rate = currencyRate.value;
  if (rate) {
    const result = inputValueFrom.value * rate;
    return roundToNonZero(result);
  } else {
    return 0;
  }
});

const updateUrlParams = () => {
  const params = new URLSearchParams();
  params.append("from", currencyFrom.value);
  params.append("amount", inputValueFrom.value.toString());
  params.append("to", currencyTo.value);
  router.push({ query: Object.fromEntries(params) });
};
const inputHandler = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    updateUrlParams();
    timeout = null;
  }, 1000);
};
const roundToNonZero = (value: number): number => {
  if (value === 0) return 0; // Если число равно 0, возвращаем 0
  const strValue = value.toString(); // Преобразуем число в строку
  const decimalIndex = strValue.indexOf("."); // Находим индекс точки
  if (decimalIndex !== -1) {
    let nonZeroCount = 0;
    for (let i = decimalIndex + 1; i < strValue.length; i++) {
      if (strValue[i] !== "0") {
        nonZeroCount++;
        if (nonZeroCount >= 2) {
          return parseFloat(value.toFixed(i - decimalIndex)); // Округляем число до i знака после запятой
        }
      }
    }
  }
  return value; // Возвращаем исходное число, если нет двух ненулевых цифр после запятой
};
const selectHandler = () => {
  fetchCurrencyRate(currencyFrom.value, currencyTo.value);
  updateUrlParams();
};

onBeforeMount(() => {
  fetchCurrencyList();
  const query = router.currentRoute.value.query;
  if (query.from && query.amount && query.to) {
    currencyFrom.value = query.from.toString();
    currencyTo.value = query.to.toString();
    inputValueFrom.value = Number(query.amount);
  } else {
    inputValueFrom.value = 0;
    updateUrlParams();
  }
  fetchCurrencyRate(currencyFrom.value, currencyTo.value);
});
</script>

<style lang="scss" scoped>
@import "/src/style/mixins.scss";
.wrapper {
  width: 60vw;
  max-width: 100%;
  margin: 0 auto;
  display: flex;

  @include responsive(sm) {
    width: 80vw;
  }
}
.content {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 50px;
  gap: 15px;

  @include responsive(sm) {
    margin-top: 25px;
    flex-wrap: wrap;
  }

  &__element {
    display: flex;
    align-items: flex-end;
    gap: 15px;
  }
}

h1 {
  @include responsive(sm) {
    font-size: 20px;
  }
}
</style>
