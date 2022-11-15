---
outline: 'deep'
---

# C_Time

> 在 `ElementPlus` 提供的时间选择器基础上，扩展封装了关于时间选择的两级 `input` 交互方式。

## Usage

`<C_Time />`

### Props

| 属性             | 类型     | 默认值           | 说明           |
| ---------------- | -------- | ---------------- | -------------- |
| startPlaceholder | `string` | '请选择开始时间' | 开始时间提示语 |
| endPlaceholder   | `string` | '请选择结束时间' | 结束时间提示语 |
| startTimeInit    | `string` | '08:00'          | 开始时间默认值 |
| startTimeStep    | `string` | '00:30'          | 开始时间步进   |
| endTimeInit      | `string` | '18:30'          | 结束时间默认值 |

### Interface

```ts
interface Props {
  startPlaceholder?: string
  endPlaceholder?: string
  startTimeInit?: string
  startTimeStep?: string
  endTimeInit?: string
}

withDefaults(defineProps<Props>(), {
  startPlaceholder: '请选择开始时间',
  endPlaceholder: '请选择结束时间',
  startTimeInit: '08:00',
  startTimeStep: '00:30',
  endTimeInit: '18:30',
})
```

## Scene

需要开始结束时间，通过两级 `input` 交互，以及步进控制。

### 示栗

```vue
<template>
  <C_Time @e_changeStartEndTime="e_changeStartEndTime" :attrs="attrs" />
</template>

<script lang="ts" setup>
// TODO: 传递给组件的剩余props属性 -  $attrs
const attrs = {
  size: 'mini',
  clearable: false,
}

const e_changeStartEndTime = ([starTiem, endTime]: string[]) =>
  console.log('time ==>', starTiem, endTime)
</script>
```

其他更多交互形式以及使用场景可以参考 `ElementPlus` 时间选择器：[ElTimePicker](https://element-plus.gitee.io/zh-CN/component/time-picker.html)
