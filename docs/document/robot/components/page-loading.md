---
outline: "deep"
description: "🖥 页面级加载遮罩，路由切换时延迟显示（默认 160ms），快速完成不闪烁"
---

# C_PageLoading 页面加载遮罩

> 🖥 页面级加载遮罩，适用于路由切换过渡；延迟显示策略保证快速加载时零闪烁

## ✨ 特性

- **⏱ 延迟显示**: 默认 160ms 后才出现遮罩 — 页面加载快于该阈值则完全无感
- **🎛 由路由驱动**: `show` 由接入项目的路由生命周期控制
- **📋 信息可配**: 支持加载文案与目标页面说明

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
  <C_PageLoading :show="loading" label="页面加载中" description="控制台" />
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(false)
const route = useRoute()
// 由路由守卫控制显隐
// router.beforeEach(() => (loading.value = true))
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `show` | `boolean` | — | 是否显示（必填，由路由生命周期控制） |
| `label` | `string` | 组件库默认文案 | 加载主文案 |
| `description` | `string` | — | 附加说明（如目标页面名） |
| `color` | `string` | 主题主色 | 加载图形颜色 |

### Options

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `delay` | `number` | `160` | 延迟显示毫秒数，加载快于该值不出现遮罩 |

完整类型定义请查看包内 `C_PageLoading/types.ts`。
