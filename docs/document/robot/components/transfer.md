---
outline: "deep"
description: "🔀 双列表穿梭框，支持跨列表数据迁移、搜索筛选与全选"
---

# C_Transfer 穿梭框组件

> 🔀 双列表穿梭框，支持跨列表数据迁移、搜索筛选与全选

## 🚀 在线演示

<DemoIframe src="/preview/transfer" title="穿梭框" height="600" />

## ✨ 特性

- **🔁 双向迁移**: `v-model` 驱动右侧已选列表
- **🔍 搜索筛选**: 内置过滤与自定义筛选函数
- **☑️ 全选控制**: 可配置是否显示全选复选框
- **💬 空状态**: 左右栏空状态文案可分别自定义

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
  <C_Transfer v-model="selected" :data="data" filterable :titles="['可选', '已选']" />
</template>

<script setup>
import { ref } from 'vue'

const selected = ref([])
const data = [
  { key: 1, label: '组件库' },
  { key: 2, label: '脚手架' },
  { key: 3, label: '文档站' },
]
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `TransferItem[]` | — | 数据源（必填） |
| `v-model` | `Array<string \| number>` | — | 右侧已选 key 列表（必填） |
| `titles` | `[string, string]` | `['可选列表', '已选列表']` | 左右栏标题 |
| `filterable` | `boolean` | `false` | 是否可搜索 |
| `filter-placeholder` | `string` | — | 搜索占位符 |
| `filter-method` | `(query, item) => boolean` | — | 自定义筛选函数 |
| `show-select-all` | `boolean` | — | 是否显示全选复选框 |
| `source-empty-text` | `string` | — | 左侧空状态描述 |
| `target-empty-text` | `string` | — | 右侧空状态描述 |
| `size` | `'small' \| 'medium' \| 'large'` | — | 尺寸 |

完整的类型定义请查看包内 `C_Transfer/types.ts`。
