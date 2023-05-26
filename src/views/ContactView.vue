<script setup>
import ContactDecorate from "../components/ContactComps/ContactDecorateComp.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import { ref, computed } from "vue";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import emailAccount from "../components/js/env.js";

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
    await addDoc(collection(db, "email-message"), {
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
          // console.log("SUCCESS!", result.text);
        },
        (error) => {
          // console.log("FAILED...", error.text);
        }
      );
    formData.value.name = "";
    formData.value.email = "";
    formData.value.message = "";
    v$.value.$reset();
  }
};

const errorHandler = (errId) => {
  console.log(errId);
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
            <button>送 出</button>
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
  /* border: 1px solid #000; */
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
  border-radius: 7px;
  background-color: #ececec;
  color: #444;
  transition: 0.3s;
  outline: none;
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
</style>
