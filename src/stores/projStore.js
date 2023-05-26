import { ref } from "vue";
import { defineStore } from "pinia";

export const useCheckInProjPage = defineStore("counter", () => {
  const inProjPage = ref(false);

  return { inProjPage };
});
