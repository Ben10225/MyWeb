<script setup>
import SkillsDecorate from "../components/SkillsComps/SkillsDecorateComp.vue";
import SkillsBgChange from "../components/SkillsComps/SkillsBgChangeComp.vue";
import { useData } from "../stores/dataStore";
import { ref } from "vue";

const store = useData();
const ct = ref(0);

const responseHandler = () => {
  ct.value++;
};
</script>

<template>
  <div class="skills-wrapper">
    <div class="outter">
      <SkillsBgChange :counter="ct" />
      <SkillsDecorate @to-skills-main="responseHandler" />
      <h1 class="title">Skills</h1>
      <div class="right-block">
        <div class="skill-info" v-for="data of store.skillsData" :key="data.id">
          <div class="info-block">
            <div class="circle" :style="{ backgroundColor: data.color }">
              <span class="white-first-letter"
                >{{ data.titleFirst }}
                <div class="info-title" :style="{ color: data.color }">
                  {{ data.titleBehind }}
                </div>
              </span>
            </div>
            <div class="info" v-for="(skill, i) in data.skills" :key="i">
              <p>{{ skill }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-wrapper {
  width: 100%;
  min-height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
}
.outter {
  width: 800px;
  position: relative;
}
h1 {
  position: absolute;
  font-size: 60px;
  color: #333;
  font-weight: 600;
  top: 55px;
  left: -19px;
}
.right-block {
  width: 100%;
  color: #000;
  margin-left: 140px;
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.skill-info {
  position: relative;
  margin-right: 40px;
  width: 200px;
  margin-bottom: 150px;
  z-index: 10;
}
.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.white-first-letter {
  color: #fff;
  font-size: 50px;
  font-weight: 400;
}
.title {
  z-index: 10;
}
.info-title {
  position: absolute;
  font-size: 35px;
  left: 62px;
  top: 10px;
}
.info {
  color: #333;
  position: relative;
  left: 18px;
  top: 80px;
  letter-spacing: 0.1em;
  font-size: 15px;
}
.info p {
  margin-bottom: 3px;
}
@media (max-width: 1200px) {
  .outter {
    width: 760px;
  }
  h1 {
    left: 0px;
  }
}
@media (max-width: 850px) {
  .outter {
    width: 500px;
  }
  h1 {
    left: 25px;
  }
  .right-block {
    margin-left: 70px;
    margin-top: 170px;
  }
  .skill-info {
    margin-bottom: 120px;
  }
}
@media (max-width: 600px) {
  h1 {
    font-size: 50px;
    left: 35px;
  }
  .circle {
    width: 55px;
    height: 55px;
  }
  .white-first-letter {
    font-size: 40px;
  }
  .info-title {
    font-size: 30px;
    left: 58px;
  }
}
</style>
