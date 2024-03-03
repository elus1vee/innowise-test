<template>
  <div class="wrapper">
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "./components/Widgets/HeaderComponent.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-spacing: 0;
}

html {
  font-size: 16px;
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}

.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}
</style>
