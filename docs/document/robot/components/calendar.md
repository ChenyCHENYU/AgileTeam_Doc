---
outline: 'deep'
---

# C_FullCalendar 全功能日历组件

> 📅 基于 FullCalendar 的高效日历组件，让事件管理变得简单而优雅

## 🚀 在线演示

<DemoIframe src="/preview/calendar" title="日程管理" height="800" />


## ✨ 特性

- **📅 多种视图模式**: 支持月视图、周视图、日视图和列表视图
- **🎯 完整事件管理**: 内置增删改查功能，支持拖拽和调整大小
- **🎨 自定义样式**: 7 种事件颜色选择，支持主题定制
- **🖱️ 交互丰富**: 支持点击添加、拖拽移动、大小调整等交互
- **🔄 双向绑定**: 完整的事件数据 `v-model:events` 双向绑定
- **🌍 国际化**: 内置中文本地化支持
- **💪 TypeScript**: 完整的类型定义和类型安全（type-based defineProps）
- **⚡ 高性能**: 基于 FullCalendar 的优化渲染机制

## 🏗️ 架构

组件采用 **薄 UI 壳 + 厚 Composable 引擎** 架构：

| 文件                   | 职责                                                                         | 行数 |
| ---------------------- | ---------------------------------------------------------------------------- | ---- |
| `index.vue`            | 模板（日历 + 操作/编辑模态框）                                               | ~165 |
| `data.ts`              | EVENT_COLORS / DEFAULT_EDIT_FORM / HEADER_TOOLBAR / BUTTON_TEXT              | ~40  |
| `useCalendarEvents.ts` | 事件 CRUD、弹窗状态、FullCalendar 配置                                       | ~235 |
| `calendar.d.ts`        | CalendarEvent / CalendarViewType / CalendarEditForm / Props / Emits / Expose | ~55  |

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/vue3 @fullcalendar/list
```

```bash [pnpm]
pnpm add @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/vue3 @fullcalendar/list
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-8}
<template>
  <C_FullCalendar
    v-model:events="events"
    @event-added="handleEventAdded"
    @event-updated="handleEventUpdated"
    @event-deleted="handleEventDeleted"
  />
</template>

<script setup>
  const events = ref([
    {
      id: '1',
      title: '团队会议',
      start: new Date(),
      end: new Date(Date.now() + 2 * 3600000),
      color: '#3f86ff',
    },
    {
      id: '2',
      title: '项目评审',
      start: new Date(Date.now() + 3 * 864e5),
      color: '#ff6b6b',
    },
  ])

  const handleEventAdded = event => console.log('事件已添加:', event)
  const handleEventUpdated = event => console.log('事件已更新:', event)
  const handleEventDeleted = event => console.log('事件已删除:', event)
</script>
```

### 完整功能示例

```vue {2-9}
<template>
  <div class="calendar-demo">
    <n-space
      class="mb-20px"
      align="center"
    >
      <n-switch v-model:value="editable">
        <template #checked>可编辑</template>
        <template #unchecked>只读</template>
      </n-switch>

      <n-button
        type="warning"
        @click="clearAllEvents"
        >清空所有事件</n-button
      >
    </n-space>

    <C_FullCalendar
      ref="calendarRef"
      v-model:events="events"
      :initial-view="currentView"
      :editable="editable"
      :show-add-dialog="true"
      :show-edit-dialog="true"
      @event-added="handleEventAdded"
      @event-updated="handleEventUpdated"
      @event-deleted="handleEventDeleted"
      @event-dropped="handleEventDropped"
    />

    <n-card
      class="mt-20px"
      title="事件统计"
      size="small"
    >
      <n-space>
        <n-tag type="info">总事件数: {{ events.length }}</n-tag>
        <n-tag type="success">今日事件: {{ todayEventsCount }}</n-tag>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import type { CalendarViewType } from '@/types/modules/calendar'

  const calendarRef = ref()
  const currentView = ref<CalendarViewType>('dayGridMonth')
  const editable = ref(true)

  const events = ref([
    {
      id: '1',
      title: '团队会议',
      start: new Date(),
      end: new Date(Date.now() + 2 * 3600000),
      color: '#3f86ff',
    },
    {
      id: '2',
      title: '项目评审',
      start: new Date(Date.now() + 3 * 864e5),
      color: '#ff6b6b',
    },
  ])

  const todayEventsCount = computed(() => {
    const todayStr = new Date().toDateString()
    return events.value.filter(
      e => new Date(e.start).toDateString() === todayStr
    ).length
  })

  const clearAllEvents = () => {
    events.value = []
  }
</script>
```

## 📖 API 文档

### Props

| 参数               | 类型               | 默认值           | 说明                             |
| ------------------ | ------------------ | ---------------- | -------------------------------- |
| **events**         | `CalendarEvent[]`  | `[]`             | 事件数据数组（v-model 双向绑定） |
| **initialView**    | `CalendarViewType` | `'dayGridMonth'` | 初始视图类型                     |
| **editable**       | `boolean`          | `true`           | 是否允许编辑（点击/拖拽）        |
| **showAddDialog**  | `boolean`          | `true`           | 点击日期时是否弹出添加事件对话框 |
| **showEditDialog** | `boolean`          | `true`           | 点击事件时是否弹出操作对话框     |

### Events

| 事件名            | 参数                                     | 说明               |
| ----------------- | ---------------------------------------- | ------------------ |
| **update:events** | `(events: CalendarEvent[])`              | 事件数据更新时触发 |
| **event-added**   | `(event: CalendarEvent)`                 | 添加事件后触发     |
| **event-updated** | `(event: Partial<CalendarEvent>)`        | 更新事件后触发     |
| **event-deleted** | `(event: { id: string, title: string })` | 删除事件后触发     |
| **event-dropped** | `(event: Partial<CalendarEvent>)`        | 拖拽事件后触发     |

### 暴露方法 (Expose)

| 方法名          | 参数                                  | 返回值            | 说明                       |
| --------------- | ------------------------------------- | ----------------- | -------------------------- |
| **getApi**      | -                                     | `Calendar`        | 获取 FullCalendar API 实例 |
| **addEvent**    | `(event: CalendarEvent)`              | `void`            | 编程式添加事件             |
| **updateEvent** | `(eventData: Partial<CalendarEvent>)` | `void`            | 编程式更新事件             |
| **deleteEvent** | `(eventId: string)`                   | `void`            | 编程式删除事件             |
| **getEvents**   | -                                     | `CalendarEvent[]` | 获取所有事件数据           |

```typescript
const calendarRef = ref()

// 编程式添加事件
calendarRef.value.addEvent({
  id: Date.now().toString(),
  title: '新事件',
  start: new Date(),
  color: '#3f86ff',
})

// 获取 FullCalendar API
const api = calendarRef.value.getApi()
api.changeView('dayGridWeek')
```

### 类型定义

#### CalendarEvent

```typescript
interface CalendarEvent {
  id: string
  title: string
  start: Date | string
  end?: Date | string
  color?: string
  editable?: boolean
  [key: string]: any
}
```

#### CalendarViewType

```typescript
type CalendarViewType =
  | 'dayGridMonth' // 月视图
  | 'dayGridWeek' // 周视图
  | 'dayGridDay' // 日视图
  | 'listWeek' // 列表视图
```

#### CalendarEditForm（内部使用）

```typescript
interface CalendarEditForm {
  id: string
  title: string
  date: number // 时间戳
  startTime: string // 'HH:mm' 格式
  endTime: string // 'HH:mm' 格式
  color: string
}
```

### 类型导入

`CalendarViewType` 可以从两个位置导入（保持向后兼容）：

```typescript
// ✅ 推荐：从类型文件导入
import type { CalendarViewType } from '@/types/modules/calendar'

// ✅ 兼容：从组件文件重导出
import { type CalendarViewType } from '@/components/global/C_FullCalendar/index.vue'
```

## 🎨 使用示例

::: details 📅 会议室预订系统

```vue
<template>
  <div class="meeting-room-booking">
    <n-card
      title="会议室预订系统"
      style="margin-bottom: 16px"
    >
      <n-space>
        <n-select
          v-model:value="selectedRoom"
          :options="roomOptions"
          placeholder="选择会议室"
          style="width: 200px"
        />
      </n-space>
    </n-card>

    <C_FullCalendar
      ref="calendarRef"
      v-model:events="filteredEvents"
      :editable="true"
      @event-added="handleBookingAdded"
      @event-deleted="handleBookingDeleted"
    />
  </div>
</template>

<script setup>
  const selectedRoom = ref('room1')
  const allBookings = ref([
    {
      id: '1',
      title: '产品评审会议 - 会议室A',
      start: new Date(),
      end: new Date(Date.now() + 2 * 3600000),
      color: '#3f86ff',
      extendedProps: { roomId: 'room1' },
    },
  ])

  const roomOptions = [
    { label: '会议室A', value: 'room1' },
    { label: '会议室B', value: 'room2' },
    { label: '全部', value: 'all' },
  ]

  const filteredEvents = computed(() => {
    if (selectedRoom.value === 'all') return allBookings.value
    return allBookings.value.filter(
      e => e.extendedProps?.roomId === selectedRoom.value
    )
  })
</script>
```

:::

::: details 📊 项目进度管理

```vue
<template>
  <C_FullCalendar
    ref="projectCalendarRef"
    v-model:events="projectEvents"
    initial-view="dayGridMonth"
    :editable="true"
    @event-added="handleTaskAdded"
    @event-dropped="handleTaskMoved"
  />
</template>

<script setup>
  const projectEvents = ref([
    {
      id: '1',
      title: '需求分析',
      start: new Date(Date.now() - 7 * 864e5),
      end: new Date(Date.now() - 5 * 864e5),
      color: '#67c23a',
      extendedProps: { status: 'completed', assignee: '张三' },
    },
    {
      id: '2',
      title: '开发实现',
      start: new Date(),
      end: new Date(Date.now() + 14 * 864e5),
      color: '#e6a23c',
      extendedProps: { status: 'in_progress', assignee: '王五' },
    },
  ])
</script>
```

:::

::: details 📝 个人日程管理

```vue
<template>
  <C_FullCalendar
    v-model:events="scheduleEvents"
    :editable="true"
    initial-view="dayGridWeek"
    @event-added="handleScheduleAdded"
  />
</template>

<script setup>
  const scheduleEvents = ref([
    {
      id: '1',
      title: '晨会',
      start: new Date(new Date().setHours(9, 0, 0)),
      end: new Date(new Date().setHours(9, 30, 0)),
      color: '#3f86ff',
    },
    {
      id: '2',
      title: '代码评审',
      start: new Date(new Date().setHours(14, 0, 0)),
      end: new Date(new Date().setHours(15, 30, 0)),
      color: '#67c23a',
    },
  ])
</script>
```

:::

## ⚠️ 注意事项

### 1. 事件数据格式

::: code-group

```vue [✅ 推荐]
<script setup>
  const events = ref([
    {
      id: '1', // 必需：唯一标识
      title: '会议', // 必需：事件标题
      start: new Date(), // 必需：开始时间
      end: new Date(), // 可选：结束时间
      color: '#3f86ff', // 可选：事件颜色
    },
  ])
</script>
```

```vue [❌ 不推荐]
<script setup>
  const events = ref([
    {
      title: '会议', // 缺少 id 和 start
      color: '#3f86ff',
    },
  ])
</script>
```

:::

### 2. 日期对象处理

```javascript
// ✅ 使用 Date 对象
const event = {
  id: '1',
  title: '会议',
  start: new Date('2025-07-20T09:00:00'),
  end: new Date('2025-07-20T10:00:00'),
}

// ❌ 字符串可能导致时区问题
const event = {
  id: '1',
  title: '会议',
  start: '2025-07-20 09:00:00',
}
```

### 3. 性能优化

```vue
<script setup>
  // 大量事件时使用 shallowRef
  const events = shallowRef([])

  // 批量更新事件
  const updateEvents = newEvents => {
    events.value = [...newEvents]
  }
</script>
```

## 🐛 故障排除

::: details ❓ Q1: 事件不显示在日历上？

**A1:** 确保事件包含 `id`、`title`、`start` 三个必要字段。

:::

::: details ❓ Q2: 拖拽功能不工作？

**A2:** 确保 `editable` prop 设置为 `true`。

:::

::: details ❓ Q3: 编辑弹窗中结束时间必须晚于开始时间

**A3:** 这是内置校验逻辑，保存时会验证 `startTime < endTime`，不满足时弹出错误提示。

:::

::: details ❓ Q4: 事件颜色不生效？

**A4:** 支持十六进制（`#3f86ff`）、RGB（`rgb(63, 134, 255)`）和颜色名称（`blue`）格式。

:::

## 📝 更新日志

### v2.0.0 (2026-02-17)

- ♻️ 重构为薄 UI 壳 + `useCalendarEvents` composable 架构
- ♻️ 从 runtime defineProps 迁移到 type-based `defineProps<CalendarProps>()`
- ♻️ 类型定义迁移到 `types/modules/calendar.d.ts`
- ♻️ 常量提取到 `data.ts`（EVENT_COLORS / DEFAULT_EDIT_FORM / HEADER_TOOLBAR / BUTTON_TEXT）
- ✨ `CalendarViewType` 从组件文件重导出，保持向后兼容

### v1.0.0 (2025-07-19)

- ✨ 基于 FullCalendar 的完整 Vue 3 组件封装
- ✨ 支持多种视图模式（月、周、日、列表）
- ✨ 完整的事件管理功能（增删改查）
- ✨ 拖拽和大小调整交互支持
- ✨ 内置中文本地化支持
- ✨ 完整的 TypeScript 类型定义
- ✨ 事件数据双向绑定

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个日历组件基于 FullCalendar 库构建，提供了完整的事件管理功能。支持多种视图模式、拖拽操作、自定义样式，适用于日程管理、会议室预订、项目管理等场景。
