<script setup>
import { ref } from "vue";

const counter = ref(0);
const solidDeg = ref(0);
const borderCt = ref(0);
const borderDeg = ref(0);
const decos = ref([
  {
    id: counter.value++,
    backgroundColor: "transparent",
    width: 30,
    height: 30,
    left: 850,
    top: 650,
    border: "2px solid rgb(158, 126, 126)",
  },
  {
    id: counter.value++,
    backgroundColor: "rgb(158, 26, 26)",
    width: 20,
    height: 20,
    left: 870,
    top: 640,
    border: "none",
    // transform: "rotate(0deg)",
  },
]);

const fiveDots = ref([
  {
    id: counter.value++,
    backgroundColor: "#3d3d3d",
    width: 10,
    height: 10,
    left: 695,
    top: 70,
    border: "none",
    borderRadius: "50%",
  },
  {
    id: counter.value++,
    backgroundColor: "#474747",
    width: 10,
    height: 10,
    left: 710,
    top: 90,
    border: "none",
    borderRadius: "50%",
  },
  {
    id: counter.value++,
    backgroundColor: "#606060",
    width: 10,
    height: 10,
    left: 725,
    top: 70,
    border: "none",
    borderRadius: "50%",
  },
  {
    id: counter.value++,
    backgroundColor: "#848484",
    width: 10,
    height: 10,
    left: 740,
    top: 90,
    border: "none",
    borderRadius: "50%",
  },
  {
    id: counter.value++,
    backgroundColor: "#aaaaaa",
    width: 10,
    height: 10,
    left: 755,
    top: 70,
    border: "none",
    borderRadius: "50%",
  },
]);

const pictBlockDeco = ref([
  {
    id: counter.value++,
    backgroundColor: "#666",
    width: 150,
    height: 160,
    left: 50,
    top: 20,
    border: "none",
  },
  {
    id: counter.value++,
    backgroundColor: "#ffc800",
    width: 100,
    height: 40,
    left: 226,
    top: 310,
    border: "none",
  },
]);

const crossDeco = ref([
  {
    id: counter.value++,
    backgroundColor: "#999",
    width: 130,
    height: 3,
    left: -116,
    top: 610,
    border: "none",
  },
  {
    id: counter.value++,
    backgroundColor: "rgb(26, 59, 158)",
    width: 2,
    height: 100,
    left: -86,
    top: 540,
    border: "none",
  },
]);

const squareLineDeco = ref([
  {
    id: counter.value++,
    backgroundColor: "transparent",
    width: 15,
    height: 15,
    left: 375,
    top: 180,
    border: "1px solid #cbcbcb",
    transform: "rotate(45deg)",
  },
  {
    id: counter.value++,
    backgroundColor: "#cbcbcb",
    width: 1,
    height: 70,
    left: 382,
    top: 196,
  },
]);

setInterval(() => {
  let tmp = fiveDots.value[4].backgroundColor;
  fiveDots.value[4].backgroundColor = fiveDots.value[3].backgroundColor;
  fiveDots.value[3].backgroundColor = fiveDots.value[2].backgroundColor;
  fiveDots.value[2].backgroundColor = fiveDots.value[1].backgroundColor;
  fiveDots.value[1].backgroundColor = fiveDots.value[0].backgroundColor;
  fiveDots.value[0].backgroundColor = tmp;

  setTimeout(() => {
    decos.value[1].transform = `rotate(${(solidDeg.value += 90)}deg)`;
    borderCt.value++;
  }, 500);
  if (borderCt.value === 5) {
    decos.value[0].transform = `rotate(${(borderDeg.value -= 90)}deg)`;
    borderCt.value = 0;
  }
}, 1000);
</script>

<template>
  <div class="decorate-wrapper">
    <div class="decorate big-one"></div>
    <div v-for="deco of decos" :key="deco.id">
      <div
        class="decorate"
        :style="{
          backgroundColor: `${deco.backgroundColor}`,
          width: `${deco.width}px`,
          height: `${deco.height}px`,
          left: `${deco.left}px`,
          top: `${deco.top}px`,
          border: `${deco.border}`,
          borderRadius: `${deco.borderRadius}`,
          transform: `${deco.transform}`,
        }"
      ></div>
    </div>
    <div class="five-block" v-for="deco of fiveDots" :key="deco.id">
      <div
        class="decorate"
        :style="{
          backgroundColor: `${deco.backgroundColor}`,
          width: `${deco.width}px`,
          height: `${deco.height}px`,
          left: `${deco.left}px`,
          top: `${deco.top}px`,
          border: `${deco.border}`,
          borderRadius: `${deco.borderRadius}`,
          transform: `${deco.transform}`,
        }"
      ></div>
    </div>
    <div class="pict-block" v-for="deco of pictBlockDeco" :key="deco.id">
      <div
        class="decorate"
        :style="{
          backgroundColor: `${deco.backgroundColor}`,
          width: `${deco.width}px`,
          height: `${deco.height}px`,
          left: `${deco.left}px`,
          top: `${deco.top}px`,
          border: `${deco.border}`,
          borderRadius: `${deco.borderRadius}`,
          transform: `${deco.transform}`,
        }"
      ></div>
    </div>
    <div class="cross-block" v-for="deco of crossDeco" :key="deco.id">
      <div
        class="decorate"
        :style="{
          backgroundColor: `${deco.backgroundColor}`,
          width: `${deco.width}px`,
          height: `${deco.height}px`,
          left: `${deco.left}px`,
          top: `${deco.top}px`,
          border: `${deco.border}`,
          borderRadius: `${deco.borderRadius}`,
          transform: `${deco.transform}`,
        }"
      ></div>
    </div>
    <div
      class="square-line-block"
      v-for="deco of squareLineDeco"
      :key="deco.id"
    >
      <div
        class="decorate"
        :style="{
          backgroundColor: `${deco.backgroundColor}`,
          width: `${deco.width}px`,
          height: `${deco.height}px`,
          left: `${deco.left}px`,
          top: `${deco.top}px`,
          border: `${deco.border}`,
          borderRadius: `${deco.borderRadius}`,
          transform: `${deco.transform}`,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.decorate {
  position: absolute;
  transition: 0.3s;
}
.five-block {
  position: relative;
}
.pict-block {
  position: relative;
}
.cross-block {
  position: relative;
}
.square-line-block {
  position: relative;
}
.big-one {
  background-color: #f5ede0;
  width: 240px;
  height: 690px;
  left: -50px;
  top: -110px;
  transition: 0s;
}
@media (max-width: 850px) {
  .big-one {
    width: 220px;
    height: 520px;
  }
  .five-block {
    left: -240px;
    top: -80px;
  }
  .pict-block {
    left: 33px;
  }
  .cross-block {
    top: 310px;
    left: 30px;
  }
  .square-line-block {
    left: -360px;
    top: 250px;
  }
}
</style>
