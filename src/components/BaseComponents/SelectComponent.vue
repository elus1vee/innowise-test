<template>
  <div class="custom-select">
    <select v-model="selectedValue" @change="emitSelectedValue">
      <option value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="(option, index) in props.values"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";

interface Props {
  values: string[];
  defaultValue?: string;
  placeholder?: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);

const selectedValue = ref<string>(props.defaultValue || "");

const placeholder = props.placeholder || "Select an option";

const emitSelectedValue = () => {
  emits("update:modelValue", selectedValue.value);
};
</script>

<style scoped>
@import "/src/style/mixins.scss";

.custom-select select {
  appearance: none;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.custom-select select:focus {
  outline: none;
  border-color: #007bff;
}
</style>
