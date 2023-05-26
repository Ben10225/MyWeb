import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import Vue from "vue";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

import { fas } from "@fortawesome/free-solid-svg-icons"; // 全部 icons 載入
// import {
//   faEnvelope,
//   faPlay,
//   faCheck,
//   faLink,
//   faLeftLong,
//   faFilm,
//   faClapperboard,
// } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(fas, faGithub, faLinkedin);

// const app = createApp(App);
const app = createApp(App);

app.use(VuePlyr, {
  plyr: {},
});
app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
