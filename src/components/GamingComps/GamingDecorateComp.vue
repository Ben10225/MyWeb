<script setup></script>

<template>
  <div class="top-one"></div>
  <div class="right-one"></div>
  <div class="under-one"></div>
</template>

<style scoped>
.top-one {
  background-color: #c3af8d;
  width: 500px;
  height: 220px;
  left: 0px;
  top: 0px;
  position: fixed;
  opacity: 0.6;
}
.right-one {
  background-color: #efe4d1;
  width: 500px;
  height: 80px;
  right: 0px;
  position: fixed;
  opacity: 0.4;
}
.under-one {
  background-color: #f5ede0;
  width: 65vw;
  height: 150px;
  left: 0;
  bottom: 0px;
  position: fixed;
}
@media (max-width: 1400px) {
  .top-one {
    width: 400px;
  }
}
@media (max-width: 1200px) {
  .top-one {
    width: 15vw;
  }
}
@media (max-width: 850px) {
  .right-one {
    width: 200px;
  }
}
@media (max-width: 600px) {
  .top-one {
    height: 100%;
  }
  .right-one {
    display: none;
  }
  .under-one {
    display: none;
  }
}
</style>
