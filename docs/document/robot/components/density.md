---
outline: "deep"
description: "📐 区域密度组件，为子树内的表单/表格统一设置 default/compact/comfortable 密度档位，无额外 DOM"
---

# C_Density 区域密度

> 📐 为页面区域内的表单与表格统一设置密度档位，无额外 DOM、无全局样式

## ✨ 特性

- **🎚 三档密度**: `default` / `compact` / `comfortable`，只覆盖子树的默认值
- **🪶 零成本包裹**: 纯 Provider 组件，渲染时只保留插槽内容，无额外 DOM
- **🧠 优先级不变**: 单组件显式 `size` / 单字段配置的优先级保持不变；应用启动时声明的持久化范围保持实时转发，区域密度不会冻结当前账号设置
- **🧩 覆盖范围**: 同时作用于表单（C_Form 系列）与表格（C_Table）全局默认配置

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
  <!-- 弹窗 / 抽屉等空间受限区域使用紧凑密度 -->
  <C_Density density="compact">
    <C_FormSearch :model="query" @search="onSearch" />
    <C_Table :columns="columns" :data="rows" />
  </C_Density>
</template>

<script setup>
const query = {}
const columns = []
const rows = []
</script>
```

单个组件仍可显式覆盖：

```vue
<C_Density density="compact">
  <C_Table size="large" />  <!-- 显式 size 优先于区域密度 -->
</C_Density>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `density` | `'default' \| 'compact' \| 'comfortable'` | — | 必填；子树默认密度档位 |

组件无事件与插槽参数，仅渲染默认插槽。
