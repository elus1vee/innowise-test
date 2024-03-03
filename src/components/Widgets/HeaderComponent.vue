<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__logo">
        <RouterLink to="/">
          <img
            src="../../assets/currency.png"
            alt="logo"
            width="64"
            height="64"
          />
        </RouterLink>
      </div>
      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__link"><RouterLink to="/">HOME</RouterLink></li>
          <li class="header__link">
            <RouterLink to="/calculator">CALCULATOR</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style scoped lang="scss">
@import "/src/style/mixins.scss";

.header {
  background-color: #ffffff;
  color: #000000;
  padding: 10px 0;
  border-bottom: 1px solid #e0e2db;
  box-shadow: 0 8px 6px -6px #e0e2db;
  margin-bottom: 20px;

  a {
    color: #000000;
    text-decoration: none;
    font-weight: 800;
    font-size: 20px;

    @include responsive(sm) {
      font-size: 16px;
    }
  }
  a:hover {
    color: #e0e2db;
  }

  &__wrapper {
    width: 60vw;
    margin: 0 auto;
    max-width: 100%;
    display: flex;
    justify-content: space-between;

    @include responsive(sm) {
      width: 80vw;
    }
  }

  &__logo {
    img {
      cursor: pointer;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
  }
  &__list {
    list-style: none;
    display: flex;
    gap: 30px;
  }
  &__link {
    color: #ffffff;
  }
}
</style>
