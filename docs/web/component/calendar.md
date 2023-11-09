---
outline: 'deep'
---

# C_Calendar

> 在 [fullcalendar](https://fullcalendar.io) 基础上封装了简单的日历组件。

## Usage

`<C_Calendar />`

### Props

| 属性            | 类型            | 默认值         | 说明               |
| --------------- | --------------- | -------------- | ------------------ |
| local           | `string`        | 'zh-cn'        | 语言               |
| initalView      | `string`        | 'dayGridMonth' | 视图模式           |
| buttonText      | `object`        | \{...}         | 按钮文字           |
| headerToolbar   | `object`        | \{...}         | 头部工具栏         |
| footerToolbar   | `object`        | {}             | 底部工具栏         |
| events          | `I_EventItem[]` | []             | 事件源             |
| displayEventEnd | `boolean`       | false          | 日历显示结束时间   |
| eventContent    | `fn => any`     | -              | 自定义渲染日历内容 |

### Interface

```ts
interface Props {
  // 语言
  local?: string
  // 视图模式
  initalView?: string
  // 按钮文字
  buttonText?: object
  // 头部工具栏
  headerToolbar?: object
  // 底部工具栏
  footerToolbar?: object
  // 事件源
  events: I_EventItem[]
  // 日历显示结束时间
  displayEventEnd?: boolean
  // 自定义渲染日历内容
  eventContent?: () => any
}

const props = withDefaults(defineProps<Props>(), {
  local: 'zh-cn',
  initalView: 'dayGridMonth',
  buttonText: () => {
    return {
      today: '今天',
      month: '月',
      week: '周',
      day: '日',
      prevYear: '上一年',
      nextYear: '下一年',
      prev: '上一月',
      next: '下一月',
    }
  },
  headerToolbar: () => {
    return {
      start: 'title',
      center: '',
      end: 'prev today next',
    }
  },
  footerToolbar: () => {
    return {}
  },
  events: () => [],
  displayEventEnd: false,
})
```

### Events

| 事件名       | 说明                 | 回调参数 |
| ------------ | -------------------- | -------- |
| e_eventClick | 点击日历上的代办事件 | `info`   |
| e_dateClick  | 点击日历上的某一天   | `info`   |

## Scene

需要自定义展示日历的场景，基础的组件日历已无法满足，需要第三方库的个性化定制。

### 示栗

```vue{2-8}
<template>
  <C_Calendar
    :events="events"
    :eventContent="eventContent"
    displayEventEnd
    @e_dateClick="e_dateClick"
    @e_eventClick="e_eventClick"
  />
</template>

<script lang="ts" setup>
import type { EventClickArg, EventContentArg } from '@fullcalendar/core'
import type { DateClickArg } from '@fullcalendar/interaction'
import type { I_EventItem } from '_c/C_Calendar/types'
let events = ref<I_EventItem[]>([
  {
    title: '居家隔离',
    start: '2022-03-16 08:00',
    end: '2022-03-16 24:00',
    editable: true,
  },
  {
    title: '上班搬砖，搬丫搬',
    start: '2022-03-28 10:00',
    end: '2022-03-28 18:00',
  },
])
// 点击日历上的某一天
const e_dateClick = (info: DateClickArg) => {
  events.value.push({
    title: '学习',
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
  })
}
// 点击日历上的代办事件
const e_eventClick = (info: EventClickArg) => {}

// 自定义日历渲染内容

const eventContent = (arg: EventContentArg) => {
  const el = document.createElement('div')
  const timeTextArr = arg.timeText.split('-')
  const start = timeTextArr[0]
  const end = timeTextArr[1]
  el.innerHTML = `
    <img src="src/assets/logo.svg" width="30"/>
    <div>事件：${arg.event._def.title}</div>
    <div>开始时间：${start}</div>
    <div>结束时间：${end}</div>
    `
  return {
    domNodes: [el],
  }
}
```
