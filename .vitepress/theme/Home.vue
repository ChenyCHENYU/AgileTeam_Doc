<!--
 * @Author: ChenYu
 * @Date: 2022-10-08 09:23:49
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-10-23 21:04:49
 * @FilePath: \learning-vue3-main\.vitepress\theme\Home.vue
 * @Description: 入口页面
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <el-main>
    <p align="center">
      <el-button type="primary" round>
        <el-link
          :underline="false"
          href="/get-familiar-quickly/engineering.html"
          style="color: white"
        >
          😊 快速开始</el-link
        >
      </el-button>
      <el-button
        round
        href="https://github.com/"
        target="_blank"
        style="margin-left: 10px"
      >
        Github
      </el-button>
    </p>
    <el-divider margin="40px" color="#eef" />
    <p block>⚡ 欢迎使用 vitePress-cheny</p>
    <p block>🌲 在这里阅读吧</p>
    <p block>
      🔨 官方文档在
      <el-link href="https://vitepress.vuejs.org" type="primary">
        这里
      </el-link>
    </p>

    <el-divider margin="40px" color="#eef" />

    <p bold block>特性</p>
    <p>📌 拥抱标准化最新技术栈，持续更新维护</p>
    <p>
      🚀 和
      <el-link href="https://element-plus.gitee.io/zh-CN/" type="primary">
        ElementPlus
      </el-link>
      完美融合
    </p>
    <p>💪 使用 Vue.js 最新特性开发</p>
    <p>🐆 全面基于 Vite，速度够快</p>
    <p>🖍️ markdown 中直接使用 vue 组件</p>
    <p>✔️ 配置简单，上手容易</p>
    <p>🚩 markdown 中直接使用 setup 语法糖</p>
    <p>📃 第三方组件库支持</p>
  </el-main>
</template>

<style scoped>
.el-main {
  max-width: 620px;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 40px;
  padding-bottom: 0;
}

.el-button-default {
  margin-left: 10px;
}

.el-main p {
  display: block;
  line-height: 40px;
}
</style>
