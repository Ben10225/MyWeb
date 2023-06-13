<script setup>
import Clouds from "@/components/DinosaurComps/DinosaurCloudsComp.vue";
import Cactus from "@/components/DinosaurComps/DinosaurCactusComp.vue";
import Bricks from "@/components/DinosaurComps/DinosaurBricksComp.vue";
import Answer from "@/components/DinosaurComps/DinosaurAnswerComp.vue";
import AllAnswerPage from "@/components/DinosaurComps/DinosaurAllAnswerPageComp.vue";
import ansData from "@/components/DinosaurComps/answer";
import { ref, watch, watchEffect, onMounted, onUnmounted, h } from "vue";
import gsap from "gsap";

const dino = ref(null);
const clouds = ref(null);
const cactus = ref(null);
const bricks = ref(null);
const answer = ref(null);
const allAnswerPage = ref(null);
const timer = ref(null);
const jumpStatus = ref(false);
const distance = ref(50); // 30
const walking = ref(false);
const stillPressRight = ref(false);
const stopForward = ref(false);
const answerShow = ref(false);
const intervalRunning = ref(false);
const mode = ref("beforeStart");
const dinoUrl = ref("/dino-stay.png");
const walkingStatus = ref("beforeWalking");
const speed = ref(2);
const nowQuestion = ref(0);
const qsLength = ref(ansData.answer.length);

const dinoRun = () => {
  if (walkingStatus.value === "nowWalking") return;
  dinoUrl.value = "/dino-run-1.png";
  let ct = 0;
  let timer = setInterval(() => {
    ct++;
    if (ct % 40 === 1) {
      walkingStatus.value = "nowWalking";
      if (dinoUrl.value === "/dino-run-1.png") {
        dinoUrl.value = "/dino-run-2.png";
      } else {
        dinoUrl.value = "/dino-run-1.png";
      }
      if (!walking.value) {
        clearInterval(timer);
        dinoUrl.value = "/dino-stay.png";
        walkingStatus.value = "beforeWalking";
      }
    }
  }, 1);
};

const pressUp = (e) => {
  if (answerShow.value) return;
  walking.value = false;
  if (e.keyCode === 38 && !jumpStatus.value) {
    const brickLeftPx = bricks.value.brickNowLeft();
    // if (brickLeftPx === 800) return;
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
    dinoUrl.value = "/dino-jump.png";
    jumpStatus.value = true;
    let tl = gsap.timeline();
    tl.fromTo(
      dino.value,
      {
        x: distance.value,
        y: 0,
      },
      {
        duration: 0.4,
        x: distance.value,
        // y: -90,
        y: -108,
        ease: "power1.out",
      }
    ).to(dino.value, {
      x: distance.value,
      y: 0,
      duration: 0.4,
      ease: "power1.in",
      onComplete() {
        jumpStatus.value = false;
        dinoUrl.value = "/dino-stay.png";
        if (stillPressRight.value) walking.value = true;
      },
    });
  }
};

const pressRight = (e) => {
  if (answerShow.value) {
    walking.value = false;
    stillPressRight.value = false;
    return;
  }
  if (e.keyCode === 39 && !jumpStatus.value) {
    walking.value = true;
    stillPressRight.value = true;
  }
};

const stopRight = (e) => {
  if (e.keyCode === 39) {
    walking.value = false;
    stillPressRight.value = false;
  }
};

const keyDownHandler = (e) => {
  if (mode.value === "beforeStart" || mode.value === "settlement") return;
  pressUp(e);
  pressRight(e);
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
  distance.value = 50;
  stopForward.value = false;
  answerShow.value = false;
  walking.value = false;
  stillPressRight.value = false;
  intervalRunning.value = false;
  nowQuestion.value = 0;
  bricks.value.reset();
  answer.value.reset();
  cactus.value.reset();
  clouds.value.reset();
};

const intervalFn = () => {
  intervalRunning.value = true;
  clouds.value.cloudLefting();
  if (walking.value) {
    // if (distance.value <= 300) {
    if (distance.value <= 390) {
      distance.value += speed.value;
    } else {
      if (!stopForward.value) {
        cactus.value.cactusLefting(speed.value);
        bricks.value.brickLefting(speed.value);
      }
    }
  }
};
timer.value = setInterval(intervalFn, 10);

watch(
  () => mode.value,
  (nV) => {
    if (nV === "beforeStart") {
      clearInterval(timer.value);
      intervalRunning.value = false;
    } else {
      if (intervalRunning.value) return;
      timer.value = setInterval(intervalFn, 10);
    }
  },
  { immediate: true }
);

watchEffect(() => {
  if (walking.value) {
    dinoRun();
  }
  // if (mode.value === "beforeStart") {
  //   clearInterval(timer.value);
  // } else {
  //   timer.value = setInterval(intervalFn, 10);

  //   // onMounted(() => pngResetHandler);
  //   // onMounted(() => window.addEventListener("keydown", keyDownHandler));
  //   // onMounted(() => window.addEventListener("keyup", keyUpHandler));
  //   // onUnmounted(() => window.removeEventListener("keydown", keyDownHandler));
  //   // onUnmounted(() => window.addEventListener("keyup", keyUpHandler));
  // }
});

const testHandler = () => {
  mode.value = "appStart";
};

onMounted(() => window.addEventListener("keydown", keyDownHandler));
onMounted(() => window.addEventListener("keyup", keyUpHandler));
onUnmounted(() => window.removeEventListener("keydown", keyDownHandler));
onUnmounted(() => window.addEventListener("keyup", keyUpHandler));
</script>

<template>
  <button class="test" @click="testHandler">test</button>

  <div class="dinosaur-wrapper">
    <div class="title-block"></div>
    <div class="game-block">
      <div class="normal-game"></div>
      <div class="application">
        <div class="bg"></div>
        <Clouds ref="clouds" />
        <Cactus ref="cactus" />
        <Answer ref="answer" @answer-remove="answerRemoveHandler" />
        <AllAnswerPage ref="allAnswerPage" @restart-game="restartGameHandler" />
        <Bricks
          ref="bricks"
          @stop-forward="stopForwardHandler"
          @png-reset="pngResetHandler"
          @touch-final="touchFinalHandler"
          @now-question-plus="nowQuestionPlusHandler"
        />
        <div
          class="dino"
          ref="dino"
          :style="{ transform: `translateX(${distance}px)` }"
        >
          <img
            :src="dinoUrl"
            alt=""
            :class="{ walk: dinoUrl === '/dino-run-1.png' }"
          />
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<style scoped>
.test {
  padding: 20px;
  position: absolute;
  left: 50px;
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
.dino {
  position: absolute;
  /* width: 50px;
  height: 50px; */
  width: 65px;
  height: 65px;
  /* bottom: 25px; */
  bottom: 32px;
}
.dino img {
  width: inherit;
  position: relative;
}
.dino .walk {
  top: 3px;
}
hr {
  width: 100%;
  position: absolute;
  /* bottom: 23px; */
  bottom: 30px;
  opacity: 0.5;
}
</style>
