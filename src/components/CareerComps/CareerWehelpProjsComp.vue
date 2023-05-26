<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useCheckInProjPage } from "../../stores/projStore";

const store = useCheckInProjPage();
const ct = ref(0);
const elBeeline = ref(null);
const elTaipei = ref(null);
const clickNow = ref(null);

const emit = defineEmits(["changeProj"]);

const webs = ref([
  {
    id: ct.value++,
    name: "beeline",
    description: ["線上視訊會議網站", "精緻用戶使用介面", "專案介紹請點擊..."],
    class: "beeline",
    ref: "elBeeline",
    image: "logo",
    mouseHandler: {
      hover: false,
      click: false,
    },
    element: elBeeline,
    stillInside: true,
  },
  {
    id: ct.value++,
    name: "台北一日遊",
    description: ["電商購物網站", "串連第三方金流", "專案介紹請點擊..."],
    class: "taipei",
    ref: "elTaipei",
    image: "taipei",
    mouseHandler: {
      hover: false,
      click: false,
    },
    element: elTaipei,
    stillInside: true,
  },
]);

const changeProj = (id) => {
  emit("changeProj", id);
};

const dragOutsideHandler = () => {
  const mouseOverHandler = (e) => {
    webs.value.forEach((elRef) => {
      if (!elRef) return;
      const id = elRef.id;
      const el = elRef.element[0];
      if (!el) return;

      if (id === clickNow.value) {
        if (!el.contains(e.target)) {
          webs.value[id].stillInside = false;
        } else {
          webs.value[id].stillInside = true;
        }
      }
    });
  };

  const mouseUpHandler = () => {
    webs.value.forEach((web, i) => {
      if (webs.value[i].mouseHandler.click) {
        webs.value[i].mouseHandler.click = false;
      }
    });
  };

  onMounted(() => {
    window.addEventListener("mouseover", mouseOverHandler);
    window.addEventListener("mouseup", mouseUpHandler);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("mouseover", mouseOverHandler);
    window.removeEventListener("mouseup", mouseUpHandler);
  });
};

const projMouseHoverHandler = (bool, id) => {
  const index = webs.value.findIndex((web) => web.id === id);
  webs.value[index].mouseHandler.hover = bool;
};

const projMouseClickHandler = (bool, id) => {
  const index = webs.value.findIndex((web) => web.id === id);
  webs.value[index].mouseHandler.click = bool;
  if (webs.value[index].mouseHandler.click) {
    clickNow.value = index;
    webs.value[index].stillInside = true;
    let ct = 0;
    let timer = setInterval(() => {
      ct++;
      if (!webs.value[index].mouseHandler.click) {
        clearInterval(timer);
        let result = webs.value[index].stillInside;
        if (result) {
          changeProj(webs.value[index].id);
          store.inProjPage = true;
        }
      }
    }, 50);
  }
};

dragOutsideHandler();
</script>

<template>
  <div class="wehelp-proj-wrapper">
    <div
      v-for="web of webs"
      class="proj"
      :ref="web.ref"
      :key="web.id"
      :class="{
        'proj-clicked': web.mouseHandler.click,
        'proj-hover': web.mouseHandler.hover,
      }"
      @mousedown.left="projMouseClickHandler(true, web.id)"
      @mouseup.left="projMouseClickHandler(false, web.id)"
      @mouseenter.left="projMouseHoverHandler(true, web.id)"
      @mouseleave.left="projMouseHoverHandler(false, web.id)"
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
    </div>
  </div>
</template>

<style scoped>
.wehelp-proj-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
}
.proj .info-block {
  margin-left: 10px;
}
.proj h6 {
  font-size: 20px;
  color: #000;
  margin-bottom: 5px;
}
.proj p {
  font-size: 12px;
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
  margin-left: 14px;
  color: #000;
  font-weight: 300;
}
.taipei h6 {
  font-size: 18px;
  margin-bottom: 7px;
}
.proj-hover {
  background-color: rgba(209, 209, 209, 0.2);
  border: 1px solid rgba(228, 189, 71, 0.2);
}
.proj-clicked {
  background-color: rgba(209, 209, 209, 0.7);
  border: 1px solid rgba(228, 189, 71, 0.7);
}
</style>
