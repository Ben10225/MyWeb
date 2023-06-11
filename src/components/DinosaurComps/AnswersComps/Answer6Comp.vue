<script setup></script>

<template>
  <div class="content">
    <p>這份網頁我使用了以下相關技術：</p>
    <div>
      <div class="short">Vue 3</div>
      → 前端網頁框架使用。
    </div>
    <div>
      <div class="short">Vite</div>
      → 建構 Vue 的環境、加速開發體驗，並且打包程式碼。
    </div>
    <div>
      <div class="short">Vitest</div>
      → 前端網頁單元測試。
    </div>
    <div>
      <div class="short">GSAP</div>
      → 物件動畫的相關操作。
    </div>
    <div>
      <div class="short">Firebase</div>
      → 部署網頁，以及資料庫操作。
    </div>
    <div>
      <div class="long">GitHub Actions</div>
      → 搭配 Firebase 實作 ci / cd。
    </div>
    <br />
    <div>以及一顆享受開發的心。</div>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 15px;
}
.short {
  width: 70px;
  display: inline-block;
  margin-bottom: 5px;
}
.long {
  width: 120px;
  display: inline-block;
}
</style>
