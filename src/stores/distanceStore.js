import { ref } from "vue";
import { defineStore } from "pinia";

export const useDinosaurStore = defineStore("dinoId", () => {
  const distance = ref(50);
  const walking = ref(false);
  const stillPressRight = ref(false);
  const pauseJump = ref(false);

  return { distance, walking, stillPressRight, pauseJump };
});
