<script setup>
import LogoAniComp from "./LogoAniComp.vue";
import { ref, computed } from "vue";

const canClick = ref(true);
const aniStart = ref(0);

const showAni = () => {
  canClick.value = false;
  aniStart.value++;
  setTimeout(() => {
    canClick.value = true;
  }, 6000);
};

const test = computed(() => {
  return !canClick;
});
</script>

<template>
  <div class="name-logo-wripper">
    <div class="white-square img-block">
      <LogoAniComp :ani="aniStart" />
    </div>
    <div class="white-square">
      <h5><i>Full Stack developer</i></h5>
      <h1 class="first-name" @click="showAni" :class="{ canClick: !canClick }">
        <span class="text-red text-bold">P</span>eng
      </h1>
      <h1 class="last-name" @click="showAni" :class="{ canClick: !canClick }">
        Hung-<span class="text-blue text-bold">L</span>un
      </h1>
    </div>
  </div>
</template>

<style scoped>
.name-logo-wripper {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
}
.white-square {
  width: 200px;
  height: 130px;
  border: rgba(255, 255, 255, 0.7) solid 2px;
  position: absolute;
  right: 65px;
  top: 70px;
}
.white-square.img-block {
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
}

h1 {
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  width: 250px;
  position: relative;
  letter-spacing: 0.1em;
  user-select: none;
  cursor: pointer;
  opacity: 1;
  transition: 0.3s;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
h1:hover {
  opacity: 0.5;
}
.first-name {
  font-size: 50px;
  bottom: -17px;
  right: 32px;
  display: inline;
}
.canClick {
  pointer-events: none;
}
.last-name {
  right: -4px;
  letter-spacing: 0.02em;
  bottom: 4px;
  display: inline;
}
h5 {
  color: #fff;
  font-size: 15px;
  position: absolute;
  bottom: -52px;
  right: 0;
  user-select: none;
}
.text-bold {
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}
.text-red {
  color: rgb(158, 26, 26);
}

.text-blue {
  color: rgb(26, 59, 158);
}
</style>
