<script setup>
import GamingDecorate from "../components/GamingComps/GamingDecorateComp.vue";
import { ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";

// const prevent = ref(false);

const { width } = useWindowSize();
const tarotHandler = () => {
  window.location = "/tarot";
};

const dinoHandler = () => {
  if (width.value >= 1000) window.location = "/dinosaur";
};

const prevent = computed(() => {
  return width.value < 1000 ? true : false;
});
</script>

<template>
  <div class="gaming-wrapper">
    <GamingDecorate />
    <div class="outter">
      <h1 class="title">Gaming</h1>
      <div class="games-block">
        <div class="game tarot" @click="tarotHandler">
          <div class="game-image"></div>
          <div class="game-text">
            <h3 class="game-name">Tarot</h3>
            <p>
              這是個塔羅牌的抽卡機，可藉由抽牌去獲得一些小啟示，體驗心靈祥和，不妨來試試看自己的手氣吧！
            </p>
          </div>
        </div>
        <div class="game dino" :class="{ prevent }" @click="dinoHandler">
          <div class="game-image" :class="{ prevent }"></div>
          <div class="game-text">
            <h3 class="game-name">Dino</h3>
            <p>可愛的小恐龍，用鍵盤來操作，突破障礙獲得最高分！</p>
            <div class="alert">
              <font-awesome-icon
                class="ic"
                :icon="['fas', 'triangle-exclamation']"
              />
              <span>此遊戲僅提供橫向 1000 像素以上的顯示器。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gaming-wrapper {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.outter {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
h1 {
  position: relative;
  font-size: 60px;
  color: #333;
  font-weight: 600;
  top: -75px;
  left: -300px;
  z-index: 10;
}
.games-block {
  display: flex;
  align-items: center;
  position: relative;
}
.game {
  width: 280px;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin: 0 40px;
  border-radius: 15px;
  position: relative;
  top: -35px;
  cursor: pointer;
  background-color: rgba(245, 237, 224, 0.5);
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
  transition: 0.4s;
}
.game:hover {
  top: -65px;
  background-color: rgba(245, 237, 224, 1);
  box-shadow: 6px 6px 1px rgba(0, 0, 0, 0.4);
}
.prevent {
  pointer-events: none;
  background-color: rgba(240, 240, 240, 0.5);
}
.game-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 180px;
  height: 240px;
  margin-bottom: 30px;
  border-radius: 10px;
  border-right: 2px solid #a16216;
  border-bottom: 2px solid #a16216;
}
.game-image.prevent {
  filter: grayscale(100%);
}
.tarot .game-image {
  background-image: url("/tarot-intro.png");
}
.dino .game-image {
  background-image: url("/dino-intro.jpg");
}
.game-name {
  font-size: 30px;
  color: #555;
  text-align: left;
  font-weight: 500;
}
.game-text {
  width: 220px;
  height: 190px;
  font-size: 15px;
  color: #777;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
}
.alert {
  font-size: 13px;
  margin-top: 15px;
  color: #d17d7d;
}
.alert .ic {
  margin-right: 5px;
}
@media (max-width: 850px) {
  h1 {
    left: -150px;
  }
  .game {
    transform: scale(0.8);
    margin: 0 0px;
  }
}
@media (max-width: 600px) {
  .games-block {
    margin-top: 290px;
    flex-direction: column;
  }
  .game {
    transform: scale(0.9);
    margin: 0;
  }
  h1 {
    font-size: 45px;
    left: -80px;
    top: 260px;
  }
}
</style>
