<script setup>
import { ref } from "vue";
import { random } from "lodash-es";

const stop = ref(false);
const tmpTop = ref(15);

const clouds = ref([
  { id: 1, left: 50, width: 100, top: 25, opacity: 0.5, speed: 1.2 },
  { id: 2, left: 300, width: 120, top: 95, opacity: 0.7, speed: 1.2 },
  { id: 3, left: 550, width: 113, top: 45, opacity: 0.9, speed: 1.2 },
  { id: 4, left: 790, width: 105, top: 115, opacity: 0.4, speed: 1.2 },

  // { id: 1, left: 50, width: 90, top: 25, opacity: 0.5, speed: 1.2 },
  // { id: 2, left: 250, width: 97, top: 75, opacity: 0.7, speed: 1.2 },
  // { id: 3, left: 450, width: 110, top: 55, opacity: 0.9, speed: 1.2 },
  // { id: 4, left: 650, width: 105, top: 95, opacity: 0.4, speed: 1.2 },
]);

const cloudLefting = () => {
  if (stop.value) return;
  clouds.value.forEach((c) => {
    c.left -= c.speed;
    let newTop = random(3, 130);
    if (c.left < -120) {
      while (Math.abs(newTop - tmpTop.value) <= 35) {
        // newTop = random(3, 110);
        newTop = random(3, 120);
      }
      // c.left = 690;
      c.left = 880;
      c.top = newTop;
      c.opacity = 0.3 + Math.random() * 0.7;
      c.speed = Math.random() * (1.2 - 1.15) + 1.15;
      tmpTop.value = newTop;
      // c.width = Math.floor(Math.random() * (110 - 90 + 1)) + 90;
      Math.floor(Math.random() * (121 - 100 + 1)) + 100;
    }
  });
};

const stopClouds = () => {
  stop.value = true;
};

const startClouds = () => {
  stop.value = false;
};

const reset = () => {
  stop.value = false;
};

defineExpose({
  cloudLefting,
  stopClouds,
  startClouds,
  reset,
});
</script>

<template>
  <div class="clouds-block">
    <div
      v-for="c of clouds"
      :key="c.id"
      class="cloud"
      :style="{
        left: `${c.left}px`,
        width: `${c.width}px`,
        top: `${c.top}px`,
        opacity: c.opacity,
      }"
    >
      <img src="/cloud.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.clouds-block {
  position: absolute;
  width: 100%;
}
.cloud {
  position: absolute;
  width: 150px;
}
.cloud img {
  width: inherit;
}
</style>
