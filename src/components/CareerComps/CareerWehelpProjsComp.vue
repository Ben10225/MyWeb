<script setup>
import { ref } from "vue";
import { useCheckInProjPage } from "../../stores/projStore";

const store = useCheckInProjPage();
const ct = ref(0);

const emit = defineEmits(["changeProj"]);

const webs = ref([
  {
    id: ct.value++,
    name: "beeline",
    description: ["線上視訊會議網站", "精緻用戶使用介面", "專案介紹請點擊..."],
    class: "beeline",
    ref: "elBeeline",
    image: "logo",
  },
  {
    id: ct.value++,
    name: "台北一日遊",
    description: ["電商購物網站", "串連第三方金流", "專案介紹請點擊..."],
    class: "taipei",
    ref: "elTaipei",
    image: "taipei",
  },
]);

const changeProj = (id) => {
  emit("changeProj", id);
};

const clickHandler = (web) => {
  changeProj(web.id);
  store.inProjPage = true;
};
</script>

<template>
  <div class="wehelp-proj-wrapper">
    <button
      v-for="web of webs"
      class="proj"
      :ref="web.ref"
      :key="web.id"
      :class="web.class"
      @click="clickHandler(web)"
    >
      <div
        class="logo"
        :style="{
          backgroundImage: `url('/${web.image}.svg')`,
        }"
      ></div>
      <div class="info-block">
        <h6>{{ web.name }}</h6>
        <ul>
          <li v-for="(desc, i) of web.description" :key="i">
            {{ desc }}
          </li>
        </ul>
      </div>
    </button>
  </div>
</template>

<style scoped>
.wehelp-proj-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}
.proj .info-block {
  position: relative;
  left: 10px;
  top: 7px;
}
.proj h6 {
  font-size: 21px;
  color: #222;
  margin-bottom: 3px;
  height: 30px;
  text-align: center;
}
.proj {
  width: 300px;
  margin: 0px 20px;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 10px;
  background-color: rgba(209, 209, 209, 0);
  border: 1px solid rgba(100, 100, 100, 0);
  transition: 0.4s;
  user-select: none;
}
.logo {
  width: 105px;
  height: 105px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
}
.info-block {
  margin-top: -1px;
}
.info-block li {
  margin-left: 10px;
  margin-bottom: 1px;
  color: #000;
  font-weight: 300;
  text-align: left;
  font-size: 14px;
}
.taipei h6 {
  font-size: 18px;
}
button:active {
  background-color: rgba(209, 209, 209, 0.7) !important;
  border: 1px solid rgba(228, 189, 71, 0.7) !important;
}
button:hover {
  background-color: rgba(209, 209, 209, 0.2);
  border: 1px solid rgba(228, 189, 71, 0.2);
}
@media (max-width: 850px) {
  .wehelp-proj-wrapper {
    justify-content: space-around;
  }
  .proj {
    /* margin: 5px 0; */
    width: 260px;
    margin: 0px;
    /* flex-direction: column; */
    align-items: center;
    /* border: 1px solid #000; */
  }
  .logo {
    width: 80px;
    height: 80px;
    position: relative;
    margin-right: 0;
  }
  .proj h6 {
    text-align: left;
  }
  .info-block li {
    width: 105px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    list-style-position: inside;
  }
}
@media (max-width: 600px) {
  .wehelp-proj-wrapper {
    flex-direction: column;
  }
}
</style>
