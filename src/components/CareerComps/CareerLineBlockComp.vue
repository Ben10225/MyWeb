<script setup>
import { ref, computed } from "vue";
import { useCheckInProjPage } from "../../stores/projStore";

const store = useCheckInProjPage();
const emit = defineEmits(["changeJob", "projLeave"]);
const ct = ref(0);
const now = ref(3);
const arrowColor = ref(true);
const flex = ref([
  {
    value: 1,
    bgColor: "#dbdbdb",
    txtColor: "#fff",
  },
  {
    value: 1,
    bgColor: "#dbdbdb",
    txtColor: "#fff",
  },
  {
    value: 1,
    bgColor: "#dbdbdb",
    txtColor: "#fff",
  },
  {
    value: 3,
    bgColor: "#FEC801",
    txtColor: "#333",
  },
]);

const workDatas = ref([
  {
    id: ct.value++,
    firm: "洛商公關",
    tenure: "2019/05 - 2021/06",
    position: "剪輯師",
  },
  {
    id: ct.value++,
    firm: "台北影業",
    tenure: "2021/06 - 2022/05",
    position: "特效師",
  },
  {
    id: ct.value++,
    firm: "WeHelp",
    tenure: "2022/09 - 2023/03",
    position: "程式培訓 學員",
  },
  {
    id: ct.value++,
    firm: "聖東營造",
    tenure: "2024/05 - 在職中",
    position: "全端工程師",
  },
]);

const clickHandler = (id) => {
  if (id === now.value && !store.inProjPage) return;
  if (id === now.value && store.inProjPage) {
    emit("projLeave", true);
    store.inProjPage = false;
  }
  let previous = now.value;
  let clickedValue = flex.value[previous];
  now.value = id;
  switch (id) {
    case 0:
      flex.value[previous] = flex.value[id];
      flex.value[0] = clickedValue;
      arrowColor.value = false;
      emit("changeJob", "洛商公關");
      break;
    case 1:
      flex.value[previous] = flex.value[id];
      flex.value[1] = clickedValue;
      arrowColor.value = false;
      emit("changeJob", "台北影業");
      break;
    case 2:
      flex.value[previous] = flex.value[id];
      flex.value[2] = clickedValue;
      arrowColor.value = false;
      emit("changeJob", "Wehelp");
      break;
    case 3:
      flex.value[previous] = flex.value[id];
      flex.value[3] = clickedValue;
      arrowColor.value = true;
      emit("changeJob", "SaintDong");
      break;
  }
};

const arrowColorHandler = computed(() => {
  return arrowColor.value ? "#FEC801" : "#dbdbdb";
});

// setTimeout(() => {
//   flex.value.forEach((item, i) => {
//     if (i !== flex.value.length) {
//       item.value = 1;
//     } else {
//       item.value = 5;
//     }
//   });
// }, 50);
</script>

<template>
  <div class="line-wrapper">
    <div class="line-block">
      <div
        v-for="data of workDatas"
        class="work-block"
        :key="data.id"
        :style="{
          flex: flex[data.id].value,
          backgroundColor: flex[data.id].bgColor,
          color: flex[data.id].txtColor,
        }"
        @click="clickHandler(data.id)"
      >
        <span class="firm">{{ data.firm }}</span>

        <p :class="{ show: now === data.id }" class="tenure">
          {{ data.tenure }}
        </p>
        <p :class="{ show: now === data.id }" class="position">
          {{ data.position }}
        </p>
      </div>
      <font-awesome-icon
        :icon="['fas', 'play']"
        class="ic"
        :style="{ color: arrowColorHandler }"
        @click="clickHandler(3)"
      />
    </div>
  </div>
</template>

<style scoped>
.line-wrapper {
  width: 800px;
  position: relative;
  margin-bottom: 70px;
  margin-top: 40px;
}
.line-block {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
}
.work-block {
  height: 40px;
  font-weight: 500;
  padding: 6px 10px;
  transition: 0.7s;
  text-align: center;
  cursor: pointer;
  border-radius: 7px;
  margin: 0 10px;
  z-index: 2;
  position: relative;
}
.firm {
  font-size: 18px;
}
.ic {
  position: relative;
  font-size: 70px;
  top: -15px;
  right: 15px;
  transition: 0.7s;
  z-index: 1;
  cursor: pointer;
}
p {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -30px;
  opacity: 0;
  transition: 0.5s;
  letter-spacing: 0.05em;
  cursor: default;
}
.position {
  font-size: 16px;
  bottom: -40px;
  color: #777;
  opacity: 0;
}
.tenure {
  font-size: 12px;
  bottom: -60px;
  color: #999;
  opacity: 0;
}
.show {
  opacity: 1;
}
@media (max-width: 1000px) {
  .line-wrapper {
    width: 80%;
    margin-left: 30px;
  }
  .firm {
    font-size: 17px;
  }
  .position {
    font-size: 15px;
    white-space: nowrap;
  }
  .tenure {
    font-size: 10px;
  }
}
@media (max-width: 850px) {
  .line-wrapper {
    width: 85%;
    position: relative;
  }
  .ic {
    font-size: 65px;
    top: -13px;
    right: 15px;
  }
  .firm {
    white-space: nowrap;
  }
  .position {
    font-size: 13px;
  }
  .tenure {
    font-size: 10px;
    white-space: nowrap;
  }
}
@media (max-width: 600px) {
  .line-wrapper {
    margin-left: -15px;
  }
  .ic {
    display: none;
  }
  .work-block {
    margin-bottom: 50px;
  }

  .firm {
    font-size: 15px;
  }
}
</style>
