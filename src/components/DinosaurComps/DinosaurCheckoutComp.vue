<script setup>
import { onMounted, ref, watch } from "vue";
import { db } from "@/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const emit = defineEmits(["endCheckout"]);
const nick = ref(null);
const nickName = ref("");
const now = ref("");

const score = ref(0);
const insertIndex = ref(-1);
const recordId = ref("");
const records = ref([]);
const alert = ref("");

const submitHandler = () => {
  if (nickName.value.length > 0 && nickName.value.length <= 7) {
    const repeat = records.value.find((rec) => rec.name === nickName.value);
    // if (repeat !== undefined) {
    //   showAlert("暱稱已重複，請換一個");
    //   return;
    // }

    /* upload to firebase */
    updateRecord();

    nickName.value = "";
    now.value = "board";
  } else {
    showAlert("字數上限為 7 個字元");
  }
};

const showAlert = (txt) => {
  alert.value = txt;
  setTimeout(() => {
    alert.value = "";
  }, 3000);
};

const endHandler = () => {
  now.value = "";
  emit("endCheckout", true);
};

const recordHandler = async (sc) => {
  score.value = sc;
  insertIndex.value = -1;
  if (records.value === undefined) {
    insertIndex.value = 0;
    now.value = "signature";
    return;
  }
  records.value.every((r, index) => {
    if (score.value > r.score) {
      insertIndex.value = index;
      return false;
    }
    return true;
  });
  if (records.value.length < 3) {
    if (insertIndex.value === -1) {
      insertIndex.value = records.value.length;
    }
    now.value = "signature";
  } else {
    if (insertIndex.value === -1) {
      now.value = "board";
    } else {
      now.value = "signature";
    }
  }
};

const getRecords = async () => {
  const querySnapshot = await getDocs(collection(db, "dino"));
  querySnapshot.forEach((doc) => {
    recordId.value = doc.id;
    records.value = doc.data().records;
  });
};

const updateRecord = async () => {
  const rec = {
    name: nickName.value,
    score: score.value,
    date: new Date(),
  };
  if (records.value === undefined) {
    records.value = [];
    records.value.push(rec);
  } else {
    records.value.splice(insertIndex.value, 0, rec);
    records.value = records.value.slice(0, 3);
  }

  const recordRef = doc(db, "dino", recordId.value);
  await updateDoc(recordRef, {
    records: records.value,
  });
};

onMounted(() => {
  watch(now, (nV) => {
    if (nV === "signature") {
      setTimeout(() => {
        nick.value.focus();
      }, 1);
    }
  });
});

defineExpose({
  recordHandler,
  getRecords,
});
</script>

<template>
  <div class="checkout-wrapper">
    <div class="decos">
      <div class="decorate d1"></div>
      <div class="decorate d2"></div>
    </div>
    <div class="outter">
      <div class="game-text t1">Game</div>
      <div class="game-text t2">Over</div>
      <div v-if="now === 'signature'" class="signature">
        <form @submit.prevent="submitHandler">
          <h3>恭喜！您的分數將進入排行榜！</h3>
          <div class="line">
            <h6>請輸入暱稱：</h6>
            <input v-model.trim="nickName" ref="nick" type="text" />
          </div>
          <p class="alert">{{ alert }}</p>
          <button>確認</button>
        </form>
      </div>
      <div class="board" v-show="now === 'board'">
        <div class="title">
          <h4>您的成績：</h4>
          <p>{{ score }}</p>
        </div>
        <div class="hr-line"></div>
        <div class="score-board">
          <div class="record" v-for="(r, i) of records" :key="i">
            <h6 class="record-place">N0.{{ i + 1 }}</h6>
            <h6 class="record-name">{{ r.name }}</h6>
            <h6 class="record-score">{{ r.score }}</h6>
          </div>
        </div>
        <button class="end" @click="endHandler">結束遊戲</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(207, 207, 207, 0.3);
  backdrop-filter: blur(1px);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.outter {
  width: 300px;
  height: 170px;
  background-color: #4a4a4a;
  font-family: "DotGothic16", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #ffffff;
  top: 35px;
}
.signature {
  text-align: center;
  position: absolute;
}
.signature h3 {
  margin-top: 15px;
  font-size: 18px;
  margin-bottom: 20px;
  position: relative;
  left: 5px;
  letter-spacing: 0.02em;
}
.signature .line h6 {
  display: inline-block;
  font-size: 15px;
  margin-right: 10px;
}
.signature input {
  width: 120px;
  outline: none;
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  font-size: 15px;
  padding: 4px 7px;
  color: #ffffff;
  text-align: center;
}
.alert {
  position: relative;
  top: 20px;
  font-size: 15px;
  color: #efefef;
  height: 20px;
}
button {
  background-color: transparent;
  border: none;
  margin-top: 30px;
  font-size: 13px;
  color: #cdcdcd;
  font-family: "DotGothic16", sans-serif;
  cursor: pointer;
  padding: 5px;
}
button:hover {
  color: #ffffff;
}
.board {
  width: 100%;
  text-align: center;
}
.title {
  margin-bottom: 15px;
  margin-top: 6px;
}
.title h4,
.title p {
  display: inline-block;
  font-size: 23px;
  letter-spacing: 0.1em;
}
.title p {
  width: 80px;
  text-align: right;
}
.hr-line {
  position: relative;
  height: 1px;
  width: 70%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #d6d6d6;
  margin-bottom: 15px;
  margin-top: -5px;
}
.record {
  margin-bottom: 3px;
}
.record h6 {
  display: inline-block;
  font-size: 15px;
  letter-spacing: 0.1em;
}
.record-place {
  margin-right: 15px;
}
.record-name {
  margin-right: 10px;
  width: 120px;
}
.record-score {
  width: 60px;
  text-align: right;
}
.end {
  margin-top: 10px;
}
.game-text {
  position: absolute;
  color: #4a4a4a;
  font-size: 70px;
  z-index: 10;
  top: -140px;
  letter-spacing: 0.1em;
}
.t1 {
  left: -30px;
}
.t2 {
  right: -45px;
}
.decos {
  position: absolute;
  width: 280px;
  height: 190px;
}
.decorate {
  width: 100%;
  height: 100%;
  background-color: #4a4a4a;
}
.d1 {
  position: absolute;
  top: 35px;
  width: 280px;
  height: 190px;
}
.d2 {
  position: absolute;
  width: 260px;
  height: 210px;
  top: 25px;
  left: 10px;
}
@media (max-height: 700px) {
  .checkout-wrapper {
    margin-top: -40px;
  }
}
</style>
