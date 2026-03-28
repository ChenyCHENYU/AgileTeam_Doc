---
outline: "deep"
---

# 概述

<div class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">
      <span class="wave">👋</span> Hey！欢迎来到 Robot uniApp 的世界！
    </h1>
    <p class="hero-subtitle">
      <strong>Robot uniApp</strong> 是一个企业级跨平台移动应用开发框架，<br>
      一套代码，同时运行在 H5、小程序、App 等多端平台
    </p>
  </div>
</div>

::: tip 🚀 核心理念
**一码多端、开箱即用、企业级规范**——让开发者专注于业务逻辑，而不是平台差异。
:::

**Robot uniApp** 是一个基于 **Vue 3 + UniApp + UnoCSS + wot-design-uni** 构建的企业级跨平台移动应用框架。它沿承了 Robot Admin 的工程化基因，将企业级开发规范延伸至移动端，支持 **H5、微信小程序、App** 等多端同步开发。

## 🎯 主要功能

### ⚡ 跨平台一体化架构

Robot uniApp 以 **UniApp** 为基础，实现真正的一码多端：

<div class="performance-grid">
  <div class="perf-card">
    <div class="perf-icon">📱</div>
    <div class="perf-title">H5 / WebApp</div>
    <div class="perf-value">移动端</div>
    <div class="perf-desc">企业后台 H5、公众号嵌入页</div>
  </div>
  
  <div class="perf-card">
    <div class="perf-icon">🐧</div>
    <div class="perf-title">微信小程序</div>
    <div class="perf-value">小程序</div>
    <div class="perf-desc">独立发布、企业微信小程序</div>
  </div>
  
  <div class="perf-card">
    <div class="perf-icon">📲</div>
    <div class="perf-title">原生 App</div>
    <div class="perf-value">Android / iOS</div>
    <div class="perf-desc">打包为原生 Android / iOS 应用</div>
  </div>
</div>

::: info 📊 多端覆盖
基于 UniApp 框架，理论上支持 **10+ 平台**，包含 H5、微信/支付宝/百度/字节小程序、App 等。
:::

### 🧩 完整的组件系统

框架内置 **33 个精心打造的跨端业务组件**，覆盖布局、数据展示、表单、反馈、媒体等五大分类：

::: details 🏗️ 布局组件（4个）

- **C_Layout** - 全局页面布局容器，集成 Header + Tabbar + SafeArea
- **C_Header** - 沉浸式导航头部，支持玻璃拟态效果、安全区适配
- **C_Tabbar** - 底部标签栏，双模式（glass 玻璃拟态 / flat 扁平）
- **C_TabNav** - 页内标签导航，支持滑动切换和动态增删

:::

::: details 📊 数据展示组件（13个）

- **C_Card** - 通用卡片容器，支持标题、副标题、阴影等级
- **C_Tag** - 标签组件，支持多种类型和自定义颜色
- **C_Badge** - 徽标数组件，支持红点、数字、文字三种模式
- **C_Title** - 语义化标题，支持多种级别和样式
- **C_List** - 列表组件，支持上拉加载更多
- **C_Empty** - 空状态展示，支持自定义图标和描述
- **C_Skeleton** - 骨架屏占位，支持多种预设布局
- **C_Steps** - 步骤条，支持水平/垂直布局
- **C_Progress** - 进度条，支持线形和环形
- **C_Timeline** - 时间轴，适合展示历史记录
- **C_Rate** - 评分组件，支持半星和自定义图标
- **C_IndexList** - 索引列表，适合通讯录类场景
- **C_CountDown** - 倒计时，支持毫秒级精度

:::

::: details 📝 表单组件（5个）

- **C_Form** - 表单容器，内置校验引擎
- **C_Search** - 搜索框，带防抖和清除功能
- **C_Cascader** - 级联选择，支持省市区三级
- **C_Calendar** - 日历选择器，支持单选/范围选择
- **C_NumberKeyboard** - 数字键盘，适合密码/金额输入

:::

::: details 💬 反馈组件（5个）

- **C_ActionSheet** - 动作面板，支持多选项和描述
- **C_Modal** - 弹窗，支持自定义内容和按钮
- **C_SwipeAction** - 滑动操作，展示隐藏的功能按钮
- **C_FloatButton** - 浮动按钮，支持展开收起
- **C_Notify** - 消息通知条，支持顶部/底部展示

:::

::: details 🖼️ 媒体 & 通用组件（6个）

- **C_Upload** - 文件上传，带预览和进度
- **C_ImagePreview** - 图片预览，支持缩放和滑动
- **C_Signature** - 电子签名，Canvas 绘制
- **C_Watermark** - 水印，支持文字和图片水印
- **C_Icon** - 通用图标，支持 UnoCSS / wot / SVG / 图片
- **C_Divider** - 分割线，支持文字和自定义样式

:::

### 🏛️ 企业级工程体系

```
📌 代码规范
├── ESLint + OxLint 双引擎代码检查
├── Prettier 格式化
├── Commitlint + Commitizen 提交规范
└── Husky + lint-staged 提交前自动校验

📌 开发体验
├── TypeScript 5.7 全量类型覆盖
├── Vite 5 + HMR 极速热更新
├── UnoCSS 原子化 CSS
├── Auto Import 自动导入（Composables / Store）
└── easycom 组件自动注册

📌 核心能力
├── Pinia + pinia-plugin-persistedstate 状态持久化
├── vue-i18n 11 国际化支持
├── HTTP 封装（去重 + 重试 + 取消 + 拦截）
├── WebSocket 封装（心跳 + 自动重连 + 消息队列）
└── 权限系统（RBAC 角色 + 细粒度权限指令）
```

## 🔧 技术栈总览

| 技术               | 版本   | 职责                |
| ------------------ | ------ | ------------------- |
| **UniApp**         | 3.0.0  | 跨端核心框架        |
| **Vue 3**          | 3.5.30 | 响应式 + 组合式 API |
| **TypeScript**     | 5.7.3  | 类型安全            |
| **Vite**           | 5.x    | 构建工具            |
| **Pinia**          | 2.3.1  | 状态管理            |
| **UnoCSS**         | 66.x   | 原子化 CSS          |
| **wot-design-uni** | 1.14.0 | 基础 UI 组件库      |
| **vue-i18n**       | 11.3.0 | 国际化              |
| **Sass**           | latest | CSS 预处理          |

## 🗂️ 文档导航

<div class="requirements-grid">
  <div class="req-card recommended">
    <div class="req-icon">🚀</div>
    <div class="req-title">快速上手</div>
    <div class="req-desc">5 分钟内启动项目</div>
    <a href="/uniapp/guide/get-started" class="req-badge">立即开始</a>
  </div>
  
  <div class="req-card">
    <div class="req-icon">🏗️</div>
    <div class="req-title">项目结构</div>
    <div class="req-desc">了解目录组织方式</div>
    <a href="/uniapp/guide/project-structure" class="req-badge">查看</a>
  </div>
  
  <div class="req-card">
    <div class="req-icon">🧩</div>
    <div class="req-title">组件文档</div>
    <div class="req-desc">33 个组件完整 API</div>
    <a href="/uniapp/components/preface" class="req-badge">查看</a>
  </div>
  
  <div class="req-card">
    <div class="req-icon">📱</div>
    <div class="req-title">多端适配</div>
    <div class="req-desc">H5 / 小程序 / App</div>
    <a href="/uniapp/guide/multi-platform" class="req-badge">查看</a>
  </div>
</div>

## 🔗 相关资源

- **GitHub**: [Robot_uniApp](https://github.com/ChenyCHENYU/Robot_uniApp)
- **Robot Admin**: 配套企业级后台管理系统 → [查看文档](/robot/guide/overview)
- **wot-design-uni**: 基础 UI 组件库 → [官方文档](https://wot-design-uni.cn)
- **UniApp 官方**: 跨端框架 → [官方文档](https://uniapp.dcloud.net.cn)
