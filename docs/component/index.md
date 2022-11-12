---
outline: 'deep'
---

# 前言

给大家矫情的一些话。

## 背景

> 面向 B 端项目，应着实际业务场的需要，为方便伙伴提升开发效率，搭建了一个渐进式的中后台管理框架，使用了 **`Vite`**，**`Vue3`**，**`TypeScript`**，**`Pinia`**，**`ElementPlus`** 等技术选型，该框架组件的开发是基于 [Element-Plus](https://element-plus.gitee.io/zh-CN/)，进行的一些二次封装，在使用新的技术栈实践需求的过程中，不断完善，欢迎大家评论，也可以在项目上提出 `issus` 和 `bugs`，也更期望大家可以参与进来，贡献你的一份力量，在支撑自己的同时，面向开源，可以有效帮助到更多的开发者。

## 说明

组件版块的内容除了如上背景之外，做了一些插件配置，如自动引入 `Vue，VueRouter，Pinia` API 之外，对 `src/compoents` 下的组件也用了按需自动引入，某些组件需要使用 `name` 属性，也做了 `script-setup `扩展，可以直接 `<script setup lang="ts" name="your name">`，可以在组件中直接使用。

:::tip

基于框架，组件模块使用了 `Vue 3.2.44`版本，`vite3.0.9`版本 ， `elementplus 2.2.20` 版本。  
建议使用 `pnpm` 作为 包依赖管理。

:::

完了慢慢写这个篇幅吧，先上组件。。。
