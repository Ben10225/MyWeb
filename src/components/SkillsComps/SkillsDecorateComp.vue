<script setup>
import SkillsTriangle from "./SkillsTriangleComp.vue";
import { ref } from "vue";

const emit = defineEmits(["toSkillsMain"]);
const counter = ref(0);
const decos = ref([
  {
    id: counter.value++,
    backgroundColor: "#999",
    width: 70,
    height: 2,
    left: 790,
    top: 730,
    border: "none",
  },
  {
    id: counter.value++,
    backgroundColor: "rgb(100, 59, 158)",
    width: 2,
    height: 40,
    left: 846,
    top: 700,
    border: "none",
  },
]);

const responseHandler = () => {
  emit("toSkillsMain");
};
</script>

<template>
  <div v-for="deco of decos" :key="deco.id">
    <div
      class="decorate"
      :style="{
        backgroundColor: `${deco.backgroundColor}`,
        width: `${deco.width}px`,
        height: `${deco.height}px`,
        left: `${deco.left}px`,
        top: `${deco.top}px`,
        border: `${deco.border}`,
        borderRadius: `${deco.borderRadius}`,
        transform: `${deco.transform}`,
      }"
    ></div>
  </div>
  <SkillsTriangle @skills-background="responseHandler" />
</template>

<style scoped>
.decorate {
  position: absolute;
  transition: 0.3s;
  z-index: 10;
}
</style>
