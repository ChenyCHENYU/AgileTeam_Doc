---
outline: 'deep'
---

# C_FullCalendar 全功能日历组件

> 📅 基于 FullCalendar 的高效日历组件，让事件管理变得简单而优雅

## ✨ 特性

- **📅 多种视图模式**: 支持月视图、周视图、日视图和列表视图
- **🎯 完整事件管理**: 内置增删改查功能，支持拖拽和调整大小
- **🎨 自定义样式**: 多种事件颜色选择，支持主题定制
- **📱 响应式设计**: 自适应不同屏幕尺寸，移动端友好
- **🖱️ 交互丰富**: 支持点击添加、拖拽移动、大小调整等交互
- **🔄 双向绑定**: 完整的事件数据双向绑定支持
- **🌍 国际化**: 内置中文本地化支持
- **💪 TypeScript**: 完整的类型定义和类型安全
- **⚡ 高性能**: 基于 FullCalendar 的优化渲染机制
- **🧩 组件化**: 模块化设计，易于集成和扩展

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 安装 FullCalendar 相关依赖
bun add @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/vue3 @fullcalendar/list
```

```bash [pnpm]
# 安装 FullCalendar 相关依赖
pnpm add @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/vue3 @fullcalendar/list
```

```bash [yarn]
# 安装 FullCalendar 相关依赖
yarn add @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/vue3 @fullcalendar/list
```

```bash [npm]
# 安装 FullCalendar 相关依赖
npm install @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/vue3 @fullcalendar/list
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-8}
<template>
  <!-- 最简单的日历组件 -->
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

const handleEventAdded = (event) => {
  console.log('事件已添加:', event)
}

const handleEventUpdated = (event) => {
  console.log('事件已更新:', event)
}

const handleEventDeleted = (event) => {
  console.log('事件已删除:', event)
}
</script>
```

### 完整功能示例

```vue {2-9}
<template>
  <div class="calendar-demo">
    <!-- 控制面板 -->
    <n-space class="mb-20px" align="center">
      <n-switch v-model:value="editable">
        <template #checked>可编辑</template>
        <template #unchecked>只读</template>
      </n-switch>

      <n-select
        v-model:value="currentView"
        :options="viewOptions"
        style="width: 120px"
      />

      <n-button type="primary" @click="addQuickEvent"> 快速添加事件 </n-button>

      <n-button type="warning" @click="clearAllEvents"> 清空所有事件 </n-button>
    </n-space>

    <!-- 日历组件 -->
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

    <!-- 事件统计 -->
    <n-card class="mt-20px" title="事件统计" size="small">
      <n-space>
        <n-tag type="info">总事件数: {{ events.length }}</n-tag>
        <n-tag type="success">今日事件: {{ todayEventsCount }}</n-tag>
        <n-tag type="warning">本周事件: {{ thisWeekEventsCount }}</n-tag>
      </n-space>
    </n-card>
  </div>
</template>

<script setup>
const calendarRef = ref()
const message = useMessage()
const dialog = useDialog()

// 日历配置
const currentView = ref('dayGridMonth')
const editable = ref(true)

const viewOptions = [
  { label: '月视图', value: 'dayGridMonth' },
  { label: '周视图', value: 'dayGridWeek' },
  { label: '日视图', value: 'dayGridDay' },
  { label: '列表', value: 'listWeek' },
]

// 事件数据
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
    end: new Date(Date.now() + 3 * 864e5 + 3 * 3600000),
    color: '#ff6b6b',
  },
  {
    id: '3',
    title: '客户拜访',
    start: new Date(Date.now() + 1 * 864e5 + 9 * 3600000),
    end: new Date(Date.now() + 1 * 864e5 + 11 * 3600000),
    color: '#67c23a',
  },
])

// 事件处理函数
const handleEventAdded = (event) => {
  console.log('事件已添加:', event)
  message.success(`已添加事件: ${event.title}`)
}

const handleEventUpdated = (event) => {
  console.log('事件已更新:', event)
  message.success(`已更新事件: ${event.title}`)
}

const handleEventDeleted = (event) => {
  console.log('事件已删除:', event)
  message.success(`已删除事件: ${event.title}`)
}

const handleEventDropped = (event) => {
  console.log('事件已拖拽:', event)
  message.info(`事件 "${event.title}" 时间已更新`)
}

// 快速添加事件
const addQuickEvent = () => {
  const newEvent = {
    id: Date.now().toString(),
    title: `快速事件 ${events.value.length + 1}`,
    start: new Date(),
    end: new Date(Date.now() + 3600000),
    color: '#9c27b0',
  }
  events.value.push(newEvent)
}

// 清空所有事件
const clearAllEvents = () => {
  dialog.warning({
    title: '确认清空',
    content: '确定要清空所有事件吗？此操作不可恢复。',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick: () => {
      events.value = []
      message.success('已清空所有事件')
    },
  })
}

// 计算统计信息
const todayEventsCount = computed(() => {
  const today = new Date()
  const todayStr = today.toDateString()
  return events.value.filter((event) => {
    const eventDate = new Date(event.start)
    return eventDate.toDateString() === todayStr
  }).length
})

const thisWeekEventsCount = computed(() => {
  const now = new Date()
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6))

  return events.value.filter((event) => {
    const eventDate = new Date(event.start)
    return eventDate >= startOfWeek && eventDate <= endOfWeek
  }).length
})
</script>

<style scoped>
.calendar-demo {
  padding: 20px;
}
</style>
```

## 📖 API 文档

### Props

| 参数               | 类型               | 默认值           | 说明                     |
| ------------------ | ------------------ | ---------------- | ------------------------ |
| **events**         | `CalendarEvent[]`  | `[]`             | 事件数据数组（双向绑定） |
| **initialView**    | `CalendarViewType` | `'dayGridMonth'` | 初始视图类型             |
| **editable**       | `boolean`          | `true`           | 是否允许编辑事件         |
| **showAddDialog**  | `boolean`          | `true`           | 是否显示添加事件对话框   |
| **showEditDialog** | `boolean`          | `true`           | 是否显示编辑事件对话框   |

### Events

| 事件名            | 参数                                            | 说明               |
| ----------------- | ----------------------------------------------- | ------------------ |
| **update:events** | `(events: CalendarEvent[])`                     | 事件数据更新时触发 |
| **event-added**   | `(event: CalendarEvent)`                        | 添加事件时触发     |
| **event-updated** | `(event: CalendarEvent)`                        | 更新事件时触发     |
| **event-deleted** | `(event: {id: string, title: string})`          | 删除事件时触发     |
| **event-dropped** | `(event: {id: string, start: Date, end: Date})` | 拖拽事件时触发     |

### 暴露方法

| 方法名          | 参数                                  | 返回值            | 说明                       |
| --------------- | ------------------------------------- | ----------------- | -------------------------- |
| **getApi**      | `-`                                   | `Calendar`        | 获取 FullCalendar API 实例 |
| **addEvent**    | `(event: CalendarEvent)`              | `void`            | 添加事件                   |
| **updateEvent** | `(eventData: Partial<CalendarEvent>)` | `void`            | 更新事件                   |
| **deleteEvent** | `(eventId: string)`                   | `void`            | 删除事件                   |
| **getEvents**   | `-`                                   | `CalendarEvent[]` | 获取所有事件               |

## 类型定义

#### 日历事件接口

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

#### 视图类型

```typescript
type CalendarViewType =
  | 'dayGridMonth' // 月视图
  | 'dayGridWeek' // 周视图
  | 'dayGridDay' // 日视图
  | 'listWeek' // 列表视图
```

## 🎨 使用示例

::: details 📅 会议室预订系统 - 完整的预订管理示例
```vue 
<template>
  <div class="meeting-room-booking">
    <n-card title="会议室预订系统" style="margin-bottom: 16px;">
      <n-space>
        <n-select
          v-model:value="selectedRoom"
          :options="roomOptions"
          placeholder="选择会议室"
          style="width: 200px"
        />
        <n-button type="primary" @click="filterEventsByRoom">
          筛选预订
        </n-button>
      </n-space>
    </n-card>

    <C_FullCalendar
      ref="calendarRef"
      v-model:events="filteredEvents"
      :editable="true"
      @event-added="handleBookingAdded"
      @event-updated="handleBookingUpdated"
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
    extendedProps: {
      roomId: 'room1',
      attendees: ['张三', '李四', '王五'],
      description: '讨论新产品功能',
    },
  },
  {
    id: '2',
    title: '技术分享 - 会议室B',
    start: new Date(Date.now() + 3 * 864e5),
    end: new Date(Date.now() + 3 * 864e5 + 1.5 * 3600000),
    color: '#67c23a',
    extendedProps: {
      roomId: 'room2',
      attendees: ['赵六', '钱七'],
      description: 'Vue 3 最佳实践分享',
    },
  },
])

const roomOptions = [
  { label: '会议室A', value: 'room1' },
  { label: '会议室B', value: 'room2' },
  { label: '会议室C', value: 'room3' },
  { label: '全部', value: 'all' },
]

const filteredEvents = computed(() => {
  if (selectedRoom.value === 'all') {
    return allBookings.value
  }
  return allBookings.value.filter(
    (event) => event.extendedProps?.roomId === selectedRoom.value
  )
})

const handleBookingAdded = (event) => {
  // 检查会议室冲突
  const conflictEvents = allBookings.value.filter((existing) => {
    if (existing.id === event.id) return false
    if (existing.extendedProps?.roomId !== selectedRoom.value) return false

    const existingStart = new Date(existing.start)
    const existingEnd = new Date(existing.end || existing.start)
    const newStart = new Date(event.start)
    const newEnd = new Date(event.end || event.start)

    return newStart < existingEnd && newEnd > existingStart
  })

  if (conflictEvents.length > 0) {
    message.error('该时间段会议室已被预订')
    return
  }

  // 添加会议室信息
  event.extendedProps = {
    roomId: selectedRoom.value,
    attendees: [],
    description: '',
  }

  allBookings.value.push(event)
  message.success('会议室预订成功')
}

const handleBookingUpdated = (event) => {
  const index = allBookings.value.findIndex((b) => b.id === event.id)
  if (index !== -1) {
    allBookings.value[index] = { ...allBookings.value[index], ...event }
    message.success('预订信息已更新')
  }
}

const handleBookingDeleted = (event) => {
  const index = allBookings.value.findIndex((b) => b.id === event.id)
  if (index !== -1) {
    allBookings.value.splice(index, 1)
    message.success('预订已取消')
  }
}

const filterEventsByRoom = () => {
  message.info(
    `已筛选 ${
      roomOptions.find((r) => r.value === selectedRoom.value)?.label
    } 的预订`
  )
}
</script>

<style scoped>
.meeting-room-booking {
  padding: 24px;
}
</style>
```
:::

::: details 📊 项目管理甘特图 - 完整的项目进度管理
```vue 
<template>
  <div class="project-calendar">
    <n-card title="项目进度管理" style="margin-bottom: 16px;">
      <n-space>
        <n-select
          v-model:value="selectedProject"
          :options="projectOptions"
          placeholder="选择项目"
          style="width: 200px"
        />
        <n-button type="primary" @click="addMilestone"> 添加里程碑 </n-button>
        <n-button type="info" @click="generateReport"> 生成报告 </n-button>
      </n-space>
    </n-card>

    <C_FullCalendar
      ref="projectCalendarRef"
      v-model:events="projectEvents"
      initial-view="dayGridMonth"
      :editable="true"
      @event-added="handleTaskAdded"
      @event-updated="handleTaskUpdated"
      @event-deleted="handleTaskDeleted"
      @event-dropped="handleTaskMoved"
    />

    <!-- 项目统计 -->
    <n-card class="mt-20px" title="项目统计">
      <n-grid cols="4" x-gap="16">
        <n-grid-item>
          <n-statistic label="总任务数" :value="projectEvents.length" />
        </n-grid-item>
        <n-grid-item>
          <n-statistic label="已完成" :value="completedTasks" />
        </n-grid-item>
        <n-grid-item>
          <n-statistic label="进行中" :value="inProgressTasks" />
        </n-grid-item>
        <n-grid-item>
          <n-statistic label="逾期任务" :value="overdueTasks" />
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup>
const projectCalendarRef = ref()
const selectedProject = ref('project1')

const projectOptions = [
  { label: '电商平台重构', value: 'project1' },
  { label: '移动端App开发', value: 'project2' },
  { label: '数据分析系统', value: 'project3' },
]

const projectEvents = ref([
  {
    id: '1',
    title: '需求分析',
    start: new Date(Date.now() - 7 * 864e5),
    end: new Date(Date.now() - 5 * 864e5),
    color: '#67c23a',
    extendedProps: {
      projectId: 'project1',
      status: 'completed',
      assignee: '张三',
      priority: 'high',
    },
  },
  {
    id: '2',
    title: '原型设计',
    start: new Date(Date.now() - 4 * 864e5),
    end: new Date(Date.now() - 2 * 864e5),
    color: '#3f86ff',
    extendedProps: {
      projectId: 'project1',
      status: 'in_progress',
      assignee: '李四',
      priority: 'medium',
    },
  },
  {
    id: '3',
    title: '开发实现',
    start: new Date(),
    end: new Date(Date.now() + 14 * 864e5),
    color: '#e6a23c',
    extendedProps: {
      projectId: 'project1',
      status: 'pending',
      assignee: '王五',
      priority: 'high',
    },
  },
])

const completedTasks = computed(
  () =>
    projectEvents.value.filter((e) => e.extendedProps?.status === 'completed')
      .length
)

const inProgressTasks = computed(
  () =>
    projectEvents.value.filter((e) => e.extendedProps?.status === 'in_progress')
      .length
)

const overdueTasks = computed(() => {
  const now = new Date()
  return projectEvents.value.filter((e) => {
    const endDate = new Date(e.end || e.start)
    return endDate < now && e.extendedProps?.status !== 'completed'
  }).length
})

const handleTaskAdded = (event) => {
  event.extendedProps = {
    projectId: selectedProject.value,
    status: 'pending',
    assignee: '',
    priority: 'medium',
  }
  message.success('任务已添加')
}

const handleTaskUpdated = (event) => {
  message.success('任务已更新')
}

const handleTaskDeleted = (event) => {
  message.success('任务已删除')
}

const handleTaskMoved = (event) => {
  message.info('任务时间已调整')
}

const addMilestone = () => {
  const milestoneEvent = {
    id: Date.now().toString(),
    title: `${selectedProject.value} 里程碑`,
    start: new Date(),
    color: '#9c27b0',
    extendedProps: {
      projectId: selectedProject.value,
      status: 'milestone',
      type: 'milestone',
    },
  }
  projectEvents.value.push(milestoneEvent)
  message.success('里程碑已添加')
}

const generateReport = () => {
  const reportData = {
    project: selectedProject.value,
    totalTasks: projectEvents.value.length,
    completed: completedTasks.value,
    inProgress: inProgressTasks.value,
    overdue: overdueTasks.value,
    generateTime: new Date().toLocaleString(),
  }

  console.log('项目报告:', reportData)
  message.success('报告已生成，请查看控制台')
}
</script>

<style scoped>
.project-calendar {
  padding: 24px;
}
</style>
```
:::

::: details 📝 个人日程管理 - 智能提醒和同步功能
```vue 
<template>
  <div class="personal-schedule">
    <n-card title="个人日程管理" style="margin-bottom: 16px;">
      <n-space>
        <n-button type="primary" @click="syncCalendar"> 同步日历 </n-button>
        <n-button type="info" @click="exportSchedule"> 导出日程 </n-button>
        <n-button type="warning" @click="setReminder"> 设置提醒 </n-button>
      </n-space>
    </n-card>

    <C_FullCalendar
      ref="scheduleCalendarRef"
      v-model:events="scheduleEvents"
      :editable="true"
      initial-view="dayGridWeek"
      @event-added="handleScheduleAdded"
      @event-updated="handleScheduleUpdated"
    />

    <!-- 今日日程 -->
    <n-card class="mt-20px" title="今日日程">
      <n-list v-if="todaySchedule.length > 0">
        <n-list-item v-for="schedule in todaySchedule" :key="schedule.id">
          <n-space align="center">
            <n-tag :color="{ color: schedule.color }">
              {{ formatTime(schedule.start) }} - {{ formatTime(schedule.end) }}
            </n-tag>
            <span>{{ schedule.title }}</span>
            <n-button size="tiny" @click="markAsCompleted(schedule)">
              完成
            </n-button>
          </n-space>
        </n-list-item>
      </n-list>
      <n-empty v-else description="今日暂无日程安排" />
    </n-card>
  </div>
</template>

<script setup>
const scheduleCalendarRef = ref()
const message = useMessage()

const scheduleEvents = ref([
  {
    id: '1',
    title: '晨会',
    start: new Date(new Date().setHours(9, 0, 0)),
    end: new Date(new Date().setHours(9, 30, 0)),
    color: '#3f86ff',
    extendedProps: {
      type: 'meeting',
      completed: false,
      reminder: 15, // 提前15分钟提醒
    },
  },
  {
    id: '2',
    title: '代码评审',
    start: new Date(new Date().setHours(14, 0, 0)),
    end: new Date(new Date().setHours(15, 30, 0)),
    color: '#67c23a',
    extendedProps: {
      type: 'work',
      completed: false,
      reminder: 10,
    },
  },
  {
    id: '3',
    title: '健身',
    start: new Date(new Date().setHours(18, 0, 0)),
    end: new Date(new Date().setHours(19, 0, 0)),
    color: '#ff6b6b',
    extendedProps: {
      type: 'personal',
      completed: false,
      reminder: 30,
    },
  },
])

const todaySchedule = computed(() => {
  const today = new Date().toDateString()
  return scheduleEvents.value
    .filter((event) => new Date(event.start).toDateString() === today)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
})

const formatTime = (dateTime) => {
  return new Date(dateTime).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const handleScheduleAdded = (event) => {
  event.extendedProps = {
    type: 'personal',
    completed: false,
    reminder: 15,
  }
  message.success('日程已添加')
}

const handleScheduleUpdated = (event) => {
  message.success('日程已更新')
}

const markAsCompleted = (schedule) => {
  const event = scheduleEvents.value.find((e) => e.id === schedule.id)
  if (event) {
    event.extendedProps.completed = true
    event.color = '#d9d9d9' // 灰色表示已完成
    message.success(`"${schedule.title}" 已标记为完成`)
  }
}

const syncCalendar = () => {
  // 模拟同步第三方日历
  message.loading('正在同步日历...', { duration: 2000 })
  setTimeout(() => {
    message.success('日历同步完成')
  }, 2000)
}

const exportSchedule = () => {
  const scheduleData = {
    events: scheduleEvents.value,
    exportTime: new Date().toISOString(),
    total: scheduleEvents.value.length,
  }

  // 模拟导出功能
  const blob = new Blob([JSON.stringify(scheduleData, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `schedule-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)

  message.success('日程已导出')
}

const setReminder = () => {
  // 模拟设置提醒功能
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        message.success('提醒权限已开启')
      }
    })
  }
}

// 设置定时检查提醒
onMounted(() => {
  setInterval(() => {
    const now = new Date()
    scheduleEvents.value.forEach((event) => {
      const eventStart = new Date(event.start)
      const reminderTime = new Date(
        eventStart.getTime() - (event.extendedProps?.reminder || 15) * 60000
      )

      if (
        now >= reminderTime &&
        now < eventStart &&
        !event.extendedProps?.notified
      ) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`即将开始: ${event.title}`, {
            body: `${formatTime(event.start)} - ${formatTime(event.end)}`,
            icon: '/favicon.ico',
          })
        }
        event.extendedProps.notified = true
      }
    })
  }, 60000) // 每分钟检查一次
})
</script>

<style scoped>
.personal-schedule {
  padding: 24px;
}
</style>
```
:::

## 🛠️ 高级用法

::: details 🎨 自定义事件渲染 - 个性化事件显示
```vue
<template>
  <C_FullCalendar
    ref="calendarRef"
    v-model:events="customEvents"
    :custom-event-render="true"
  />
</template>

<script setup>
const calendarRef = ref()

// 使用 FullCalendar API 自定义事件渲染
onMounted(() => {
  const calendarApi = calendarRef.value.getApi()

  // 自定义事件内容
  calendarApi.setOption('eventContent', (arg) => {
    const event = arg.event
    const priority = event.extendedProps.priority

    return {
      html: `
          <div class="custom-event">
            <div class="event-priority ${priority}"></div>
            <div class="event-title">${event.title}</div>
            <div class="event-time">${formatEventTime(event)}</div>
          </div>
        `,
    }
  })
})

const formatEventTime = (event) => {
  const start = new Date(event.start)
  const end = new Date(event.end || event.start)
  return `${start.getHours()}:${start
    .getMinutes()
    .toString()
    .padStart(2, '0')} - ${end.getHours()}:${end
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}
</script>

<style>
.custom-event {
  position: relative;
  padding: 2px 4px;
  border-radius: 3px;
  overflow: hidden;
}

.event-priority {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
}

.event-priority.high {
  background: #ff4757;
}
.event-priority.medium {
  background: #ffa726;
}
.event-priority.low {
  background: #66bb6a;
}

.event-title {
  font-weight: 600;
  font-size: 12px;
  margin-left: 6px;
}

.event-time {
  font-size: 10px;
  color: #666;
  margin-left: 6px;
}
</style>
```
:::

::: details 💾 事件数据持久化 - 本地存储和API同步
```vue
<template>
  <C_FullCalendar
    v-model:events="persistentEvents"
    @event-added="saveEvent"
    @event-updated="updateEvent"
    @event-deleted="deleteEvent"
  />
</template>

<script setup>
const persistentEvents = ref([])

// 从本地存储加载事件
const loadEvents = () => {
  try {
    const saved = localStorage.getItem('calendar-events')
    if (saved) {
      const parsed = JSON.parse(saved)
      // 确保日期对象正确转换
      persistentEvents.value = parsed.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: event.end ? new Date(event.end) : undefined,
      }))
    }
  } catch (error) {
    console.error('加载事件失败:', error)
  }
}

// 保存事件到本地存储
const saveEventsToStorage = () => {
  try {
    localStorage.setItem(
      'calendar-events',
      JSON.stringify(persistentEvents.value)
    )
  } catch (error) {
    console.error('保存事件失败:', error)
  }
}

// 事件处理函数
const saveEvent = async (event) => {
  try {
    // 可以在这里调用 API 保存到服务器
    await api.createEvent(event)
    saveEventsToStorage()
    message.success('事件已保存')
  } catch (error) {
    message.error('保存失败')
  }
}

const updateEvent = async (event) => {
  try {
    await api.updateEvent(event)
    saveEventsToStorage()
    message.success('事件已更新')
  } catch (error) {
    message.error('更新失败')
  }
}

const deleteEvent = async (event) => {
  try {
    await api.deleteEvent(event.id)
    saveEventsToStorage()
    message.success('事件已删除')
  } catch (error) {
    message.error('删除失败')
  }
}

// 监听事件变化自动保存
watch(
  persistentEvents,
  () => {
    saveEventsToStorage()
  },
  { deep: true }
)

onMounted(() => {
  loadEvents()
})
</script>
```
:::

::: details 🗂️ 多日历支持 - 分类管理和视图切换
```vue
<template>
  <div class="multi-calendar">
    <n-space class="mb-20px">
      <n-checkbox-group v-model:value="visibleCalendars">
        <n-space>
          <n-checkbox
            v-for="cal in availableCalendars"
            :key="cal.id"
            :value="cal.id"
            :label="cal.name"
          />
        </n-space>
      </n-checkbox-group>
    </n-space>

    <C_FullCalendar
      v-model:events="visibleEvents"
      @event-added="handleMultiCalendarEventAdded"
    />
  </div>
</template>

<script setup>
const visibleCalendars = ref(['work', 'personal'])

const availableCalendars = [
  { id: 'work', name: '工作', color: '#3f86ff' },
  { id: 'personal', name: '个人', color: '#67c23a' },
  { id: 'family', name: '家庭', color: '#ff6b6b' },
  { id: 'health', name: '健康', color: '#9c27b0' },
]

const allEvents = ref([
  {
    id: '1',
    title: '团队会议',
    start: new Date(),
    calendar: 'work',
    color: '#3f86ff',
  },
  {
    id: '2',
    title: '健身',
    start: new Date(Date.now() + 864e5),
    calendar: 'health',
    color: '#9c27b0',
  },
  {
    id: '3',
    title: '家庭聚餐',
    start: new Date(Date.now() + 2 * 864e5),
    calendar: 'family',
    color: '#ff6b6b',
  },
])

const visibleEvents = computed(() => {
  return allEvents.value.filter((event) =>
    visibleCalendars.value.includes(event.calendar)
  )
})

const handleMultiCalendarEventAdded = (event) => {
  // 为新事件分配默认日历
  event.calendar = visibleCalendars.value[0] || 'personal'
  event.color = availableCalendars.find(
    (cal) => cal.id === event.calendar
  )?.color
  allEvents.value.push(event)
}
</script>
```
:::

::: details 🔍 事件分类和筛选 - 智能过滤功能
```vue
<template>
  <div class="calendar-with-filters">
    <n-card class="mb-20px">
      <n-space>
        <n-select
          v-model:value="selectedCategory"
          :options="categoryOptions"
          placeholder="选择分类"
          clearable
          style="width: 150px"
        />
        <n-select
          v-model:value="selectedPriority"
          :options="priorityOptions"
          placeholder="选择优先级"
          clearable
          style="width: 150px"
        />
        <n-date-picker
          v-model:value="dateRange"
          type="daterange"
          clearable
          style="width: 300px"
        />
        <n-button @click="clearFilters">清除筛选</n-button>
      </n-space>
    </n-card>

    <C_FullCalendar
      v-model:events="filteredEvents"
      @event-added="handleCategorizedEventAdded"
    />
  </div>
</template>

<script setup>
const selectedCategory = ref(null)
const selectedPriority = ref(null)
const dateRange = ref(null)

const categoryOptions = [
  { label: '会议', value: 'meeting' },
  { label: '任务', value: 'task' },
  { label: '约会', value: 'appointment' },
  { label: '培训', value: 'training' },
]

const priorityOptions = [
  { label: '高优先级', value: 'high' },
  { label: '中优先级', value: 'medium' },
  { label: '低优先级', value: 'low' },
]

const allCategorizedEvents = ref([
  {
    id: '1',
    title: '重要会议',
    start: new Date(),
    extendedProps: {
      category: 'meeting',
      priority: 'high',
    },
    color: '#ff4757',
  },
  {
    id: '2',
    title: '代码审查',
    start: new Date(Date.now() + 864e5),
    extendedProps: {
      category: 'task',
      priority: 'medium',
    },
    color: '#3742fa',
  },
])

const filteredEvents = computed(() => {
  let filtered = [...allCategorizedEvents.value]

  // 按分类筛选
  if (selectedCategory.value) {
    filtered = filtered.filter(
      (event) => event.extendedProps?.category === selectedCategory.value
    )
  }

  // 按优先级筛选
  if (selectedPriority.value) {
    filtered = filtered.filter(
      (event) => event.extendedProps?.priority === selectedPriority.value
    )
  }

  // 按日期范围筛选
  if (dateRange.value && dateRange.value.length === 2) {
    const [startDate, endDate] = dateRange.value
    filtered = filtered.filter((event) => {
      const eventDate = new Date(event.start)
      return eventDate >= startDate && eventDate <= endDate
    })
  }

  return filtered
})

const handleCategorizedEventAdded = (event) => {
  event.extendedProps = {
    category: selectedCategory.value || 'task',
    priority: selectedPriority.value || 'medium',
  }
  allCategorizedEvents.value.push(event)
}

const clearFilters = () => {
  selectedCategory.value = null
  selectedPriority.value = null
  dateRange.value = null
}
</script>
```
:::

## ⚠️ 注意事项

### 1. 事件数据格式

::: code-group

```vue [✅ 推荐]
<!-- 完整的事件对象 -->
<script setup>
const events = ref([
  {
    id: '1', // 必需：唯一标识
    title: '会议', // 必需：事件标题
    start: new Date(), // 必需：开始时间
    end: new Date(), // 可选：结束时间
    color: '#3f86ff', // 可选：事件颜色
    editable: true, // 可选：是否可编辑
    extendedProps: {
      // 可选：扩展属性
      description: '会议描述',
      location: '会议室A',
    },
  },
])
</script>
```

```vue [❌ 不推荐]
<!-- 缺少必要字段 -->
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

::: code-group

```javascript [✅ 推荐]
// 使用 Date 对象
const event = {
  id: '1',
  title: '会议',
  start: new Date('2025-07-20T09:00:00'),
  end: new Date('2025-07-20T10:00:00'),
}
```

```javascript [❌ 不推荐]
// 使用字符串可能导致时区问题
const event = {
  id: '1',
  title: '会议',
  start: '2025-07-20 09:00:00', // 可能有时区问题
  end: '2025-07-20 10:00:00',
}
```

:::

### 3. 事件 ID 的唯一性

::: code-group

```javascript [✅ 推荐]
// 确保ID唯一
const generateEventId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
```

```javascript [❌ 不推荐]
// 使用可能重复的ID
const generateEventId = () => {
  return Math.floor(Math.random() * 1000) // 可能重复
}
```

:::

### 4. 性能优化

::: code-group

```vue [✅ 推荐]
<!-- 使用 shallowRef 优化大量事件 -->
<script setup>
const events = shallowRef([]) // 大量事件时使用 shallowRef

// 批量更新事件
const updateEvents = (newEvents) => {
  events.value = [...newEvents] // 创建新数组触发更新
}
</script>
```

```vue [❌ 不推荐]
<!-- 频繁修改响应式数组 -->
<script setup>
const events = ref([])

// 频繁的单个操作
events.value.push(newEvent) // 触发响应式更新
events.value.splice(0, 1) // 又触发响应式更新
</script>
```

:::

## 🐛 故障排除

::: details ❓ Q1: 事件不显示在日历上？
**A1:** 检查事件数据格式：

```javascript
// 确保事件包含必要字段
const event = {
  id: '1', // 必须唯一
  title: '事件标题', // 必须有标题
  start: new Date(), // 必须有开始时间
  // end 可选，color 可选
}
```
:::

::: details ❓ Q2: 拖拽功能不工作？
**A2:** 检查相关配置：

```vue
<C_FullCalendar
  :editable="true"          <!-- 必须设置为 true -->
  v-model:events="events"
  @event-dropped="handleDrop"  <!-- 监听拖拽事件 -->
/>
```
:::

::: details ❓ Q3: 日期显示不正确？
**A3:** 检查时区和日期格式：

```javascript
// 使用本地时间创建日期
const localDate = new Date(2025, 6, 20, 9, 0) // 月份从0开始

// 或确保字符串格式正确
const isoDate = new Date('2025-07-20T09:00:00')
```
:::

::: details ❓ Q4: 事件颜色不生效？
**A4:** 检查颜色格式：

```javascript
// ✅ 支持的颜色格式
color: '#3f86ff' // 十六进制
color: 'rgb(63, 134, 255)' // RGB
color: 'blue' // 颜色名称

// ❌ 不支持的格式
color: 'hsl(220, 100%, 62%)' // HSL 可能不支持
```
:::

::: details ❓ Q5: 模态框不显示？
**A5:** 检查相关属性设置：

```vue
<C_FullCalendar
  :show-add-dialog="true"    <!-- 确保开启添加对话框 -->
  :show-edit-dialog="true"   <!-- 确保开启编辑对话框 -->
  :editable="true"           <!-- 确保允许编辑 -->
/>
```
:::

## 🎯 最佳实践

### 1. 事件数据管理

```typescript
// ✅ 推荐：统一的事件数据结构
interface StandardEvent {
  id: string
  title: string
  start: Date
  end?: Date
  color?: string
  editable?: boolean
  extendedProps?: {
    description?: string
    location?: string
    attendees?: string[]
    category?: string
    priority?: 'high' | 'medium' | 'low'
    [key: string]: any
  }
}

// 事件工厂函数
const createEvent = (data: Partial<StandardEvent>): StandardEvent => {
  return {
    id: data.id || generateUniqueId(),
    title: data.title || '未命名事件',
    start: data.start || new Date(),
    end: data.end,
    color: data.color || '#3f86ff',
    editable: data.editable ?? true,
    extendedProps: data.extendedProps || {}
  }
}
```

### 2. 事件操作封装

```javascript
// 事件管理类
class EventManager {
  constructor(events) {
    this.events = ref(events || [])
  }

  addEvent(eventData) {
    const event = createEvent(eventData)
    this.events.value.push(event)
    return event
  }

  updateEvent(id, updates) {
    const index = this.events.value.findIndex((e) => e.id === id)
    if (index !== -1) {
      this.events.value[index] = { ...this.events.value[index], ...updates }
    }
  }

  deleteEvent(id) {
    this.events.value = this.events.value.filter((e) => e.id !== id)
  }

  getEventsByDate(date) {
    const dateStr = date.toDateString()
    return this.events.value.filter(
      (event) => new Date(event.start).toDateString() === dateStr
    )
  }

  getEventsByCategory(category) {
    return this.events.value.filter(
      (event) => event.extendedProps?.category === category
    )
  }
}

// 使用示例
const eventManager = new EventManager()
const events = eventManager.events

const handleEventAdded = (eventData) => {
  const newEvent = eventManager.addEvent(eventData)
  message.success(`已添加事件: ${newEvent.title}`)
}
```

### 3. 性能优化策略

```vue
<template>
  <!-- 使用 v-memo 优化渲染 -->
  <C_FullCalendar
    v-memo="[events.length, currentView]"
    v-model:events="events"
    :initial-view="currentView"
  />
</template>

<script setup>
// 使用 shallowRef 减少深度响应式开销
const events = shallowRef([])

// 防抖事件处理
const debouncedEventUpdate = debounce((event) => {
  // 批量更新逻辑
  updateEventInBatch(event)
}, 300)

// 虚拟滚动优化（大量事件时）
const visibleEvents = computed(() => {
  if (events.value.length > 1000) {
    // 只显示当前视图范围内的事件
    return filterEventsByViewRange(events.value, currentViewRange.value)
  }
  return events.value
})

// 内存管理
onUnmounted(() => {
  // 清理事件监听器
  calendarApi?.destroy()
})
</script>
```

### 4. 错误处理和用户体验

```vue
<script setup>
const loading = ref(false)
const error = ref(null)

const handleEventOperation = async (operation, ...args) => {
  try {
    loading.value = true
    error.value = null

    await operation(...args)

    message.success('操作成功')
  } catch (err) {
    error.value = err.message
    message.error(`操作失败: ${err.message}`)

    // 记录错误日志
    console.error('Calendar operation failed:', err)
  } finally {
    loading.value = false
  }
}

// 带确认的删除操作
const handleDeleteWithConfirm = (event) => {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除事件 "${event.title}" 吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      handleEventOperation(deleteEvent, event.id)
    },
  })
}

// 批量操作优化
const handleBatchDelete = (eventIds) => {
  if (eventIds.length === 0) return

  dialog.warning({
    title: '批量删除',
    content: `确定要删除 ${eventIds.length} 个事件吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      handleEventOperation(batchDeleteEvents, eventIds)
    },
  })
}
</script>
```

### 5. 国际化和本地化

```javascript
// 多语言支持
const localeConfig = {
  'zh-CN': {
    buttonText: {
      today: '今天',
      month: '月',
      week: '周',
      day: '日',
      list: '列表',
    },
    allDayText: '全天',
    moreLinkText: '更多',
    noEventsText: '没有事件',
  },
  'en-US': {
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List',
    },
    allDayText: 'All Day',
    moreLinkText: 'more',
    noEventsText: 'No events',
  },
}

const currentLocale = ref('zh-CN')

const calendarOptions = computed(() => ({
  locale: currentLocale.value,
  ...localeConfig[currentLocale.value],
}))
```

## 📝 更新日志

### v1.0.0 (2025-07-19)

- ✨ 基于 FullCalendar 的完整 Vue 3 组件封装
- ✨ 支持多种视图模式（月、周、日、列表）
- ✨ 完整的事件管理功能（增删改查）
- ✨ 拖拽和大小调整交互支持
- ✨ 自定义事件颜色和样式
- ✨ 内置中文本地化支持
- ✨ 完整的 TypeScript 类型定义
- ✨ 响应式设计和移动端适配
- ✨ 事件数据双向绑定
- ✨ 丰富的事件回调系统

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个日历组件基于强大的 FullCalendar 库构建，提供了完整的事件管理功能和丰富的交互体验。支持多种视图模式、拖拽操作、自定义样式等特性，适用于各种日程管理场景。无论是个人日程、项目管理还是会议室预订，都能提供专业级的日历解决方案。结合 TypeScript 支持和响应式设计，让日历功能既强大又易用。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更高效的时间管理体验！ 📅