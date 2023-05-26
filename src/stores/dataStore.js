import { ref } from "vue";
import { defineStore } from "pinia";

export const useData = defineStore("ct", () => {
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
      content: "TAROT",
      link: "/tarot",
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
      skills: ["Vue 3", "JavaScript", "HTML / SCSS", "WebRTC", "RWD"],
    },
    {
      id: counter.value++,
      color: "#F3C67B",
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
      color: "#389356",
      titleFirst: "D",
      titleBehind: "ataBase",
      skills: ["MySQL", "MongoDB", "Gorm (go)", "Firebase"],
    },
    {
      id: counter.value++,
      color: "#4379AB",
      titleFirst: "T",
      titleBehind: "ools",
      skills: ["Git / GitHub", "Docker", "AWS", "Linux", "Nginx"],
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

  return { skillsData, links };
});
