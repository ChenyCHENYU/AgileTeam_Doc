---
outline: "deep"
---

# C_Steps 步骤条

> 🪜 步骤引导组件，清晰展示流程进度，已完成步骤显示对钩，当前步骤高亮，支持水平和垂直两种布局。

## ✨ 特性

- **↔️ 双向布局**：`horizontal`（横向）和 `vertical`（纵向）自由切换
- **✅ 语义状态**：完成/当前/未到达三种状态自动计算
- **🎨 自定义配色**：`activeColor` / `inactiveColor` 无缝融入主题色

## 🎯 快速开始

```vue
<template>
  <C_Steps :steps="steps" :current="currentStep" />
</template>

<script setup lang="ts">
const currentStep = ref(1)

const steps = [
  { title: '提交申请' },
  { title: '审批中', description: '等待上级审批' },
  { title: '已完成' },
]
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `steps` | `StepItem[]` | - (**必填**) | 步骤配置数组 |
| `current` | `number` | `0` | 当前激活步骤索引（从 0 开始） |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 布局方向 |
| `activeColor` | `string` | `'#007AFF'` | 激活态颜色 |
| `inactiveColor` | `string` | `'#C7C7CC'` | 未激活态颜色 |

### StepItem 类型

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| `title` | `string` | ✅ | 步骤标题 |
| `description` | `string` | - | 步骤描述文字 |

## 🎨 使用示例

::: details 💡 垂直布局工单流转节点
```vue
<template>
  <C_Steps
    :steps="auditSteps"
    :current="order.step"
    direction="vertical"
    active-color="#34C759"
  />
</template>

<script setup lang="ts">
const auditSteps = [
  { title: '提交', description: '2025-01-10 09:00' },
  { title: '部门审批', description: '张主管' },
  { title: '财务审核' },
  { title: '完成归档' },
]
</script>
:::
