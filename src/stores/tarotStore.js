import { ref } from "vue";
import { defineStore } from "pinia";

export const useTarot = defineStore("tarotCt", () => {
  const tarots = ref([]);

  const getUpright = () => {
    return Math.random() >= 0.5;
  };

  const newDeck = () => {
    for (let i = 0; i <= 21; i++) {
      tarots.value.push({
        id: i.toString(),
        upright: getUpright(),
      });
    }

    for (let i = 0; i < 4; i++) {
      for (let j = 1; j <= 14; j++) {
        switch (i) {
          case 0:
            tarots.value.push({
              id: "r" + j,
              upright: getUpright(),
            });
            break;
          case 1:
            tarots.value.push({
              id: "p" + j,
              upright: getUpright(),
            });
            break;
          case 2:
            tarots.value.push({
              id: "s" + j,
              upright: getUpright(),
            });
            break;
          case 3:
            tarots.value.push({
              id: "c" + j,
              upright: getUpright(),
            });
            break;
        }
      }
    }
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const getNewShuffle = () => {
    tarots.value = [];
    newDeck();
    shuffle(tarots.value);
  };

  const oneCardDeck = () => {
    tarots.value = [
      {
        id: "0",
        upright: true,
      },
    ];
  };

  oneCardDeck();
  // newDeck();
  // shuffle(tarots.value);
  return { tarots, getNewShuffle, oneCardDeck };
});
