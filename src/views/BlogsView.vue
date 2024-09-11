<script setup>
import BlogComp from "../components/BlogsComps/BlogComp.vue";
import ButtonsComp from "../components/BlogsComps/ButtonsComp.vue";
import EditorComp from "../components/BlogsComps/EditorComp.vue";
import { computed, ref, onMounted } from "vue";
import { db } from "@/firebase";
import {
  getDocs,
  collection,
  orderBy,
  query,
  limit,
  updateDoc,
  doc,
  startAfter,
} from "firebase/firestore";

const loadBlogsAmount = 4;
const mode = ref("LIFE");
const showEditor = ref(false);

class Blog {
  constructor(DBName) {
    this.nextPage = false;
    this.nowIndex = -1;
    this.lastLoad = null;
    this.allBlogs = [];
    this.DBName = DBName;
  }

  addBlogs(loadDatas, status) {
    loadDatas.forEach((doc) => {
      const createdAtTimestamp = doc.data().createdAt;
      const createdAtDate = createdAtTimestamp.toDate();
      const year = createdAtDate.getFullYear();
      const month = createdAtDate.getMonth() + 1;
      const day = createdAtDate.getDate();

      this.allBlogs.push({
        id: doc.id,
        content: doc.data().content,
        date: [year, month, day],
        image: doc.data().image,
        views: doc.data().views,
        addViewsAlready: false,
      });
    });

    if (status === "firstLoad") {
      if (loadDatas.size === loadBlogsAmount + 1) {
        this.nextPage = true;
        this.nowIndex = loadBlogsAmount;
        this.lastLoad = loadDatas.docs[loadDatas.docs.length - 1];
      } else {
        this.nowIndex = loadDatas.size;
      }
    } else if (status === "clickMoreLoad") {
      if (loadDatas.size === loadBlogsAmount) {
        this.nextPage = true;
        this.nowIndex = this.nowIndex + loadBlogsAmount;
        this.lastLoad = loadDatas.docs[loadDatas.docs.length - 1];
      } else {
        this.nowIndex = this.nowIndex + 1 + loadDatas.size;
        this.nextPage = false;
      }
    }
  }

  async viewsPlusOne(id) {
    let newViews;
    this.allBlogs.forEach((blog) => {
      if (blog.id === id) {
        blog.views = blog.views + 1;
        blog.addViewsAlready = true;

        newViews = blog.views;
      }
    });

    try {
      await updateDoc(
        doc(db, this.DBName, id),
        {
          views: newViews,
        },
        { merge: true }
      );
    } catch (err) {
      console.log("update views fail");
    }
  }
}

const lifeBlog = ref(new Blog("life-blogs"));
const programBlog = ref(new Blog("program-blogs"));

const blogs = computed(() => {
  return mode.value === "LIFE"
    ? lifeBlog.value.allBlogs.slice(0, lifeBlog.value.nowIndex)
    : programBlog.value.allBlogs.slice(0, programBlog.value.nowIndex);
});

const handleChangeMode = (m) => {
  mode.value = m;
};

const handleLoad = () => {
  getBlogs(loadBlogsAmount, "clickMoreLoad");
};

const handleCloseEditor = () => {
  showEditor.value = false;
};

const handleShowEditor = () => {
  if (mode.value === "PROGRAM") {
    showEditor.value = true;
  }
};

const handleAddViews = async (id) => {
  mode.value === "LIFE"
    ? lifeBlog.value.viewsPlusOne(id)
    : programBlog.value.viewsPlusOne(id);
};

const getBlogs = async (amount, status) => {
  const lifeQ =
    lifeBlog.value.lastLoad === null
      ? query(
          collection(db, "life-blogs"),
          orderBy("createdAt", "desc"),
          limit(amount)
        )
      : query(
          collection(db, "life-blogs"),
          orderBy("createdAt", "desc"),
          startAfter(lifeBlog.value.lastLoad),
          limit(amount)
        );

  const programQ =
    programBlog.value.lastLoad === null
      ? query(
          collection(db, "program-blogs"),
          orderBy("createdAt", "desc"),
          limit(amount)
        )
      : query(
          collection(db, "program-blogs"),
          orderBy("createdAt", "desc"),
          startAfter(programBlog.value.lastLoad),
          limit(amount)
        );

  if (status === "firstLoad") {
    try {
      const [lifes, programs] = await Promise.all([
        getDocs(lifeQ),
        getDocs(programQ),
      ]);
      lifeBlog.value.addBlogs(lifes, status);
      programBlog.value.addBlogs(programs, status);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else if (mode.value === "LIFE") {
    try {
      const lifes = await getDocs(lifeQ);
      lifeBlog.value.addBlogs(lifes, status);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else if (mode.value === "PROGRAM") {
    try {
      const programs = await getDocs(lifeQ);
      programBlog.value.addBlogs(programs, status);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};

onMounted(() => {
  getBlogs(loadBlogsAmount + 1, "firstLoad");
});
</script>

<template>
  <div class="blog-wrapper">
    <div class="center">
      <EditorComp v-if="showEditor" @closeEditor="handleCloseEditor" />
      <ButtonsComp
        :mode="mode"
        @changeMode="handleChangeMode"
        @triggerShowEditor="handleShowEditor"
      />
      <div class="blogs-wrapper">
        <div v-for="blog in blogs" :key="blog.id" class="blogs">
          <BlogComp :blog="blog" @AddViews="handleAddViews" />
        </div>
      </div>
      <div
        v-if="
          (mode === 'LIFE' && lifeBlog.nextPage) ||
          (mode === 'PROGRAM' && programBlog.nextPage)
        "
        class="load"
        @click="handleLoad"
      >
        載入更多
      </div>
    </div>
  </div>
</template>

<style>
.blog-wrapper {
  width: 100%;
  background-color: #c3af8d;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  width: 960px;
  min-height: 100vh;
  background-color: #f5ede0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.load {
  color: #999;
  margin-bottom: 50px;
  cursor: pointer;
  font-size: 18px;
  margin-top: -20px;
}
.blogs-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  flex-wrap: wrap;
  justify-items: center;
}
@media (max-width: 900px) {
  .blogs-wrapper {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 400px) {
  .blogs {
    margin-top: -40px;
  }
}
</style>
