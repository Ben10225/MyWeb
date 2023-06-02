<script setup>
import addTarot from "./addDataApi.js";
import { ref } from "vue";

const tid = ref("s14");
const name = ref(["寶劍國王", "King of Swords"]);
const url = ref(
  "https://firebasestorage.googleapis.com/v0/b/pengweb-fb304.appspot.com/o/s14.jpeg?alt=media&token=50e99797-8b15-427f-a860-d9e6998f26b6"
);
const key = ref("嚴格");
const para = ref([
  "寶劍國王堅定的看著遠方，身材象徵了能力與權威。他握著巨大的劍柄，這是一把正義之劍。他頭上的城堡型皇冠象徵權力與地位，貂毛披肩象徵尊貴，而身後的茴香花代表控制重要力量以獲得勝利。",
  "象徵統領大軍的將帥，他不容許軟弱也不容許欺騙。也代表可靠的專業知識，所有問題都可以找到最快速的解決方式，但可能也是殘酷的。",
]);
const upright = ref([
  "自信 / 克服混亂 / 領導者",
  "法律 / 批評 / 有益的建議",
  "找出解決方案 / 堅定 / 專業素養",
]);
const reverse = ref([
  "嚴峻的情況 / 擅自作主 / 借貸問題",
  "獨裁者 / 孤立 / 殘暴的言行",
  "無情 / 固執己見",
]);

const addDataHandler = () => {
  let data = {
    key: key.value,
    name: name.value,
    para: para.value,
    upright: upright.value,
    reverse: reverse.value,
    url: url.value,
  };
  addTarot.addTarot(tid.value, data);
};

const editorMode = () => {
  props.show = true; // 需要另外用變數 不能改 props 的值
  edit.value = true; // 增加 v-if false 在 front back card
  mode.value = "secondInfo";
  cardUpright.value = false;

  wrapperZindex.value = true;
  open.value = true;
  textOpacity1.value = true;
  textOpacity2.value = true;
  textOpacity3.value = true;
  textOpacity4.value = true;
  textOpacity5.value = true;
  textOpacity6.value = true;
};
</script>

<template>
  <button class="add-data" @click="addDataHandler">Add Data</button>
</template>

<style>
.add-data {
  position: absolute;
  padding: 10px;
  font-size: 20px;
  z-index: 500;
  margin-top: 20px;
}
</style>
