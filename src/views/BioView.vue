<script setup>
import BioPictureBlock from "../components/BioComps/BioPictureBlockComp.vue";
import BioDecorate from "../components/BioComps/BioDecorateComp.vue";
</script>

<template>
  <div class="bio-wrapper">
    <div class="outter">
      <BioDecorate />
      <div class="upper-block">
        <BioPictureBlock />
        <div class="info-block">
          <div class="info">
            您好，我是彭宏倫。<br />畢業於世新大學 數位多媒體設計學系，<br />平時寫寫
            Code， <br />熱愛戶外的休閒活動，<br />
            過去是一名影像特效師，<br />喜歡畫面的互動，以及程式開發帶來的成就，<br />
            擅長網頁前後端設計、影像相關後製，<br />
            未來期望往軟體工程師發展。<br /><br />
            When we strive to become better than we are,<br />everything around
            us becomes better too.
          </div>
          <div class="contact-infos">
            <div class="email">
              <font-awesome-icon :icon="['fa', 'envelope']" class="ic" />
              <p class="contact-content">bbnn669999@gmail.com</p>
            </div>
            <div class="linkedin">
              <font-awesome-icon
                :icon="['fab', 'linkedin']"
                class="ic linkedin-ic"
              />
              <a
                href="https://www.linkedin.com/in/%E5%AE%8F%E5%80%AB-%E5%BD%AD-b5b8b626a/"
                target="_blank"
                class="contact-content"
                >https://www.linkedin.com/in/宏倫-彭-b5b8b626a/</a
              >
            </div>
            <div class="github">
              <font-awesome-icon :icon="['fab', 'github']" class="ic" />
              <a
                href="https://github.com/Ben10225"
                target="_blank"
                class="contact-content"
                >https://github.com/Ben10225</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bio-wrapper {
  width: 100%;
  /* height: 100vh; */
  /* background-color: #ffffff; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.outter {
  width: 800px;
  /* height: 700px; */
  position: relative;
  margin-top: 70px;
}

.upper-block {
  display: flex;
  flex-direction: row;
  margin-left: 15px;
}

.info-block {
  margin-left: 25px;
  margin-top: 221px;
}
.info {
  width: 400px;
  font-size: 16px;
  color: #666;
}
.contact-infos {
  margin-top: 45px;

  margin-bottom: 70px;
}
.ic {
  font-size: 19px;
  margin-bottom: 10px;
  color: #666;
  position: relative;
  top: 2px;
}
.contact-content {
  font-size: 16px;
  display: inline;
  margin-left: 20px;
  position: relative;
  top: -10px;
  text-decoration: none;
  color: #666;
}
.linkedin-ic {
  font-size: 21px;
}
</style>
