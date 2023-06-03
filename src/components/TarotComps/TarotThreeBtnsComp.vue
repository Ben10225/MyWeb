<script setup>
const props = defineProps({
  stopThreeBtns: Boolean,
});

const emit = defineEmits([
  "back-btn-click",
  "rotate-btn-click",
  "open-card-btn-click",
]);

const backBtnHandler = () => {
  emit("back-btn-click", "clicked");
};

const rotateBtnHandler = () => {
  emit("rotate-btn-click", "clicked");
};

const openCardBtnHandler = () => {
  emit("open-card-btn-click", "clicked");
};
</script>

<template>
  <div class="three-btns-wrapper">
    <div class="buttons-block back">
      <button
        @click="backBtnHandler"
        :class="{ 'btn-prevent': props.stopThreeBtns }"
      >
        返 回
      </button>
      <font-awesome-icon :icon="['fas', 'arrow-left-long']" class="icon-btn" />
    </div>
    <div class="buttons-block rotate">
      <button
        @click="rotateBtnHandler"
        :class="{ 'btn-prevent': props.stopThreeBtns }"
      >
        旋 轉
      </button>
      <font-awesome-icon :icon="['fas', 'rotate']" class="icon-btn" />
    </div>
    <div class="buttons-block select">
      <button
        @click="openCardBtnHandler"
        :class="{ 'btn-prevent': props.stopThreeBtns }"
      >
        翻 開
      </button>
      <font-awesome-icon :icon="['fas', 'hand-pointer']" class="icon-btn" />
    </div>
  </div>
</template>

<style scoped>
.three-btns-wrapper {
  width: 100%;
  position: relative;
}
.buttons {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -70px;
}
.buttons button {
  border: 0.5px solid #ffffff;
  padding: 5px 7px 5px 8px;
  font-size: 17px;
  margin: 0 15px;
  background-color: transparent;
  color: #ffffff;
  letter-spacing: 0.05em;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 400;
  opacity: 0.4;
  transition: 0.4s;
}
button:hover {
  opacity: 1;
}
.btn-prevent {
  pointer-events: none;
}
.buttons-block {
  position: relative;
  display: inline-block;
}
.icon-btn {
  position: absolute;
  left: 33px;
  font-size: 20px;
  top: -50px;
  color: #fff;
  opacity: 0;
  transform: translateX(0px);
  transition: opacity 0.3s;
}
.back button:hover + .icon-btn {
  opacity: 1;
  animation: btnBack 1.5s infinite both;
}
@keyframes btnBack {
  10% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-15px);
  }
}
.rotate button:hover + .icon-btn {
  opacity: 1;
  animation: btnRotate 1.5s infinite both;
}
@keyframes btnRotate {
  10% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  99% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(00deg);
  }
}
.select button:hover + .icon-btn {
  opacity: 1;
  animation: btnSelect 1.5s infinite both;
}
@keyframes btnSelect {
  0% {
    top: -35px;
    opacity: 0;
  }
  10% {
    top: -35px;
    opacity: 1;
  }
  50% {
    top: -65px;
  }
  55% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.7);
    top: -65px;
  }
  65% {
    transform: scale(1);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -65px;
  }
}
</style>
