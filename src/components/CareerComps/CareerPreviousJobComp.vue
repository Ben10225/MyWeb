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

const transformPx = ref(0);
const linksLengthCount = ref(0);
const pageCount = ref(1);
const clickGap = ref(0);
const clickDistacne = ref(0);
const pageMax = ref(0);
const TPYtLinks = ref(store.jobs[props.job].urls);

const clickRightArrow = () => {
  if (clickGap.value === 2) {
    if (TPYtLinks.value.length - linksLengthCount.value <= 2) return;
  } else if (clickGap.value === 1) {
    if (TPYtLinks.value.length === pageCount.value) return;
  }
  transformPx.value -= clickDistacne.value;
  linksLengthCount.value += clickGap.value;
  pageCount.value++;
};

const clickLeftArrow = () => {
  if (linksLengthCount.value === 0) return;
  transformPx.value += clickDistacne.value;
  linksLengthCount.value -= clickGap.value;
  pageCount.value--;
};

const rightArrowShowUp = computed(() => {
  switch (clickGap.value) {
    case 2:
      return TPYtLinks.value.length - linksLengthCount.value > 2;
    case 1:
      return TPYtLinks.value.length > pageCount.value;
  }
});

const leftArrowShowUp = computed(() => {
  return linksLengthCount.value !== 0;
});

const resetLinksCount = () => {
  transformPx.value = 0;
  linksLengthCount.value = 0;
  pageCount.value = 1;
};

watchEffect(() => {
  if (props.reset) {
    resetLinksCount();
  }
  if (width.value > 850) {
    pageMax.value = Math.ceil(store.jobs[props.job].urls.length / 2);
    clickGap.value = 2;
    clickDistacne.value = 660;
  } else {
    pageMax.value = store.jobs[props.job].urls.length;
    clickGap.value = 1;
    clickDistacne.value = 330;
  }
});
</script>

<template>
  <div class="previous-firm-wrapper">
    <div class="firm-block">
      <h3>{{ store.jobs[props.job].firm }}</h3>
      <h4>工作內容 :</h4>
      <ul class="content-info">
        <li v-for="(content, i) of store.jobs[props.job].content" :key="i">
          <font-awesome-icon
            :icon="['fas', 'clapperboard']"
            class="ic-clapperboard"
          />
          <p>{{ content }}</p>
        </li>
      </ul>
      <h4>作品集 :</h4>
      <font-awesome-icon
        :icon="['fas', 'caret-left']"
        class="ic-arrow arrow-left"
        @click="clickLeftArrow"
        :class="{ 'arrow-can-click': leftArrowShowUp }"
      />
      <font-awesome-icon
        :icon="['fas', 'caret-right']"
        class="ic-arrow arrow-right"
        @click="clickRightArrow"
        :class="{ 'arrow-can-click': rightArrowShowUp }"
      />
      <div class="videos-block">
        <div class="video-wrapper">
          <div
            class="videos"
            :style="{ transform: `translateX(${transformPx}px)` }"
          >
            <div v-for="(link, i) of TPYtLinks" :key="i" class="yt-link">
              <vue-plyr>
                <div
                  data-plyr-provider="youtube"
                  :data-plyr-embed-id="link"
                ></div>
              </vue-plyr>
            </div>
          </div>
          <div class="page">
            <span>{{ pageCount }}</span
            ><span class="dash">/</span><span>{{ pageMax }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.firm-block {
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
  margin-bottom: 15px;
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
