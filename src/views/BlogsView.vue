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
const lifeBlogs = ref([]);
const programBlogs = ref([]);
const showEditor = ref(false);

const pagination = ref({
  lifeNextPage: false,
  programNextPage: false,
  lifeNowPageIndex: 0,
  programNowPageIndex: 0,
  lifeLastDocument: null,
  programLastDocument: null,
});

const blogs = computed(() => {
  return mode.value === "LIFE"
    ? lifeBlogs.value.slice(0, pagination.value.lifeNowPageIndex)
    : programBlogs.value.slice(0, pagination.value.lifeNowPageIndex);
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

const updateDbViews = async (dbName, id, newViews) => {
  try {
    await updateDoc(
      doc(db, dbName, id),
      {
        views: newViews,
      },
      { merge: true }
    );
  } catch (err) {
    console.log("update views fail");
  }
};

const handleAddViews = async (id) => {
  let newViews;
  let dbName;

  const addLocalViews = (storage, name) => {
    storage.forEach((blog) => {
      if (blog.id === id) {
        blog.views = blog.views + 1;
        newViews = blog.views;
        blog.addViewsAlready = true;
      }
    });
    dbName = name;
  };

  if (mode.value === "LIFE") {
    addLocalViews(lifeBlogs.value, "life-blogs");
  } else {
    addLocalViews(programBlogs.value, "program-blogs");
  }

  updateDbViews(dbName, id, newViews);
};

const addToBlogs = (dbData, localStorage, mode, status) => {
  dbData.forEach((doc) => {
    const createdAtTimestamp = doc.data().createdAt;
    const createdAtDate = createdAtTimestamp.toDate();
    const year = createdAtDate.getFullYear();
    const month = createdAtDate.getMonth() + 1;
    const day = createdAtDate.getDate();

    localStorage.push({
      id: doc.id,
      content: doc.data().content,
      date: [year, month, day],
      image: doc.data().image,
      views: doc.data().views,
      addViewsAlready: false,
    });
  });

  if (mode === "LIFE") {
    if (status === "firstLoad") {
      if (dbData.size === loadBlogsAmount + 1) {
        pagination.value.lifeNextPage = true;
        pagination.value.lifeNowPageIndex = loadBlogsAmount;
        pagination.value.lifeLastDocument = dbData.docs[dbData.docs.length - 1];
      } else {
        pagination.value.lifeNowPageIndex = dbData.size;
      }
    } else if (status === "clickMoreLoad") {
      if (dbData.size === loadBlogsAmount) {
        pagination.value.lifeNextPage = true;
        pagination.value.lifeNowPageIndex =
          pagination.value.lifeNowPageIndex + loadBlogsAmount;
      } else {
        pagination.value.lifeNowPageIndex = loadBlogsAmount + 1 + dbData.size;
        pagination.value.lifeNextPage = false;
      }
    }
  }

  if (mode === "PROGRAM") {
    if (status === "firstLoad") {
      if (dbData.size === loadBlogsAmount + 1) {
        pagination.value.programNextPage = true;
        pagination.value.programNowPageIndex = loadBlogsAmount;
        pagination.value.programLastDocument =
          dbData.docs[dbData.docs.length - 1];
      } else {
        pagination.value.programNowPageIndex = dbData.size;
      }
    } else if (status === "clickMoreLoad") {
      if (dbData.size === loadBlogsAmount) {
        pagination.value.programNextPage = true;
        pagination.value.programNowPageIndex =
          pagination.value.programNowPageIndex + loadBlogsAmount;
      } else {
        pagination.value.programNowPageIndex =
          loadBlogsAmount + 1 + dbData.size;
        pagination.value.programNextPage = false;
      }
    }
  }
};

const getBlogs = async (amount, status) => {
  const lifeQ =
    pagination.value.lifeLastDocument === null
      ? query(
          collection(db, "life-blogs"),
          orderBy("createdAt", "desc"),
          limit(amount)
        )
      : query(
          collection(db, "life-blogs"),
          orderBy("createdAt", "desc"),
          startAfter(pagination.value.lifeLastDocument),
          limit(amount)
        );

  const programQ =
    pagination.value.programLastDocument === null
      ? query(
          collection(db, "program-blogs"),
          orderBy("createdAt", "desc"),
          limit(amount)
        )
      : query(
          collection(db, "program-blogs"),
          orderBy("createdAt", "desc"),
          startAfter(pagination.value.programLastDocument),
          limit(amount)
        );

  if (status === "firstLoad") {
    try {
      const [lifes, programs] = await Promise.all([
        getDocs(lifeQ),
        getDocs(programQ),
      ]);

      addToBlogs(lifes, lifeBlogs.value, "LIFE", status);
      addToBlogs(programs, programBlogs.value, "PROGRAM", status);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else if (mode.value === "LIFE") {
    try {
      const lifes = await getDocs(lifeQ);
      addToBlogs(lifes, lifeBlogs.value, "LIFE", status);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else if (mode.value === "PROGRAM") {
    try {
      const programs = await getDocs(programQ);
      addToBlogs(programs, programBlogs.value, "PROGRAM", status);
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
          (mode === 'LIFE' && pagination.lifeNextPage) ||
          (mode === 'PROGRAM' && pagination.programNextPage)
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

<!-- 
const lifes = [
  {
    id: "l1",
    content: "王淨小姊姊好正！！",
    date: [2024, 4, 19],
    image: "/jing.jpeg",
    views: 1,
  },
  {
    id: "l2",
    content:
      "這是我電腦的貓<br />但並不是我的貓<br /><br />它的眼神很漂亮呢很漂亮呢！",
    date: [2024, 4, 20],
    image: "/cat.jpg",
    views: 10000,
  },
];

const programs = [
  {
    id: "p1",
    content:
      "個人網頁新增了部落格的功能<br />雖然比較像日記的概念<br />希望能紀錄下成長的足跡！",
    date: [2024, 4, 20],
    image: "/program.jpg",
    views: 100,
  },
]; -->
