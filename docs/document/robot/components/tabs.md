---
outline: "deep"
description: "🗂 标签页组件，Naive UI Tabs 的业务封装，支持卡片/胶囊类型、多位置布局与切换拦截"
---

# C_Tabs 标签页

> 🗂 基于 Naive UI Tabs 的标签页组件，支持多种类型与位置布局，可拦截切换用于脏检查等场景

## ✨ 特性

- **🎛 多种形态**: `bar` / `line` / `card` / `segment` / `text` 类型，`small` / `medium` / `large` 尺寸
- **📐 位置布局**: `top` / `bottom` / `left` / `right`，支持标签栏对齐模式
- **🛡 切换拦截**: `beforeChange` 钩子可同步或异步拦截（如未保存提醒）
- **✏️ 可交互标签**: 支持 `closable` 关闭与 `addable` 新增
- **⚡ 渲染策略**: `displayDirective` 控制面板保留模式（`if` / `show` / `show:lazy`）

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
  <C_Tabs v-model="active" type="card" :items="items" />
</template>

<script setup>
import { ref } from 'vue'

const active = ref('a')
const items = [
  { name: 'a', tab: '概览' },
  { name: 'b', tab: '设置' },
]
</script>
```

### 切换拦截

```vue
<template>
  <C_Tabs :items="items" :before-change="onBeforeChange" />
</template>

<script setup>
// 返回 false 或 reject 即阻止切换，适合脏检查场景
const onBeforeChange = async (target, current) => {
  return await confirmDiscardChanges()
}
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `string \| number \| null` | — | 当前激活标签 |
| `items` | `TabsItem[]` | — | 标签数据 |
| `type` | `'bar' \| 'line' \| 'card' \| 'segment' \| 'text'` | — | 标签类型 |
| `size` | `'small' \| 'medium' \| 'large'` | — | 尺寸 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | — | 标签栏位置 |
| `justify-content` | `string` | — | 标签栏对齐方式 |
| `animated` | `boolean` | — | 切换动画 |
| `closable` | `boolean` | — | 显示关闭按钮 |
| `addable` | `boolean` | — | 显示新增按钮 |
| `tabs-only` | `boolean` | — | 仅渲染标签栏不渲染面板 |
| `display-directive` | `'if' \| 'show' \| 'show:lazy'` | — | 面板渲染策略 |
| `pane-class` / `pane-style` | `string \| CSSProperties` | — | 面板样式 |
| `before-change` | `(target, current) => boolean \| Promise<boolean>` | — | 切换前拦截 |

完整类型定义请查看包内 `C_Tabs/types.ts`。
