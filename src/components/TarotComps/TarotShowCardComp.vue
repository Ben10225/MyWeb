<script setup>
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { ref, computed, onMounted, watchEffect } from "vue";
import TarotThreeBtns from "./TarotThreeBtnsComp.vue";
import TarotCardContent from "./TarotCardContentComp.vue";
import TarotFlipCard from "./TarotFlipCardComp.vue";

const props = defineProps({
  show: Boolean,
  data: Object,
});
const emit = defineEmits(["back", "restart"]);

const content = ref({
  titleTw: "",
  titleEg: "",
  key: "",
  para: [],
  upright: [],
  reverse: [],
  titleOpacity: false,
  paraOpacity: false,
  uprightOpacity: false,
  reverseOpacity: false,
  cardUpright: false,
});

const mode = ref("beforSelecting");
const url = ref("");
const degree = ref(0);
const wrapperZindex = ref(false);
const open = ref(false);
const endBtnOpacity = ref(false);
const forReverseImageOpacity = ref(false);
const cardUpright = ref(false);
const stopThreeBtns = ref(true);
const stopEndBtn = ref(true);

const openCardHandler = (res) => {
  stopThreeBtns.value = true;
  mode.value = "blank";
  open.value = true;
  setTimeout(() => {
    mode.value = "firstInfo";
  }, 1700);
};

const rotateCardHandler = (res) => {
  content.value.cardUpright = !content.value.cardUpright;
  degree.value += 180;
};

const backCardHandler = (res) => {
  stopThreeBtns.value = true;
  emit("back", false);
  setTimeout(() => {
    wrapperZindex.value = false;
    mode.value = "beforSelecting";
  }, 500);
};

const clickBgHandler = () => {
  stopThreeBtns.value = true;
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
  stopEndBtn.value = true;
  emit("restart", true);
  setTimeout(() => {
    emit("back", false);
    open.value = false;
    content.value.titleOpacity = false;
    content.value.paraOpacity = false;
    content.value.uprightOpacity = false;
    content.value.reverseOpacity = false;
    endBtnOpacity.value = false;
    forReverseImageOpacity.value = false;
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
        content.value.titleOpacity = true;
        break;
      case 11:
        content.value.paraOpacity = true;
        forReverseImageOpacity.value = true;
        break;
      case 15:
        content.value.uprightOpacity = true;
        break;
      case 19:
        content.value.reverseOpacity = true;
        break;
      case 23:
        stopEndBtn.value = false;
        endBtnOpacity.value = true;
        break;
    }
  }, 100);
};

const cardIsUpright = computed(() => {
  return content.value.cardUpright ? 1 : -1;
});

const upRightText = computed(() => {
  return content.value.cardUpright ? "正" : "逆";
});

const getCardData = onMounted(async (data) => {
  if (data === undefined) return;
  try {
    const docRef = doc(db, "tarots", data.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      content.value.titleTw = docSnap.data().name[0];
      content.value.titleEg = docSnap.data().name[1];
      content.value.key = docSnap.data().key;
      content.value.para = docSnap.data().para;
      content.value.upright = docSnap.data().upright;
      content.value.reverse = docSnap.data().reverse;

      url.value = docSnap.data().url;
    }
  } catch (err) {
    console.log(err);
  }
});

watchEffect(() => {
  content.value.cardUpright = props.data.upright;
  if (props.show) {
    mode.value = "selecting";
    stopThreeBtns.value = false;
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
        <TarotFlipCard
          :mode-text="mode"
          :card-show="props.show"
          :card-open-ani="open"
          :degree="degree"
          :card-upright="cardUpright"
          :card-is-upright="cardIsUpright"
          :url="url"
          :for-reverse-image-opacity="forReverseImageOpacity"
        />
        <div v-show="mode === 'selecting'" class="buttons">
          <TarotThreeBtns
            :stop-three-btns="stopThreeBtns"
            @back-btn-click="backCardHandler"
            @rotate-btn-click="rotateCardHandler"
            @open-card-btn-click="openCardHandler"
          />
        </div>
        <div v-show="mode === 'firstInfo'" class="first-info">
          <h4>{{ content.titleTw }}</h4>
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
        <TarotCardContent :content="content" />
        <div class="buttons end-btn" :class="{ 'end-btn-show': endBtnOpacity }">
          <button :class="{ 'btn-prevent': stopEndBtn }" @click="endHandler">
            結束占卜
          </button>
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
.text-block {
  width: 500px;
  position: absolute;
  top: -45px;
  left: 100px;
  z-index: 500;
}
.buttons {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -70px;
}
button {
  padding: 5px 7px 5px 10px;
  font-size: 17px;
  margin: 0 15px;
  background-color: transparent;
  color: #c6c6c6;
  border: 0.5px solid #c6c6c6;
  letter-spacing: 0.05em;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 400;
  opacity: 0.4;
  transition: 0.4s;
}
button:hover {
  color: #ffffff;
  border: 0.5px solid #f0f0f0;
  opacity: 0.7;
}
.end-btn {
  text-align: left;
  bottom: -110px;
  opacity: 0;
  user-select: none;
}
.end-btn-show {
  opacity: 1;
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
.btn-prevent {
  pointer-events: none;
}
</style>
