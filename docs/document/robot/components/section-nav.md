---
outline: "deep"
description: "🧭 锚点导航组件，长表单分区导航，支持错误计数角标与禁用态"
---

# C_SectionNav 锚点导航

> 🧭 长表单 / 分区设置的锚点导航：当前分区高亮 + 错误计数角标

## ✨ 特性

- **📑 分区导航**: `items` 声明分区（`key` / `label`），配合 `v-model` 双向绑定当前分区
- **🔔 错误计数**: 每个分区可携带 `errorCount` 角标，配合 C_ErrorSummary 呈现校验分布
- **🚫 禁用态**: 单个分区可 `disabled`，支持 `ariaLabel` 无障碍标注

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
  <div class="page">
    <C_SectionNav v-model="active" :items="sections" class="page__nav" />

    <section v-show="active === 'basic'">基础信息表单…</section>
    <section v-show="active === 'contact'">联系方式表单…</section>
    <section v-show="active === 'extra'">附加信息表单…</section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref('basic')
const sections = [
  { key: 'basic', label: '基础信息' },
  { key: 'contact', label: '联系方式', errorCount: 2 },
  { key: 'extra', label: '附加信息', disabled: true },
]
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `SectionNavItem[]` | — | 分区清单：`key` / `label` / `errorCount` / `disabled` |
| `v-model` | `string` | — | 当前激活分区 |
| `aria-label` | `string` | — | 无障碍标注 |
| `locale` | `ComponentLocale` | — | 文案 |

完整类型定义请查看包内 `C_SectionNav/types.ts`。
