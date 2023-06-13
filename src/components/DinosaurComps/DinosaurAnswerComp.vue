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
import gsap from "gsap";

const now = ref(0);
const answer = ansData.answer;
const ans = ref(null);
const content = ref(null);
const emit = defineEmits(["answerRemove"]);

const ansShow = () => {
  gsap.to(ans.value, {
    x: 0,
    y: "-100%",
    duration: 1.3,
    delay: 0.9,
    ease: "back",
  });
  gsap.fromTo(
    content.value,
    {
      y: -470,
    },
    {
      y: 0,
      duration: 1.2,
      delay: 1.1,
      ease: "ease",
    }
  );
};

const answerRemoveHandler = () => {
  if (now.value < 7) now.value++;
  emit("answerRemove", true);
  gsap.to(ans.value, {
    x: 0,
    y: "100%",
    duration: 1.5,
    ease: "ease",
  });
  gsap.to(content.value, {
    x: 0,
    y: -470,
    duration: 0,
    delay: 0,
  });
};

const reset = () => {
  now.value = 0;
};

defineExpose({
  ansShow,
  reset,
});
</script>

<template>
  <div ref="ans" class="answer-wrapper">
    <div ref="content" class="outter">
      <div class="down" @click="answerRemoveHandler">
        <font-awesome-icon :icon="['fas', 'circle-chevron-down']" />
      </div>
      <div class="question-number">{{ answer[now].questionNumber }}</div>
      <div class="question">
        {{ answer[now].question }}
      </div>
      <div class="line"></div>
      <div class="answer">
        <Answer1 v-if="now === 0" />
        <Answer2 v-if="now === 1" />
        <Answer3 v-if="now === 2" />
        <Answer4 v-if="now === 3" />
        <Answer5 v-if="now === 4" />
        <Answer6 v-if="now === 5" />
        <Answer7 v-if="now === 6" />
        <Answer8 v-if="now === 7" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.answer-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.83);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 0 100px;
  overflow: hidden;
  top: 100%;
}
.outter {
  margin-top: 60px;
  width: 100%;
  position: relative;
  height: inherit;
}
.question-number {
  font-size: 23px;
  color: #ffffff;
  letter-spacing: 0.1em;
}
.question {
  font-size: 19px;
  color: #ffffff;
  margin-bottom: 10px;
}
.line {
  margin-bottom: 20px;
  width: 85%;
  height: 0.5px;
  background-color: #ffffff;
}
.answer {
  width: 100%;
  font-size: 15px;
  color: #c0c0c0;
}
.down {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  cursor: pointer;
  color: #ffffff;
  opacity: 0.6;
  transition: 0.3s;
}
.down:hover {
  opacity: 0.4;
}
</style>
