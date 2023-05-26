import { ref } from "vue";
import { defineStore } from "pinia";

export const useJobsData = defineStore("jobCt", () => {
  const ct = ref(0);
  const jobs = ref([
    {
      id: ct.value++,
      job: "rspr",
      content: ["Youtube 頻道影片剪輯、動畫製作。", "影片拍攝相關事宜。"],
      urls: ["MRrLlB8A-OQ", "TidL_Kusy_4", "vR4pqqgDoUg", "FEoK6CEKD08"],
    },
    {
      id: ct.value++,
      job: "taipeiPostProductionData",
      content: [
        "製作電影、廣告等影像相關後製特效。",
        "與客戶協調畫面需求，動畫製作及素材去背。",
      ],
      urls: ["iWSjBna8fUA", "WUz2zXaSkKY", "6xw5QQWUGzc", "I9cWM4daU5U"],
    },
  ]);

  return { jobs };
});
