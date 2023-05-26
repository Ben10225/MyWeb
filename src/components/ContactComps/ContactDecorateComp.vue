<script setup></script>

<template>
  <div class="top-one"></div>
  <div class="under-one"></div>
</template>

<style scoped>
.top-one {
  background-color: #efe4d1;
  width: 100vw;
  height: 170px;
  left: 0px;
  top: 0px;
  position: fixed;
  opacity: 0.6;
  transform-origin: bottom left;
  transform: rotate(-11deg);
}
.under-one {
  background-color: #f5ede0;
  width: 100vw;
  height: 300px;
  left: 0;
  bottom: 0px;
  position: fixed;
  transform-origin: top right;
  transform: rotate(-11deg);
}
</style>
