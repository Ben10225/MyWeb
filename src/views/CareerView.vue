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
      <CareerDecorate />
      <CareerInfoBlock :job="job" :proj="projLeave" @proj-false="projHandler" />
      <CareerLineBlock @change-job="changeNow" @proj-leave="projHandler" />
    </div>
  </div>
</template>

<style scoped>
.career-wrapper {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.outter {
  width: 800px;
  height: 800px;
  position: relative;
}
</style>
