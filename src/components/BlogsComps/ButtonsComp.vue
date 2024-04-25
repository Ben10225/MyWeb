<script setup>
const props = defineProps({
  mode: String,
});

const emit = defineEmits(["changeMode", "triggerShowEditor"]);

const handleToggle = (m) => {
  if (props.mode !== m) {
    emit("changeMode", m);
  }
};
</script>

<template>
  <div class="buttons">
    <button
      :class="['life', props.mode === 'LIFE' ? '' : 'fade']"
      @click="handleToggle('LIFE')"
    >
      生活日記
    </button>
    <button
      :class="['program', , props.mode !== 'LIFE' ? '' : 'fade']"
      @click.exact="handleToggle('PROGRAM')"
      @click.right.shift.alt.exact.prevent="emit('triggerShowEditor')"
    >
      程式筆記
    </button>
  </div>
</template>

<style>
.buttons {
  width: 300px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 35px;
  position: relative;
}
button {
  font-size: 27px;
  cursor: pointer;
  border: 0px;
  background-color: transparent;
  margin: 0 20px;
  font-weight: bold;
  color: rgb(143, 72, 22);
  position: relative;
  transition: 0.4s;
}
.life {
  position: absolute;
  left: 30px;
  opacity: 1;
}
.life.fade {
  left: 0px;
  opacity: 0.3;
  transform: scale(0.6) translate(10px, 10px);
}
.program {
  position: relative;
  opacity: 1;
  left: 40px;
}
.program.fade {
  transform: scale(0.6) translate(40px, 10px);
  opacity: 0.3;
}
@media (max-width: 600px) {
  .buttons {
    margin-top: 60px;
    margin-bottom: 10px;
  }
}
</style>
