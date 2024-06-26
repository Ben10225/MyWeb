import { createRouter, createWebHistory } from "vue-router";
import BioView from "../views/BioView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: BioView,
    },
    {
      path: "/skills",
      name: "skills",
      component: () => import("../views/SkillsView.vue"),
    },
    {
      path: "/career",
      name: "career",
      component: () => import("../views/CareerView.vue"),
    },
    {
      path: "/tarot",
      name: "tarot",
      component: () => import("../views/TarotView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/dinosaur",
      name: "dinosaur",
      component: () => import("../views/DinosaurView.vue"),
    },
    {
      path: "/gaming",
      name: "gaming",
      component: () => import("../views/GamingView.vue"),
    },
    {
      path: "/blogs",
      name: "blogs",
      component: () => import("../views/BlogsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
      hidden: true,
    },
  ],
});

export default router;
