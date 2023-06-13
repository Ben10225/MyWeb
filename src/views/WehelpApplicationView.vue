<script setup>
import Clouds from "@/components/DinosaurComps/DinosaurCloudsComp.vue";
import CactusApp from "@/components/DinosaurComps/DinosaurCactusAppComp.vue";
import CactusNormal from "@/components/DinosaurComps/DinosaurCactusNormalComp.vue";
import Bricks from "@/components/DinosaurComps/DinosaurBricksComp.vue";
import Answer from "@/components/DinosaurComps/DinosaurAnswerComp.vue";
import AllAnswerPage from "@/components/DinosaurComps/DinosaurAllAnswerPageComp.vue";
import ansData from "@/components/DinosaurComps/answer";
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const dino = ref(null);
const clouds = ref(null);
const cactusApp = ref(null);
const cactusNormal = ref(null);
const bricks = ref(null);
const answer = ref(null);
const allAnswerPage = ref(null);
const timer = ref(null);
const jumpStatus = ref(false);
const distance = ref(50); // 30
const jumpHeight = ref(-108);
const walking = ref(false);
const stillPressRight = ref(false);
const stopForward = ref(false);
const answerShow = ref(false);
const mode = ref("beforeStart");
const gameMode = ref("");
const dinoUrl = ref("/dino-stay.png");
const walkingStatus = ref("beforeWalking");
const speed = ref(2);
const nowQuestion = ref(0);
const qsLength = ref(ansData.answer.length);
const pauseJump = ref(false);

const dinoRun = () => {
  if (walkingStatus.value === "nowWalking") return;
  /* application */
  dinoUrl.value = "/dino-run-1.png";
  let ct = 0;
  let timer = setInterval(() => {
    ct++;
    if (ct % 40 === 1) {
      if (!walking.value) {
        clearInterval(timer);
        dinoUrl.value = "/dino-stay.png";
        walkingStatus.value = "beforeWalking";
        return;
      }
      if (gameMode.value === "normal" && jumpStatus.value) return;
      walkingStatus.value = "nowWalking";
      if (dinoUrl.value === "/dino-run-1.png") {
        dinoUrl.value = "/dino-run-2.png";
      } else {
        dinoUrl.value = "/dino-run-1.png";
      }
    }
  }, 1);
};

const pressUp = (e) => {
  if (answerShow.value) return;
  if (gameMode.value === "application") walking.value = false;
  if (e.keyCode === 38 && !jumpStatus.value) {
    if (gameMode.value === "application") {
      /* application */
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
    }
    dinoUrl.value = "/dino-stay.png";
    /* normal */
    if (gameMode.value === "normal") jumpHeight.value = -160;
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
        y: jumpHeight.value,
        ease: "power1.out",
        onUpdate() {
          if (pauseJump.value) {
            tl.pause();
          }
        },
      }
    ).to(dino.value, {
      x: distance.value,
      y: 0,
      duration: 0.4,
      ease: "power1.in",
      onUpdate() {
        if (pauseJump.value) {
          tl.pause();
        }
      },
      onComplete() {
        jumpStatus.value = false;
        // dinoUrl.value = "/dino-stay.png";
        if (stillPressRight.value) {
          walking.value = true;
        } else {
          dinoUrl.value = "/dino-stay.png";
        }
      },
    });
  }
};

const pressRight = (e) => {
  if (gameMode.value === "normal") return;
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
  walking.value = false;
  stillPressRight.value = false;
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
  distance.value = 50;
  stopForward.value = false;
  answerShow.value = false;
  walking.value = false;
  stillPressRight.value = false;
  nowQuestion.value = 0;
  bricks.value.clearBricks();
  cactusApp.value.clearCactus();
  document.querySelector(".h4-block").classList.remove("hide");
};

const checkDinoHeightHandler = (res) => {
  let dino = document.querySelector(".dino");
  let style = window.getComputedStyle(dino);
  let matrix = new WebKitCSSMatrix(style.transform);
  let dinoHeight = matrix.m42;
  if (dinoHeight > -80) {
    pauseJump.value = true;
    walking.value = false;
    clouds.value.stopClouds();
    clearInterval(timer.value);
  }
};

const intervalFn = () => {
  clouds.value.cloudLefting();
  /* normal */
  if (gameMode.value === "normal") {
    cactusNormal.value.cactusNormalLefting();
    return;
  }

  /* application */
  if (walking.value) {
    // if (distance.value <= 300) {
    if (distance.value <= 390) {
      distance.value += speed.value;
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
  document.querySelector(".h4-block").classList.add("hide");
};

const startNormalGameHandler = () => {
  timer.value = setInterval(intervalFn, 10);
  clouds.value.reset();
  gameMode.value = "normal";
  mode.value = "normalStart";
  walking.value = true;
  // dinoRun();
  document.querySelector(".h4-block").classList.add("hide");
};

watchEffect(() => {
  if (walking.value) {
    dinoRun();
  }
});

onMounted(() => window.addEventListener("keydown", keyDownHandler));
onMounted(() => window.addEventListener("keyup", keyUpHandler));
onUnmounted(() => window.removeEventListener("keydown", keyDownHandler));
onUnmounted(() => window.addEventListener("keyup", keyUpHandler));
</script>

<template>
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
      <div class="h4-block" ref="startBtn">
        <h4
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
