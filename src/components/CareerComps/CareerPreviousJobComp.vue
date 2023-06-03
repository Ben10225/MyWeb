<script setup>
import { ref, computed, watch } from "vue";
import { useJobsData } from "../../stores/jobStore";

const store = useJobsData();

const props = defineProps({
  job: Number,
  reset: Boolean,
});

const transformPx = ref(0);
const linksLengthCount = ref(0);
const pageCount = ref(1);
const pageMax = ref(Math.ceil(store.jobs[props.job].urls.length / 2));
const TPYtLinks = ref(store.jobs[props.job].urls);

const clickRightArrow = () => {
  if (TPYtLinks.value.length - linksLengthCount.value <= 2) return;
  transformPx.value -= 660;
  linksLengthCount.value += 2;
  pageCount.value++;
};

const clickLeftArrow = () => {
  if (linksLengthCount.value === 0) return;
  transformPx.value += 660;
  linksLengthCount.value -= 2;
  pageCount.value--;
};

const rightArrowShowUp = computed(() => {
  return TPYtLinks.value.length - linksLengthCount.value > 2;
});

const leftArrowShowUp = computed(() => {
  return linksLengthCount.value !== 0;
});

const resetLinksCount = () => {
  transformPx.value = 0;
  linksLengthCount.value = 0;
  pageCount.value = 1;
};

watch(props, () => {
  if (props.reset) {
    resetLinksCount();
  }
});
</script>

<template>
  <div class="taipeiPostProduction-wrapper">
    <div class="taipeiPostProduction">
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
</template>

<style scoped>
.taipeiPostProduction {
  position: relative;
  left: -77px;
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
  display: inline-block;
  color: #555;
}
h3 {
  font-size: 20px;
  color: #90651e;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
  left: -30px;
  top: 1px;
}
h4 {
  color: #999;
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 15px;
  position: relative;
  left: -30px;
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
.video-wrapper {
  width: 622px;
  overflow: hidden;
  position: relative;
  left: 40px;
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
  right: -90px;
}
.arrow-left {
  left: -10px;
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
</style>
