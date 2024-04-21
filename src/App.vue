<script setup>
import LogoName from "./components/LogoNameComp.vue";
import Dinosaur from "./views/DinosaurView.vue";
import { useData } from "./stores/dataStore";
import { useDinosaurStore } from "./stores/dinosaurStore";
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const store = useData();
const dinostore = useDinosaurStore();
const page = ref("");
const auth = getAuth();
const email = ref("kochoshinobu@gmail.com");
const password = ref("kochoshinobu");

const clickHandler = (content) => {
  let c = content.toLowerCase();

  let url = window.location.href;
  url = url.split("/");
  let from = url[url.length - 1];
  if (from === "dinosaur") {
    clearInterval(dinostore.dinoTimer);
  }

  if (c === "biography") {
    page.value = "";
  } else {
    page.value = c;
  }
};

const firstLoad = () => {
  let url = window.location.href;
  url = url.split("/");
  page.value = url[url.length - 1];
};

const authLogIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

firstLoad();
authLogIn();
</script>

<template>
  <div class="wrapper">
    <div class="left-wrapper">
      <LogoName class="logo" />
      <ul class="links-wrapper">
        <RouterLink
          v-for="l of store.links"
          @click="clickHandler(l.content)"
          class="link-text"
          :key="l.id"
          :to="l.link"
          :class="{
            now1: page === '',
            now2: page === 'skills',
            now3: page === 'career',
            now4: page === 'gaming' || page === 'tarot' || page === 'dinosaur',
            now5: page === 'blogs',
            now6: page === 'contact',
          }"
        >
          <div
            class="title"
            :class="{
              now1: page === '',
              now2: page === 'skills',
              now3: page === 'career',
              now4:
                page === 'gaming' || page === 'tarot' || page === 'dinosaur',
              now5: page === 'blogs',
              now6: page === 'contact',
            }"
          >
            {{ l.content }}
          </div>
          <div
            class="solo"
            :class="{
              now1: page === '',
              now2: page === 'skills',
              now3: page === 'career',
              now4:
                page === 'gaming' || page === 'tarot' || page === 'dinosaur',
              now5: page === 'blogs',
              now6: page === 'contact',
            }"
          >
            {{ l.content[0] }}
          </div></RouterLink
        >
      </ul>
    </div>
    <div class="right-wrapper">
      <RouterView />
    </div>
    <Dinosaur v-if="false" ref="dino" />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}
.left-wrapper {
  background-color: #ffc800;
  width: 345px;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  z-index: 200;
}
.links-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.link-text {
  color: #444;
  list-style-type: none;
  cursor: pointer;
  padding: 10px;
  opacity: 0.7;
  transition: 0.3s;
  display: block;
  text-decoration: none;
  padding-left: 55px;
  transform: scale(1);
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0);
  position: relative;
}
.title {
  font-size: 20px;
  font-weight: 600;
  transition: 0.3s;
}
.link-text:hover {
  background-color: #f1bf0a;
}
.link-text:hover .title {
  color: #fff;
  opacity: 1;
  transform: scale(1.1);
  transform-origin: 40% 42px;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
}
.link-text.now1:nth-child(1),
.link-text.now2:nth-child(2),
.link-text.now3:nth-child(3),
.link-text.now4:nth-child(4),
.link-text.now5:nth-child(5),
.link-text.now6:nth-child(6) {
  background-color: #f1bf0a;
}

.link-text:nth-child(1) .title.now1,
.link-text:nth-child(2) .title.now2,
.link-text:nth-child(3) .title.now3,
.link-text:nth-child(4) .title.now4,
.link-text:nth-child(5) .title.now5,
.link-text:nth-child(6) .title.now6 {
  color: #fff;
  opacity: 1;
  transform: scale(1.1);
  transform-origin: 0% 42px;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
}
.right-wrapper {
  margin-left: 345px;
  width: 100%;
  height: 100vh;
}
.logo {
  margin-top: 0;
}
.solo {
  color: #444;
  font-size: 30px;
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
  padding-right: 25px;
  display: none;
  transition: all 0s;
}
.solo:nth-child(1).now1,
.solo:nth-child(2).now2,
.solo:nth-child(3).now3,
.solo:nth-child(4).now4,
.solo:nth-child(5).now5,
.solo:nth-child(5).now6 {
  color: #ffffff;
}
.link-text:nth-child(4) .solo {
  left: 9px;
}
.link-text:nth-child(3) .solo,
.link-text:nth-child(6) .solo {
  left: 9px;
}
@media (max-height: 800px) {
  .logo {
    margin-top: -50px;
  }
}
@media (max-width: 1400px) {
  .left-wrapper {
    width: 220px;
  }
  .right-wrapper {
    margin-left: 220px;
  }
  .logo {
    margin-left: 100px;
  }
  .link-text {
    padding-left: 45px;
  }
}
@media (max-width: 1200px) {
  .left-wrapper {
    width: 40px;
    transition: 0.4s;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  }
  .left-wrapper:hover {
    width: 140px;
  }
  .left-wrapper:hover .solo {
    display: none;
  }
  .left-wrapper:hover .link-text .title {
    opacity: 1;
    visibility: visible;
    transition: opacity 0;
  }
  .right-wrapper {
    margin-left: 10px;
  }
  .logo {
    display: none;
  }
  .link-text {
    padding-left: 15px;
  }
  .title {
    opacity: 0;
    visibility: hidden;
    font-size: 18px;
    font-weight: 500;
    transition: 0 !important;
  }
  .solo {
    display: block;
    left: 10px;
  }
  .link-text.now1:nth-child(1),
  .link-text.now2:nth-child(2),
  .link-text.now3:nth-child(3),
  .link-text.now4:nth-child(4),
  .link-text.now5:nth-child(5),
  .link-text.now4:nth-child(6) {
    background-color: #c5a83d;
  }
  .link-text:nth-child(1) .title.now1,
  .link-text:nth-child(2) .title.now2,
  .link-text:nth-child(3) .title.now3,
  .link-text:nth-child(4) .title.now4,
  .link-text:nth-child(5) .title.now5,
  .link-text:nth-child(6) .title.now6 {
    opacity: 1;
    transform: scale(1.1);
    transition: opacity 0s !important;
  }
  .link-text:nth-child(1) .solo.now1,
  .link-text:nth-child(2) .solo.now2,
  .link-text:nth-child(3) .solo.now3,
  .link-text:nth-child(4) .solo.now4,
  .link-text:nth-child(5) .solo.now5,
  .link-text:nth-child(6) .solo.now6 {
    color: #ffffff;
  }
}
@media (max-width: 600px) {
  .left-wrapper {
    width: 100%;
    height: 30px;
    padding-left: 10px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  }
  .left-wrapper:hover {
    width: 100%;
  }
  .right-wrapper {
    margin-left: 0px;
  }
  .links-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }
  .link-text {
    display: inline;
    padding-left: 0px;
    color: #ffffff;
  }
  .link-text:hover .title {
    transform: scale(1);
    color: #000;
    text-shadow: none;
  }
  .link-text:hover {
    background-color: #ffc800;
  }
  .title {
    opacity: 1;
    visibility: visible;
    margin-top: -6px;
    font-weight: 600;
    font-size: 13px;
  }
  .solo {
    display: none;
  }
  .link-text.now1:nth-child(1),
  .link-text.now2:nth-child(2),
  .link-text.now3:nth-child(3),
  .link-text.now4:nth-child(4),
  .link-text.now5:nth-child(5),
  .link-text.now5:nth-child(6) {
    background-color: #ffc800;
  }
  .link-text:nth-child(1) .title.now1,
  .link-text:nth-child(2) .title.now2,
  .link-text:nth-child(3) .title.now3,
  .link-text:nth-child(4) .title.now4,
  .link-text:nth-child(5) .title.now5,
  .link-text:nth-child(6) .title.now6 {
    color: #222;
    transform: scale(1);
    font-weight: 800;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0);
  }
}
</style>
