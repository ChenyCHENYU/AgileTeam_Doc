---
outline: "deep"
description: "⌨️ 自动完成组件，支持本地建议与远程数据源，输入文本不选建议也保持有效"
---

# C_AutoComplete 自动完成

> ⌨️ 带建议列表的文本输入组件，支持本地选项、远程数据源（字典/接口）与自定义建议渲染

## ✨ 特性

- **📝 文本即值**: 不选建议时输入文本依然有效；远程选择插入 `label`，本地建议插入 `value`
- **🔌 数据源**: 内置 `options` 静态选项，或通过 `source` 接入远程字典 / 接口（配合 @robot-admin/dictionary）
- **🎨 自定义渲染**: `renderLabel` 渲染建议详情而不改变插入的文本
- **🔎 本地过滤**: `filterable` 按标签过滤本地建议；固定模板可关闭，远程过滤交给 source
- **📐 密度**: 支持 `default` / `compact` / `comfortable` 三档区域密度

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
  <C_AutoComplete
    v-model="keyword"
    :options="['Engineering', 'Marketing', 'Operations']"
    placeholder="输入部门名称"
  />
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
</script>
```

### 对象选项与自定义渲染

```vue
<template>
  <C_AutoComplete
    v-model="city"
    :options="cityOptions"
    :render-label="renderLabel"
  />
</template>

<script setup>
import { ref, h } from 'vue'

const city = ref('')
const cityOptions = [
  { value: '010', label: '北京', pinyin: 'beijing' },
  { value: '021', label: '上海', pinyin: 'shanghai' },
]

const renderLabel = (row) => h('span', `${row.label}（${row.value}）`)
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `string \| null` | — | 输入值 |
| `options` | `(string \| AutoCompleteOptionItem)[]` | — | 静态建议选项 |
| `source` | `OptionSource` | — | 远程数据源（字典 / 接口） |
| `render-label` | `(row) => VNodeChild` | — | 自定义建议渲染，不改变插入文本 |
| `filterable` | `boolean` | — | 按标签过滤本地建议 |
| `clearable` | `boolean` | — | 清除按钮 |
| `loading` | `boolean` | — | 加载状态 |
| `placeholder` | `string` | — | 占位文本 |
| `size` | `'small' \| 'medium' \| 'large'` | — | 尺寸 |
| `status` | `'error' \| 'warning'` | — | 校验状态 |
| `density` | `'default' \| 'compact' \| 'comfortable'` | — | 密度 |
| `disabled` / `readonly` | `boolean` | — | 禁用 / 只读 |

完整类型定义请查看包内 `C_AutoComplete/types.ts`。
