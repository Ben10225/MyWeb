<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  counter: Number,
});

const ct = ref(0);
const firstBrownGrowRight = ref(false);
const firstBrownGrowMid = ref(false);
const firstBrownBackToLeft = ref(false);
const secondBrownGrowMid = ref(false);
const secondBrownGrowRight = ref(false);
const whiteGrowMid = ref(false);
const whiteGrowRight = ref(false);
const firstBrownShow = ref(true);
const whiteShow = ref(true);
const secondBrownShow = ref(true);
const stopClick = ref(false);
const zStatus = ref("down");

const backgroundChangeHandler = () => {
  if (stopClick.value) return;
  ct.value++;
  stopClick.value = true;
  if (ct.value % 4 === 1) {
    firstBrownGrowRight.value = true;
    firstBrownGrowMid.value = false;
    whiteShow.value = true;
    setTimeout(() => {
      whiteGrowMid.value = true;
    }, 150);
  } else if (ct.value % 4 === 2) {
    whiteGrowRight.value = true;
    whiteGrowMid.value = false;
    secondBrownShow.value = true;
    setTimeout(() => {
      secondBrownGrowMid.value = true;
    }, 150);
    setTimeout(() => {
      firstBrownShow.value = false;
      whiteShow.value = false;
      firstBrownGrowRight.value = false;
      firstBrownBackToLeft.value = true;
      whiteGrowRight.value = false;
      zStatus.value = "up";
    }, 1150);
  } else if (ct.value % 4 === 3) {
    firstBrownShow.value = true;
    whiteShow.value = true;
    secondBrownGrowRight.value = true;
    secondBrownGrowMid.value = false;
    setTimeout(() => {
      whiteGrowMid.value = true;
      zStatus.value = "up";
    }, 150);
  } else {
    whiteGrowRight.value = true;
    whiteGrowMid.value = false;
    setTimeout(() => {
      firstBrownGrowMid.value = true;
    }, 150);
    setTimeout(() => {
      whiteShow.value = false;
      whiteGrowRight.value = false;
      secondBrownShow.value = false;
      secondBrownGrowRight.value = false;
      zStatus.value = "down";
    }, 1150);
  }
  setTimeout(() => {
    stopClick.value = false;
  }, 1200);
};

const zIndexFirstBrownHandler = computed(() => {
  return zStatus.value === "down" ? 1 : 5;
});

const zIndexWhiteHandler = computed(() => {
  return zStatus.value === "down" ? 1 : 3;
});

watch(props, (nV, oV) => {
  backgroundChangeHandler();
});
</script>

<template>
  <div class="bg-change-wrapper">
    <div
      v-show="firstBrownShow"
      class="brown-block color-block"
      :class="{
        'grow-to-mid': firstBrownGrowMid,
        'grow-to-right': firstBrownGrowRight,
        'back-to-left': firstBrownBackToLeft,
      }"
      :style="{ 'z-index': zIndexFirstBrownHandler }"
    ></div>
    <div
      v-show="whiteShow"
      class="white-block color-block back-to-left"
      :class="{
        'grow-to-mid': whiteGrowMid,
        'grow-to-right': whiteGrowRight,
      }"
      :style="{ 'z-index': zIndexWhiteHandler }"
    ></div>
    <div
      v-show="secondBrownShow"
      class="brown-block color-block back-to-left second-brown"
      :class="{
        'grow-to-mid': secondBrownGrowMid,
        'grow-to-right': secondBrownGrowRight,
      }"
    ></div>
  </div>
</template>

<style>
.color-block {
  width: 600px;
  height: 100%;
  position: absolute;
  left: -520px;
  transition: 1s;
}
.brown-block {
  background-color: #f5ede0;
}
.white-block {
  background-color: #ffffff;
  z-index: 1;
}
.back-to-left {
  width: 0px;
}
.grow-to-right {
  width: 115vw;
}
.grow-to-mid {
  width: 600px;
}
.second-brown {
  z-index: 2;
}
</style>
