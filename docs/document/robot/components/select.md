---
outline: "deep"
description: "☑️ 选择器组件，静态选项、原生分组、远程数据源、多选与标签创建，值类型覆盖 string/number/boolean"
---

# C_Select 选择器

> ☑️ 业务增强的下拉选择组件，支持静态/远程数据源、多选、创建标签与原生分组

## ✨ 特性

- **🔌 双数据源**: `options` 静态选项（支持 `type: 'group'` 分组，组本身没有可提交的业务值），或 `source` 远程数据源
- **👥 多选与标签**: `multiple` 多选 + `maxTagCount` 折叠；`tag` 允许输入列表外的字符串（配合 `filterable`）
- **🧭 远程模式**: 无 source 时可用 `remote` 保留原生外部托管过滤
- **⚡ 虚拟滚动**: 长选项列表启用 `virtualScroll`
- **📐 密度**: 三档区域密度，值类型覆盖 `string` / `number` / `boolean`

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
  <C_Select v-model="status" :options="options" clearable placeholder="选择状态" />
</template>

<script setup>
import { ref } from 'vue'

const status = ref(null)
const options = [
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
]
</script>
```

### 分组与多选

```vue
<template>
  <C_Select v-model="cities" :options="groupedOptions" multiple :max-tag-count="2" />
</template>

<script setup>
import { ref } from 'vue'

const cities = ref([])
const groupedOptions = [
  {
    type: 'group',
    label: '一线城市',
    children: [
      { label: '北京', value: '010' },
      { label: '上海', value: '021' },
    ],
  },
]
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `V \| V[] \| null` | — | 选中值（`V` 为 `string \| number \| boolean`） |
| `options` | `SelectOptionNode[]` | — | 选项或分组节点 |
| `source` | `OptionSource` | — | 远程数据源 |
| `multiple` | `boolean` | — | 多选 |
| `filterable` | `boolean` | — | 可过滤 |
| `remote` | `boolean` | — | 无 source 时保留原生外部托管过滤 |
| `tag` | `boolean` | — | 允许输入列表外的字符串 |
| `max-tag-count` | `number \| 'responsive'` | — | 多选标签折叠 |
| `virtual-scroll` | `boolean` | — | 虚拟滚动 |
| `fallback-option` | `boolean \| Function` | — | 值无对应选项时的回显 |
| `clearable` / `loading` | `boolean` | — | 清除 / 加载 |
| `size` / `status` | — | — | 尺寸 / 校验状态 |
| `density` | `'default' \| 'compact' \| 'comfortable'` | — | 密度 |
| `disabled` / `readonly` | `boolean` | — | 禁用 / 只读 |

完整类型定义请查看包内 `C_Select/types.ts`。
