<script setup>
import { ref } from "vue";

const emit = defineEmits(["checkDinoHeight"]);
const cactusOneLeft = ref(-10);
const speed = ref(0.5);

const cactusNormalLefting = () => {
  cactusOneLeft.value += speed.value;
  if (cactusOneLeft.value >= 82 && cactusOneLeft.value <= 94) {
    emit("checkDinoHeight", true);
  } else if (cactusOneLeft.value > 120) {
    cactusOneLeft.value = -10;
    speed.value *= 1.05;
  }
};

defineExpose({
  cactusNormalLefting,
});
</script>

<template>
  <div class="cactus-normal-wrapper">
    <div class="cactus-outter">
      <img :style="{ right: `${cactusOneLeft}%` }" src="/cactus-1.png" alt="" />
      <!-- <img src="/cactus-1.png" alt="" /> -->
    </div>
  </div>
</template>

<style scoped>
.cactus-normal-wrapper {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 30;
  border: 1px solid #000;
}
img {
  position: absolute;
  width: 43px;
  top: -103px;
  border: 1px solid #000;
}
</style>
