<script setup>
import { ref } from "vue";
import gsap from "gsap";

const emit = defineEmits(["stopForward,pngReset"]);

const questionIndex = ref(1);
const nowBrick = ref(null);
const nowPngBlock = ref(null);
const nowQMark = ref(null);
const nextPngBlock = ref(null);
const nextQMark = ref(null);

const bricksList = ref([
  {
    id: 0,
    left: 450,
    ref: "nowBrick",
    pngRef: "nowPngBlock",
    QMarkRef: "nowQMark",
    break: false,
  },
  {
    id: 1,
    left: 750,
    ref: "nextBrick",
    pngRef: "nextPngBlock",
    QMarkRef: "nextQMark",
    break: false,
  },
  {
    id: 2,
    left: 1050,
    ref: "standbyBrick",
    pngRef: "standbyPngBlock",
    QMarkRef: "standbyQMark",
    break: false,
  },
]);

const brickTouch = () => {
  let tl = gsap.timeline();
  tl.fromTo(
    nowBrick.value,
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
    .to(nowBrick.value, {
      x: 3,
      y: -8,
      rotate: 10,
      duration: 0.1,
      ease: "ease",
    })
    .to(nowBrick.value, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.1,
      ease: "ease",
      onComplete() {
        emit("stopForward", false);
        exchangeRef();
        setTimeout(() => {
          bricksList.value.forEach((b) => {
            if (b.ref === "standbyBrick") {
              b.break = true;
              if (questionIndex.value < 8) questionIndex.value++;
            }
          });
        }, 1000);
      },
    });
};

const pngBlockShow = () => {
  gsap.to(nowPngBlock.value, {
    x: 0,
    y: -25,
    duration: 0.4,
    delay: 0.6,
    ease: "ease",
  });
};

const QMarkHide = () => {
  gsap.to(nowQMark.value, {
    x: 0,
    y: -35,
    duration: 0.5,
    delay: 0.5,
    ease: "ease",
  });
};

const pngBlockHide = () => {
  gsap.to(nextPngBlock.value, {
    x: 0,
    y: 25,
    duration: 0,
  });
};

const QMarkShow = () => {
  gsap.to(nextQMark.value, {
    x: 0,
    y: 0,
    duration: 0,
  });
};

const brickLefting = (speed) => {
  bricksList.value.forEach((b) => {
    b.left -= speed;
    if (b.left < -60) {
      b.left = 838;
      b.break = false;
      emit("pngReset", true);
    } else if (b.left === 302) {
      nowBrick.value = b.ref;
      if (b.ref === "nowBrick") emit("stopForward", true);
    }
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
  const brick = bricksList.value.find((b) => b.ref === "nowBrick");
  return brick.left;
};

defineExpose({
  brickTouch,
  brickLefting,
  pngBlockShow,
  QMarkHide,
  pngBlockHide,
  QMarkShow,
  brickNowLeft,
});
</script>

<template>
  <div
    v-for="b of bricksList"
    class="brick-block"
    :key="b.id"
    :ref="b.ref"
    :style="{
      left: `${b.left}px`,
    }"
  >
    <div class="brick-png" :class="{ 'break-png': b.break }"></div>
    <div class="text-block">
      <div class="inner">
        <img
          src="/question-mark.png"
          alt=""
          class="question-mark"
          :ref="b.QMarkRef"
        />
      </div>
      <div class="outer">
        <div class="png-block" :ref="b.pngRef" v-show="!b.break">
          <div class="q-png png"></div>
          <div
            class="index-png png"
            :style="{ backgroundImage: `url(/letter-${questionIndex}.png)` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brick-block {
  position: absolute;
  top: 51%;
  width: 45px;
  height: 45px;
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
