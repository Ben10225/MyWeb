<script setup>
import Dino from "@/components/DinosaurComps/DinosaurDinoComp.vue";
import Clouds from "@/components/DinosaurComps/DinosaurCloudsComp.vue";
import Cactus from "@/components/DinosaurComps/DinosaurCactusComp.vue";
import Barrier from "@/components/DinosaurComps/DinosaurBarrierComp.vue";
import Bricks from "@/components/DinosaurComps/DinosaurBricksComp.vue";
import Answer from "@/components/DinosaurComps/DinosaurAnswerComp.vue";
import Checkout from "@/components/DinosaurComps/DinosaurCheckoutComp.vue";
import AllAnswerPage from "@/components/DinosaurComps/DinosaurAllAnswerPageComp.vue";
import Operation from "@/components/DinosaurComps/DinosaurOperationComp.vue";
import ansData from "@/components/DinosaurComps/answer";
import { useDinosaurStore } from "@/stores/dinosaurStore.js";
import { ref, watchEffect, onMounted, onUnmounted, computed } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const store = useDinosaurStore();
const dino = ref(null);
const clouds = ref(null);
const cactus = ref(null);
const barrier = ref(null);
const checkout = ref(null);
const bricks = ref(null);
const answer = ref(null);
const allAnswerPage = ref(null);
const operation = ref(null);
const jumpStatus = ref(false);
const stopForward = ref(false);
const answerShow = ref(false);
const mode = ref("beforeStart");
const gameMode = ref("");
const speed = ref(2);
const nowQuestion = ref(0);
const score = ref(0);
const qsLength = ref(ansData.answer.length);

const checkWidth = () => {
  if (width.value < 1000) window.location = "/gaming";
};

const pressUp = (e) => {
  if (answerShow.value) return;
  if (e.keyCode === 38 && !jumpStatus.value) {
    jumpStatus.value = true;
    /* application */
    if (gameMode.value === "application") {
      store.walking = false;
      const brickLeftPx = bricks.value.brickNowLeft();
      if (brickLeftPx <= 445) {
        bricks.value.brickTouch();
        if (mode.value !== "final") {
          bricks.value.pngBlockShow();
          bricks.value.QMarkHide();
          answer.value.ansShow();
          answerShow.value = true;
        } else {
          mode.value = "checkout";
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
  if (e.keyCode === 39 && gameMode.value === "application") {
    store.walking = false;
    store.stillPressRight = false;
  }
};

const pressDown = (e) => {
  if (gameMode.value === "application" && e.keyCode === 40) {
    answer.value.pressDown();
  }
  if (gameMode.value === "normal" && e.keyCode === 40) {
    dino.value.normalDinoSquat();
  }
};

const keyDownHandler = (e) => {
  if (mode.value === "beforeStart" || mode.value === "checkout") return;
  pressUp(e);
  pressRight(e);
  pressDown(e);
};

const keyUpHandler = (e) => {
  if (mode.value === "beforeStart" || mode.value === "checkout") return;
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
  clearInterval(store.dinoTimer);
  setTimeout(() => {
    allAnswerPage.value.touchFinal();
  }, 600);
};

const nowQuestionPlusHandler = (res) => {
  nowQuestion.value = res;
  if (nowQuestion.value === qsLength.value) mode.value = "final";
};

const restartAppGameHandler = (res) => {
  mode.value = "beforeStart";
  store.distance = 50;
  stopForward.value = false;
  answerShow.value = false;
  store.walking = false;
  store.stillPressRight = false;
  nowQuestion.value = 0;
  bricks.value.clearBricks();
  cactus.value.clearCactus();
  operation.value.reset();
};

const checkDinoHandler = (res) => {
  if (res === "squat") {
    let isSquat = dino.value.checkSquat();
    if (!isSquat) {
      GameOver();
      return;
    }
  }
  let dinoHeight = dino.value.getDinoHeight();
  let target;
  if (res === "center") {
    target = -85;
  } else if (res === "side") {
    target = -40;
  } else if (res === "threeCactus") {
    target = -60;
  }
  if (dinoHeight > target) GameOver();
};

const jumpStatusFalseHandler = (res) => {
  jumpStatus.value = res;
};

const GameOver = () => {
  store.pauseJump = true;
  store.walking = false;
  clouds.value.stopClouds();
  clearInterval(store.dinoTimer);
  mode.value = "checkout";
  setTimeout(() => {
    checkout.value.recordHandler(score.value);
  }, 1);
};

const endCheckoutHandler = () => {
  mode.value = "beforeStart";
  barrier.value.reset();
  clouds.value.reset();
  gameMode.value = "normal";
  store.walking = false;
  store.pauseJump = false;
  score.value = 0;
};

const intervalFn = () => {
  clouds.value.cloudLefting();
  /* normal */
  if (gameMode.value === "normal") {
    barrier.value.cactusNormalLefting();
    score.value += 5;
    return;
  }

  /* application */
  if (store.walking) {
    if (store.distance <= 390) {
      store.distance += speed.value;
    } else {
      if (!stopForward.value) {
        cactus.value.cactusLefting(speed.value);
        bricks.value.brickLefting(speed.value);
      }
    }
  }
};

const startAppGameHandler = () => {
  store.dinoTimer = setInterval(intervalFn, 10);
  gameMode.value = "application";
  mode.value = "appStart";
  cactus.value.reset();
  clouds.value.reset();
  operation.value.changeAppMode();
  setTimeout(() => {
    bricks.value.reset();
    answer.value.reset();
  }, 1);
};

const startNormalGameHandler = () => {
  store.dinoTimer = setInterval(intervalFn, 10);
  clouds.value.reset();
  gameMode.value = "normal";
  mode.value = "normalStart";
  store.walking = true;
  score.value = 0;
  setTimeout(() => {
    checkout.value.getRecords();
  }, 1);
};

const getScore = computed(() => {
  if (score.value === 0) return "000000";
  let str = score.value.toString().length;
  let result = "";
  let gap = 6 - str;
  for (let i = 0; i < gap; i++) {
    result += "0";
  }
  result = result + score.value.toString();
  return result;
});

watchEffect(() => {
  if (store.walking) {
    if (gameMode.value === "application") {
      dino.value.appDinoRun();
    } else {
      dino.value.normalDinoRun();
    }
  }
  if (width) checkWidth();
});

checkWidth();
onMounted(() => window.addEventListener("keydown", keyDownHandler));
onMounted(() => window.addEventListener("keyup", keyUpHandler));
onUnmounted(() => window.removeEventListener("keydown", keyDownHandler));
onUnmounted(() => window.addEventListener("keyup", keyUpHandler));
</script>

<template>
  <div class="dinosaur-wrapper">
    <div class="title-block"></div>
    <div class="game-block">
      <h1 class="big-title">Dino</h1>
      <Operation ref="operation" />
      <div class="game-block-outter">
        <div class="bg"></div>
        <div v-if="gameMode !== 'application'" class="score">
          {{ getScore }}
        </div>
        <Clouds ref="clouds" />
        <Cactus ref="cactus" />
        <Barrier
          v-if="gameMode === 'normal'"
          ref="barrier"
          @check-dino="checkDinoHandler"
        />
        <Answer
          v-if="gameMode === 'application'"
          ref="answer"
          @answer-remove="answerRemoveHandler"
        />
        <AllAnswerPage
          v-if="gameMode === 'application'"
          ref="allAnswerPage"
          @restart-game="restartAppGameHandler"
        />
        <Bricks
          v-if="gameMode === 'application'"
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
      <div class="start-btn-block" ref="startBtn">
        <h4
          v-if="mode === 'beforeStart'"
          @click.right.shift.exact.prevent="startAppGameHandler"
          @click.exact="startNormalGameHandler"
        >
          點擊開始遊戲
        </h4>
      </div>
      <Checkout
        v-if="gameMode === 'normal'"
        v-show="mode === 'checkout'"
        ref="checkout"
        class="checkout-class"
        @end-checkout="endCheckoutHandler"
      />
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
  /* min-height: 700px; */
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
.big-title {
  z-index: 10;
  position: absolute;
  font-size: 60px;
  color: #333;
  font-family: "DotGothic16", sans-serif;
  top: -110px;
  left: -20px;
  letter-spacing: 0.05em;
  text-shadow: 3px 3px 1px rgba(255, 255, 255, 1);
}
.game-block {
  position: relative;
  width: 850px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.game-block-outter {
  position: relative;
  height: 500px;
  overflow: hidden;
}
.game-block-outter .bg {
  width: 100%;
  background-color: #ffffff;
  height: inherit;
  position: absolute;
}
.score {
  position: absolute;
  color: #999;
  font-size: 28px;
  z-index: 60;
  right: 15px;
  top: 8px;
  font-weight: 500;
  font-family: "DotGothic16", sans-serif;
  letter-spacing: 0.1em;
}
hr {
  width: 100%;
  position: absolute;
  bottom: 30px;
  opacity: 0.5;
  z-index: 45;
}
.start-btn-block {
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
@media (max-height: 700px) {
  .big-title {
    font-size: 35px;
    top: -50px;
    left: -85px;
  }
  .game-block-outter {
    top: -40px;
  }
  h4 {
    position: relative;
    top: -40px;
  }
}
</style>
