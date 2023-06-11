<script setup></script>

<template>
  <div class="content">
    <p>這份網頁我使用了以下相關技術：</p>
    <br />

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
    <div>GitHub Actions → 搭配 Firebase 實作 ci / cd。</div>
    <br />
    <div>以及一顆享受開發的心。</div>
  </div>
</template>

<style scoped>
p {
  font-size: 13px;
  color: #c0c0c0;
}
.short {
  width: 60px;
  display: inline-block;
}
</style>
