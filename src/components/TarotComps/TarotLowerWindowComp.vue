<script setup>
import { ref, defineExpose } from "vue";
import { useTarot } from "../../stores/tarotStore";

const props = defineProps({
  window: String,
  mode: String,
  lowerRestart: Number,
});

const emit = defineEmits(["gameStart", "lowerShowCard"]);

const store = useTarot();
const lowerCt = ref(0);
const autoSelectIndex = ref(-1);

const getNewShuffle = () => {
  store.getNewShuffle();
};

const getLowerTop = (i) => {
  if (autoSelectIndex.value === i) {
    return 0;
  }
  if (props.mode === "waiting") {
    return 700;
  }
  if (lowerCt.value !== i) return;
  let top;
  if (i <= 39) {
    if (i <= 19) {
      top = 230 - 4 * i;
    } else {
      let tmp = -(i - 39);
      top = 230 - 4 * tmp;
    }
  } else {
    if (i <= 58) {
      let tmp = i - 40;
      top = 230 - 4 * tmp;
    } else {
      top = 230 - 4 * (77 - i);
    }
  }
  return top;
};

const getLowerRotate = (i) => {
  return (i - 1) * 4.7 + 3.5;
};

const startLowerGame = () => {
  getNewShuffle();
  emit("gameStart", true);
  const timer = setInterval(() => {
    lowerCt.value++;
    if (lowerCt.value === 80) {
      clearInterval(timer);
    }
  }, 25);
  setTimeout(() => {
    autoSelectIndex.value = Math.floor(Math.random() * 74);
  }, 5000);
  setTimeout(() => {
    emit("lowerShowCard", autoSelectIndex.value);
  }, 5500);
};

const restart = () => {
  autoSelectIndex.value = -1;
  lowerCt.value = 0;
  getNewShuffle();
};

defineExpose({
  restart,
});
</script>

<template>
  <div class="tarot-lower-block" v-if="props.window === 'lower'">
    <div class="lower-center-block">
      <div class="second-instruction" v-show="props.mode === 'autoSelecting'">
        <h3 class="lower-instruction">系統將自動選排</h3>
        <h3 class="lower-instruction">請稍候</h3>
      </div>
      <h3 class="lower-instruction" v-show="props.mode === 'waiting'">
        點擊按鈕即可開始占卜囉！
      </h3>
      <button v-show="props.mode === 'waiting'" @click="startLowerGame">
        開始占卜
      </button>
    </div>
    <div class="tarot-lower-block-inner" v-show="props.mode !== 'reset'">
      <div
        class="tarot-card-outter"
        v-for="i of 78"
        :key="i"
        :style="{
          transform: `rotate(${getLowerRotate(i - 1)}deg)`,
          transformOrigin: `0% 0%`,
        }"
      >
        <div
          class="tarot-card"
          :style="{ top: `${getLowerTop(i - 1)}px` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tarot-lower-block {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 100;
  overflow: hidden;
}
.tarot-lower-block-inner {
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translateX(-50%);
}
.tarot-card-outter {
  position: absolute;
  width: 130px;
  height: 350px;
  pointer-events: none;
  transition: 1.2s;
  transition-delay: 0.3s;
}
.tarot-card {
  position: absolute;
  left: -50%;
  width: 140px;
  height: 250px;
  background-image: url("/back-new.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid #999;
  border-radius: 12px;
  background-color: #fff;
  transition: 1.3s;
}
.lower-center-block {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

button {
  position: absolute;
  padding: 6px 10px 6px 12px;
  cursor: pointer;
  border: none;
  font-size: 18px;
  background-color: transparent;
  border: 1px solid #873f25;
  border-radius: 10px;
  color: #873f25;
  font-weight: 500;
  transition: 0.3s;
  letter-spacing: 0.05em;
  transform: scale(1.1);
  margin-top: 20px;
  background-color: rgba(245, 237, 224, 0.8);
}
button:hover {
  transform: scale(1);
}
.lower-center-block {
  width: 300px;
  position: absolute;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}
.lower-instruction {
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.01em;
  color: #555;
  text-shadow: 1px 1px 0px #ffffff;
  margin-top: 45px;
  margin-left: 8px;
  position: relative;
  top: 30px;
}
.second-instruction {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: -40px;
}
.second-instruction .lower-instruction {
  margin-top: 6px;
  margin-left: 0;
}
</style>
