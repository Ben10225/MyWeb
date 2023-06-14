<script setup>
import { ref } from "vue";

const emit = defineEmits(["checkDinoHeight"]);
const cactusOneLeft = ref(-20);
const speed = ref(0.5);

const cactusNormalLefting = () => {
  cactusOneLeft.value += speed.value;
  if (cactusOneLeft.value >= 82 && cactusOneLeft.value <= 92) {
    if (cactusOneLeft.value <= 86 || cactusOneLeft.value >= 88) {
      emit("checkDinoHeight", "side");
    } else {
      emit("checkDinoHeight", "center");
    }
  } else if (cactusOneLeft.value > 120) {
    cactusOneLeft.value = -10;

    // speed.value *= 1.05;
  }
};

const reset = () => {
  cactusOneLeft.value = -10;
  speed.value = 0.5;
};

defineExpose({
  cactusNormalLefting,
  reset,
});
</script>

<template>
  <div class="cactus-normal-wrapper">
    <div class="cactus-outter">
      <img
        class="cactus-1"
        :style="{ right: `${cactusOneLeft}%` }"
        src="/cactus-1.png"
        alt=""
      />
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
}
.cactus-1 {
  position: absolute;
  width: 44px;
  top: -118px;
  opacity: 0.7;
}
</style>
