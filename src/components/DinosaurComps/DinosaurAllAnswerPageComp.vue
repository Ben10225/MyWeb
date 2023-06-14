<script setup>
import Answer1 from "@/components/DinosaurComps/AnswersComps/Answer1Comp.vue";
import Answer2 from "@/components/DinosaurComps/AnswersComps/Answer2Comp.vue";
import Answer3 from "@/components/DinosaurComps/AnswersComps/Answer3Comp.vue";
import Answer4 from "@/components/DinosaurComps/AnswersComps/Answer4Comp.vue";
import Answer5 from "@/components/DinosaurComps/AnswersComps/Answer5Comp.vue";
import Answer6 from "@/components/DinosaurComps/AnswersComps/Answer6Comp.vue";
import Answer7 from "@/components/DinosaurComps/AnswersComps/Answer7Comp.vue";
import Answer8 from "@/components/DinosaurComps/AnswersComps/Answer8Comp.vue";
import ansData from "./answer";
import { ref } from "vue";

const emit = defineEmits(["restartGame"]);
const finalPage = ref(false);
const show = ref(false);
const nowAnswer = ref(-1);
const now = ref(1);
const flash = ref(false);

const leftBtns = ref([
  {
    id: 0,
    content: "Q1",
  },
  {
    id: 1,
    content: "Q2",
  },
  {
    id: 4,
    content: "Q5",
  },
  {
    id: 5,
    content: "Q6",
  },
]);

const rightBtns = ref([
  {
    id: 2,
    content: "Q3",
  },
  {
    id: 3,
    content: "Q4",
  },
  {
    id: 6,
    content: "Q7",
  },
  {
    id: 7,
    content: "Q8",
  },
]);

const answerClickHandler = (id) => {
  if (nowAnswer.value === -1) {
    show.value = !show.value;
    nowAnswer.value = id;
    now.value = id;
  } else if (nowAnswer.value === id) {
    show.value = !show.value;
    nowAnswer.value = -1;
  } else {
    flash.value = true;
    setTimeout(() => {
      flash.value = false;
    }, 600);
    setTimeout(() => {
      nowAnswer.value = id;
      now.value = id;
    }, 300);
  }
};

const exitHandler = () => {
  show.value = !show.value;
  nowAnswer.value = -1;
};

const touchFinal = () => {
  finalPage.value = true;
};

const restartGameHandler = () => {
  finalPage.value = false;
  show.value = false;
  nowAnswer.value = -1;
  now.value = 1;
  emit("restartGame", true);
};

defineExpose({
  touchFinal,
});
</script>

<template>
  <div v-if="finalPage" class="all-answer-page-wrapper">
    <div class="outter">
      <div
        class="exit"
        v-show="nowAnswer >= 0 && nowAnswer <= 8"
        @click="exitHandler"
      >
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
      <div
        class="answer-block"
        :class="{ show: nowAnswer >= 0 && nowAnswer <= 8, flash }"
      >
        <div class="question">
          <div class="number">
            {{ ansData.answer[now].questionNumber }}
          </div>
          <div class="question-content">
            {{ ansData.answer[now].question }}
          </div>
        </div>
        <div class="answers">
          <Answer1 v-show="now === 0" />
          <Answer2 v-show="now === 1" />
          <Answer3 v-show="now === 2" />
          <Answer4 v-show="now === 3" />
          <Answer5 v-show="now === 4" />
          <Answer6 v-show="now === 5" />
          <Answer7 v-show="now === 6" />
          <Answer8 v-show="now === 7" />
        </div>
      </div>
      <h1 v-show="!show">通關成功！！</h1>
      <div class="buttons-block">
        <div class="left-btns btns">
          <div class="small-block" :class="{ 'go-left': show }">
            <button
              v-for="b of leftBtns"
              :key="b.id"
              :class="{ clicked: nowAnswer === b.id }"
              @click="answerClickHandler(b.id)"
            >
              {{ b.content }}
            </button>
          </div>
        </div>
        <div class="right-btns btns">
          <div class="small-block" :class="{ 'go-right': show }">
            <button
              v-for="b of rightBtns"
              :key="b.id"
              :class="{ clicked: nowAnswer === b.id }"
              @click="answerClickHandler(b.id)"
            >
              {{ b.content }}
            </button>
          </div>
        </div>
      </div>
      <button v-show="!show" class="end" @click="restartGameHandler">
        結束遊戲
      </button>
    </div>
  </div>
</template>

<style scoped>
.all-answer-page-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #333;
  z-index: 80;
}
.outter {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.answer-block {
  position: absolute;
  width: 60%;
  font-size: 13px;
  color: #c0c0c0;
  margin-top: -50px;
  height: 280px;
  opacity: 0;
  visibility: hidden;
  transition: 0.4s;
}
.show {
  opacity: 1;
  visibility: visible;
}
.flash {
  animation: flashAni 0.6s both;
}
@keyframes flashAni {
  0% {
    opacity: 100;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
}
.number {
  font-size: 20px;
  color: #fff;
}
.question-content {
  font-size: 18px;
  margin-bottom: 20px;
  color: #fff;
}
h1 {
  position: absolute;
  left: 53%;
  top: -55px;
  transform: translateX(-50%);
  color: #e8e8e8;
  font-family: "DotGothic16", sans-serif;
}
.buttons-block {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  top: 10px;
}
.btns {
  width: 100%;
  height: 100%;
}
.left-btns {
  position: relative;
}
.right-btns {
  position: relative;
}
.small-block {
  width: 43%;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  right: -1.5px;
  transition: 1s;
}
.right-btns .small-block {
  left: -1.5px;
}
.go-left {
  right: 60%;
  transform: translateY(-50%) scale(0.8);
}
.right-btns .small-block.go-right {
  left: 60%;
  transform: translateY(-50%) scale(0.8);
}
.btns button {
  width: 80px;
  height: 80px;
  padding: 10px;
  margin: 5px 5px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #545454;
  border-radius: 20px;
  color: #545454;
  font-size: 20px;
  letter-spacing: 0.1em;
  font-weight: 300;
  transition: 0.4s;
  flex: 50%;
  font-family: "DotGothic16", sans-serif;
}
.btns button:hover {
  color: #909090;
  border: 1px solid #909090;
}
.btns button.clicked {
  color: #e8e8e8;
  border: 1px solid #e8e8e8;
}
.exit {
  position: absolute;
  top: -100px;
  right: 174px;
  color: #828282;
  font-size: 25px;
  opacity: 0.5;
  cursor: pointer;
  z-index: 30;
  transition: 0.3s;
}
.exit:hover {
  opacity: 0.7;
}
.end {
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  color: #fff;
  opacity: 0.5;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 200;
  position: relative;
  top: 50px;
  cursor: pointer;
  font-family: "DotGothic16", sans-serif;
}
.end:hover {
  opacity: 0.7;
}
</style>
