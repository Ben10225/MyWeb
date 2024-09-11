<script setup>
import { ref, computed, watchEffect } from "vue";
import { useJobsData } from "../../stores/jobStore";
import { useWindowSize } from "@vueuse/core";

const store = useJobsData();

const { width } = useWindowSize();

const props = defineProps({
  job: Number,
  reset: Boolean,
});

const pageCount = ref(1);

const txts = ref([
  "各式表單填寫、簽 名",
  "PDF 文件生成、檢 視、下 載",
  "會員系統、權限系統、合約系統",
  "自動生成日報表資料、排序當月每日案件",
]);

const resetLinksCount = () => {
  pageCount.value = 1;
};

watchEffect(() => {
  if (props.reset) {
    resetLinksCount();
  }
  // if (width.value > 850) {
  //   pageMax.value = Math.ceil(store.jobs[props.job].urls.length / 2);
  //   clickGap.value = 2;
  //   clickDistacne.value = 660;
  // } else {
  //   pageMax.value = store.jobs[props.job].urls.length;
  //   clickGap.value = 1;
  //   clickDistacne.value = 330;
  // }
});
</script>

<template>
  <div class="previous-firm-wrapper">
    <div class="block">
      <h3 style="margin-bottom: 12px">聖東營造</h3>
      <h4>工作內容 :</h4>
      <div>
        <p style="display: block">
          職位為全端工程師，一人製作公司內需平台，使紙本上的資料雲端化。
        </p>
        <p style="display: block">
          網頁提供各式表格填寫、簽
          章、文件檢視及產出，使用者也能掌握目前各合約的進度狀況。
        </p>
        <p>簡化過去一些繁瑣的工作流程，為公司帶來效益。</p>
      </div>

      <h4 style="margin-top: 19px">網頁功能：</h4>
      <div v-for="txt in txts" style="color: black">
        <font-awesome-icon
          :icon="['fas', 'check']"
          class="ic-check"
          style="color: green; margin-right: 10px"
        />
        <p>{{ txt }}</p>
      </div>
      <h4 style="margin-top: 19px">前端技術：</h4>
      <p style="display: block">
        NuxtJs (Vue 3)&emsp;Pinia&emsp;Element
        Plus&emsp;Tailwind&emsp;Pdfme&emsp;jspdf&emsp;Moment.js
      </p>
      <h4 style="margin-top: 19px">後端技術：</h4>
      <p style="display: block">
        Hapi (NodeJS)&emsp;MySQL&emsp;MSSQL&emsp;Sequelize
      </p>
    </div>
  </div>
</template>

<style scoped>
.block {
  width: 680px;
  padding: 0 30px;
  position: relative;
  left: -26px;
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
  font-size: 20px;
  color: #90651e;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
  left: -40px;
  top: 1px;
}
h4 {
  color: #999;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 10px;
  position: relative;
  left: -40px;
}
.projects {
  position: relative;
  margin-top: 20px;
}
.ic-clapperboard {
  color: #545454;
  font-size: 18px;
  position: relative;
  top: -1px;
  left: -4px;
  margin-right: 10px;
}
.videos-block {
  display: flex;
  justify-content: center;
}
.video-wrapper {
  width: 621px;
  overflow: hidden;
  position: relative;
}
.ic-arrow {
  position: absolute;
  color: #ededed;
  font-size: 60px;
  bottom: 95px;
  cursor: pointer;
  pointer-events: none;
  transition: 0.4s;
}
.arrow-right {
  right: -30px;
}
.arrow-left {
  left: -30px;
}
.arrow-can-click {
  color: #929292;
  pointer-events: auto;
}
.videos {
  width: 1360px;
  height: 200px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  gap: 40px;
  /* background-color: blue; */
  transform: translateX(0);
  transition: 1s;
}
.videos-next-page {
  transform: translateX(-660px);
}
.yt-link {
  width: 290px;
  height: 165px;
}
.page {
  font-size: 16px;
  color: #555;
  position: relative;
  display: flex;
  justify-content: center;
  top: -5px;
}
.dash {
  margin: 0 5px;
}
@media (max-width: 1000px) {
  .content-info li {
    font-size: 16px;
  }
  .ic-clapperboard {
    font-size: 16px;
  }
}
@media (max-width: 850px) {
  .content-info li {
    width: 350px;
  }
  .previous-firm-wrapper {
    width: 80%;
    display: flex;
    justify-content: start;
  }
  .video-wrapper {
    width: 290px;
  }
  .arrow-right {
    right: 10px;
  }
  .arrow-left {
    left: 10px;
  }
}
@media (max-width: 600px) {
  .firm-block {
    padding: 0px;
    left: -20px;
  }
  .content-info li {
    margin-left: -5px;
    width: 105%;
  }
  h3,
  h4 {
    left: 0;
  }
  .videos-block {
    position: relative;
    justify-content: start;
    transform: scale(0.9);
    left: 5px;
  }
  .arrow-right {
    left: 290px;
    font-size: 45px;
    z-index: 5;
  }
  .arrow-left {
    left: -12px;
    font-size: 45px;
    z-index: 5;
  }
}
</style>
