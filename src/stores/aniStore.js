import { ref } from "vue";
import { defineStore } from "pinia";

export const useCheckAniBoolStore = defineStore("counter", () => {
  const aniBool = ref(false);

  const toggleAniBool = () => {
    aniBool.value = true;
  };
  return { aniBool, toggleAniBool };
});
