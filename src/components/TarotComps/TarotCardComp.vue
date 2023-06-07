<script setup>
import { ref, computed, watchEffect } from "vue";
const props = defineProps({
  card: [Object, Number],
  hoverStay: [Boolean, Number],
  extraClick: [Number, Number],
  clicked: [Number, Number],
});
const emit = defineEmits(["card"]);

const top = ref(0);
const card = ref(false);
const timer = ref(null);
const isclicked = ref(false);

const mouseEnterHandler = () => {
  card.value = true;
  top.value = 70;
  timer.value = setInterval(() => {
    emit("card", props.card);
    clearInterval(timer.value);
  }, 300);
};

const mouseLeaveHandler = () => {
  card.value = false;
  top.value = 0;
  clearInterval(timer.value);
};

const returnCard = computed(() => {
  if (card.value) return true;
  if (props.hoverStay[0] && props.hoverStay[1] === props.card[1]) return true;
  return false;
});

const returnTop = computed(() => {
  if (card.value) return 70;
  if (props.hoverStay[0] && props.hoverStay[1] === props.card[1]) return 70;
  return 0;
});

watchEffect(() => {
  if (props.clicked[0] && props.clicked[1] === props.card[1]) {
    isclicked.value = true;
  } else if (!props.clicked[0] && props.clicked[1] === props.card[1]) {
    isclicked.value = false;
  }
  if (props.clicked[1] === -1 && isclicked.value) {
    isclicked.value = false;
  }
});
</script>

<template>
  <div class="card-block-wrapper">
    <div
      class="card-block"
      @mouseenter="mouseEnterHandler"
      @mouseleave="mouseLeaveHandler"
    >
      <div
        class="card"
        :class="{ outline: returnCard, 'card-is-clicked': isclicked }"
        :style="{ top: `${returnTop}px` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.card-block-wrapper {
  position: absolute;
  /* border: 1px solid red; */
  width: 150px;
  height: 320px;
  /* height: 1000px; */
  /* transform-origin: 50% -10%; */
  transform-origin: 50% -500%;
}
.card-block {
  position: absolute;
  width: 150px;
  height: 320px;
  /* border: 1px solid #fff; */
  cursor: pointer;
  z-index: 400;
}
.card {
  position: absolute;
  width: 150px;
  height: 250px;
  outline: 1px solid #a8a8a8;
  border-radius: 10px;
  background-image: url("/back-new.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: scale(-1);
  transition: top 0.4s;
  top: 0px;
  z-index: 400;
  transition-delay: 0.2s;
}
.outline {
  outline: 2px solid #b61717;
}
.card-is-clicked {
  top: 70px !important;
  outline: 2px solid #b61717;
}
@media (max-width: 600px) {
  .card-block {
    transform: rotate(180deg);
  }
  .origibn-70 {
    transform-origin: 50% -70%;
  }
}
</style>
