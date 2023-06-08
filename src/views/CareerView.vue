<script setup>
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
  </div>
</template>

<style scoped>
.career-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #f5ede0;
}
.outter {
  width: 100%;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
