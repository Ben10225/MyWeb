<script setup>
import { ref, watch } from "vue";

const show = ref(false);
const blockBool = ref(false);
const showImg = ref(false);

const props = defineProps({
  taipeiShow: String,
});

watch(props, () => {
  if (props.taipeiShow === "taipeiShow") {
    setTimeout(() => {
      show.value = true;
    }, 1);
    setTimeout(() => {
      blockBool.value = true;
    }, 100);
    setTimeout(() => {
      showImg.value = true;
    }, 1100);
  } else if (props.taipeiShow === "quickDisappear") {
    setTimeout(() => {
      show.value = false;
    }, 1);
    setTimeout(() => {
      blockBool.value = false;
      showImg.value = false;
    }, 100);
  } else if (props.taipeiShow === "showDisappear") {
    setTimeout(() => {
      show.value = false;
    }, 1000);
    setTimeout(() => {
      blockBool.value = false;
      showImg.value = false;
    }, 1);
  }
});
</script>

<template>
  <div v-show="show" class="taipei-wrapper">
    <div class="taipei-block" :class="{ 'taipei-block-in': blockBool }">
      <img
        v-show="showImg"
        class="gif pict"
        src="/taipei-day-trip-demo.gif"
        alt=""
      />
      <div class="title-line">
        <h3>台北一日遊</h3>
        <img class="logo" src="/taipei.svg" alt="" />
        <div class="links">
          <div class="icon-row link">
            <font-awesome-icon :icon="['fas', 'link']" class="ic ic-link" />
            <a href="https://taipei-day-trip.beelinetw.com" target="_blank"
              >https://taipei-day-trip.beelinetw.com</a
            >
          </div>
          <div class="icon-row github">
            <font-awesome-icon :icon="['fab', 'github']" class="ic" />
            <a
              href="https://github.com/Ben10225/taipei-day-trip"
              target="_blank"
              >https://github.com/Ben10225/taipei-day-trip</a
            >
          </div>
          <div class="icon-row github">
            <font-awesome-icon :icon="['fab', 'github']" class="ic" />
            <a
              href="https://github.com/Ben10225/go_taipei-day-trip"
              target="_blank"
              >https://github.com/Ben10225/go_taipei-day-trip</a
            >
          </div>
        </div>
        <div class="intro paragrapy">
          <h4>專案介紹 :</h4>
          <p>
            台北一日遊是一個旅遊電商網站，用戶可以從網頁上選購喜歡的旅遊行程，<br />
            下訂後會記錄至購物車，並且確認後可以結單，串連第三方金流 TapPay
            確認付款狀態。<br />
            另外也有用戶的歷史訂單記錄，以及精緻的會員頁面為網頁增添質感！
          </p>
        </div>
        <div class="paragrapy">
          <h4>語言擴展 :</h4>
          <p>此網頁分別以 Python-Flask、Go-Gin，</p>
          <p>兩種不同語言及對應框架個別實作，</p>
          <p>因此上方提供兩個 GitHub repository。</p>
          <p>使用關聯式資料庫 MySQL 與 Gorm 來做資料控管，</p>
          <p>並運用索引加速資料庫的相關操作。</p>
        </div>
        <ul class="skills">
          <h4>技術堆疊 :</h4>
          <li>後端架構：Python Flask / Go Gin</li>
          <li>前端技能：HTML / SCSS / Js / RWD</li>
          <li>資料庫：MySQL / Gorm</li>
          <li>其他技術：MVC / RESTful API / TapPay / JWT</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.taipei-wrapper {
  /* opacity: 0; */
  color: black;
  overflow: hidden;
  width: 720px;
  /* position: relative; */
  position: absolute;
  left: -375px;
  top: -93px;
}
.taipei-block {
  position: relative;
  left: 740px;
  transition: 1s;
  height: 540px;
  padding-top: 32px;
  padding-left: 3px;
}
.taipei-block-in {
  left: 0;
}
.title-line h3 {
  font-size: 27px;
  color: #90651e;
  font-weight: 700;
  position: relative;
  /* left: -30px; */
  top: -24px;
  display: inline-block;
  margin-bottom: -10px;
}
.logo {
  width: 40px;
  position: absolute;
  left: 165px;
  top: 10px;
}
.links {
  position: absolute;
  top: 52px;
  color: #888;
}
.icon-row {
  position: relative;
  display: inline-block;
}
.link {
  display: block;
}
.github {
  margin-right: 35px;
}
.ic {
  position: absolute;
  top: 5px;
}
.ic-link {
  font-size: 13px;
}
a {
  text-decoration: none;
  color: #888;
  margin-left: 28px;
}
.pict {
  border-radius: 10px;
  position: absolute;
  width: 270px;
  right: 20px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
}
.intro {
  margin-top: 70px;
}
.paragrapy {
  margin-bottom: 20px;
}
h4 {
  color: #9e2323c2;
  font-weight: 400;
  font-size: 15px;
  position: relative;
}
li {
  list-style: none;
}
.gif {
  bottom: 5px;
}
@media (max-width: 1000px) {
  .taipei-wrapper {
    left: -340px;
    top: -105px;
  }
}
</style>
