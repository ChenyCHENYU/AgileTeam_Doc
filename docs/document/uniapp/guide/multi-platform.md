---
outline: "deep"
---

# 多端适配

> 📱 Robot uniApp 基于 UniApp 框架，一套代码可以同时运行在 H5、微信小程序和 App 上，但不同平台存在一些差异需要处理。

## 🌐 平台差异概览

| 能力 | H5 | 微信小程序 | App |
| --- | :---: | :---: | :---: |
| CSS 变量 | ✅ | ✅ | ✅ |
| Flex / Grid | ✅ | ✅ | ✅ |
| `:hover` 伪类 | ✅ | ❌ | ❌ |
| `position: fixed` | ✅ | ⚠️ 部分支持 | ✅ |
| `uni.request` | ✅ | ✅ | ✅ |
| `uni.login` | ❌ | ✅（微信登录）| ✅ |
| 本地存储 | localStorage | wx.setStorage | App.Storage |
| WebSocket | ✅ | ✅ | ✅ |
| 文件系统 | ❌ | 有限制 | ✅ |
| 推送通知 | ❌ | 订阅消息 | ✅ |

## 🔀 条件编译

UniApp 的**条件编译**是最常用的多端差异处理方式，通过注释标记区分平台：

### 模板中使用

```vue
<template>
  <!-- #ifdef H5 -->
  <view class="h5-only-content">仅 H5 显示</view>
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <view class="weixin-only">仅微信小程序显示</view>
  <!-- #endif -->

  <!-- #ifdef APP-PLUS -->
  <view class="app-only">仅 App 显示</view>
  <!-- #endif -->

  <!-- #ifndef MP-WEIXIN -->
  <view>除微信小程序外其他平台显示</view>
  <!-- #endif -->

  <!-- #ifdef H5 || APP-PLUS -->
  <view>H5 或 App 都显示</view>
  <!-- #endif -->
</template>
```

### JS / TS 中使用

```ts
// 平台特有的 API
// #ifdef MP-WEIXIN
wx.getSetting({
  success(res) {
    console.log('微信授权状态:', res.authSetting)
  },
})
// #endif

// #ifdef H5
window.addEventListener('resize', handleResize)
// #endif

// #ifdef APP-PLUS
plus.device.getInfo({
  success(info) {
    console.log('设备型号:', info.model)
  },
})
// #endif
```

### SCSS 中使用

```scss
.c-header {
  /* #ifdef H5 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  /* #endif */

  /* #ifdef MP-WEIXIN */
  padding-top: 0;  // 小程序导航由系统处理
  /* #endif */
}
```

## 📱 安全区域适配

针对 iPhone X 及以上机型的刘海屏和 Home Bar，项目已封装适配方案：

### CSS 方案

```scss
// 使用 UnoCSS 安全区自定义规则
.page-header {
  padding-top: env(safe-area-inset-top);
}

.page-footer {
  padding-bottom: env(safe-area-inset-bottom);
}
```

```html
<!-- 使用预置 UnoCSS 工具类 -->
<view class="pt-safe pb-safe">
```

### JS 方案（精确数值）

```ts
// 通过 AppStore 获取安全区数值
const appStore = useAppStore()

// 状态栏高度（用于自定义导航栏）
const statusBarHeight = appStore.statusBarHeight  // 如 44px

// 安全区域（useSmartLayout 在 C_Layout 中自动处理）
const safeArea = appStore.safeArea
// { top: 44, bottom: 34 }
```

### C_Header 自动适配

`C_Header` 组件已内置安全区适配：

```vue
<!-- 在组件内部 -->
<view class="c-header" :style="{ paddingTop: safeAreaTop + 'px' }">
```

## 🔑 登录差异处理

不同平台的登录方式不同，通过条件编译区分：

```vue
<!-- pages/login/index.vue -->
<template>
  <!-- 通用：账号密码登录 -->
  <view class="login-form">
    <wd-input v-model="form.username" placeholder="账号" />
    <wd-input v-model="form.password" type="password" placeholder="密码" />
    <wd-button @click="handleAccountLogin">登录</wd-button>
  </view>

  <!-- 微信一键登录（仅小程序）-->
  <!-- #ifdef MP-WEIXIN -->
  <wd-button open-type="getUserProfile" @getuserprofile="handleWxLogin">
    微信一键登录
  </wd-button>
  <!-- #endif -->
</template>
```

## 🗃️ 存储差异处理

```ts
// utils/storage.ts — 跨端存储封装
export const storage = {
  get(key: string) {
    // #ifdef H5
    try {
      return JSON.parse(localStorage.getItem(key) || 'null')
    } catch {
      return null
    }
    // #endif
    // #ifndef H5
    return uni.getStorageSync(key)
    // #endif
  },

  set(key: string, value: any) {
    // #ifdef H5
    localStorage.setItem(key, JSON.stringify(value))
    // #endif
    // #ifndef H5
    uni.setStorageSync(key, value)
    // #endif
  },

  remove(key: string) {
    // #ifdef H5
    localStorage.removeItem(key)
    // #endif
    // #ifndef H5
    uni.removeStorageSync(key)
    // #endif
  },
}
```

## 🎨 H5 桌面端模拟器模式

在桌面浏览器访问时，项目以移动端模拟器样式展示（居中 480px），完整复现手机端体验：

```scss
// styles/variables.scss
:root {
  // H5 模拟器宽度
  --mobile-max-width: 480px;
}

// #ifdef H5
.app-container {
  max-width: var(--mobile-max-width);
  margin: 0 auto;
  min-height: 100vh;
  background: var(--app-bg-color);
  position: relative;
  overflow: hidden;
}
// #endif
```

## 📊 各平台构建命令

```bash
# H5 开发/构建
pnpm dev           # 开发
pnpm build         # 生产

# 微信小程序
pnpm dev:wx        # 开发（需要微信开发者工具预览）
pnpm build:wx      # 生产（导入微信开发者工具上传）

# App
pnpm dev:app       # 开发
pnpm build:app-android   # 打包 Android APK
pnpm build:app-ios       # 打包 iOS IPA
```

## ⚠️ 常见多端问题

| 问题 | 原因 | 解决方案 |
| --- | --- | --- |
| 小程序样式不生效 | 不支持通配符 `*` | 改用具体选择器 |
| iOS 滚动不流畅 | 缺少 `-webkit-overflow-scrolling` | 添加 `overflow-y: scroll` |
| 小程序图片不显示 | 缺少 mode 属性 | 添加 `mode="aspectFill"` |
| H5 真机字体偏小 | viewport 未配置 | 确保 `manifest.json` 中有 viewport meta |
| 安全区域未适配 | 没有处理刘海屏 | 使用 `pt-safe` `pb-safe` 工具类 |
