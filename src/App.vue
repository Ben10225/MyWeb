<script setup>
import { RouterLink, RouterView } from "vue-router";
import LogoName from "./components/LogoNameComp.vue";
import { useData } from "./stores/dataStore";
const store = useData();
</script>

<template>
  <div class="wrapper">
    <div class="left-wrapper">
      <LogoName class="logo" />
      <ul class="links-wrapper">
        <RouterLink
          v-for="l of store.links"
          :key="l.id"
          class="link-text"
          :to="l.link"
        >
          <div class="title">{{ l.content }}</div>
          <div class="solo">{{ l.content[0] }}</div></RouterLink
        >
      </ul>
    </div>
    <div class="right-wrapper">
      <RouterView />
      <!-- <footer></footer> -->
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  /* background-color: red; */
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
  color: #444;
  list-style-type: none;
  cursor: pointer;
  padding: 10px;
  opacity: 0.7;
  transition: 0.3s;
  display: block;
  text-decoration: none;
  padding-left: 55px;
  transform: scale(1);
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0);
  position: relative;
}
.title {
  font-size: 20px;
  font-weight: 600;
  transition: 0.3s;
}
.link-text:hover {
  background-color: #f1bf0a;
}
.link-text:hover .title {
  color: #fff;
  opacity: 1;
  transform: scale(1.1);
  transform-origin: 50px 42px;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
}
.right-wrapper {
  margin-left: 345px;
  width: 100%;
  height: 100vh;
}
.logo {
  /* position: relative; */
  margin-top: 0;
}
.solo {
  color: #444;
  font-size: 30px;
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
  padding-right: 25px;
  display: none;
  transition: all 0s;
}
@media (max-height: 800px) {
  .logo {
    margin-top: -50px;
    /* transform: scale(0.9); */
  }
}
@media (max-width: 1400px) {
  .left-wrapper {
    width: 220px;
  }
  .right-wrapper {
    margin-left: 220px;
  }
  .logo {
    margin-left: 100px;
  }
  .link-text {
    padding-left: 45px;
  }
}
@media (max-width: 1200px) {
  .left-wrapper {
    width: 40px;
    transition: 0.4s;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  }
  .left-wrapper:hover {
    width: 140px;
  }
  .left-wrapper:hover .solo {
    display: none;
  }
  .left-wrapper:hover .link-text .title {
    opacity: 1;
    visibility: visible;
  }
  .right-wrapper {
    margin-left: 10px;
  }
  .logo {
    display: none;
  }
  .link-text {
    padding-left: 15px;
  }
  .title {
    opacity: 0;
    visibility: hidden;
    font-size: 18px;
    font-weight: 500;
  }
  .solo {
    display: block;
    left: 10px;
  }
}
@media (max-width: 600px) {
  .left-wrapper {
    width: 100%;
    height: 30px;
    padding-left: 10px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  }
  .left-wrapper:hover {
    width: 100%;
  }
  .right-wrapper {
    margin-left: 0px;
  }
  .links-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }
  .link-text {
    display: inline;
    padding-left: 0px;
    color: #ffffff;
  }
  .link-text:hover .title {
    transform: scale(1);
    color: #000;
    text-shadow: none;
  }
  .link-text:hover {
    background-color: #ffc800;
  }
  .title {
    opacity: 1;
    visibility: visible;
    margin-top: -6px;
    font-weight: 600;
    font-size: 13px;
  }
  .solo {
    display: none;
  }
}
</style>
