import { ref, watchEffect } from "vue";
import { defineStore } from "pinia";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();

export const useData = defineStore("ct", () => {
  const less400px = ref(false);
  const btnCount = ref(0);
  const links = ref([
    {
      id: btnCount.value++,
      content: "BIOGRAPHY",
      link: "/",
    },
    {
      id: btnCount.value++,
      content: "SKILLS",
      link: "/skills",
    },
    {
      id: btnCount.value++,
      content: "CAREER",
      link: "/career",
    },
    {
      id: btnCount.value++,
      content: "GAMING",
      link: "/gaming",
    },
    {
      id: btnCount.value++,
      content: "BLOGS",
      link: "/blogs",
    },
    {
      id: btnCount.value++,
      content: "CONTACT",
      link: "/contact",
    },
  ]);

  const counter = ref(0);
  const skillsData = ref([
    {
      id: counter.value++,
      color: "#d36141",
      titleFirst: "F",
      titleBehind: "rontend",
      skills: ["Vue 3", "React", "TypeScript", "WebRTC", "RWD"],
    },
    {
      id: counter.value++,
      color: "#e28a53",
      titleFirst: "B",
      titleBehind: "ackend",
      skills: [
        "Go (Gin)",
        "Python (Flask)",
        "RESTful API",
        "Socket.IO",
        "Unit Test",
      ],
    },
    {
      id: counter.value++,
      color: "#F3C67B",
      titleFirst: "D",
      titleBehind: "ataBase",
      skills: ["MySQL", "Redis", "MongoDB", "Gorm (go)", "Firebase"],
    },
    {
      id: counter.value++,
      color: "#389356",
      titleFirst: "T",
      titleBehind: "ools",
      skills: ["Git / GitHub", "Docker", "Linux", "Nginx"],
    },
    {
      id: counter.value++,
      color: "#4379AB",
      titleFirst: "D",
      titleBehind: "evOps",
      skills: ["Amazon Web Services", "GitHub Actions", "Kubernetes"],
    },
    {
      id: counter.value++,
      color: "#8d5ac4",
      titleFirst: "O",
      titleBehind: "thers",
      skills: [
        "Adobe softwares",
        "Communication",
        "Detail-oriented",
        "Motivated",
      ],
    },
  ]);

  watchEffect(() => {
    if (width.value > 400 && less400px.value) {
      less400px.value = false;
    } else if (width.value <= 400 && !less400px.value) {
      less400px.value = true;
    }
  });

  watchEffect(() => {
    if (less400px.value) {
      links.value[0].content = "BIO";
    } else {
      links.value[0].content = "BIOGRAPHY";
    }
  });

  return { skillsData, links };
});
