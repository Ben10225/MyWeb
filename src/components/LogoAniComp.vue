<script setup>
import { ref, computed, watch } from "vue";

const bgAnimationBool = ref(false);
const WaveAnimationBool = ref(false);
const imageAnimation = ref(false);
const AnimationCt = ref(0);

const props = defineProps({
  ani: Number,
});

const startWave = () => {
  AnimationCt.value = 0;
  bgAnimationBool.value = true;
  imageAnimation.value = true;
  const timer = setInterval(() => {
    AnimationCt.value++;
    switch (AnimationCt.value) {
      case 2:
        WaveAnimationBool.value = true;
        break;
      case 42:
        WaveAnimationBool.value = false;
        break;
      case 45:
        bgAnimationBool.value = false;
        imageAnimation.value = false;
        clearInterval(timer);
        break;
    }
  }, 100);
};

const showBg = computed(() => {
  return bgAnimationBool.value ? "bgShow" : "bgHide";
});
const showWater = computed(() => {
  return WaveAnimationBool.value ? "waveTop" : "waveDown";
});

watch(props, (newOne) => {
  startWave();
});
</script>

<template>
  <div class="outter">
    <div class="shake-img" :class="{ imageAnimation }"></div>
    <div class="outter-bg" :class="showBg"></div>
    <div class="water" :class="showWater"></div>
  </div>
</template>

<style scoped>
.outter {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.shake-img {
  width: 150px;
  height: 150px;
  background-image: url("/shake.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 10px;
  position: absolute;
  z-index: 10;
  left: 15px;
  top: 120px;
  pointer-events: none;
}
.imageAnimation {
  animation: showImg 5s 0s both;
}
@keyframes showImg {
  0% {
    top: 125px;
  }
  18% {
    top: 0px;
  }
  80% {
    top: 0px;
  }
  100% {
    top: 125px;
  }
}
.outter-bg {
  width: 100%;
  height: 0%;
  background-color: #fff;
  transition: all 1s;
}
.bgShow {
  height: 100%;
}

.bgHide {
  height: 0%;
}
.water {
  position: absolute;
  width: 400px;
  height: 370px;
  border-radius: 160px;
  background-color: #e8d9eb;

  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  animation: wave 4s infinite linear;
  transition: all 1.5s;
}
@keyframes wave {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}
.waveTop {
  top: 70px;
}
.waveDown {
  top: 150px;
}
</style>
