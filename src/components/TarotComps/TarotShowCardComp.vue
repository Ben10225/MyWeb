<script setup>
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { ref, computed, onMounted, watchEffect } from "vue";
import TarotCardEditMode from "./TarotCardEditMode.vue";

const props = defineProps({
  show: Boolean,
  data: Object,
});
const emit = defineEmits(["back", "restart"]);

const name = ref([]);
const url = ref("");
const key = ref("");
const para = ref([]);
const upright = ref([]);
const reverse = ref([]);

const wrapperZindex = ref(false);
const open = ref(false);
const textOpacity1 = ref(false);
const textOpacity2 = ref(false);
const textOpacity3 = ref(false);
const textOpacity4 = ref(false);
const textOpacity5 = ref(false);
const textOpacity6 = ref(false);

const degree = ref(0);
const mode = ref("beforSelecting");

const cardUpright = ref(false);

const openCardHandler = () => {
  mode.value = "blank";
  open.value = true;
  setTimeout(() => {
    mode.value = "firstInfo";
  }, 1700);
};

const rotateCardHandler = () => {
  cardUpright.value = !cardUpright.value;
  degree.value += 180;
};

const backCardHandler = () => {
  emit("back", false);
  setTimeout(() => {
    wrapperZindex.value = false;
    mode.value = "beforSelecting";
  }, 500);
};

const clickBgHandler = () => {
  if (mode.value === "selecting") {
    emit("back", false);
    setTimeout(() => {
      wrapperZindex.value = false;
      mode.value = "beforSelecting";
    }, 500);
  }
};

const endHandler = () => {
  mode.value = "end";
  emit("restart", true);
  setTimeout(() => {
    emit("back", false);
    open.value = false;
    textOpacity1.value = false;
    textOpacity2.value = false;
    textOpacity3.value = false;
    textOpacity4.value = false;
    textOpacity5.value = false;
    textOpacity6.value = false;
  }, 700);
  setTimeout(() => {
    mode.value = "beforSelecting";
    wrapperZindex.value = false;
  }, 1400);
};

const secondInfoHandler = () => {
  mode.value = "secondInfo";
  let ct = 0;
  setInterval(() => {
    ct++;
    switch (ct) {
      case 7:
        textOpacity1.value = true;
        break;
      case 11:
        textOpacity2.value = true;
        textOpacity6.value = true;
        break;
      case 15:
        textOpacity3.value = true;
        break;
      case 19:
        textOpacity4.value = true;
        break;
      case 23:
        textOpacity5.value = true;
        break;
    }
  }, 100);
};

const cardIsUpright = computed(() => {
  return cardUpright.value ? 1 : -1;
});

const upRightText = computed(() => {
  return cardUpright.value ? "正" : "逆";
});

const getCardData = onMounted(async (data) => {
  if (data === undefined) return;
  try {
    const docRef = doc(db, "tarots", data.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      name.value = docSnap.data().name;
      url.value = docSnap.data().url;
      key.value = docSnap.data().key;
      para.value = docSnap.data().para;
      upright.value = docSnap.data().upright;
      reverse.value = docSnap.data().reverse;
    }
  } catch (err) {
    console.log(err);
  }
});

watchEffect(() => {
  cardUpright.value = props.data.upright;
  if (props.show) {
    mode.value = "selecting";
    wrapperZindex.value = true;
    getCardData(props.data);
  }
});
</script>

<template>
  <!-- <TarotCardEditMode v-if="false" /> -->
  <div
    class="show-card-wrapper"
    :class="{ 'show-card-wrapper-in': wrapperZindex }"
  >
    <div
      class="background"
      :class="{ 'background-in': props.show }"
      @click="clickBgHandler"
    ></div>
    <div class="center-block" :class="{ 'center-block-hide': mode === 'end' }">
      <div class="make-sure-block">
        <div
          class="flip-card make_sure"
          :class="{
            'card-in': props.show,
            'card-out': !props.show,
            'card-left': mode === 'secondInfo' || mode === 'end',
          }"
        >
          <div class="flip-card-inner" :class="{ open }">
            <div
              class="card-block back-block"
              :style="{ transform: `rotate(${degree}deg)` }"
            >
              <div class="card card-back"></div>
            </div>
            <div class="card-block front-block">
              <img
                class="card card-front"
                :src="url"
                alt=""
                :style="{ transform: `scale(${cardIsUpright})` }"
              />
            </div>
            <div
              v-show="!cardUpright"
              class="card-block front-block for-reverse"
              :class="{ 'for-reverse-show': textOpacity6 }"
            >
              <img class="card card-front" :src="url" alt="" />
            </div>
          </div>
        </div>
        <div v-show="mode === 'selecting'" class="buttons">
          <div class="buttons-block back">
            <button @click="backCardHandler">返 回</button>
            <font-awesome-icon
              :icon="['fas', 'arrow-left-long']"
              class="icon-btn"
            />
          </div>
          <div class="buttons-block rotate">
            <button @click="rotateCardHandler">旋 轉</button>
            <font-awesome-icon :icon="['fas', 'rotate']" class="icon-btn" />
          </div>
          <div class="buttons-block select">
            <button @click="openCardHandler">翻 開</button>
            <font-awesome-icon
              :icon="['fas', 'hand-pointer']"
              class="icon-btn"
            />
          </div>
        </div>
        <div v-show="mode === 'firstInfo'" class="first-info">
          <h4>{{ name[0] }}</h4>
          <h5>{{ upRightText }}位</h5>
          <font-awesome-icon
            :icon="['fas', 'circle-arrow-right']"
            class="icon-next"
            @click="secondInfoHandler"
          />
        </div>
      </div>
      <div
        v-show="mode === 'secondInfo' || mode === 'end'"
        class="text-block"
        :class="{ 'text-block-show': mode === 'secondInfo' }"
      >
        <div class="info-title" :class="{ 'text-show': textOpacity1 }">
          <h2 class="info">{{ name[0] }}</h2>
          <h2 class="info english">{{ name[1] }}</h2>
          <p class="key">
            <i
              ><span>{{ key }}</span></i
            >
          </p>
        </div>
        <div class="para-info" :class="{ 'text-show': textOpacity2 }">
          <p class="para color-gray" v-for="(context, i) of para" :key="i">
            {{ context }}
          </p>
        </div>
        <div class="bottom-block">
          <div
            class="upright-info"
            :class="{ 'text-show': textOpacity3, lighten: cardUpright }"
          >
            <h3 class="color-gray"><span>正</span>位：</h3>
            <p class="color-gray" v-for="(context, i) of upright" :key="i">
              {{ context }}
            </p>
          </div>
          <div
            class="reverse-info"
            :class="{ 'text-show': textOpacity4, lighten: !cardUpright }"
          >
            <h3 class="color-gray"><span>逆</span>位：</h3>
            <p class="color-gray" v-for="(context, i) of reverse" :key="i">
              {{ context }}
            </p>
          </div>
        </div>
        <div class="buttons end-btn" :class="{ 'end-btn-show': textOpacity5 }">
          <button @click="endHandler">結束占卜</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-card-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}
.show-card-wrapper-in {
  z-index: 100;
}
.center-block {
  opacity: 1;
  visibility: visible;
  transition: 0.5s;
}
.center-block-hide {
  opacity: 0;
  visibility: hidden;
}
.background {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0px);
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  transition: 0.6s;
}
.background-in {
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(2px);
}
.center-block {
  position: relative;
}
.flip-card {
  position: relative;
  width: 300px;
  height: 530px;
  perspective: 1000px;
  opacity: 0;
  visibility: hidden;
  z-index: 100;
  transition: 0.8s;
  left: 0;
}
.make_sure {
  top: -60px;
}
.card-left {
  left: -270px;
}
.for-reverse {
  opacity: 0;
  visibility: hidden;
}
.for-reverse-show {
  opacity: 1;
  visibility: visible;
}
.card-in {
  animation: cardIn 1s both;
}
@keyframes cardIn {
  0% {
    opacity: 0;
    top: -240px;
  }
  100% {
    opacity: 1;
    visibility: visible;
    top: -60px;
  }
}
.card-out {
  animation: cardOut 1s both;
}
@keyframes cardOut {
  0% {
    top: -60px;
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -240px;
    visibility: hidden;
  }
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  /* text-align: center; */
  transition: transform 2s ease;
  transform-style: preserve-3d;
}
.open {
  transform: rotateY(-540deg);
}
.card-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  transition: 1s;
}
.back-block {
  background-color: #fff;
  background-image: url("/back-new.jpg");
  background-position: 0 17px;
  background-repeat: no-repeat;
  background-size: contain;
}
.front-block {
  transform: rotateY(180deg);
}
.card {
  width: 280px;
}
.text-block {
  width: 500px;
  position: absolute;
  top: -45px;
  left: 100px;
  z-index: 500;
}
.info-title {
  transition: 0.5s;
  opacity: 0;
}
.info {
  font-size: 33px;
  letter-spacing: 0.15em;
  color: #e8e8e8;
  z-index: 300;
  display: inline-block;
  vertical-align: bottom;
}

.english {
  letter-spacing: 0.02em;
  margin-left: 10px;
  font-size: 31px;
  font-family: serif;
  position: relative;
  top: 4px;
}
.key {
  margin-top: -5px;
  font-size: 18px;
  color: #666666;
}
.para-info {
  transition: 0.5s;
  opacity: 0;
}
.para {
  width: 100%;
}
p {
  margin: 20px 0;
  font-size: 16px;
}
.upright-info {
  transition: 0.5s;
  opacity: 0;
}
.reverse-info {
  transition: 0.5s;
  opacity: 0;
}
.text-show {
  opacity: 1;
}
.bottom-block {
  width: 100%;
}
.bottom-block h3 {
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 17px;
  color: #b6b6b6;
}
.bottom-block p {
  margin: 1px 0;
  letter-spacing: 0.01em;
}
.bottom-block span {
  margin-right: 14px;
}
.lighten p,
.lighten h3 {
  color: rgb(255, 220, 137);
}
.color-gray {
  color: #aaaaaa;
}
.buttons {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -70px;
}
.buttons button {
  border: 0.5px solid #ffffff;
  padding: 5px 7px 5px 8px;
  font-size: 17px;
  margin: 0 15px;
  background-color: transparent;
  color: #ffffff;
  letter-spacing: 0.05em;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 400;
  opacity: 0.5;
  transition: 0.4s;
}
.buttons button:hover {
  opacity: 1;
}
.end-btn {
  text-align: left;
  bottom: -110px;
  opacity: 0;
}
.end-btn button {
  padding: 5px 7px 5px 10px;
  color: #c6c6c6;
  border: 0.5px solid #c6c6c6;
}
.end-btn button:hover {
  color: #e3e3e3;
  border: 0.5px solid #e3e3e3;
}
.end-btn-show {
  opacity: 0.8;
}
.buttons-block {
  position: relative;
  display: inline-block;
}
.icon-btn {
  position: absolute;
  left: 33px;
  font-size: 20px;
  top: -50px;
  color: #fff;
  opacity: 0;
  transform: translateX(0px);
}
.first-info {
  position: absolute;
  bottom: -90px;
  width: 100%;
  text-align: center;
}
.first-info h4 {
  color: #ffffff;
  font-size: 30px;
  letter-spacing: 0.1em;
}
.first-info h5 {
  color: #c0c0c0;
  font-size: 17px;
  letter-spacing: 0.1em;
}
.icon-next {
  font-size: 22px;
  margin-top: 20px;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.3s;
  color: #a3a3a3;
}
.icon-next:hover {
  opacity: 1;
  transform: scale(1.2);
  color: #d8d8d8;
}
.back button:hover + .icon-btn {
  opacity: 1;
  animation: btnBack 1.5s infinite both;
}
@keyframes btnBack {
  10% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-15px);
  }
}
.rotate button:hover + .icon-btn {
  opacity: 1;
  animation: btnRotate 1.5s infinite both;
}
@keyframes btnRotate {
  10% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  99% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(00deg);
  }
}
.select button:hover + .icon-btn {
  opacity: 1;
  animation: btnSelect 1.5s infinite both;
}
@keyframes btnSelect {
  0% {
    top: -35px;
  }
  10% {
    top: -35px;
  }
  50% {
    top: -65px;
  }
  55% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.7);
    top: -65px;
  }
  65% {
    transform: scale(1);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: -65px;
  }
}
</style>
