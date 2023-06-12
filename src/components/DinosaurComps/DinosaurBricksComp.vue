<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { indexOf } from "lodash-es";

const emit = defineEmits(["stopForward,pngReset"]);

const questionIndex = ref(1);
const nowBrick = ref(null);
const nowPngBlock = ref(null);
const nowQMark = ref(null);
const nextPngBlock = ref(null);
const nextQMark = ref(null);
const crownAppear = ref(false);

const brickId = ref(0);
const brickRefs = ref([]);
const qMarkRefs = ref([]);
const pngRefs = ref([]);
const tmpRefIndex = ref([]);
const nowIndex = ref(0);
const touchedDistance = ref(200);

const setBrickRefs = (el, id) => {
  if (el === null) return;
  if (tmpRefIndex.value.indexOf(id) === -1) {
    brickRefs.value.push({
      el,
    });
    tmpRefIndex.value.push(id);
  }
};

const setQMarkRefs = (el, id) => {
  if (el === null) return;
  if (tmpRefIndex.value.indexOf(id) === -1) {
    qMarkRefs.value.push({
      el,
    });
  }
};

const setPngRefs = (el, id) => {
  if (el === null) return;
  if (tmpRefIndex.value.indexOf(id) === -1) {
    pngRefs.value.push({
      el,
    });
  }
};

const bricksList = ref([
  {
    id: brickId.value++,
    // left: 450,
    left: 510,
    // ref: brickRefs.value[brickId.value],
    // ref: "nowBrick",
    // pngRef: "nowPngBlock",
    // QMarkRef: "nowQMark",
    break: false,
    crown: false,
    crownShow: false,
  },
  {
    id: brickId.value++,
    // left: 750,
    left: 884,
    // ref: brickRefs.value[brickId.value],
    // ref: "nextBrick",
    // pngRef: "nextPngBlock",
    // QMarkRef: "nextQMark",
    break: false,
    crown: false,
    crownShow: false,
  },
  // {
  //   id: 2,
  //   left: 1258,
  //   ref: "standbyBrick",
  //   pngRef: "standbyPngBlock",
  //   QMarkRef: "standbyQMark",
  //   break: false,
  //   crown: false,
  //   crownShow: false,
  // },
]);

const addBrick = () => {
  let tmp = nowIndex.value >= 1 ? 1 : 0;
  let nowLastLeft = bricksList.value[tmp + 1].left;
  bricksList.value.push({
    id: brickId.value++,
    left: nowLastLeft + 374,
    // ref: brickRefs.value[brickId.value],
    break: false,
    crown: false,
  });
};

const brickTouch = () => {
  let tmp = nowIndex.value >= 1 ? 1 : 0;
  if (brickRefs.value[tmp] === undefined) return;
  let tl = gsap.timeline();
  tl.fromTo(
    // nowBrick.value,
    brickRefs.value[tmp].el,
    {
      x: 0,
      y: 0,
    },
    {
      duration: 0.2,
      delay: 0.3,
      x: -5,
      y: -24,
      rotate: -18,
      ease: "ease",
    }
  )
    .to(brickRefs.value[tmp].el, {
      x: 3,
      y: -8,
      rotate: 10,
      duration: 0.1,
      ease: "ease",
    })
    .to(brickRefs.value[tmp].el, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.1,
      ease: "ease",
      onComplete() {
        emit("stopForward", false);
        touchedDistance.value = 0;
        if (nowIndex.value === 8) {
          console.log("here");
        }
        if (questionIndex.value === 8) return;
        // exchangeRef();
        addBrick();
        if (questionIndex.value === 7) {
          bricksList.value[bricksList.value.length - 1].crown = true;
        }
      },
    });
};

const exchangeToBreakBrick = () => {
  pngBlockHide();
  let tmp = nowIndex.value >= 1 ? 1 : 0;
  bricksList.value[tmp].break = true;
  nowIndex.value++;
  if (questionIndex.value < 8) {
    questionIndex.value++;
  } else if (questionIndex.value === 8) {
    bricksList.value[bricksList.value.length - 1].crownShow = true;
  }

  // bricksList.value.forEach((b) => {
  //   if (b.ref === "standbyBrick") {
  //     b.break = true;
  //     if (questionIndex.value < 8) {
  //       questionIndex.value++;
  //     }
  //   } else if (
  //     b.ref === "nowBrick" &&
  //     questionIndex.value === 8 &&
  //     !crownAppear.value
  //   ) {
  //     b.crownShow = true;
  //   }
  // });
};

const pngBlockShow = () => {
  // if (!pngAniRefs.value[nowIndex.value].el) return;
  let tmp = nowIndex.value >= 1 ? 1 : 0;
  if (pngRefs.value[tmp] === undefined) return;
  gsap.to(pngRefs.value[tmp].el, {
    x: 0,
    y: -25,
    duration: 0.4,
    delay: 0.6,
    ease: "ease",
  });
  // if (!nowPngBlock.value) return;
  // gsap.to(nowPngBlock.value, {
  //   x: 0,
  //   y: -25,
  //   duration: 0.4,
  //   delay: 0.6,
  //   ease: "ease",
  // });
};

const QMarkHide = () => {
  // if (!pngAniRefs.value[nowIndex.value].el) return;
  let tmp = nowIndex.value >= 1 ? 1 : 0;
  if (qMarkRefs.value[tmp] === undefined) return;
  gsap.to(qMarkRefs.value[tmp].el, {
    x: 0,
    y: -35,
    duration: 0.5,
    delay: 0.5,
    ease: "ease",
  });
  // if (!nowQMark.value) return;
  // gsap.to(nowQMark.value, {
  //   x: 0,
  //   y: -35,
  //   duration: 0.5,
  //   delay: 0.5,
  //   ease: "ease",
  // });
};

const pngBlockHide = () => {
  let tmp = nowIndex.value >= 1 ? 1 : 0;
  if (pngRefs.value[tmp] === undefined) return;
  gsap.to(pngRefs.value[tmp].el, {
    x: 0,
    y: 25,
    duration: 0,
  });
};

// const QMarkShow = () => {
//   if (nextQMark.value[tmp].el === undefined) return;
//   gsap.to(nextQMark.value, {
//     x: 0,
//     y: 0,
//     duration: 0,
//   });
// };

const brickLefting = (speed) => {
  touchedDistance.value += speed;
  bricksList.value.forEach((b) => {
    b.left -= speed;
    if (b.left < -60) {
      // b.left = 1060;
      bricksList.value.shift();
      brickRefs.value.shift();
      qMarkRefs.value.shift();
      pngRefs.value.shift();
      tmpRefIndex.value.shift();
      b.break = false;
      // emit("pngReset", true);
      // console.log(b.ref);
      // if (questionIndex.value === 8) {
      //   b.crown = true;
      //   // console.log(b.ref);
      //   // console.log(b.nowBrick);
      //   // crownAppear.value = true;
      // }
    } else if (b.left === 398) {
      // nowBrick.value = b.ref;
      // console.log("aa");
      // let tmp = nowIndex.value >= 1 ? 1 : 0;
      if (b.id === nowIndex.value) emit("stopForward", true);
    }
    // if (bricksList.value[1].left > 0 && bricksList.value[1].left < 100) {
    //   isTouched.value = false;
    // }
  });
};

const exchangeRef = () => {
  bricksList.value.forEach((b) => {
    if (b.ref === "nowBrick") {
      b.ref = "standbyBrick";
      b.pngRef = "standbyPngBlock";
      b.QMarkRef = "standbyQMark";
    } else if (b.ref === "nextBrick") {
      b.ref = "nowBrick";
      b.pngRef = "nowPngBlock";
      b.QMarkRef = "nowQMark";
    } else {
      b.ref = "nextBrick";
      b.pngRef = "nextPngBlock";
      b.QMarkRef = "nextQMark";
    }
  });
};

const brickNowLeft = () => {
  // const brick = bricksList.value.find((b) => b.ref === "nowBrick");

  if (touchedDistance.value < 150) return;
  let tmp = nowIndex.value >= 1 ? 1 : 0;

  const brick = bricksList.value[tmp];

  return brick.left;
  // return 111;
};

defineExpose({
  brickTouch,
  brickLefting,
  pngBlockShow,
  QMarkHide,
  pngBlockHide,
  // QMarkShow,
  brickNowLeft,
  exchangeToBreakBrick,
});
</script>

<template>
  <div class="bricks-wrapper">
    <div
      v-for="b of bricksList"
      class="brick-block"
      :ref="(el) => setBrickRefs(el, b.id)"
      :key="b.id"
      :style="{
        left: `${b.left}px`,
      }"
    >
      <div
        class="brick-png"
        :class="{
          'break-png': b.break,
          'crown-png': b.crown,
          'crown-png-show': b.crownShow,
        }"
      ></div>
      <div class="text-block" v-if="!b.crown">
        <div class="inner">
          <img
            src="/question-mark.png"
            alt=""
            class="question-mark"
            :ref="(el) => setQMarkRefs(el, b.id)"
          />
        </div>
        <div class="outer">
          <div
            class="png-block"
            :ref="(el) => setPngRefs(el, b.id)"
            v-show="!b.break"
          >
            <div class="q-png png"></div>
            <div
              class="index-png png"
              :style="{ backgroundImage: `url(/letter-${questionIndex}.png)` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brick-block {
  position: absolute;
  top: 51%;
  /* width: 45px;
  height: 45px; */
  width: 52px;
  height: 52px;
  /* border: 1px solid #000; */
}
.brick-png {
  width: 100%;
  height: 100%;
  background-image: url("/brick.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
}
.break-png {
  background-image: url("/break.png");
}
.crown-png {
  background-image: url("/crown.png");
  background-size: contain;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  opacity: 0;
  visibility: hidden;
}
.crown-png-show {
  opacity: 1;
  visibility: visible;
}
.text-block {
  position: absolute;
  width: 35px;
  height: 35px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.inner {
  /* border: 1px solid #000; */
  height: 35px;
  width: 100%;
  overflow: hidden;
  position: absolute;
}
.question-mark {
  position: absolute;
  left: 50%;
  top: 17px;
  transform: translate(-50%, -50%);
  width: 18px;
}
.outer {
  position: absolute;
  width: 30px;
  height: 19px;
  top: -26px;
  left: 2px;
  /* border: 1px solid #000; */
  overflow: hidden;
}
.png-block {
  position: absolute;
  height: 100%;
  top: 25px;
}
.outer .png {
  width: 15px;
  height: 15px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
}
.q-png {
  background-image: url("/letter-q.png");
}
.index-png {
  left: 17px;
}
</style>
