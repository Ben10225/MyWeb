<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const handleClickOutSide = (elRef, onClickOutside) => {
  if (!elRef) return;
  const handler = (e) => {
    // 注意一下，如果是在 setup 中使用 vue.ref 取得 dom，那麼必須使用 el.value 提取 dom
    const el = elRef.value;
    console.log("el", el);
    if (!el) return;
    if (!el.contains(e.target)) {
      if (typeof onClickOutside === "function") {
        onClickOutside();
      }
    }
  };
  onMounted(() => {
    window.addEventListener("click", handler);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("click", handler);
  });
};

const data = ref("el");
const el = ref(null);

handleClickOutSide(el, () => {
  console.log("it works");
});

onMounted(() => {
  console.log(el.value);
});
</script>

<template>
  <h1 :ref="data">bla bla...</h1>
</template>

<style scoped>
h1 {
  font-size: 50px;
  color: black;
  background-color: aqua;
  padding: 30px;
}
</style>
