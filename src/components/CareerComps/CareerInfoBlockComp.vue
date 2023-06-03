<script setup>
import CareerWehelp from "./CareerWehelpComp.vue";
import CareerWehelpBeeline from "./CareerWehelpBeelineComp.vue";
import CareerWehelpTaipei from "./CareerWehelpTaipeiComp.vue";
import CareerPreviousJob from "./CareerPreviousJobComp.vue";
import { useCheckInProjPage } from "../../stores/projStore";
import { ref, computed, watch } from "vue";

const props = defineProps({
  job: String,
  proj: Boolean,
});
const store = useCheckInProjPage();
const projId = ref(-1);
const now = ref("Wehelp");
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
    <h1 class="title" :class="{ 'fade-out': wehelpOff }">Career</h1>
    <font-awesome-icon
      :icon="['fas', 'left-long']"
      class="back"
      :class="{ 'arrow-show': wehelpOff }"
      @click="backHandler"
    />
    <div class="part">
      <CareerPreviousJob v-show="now === '洛商公關'" :job="0" :reset="reset" />
    </div>
    <div class="part">
      <CareerPreviousJob v-show="now === '台北影業'" :job="1" :reset="reset" />
    </div>

    <div class="part">
      <CareerWehelp
        v-show="now === 'Wehelp'"
        :wehelp-go-left="wehelpGoLeft"
        @change-proj="getEmits"
      />
    </div>
    <div class="part">
      <CareerWehelpBeeline :beeline-show="projShow" />
    </div>
    <div class="part">
      <CareerWehelpTaipei :taipei-show="projShow" />
    </div>
  </div>
</template>

<style scoped>
.info-wrapper {
  width: 100%;
  /* margin-left: 85px; */
  margin-top: 160px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: start;
  left: 45px;
}
.part {
  position: absolute;
}
.back {
  position: absolute;
  font-size: 45px;
  color: rgb(175, 175, 175);
  top: -70px;
  left: 70px;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
  pointer-events: none;
}
.back:hover {
  opacity: 0.8;
}
.arrow-show {
  opacity: 0.5;
  pointer-events: auto;
}
h1 {
  position: relative;
  font-size: 60px;
  color: #333;
  font-weight: 600;
  top: -105px;
  left: -380px;
  transition: 0.3s;
  opacity: 1;
  user-select: auto;
}

.fade-out {
  opacity: 0;
  user-select: none;
}
</style>
