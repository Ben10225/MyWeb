<script setup>
import ContactDecorate from "../components/ContactComps/ContactDecorateComp.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { ref, computed } from "vue";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import emailAccount from "../components/js/env.js";

const emailResContent = ref("");
const emailResColor = ref("#ffffff");
const btnDisable = ref(false);
const alertShow = ref(false);
const btnContent = ref("送 出");
const iconTag = ref("thumbs-up");
const alertBtnBgc = ref("rgb(63, 156, 63)");

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const rules = computed(() => {
  return {
    name: { required, minLength: minLength(2), maxLength: maxLength(30) },
    email: { required, email },
    message: { required, minLength: minLength(5), maxLength: maxLength(200) },
  };
});

const v$ = useVuelidate(rules, formData);
const SERVICE_ID = emailAccount.SERVICE_ID;
const TEMPLATE_ID = emailAccount.TEMPLATE_ID;
const PUBLIC_KEY = emailAccount.PUBLIC_KEY;

const submit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    btnContent.value = "";
    btnDisable.value = true;

    addDoc(collection(db, "email-message"), {
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
      date: new Date(),
      // date: +new Date(),
    });

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.value.name,
          from_email: formData.value.email,
          message: formData.value.message,
        },
        PUBLIC_KEY
      )
      .then(
        (result) => {
          formData.value.name = "";
          formData.value.email = "";
          formData.value.message = "";
          v$.value.$reset();

          emailResContent.value = "發送成功 !";
          emailResColor.value = "rgb(63, 156, 63)";
          alertShow.value = true;
          iconTag.value = "thumbs-up";
          alertBtnBgc.value = "rgb(63, 156, 63)";
          resetEmailRes();
        },
        (error) => {
          emailResContent.value = "發送失敗 請稍後再試 !";
          emailResColor.value = "rgb(215, 80, 42)";
          alertShow.value = true;
          iconTag.value = "triangle-exclamation";
          alertBtnBgc.value = "rgb(215, 80, 42)";
          resetEmailRes();
        }
      );
  }
};

const resetEmailRes = () => {
  setTimeout(() => {
    emailResContent.value = "";
    emailResColor.value = "#ffffff";
    btnContent.value = "送 出";
    btnDisable.value = false;
    alertShow.value = false;
  }, 3000);
};

const errorHandler = (errId) => {
  if (
    errId === "name-required" ||
    errId === "name-minLength" ||
    errId === "name-maxLength"
  ) {
    return "長度需介於 2 - 30 個字元";
  } else if (errId === "email-email" || errId === "email-required") {
    return "請填入正確信箱格式";
  } else if (
    errId === "message-required" ||
    errId === "message-minLength" ||
    errId === "message-maxLength"
  ) {
    return "長度需介於 5 - 200 個字元";
  }
};
</script>

<template>
  <div class="contact-wrapper">
    <div class="outter">
      <ContactDecorate />
      <h1 class="title">Contact</h1>
      <div class="content-block">
        <p>
          若有任何需求與合作機會，歡迎留言或以信箱聯絡，會在最短的時間內回覆您，謝謝！
        </p>
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
        <hr />
        <p>您的資訊</p>
        <form class="form-block" @submit.prevent="submit">
          <div class="name form-line">
            <font-awesome-icon
              :icon="['fas', 'user']"
              class="ic bottom-ic"
            /><input
              type="text"
              v-model.trim="formData.name"
              placeholder="姓名"
            />
            <span
              v-show="error.$message"
              v-for="error of v$.name.$errors"
              :key="error.$uid"
              class="text-red"
              >{{ errorHandler(error.$uid) }}</span
            >
          </div>
          <div class="email form-line">
            <font-awesome-icon
              :icon="['fas', 'paper-plane']"
              class="ic bottom-ic"
            /><input
              type="email"
              v-model.trim="formData.email"
              placeholder="信箱"
            />
            <span
              v-show="error.$message"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
              class="text-red"
              >{{ errorHandler(error.$uid) }}</span
            >
          </div>
          <div class="message form-line">
            <font-awesome-icon
              :icon="['fas', 'comment-dots']"
              class="ic bottom-ic"
            />
            <textarea
              resize=""
              name=""
              id=""
              cols="30"
              rows="10"
              v-model.trim="formData.message"
              placeholder="留言"
            ></textarea>
            <span
              v-show="error.$message"
              v-for="error of v$.message.$errors"
              :key="error.$uid"
              class="text-red"
              >{{ errorHandler(error.$uid) }}</span
            >
          </div>
          <div class="button-block">
            <div class="alert-btn-outter">
              <div
                class="alert-btn"
                :class="{ 'btn-move': alertShow }"
                :style="{ backgroundColor: alertBtnBgc }"
              >
                <font-awesome-icon
                  :icon="['fas', iconTag]"
                  class="btn-icon"
                  :class="{ 'btn-icon-move': alertShow }"
                />
              </div>
            </div>
            <button :disabled="btnDisable">
              {{ btnContent }}
              <img
                v-show="btnDisable"
                class="loading"
                src="/loading.gif"
                alt=""
              />
            </button>
            <div class="email-alert" :style="{ color: emailResColor }">
              {{ emailResContent }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-wrapper {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.outter {
  width: 800px;
  width: 800px;
  height: 800px;
  position: relative;
}
h1 {
  position: absolute;
  font-size: 60px;
  color: #333;
  font-weight: 600;
  top: 55px;
  left: -19px;
  z-index: 10;
}
.content-block {
  position: relative;
  margin-top: 170px;
  margin-left: 15px;
}
.content-block p {
  color: #666;
  font-size: 17px;
  margin-bottom: 20px;
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
hr {
  margin-top: 20px;
  margin-bottom: 30px;
}
.name,
.email,
.message {
  margin-top: 13px;
}
input,
textarea {
  font-size: 17px;
  padding: 7px 7px;
  border-radius: 5px;
  border: rgba(0, 0, 0, 0.2) solid 1px;
  outline: none;
  margin-left: 35px;
  width: 330px;
  transition: 0.4s;
  resize: none;
}
textarea {
  height: 200px;
  font-family: sans-serif;
}
input:focus,
textarea:focus {
  border: rgba(202, 145, 22, 1) solid 1px;
}
.form-line {
  position: relative;
}
.bottom-ic {
  position: absolute;
  top: 7px;
  font-size: 19px;
}
.email .ic {
  left: -1px;
}
button {
  margin-left: 35px;
  padding: 5px 7px;
  font-size: 15px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: #ececec;
  transition: 0.3s;
  outline: none;
  position: relative;
  width: 50px;
  height: 30px;
  color: #444;
}
.button-block {
  position: relative;
}
button:hover {
  background-color: #e1e1e1;
}
::placeholder {
  opacity: 0.5;
}
.text-red {
  margin-left: 10px;
  color: rgb(187, 64, 64);
}
.email-alert {
  position: absolute;
  top: 13px;
  margin-left: 20px;
  opacity: 1;
  display: inline-block;
  font-size: 16px;
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 23px;
  pointer-events: none;
  user-select: none;
}
.alert-btn-outter {
  position: absolute;
  margin-left: 35px;
  margin-top: 10px;
  width: 50px;
  height: 30px;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
}
.alert-btn {
  width: 50px;
  height: 30px;
  border-radius: 8px;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top: 30px;
  transition: 0.3s;
}
.btn-icon {
  color: #ffffff;
  font-size: 21px;
  position: relative;
  top: -31px;
  transition: 0.3s;
}
.btn-move {
  top: 0px;
}
.btn-icon-move {
  top: -1px;
}
</style>
