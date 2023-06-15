<script setup>
import Dino from "@/components/DinosaurComps/DinosaurDinoComp.vue";
import Clouds from "@/components/DinosaurComps/DinosaurCloudsComp.vue";
import CactusApp from "@/components/DinosaurComps/DinosaurCactusAppComp.vue";
import CactusNormal from "@/components/DinosaurComps/DinosaurCactusNormalComp.vue";
import Bricks from "@/components/DinosaurComps/DinosaurBricksComp.vue";
import Answer from "@/components/DinosaurComps/DinosaurAnswerComp.vue";
import AllAnswerPage from "@/components/DinosaurComps/DinosaurAllAnswerPageComp.vue";
import ansData from "@/components/DinosaurComps/answer";
import { useDinosaurStore } from "@/stores/distanceStore.js";
import { ref, watchEffect, onMounted, onUnmounted } from "vue";

const store = useDinosaurStore();

const dino = ref(null);
const clouds = ref(null);
const cactusApp = ref(null);
const cactusNormal = ref(null);
const bricks = ref(null);
const answer = ref(null);
const allAnswerPage = ref(null);
const timer = ref(null);
const jumpStatus = ref(false);
const stopForward = ref(false);
const answerShow = ref(false);
const mode = ref("beforeStart");
const gameMode = ref("");
const speed = ref(2);
const nowQuestion = ref(0);
const qsLength = ref(ansData.answer.length);

const pressUp = (e) => {
  if (answerShow.value) return;
  if (e.keyCode === 38 && !jumpStatus.value) {
    jumpStatus.value = true;
    /* application */
    if (gameMode.value === "application") {
      store.walking = false;
      const brickLeftPx = bricks.value.brickNowLeft();
      // if (brickLeftPx <= 350) {
      if (brickLeftPx <= 445) {
        bricks.value.brickTouch();
        if (mode.value !== "final") {
          bricks.value.pngBlockShow();
          bricks.value.QMarkHide();
          answer.value.ansShow();
          answerShow.value = true;
        } else {
          mode.value = "settlement";
        }
        setTimeout(() => {
          clouds.value.stopClouds();
        }, 1100);
      }
      dino.value.appDinoJump();
    }
    if (gameMode.value === "normal") {
      dino.value.normalDinoJump();
    }
  }
};

const pressRight = (e) => {
  if (gameMode.value === "normal") return;
  if (answerShow.value) {
    store.walking = false;
    store.stillPressRight = false;
    return;
  }
  if (e.keyCode === 39 && !jumpStatus.value) {
    store.walking = true;
    store.stillPressRight = true;
  }
};

const stopRight = (e) => {
  if (e.keyCode === 39) {
    store.walking = false;
    store.stillPressRight = false;
  }
};

const pressDown = (e) => {
  if (e.keyCode === 40) {
    dino.value.normalDinoSquat();
  }
};

const keyDownHandler = (e) => {
  if (mode.value === "beforeStart" || mode.value === "settlement") return;
  pressUp(e);
  pressRight(e);
  pressDown(e);
};

const keyUpHandler = (e) => {
  if (mode.value === "beforeStart" || mode.value === "settlement") return;
  stopRight(e);
};

const stopForwardHandler = (res) => {
  stopForward.value = res;
};

const answerRemoveHandler = (res) => {
  answerShow.value = false;
  clouds.value.startClouds();
  bricks.value.exchangeToBreakBrick();
};

const touchFinalHandler = (res) => {
  mode.value = "final";
  store.walking = false;
  store.stillPressRight = false;
  clouds.value.stopClouds();
  clearInterval(timer.value);
  setTimeout(() => {
    allAnswerPage.value.touchFinal();
  }, 600);
};

const nowQuestionPlusHandler = (res) => {
  nowQuestion.value = res;
  if (nowQuestion.value === qsLength.value) mode.value = "final";
};

const restartGameHandler = (res) => {
  mode.value = "beforeStart";
  store.distance = 50;
  stopForward.value = false;
  answerShow.value = false;
  store.walking = false;
  store.stillPressRight = false;
  nowQuestion.value = 0;
  bricks.value.clearBricks();
  cactusApp.value.clearCactus();
  // document.querySelector(".h4-block").classList.remove("hide");
};

const checkDinoHeightHandler = (res) => {
  let dinoHeight = dino.value.getDinoHeight();
  let target;
  if (res === "center") {
    target = -95;
  } else if (res === "side") {
    target = -40;
  }
  if (dinoHeight > target) {
    store.pauseJump = true;
    store.walking = false;
    clouds.value.stopClouds();
    clearInterval(timer.value);
  }
};

const jumpStatusFalseHandler = (res) => {
  jumpStatus.value = res;
};

const intervalFn = () => {
  clouds.value.cloudLefting();
  /* normal */
  if (gameMode.value === "normal") {
    cactusNormal.value.cactusNormalLefting();
    return;
  }

  /* application */
  if (store.walking) {
    // if (distance.value <= 300) {
    if (store.distance <= 390) {
      store.distance += speed.value;
    } else {
      if (!stopForward.value) {
        cactusApp.value.cactusLefting(speed.value);
        bricks.value.brickLefting(speed.value);
      }
    }
  }
};

const startAppGameHandler = () => {
  timer.value = setInterval(intervalFn, 10);
  gameMode.value = "application";
  mode.value = "appStart";
  bricks.value.reset();
  cactusApp.value.reset();
  answer.value.reset();
  clouds.value.reset();
  // document.querySelector(".h4-block").classList.add("hide");
};

const startNormalGameHandler = () => {
  timer.value = setInterval(intervalFn, 10);
  clouds.value.reset();
  gameMode.value = "normal";
  mode.value = "normalStart";
  store.walking = true;
  // document.querySelector(".h4-block").classList.add("hide");
};

watchEffect(() => {
  if (store.walking) {
    if (gameMode.value === "application") {
      dino.value.appDinoRun();
    } else {
      dino.value.normalDinoRun();
    }
  }
});

onMounted(() => window.addEventListener("keydown", keyDownHandler));
onMounted(() => window.addEventListener("keyup", keyUpHandler));
onUnmounted(() => window.removeEventListener("keydown", keyDownHandler));
onUnmounted(() => window.addEventListener("keyup", keyUpHandler));

const testNormalHandler = () => {
  timer.value = setInterval(intervalFn, 10);
  cactusNormal.value.reset();
  clouds.value.reset();
  gameMode.value = "normal";
  mode.value = "normalStart";
  store.walking = true;
  // document.querySelector(".h4-block").classList.add("hide");

  store.pauseJump = false;
};
</script>

<template>
  <button class="test" @click="testNormalHandler">test</button>
  <div class="dinosaur-wrapper">
    <div class="title-block"></div>
    <div class="game-block">
      <!-- <div class="normal-game"></div> -->
      <div class="application">
        <div class="bg"></div>
        <Clouds ref="clouds" />
        <CactusApp ref="cactusApp" />
        <CactusNormal
          ref="cactusNormal"
          @check-dino-height="checkDinoHeightHandler"
        />
        <Answer ref="answer" @answer-remove="answerRemoveHandler" />
        <AllAnswerPage ref="allAnswerPage" @restart-game="restartGameHandler" />
        <Bricks
          ref="bricks"
          @stop-forward="stopForwardHandler"
          @png-reset="pngResetHandler"
          @touch-final="touchFinalHandler"
          @now-question-plus="nowQuestionPlusHandler"
        />
        <Dino
          ref="dino"
          :game-mode="gameMode"
          @jump-status-false="jumpStatusFalseHandler"
        />
        <hr />
      </div>
      <div class="h4-block" ref="startBtn">
        <h4
          v-if="mode === 'beforeStart'"
          @click.right.prevent="startAppGameHandler"
          @click="startNormalGameHandler"
        >
          點擊開始遊戲
        </h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test {
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 10%;
  z-index: 300;
}
.dinosaur-wrapper {
  width: 100%;
  height: 100%;
  background-color: #f5ede0;
  position: relative;
}
.title-block {
  position: absolute;
}
.title-block h1 {
  color: #333;
  font-size: 40px;
  font-weight: 700;
}
.game-block {
  position: relative;
  /* width: 650px; */
  width: 850px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.application {
  position: relative;
  /* height: 400px; */
  height: 500px;
  overflow: hidden;
  /* border: 1px solid #000; */
}
.application .bg {
  width: 100%;
  background-color: #ffffff;
  height: inherit;
  position: absolute;
}
hr {
  width: 100%;
  position: absolute;
  /* bottom: 23px; */
  bottom: 30px;
  opacity: 0.5;
  z-index: 45;
}
.h4-block {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
h4 {
  font-size: 32px;
  color: #555;
  font-family: "DotGothic16", sans-serif;
  letter-spacing: 0.02em;
  cursor: pointer;
  animation: blink 2s infinite steps(3);
  user-select: none;
}
.hide {
  display: none;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
