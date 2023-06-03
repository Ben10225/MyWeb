<script setup>
import CareerDecorate from "../components/CareerComps/CareerDecorateComp.vue";
import CareerLineBlock from "../components/CareerComps/CareerLineBlockComp.vue";
import CareerInfoBlock from "../components/CareerComps/CareerInfoBlockComp.vue";

import { ref } from "vue";
const job = ref("Wehelp");
const projLeave = ref(false);

const changeNow = (nowJob) => {
  job.value = nowJob;
};

const projHandler = (resBool) => {
  projLeave.value = resBool;
};
</script>

<template>
  <div class="career-wrapper">
    <div class="outter">
      <CareerInfoBlock :job="job" :proj="projLeave" @proj-false="projHandler" />
      <CareerLineBlock @change-job="changeNow" @proj-leave="projHandler" />
    </div>
    <CareerDecorate class="decorate" />
  </div>
</template>

<style scoped>
.career-wrapper {
  /* width: 100; */
  min-height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.outter {
  width: 100%;
  /* width: 800px; */
  height: 800px;
  position: relative;
  /* position: absolute; */
  /* z-index: 10; */
  display: flex;
  justify-content: center;

  /* left: 50%;
  transform: translateX(-50%); */

  /* background-color: red; */
}
.decorate {
  /* bottom: -30px; */
  width: 100%;
  position: relative;
}
</style>
