<script setup>
import { ref, watch } from "vue";

const show = ref(false);
const blockBool = ref(false);
const showImg = ref(false);

const props = defineProps({
  beelineShow: String,
});

watch(props, () => {
  if (props.beelineShow === "beelineShow") {
    setTimeout(() => {
      show.value = true;
    }, 1);
    setTimeout(() => {
      blockBool.value = true;
    }, 100);
    setTimeout(() => {
      showImg.value = true;
    }, 1100);
  } else if (props.beelineShow === "quickDisappear") {
    setTimeout(() => {
      show.value = false;
    }, 1);
    setTimeout(() => {
      blockBool.value = false;
      showImg.value = false;
    }, 100);
  } else if (props.beelineShow === "showDisappear") {
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
  <div v-show="show" class="beeline-wrapper">
    <div class="beeline-block" :class="{ 'beeline-block-in': blockBool }">
      <div class="title-line">
        <h3>beeline</h3>
        <img class="logo" src="/browser_logo.png" alt="" />
        <div class="links">
          <div class="icon-row link">
            <font-awesome-icon :icon="['fas', 'link']" class="ic ic-link" />
            <a href="https://beelinetw.com" target="_blank"
              >https://beelinetw.com</a
            >
          </div>
          <div class="icon-row github">
            <font-awesome-icon :icon="['fab', 'github']" class="ic" />
            <a href="https://github.com/Ben10225/beeline" target="_blank"
              >https://github.com/Ben10225/beeline</a
            >
          </div>
        </div>
      </div>
      <div class="intro">
        <h4>專案介紹 :</h4>
        <p>
          beeline
          是一款提供線上會議的網頁，用戶們可透過此網頁實現即時視訊、音訊的交流。<br />
          而網頁除了基礎的房間與室長系統，另外有聊天室、螢幕分享、白板與小遊戲等多項功能，<br />讓用戶們除了的開會外，也能在會議室中有其他正向的互動！
        </p>
      </div>
      <div class="difficulty">
        <h4>困難處理 :</h4>
        <p>就有提供視訊功能的網頁而言，</p>
        <p>關閉鏡頭時，相機燈也是關閉的狀態是相當重要的，</p>
        <p>然而以基礎的 WebRTC 去設定，相機燈依然會是亮著，</p>
        <p>最後嘗試到使用 Socket.IO 與交換視訊流雙管齊下，</p>
        <p>才終於實作出這項功能，讓用戶體驗更舒適！</p>
      </div>
      <ul class="skills">
        <h4>技術堆疊 :</h4>
        <li>後端架構：Go Gin / Mongo DB</li>
        <li>前端技能：HTML / SCSS / Js</li>
        <li>
          其他技術：<br />Docker / AWS / Nginx / DNS <br />RESTful API /
          Socket.IO / WebRTC
        </li>
      </ul>
      <div class="imgs" v-show="showImg">
        <img class="png pict" src="/beeline-demo.png" alt="" />
        <img class="gif pict" src="/real-time-demo.gif" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.beeline-wrapper {
  color: black;
  overflow: hidden;
  width: 720px;
  position: absolute;
  top: -80px;
}
.beeline-block {
  position: relative;
  left: 740px;
  transition: 1s;
  height: 540px;
  padding-top: 80px;
  padding-left: 3px;
}

.beeline-block-in {
  left: 0;
}
.title-line {
  position: relative;
  top: -55px;
  left: -2px;
}
.title-line h3 {
  font-size: 35px;
  color: #90651e;
  font-weight: 700;
  position: relative;
  /* left: -30px; */
  top: -24px;
  display: inline-block;
  margin-bottom: -10px;
}
.links {
  position: absolute;
  top: 27px;
  left: 2px;
  color: #888;
}
.icon-row {
  position: relative;
  display: inline-block;
}
.github {
  margin-left: 35px;
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
h4 {
  color: #9e2323c2;
  font-weight: 400;
  font-size: 15px;
  position: relative;
}
.logo {
  width: 38px;
  position: absolute;
  left: 145px;
  top: -11px;
}
.intro {
  margin-top: -30px;
}
.intro,
.difficulty {
  margin-bottom: 20px;
}
li {
  list-style: none;
}
.pict {
  border-radius: 10px;
  position: absolute;
  width: 260px;
  right: 20px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
}
.png {
  bottom: 175px;
}
.gif {
  bottom: 15px;
}
@media (max-width: 1000px) {
  .pict {
    width: 230px;
  }
  .gif {
    bottom: 35px;
  }
}
@media (max-width: 850px) {
  .beeline-wrapper {
    width: 90%;
    overflow: visible;
    z-index: 5;
  }
  .github {
    display: block;
    margin-left: 0;
  }
  .intro {
    margin-top: -10px;
  }
  .imgs {
    position: relative;
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
  }
  .pict {
    position: relative;
    right: -10px;
    width: 210px;
    left: 0;
    top: 0;
  }
}
@media (max-width: 600px) {
  .beeline-wrapper {
    top: -30px;
  }
  .title-line h3 {
    font-size: 30px;
  }
  .logo {
    left: 120px;
    top: -13px;
    width: 32px;
  }
  .imgs {
    flex-direction: column;
  }
  .pict {
    margin: 10px 0;
  }
}
</style>
