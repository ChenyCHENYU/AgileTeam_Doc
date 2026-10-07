---
outline: "deep"
description: "👥 叠加式头像组，支持溢出 +N、状态点、悬浮提示与堆叠方向"
---

# C_AvatarGroup 头像组组件

> 👥 叠加式头像组，支持溢出 +N、状态点、悬浮提示与堆叠方向

## 🚀 在线演示

<DemoIframe src="/preview/avatar-group" title="头像组" height="500" />

## ✨ 特性

- **📊 溢出计数**: 超出 `max` 数量自动折叠为 +N
- **🟢 状态指示**: 每个头像可带在线状态点
- **💬 悬浮提示**: 内置 tooltip 展示姓名
- **↔️ 堆叠控制**: 重叠偏移、方向（ltr/rtl）、圆形/方形

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
  <C_AvatarGroup :items="items" :max="5" :size="40" show-status show-tooltip />
</template>

<script setup>
const items = [
  { id: 1, name: 'CHENY', avatar: '/cheny.png', status: 'online' },
  { id: 2, name: '何乾', avatar: '/heqian.png' },
  { id: 3, name: '孔慧', avatar: '/konghui.png', status: 'busy' },
]
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `AvatarItem[]` | — | 头像数据列表（必填） |
| `max` | `number` | `5` | 最多显示数量（超出 +N） |
| `size` | `number` | `40` | 头像尺寸 (px) |
| `overlap` | `number` | — | 头像间重叠偏移量 (px)，负值表示堆叠 |
| `shape` | `'circle' \| 'square'` | — | 形状 |
| `show-status` | `boolean` | — | 是否显示状态指示点 |
| `show-tooltip` | `boolean` | — | 是否显示悬浮提示 |
| `clickable` | `boolean` | — | 是否可点击 |
| `overflow-clickable` | `boolean` | — | +N 溢出按钮是否可点击 |
| `direction` | `'ltr' \| 'rtl'` | — | 堆叠方向 |

完整的类型定义请查看包内 `C_AvatarGroup/types.ts`。
