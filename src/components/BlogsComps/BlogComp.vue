<script setup>
import { ref, onMounted, watchEffect } from "vue";

const emit = defineEmits(["AddViews"]);
const props = defineProps({
  blog: {
    type: Object,
    require: true,
  },
});

const blogData = ref({
  status: "",
  origin: props.blog.content,
  shortcut: "",
  lessTwoRows: false,
  hasClicked: false,
});

const textContainer = ref(null);
const maxHeight = ref(0);

const getShorterText = (content) => {
  let shortcut = "";
  let edit = false;
  let lessTwoRows = false;

  let arr = content.split("\n");
  if (arr.length === 1) {
    if (content.length > 45) {
      edit = true;
      shortcut = content.slice(0, 44);
    } else {
      lessTwoRows = true;
    }
  } else if (arr.length > 2) {
    if (arr[0].length > 24 && arr[0].length <= 44) {
      if (arr[0].indexOf("<span") !== -1) {
        const strippedStr = arr[0].replace(
          /<span class='code'>(.*?)<\/span>/g,
          "$1"
        );
        if (strippedStr.length > 24 && arr[0].length <= 44) {
          shortcut = arr[0];
        } else if (strippedStr.length <= 24) {
          shortcut = arr[0] + "\n" + arr[1];
        }
      } else {
        shortcut = arr[0];
      }
      edit = true;
    } else if (arr[0].length > 44) {
      edit = true;
      shortcut = content.slice(0, 44);
    } else if (arr[1].length > 24) {
      edit = true;
      shortcut = arr[0] + "\n" + arr[1].slice(0, 20);
    } else {
      edit = true;
      shortcut = arr[0] + "\n" + arr[1];
    }
  } else if (arr.length === 2) {
    if (arr[0].length <= 24 && arr[1].length <= 24) {
      lessTwoRows = true;
    }
  }

  if (props.blog.addViewsAlready) {
    return {
      edit: true,
      origin: content,
      shortcut: content,
      lessTwoRows: lessTwoRows,
      hasClicked: true,
    };
  }

  return {
    edit: edit,
    origin: content,
    shortcut: shortcut,
    lessTwoRows: lessTwoRows,
    hasClicked: false,
  };
};

const setContent = (item) => {
  if (item.edit) {
    return item.shortcut;
  } else {
    return item.origin;
  }
};

const handleShow = () => {
  blogData.value.edit = false;
  setTimeout(() => {
    maxHeight.value = textContainer.value.scrollHeight;
  });

  // add views
  emit("AddViews", props.blog.id);
};

blogData.value = getShorterText(blogData.value.origin);

onMounted(() => {
  maxHeight.value = textContainer.value.scrollHeight;

  const option = {
    threshold: 0.8,
  };
  let timer;

  if (blogData.value.lessTwoRows && !props.blog.addViewsAlready) {
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        let ct = 0;
        timer = setInterval(() => {
          ct++;
          if (ct > 30) {
            observer.unobserve(entries[0].target);
            clearInterval(timer);

            // add views
            emit("AddViews", props.blog.id);
          }
        }, 100);
      } else {
        clearInterval(timer);
      }
    };
    const observer = new IntersectionObserver(callback, option);
    observer.observe(textContainer.value);
  }
});
</script>

<template>
  <div
    ref="textContainer"
    :class="[blogData.edit || blogData.lessTwoRows ? '' : 'click', 'blog']"
    :style="{ maxHeight: maxHeight + 'px' }"
  >
    <div class="image-wrapper">
      <div class="notfound"></div>
      <div
        class="image"
        :style="{ backgroundImage: `url(${props.blog.image})` }"
      ></div>
    </div>
    <div class="text">
      <div class="firstLine">
        <p class="time">
          {{ props.blog.date[0] }}<span class="line">-</span
          >{{ props.blog.date[1] }}<span class="line">-</span
          >{{ props.blog.date[2] }}
        </p>
        <div class="view-wrapper">
          <font-awesome-icon :icon="['fas', 'eye']" class="icon" />
          <span class="view">{{ props.blog.views }}</span>
        </div>
      </div>
      <p class="content" v-html="setContent(blogData)"></p>
      <span
        v-if="blogData.edit && !props.blog.addViewsAlready"
        class="more"
        @click="handleShow"
        >...more</span
      >
    </div>
  </div>
</template>

<style>
.blog {
  width: 400px;
  background-color: #fff;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.5);
  margin-bottom: 50px;
}
.blog.click {
  overflow: hidden;
  transition: max-height 0.5s ease;
}
.image-wrapper {
  position: relative;
  width: 400px;
  height: 300px;
}
.notfound {
  width: 100%;
  height: 100%;
  background-image: url("/image-not-found.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 11px solid #fff;
  position: absolute;
}
.image {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 11px solid #fff;
  z-index: 5;
  position: absolute;
}

.text {
  padding: 10px 15px 15px 15px;
}
.firstLine {
  display: flex;
  /* border: 1px solid #000; */
  width: 100%;
  justify-content: space-between;
  margin-bottom: -5px;
}
.time {
  margin-top: -10px;
  /* margin-bottom: 5px; */
  font-size: 15px;
  color: #c9b085;
}
.view-wrapper {
  color: #c9b085;
  position: relative;
  top: -10px;
}
.icon {
  margin-right: 7px;
}
.time .line {
  margin: 0 3px;
}
.content {
  display: inline;
  color: #94743d;
  white-space: pre-line;
  letter-spacing: 0.02em;
}
.more {
  margin-left: 5px;
  cursor: pointer;
  color: #aeaeae;
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
@media (max-width: 400px) {
  .blog {
    transform: scale(0.85);
    margin-bottom: 0px;
  }
}
</style>
