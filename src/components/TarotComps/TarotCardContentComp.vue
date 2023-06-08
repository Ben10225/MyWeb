<script setup>
const props = defineProps({
  content: Object,
});
</script>

<template>
  <div class="card-content-wrapper">
    <div
      class="info-title"
      :class="{ 'text-show': props.content.titleOpacity }"
    >
      <h2 class="info">{{ props.content.titleTw }}</h2>
      <h2 class="info english">{{ props.content.titleEg }}</h2>
      <p class="key">
        <i
          ><span>{{ props.content.key }}</span></i
        >
      </p>
    </div>
    <div class="para-info" :class="{ 'text-show': props.content.paraOpacity }">
      <p
        class="para color-gray"
        v-for="(context, i) of props.content.para"
        :key="i"
      >
        {{ context }}
      </p>
    </div>
    <div class="bottom-block">
      <div
        class="upright-info"
        :class="{
          'text-show': props.content.uprightOpacity,
          lighten: props.content.cardUpright,
        }"
      >
        <h3 class="color-gray"><span>正</span>位：</h3>
        <p
          class="color-gray"
          v-for="(context, i) of props.content.upright"
          :key="i"
        >
          {{ context }}
        </p>
      </div>
      <div
        class="reverse-info"
        :class="{
          'text-show': props.content.reverseOpacity,
          lighten: !props.content.cardUpright,
        }"
      >
        <h3 class="color-gray"><span>逆</span>位：</h3>
        <p
          class="color-gray"
          v-for="(context, i) of props.content.reverse"
          :key="i"
        >
          {{ context }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-title {
  transition: 0.5s;
  opacity: 0;
}
.info {
  font-size: 33px;
  letter-spacing: 0.15em;
  color: #e8e8e8;
  z-index: 300;
  display: inline-block;
  vertical-align: bottom;
}

.english {
  letter-spacing: 0.02em;
  margin-left: 10px;
  font-size: 31px;
  font-family: serif;
  position: relative;
  top: 4px;
}
.key {
  margin-top: -5px;
  font-size: 18px;
  color: #6f6f6f;
}
.para-info {
  transition: 0.5s;
  opacity: 0;
}
.para {
  width: 100%;
}
p {
  margin: 20px 0;
  font-size: 16px;
}
.upright-info {
  transition: 0.5s;
  opacity: 0;
}
.reverse-info {
  transition: 0.5s;
  opacity: 0;
}
.text-show {
  opacity: 1;
}
.bottom-block {
  width: 100%;
}
.bottom-block h3 {
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 17px;
  color: #b6b6b6;
}
.bottom-block p {
  margin: 1px 0;
  letter-spacing: 0.01em;
}
.bottom-block span {
  margin-right: 14px;
}
.lighten p,
.lighten h3 {
  color: rgb(255, 220, 137);
}
.color-gray {
  color: #aaaaaa;
}
@media (max-height: 700px), (max-width: 1000px) {
  .info {
    font-size: 22px;
  }
  .key {
    font-size: 13px;
  }
  p {
    font-size: 14px;
    margin: 7px 0;
  }
  .bottom-block h3 {
    font-size: 15px;
    margin-top: 10px;
  }
}
@media (max-width: 600px) {
  .card-content-wrapper {
    width: 70%;
  }
  .info {
    font-size: 20px;
    letter-spacing: 0.01em;
  }
  .key {
    font-size: 11px;
  }
  p {
    font-size: 14px;
  }
  .bottom-block h3 {
    font-size: 14px;
  }
}
</style>
