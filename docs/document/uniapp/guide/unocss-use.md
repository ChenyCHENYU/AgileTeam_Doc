---
outline: "deep"
---

# UnoCSS 使用

> 🎨 Robot uniApp 集成了 UnoCSS 原子化 CSS 方案，配合 `@uni-helper/unocss-preset-uni` 兼容 UniApp 多端环境。

## 🔧 配置文件

```ts
// uno.config.js
import {
  defineConfig,
  presetWind3,
  presetAttributify,
  presetIcons,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),          // Wind3 预设（Tailwind CSS 兼容）
    presetAttributify(),    // 属性化模式
    presetIcons({           // 图标预设（支持 mdi / fluent-color 等）
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(), // 支持在 CSS 中使用 @apply
  ],
  safelist: [
    // Tabbar 多色图标不能被摇树，需要加入安全列表
    'i-fluent-color-home-28',
    'i-fluent-color-chat-28',
    'i-fluent-color-apps-28',
    'i-fluent-color-person-28',
  ],
  rules: [
    ['pt-safe', { 'padding-top':    'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
  shortcuts: {
    'flex-center':  'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
  },
})
```

## 📦 在入口中引入

```ts
// main.ts
import 'virtual:uno.css'
```

## ✨ 常用工具类

### 布局

```html
<!-- Flexbox -->
<view class="flex items-center justify-between gap-2">
<view class="flex-center">          <!-- 水平垂直居中 -->
<view class="flex-between">         <!-- 两端对齐 -->
<view class="flex-col items-start"> <!-- 垂直排列 -->

<!-- Grid -->
<view class="grid grid-cols-2 gap-4">
<view class="grid grid-cols-3 gap-2">
```

### 间距

```html
<!-- padding / margin（基于 4px 基准） -->
<view class="p-4">     <!-- padding: 16px -->
<view class="px-3 py-2">  <!-- px: 12px, py: 8px -->
<view class="mt-4 mb-2">  <!-- margin-top: 16px, margin-bottom: 8px -->
<view class="pt-safe">    <!-- padding-top: 安全区域 -->
<view class="pb-safe">    <!-- padding-bottom: 安全区域 -->
```

### 尺寸

```html
<view class="w-full h-full">   <!-- 100% -->
<view class="w-10 h-10">       <!-- 40px -->
<view class="min-h-screen">    <!-- min-height: 100vh -->
<view class="max-w-sm">        <!-- max-width: 384px -->
```

### 文字

```html
<text class="text-sm">      <!-- 14px -->
<text class="text-base">    <!-- 16px -->
<text class="text-lg">      <!-- 18px -->
<text class="text-xl">      <!-- 20px -->
<text class="font-bold">
<text class="text-gray-500">
<text class="text-primary">  <!-- 主题色，需配合 CSS 变量 -->
<text class="truncate">      <!-- 溢出省略 -->
```

### 背景 & 圆角 & 阴影

```html
<view class="bg-white rounded-xl shadow">
<view class="bg-gray-50 rounded-lg">
<view class="rounded-full overflow-hidden">  <!-- 圆形 -->
```

## 🖱️ 属性化模式

`presetAttributify` 允许将样式类写为 HTML 属性，适合复杂组件：

```html
<!-- 传统方式 -->
<view class="flex items-center justify-between px-4 py-3 bg-white rounded-xl">

<!-- 属性化方式（更清楚区分布局属性） -->
<view
  flex items-center justify-between
  px-4 py-3
  bg-white rounded-xl
>
```

## 🎨 图标使用

UnoCSS 提供了 `presetIcons`，无需导入即可直接使用图标：

```html
<!-- mdi 图标集 -->
<view class="i-mdi-home text-xl text-blue-500" />
<view class="i-mdi-account-circle text-2xl" />

<!-- Fluent Color 多彩图标（Tabbar 使用） -->
<view class="i-fluent-color-home-28" />
<view class="i-fluent-color-chat-28" />

<!-- Solar 图标集 -->
<view class="i-solar-home-bold text-lg" />
```

::: tip 图标安全列表
动态拼接的图标类名无法被 UnoCSS 检测，需加入 `safelist`：
```ts
safelist: ['i-fluent-color-home-28', 'i-fluent-color-chat-28']
```
:::

## ⚙️ 在 SCSS 中使用 @apply

配置了 `transformerDirectives` 后，可在样式中使用 `@apply`：

```scss
// 组件的 scss
.c-card {
  @apply bg-white rounded-xl shadow-sm;

  &__title {
    @apply text-base font-bold text-gray-800;
  }

  &__body {
    @apply p-4;
  }
}
```

## 📱 多端兼容说明

由于小程序的 CSS 限制（不支持 `*` 通配、部分伪选择器），使用 UnoCSS 时需注意：

| 功能 | H5 | 微信小程序 | App |
| --- | :---: | :---: | :---: |
| 基础工具类 | ✅ | ✅ | ✅ |
| 属性化模式 | ✅ | ✅ | ✅ |
| 图标（presetIcons）| ✅ | ✅ | ✅ |
| @apply | ✅ | ✅ | ✅ |
| CSS 变量 | ✅ | ✅ | ✅ |
| 伪类 `:hover` | ✅ | ❌ | ❌ |

::: warning 小程序限制
类名中不能包含特殊字符（`!`、`(`、`)`、`[`、`]` 等）。对于 UnoCSS 动态生成的类名，优先使用 safelist 白名单方式。
:::
