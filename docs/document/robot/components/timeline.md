---
outline: "deep"
description: "📅 垂直/水平多布局时间线，支持交替排列、加载更多与自定义连线样式"
---

# C_Timeline 时间线组件

> 📅 垂直/水平多布局时间线，支持交替排列、加载更多与自定义连线样式

## 🚀 在线演示

<DemoIframe src="/preview/timeline" title="时间线" height="600" />

## ✨ 特性

- **📐 双向布局**: `vertical` 垂直 / `horizontal` 水平
- **🔀 三种标签位置**: 左侧 / 右侧 / 交替（alternate）
- **⏳ 加载更多**: 内置 pending 尾部指示与自定义文案
- **🎛️ 细节可调**: 节点大小、连线样式（实线/虚线/点线）、反转排列

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @robot-admin/naive-ui-components
```

```bash [pnpm]
pnpm add @robot-admin/naive-ui-components
```

```bash [npm]
npm install @robot-admin/naive-ui-components
```

:::

## 🎯 基础用法

```vue
<template>
  <C_Timeline :items="items" mode="vertical" label-placement="alternate" show-time />
</template>

<script setup>
const items = [
  { title: '需求评审', time: '2025-10-01', type: 'success' },
  { title: '开发中', time: '2025-10-05', type: 'info' },
  { title: '待发布', time: '2025-10-10' },
]
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `TimelineItem[]` | — | 时间线数据（必填） |
| `mode` | `'vertical' \| 'horizontal'` | `'vertical'` | 布局方向 |
| `label-placement` | `'left' \| 'right' \| 'alternate'` | `'right'` | 垂直模式下时间标签位置 |
| `pending` | `boolean` | `false` | 是否显示尾部加载更多指示 |
| `pending-text` | `string` | `'加载中...'` | 加载更多文案 |
| `reverse` | `boolean` | `false` | 是否反转排列（最新在前） |
| `size` | `'small' \| 'medium' \| 'large'` | — | 节点大小 |
| `line-type` | `'solid' \| 'dashed' \| 'dotted'` | — | 连接线样式 |
| `show-time` | `boolean` | — | 是否显示时间标签 |

完整的类型定义请查看包内 `C_Timeline/types.ts`。
