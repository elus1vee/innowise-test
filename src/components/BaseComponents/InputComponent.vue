<template>
  <div>
    <div class="label" v-if="label">{{ label }}</div>
    <input
      class="input"
      type="number"
      :value="modelValue"
      @input="updateValue"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
const emit = defineEmits(["update:modelValue"]);

defineProps<{
  modelValue: number;
  label?: string;
  disabled?: boolean;
}>();

const updateValue = (event: any) => {
  emit("update:modelValue", Number(event.target.value));
};
</script>

<style lang="scss">
@import "/src/style/mixins.scss";

.label {
  font-weight: 800;
  font-size: 18px;
  text-transform: uppercase;

  @include responsive(sm) {
    font-size: 16px;
  }
}

.input {
  max-width: 200px;
  font-size: 18px;
  line-height: 21px;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #e0e2db;

  &:focus {
    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.75);
    outline: none;
    border-width: 1px;
  }

  @include responsive(sm) {
    font-size: 16px;
    line-height: 19px;
  }
}
</style>
