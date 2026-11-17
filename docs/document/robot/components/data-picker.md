---
outline: "deep"
description: "🗃️ 数据选择器，弹窗/内联/气泡三种形态的分页表格选数组件，支持组织导航、历史记录、固定筛选与批量选择上限"
---

# C_DataPicker 数据选择器

> 🗃️ 从分页表格中挑选业务记录的选择器：接口与实体映射注册一次，弹窗 / 内联 / 气泡三种形态

## ✨ 特性

- **🗂 三种形态**: `presentation` 支持 `modal`（弹窗）/ `inline`（内联）/ `popover`（气泡 + 快速搜索）
- **🔌 来源显式映射**: `source` 声明 `rowKey` / `value` / `label` / `request` / `resolve`，组件不探测后端返回结构
- **🧭 组织导航**: `navigation` 用树形节点过滤候选范围，不把组织勾选转换为整组选择
- **🕘 历史记录**: `history` 需要 `source.resolve`，仅持久化值与标签，按业务 `scope` 隔离
- **🛡 选择约束**: `maxSelection` 上限、`rowCheckable` 行可勾、`disabledReason` 可用性提示、`requireSelection` 阻止空确认
- **🔄 会话管理**: 业务身份（`scope`）变化取消请求、回显和未确认选择；`fixedFilters` 变化使进行中的工作失效

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
  <C_DataPicker
    v-model="materialId"
    :source="materialSource"
    :columns="columns"
    title="选择物料"
  />
</template>

<script setup>
import { ref } from 'vue'

const materialId = ref(null)

// 接口、鉴权与实体映射只在应用中注册一次
const materialSource = {
  rowKey: 'id',
  label: (row) => row.name,
  request: async ({ page, pageSize, keyword }) =>
    materialApi.page({ page, pageSize, keyword }),
}

const columns = [
  { field: 'code', headerName: '物料编码' },
  { field: 'name', headerName: '物料名称' },
  { field: 'unit', headerName: '单位' },
]
</script>
```

### 多选与固定筛选

```vue
<template>
  <C_DataPicker
    v-model="ids"
    :source="materialSource"
    :columns="columns"
    multiple
    :max-selection="5"
    :fixed-filters="{ factory: currentFactory }"
  />
</template>

<script setup>
import { ref } from 'vue'

const ids = ref([])
const currentFactory = ref('F01')
</script>
```

## 📋 API

### Props（节选）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `source` | `DataPickerSourceInput` | — | 必填；行键、标签、请求与回显映射 |
| `columns` | `TableColumn[]` | — | 候选表格列（复用 C_Table 列契约） |
| `v-model` | `DataPickerValue \| DataPickerValue[] \| null` | — | 选中值 |
| `multiple` | `boolean` | — | 多选 |
| `presentation` | `'modal' \| 'inline' \| 'popover'` | — | 呈现形态 |
| `navigation` | `DataPickerNavigation` | — | 组织导航（树节点 + 过滤字段） |
| `history` | `DataPickerHistoryOptions` | — | 历史记录（storageKey / scope / maxItems / favorites） |
| `initial-values` | `TFilters` | — | 每次会话的起始筛选 |
| `fixed-filters` | `TFilters` | — | 最后应用的固定筛选，变化使会话失效 |
| `max-selection` | `number` | — | 选择数量上限 |
| `row-checkable` | `(row) => boolean` | — | 行可勾选判定 |
| `disabled-reason` | `(row) => string \| undefined` | — | 返回非空原因即不可选 |
| `require-selection` | `boolean` | — | 阻止空选择确认 |
| `scope` | `string \| number` | — | 业务身份，变化取消请求与草稿 |
| `density` | `'default' \| 'compact' \| 'comfortable'` | — | 密度 |

### Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `value` | 选中值变化 |
| `select` | `rows: T[]` | 确认时已解析的行（未解析的值保留在 modelValue） |
| `cancel` | — | 取消 |

### Expose

`open()` / `close()` / `reset()`（丢弃候选、回显与草稿）/ `confirm(): Promise<boolean>`

完整类型定义请查看包内 `C_DataPicker/types.ts`。
