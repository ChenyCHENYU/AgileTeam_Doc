---
outline: "deep"
description: "📋 批量操作结果组件，展示成功/失败/冲突/跳过的分页结果清单，失败行可触发定向重试"
---

# C_BatchResult 批量结果

> 📋 批量操作（批量保存 / 导入 / 提交）后的结果反馈组件：分页清单 + 定向重试

## ✨ 特性

- **📊 四种状态**: `success` / `failure` / `conflict` / `skipped`，覆盖部分成功的批量场景
- **🔀 定向重试**: 失败重试仅包含后端明确允许（`retryable`）的行，不把成功行再次提交
- **📄 分页展示**: `pageSize` 控制每页挂载的结果数，大批量结果不创建过量 DOM

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
  <C_BatchResult :results="results" title="批量保存结果" @retry="onRetry" />
</template>

<script setup>
import { ref } from 'vue'

const results = ref([
  { key: 1, status: 'success' },
  { key: 2, status: 'failure', message: '库存不足', retryable: true },
  { key: 3, status: 'conflict', message: '记录已被他人修改', retryable: true },
  { key: 4, status: 'skipped', message: '与上一行重复' },
])

const onRetry = (keys) => {
  // keys 只包含 retryable 的失败/冲突行
  return saveApi.retry(keys)
}
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `results` | `BatchOperationResult[]` | — | 结果清单：`key` / `status` / `message` / `retryable` |
| `title` | `string` | — | 标题 |
| `page-size` | `number` | — | 每页挂载的结果数 |
| `locale` | `ComponentLocale` | — | 文案 |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `retry` | `keys: (string \| number)[]` | 仅包含可重试行的键 |

完整类型定义请查看包内 `C_BatchResult/types.ts`。
