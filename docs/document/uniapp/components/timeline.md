---
outline: "deep"
---

# C_Timeline 时间轴

> ⏱️ 时间轴组件，以垂直或水平轴线呈现事件序列，支持倒序排列、自定义节点颜色/图标和当前进度标记。

## ✨ 特性

- **🔃 正序/倒序**：`reverse` 属性一键翻转时间轴方向
- **🟢 进度标记**：`current` 设置当前节点，已完成/进行中/未开始三态自动着色
- **🎨 节点自定义**：每条数据单独设置 `color` 和 `icon`
- **📝 内容丰富**：每节点支持标题 + 描述 + 时间 + 自定义 extra 插槽
- **↕️ 双向布局**：`vertical`（纵向）和 `horizontal`（横向）

## 🎯 快速开始

```vue
<template>
  <C_Timeline :items="timeline" :current="2" />
</template>

<script setup lang="ts">
const timeline = [
  { title: '工单创建', content: '用户提交申请', time: '09:00' },
  { title: '已分配', content: '指派给张三', time: '09:30' },
  { title: '处理中', time: '10:15' },
  { title: '待验收' },
]
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `TimelineItem[]` | `[]` | 时间轴数据 |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | 排列方向 |
| `reverse` | `boolean` | `false` | 是否倒序（最新在上） |
| `current` | `number` | `-1` | 当前激活节点索引（`-1` 表示全部完成） |
| `finishedColor` | `string` | `'#34C759'` | 已完成节点颜色 |
| `pendingColor` | `string` | `'#C7C7CC'` | 未完成节点颜色 |

### TimelineItem 类型

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| `title` | `string` | ✅ | 节点标题 |
| `content` | `string` | - | 节点描述 |
| `time` | `string` | - | 时间文字 |
| `icon` | `string` | - | wd-icon 图标名（节点中心显示） |
| `color` | `string` | - | 节点自定义颜色（优先于状态颜色） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `icon` | 自定义节点图标，提供 `{ item, index }` |
| `extra` | 节点内容区额外内容，提供 `{ item, index }` |

## 🎨 使用示例

::: details 💡 工单审批流转（倒序展示最新）
```vue
<template>
  <C_Timeline
    :items="auditLog"
    reverse
    :current="-1"
    finished-color="#007AFF"
  />
</template>

<script setup lang="ts">
const auditLog = computed(() =>
  order.value.logs.map(log => ({
    title: log.action,
    content: log.operator,
    time: formatTime(log.createdAt),
    icon: log.type === 'approve' ? 'check' : 'close',
    color: log.type === 'approve' ? '#34C759' : '#FF3B30',
  }))
)
</script>
:::
