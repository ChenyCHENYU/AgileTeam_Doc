---
outline: 'deep'
---

# C_Transfer 穿梭框

> 🔄 双栏穿梭选择组件，支持搜索过滤、全选、禁用项、分组等场景

## 🚀 在线演示

<DemoIframe src="/preview/transfer" title="穿梭框" height="700" />

## ✨ 特性

- **↔️ 双栏穿梭**: 左右面板，勾选后一键穿梭到另一侧
- **🔍 搜索过滤**: 开启 `filterable` 即可在面板内搜索
- **✅ 全选操作**: 标题栏全选 / 反选，快速批量操作
- **🚫 禁用项**: 单项禁用，不可穿梭但仍展示
- **📝 分组支持**: 数据项可设置 `group` 字段分组
- **📊 计数显示**: 标题栏实时显示已选 / 总数
- **🎨 主题适配**: 使用 Naive UI CSS 变量，自动跟随亮暗主题
- **💪 TypeScript**: 完整类型定义，`TransferItem`、`TransferProps` 等

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

## 🎯 快速开始

### 最简用法

```vue
<template>
  <C_Transfer
    v-model="selectedKeys"
    :data="dataSource"
    filterable
  />
</template>

<script setup>
  import { ref } from 'vue'

  const selectedKeys = ref([])
  const dataSource = [
    { key: '1', label: '选项一' },
    { key: '2', label: '选项二' },
    { key: '3', label: '选项三', disabled: true },
    { key: '4', label: '选项四' },
  ]
</script>
```

> [!TIP]
> 使用 `v-model` 双向绑定右侧已选的 key 列表，数据通过 `data` 传入。

::: details 🎛️ 自定义标题 + 筛选

```vue {4-5}
<template>
  <C_Transfer
    v-model="selected"
    :data="users"
    :titles="['待分配', '已分配']"
    filterable
    filter-placeholder="按姓名搜索..."
    :filter-method="(q, item) => item.label.includes(q)"
  />
</template>
```

:::

::: details 📦 带分组的场景

```typescript
const dataSource = [
  { key: '1', label: 'Vue 3', group: '前端' },
  { key: '2', label: 'React 18', group: '前端' },
  { key: '3', label: 'Go', group: '后端' },
  { key: '4', label: 'Rust', group: '后端' },
]
```

:::

## � API 文档

### Props

| 参数                | 类型                                           | 默认值                    | 说明               |
| ------------------- | ---------------------------------------------- | ------------------------- | ------------------ |
| **data**              | `TransferItem[]`                               | —                         | **必填**，数据源   |
| **modelValue**        | `(string \| number)[]`                         | —                         | 右侧已选 key 列表 |
| **titles**            | `[string, string]`                             | `['可选列表', '已选列表']` | 左右栏标题        |
| **filterable**        | `boolean`                                      | `false`                   | 是否可搜索         |
| **filterPlaceholder** | `string`                                       | `'搜索...'`               | 搜索占位           |
| **filterMethod**      | `(query: string, item: TransferItem) => boolean` | 按 label 匹配           | 自定义筛选         |
| **showSelectAll**     | `boolean`                                      | `true`                    | 是否显示全选       |
| **sortable**          | `boolean`                                      | `false`                   | 右侧可拖拽排序     |
| **sourceEmptyText**   | `string`                                       | `'暂无数据'`              | 左侧空状态描述     |
| **targetEmptyText**   | `string`                                       | `'未选择任何项'`          | 右侧空状态描述     |
| **size**              | `'small' \| 'medium' \| 'large'`               | `'medium'`                | 尺寸               |

### TransferItem

| 字段          | 类型               | 说明              |
| ------------- | ------------------ | ----------------- |
| `key`         | `string \| number` | **必填**，唯一标识 |
| `label`       | `string`           | **必填**，显示标签 |
| `disabled`    | `boolean`          | 是否禁用           |
| `group`       | `string`           | 分组名称           |
| `description` | `string`           | 描述信息           |
| `icon`        | `string`           | 图标（Iconify）    |

### Events

| 事件                | 参数                                 | 说明          |
| ------------------- | ------------------------------------ | ------------- |
| **update:modelValue** | `(keys: (string \| number)[])`       | 已选 key 变化 |
| **change**            | `(targetKeys, direction, moveKeys)`  | 穿梭操作回调  |

### 类型定义

```typescript
interface TransferItem {
  key: string | number
  label: string
  disabled?: boolean
  group?: string
  description?: string
  icon?: string
  extra?: Record<string, unknown>
}

interface TransferProps {
  data: TransferItem[]
  modelValue: Array<string | number>
  titles?: [string, string]
  filterable?: boolean
  filterPlaceholder?: string
  filterMethod?: (query: string, item: TransferItem) => boolean
  showSelectAll?: boolean
  sortable?: boolean
  size?: 'small' | 'medium' | 'large'
}
```

## 🔧 常见问题

::: details ❌ 禁用项被穿梭到右侧

禁用项 (`disabled: true`) 在全选时会自动跳过，不会被穿梭。如果通过 `v-model` 直接设置了禁用项的 key，组件会忽略对它的穿梭操作。

:::

::: details ❌ 如何实现服务端搜索？

使用自定义 `filterMethod`，配合 `@update:filter` 实现防抖查询：

```vue
<C_Transfer
  filterable
  :filter-method="() => true"
  @update:filter="debounceSearch"
/>
```

:::

## � 更新日志

### v1.0.0

- ✨ 新增 `C_Transfer` 穿梭框组件
- ✨ 支持搜索过滤、全选、批量移动
- ✨ 支持自定义渲染与禁用项

## 📚 相关资源

- [演示页面源码](../../views/demo/52-transfer/index.vue)

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 穿梭框组件适用于权限分配、标签选择、数据迁移等需要双列表操作的场景。如果遇到问题请先查看文档，或者在团队群里讨论。🔄
