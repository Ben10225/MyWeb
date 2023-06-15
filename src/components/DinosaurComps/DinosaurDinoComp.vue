<script setup>
import { ref } from "vue";
import { useDinosaurStore } from "@/stores/distanceStore.js";
import gsap from "gsap";

const store = useDinosaurStore();
const emit = defineEmits(["jumpStatusFalse"]);
const props = defineProps({
  gameMode: String,
});

const dino = ref(null);
const normalNowJumping = ref(false);
const normalNowSquating = ref(false);
const dinoUrl = ref("/dino-stay.png");
const dinoSquatUrl = ref("/dino-squat-1.png");
const walkingStatus = ref("beforeWalking");

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
      /* squating div */
      if (dinoSquatUrl.value === "/dino-squat-1.png") {
        dinoSquatUrl.value = "/dino-squat-2.png";
      } else {
        dinoSquatUrl.value = "/dino-squat-1.png";
      }

      if (normalNowSquating.value) return;
      if (normalNowJumping.value) return;
      if (dinoUrl.value === "/dino-run-1.png") {
        dinoUrl.value = "/dino-run-2.png";
      } else {
        dinoUrl.value = "/dino-run-1.png";
      }
    }
  }, 1);
};

const normalDinoJump = () => {
  if (normalNowSquating.value) {
    emit("jumpStatusFalse", false);
    return;
  }
  normalNowJumping.value = true;
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
      normalNowJumping.value = false;
    },
  });
};

const normalDinoSquat = () => {
  if (normalNowSquating.value || normalNowJumping.value) return;
  normalNowSquating.value = true;
  setTimeout(() => {
    normalNowSquating.value = false;
  }, 1500);
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
  normalDinoSquat,
  getDinoHeight,
});
</script>

<template>
  <div
    ref="dino"
    class="dino"
    :class="{ hide: normalNowSquating }"
    :style="{
      transform: `translateX(${store.distance}px)`,
    }"
  >
    <img
      :src="dinoUrl"
      alt=""
      :class="{ walk: dinoUrl === '/dino-run-1.png' }"
    />
  </div>
  <div
    v-if="props.gameMode === 'normal'"
    class="dino dino-squating"
    :class="{
      hide: !normalNowSquating,
    }"
    :style="{
      backgroundImage: `url('${dinoSquatUrl}')`,
      transform: `translateX(${store.distance}px)`,
    }"
  ></div>
</template>

<style>
.dino {
  position: absolute;
  width: 65px;
  height: 65px;
  bottom: 32px;
  z-index: 70;
}
.hide {
  opacity: 0;
}
.dino-squating {
  width: 80px;
  height: 80px;
  background-image: url("/dino-squat-1.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 0 0px;
  bottom: -14px;
}
.dino img {
  width: inherit;
  position: relative;
}
.dino .walk {
  top: 3px;
}
</style>
