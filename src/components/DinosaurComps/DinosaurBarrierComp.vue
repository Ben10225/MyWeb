<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["checkDino"]);
const stage = ref(0);
const cactusOneLeft = ref(-10);
const cactusThreeLeft = ref(-20);
const bricksLeft = ref(-15);
const cactusChoose = ref(2);
const speed = ref(0.5);
const brickSpeed = ref(0);
const bricksMaxRange = ref(93);
const oneTurnEnd = ref(false);
const brickRunning = ref(false);
const brickGenerate = ref(true);
const brick2Generate = ref(false);

const cactusNormalLefting = () => {
  if (stage.value < 3) {
    stageEasy();
  } else if (stage.value < 7) {
    stageMedium();
  } else {
    stageHard();
  }
  if (oneTurnEnd.value) {
    if (stage.value < 3) {
      speed.value = 0.5 + Math.random() * 0.2;
    } else if (stage.value < 7) {
      speed.value = 0.5 + Math.random() * 0.2;
    } else if (stage.value < 13) {
      speed.value = 0.5 + Math.random() * 0.2;
      cactusChoose.value = Math.floor(Math.random() * 2) + 1;
    } else if (stage.value < 17) {
      speed.value = 0.55 + Math.random() * 0.1;
      cactusChoose.value = Math.floor(Math.random() * 2) + 1;
    } else {
      speed.value = 0.65 + Math.random() * 0.2;
      cactusChoose.value = Math.floor(Math.random() * 2) + 1;
    }
    oneTurnEnd.value = false;
    stage.value++;
  }
};

const stageEasy = () => {
  cactusOneLeft.value += speed.value;
  if (cactusOneLeft.value >= 82 && cactusOneLeft.value <= 92) {
    if (cactusOneLeft.value <= 86 || cactusOneLeft.value >= 88) {
      emit("checkDino", "side");
    } else {
      emit("checkDino", "center");
    }
  }
  if (cactusOneLeft.value > 120) {
    oneTurnEnd.value = true;
    cactusOneLeft.value = -10;
    if (stage.value < 17) {
      brickGenerate.value = Math.random() > 0.67;
    } else {
      brickGenerate.value = Math.random() > 0.33;
    }
  }
};

const stageMedium = () => {
  if (cactusChoose.value === 1) {
    stageEasy();
    return;
  }
  cactusThreeLeft.value += speed.value;
  if (cactusThreeLeft.value >= 73 && cactusThreeLeft.value <= 91) {
    emit("checkDino", "threeCactus");
  }
  if (cactusThreeLeft.value > 120) {
    oneTurnEnd.value = true;
    cactusThreeLeft.value = -17;
    if (stage.value < 20) {
      brickGenerate.value = Math.random() > 0.67;
    } else {
      brickGenerate.value = Math.random() > 0.33;
    }
  }
};

const stageHard = () => {
  stageMedium();
  if (
    (cactusOneLeft.value > 50 || cactusThreeLeft.value > 45) &&
    !brickRunning.value &&
    brickGenerate.value
  ) {
    brickRunning.value = true;
    brickSpeed.value = speed.value;
    if (stage.value >= 17) {
      brick2Generate.value = Math.random() >= 0.5;
      if (brick2Generate.value) {
        bricksMaxRange.value = 102;
      } else {
        bricksMaxRange.value = 93;
      }
    }
  }
  if (brickRunning.value) {
    bricksLeft.value += brickSpeed.value;
    if (bricksLeft.value >= 81 && bricksLeft.value <= bricksMaxRange.value) {
      emit("checkDino", "squat");
    }
    if (bricksLeft.value > 120) {
      bricksLeft.value = -15;
      brickRunning.value = false;
      brick2Generate.value = false;
    }
  }
};

const getBrickLeft2 = computed(() => {
  return stage.value >= 17 && brick2Generate.value
    ? bricksLeft.value - 10
    : -25;
});

const reset = () => {
  cactusOneLeft.value = -10;
  cactusThreeLeft.value = -20;
  bricksLeft.value = -15;
  speed.value = 0.5;
  stage.value = 0;
  bricksMaxRange.value = 93;
  cactusChoose.value = 2;
  brickRunning.value = false;
  brickGenerate.value = true;
  brick2Generate.value = false;
  oneTurnEnd.value = false;
};

defineExpose({
  cactusNormalLefting,
  reset,
});
</script>

<template>
  <div class="barrier-wrapper">
    <div class="cactus1-outter">
      <img
        class="cactus-1"
        :style="{ right: `${cactusOneLeft}%` }"
        src="/cactus-1.png"
        alt=""
      />
    </div>
    <div class="cactus3-outter">
      <img
        class="cactus-3"
        :style="{ right: `${cactusThreeLeft}%` }"
        src="/cactus-3.png"
        alt=""
      />
    </div>
    <div class="bricks-outter" :style="{ right: `${bricksLeft}%` }">
      <div class="brick"></div>
      <div class="brick"></div>
      <div class="brick"></div>
    </div>
    <div class="bricks-outter" :style="{ right: `${getBrickLeft2}%` }">
      <div class="brick"></div>
      <div class="brick"></div>
      <div class="brick"></div>
    </div>
  </div>
</template>

<style scoped>
.barrier-wrapper {
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
.cactus-3 {
  position: absolute;
  width: 140px;
  top: -123px;
  opacity: 0.7;
}
.bricks-outter {
  position: absolute;
  width: 50px;
  top: -190px;
  opacity: 0.7;
}
.brick {
  position: relative;
  width: 40px;
  height: 40px;
  background-image: url("/brick.png");
  background-repeat: no-repeat;
  background-size: 122%;
  background-position: center;
}
</style>
