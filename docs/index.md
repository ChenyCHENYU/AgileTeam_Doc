---
layout: home
title: 天智AgileTeam前端

hero:
  name: Development Teams Based Agile Thinking
  text: 拥抱开放，拥抱变化
  tagline: 以不同的角色，不同的视野，同时借助社区和伙伴的力量，持续集成，优化完善，也基于项目实践，沉淀技术栈，管理思想，同步拓展 π 型的综合能力。
  image:
    src: /assets/img/robot.png
    alt: robot
  actions:
    - theme: brand
      text: 查看文档
      link: /basis/get-familiar-quickly/engineering
    - theme: alt
      text: 查看组件
      link: /component/preface

features:
  - icon: ⚡️
    title: Vite, Vue3, TypeScript
    details: 拥抱标准化最新技术栈，持续更新维护
  - icon: 🖖
    title: 前端，且不限于前端
    details: 基于前端，不限于前端，拓展更多的可能，服务前端
  - icon: 🛠️
    title: 库，ui框架，工具
    details: 精益驱动，提升产能，快速交付，高效开发才是根本
---

<VPTeamMembers size="small" :members="members" />

<script setup>

// import Home from '@theme/Home.vue'
</script>

<Home />

<style>

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #409eff);
}

</style>
