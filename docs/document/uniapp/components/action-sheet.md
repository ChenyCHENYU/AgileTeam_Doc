---
outline: "deep"
---

# C_ActionSheet 动作面板

> 📋 从底部弹出的操作菜单，支持图标、危险操作高亮和禁用状态，是移动端快捷操作的标准方式。

## ✨ 特性

- **🎯 语义化高亮**：`danger` 属性将选项渲染为红色，用于删除等危险操作
- **🚫 禁用状态**：`disabled` 使选项灰色不可点击
- **🖼️ 图标支持**：兼容 UnoCSS 类名（`i-` 前缀）和 wd-icon 图标名
- **📝 描述文字**：每个选项可附带描述副文本

## 🎯 快速开始

```vue
<template>
  <C_ActionSheet
    v-model:visible="visible"
    title="请选择操作"
    :actions="actions"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
const visible = ref(false)

const actions = [
  { name: '发起审批', icon: 'i-fluent-color-task-list-ltr-28' },
  { name: '转派工单', icon: 'arrow-right' },
  { name: '删除工单', danger: true },
]

function onSelect(action, index) {
  console.log('选择了：', action.name, index)
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示（v-model:visible） |
| `title` | `string` | `''` | 面板标题（空则不显示） |
| `actions` | `ActionItem[]` | `[]` | 操作项配置数组 |
| `cancelText` | `string` | `'取消'` | 取消按钮文案 |
| `showCancel` | `boolean` | `true` | 是否显示取消按钮 |
| `closeOnClickOverlay` | `boolean` | `true` | 点击遮罩是否关闭 |

### ActionItem 类型

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 选项文字（也可用 `text` 字段） |
| `icon` | `string` | 图标（`i-` 开头为 UnoCSS，其他为 wd-icon） |
| `description` | `string` | 选项描述副文本 |
| `danger` | `boolean` | 是否为危险操作（红色高亮） |
| `disabled` | `boolean` | 是否禁用 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | v-model:visible 更新 |
| `select` | `(action: ActionItem, index: number)` | 点击选项时触发 |
| `cancel` | - | 点击取消按钮时触发 |

## 🎨 使用示例

::: details 💡 工单操作菜单（含危险操作）
```vue
<template>
  <C_ActionSheet
    v-model:visible="actionVisible"
    title="工单操作"
    :actions="orderActions"
    @select="handleOrderAction"
  />
</template>

<script setup lang="ts">
const orderActions = [
  { name: '查看详情', icon: 'i-fluent-color-document-search-28' },
  { name: '转派给他人', icon: 'i-fluent-color-people-28' },
  { name: '标记完成', icon: 'i-fluent-color-checkmark-circle-28' },
  { name: '删除工单', icon: 'delete', danger: true },
]

function handleOrderAction(action: any, index: number) {
  const handlers = {
    0: () => goDetail(order.value.id),
    1: () => openAssignModal(),
    2: () => markDone(),
    3: () => confirmDelete(),
  }
  handlers[index]?.()
}
</script>
:::
