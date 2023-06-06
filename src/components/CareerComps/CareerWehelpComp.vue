<script setup>
import CareerWehelpProjComp from "./CareerWehelpProjsComp.vue";
import { ref } from "vue";

const props = defineProps({
  wehelpGoLeft: Boolean,
});
const emit = defineEmits(["changeProj"]);
const wehelpContentCt = ref(0);
const wehelpContentData = ref([
  {
    id: wehelpContentCt.value++,
    content:
      "半年內無手把手教學，獨立完成各項專案，每周均花費 60-70 小時在自主程式學習。",
  },
  {
    id: wehelpContentCt.value++,
    content:
      "五週內獨自開發一款線上視訊會議網站「 beeline 」，後端是以 Golang 撰寫。",
  },
  {
    id: wehelpContentCt.value++,
    content: "運用前端與後端的技能，在六週內獨自完成電商網站「 台北一日遊 」。",
  },
  {
    id: wehelpContentCt.value++,
    content:
      "具有團隊合作的經驗，與另外四名學員完成一項台灣各縣市活動介紹小專案。",
  },
]);

const getEmits = (projId) => {
  emit("changeProj", projId);
};
</script>

<template>
  <div class="wehelp-wrapper">
    <div class="wehelp" :class="{ 'wehelp-go-left': props.wehelpGoLeft }">
      <h3>WeHelp BootCamp</h3>
      <h4>培訓內容 :</h4>
      <ul class="content-info">
        <li v-for="data of wehelpContentData" :key="data.id">
          <font-awesome-icon :icon="['fas', 'check']" class="ic-check" />
          <p>{{ data.content }}</p>
        </li>
      </ul>
      <h4>專案分享 :</h4>
      <div class="projects beeline-height">
        <CareerWehelpProjComp @change-proj="getEmits" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wehelp-wrapper {
  padding: 0 32px;
  position: relative;
  overflow: hidden;
  pointer-events: auto;
  /* border: 1px solid red; */
}
.wehelp-wrapper-pointer-evt-none {
  pointer-events: none;
}
.wehelp {
  position: relative;
  transition: 1s;
  transform: translateX(0);
  left: 0;
}
.wehelp-go-left {
  transform: translateX(-740px);
}

.content-info {
  margin-bottom: 30px;
  margin-left: 10px;
}
.content-info li {
  list-style-type: none;
  font-size: 18px;
  margin-bottom: 10px;
}
p {
  display: inline;
  color: #555;
}
h3 {
  font-size: 22px;
  color: #90651e;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
  left: -20px;
  /* top: -10px; */
}
h4 {
  color: #999;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 15px;
  position: relative;
  left: -20px;
}
.projects {
  position: relative;
}
.ic-check {
  color: #19984e;
  font-size: 25px;
  position: relative;
  top: 2px;
  margin-right: 10px;
}
@media (max-width: 1000px) {
  .wehelp-wrapper {
    top: 0px;
  }
  h3 {
    font-size: 20px;
  }
  .content-info li {
    font-size: 16px;
  }
  .ic-check {
    font-size: 18px;
  }
}
@media (max-width: 850px) {
  .wehelp-wrapper {
    padding: 0 15px;
    width: 90%;
    top: 0px;
  }
  h3,
  h4 {
    left: -13px;
  }
}
@media (max-width: 600px) {
  .wehelp-wrapper {
    padding: 0 15px;
    width: 95%;
    top: 0px;
  }
  .content-info {
    margin-left: -12px;
  }
}
</style>
