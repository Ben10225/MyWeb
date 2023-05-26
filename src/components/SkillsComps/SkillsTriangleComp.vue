<script setup>
import { ref } from "vue";

const emit = defineEmits(["skillsBackground"]);
const nums = ref([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]);

const clickHandler = () => {
  emit("skillsBackground");
};
</script>

<template>
  <div class="triangle-block">
    <div class="touch-block" @click="clickHandler"></div>
    <div class="triangle-outter">
      <div class="dot-outter" v-for="(num, i) of nums" :key="i">
        <div class="dot" v-for="(n, ii) of num" :key="ii"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.triangle-block {
  width: 180px;
  height: 100%;
  position: fixed;
  left: 450px;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 10;
}
.touch-block {
  position: absolute;
  width: 180px;
  height: 200px;
  left: -60px;
  cursor: pointer;
}
.touch-block:hover + .triangle-outter {
  left: 10px;
}
.touch-block:hover + .triangle-outter .dot {
  background-color: #cacaca;
}
.triangle-outter {
  position: relative;
  left: -50px;
  transition: 0.4s;
  pointer-events: none;
}
.dot-outter {
  margin: -7px;
}
.dot {
  width: 12px;
  height: 12px;
  background-color: #888;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  transition: 0.4s;
}
</style>
