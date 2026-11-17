---
outline: "deep"
description: "⚠️ 校验错误汇总组件，分页聚合展示校验问题清单，可点击定位到目标字段"
---

# C_ErrorSummary 错误汇总

> ⚠️ 表单 / 表格校验失败时的问题聚合面板：分页清单 + 定位目标

## ✨ 特性

- **📌 问题清单**: 接收 `ValidationIssue[]`（`key` / `source` / `message` / `target`），统一展示校验问题
- **📄 分页挂载**: `limit` 控制每页挂载的问题数（默认 8、最大 100），大批失败不创建大量 DOM
- **🎯 定位目标**: `target` 携带校验目标地址，配合滚动/聚焦实现"点击定位"

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
  <C_ErrorSummary :issues="issues" title="以下 3 项需要修正" />
</template>

<script setup>
import { ref } from 'vue'

const issues = ref([
  { key: 'name#1', source: '姓名', message: '必填', target: { field: 'name' } },
  { key: 'email#2', source: '邮箱', message: '格式不正确', target: { field: 'email' } },
  { key: 'qty#3', source: '数量', message: '必须大于 0', target: { row: 3, field: 'qty' } },
])
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `issues` | `ValidationIssue[]` | — | 校验问题清单 |
| `title` | `string` | — | 标题（如"以下 3 项需要修正"） |
| `limit` | `number` | `8` | 每页挂载的问题数，最大 100 |
| `locale` | `ComponentLocale` | — | 文案 |

完整类型定义请查看包内 `C_ErrorSummary/types.ts`。
