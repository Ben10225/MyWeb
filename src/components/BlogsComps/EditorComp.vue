<script setup>
import { ref as refVue, computed } from "vue";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "@/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const emit = defineEmits(["closeEditor"]);

const storage = getStorage();
const input = refVue("");
const image = refVue("");
const fileName = refVue("");
const selectMode = refVue("life-blogs");
const file = refVue(null);

const getCode = computed(() => {
  let result = input.value;
  result = result.replace(/\*\*(.*?)\*\*/g, "<span class='code'>$1</span>");

  console.log(result);
  return result;
});

const handleFade = () => {
  emit("closeEditor");
};

const handleFileUpload = (e) => {
  file.value = e.target.files[0];
  fileName.value = file.value.name;
  const reader = new FileReader();
  reader.onload = () => {
    image.value = reader.result;
  };
  reader.readAsDataURL(file.value);
};

const uploadBlogData = async (link) => {
  try {
    await addDoc(collection(db, selectMode.value), {
      image: link,
      content: getCode.value,
      views: 0,
      createdAt: Timestamp.now(),
    });
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

const handleSubmit = (e) => {
  // console.log(getCode.value);

  e.preventDefault();
  // return;

  let link = "";
  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, `blogs/${fileName.value}`);
  const uploadTask = uploadBytesResumable(storageRef, file.value, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log("Upload is " + progress + "% done");
      // switch (snapshot.state) {
      //   case "paused":
      //     console.log("Upload is paused");
      //     break;
      //   case "running":
      //     console.log("Upload is running");
      //     break;
      // }
    },
    (error) => {
      // Handle unsuccessful uploads
      console.log(error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        uploadBlogData(downloadURL);
      });
    }
  );
};
</script>

<template>
  <div class="editor-wrapper">
    <form class="editor" @submit="handleSubmit">
      <h3>文章內容</h3>
      <textarea
        v-model="input"
        name=""
        id=""
        cols="30"
        rows="10"
        @input="getInputHTML"
      ></textarea>
      <select v-model="selectMode">
        <option value="life-blogs">life-blogs</option>
        <option value="program-blogs">program-blogs</option>
      </select>
      <div class="image-choose">
        <input type="file" @change="handleFileUpload" />
      </div>
      <button class="submit" type="submit">上傳</button>
    </form>
    <div class="display-block">
      <div class="fade" @click="handleFade">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </div>
      <div>
        <div class="image-wrapper">
          <div class="notfound"></div>
          <div
            class="image"
            :style="{ backgroundImage: `url(${image})` }"
          ></div>
        </div>
        <div class="text">
          <div class="firstLine">
            <p class="time">2024 --</p>
            <div class="view-wrapper">
              <font-awesome-icon :icon="['fas', 'eye']" class="icon" />
            </div>
          </div>
          <p class="content" v-html="getCode"></p>
        </div>
      </div>
    </div>
  </div>
  <div class="back"></div>
</template>

<style scoped>
.editor-wrapper {
  position: fixed;
  height: 100%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 30;
}
h3 {
  color: #fff;
  margin-top: 50px;
  margin-bottom: 5px;
}
textarea {
  z-index: 21;
  width: 300px;
  height: 300px;
  line-height: 24px;
  resize: none;
  padding: 3px 5px;
}
select {
  display: block;
  margin-top: 15px;
  font-size: 16px;
  padding: 3px;
}
.display-block {
  margin-left: 120px;
  width: 400px;
  background-color: #fff;
  color: #000;
  position: relative;
  white-space: pre-line;
  letter-spacing: 0.02em;
}
.content {
  display: inline;
  color: #94743d;
}
.image-choose {
  margin-top: 30px;
}
.submit {
  margin-top: 50px;
  color: #fff;
  border: 1px solid #fff;
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 10px;
  margin-left: 0;
}
.back {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #111;
  opacity: 0.9;
  z-index: 20;
}
.code {
  margin: 0 4px;
  background-color: #e8e8e8;
  padding: 1px 4px;
  border-radius: 3px;
  color: red;
  font-family: "Fira Code", monospace;
  font-size: 15px;
}
.fade {
  position: absolute;
  font-size: 50px;
  color: #fff;
  right: -50px;
  top: -100px;
  cursor: pointer;
}
</style>
