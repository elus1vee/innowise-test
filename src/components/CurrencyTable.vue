<template>
  <div class="styled-grid">
    <div v-for="(currencyCode, index) in Object.keys(data)" :key="index">
      <div class="cell">{{ data[currencyCode].code }}</div>
      <div class="cell">{{ data[currencyCode].value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, defineProps } from "vue";

interface CurrencyData {
  [currencyCode: string]: { code: string; value: number };
}

defineProps({
  data: {
    type: Object as PropType<CurrencyData>,
    required: true,
  },
});
</script>

<style scoped>
.styled-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px;
}

.header-cell,
.cell {
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
