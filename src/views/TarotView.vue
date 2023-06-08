<script setup>
import TarotDecorate from "../components/TarotComps/TarotDecorateComp.vue";
import TarotCard from "../components/TarotComps/TarotCardComp.vue";
import TarotShowCard from "../components/TarotComps/TarotShowCardComp.vue";
import TarotLowerWindow from "../components/TarotComps/TarotLowerWindowComp.vue";
import { ref, computed, watchEffect } from "vue";
import { useTarot } from "../stores/tarotStore";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const store = useTarot();
const window = ref("");
const mode = ref("waiting");
const extraClick = ref(0);
const lowerRestart = ref(0);
const nowHoverIndex = ref(-1);
const nowClickIndex = ref(-1);
const ani = ref(false);
const extraHover = ref(false);
const cardSoloShow = ref(false);
const lowerWindowChild = ref(null);
const selectCardData = ref({
  id: null,
  upright: null,
});

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
    lowerRestart.value++;
    lowerWindowChild.value.restart();
  }
  mode.value = "reset";
  ani.value = false;
  setTimeout(() => {
    mode.value = "waiting";
  }, 600);
};

const lowerGameStartHandler = (res) => {
  mode.value = "autoSelecting";
};

const lowerShowCardHandler = (res) => {
  cardSoloShow.value = true;
  nowClickIndex.value = res;
  selectCardData.value = store.tarots[res];
};

watchEffect(() => {
  if (width.value <= 600) {
    if (window.value === "upper") {
      location.reload();
    }
    window.value = "lower";
  } else {
    if (window.value === "lower") {
      location.reload();
    }
    window.value = "upper";
  }
});
</script>

<template>
  <div
    class="tarot-wrapper"
    :class="{ 'tarot-wrapper-ovh': mode === 'reset' || mode === 'waiting' }"
  >
    <div class="bg-block">
      <img class="bg bg-top" src="/tarot-top.svg" alt="" />
      <img class="bg bg-bot" src="/tarot-bot.svg" alt="" />
      <img class="bg bg-center" src="/tarot-center.svg" alt="" />
    </div>
    <TarotLowerWindow
      :window="window"
      :mode="mode"
      :lower-restart="lowerRestart"
      @game-start="lowerGameStartHandler"
      @lower-show-card="lowerShowCardHandler"
      ref="lowerWindowChild"
    />
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
.tarot-wrapper-ovh {
  overflow: hidden;
}
.outter {
  width: 800px;
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
  transform: scale(1);
}
.cards-wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
  position: relative;
}
.cards {
  transition: 0.8s !important;
}
.one-card-ani {
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
}
.bg-block {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
@media (max-height: 550px) {
  .tarot-wrapper {
    height: 550px;
  }
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
