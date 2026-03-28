---
outline: "deep"
---

# C_Calendar 日历

> 📅 日历选择弹层，支持单选、多选和范围模式，可配置可选日期范围，日期标记点，满足各类日期选择需求。

## ✨ 特性

- **📅 三种模式**：`single`（单选）、`multiple`（多选）、`range`（日期范围）
- **🚧 日期限制**：`minDate` / `maxDate` 约束可选范围
- **📍 日期标记**：`marks` 在指定日期显示彩色圆点，适合标记重要节点
- **📆 周首日**：`firstDayOfWeek` 设置周一或周日起始

## 🎯 快速开始

```vue
<template>
  <view @click="calendarVisible = true">
    {{ selectedDate || '选择日期' }}
  </view>

  <C_Calendar
    v-model:visible="calendarVisible"
    mode="single"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
const calendarVisible = ref(false)
const selectedDate = ref('')

function onConfirm(date: string) {
  selectedDate.value = date
  calendarVisible.value = false
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示（v-model:visible） |
| `mode` | `'single' \| 'multiple' \| 'range'` | `'single'` | 选择模式 |
| `defaultDate` | `string \| string[]` | `''` | 默认选中日期（`YYYY-MM-DD`） |
| `minDate` | `string` | `''` | 最小可选日期（`YYYY-MM-DD`） |
| `maxDate` | `string` | `''` | 最大可选日期（`YYYY-MM-DD`） |
| `title` | `string` | `'选择日期'` | 弹层标题 |
| `showConfirm` | `boolean` | `true` | 是否显示底部确认按钮 |
| `confirmText` | `string` | `'确认'` | 确认按钮文字 |
| `firstDayOfWeek` | `0 \| 1` | `1` | 一周起始：`0` 周日，`1` 周一 |
| `marks` | `{ date: string; color?: string }[]` | `[]` | 日期标记配置 |
| `maxRange` | `number` | `365` | 范围模式最大可选天数 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | v-model:visible 更新 |
| `confirm` | `string \| string[]` | 点击确认按钮时触发，range 模式返回 `[start, end]` |
| `select` | `string` | 每次选中日期时触发 |
| `close` | - | 弹层关闭 |

## 🎨 使用示例

::: details 💡 日期范围选择（请假申请）
```vue
<template>
  <wd-form-item label="请假时间" @click="picker = true">
    <text>{{ form.leaveRange?.join(' 至 ') || '请选择' }}</text>
  </wd-form-item>

  <C_Calendar
    v-model:visible="picker"
    mode="range"
    :min-date="today"
    :max-range="30"
    @confirm="([start, end]) => { form.leaveRange = [start, end] }"
  />
</template>
:::

::: details 💡 标记已预约日期
```vue
<template>
  <C_Calendar
    v-model:visible="visible"
    :marks="bookedDates"
    mode="single"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
const bookedDates = computed(() =>
  bookings.value.map(b => ({ date: b.date, color: '#FF3B30' }))
)
</script>
:::
