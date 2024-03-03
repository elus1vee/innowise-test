<template>
  <div class="wrapper">
    <h1>RATE</h1>
    <div class="content">
      <div class="content__base-currency">
        <h2>Base Currency</h2>
        <SelectComponent
          :values="currencyList || []"
          v-model="baseCurrency"
          :defaultValue="baseCurrency"
          @change="updateUrlParams"
        />
      </div>
      <div class="content__table">
        <CurrencyTable
          v-if="allRatesForCurrency?.data"
          :data="allRatesForCurrency.data"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectComponent from "@/components/BaseComponents/SelectComponent.vue";
import CurrencyTable from "@/components/CurrencyTable.vue";
import { useCurrencyStore } from "@/store/currency";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useCurrencyStore();

const { currencyList, allRatesForCurrency } = storeToRefs(store);
const { fetchCurrencyList, fetchAllCurrenciesRates } = store;

const baseCurrency = ref<string>("USD");

const updateUrlParams = () => {
  fetchAllCurrenciesRates(baseCurrency.value);
  const params = new URLSearchParams();
  params.append("baseCurrency", baseCurrency.value);
  router.push({ query: Object.fromEntries(params) });
};

onBeforeMount(() => {
  fetchCurrencyList();
  const query = router.currentRoute.value.query;
  if (query.baseCurrency) {
    baseCurrency.value = query.baseCurrency.toString();
  } else {
    baseCurrency.value = "USD";
    updateUrlParams();
  }
  fetchAllCurrenciesRates(baseCurrency.value);
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

h1 {
  @include responsive(sm) {
    font-size: 20px;
  }
}

h2 {
  font-size: 18px;
  @include responsive(sm) {
    font-size: 16px;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &__base-currency {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-self: start;
  }

  &__table {
    width: 100%;
  }
}
</style>
