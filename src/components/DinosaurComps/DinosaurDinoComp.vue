<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { useDinosaurStore } from "@/stores/distanceStore.js";
import gsap from "gsap";

const store = useDinosaurStore();
const emit = defineEmits(["walkingTrue", "jumpStatusFalse"]);

const dino = ref(null);
const dinoUrl = ref("/dino-stay.png");
const walkingStatus = ref("beforeWalking");
const nowNormalJumping = ref(false);

/* application */
const appDinoRun = () => {
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
      if (!store.walking) {
        clearInterval(timer);
        dinoUrl.value = "/dino-stay.png";
        walkingStatus.value = "beforeWalking";
        return;
      }
    }
  }, 1);
};

const appDinoJump = () => {
  dinoUrl.value = "/dino-stay.png";

  let tl = gsap.timeline();
  tl.fromTo(
    dino.value,
    {
      x: store.distance,
      y: 0,
    },
    {
      duration: 0.4,
      x: store.distance,
      y: -108,
      ease: "power1.out",
    }
  ).to(dino.value, {
    x: store.distance,
    y: 0,
    duration: 0.4,
    ease: "power1.in",
    onComplete() {
      emit("jumpStatusFalse", false);
      if (store.stillPressRight) {
        store.walking = true;
      } else {
        dinoUrl.value = "/dino-stay.png";
      }
    },
  });
};

/* normal */
const normalDinoRun = () => {
  dinoUrl.value = "/dino-run-1.png";
  let ct = 0;
  let timer = setInterval(() => {
    ct++;
    if (ct % 40 === 1) {
      if (!store.walking) {
        document.querySelector(".dino img").src = "/dino-stay.png";
        clearInterval(timer);
        return;
      }
      if (nowNormalJumping.value) return;
      if (dinoUrl.value === "/dino-run-1.png") {
        dinoUrl.value = "/dino-run-2.png";
      } else {
        dinoUrl.value = "/dino-run-1.png";
      }
    }
  }, 1);
};

const normalDinoJump = () => {
  nowNormalJumping.value = true;
  dinoUrl.value = "/dino-jump.png";
  let tl = gsap.timeline();
  tl.fromTo(
    dino.value,
    {
      x: store.distance,
      y: 0,
    },
    {
      duration: 0.4,
      x: store.distance,
      y: "-160px",
      ease: "power1.out",
      onUpdate() {
        if (store.pauseJump) {
          tl.pause();
          let timer = setInterval(() => {
            if (!store.pauseJump) {
              tl.progress(1);
              tl.resume();
              clearInterval(timer);
            }
          }, 100);
        }
      },
    }
  ).to(dino.value, {
    x: store.distance,
    y: 0,
    duration: 0.4,
    ease: "power1.in",
    onUpdate() {
      if (store.pauseJump) {
        tl.pause();
        let timer = setInterval(() => {
          if (!store.pauseJump) {
            tl.progress(1);
            tl.resume();
            clearInterval(timer);
          }
        }, 100);
      }
    },
    onComplete() {
      emit("jumpStatusFalse", false);
      nowNormalJumping.value = false;
    },
  });
};

const getDinoHeight = () => {
  let style = window.getComputedStyle(dino.value);
  let matrix = new DOMMatrixReadOnly(style.transform);
  let dinoHeight = matrix.m42;
  return dinoHeight;
};

defineExpose({
  appDinoRun,
  appDinoJump,
  normalDinoRun,
  normalDinoJump,
  getDinoHeight,
});
</script>

<template>
  <div
    class="dino"
    ref="dino"
    :style="{ transform: `translateX(${store.distance}px)` }"
  >
    <img
      :src="dinoUrl"
      alt=""
      :class="{ walk: dinoUrl === '/dino-run-1.png' }"
    />
  </div>
</template>

<style>
.dino {
  position: absolute;
  width: 65px;
  height: 65px;
  bottom: 32px;
  z-index: 70;
}
.dino img {
  width: inherit;
  position: relative;
}
.dino .walk {
  top: 3px;
}
</style>
