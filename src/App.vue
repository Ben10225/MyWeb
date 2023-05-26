<script setup>
import { RouterLink, RouterView } from "vue-router";
import LogoName from "./components/LogoNameComp.vue";
import { useData } from "./stores/dataStore";
const store = useData();
</script>

<template>
  <div class="wrapper">
    <div class="left-wrapper">
      <LogoName />
      <ul class="links-wrapper">
        <RouterLink
          v-for="l of store.links"
          :key="l.id"
          class="link-text"
          :to="l.link"
          >{{ l.content }}</RouterLink
        >
      </ul>
    </div>
    <div class="right-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}
.left-wrapper {
  background-color: #ffc800;
  width: 345px;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  z-index: 200;
}
.links-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.link-text {
  font-size: 20px;
  color: #444;
  list-style-type: none;
  cursor: pointer;
  padding: 10px;
  opacity: 0.7;
  transition: 0.3s;
  display: block;
  text-decoration: none;
  font-weight: 500;
  padding-left: 55px;
  transform: scale(1);
  transform-origin: 70px 42px;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0);
}
.link-text:hover {
  color: #fff;
  background-color: #f1bf0a;
  opacity: 1;
  transform: scale(1.1);
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
}
.right-wrapper {
  margin-left: 345px;
  width: 100%;
  height: 100vh;
}
</style>
