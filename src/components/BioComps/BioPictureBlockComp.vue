<script setup>
import { ref, onMounted } from "vue";

const outter = ref("outter");
const photoId = ref(0);
const dotNumber = ref(0);
const pictWith = ref(0);
const outterRight = ref(0);

const photos = ref([
  {
    id: photoId.value++,
    fileName: "peng.jpg",
    width: "100%",
    height: "100%",
    backgroundPosition: "center",
  },
  {
    id: photoId.value++,
    fileName: "IMG_5791_2.jpg",
    width: "119%",
    height: "119%",
    backgroundPosition: "-25px -37px",
  },
  {
    id: photoId.value++,
    fileName: "IMG_6912_2.jpg",
    width: "110%",
    height: "110%",
    backgroundPosition: "-24px -20px",
  },
]);

const clickDotHandler = (id) => {
  if (id === dotNumber.value) return;
  let gap = id - dotNumber.value;
  dotNumber.value = id;
  outterRight.value += gap * pictWith.value;
};

const dotClicked = (id) => {
  return dotNumber.value === id;
};

onMounted(() => {
  pictWith.value = outter.value.clientWidth;
});
</script>

<template>
  <div class="picture-wrapper">
    <div class="picture-block-sequence-outter" ref="outter">
      <div
        class="picture-block-sequence"
        :style="{ right: `${outterRight}px` }"
      >
        <div class="picture-block" v-for="photo of photos" :key="photo.id">
          <div
            class="pict"
            :style="{
              backgroundImage: `url('/${photo.fileName}')`,
              width: `${photo.width}`,
              height: `${photo.height}`,
              backgroundPosition: `${photo.backgroundPosition}`,
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="picture-dots">
      <div
        class="dot-outter"
        v-for="photo of photos"
        :key="photo.id"
        @click="clickDotHandler(photo.id)"
      >
        <div class="dot" :class="{ 'dot-clicked': dotClicked(photo.id) }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picture-wrapper {
  padding: 60px;
}
.picture-block-sequence-outter {
  width: 240px;
  height: 280px;
  overflow: hidden;
  box-shadow: 3px -3px 0px rgba(170, 17, 17, 0.7);
}
.picture-block-sequence {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: relative;
  transition: all 0.6s;
}
.picture-block {
  width: 240px;
  height: 280px;
  overflow: hidden;
}
.pict {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 0.6s;
  left: 0;
  top: 0;
}
.picture-dots {
  display: flex;
  justify-content: start;
  margin-top: 60px;
  position: relative;
  right: 30px;
}
.dot-outter {
  width: 18px;
  height: 18px;
  background-color: #888;
  display: inline-block;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
  position: relative;
}
.dot {
  width: 11px;
  height: 11px;
  background-color: #ffc800;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3;
  opacity: 0;
}
.dot-clicked {
  opacity: 1;
}
@media (max-width: 850px) {
  .picture-dots {
    right: -80px;
    margin-top: 30px;
  }
}
</style>
