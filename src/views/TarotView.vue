<script setup>
import TarotDecorate from "../components/TarotComps/TarotDecorateComp.vue";
import TarotCard from "../components/TarotComps/TarotCardComp.vue";
import TarotShowCard from "../components/TarotComps/TarotShowCardComp.vue";
import { ref, computed, watchEffect } from "vue";
import { useTarot } from "../stores/tarotStore";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const store = useTarot();
const mode = ref("waiting");
const extraClick = ref(0);
const nowHoverIndex = ref(-1);
const nowClickIndex = ref(-1);
const ani = ref(false);
const extraHover = ref(false);
const cardSoloShow = ref(false);
const selectCardData = ref({
  id: null,
  upright: null,
});

const lowerCt = ref(0);
const autoSelectIndex = ref(-1);
const window = ref("upper");

const getNewShuffle = () => {
  store.getNewShuffle();
};

const oneCardDeck = () => {
  store.oneCardDeck();
};

const getShow = (i) => {
  if (mode.value === "waiting" || mode.value === "beforeAni") return i === 0;
  return true;
};

const getRotate = (i) => {
  if (mode.value === "waiting") return 0;
  if (mode.value === "beforeAni" || !ani.value) return -11.55;
  let min = -0.15 - (store.tarots.length / 2) * 0.3;
  return min + 0.3 * i;
};

const startGame = () => {
  mode.value = "beforeAni";
  getNewShuffle();
  setTimeout(() => {
    mode.value = "nowAni";
  }, 800);
  setTimeout(() => {
    ani.value = !ani.value;
  }, 870);
  setTimeout(() => {
    mode.value = "select";
  }, 2070);
};

const getInstruction = computed(() => {
  switch (mode.value) {
    case "waiting":
      return "點擊按鈕即可開始占卜囉！";
    case "beforeAni":
      return "洗牌中 請稍候";
    case "nowAni":
      return "洗牌中 請稍候";
    case "select":
      return "現在，請選擇一張屬於你的塔羅牌";
  }
});

const cardResHandler = (res) => {
  nowHoverIndex.value = res[1];
  selectCardData.value = res[0];
};

const extraMouseEnterHandler = () => {
  extraHover.value = true;
};

const extraMouseLeaveHandler = () => {
  extraHover.value = false;
  nowHoverIndex.value = -1;
};

const cardClickHandler = (card, index) => {
  cardSoloShow.value = true;
  nowClickIndex.value = index;
  selectCardData.value = card;
};

const extraClickHandler = () => {
  cardSoloShow.value = true;
  extraClick.value++;
  nowClickIndex.value = nowHoverIndex.value;
};

const backResHandler = (res) => {
  cardSoloShow.value = false;
  selectCardData.value = {
    id: null,
    upright: null,
  };
};

const restartResHandler = (res) => {
  if (window.value === "upper") {
    ani.value = false;
    nowHoverIndex.value = -1;
    nowClickIndex.value = -1;
    oneCardDeck();
  } else {
    autoSelectIndex.value = -1;
    lowerCt.value = 0;
    getNewShuffle();
  }
  mode.value = "reset";
  ani.value = false;
  setTimeout(() => {
    mode.value = "waiting";
  }, 600);
};

watchEffect(() => {
  if (width.value <= 600) {
    window.value = "lower";
  } else {
    window.value = "upper";
  }
});

const getLowerTop = (i) => {
  if (autoSelectIndex.value === i) {
    return 0;
  }
  if (mode.value === "waiting") {
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
  // if (autoSelectIndex.value === i) {
  //   if (autoSelectIndex.value > 39) {
  //     return 360;
  //   }
  //   return 0;
  // }
  return (i - 1) * 4.7 + 3.5;
};

const startLowerGame = () => {
  getNewShuffle();
  mode.value = "autoSelecting";
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
    cardSoloShow.value = true;
    nowClickIndex.value = autoSelectIndex.value;
    selectCardData.value = store.tarots[autoSelectIndex.value];

    console.log(autoSelectIndex.value);
  }, 5500);
};
</script>

<template>
  <div class="tarot-wrapper">
    <div class="bg-block">
      <img class="bg bg-top" src="/tarot-top.svg" alt="" />
      <img class="bg bg-bot" src="/tarot-bot.svg" alt="" />
      <img class="bg bg-center" src="/tarot-center.svg" alt="" />
    </div>
    <div class="tarot-lower-block" v-if="window === 'lower'">
      <div class="lower-center-block">
        <div class="second-instruction" v-show="mode === 'autoSelecting'">
          <h3 class="lower-instruction">系統將自動選排</h3>
          <h3 class="lower-instruction">請稍候</h3>
        </div>
        <h3 class="lower-instruction" v-show="mode === 'waiting'">
          {{ getInstruction }}
        </h3>
        <button
          class="lower-start-btn"
          v-show="mode === 'waiting'"
          @click="startLowerGame"
        >
          開始占卜
        </button>
      </div>
      <div class="tarot-lower-block-inner" v-show="mode !== 'reset'">
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
    <TarotDecorate />
    <TarotShowCard
      :show="cardSoloShow"
      :data="selectCardData"
      :window="window"
      @back="backResHandler"
      @restart="restartResHandler"
    />
    <div class="outter">
      <h1 class="title">Tarot</h1>
      <div v-if="window === 'upper'" class="instruction-block">
        <h3 class="instruction text-hide">
          {{ getInstruction }}
          <div class="white-box"></div>
        </h3>
        <h3 class="instruction">{{ getInstruction }}</h3>
      </div>
      <div
        class="cards-wrapper"
        v-if="window === 'upper'"
        v-show="mode !== 'reset'"
      >
        <TarotCard
          v-for="(card, index) of store.tarots"
          v-show="getShow(index)"
          class="cards"
          :class="{
            'stop-hover': mode !== 'select',
            'one-card-ani': mode === 'beforeAni',
          }"
          :key="index"
          :card="[card, index]"
          :hover-stay="[extraHover, nowHoverIndex]"
          :extra-click="[extraClick, nowHoverIndex]"
          :clicked="[cardSoloShow, nowClickIndex]"
          :style="{ transform: `rotate(${getRotate(index + 1)}deg)` }"
          @card="cardResHandler"
          @click="cardClickHandler(card, index)"
        />
        <div
          class="extra-hover-block"
          :style="{ transform: `rotate(${getRotate(nowHoverIndex + 1)}deg)` }"
          v-show="nowHoverIndex !== -1"
          @mouseenter="extraMouseEnterHandler"
          @mouseleave="extraMouseLeaveHandler"
          @click="extraClickHandler"
        ></div>
      </div>
      <button
        class="normal-btn"
        v-if="mode === 'waiting' && window === 'upper'"
        @click="startGame"
      >
        開始占卜
      </button>
    </div>
  </div>
</template>

<style scoped>
.tarot-wrapper {
  width: 100%;
  height: 100%;
  background-color: #f5ede0;
  display: flex;
  justify-content: center;
  position: relative;
}
.outter {
  width: 800px;
  /* height: 100%; */
  /* height: 10px; */
  /* border: 1px solid #000; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  position: absolute;
  font-size: 60px;
  color: #333;
  font-weight: 600;
  top: 55px; /** -3 */
  left: -19px;
}
.white-box {
  width: 100%;
  height: 13px;
  background-color: #fff;
  position: relative;
  top: -13px;
}
.instruction {
  position: absolute;
  left: 30px;
  top: 140px;
  font-weight: 400;
  font-size: 17px;
  letter-spacing: 0.01em;
  color: #555;
  text-shadow: 1px 1px 0px #ffffff;
}
.text-hide {
  color: #f5eddf;
}
button {
  position: absolute;
  /* top: 500px; */
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
  transform: scale(0.95);
  margin-top: 500px;
  background-color: rgba(245, 237, 224, 0.8);
}
.normal-btn:hover {
  /* background-color: #ffffff; */
  transform: scale(1);
}
.cards-wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  margin-top: 170px;
  position: relative;
}
.cards {
  transition: 0.8s !important;
  /* transform-origin: 50% -20%; */
}
.one-card-ani {
  /* transition: 0.8s; */
  transition: 0s;
}
.stop-hover {
  pointer-events: none;
  user-select: none;
}
.extra-hover-block {
  width: 150px;
  height: 70px;
  position: absolute;
  top: 240px;
  z-index: 500;
  transform-origin: 50% -2645%;
  cursor: pointer;
  /* background-color: #222; */

  /* top: 190px;
  transform-origin: 100% 0%; */
}
.bg-block {
  position: absolute;
  width: 100%;
  height: 100%;
  /* border: 1px solid #000; */
  /* background-color: red; */
}
.bg {
  position: absolute;
  width: 100%;
  opacity: 0.5;
}
.bg-top {
  top: 120px;
  opacity: 0.3;
}
.bg-bot {
  bottom: 0px;
}
.bg-center {
  width: 65%;
  top: 57%;
  left: 51%;
  transform: translate(-50%, -50%) scaleX(1.1);
  opacity: 0.1;
}
.tarot-lower-block {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 100;
  overflow: hidden;
  /* background-color: red; */
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
  /* border: 1px solid #000; */
  pointer-events: none;
  transition: 1.2s;
  transition-delay: 0.3s;
}
.tarot-card {
  position: absolute;
  left: -50%;
  /* top: 300px; */
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
.lower-start-btn {
  margin: 0;
  /* position: absolute;
  left: 50%;
  top: 50%; */
  transform: scale(1.1);
  cursor: pointer;
  transition: 0.3s;
  margin-top: 20px;
}
.lower-start-btn:hover {
  transform: scale(1);
}
.lower-center-block {
  /* border: 1px solid #000; */
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
@media (max-width: 1000px) {
  .outter {
    margin-left: 30px;
    width: 80%;
  }
  .cards-wrapper {
    transform: scale(0.85);
  }
}
@media (max-width: 850px) {
  .cards-wrapper {
    transform: scale(0.75);
  }
}
@media (max-width: 750px) {
  .cards-wrapper {
    transform: scale(0.7);
  }
}
@media (max-width: 685px) {
  .cards-wrapper {
    transform: scale(0.65);
  }
}
@media (max-width: 650px) {
  .cards-wrapper {
    transform: scale(0.61);
  }
}
@media (max-width: 600px) {
  .outter {
    align-items: center;
  }
}
</style>
