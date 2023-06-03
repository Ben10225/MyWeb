<script setup>
import { ref, computed, watchEffect } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();
const cardSize = ref({
  width: 300,
  height: 530,
});

const props = defineProps({
  modeText: String,
  cardShow: Boolean,
  cardOpenAni: Boolean,
  degree: Number,
  cardUpright: Boolean,
  cardIsUpright: Number,
  url: String,
  forReverseImageOpacity: Boolean,
});

const getTarotImgWidth = computed(() => {
  return cardSize.value.width === 300 ? 280 : 155;
});

watchEffect(() => {
  if (height.value < 700) {
    cardSize.value.width = 160;
    cardSize.value.height = 300;
  } else {
    cardSize.value.width = 300;
    cardSize.value.height = 530;
  }
});
</script>

<template>
  <div class="flip-card-wrapper">
    <div
      class="flip-card make_sure"
      :style="{ width: `${cardSize.width}px`, height: `${cardSize.height}px` }"
      :class="{
        'card-in': props.cardShow,
        'card-out': !props.cardShow,
        'card-left':
          props.modeText === 'secondInfo' || props.modeText === 'end',
      }"
    >
      <div class="flip-card-inner" :class="{ open: props.cardOpenAni }">
        <div
          class="card-block back-block"
          :style="{ transform: `rotate(${props.degree}deg)` }"
        >
          <div
            class="card-back"
            :style="{ width: `${getTarotImgWidth}px` }"
          ></div>
        </div>
        <div class="card-block front-block">
          <img
            :src="url"
            alt=""
            :style="{
              transform: `scale(${props.cardIsUpright})`,
              width: `${getTarotImgWidth}px`,
            }"
          />
        </div>
        <div
          v-show="!props.cardUpright"
          class="card-block front-block for-reverse"
          :class="{ 'for-reverse-show': props.forReverseImageOpacity }"
        >
          <img :style="{ width: `${getTarotImgWidth}px` }" :src="url" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  position: relative;
  perspective: 1000px;
  opacity: 0;
  visibility: hidden;
  z-index: 100;
  transition: 0.8s;
  left: 0;
}
.make_sure {
  top: -60px;
}
.card-left {
  left: -270px;
}
.for-reverse {
  opacity: 0;
  visibility: hidden;
}
.for-reverse-show {
  opacity: 1;
  visibility: visible;
}
.card-in {
  animation: cardIn 1s both;
}
@keyframes cardIn {
  0% {
    opacity: 0;
    top: -240px;
  }
  100% {
    opacity: 1;
    visibility: visible;
    top: -60px;
  }
}
.card-out {
  animation: cardOut 1s both;
}
@keyframes cardOut {
  0% {
    top: -60px;
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -240px;
    visibility: hidden;
  }
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  /* text-align: center; */
  transition: transform 2s ease;
  transform-style: preserve-3d;
}
.open {
  transform: rotateY(-540deg);
}
.card-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transition: 1s;
  user-select: none;
}
.back-block {
  background-color: #fff;
  background-image: url("/back-new.jpg");
  background-position: 0 17px;
  background-repeat: no-repeat;
  background-size: contain;
}
.front-block {
  transform: rotateY(180deg);
}
/* .card {
  width: 150px;
  width: 280px;
} */
</style>
