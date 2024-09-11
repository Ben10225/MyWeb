<script setup>
import CareerWehelp from "./CareerWehelpComp.vue";
import CareerWehelpBeeline from "./CareerWehelpBeelineComp.vue";
import CareerWehelpTaipei from "./CareerWehelpTaipeiComp.vue";
import CareerPreviousJob from "./CareerPreviousJobComp.vue";
import CareerSaintDong from "./CareerSaintDong.vue";
import { useCheckInProjPage } from "../../stores/projStore";
import { ref, computed, watch } from "vue";

const props = defineProps({
  job: String,
  proj: Boolean,
});
const store = useCheckInProjPage();
const projId = ref(-1);
const now = ref("SaintDong");
const reset = ref(0);
const emit = defineEmits(["projFalse"]);

const getEmits = (res) => {
  projId.value = res;
};

const backHandler = () => {
  projId.value = -2;
  store.inProjPage = false;
};

const projShow = computed(() => {
  if (projId.value === 0) {
    return "beelineShow";
  } else if (projId.value === 1) {
    return "taipeiShow";
  } else if (projId.value === -1) {
    return "quickDisappear";
  } else if (projId.value === -2) {
    return "showDisappear";
  }
});

const wehelpOff = computed(() => {
  return projShow.value === "beelineShow" || projShow.value === "taipeiShow";
});

const wehelpGoLeft = computed(() => {
  return projId.value !== -1 && projId.value !== -2;
});

watch(props, (nV) => {
  if (nV.proj) {
    backHandler();
    emit("projFalse", false);
  }
  if (nV.job !== now.value) {
    projId.value = -1;
    now.value = nV.job;
    reset.value++;
  }
});
</script>

<template>
  <div class="info-wrapper">
    <div class="back-arrow-block">
      <font-awesome-icon
        :icon="['fas', 'left-long']"
        class="back"
        :class="{ 'arrow-show': wehelpOff }"
        @click="backHandler"
      />
    </div>
    <div class="title-block">
      <h1 class="title" :class="{ 'fade-out': wehelpOff }">Career</h1>
    </div>
    <div class="part" v-show="now === '洛商公關'">
      <CareerPreviousJob :job="0" :reset="reset" />
    </div>
    <div class="part" v-show="now === '台北影業'">
      <CareerPreviousJob :job="1" :reset="reset" />
    </div>
    <div class="part">
      <CareerWehelpBeeline class="zIndex10" :beeline-show="projShow" />
    </div>
    <div class="part">
      <CareerWehelpTaipei class="zIndex10" :taipei-show="projShow" />
    </div>
    <div
      class="part"
      v-show="now === 'Wehelp'"
      :class="{
        'beeline-height': projShow === 'beelineShow',
        'taipei-height': projShow === 'taipeiShow',
      }"
    >
      <CareerWehelp
        :class="{
          'prevent-wehelp':
            projShow === 'beelineShow' || projShow === 'taipeiShow',
        }"
        :wehelp-go-left="wehelpGoLeft"
        @change-proj="getEmits"
      />
    </div>
    <div class="part" v-show="now === 'SaintDong'">
      <CareerSaintDong :job="3" class="zIndex10" :reset="reset" />
    </div>
  </div>
</template>

<style scoped>
.info-wrapper {
  width: 90%;
  height: 100%;
  /* min-height: 610px; */
  /* height: 300px; */
  /* margin-top: 160px; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: start;
  padding-top: 53px;
  /* border: 1px solid red; */
}
.part {
  /* position: absolute; */
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
.back-arrow-block {
  position: absolute;
}
.back {
  position: relative;
  font-size: 45px;
  color: rgb(175, 175, 175);
  top: 23px;
  left: -430px;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
  pointer-events: none;
  z-index: 10;
}
.arrow-show {
  opacity: 0.5;
  pointer-events: auto;
}
.title-block {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
}
h1 {
  position: relative;
  font-size: 60px;
  color: #333;
  font-weight: 600;
  transition: 0.3s;
  opacity: 1;
  user-select: auto;
  margin-left: -660px;
}
.fade-out {
  opacity: 0;
  user-select: none;
}
.beeline-height {
  padding-bottom: 0px;
}
.taipei-height {
  padding-bottom: 10px;
}
.zIndex10 {
  z-index: 10;
}
.prevent-wehelp {
  user-select: none;
  pointer-events: none;
}
@media (max-width: 1000px) {
  .info-wrapper {
    margin-left: 30px;
  }
  h1 {
    font-size: 50px;
  }
  .back {
    font-size: 30px;
    left: -390px;
    top: 16px;
  }
  .taipei-height {
    padding-bottom: 30px;
  }
}
@media (max-width: 850px) {
  .title-block {
    justify-content: start;
  }
  h1 {
    font-size: 45px;
    left: 660px;
  }
  .back-arrow-block {
    width: 100%;
    justify-content: start;
  }
  .back {
    position: relative;
    top: -30px;
    left: 35px;
  }
  .beeline-height {
    padding-bottom: 150px;
  }
  .taipei-height {
    padding-bottom: 170px;
  }
}
@media (max-width: 600px) {
  .info-wrapper {
    margin: 0;
  }
  .part {
    justify-content: center;
  }
  h1 {
    font-size: 40px;
    left: 670px;
  }
  .back {
    top: 8px;
    left: 15px;
  }
  .beeline-height {
    padding-bottom: 310px;
  }
}
</style>
