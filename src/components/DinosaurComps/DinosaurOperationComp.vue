<script setup>
import { ref, h } from "vue";

const normalMode = ref(true);
const downTxt = ref("蹲走");

const top = () => {
  return h("div", { class: "top" }, [
    h("img", { class: "pixel", src: "/pixel-up.png" }),
    h("h4", "跳躍"),
  ]);
};
const right = () => {
  return h("div", { class: "right" }, [
    h("img", { class: "pixel px-r", src: "/pixel-right.png" }),
    h("h4", "前進"),
  ]);
};
const bot = () => {
  return h("div", { class: "bot" }, [
    h("img", { class: "pixel", src: "/pixel-down.png" }),
    h("h4", downTxt.value),
  ]);
};

const changeAppMode = () => {
  normalMode.value = false;
  downTxt.value = "拉下頁面";
};

const reset = () => {
  normalMode.value = true;
  downTxt.value = "蹲走";
};

defineExpose({
  changeAppMode,
  reset,
});
</script>

<template>
  <div class="operation-wrapper">
    <div class="line" :class="{ large: !normalMode }">
      <top />
      <right v-if="!normalMode" />
      <bot />
    </div>
  </div>
</template>

<style>
.operation-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  color: #333;
  font-family: "DotGothic16", sans-serif;
}
.operation-wrapper .line {
  position: absolute;
  width: 25%;
  height: 32px;
  left: 50%;
  transform: translateX(-50%);
  bottom: -70px;
  background-color: #666;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.operation-wrapper .large {
  width: 40%;
}
.operation-wrapper .pixel {
  width: 12px;
  position: relative;
  top: 2px;
}
.operation-wrapper .px-r {
  width: 19px;
  top: -2px;
}
.operation-wrapper h4 {
  margin-left: 10px;
  color: #e8e8e8;
  font-size: 19px;
  display: inline-block;
  position: relative;
  top: -1px;
  letter-spacing: 0.1em;
}
</style>
