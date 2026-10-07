---
outline: "deep"
description: "🪟 弹窗表单组件，C_Form 的模态框形态，新增/编辑共用一套配置，随表单引擎同步演进"
---

# C_FormModal 弹窗表单

> 🪟 模态框形态的动态表单，新增与编辑共用一套 `options` 配置，配合 `C_Form` 引擎的联动与校验能力

## ✨ 特性

- **♻️ 新增/编辑复用**: 同一 `options` 驱动，编辑态自动回填
- **🧩 继承表单引擎**: 支持全部 `FormOption` / `FormConfig` 能力（布局、联动、校验）
- **🎛 交互可调**: 宽度、按钮文案、ESC / 遮罩关闭行为均可配置
- **📨 事件完备**: `submit`（含保存结果）与 `close` 事件

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
  <C_FormModal
    ref="modalRef"
    :editor="editor"
    :options="options"
    width="600px"
    @submit="onSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'

const modalRef = ref()

// 新增：空记录打开
const openCreate = () => modalRef.value.openCreate()

// 编辑：传入记录自动回填
const openEdit = (record) => modalRef.value.openEdit(record)

const editor = { primaryKey: 'id' }
const options = [
  { field: 'name', label: '名称', type: 'input', rules: { required: true } },
  { field: 'status', label: '状态', type: 'select', options: [] },
]
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `editor` | `FormModalEditor<T>` | — | 编辑器配置（主键等，必填） |
| `options` | `FormOption<T>[]` | — | 表单字段配置（必填） |
| `config` | `FormConfig<T>` | — | 表单布局等全局配置 |
| `width` | `number \| string` | — | 弹窗宽度 |
| `create-text` | `string` | — | 新增按钮文案 |
| `save-text` | `string` | — | 保存按钮文案 |
| `cancel-text` | `string` | — | 取消按钮文案 |
| `closable` | `boolean` | — | 右上角关闭按钮 |
| `mask-closable` | `boolean` | — | 点击遮罩关闭 |
| `close-on-esc` | `boolean` | — | ESC 关闭 |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `submit` | `(payload, saved)` | 提交，`saved` 标识是否已持久化 |
| `close` | — | 弹窗关闭 |

完整类型定义请查看包内 `C_FormModal/types.ts`。
