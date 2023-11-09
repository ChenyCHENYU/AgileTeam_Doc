---
outline: 'deep'
---

# C_Date

> 在 `ElementPlus` 提供的时间选择器基础上，扩展封装了关于日期选择的两级 `input` 交互方式。

## Usage

`<C_Date />`

### Props

| 属性             | 类型      | 默认值           | 说明                   |
| ---------------- | --------- | ---------------- | ---------------------- |
| startPlaceholder | `string`  | '请选择开始日期' | 开始日期提示语         |
| endPlaceholder   | `string`  | '请选择结束时间' | 结束日期提示语         |
| disabledToday    | `boolean` | true             | 是否禁用今天之前的日期 |

|

### Interface

```ts
interface Props {
  startPlaceholder?: string
  endPlaceholder?: string
  disabledToday?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  startPlaceholder: '请选择开始日期',
  endPlaceholder: '请选择结束日期',
  disabledToday: true,
})
```

### Events

| 事件名               | 说明                   | 回调参数               |
| -------------------- | ---------------------- | ---------------------- |
| e_changeStartEndDate | 获取当前的开始结束日期 | `[startDate, endDate]` |

## Scene

需要开始结束日期，通过两级 `input` 交互的情况。

### 示栗

```vue{2,6-7}
<template>
  <C_Date @e_changeStartEndDate="e_changeStartEndDate" />
</template>

<script lang="ts" setup>
const e_changeStartEndDate = ([startDate, endDate]: Date[]) =>
  console.log(startDate, endDate)
</script>
```

其他更多交互形式以及使用场景可以参考 `ElementPlus` 日期选择器：[ElDatePicker](hhttps://element-plus.gitee.io/zh-CN/component/date-picker.html)，更多属性传递可通过原组件的 `attrs` 进行使用。
