---
outline: "deep"
---

# Robot uniApp 快速上手

<div class="hero-banner">
  <h2>🚀 几分钟内启动您的跨平台移动应用</h2>
  <p>基于 UniApp + Vue 3，享受一码多端的极致开发体验</p>
</div>

## 📋 环境准备

在开始之前，请确保已安装以下工具：

<div class="requirements-grid">
  <div class="req-card">
    <div class="req-icon">🔧</div>
    <div class="req-title">Git</div>
    <div class="req-desc">版本控制工具</div>
  </div>
  
  <div class="req-card recommended">
    <div class="req-icon">📦</div>
    <div class="req-title">Node.js</div>
    <div class="req-desc">v18+ 运行时环境</div>
    <div class="req-badge">必须</div>
  </div>
  
  <div class="req-card">
    <div class="req-icon">🚀</div>
    <div class="req-title">pnpm</div>
    <div class="req-desc">推荐包管理器</div>
  </div>
</div>

::: tip 💡 H5 开发提示
H5 端开发仅需 Node.js + 编辑器即可。如需开发**微信小程序**，还需安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)；如需打包 **App**，需安装 HBuilderX。
:::

## 📦 快速安装

::: code-group

```bash [使用 pnpm（推荐）]
# 1. 克隆仓库
git clone https://github.com/ChenyCHENYU/Robot_uniApp.git

# 2. 进入项目目录
cd Robot_uniApp

# 3. 安装依赖
pnpm install

# 4. 启动 H5 开发服务器
pnpm dev
```

```bash [使用 npm]
# 1. 克隆仓库
git clone https://github.com/ChenyCHENYU/Robot_uniApp.git

# 2. 进入项目目录
cd Robot_uniApp

# 3. 安装依赖
npm install

# 4. 启动 H5 开发服务器
npm run dev
```

:::

<div class="success-tip">
  <div class="tip-icon">🎉</div>
  <div class="tip-content">
    <div class="tip-title">启动成功！</div>
    <div class="tip-desc">开发服务器将在 <code>http://localhost:1999</code> 上运行</div>
    <div class="tip-highlight">H5 模式下浏览器将以移动端模拟器样式呈现（居中 480px）</div>
  </div>
</div>

## ⚙️ 开发命令

### H5 端

```bash
pnpm dev          # 开发环境（H5）
pnpm build        # 生产构建（H5）
pnpm test         # 测试环境（H5）
pnpm staging      # 预发布环境（H5）
```

### 微信小程序端

```bash
pnpm dev:wx       # 开发环境（微信小程序）
pnpm build:wx     # 生产构建（微信小程序）
```

### App 端

```bash
pnpm dev:app      # 开发环境（App）
pnpm build:app    # 生产构建（App）
pnpm build:app-android  # 打包 Android
pnpm build:app-ios      # 打包 iOS
```

### 代码质量

```bash
pnpm lint         # ESLint + OxLint 检查并修复
pnpm format       # Prettier 格式化 src/
pnpm cz           # 交互式 Commitizen 提交
```

## 🗂️ 项目目录速览

```
Robot_uniApp/
├── src/
│   ├── pages/          # 页面（对应路由）
│   ├── components/     # 组件
│   │   └── global/     # 33 个全局组件（easycom 自动注册）
│   ├── composables/    # 组合式函数
│   ├── stores/         # Pinia 状态管理
│   ├── api/            # API 接口
│   ├── utils/          # 工具函数
│   ├── styles/         # 全局样式
│   ├── types/          # TypeScript 类型
│   ├── constants/      # 常量定义
│   └── directives/     # 自定义指令
├── mock/               # Mock 数据
├── env/                # 环境变量
├── vite.config.js      # Vite 配置
├── uno.config.js       # UnoCSS 配置
└── package.json
```

## 🚦 第一个页面

### 新建页面文件

```
src/pages/my-page/index.vue
```

```vue
<template>
  <C_Layout :show-tabbar="false">
    <view class="p-4">
      <C_Title text="我的第一个页面" />
      <C_Card title="Hello Robot uniApp" padding>
        <text>🎉 一码多端，开发超爽！</text>
      </C_Card>
    </view>
  </C_Layout>
</template>

<script setup lang="ts">
// 组件通过 easycom 自动注册，无需手动导入
</script>
```

### 注册页面路由

在 `src/pages.json` 中添加：

```json
{
  "pages": [
    {
      "path": "pages/my-page/index",
      "style": {
        "navigationBarTitleText": "我的页面",
        "navigationStyle": "custom"
      }
    }
  ]
}
```

::: tip easycom 自动注册
项目已配置 `easycom`，`C_*` 前缀的组件会**自动注册**，无需手动 `import`：

```json
"easycom": {
  "custom": {
    "^C_(.*)": "@/components/global/C_$1/index.vue"
  }
}
```

:::

## 🔐 登录与认证

项目内置完整的认证流程，默认使用 Mock 数据：

```ts
// 使用 User Store
import { useUserStore } from "@/stores";

const userStore = useUserStore();

// 登录
await userStore.login({ username: "admin", password: "123456" });

// 检查登录状态
console.log(userStore.isLoggedIn); // true

// 获取用户信息
console.log(userStore.nickname); // 'admin'
```

## 🎨 快速样式

得益于 UnoCSS，样式开发极为高效：

```vue
<template>
  <!-- flex 布局居中 -->
  <view class="flex-center h-full">
    <!-- 文字颜色、大小、字重 -->
    <text class="text-primary text-lg font-bold">欢迎使用</text>
  </view>
</template>
```

预置快捷方式：

- `flex-center` → `flex justify-center items-center`
- `flex-between` → `flex justify-between items-center`
- `pt-safe` → `padding-top: env(safe-area-inset-top)`
- `pb-safe` → `padding-bottom: env(safe-area-inset-bottom)`

## 📱 多端预览

| 平台           | 命令           | 预览方式                                |
| -------------- | -------------- | --------------------------------------- |
| **H5**         | `pnpm dev`     | 浏览器访问 `localhost:1999`             |
| **微信小程序** | `pnpm dev:wx`  | 微信开发者工具导入 `dist/dev/mp-weixin` |
| **App**        | `pnpm dev:app` | HBuilderX 真机调试                      |

## 🔗 下一步

- [项目结构详解](/uniapp/guide/project-structure) — 深入了解目录组织
- [应用架构](/uniapp/guide/architecture) — 理解核心架构设计
- [组件文档](/uniapp/components/preface) — 查看 33 个组件的完整 API
- [多端适配](/uniapp/guide/multi-platform) — 了解跨端开发技巧
