<script setup>
import { ref } from "vue";

const counter = ref(0);
const solidDeg = ref(0);
const borderCt = ref(0);
const borderDeg = ref(0);
const decos = ref([
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

setInterval(() => {
  let tmp = decos.value[12].backgroundColor;
  decos.value[12].backgroundColor = decos.value[11].backgroundColor;
  decos.value[11].backgroundColor = decos.value[10].backgroundColor;
  decos.value[10].backgroundColor = decos.value[9].backgroundColor;
  decos.value[9].backgroundColor = decos.value[8].backgroundColor;
  decos.value[8].backgroundColor = tmp;

  setTimeout(() => {
    decos.value[3].transform = `rotate(${(solidDeg.value += 90)}deg)`;
    borderCt.value++;
  }, 500);
  if (borderCt.value === 5) {
    decos.value[2].transform = `rotate(${(borderDeg.value -= 90)}deg)`;
    borderCt.value = 0;
  }
}, 1000);
</script>

<template>
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
</template>

<style scoped>
.decorate {
  position: absolute;
  transition: 0.3s;
}

.big-one {
  background-color: #f5ede0;
  width: 240px;
  height: 690px;
  left: -50px;
  top: -110px;
}
</style>
