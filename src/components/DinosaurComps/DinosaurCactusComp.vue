<script setup>
import { ref } from "vue";

const cactuses = ref([]);

const cactusLefting = (speed) => {
  cactuses.value.forEach((c) => {
    c.left -= speed - 1;
    if (c.left < -60) {
      c.left = 850;
    }
  });
};

const reset = () => {
  cactuses.value = [
    { id: 1, src: "/cactus-2.png", width: 50, left: 150 },
    { id: 2, src: "/cactus-3.png", width: 75, left: 560 },
  ];
};

const clearCactus = () => {
  cactuses.value = [];
};

defineExpose({
  cactusLefting,
  clearCactus,
  reset,
});
</script>

<template>
  <div class="cactus-block">
    <div
      v-for="c of cactuses"
      :key="c.id"
      class="cactus"
      :style="{ width: `${c.width}px`, left: `${c.left}px` }"
    >
      <img :src="c.src" alt="" />
    </div>
  </div>
</template>

<style scoped>
.cactus-block {
  position: absolute;
  width: 100%;
  bottom: 20%;
}
.cactus {
  position: absolute;
  opacity: 0.2;
}
.cactus img {
  width: inherit;
}
</style>
