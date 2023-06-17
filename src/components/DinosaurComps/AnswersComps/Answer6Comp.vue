<script setup></script>

<template>
  <div class="content">
    <p>
      這份網頁當初在製作時就希望用一些沒用過的技術，因此最主要就是使用 Vue3
      來實做一個簡歷網頁，其中也使用 Vitest 搭配 Firebase 來實做 ci /
      cd，跑起來的時候還真的有些感動，畢竟之前自己沒摸到這塊領域。
    </p>
    <p>
      不過整段開發最深的感觸應該就是
      RWD，一開始本來想說先求有畫面，幾個頁面功能都完成後，想說好吧該來的還是要來，終究得面對。在實作時才發現自己切版根本亂切，導致一堆頁面直接重新架構
      ，又練了一波切版 ☺️。
    </p>
    <p>
      得到的體悟就是，要做 RWD
      的話，一開始就一起做掉比較好。然後就感嘆彭彭當初任務也是這樣設計的，真的是太厲害了！！
      <br />
      不過呢，這個 Dino 的頁面我沒做 🙂。
    </p>
    <!-- <p>這份網頁使用了以下技術：</p>
    <div>
      <div class="short">Vue 3</div>
      → 前端框架。
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
      → 動畫套件，網頁元件動畫相關操作。
    </div>
    <div>
      <div class="short">Firebase</div>
      → 部署網頁、資料庫使用。
    </div>
    <div>
      <div class="long">GitHub Actions</div>
      → 搭配 Firebase 實作 ci / cd。
    </div>
    <br />
    <div>以及一顆享受開發的心。</div> -->
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
