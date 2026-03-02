---
outline: "deep"
---

# C_ActionBar 操作按钮组

> 🎯 配置化管理任何场景的按钮组，支持分组布局、下拉菜单、响应式控制

## 🚀 在线演示

<DemoIframe src="/preview/action-bar" title="操作按钮组" height="700" />

## ✨ 特性

- **🎨 配置化驱动**: 通过 `ActionItem[]` 数组声明式配置按钮
- **📐 分组布局**: 左右分组（`leftActions` / `rightActions`）+ 中间自定义 slot
- **📋 下拉菜单**: 单个按钮可展开为下拉操作列表
- **⚡ 响应式控制**: `loading` / `disabled` / `show` 均支持 `Ref` 响应式值
- **🛡️ 自定义指令**: 按钮支持绑定 Vue 指令（如权限指令）
- **🔧 灵活配置**: 间距、对齐、分隔线、紧凑模式等

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

### 基础使用

```vue {3-7}
<template>
  <C_ActionBar
    :actions="[
      { key: 'add', label: '新增', icon: 'mdi:plus', type: 'primary' },
      { key: 'delete', label: '删除', icon: 'mdi:delete', type: 'error' },
      { key: 'refresh', label: '刷新', icon: 'mdi:refresh' },
    ]"
    @action-click="handleAction"
  />
</template>

<script setup>
const handleAction = (action) => {
  console.log("点击按钮:", action.key);
};
</script>
```

### 左右分组

```vue {3-4}
<template>
  <C_ActionBar
    :left-actions="leftActions"
    :right-actions="rightActions"
    @action-click="handleAction"
  >
    <template #center>
      <NTag type="primary">已选择 3 条</NTag>
    </template>
  </C_ActionBar>
</template>

<script setup>
const leftActions = [
  { key: "add", label: "新增", icon: "mdi:plus", type: "primary" },
  { key: "batch-delete", label: "批量删除", icon: "mdi:delete", type: "error" },
];

const rightActions = [
  { key: "export", label: "导出", icon: "mdi:download" },
  { key: "settings", label: "设置", icon: "mdi:cog" },
];
</script>
```

## 📖 API 文档

### Props

| 参数             | 类型              | 默认值 | 说明                                  |
| ---------------- | ----------------- | ------ | ------------------------------------- |
| **actions**      | `ActionItem[]`    | `[]`   | 统一按钮列表（通过 `group` 字段分组） |
| **leftActions**  | `ActionItem[]`    | `[]`   | 左侧按钮列表（优先级高于 `actions`）  |
| **rightActions** | `ActionItem[]`    | `[]`   | 右侧按钮列表                          |
| **config**       | `ActionBarConfig` | `{}`   | 全局配置                              |

### ActionItem

| 参数            | 类型                            | 默认值      | 说明                              |
| --------------- | ------------------------------- | ----------- | --------------------------------- |
| **key**         | `string`                        | -           | 唯一标识                          |
| **label**       | `string`                        | -           | 按钮文本                          |
| **icon**        | `string`                        | -           | 图标名称（Iconify）               |
| **type**        | `ActionButtonType`              | `'default'` | 按钮类型                          |
| **size**        | `ActionButtonSize`              | -           | 按钮尺寸（不传则使用全局配置）    |
| **loading**     | `boolean \| Ref<boolean>`       | `false`     | 加载状态（支持响应式）            |
| **disabled**    | `boolean \| Ref<boolean>`       | `false`     | 禁用状态（支持响应式）            |
| **show**        | `boolean \| Ref<boolean>`       | `true`      | 是否显示（支持响应式）            |
| **tooltip**     | `string`                        | -           | 悬浮提示文本                      |
| **group**       | `'left' \| 'right'`             | `'left'`    | 分组（仅在使用 `actions` 时有效） |
| **dropdown**    | `ActionDropdownItem[]`          | -           | 下拉菜单选项                      |
| **onClick**     | `() => void \| Promise<void>`   | -           | 点击回调                          |
| **buttonProps** | `Partial<ButtonProps>`          | `{}`        | 透传 NButton 属性                 |
| **directives**  | `Array<[Directive, any?, ...]>` | -           | 自定义指令列表                    |

### ActionBarConfig

| 参数            | 类型               | 默认值       | 说明           |
| --------------- | ------------------ | ------------ | -------------- |
| **align**       | `ActionGroupAlign` | `'left'`     | 对齐方式       |
| **size**        | `ActionButtonSize` | `'medium'`   | 全局按钮尺寸   |
| **gap**         | `number`           | `8`          | 按钮间距 (px)  |
| **wrap**        | `boolean`          | `false`      | 是否允许换行   |
| **showDivider** | `boolean`          | `false`      | 是否显示分隔线 |
| **dividerType** | `string`           | `'vertical'` | 分隔线方向     |
| **compact**     | `boolean`          | `false`      | 紧凑模式       |
| **inline**      | `boolean`          | `true`       | 行内模式       |

### Events

| 事件名             | 参数                                             | 说明             |
| ------------------ | ------------------------------------------------ | ---------------- |
| **action-click**   | `(action: ActionItem)`                           | 按钮点击事件     |
| **dropdown-click** | `(item: ActionDropdownItem, action: ActionItem)` | 下拉菜单点击事件 |

### Slots

| 插槽名     | 说明               |
| ---------- | ------------------ |
| **center** | 中间区域自定义内容 |

## 🎨 使用示例

::: details 💡 表格工具栏 - 典型 CRUD 操作按钮

```vue
<template>
  <C_ActionBar
    :left-actions="[
      { key: 'add', label: '新增', icon: 'mdi:plus', type: 'primary' },
      {
        key: 'batch',
        label: '批量操作',
        icon: 'mdi:dots-horizontal',
        dropdown: [
          { key: 'batch-delete', label: '批量删除', icon: 'mdi:delete' },
          { key: 'batch-export', label: '批量导出', icon: 'mdi:download' },
        ],
      },
    ]"
    :right-actions="[
      { key: 'refresh', label: '刷新', icon: 'mdi:refresh' },
      { key: 'column-settings', label: '列设置', icon: 'mdi:cog' },
    ]"
    :config="{ gap: 12, showDivider: true }"
    @action-click="handleAction"
    @dropdown-click="handleDropdown"
  />
</template>
```

:::

::: details 🔑 权限控制 - 按钮绑定自定义指令

```vue
<template>
  <C_ActionBar
    :actions="[
      {
        key: 'add',
        label: '新增',
        type: 'primary',
        directives: [[vPermission, 'user:add']],
      },
      {
        key: 'delete',
        label: '删除',
        type: 'error',
        directives: [[vPermission, 'user:delete']],
      },
    ]"
  />
</template>
```

:::

::: details ⚡ 响应式状态 - 动态控制 loading/disabled

```vue
<template>
  <C_ActionBar
    :actions="[
      { key: 'save', label: '保存', type: 'primary', loading: saving },
      { key: 'delete', label: '删除', type: 'error', disabled: noSelection },
    ]"
  />
</template>

<script setup>
const saving = ref(false);
const noSelection = computed(() => selectedRows.value.length === 0);
</script>
```

:::

## ⚠️ 注意事项

### 1. 按钮分组优先级

::: code-group

```vue [✅ 推荐]
<!-- 使用 leftActions + rightActions 显式分组 -->
<C_ActionBar :left-actions="leftBtns" :right-actions="rightBtns" />
```

```vue [⚠️ 备选]
<!-- 使用 actions + group 字段分组 -->
<C_ActionBar
  :actions="[
    { key: 'add', label: '新增', group: 'left' },
    { key: 'export', label: '导出', group: 'right' },
  ]"
/>
```

:::

### 2. 响应式值

```vue
<!-- loading/disabled/show 支持直接传 Ref -->
<script setup>
const saving = ref(false);
const actions = [
  { key: "save", label: "保存", loading: saving }, // ✅ 直接传 ref
];
</script>
```

## 📝 更新日志

### v0.6.0 (2026-02-14)

- ✨ 新增 `ActionBar` 组件
- ✨ 支持左右分组 + 中间 slot 布局
- ✨ 支持下拉菜单、自定义指令
- ✨ `loading` / `disabled` / `show` 响应式控制

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
