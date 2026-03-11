---
outline: 'deep'
---

# C_Time 时间选择器组件

> ⏰ 基于 Naive UI 的智能时间选择器，让时间选择更精确、更便捷

## 🚀 在线演示

<DemoIframe src="/preview/time" title="时间选择" height="700" />


## 🚀 特性

- **🔄 双模式支持**: 时间段选择（range）和单个时间选择（single）
- **🧠 智能时间限制**: 结束时间自动限制不早于开始时间
- **⚙️ 灵活配置**: 支持时分秒选择、步进值、格式自定义
- **🎯 精确控制**: 小时、分钟、秒级别的禁用控制
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🔧 高度可定制**: 支持占位符、属性透传等自定义配置
- **📡 丰富事件**: 多种时间变化事件回调
- **⚡ 智能重置**: 模式切换时自动重置状态

## 🏗️ 架构

组件采用 **薄 UI 壳 + 厚 Composable 引擎** 架构：

| 文件                  | 职责                                          | 行数 |
| --------------------- | --------------------------------------------- | ---- |
| `index.vue`           | 模板（range/single 两种布局）                 | ~115 |
| `useTimeSelection.ts` | 时间状态管理、智能限制、事件处理              | ~120 |
| `time.d.ts`           | TimeMode / TimeProps / TimeEmits / TimeExpose | ~40  |
| `index.scss`          | 样式                                          | —    |

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

```vue {3-6,9-12}
<template>
  <!-- 时间段选择 -->
  <C_Time
    mode="range"
    @change-range="handleRangeChange"
  />

  <!-- 单个时间选择 -->
  <C_Time
    mode="single"
    @change-single="handleSingleChange"
  />
</template>

<script setup>
  const handleRangeChange = (startTime, endTime) => {
    console.log('时间段:', startTime, endTime)
  }

  const handleSingleChange = time => {
    console.log('选择时间:', time)
  }
</script>
```

### 双模式对比

```vue
<template>
  <div class="time-demo">
    <!-- 时间段选择模式 -->
    <div class="demo-section">
      <h3>时间段选择</h3>
      <C_Time
        mode="range"
        start-placeholder="选择开始时间"
        end-placeholder="选择结束时间"
        :enable-time-restriction="true"
        @change-range="handleRangeChange"
      />
    </div>

    <!-- 单个时间选择模式 -->
    <div class="demo-section">
      <h3>单个时间选择</h3>
      <C_Time
        mode="single"
        placeholder="请选择时间"
        format="HH:mm:ss"
        :use-seconds="true"
        @change-single="handleSingleChange"
      />
    </div>
  </div>
</template>
```

## 📖 API 文档

### Props

| 参数                      | 类型                       | 默认值             | 说明                                                      |
| ------------------------- | -------------------------- | ------------------ | --------------------------------------------------------- |
| **mode**                  | `'range' \| 'single'`      | `'range'`          | 时间选择模式                                              |
| **startPlaceholder**      | `string`                   | `'请选择开始时间'` | 开始时间占位符（仅 range 模式）                           |
| **endPlaceholder**        | `string`                   | `'请选择结束时间'` | 结束时间占位符（仅 range 模式）                           |
| **placeholder**           | `string`                   | `'请选择时间'`     | 单个时间占位符（仅 single 模式）                          |
| **format**                | `string`                   | `'HH:mm'`          | 时间格式（启用秒时自动切换到 `'HH:mm:ss'`）               |
| **useHours**              | `boolean`                  | `true`             | 是否包含小时选择                                          |
| **useMinutes**            | `boolean`                  | `true`             | 是否包含分钟选择                                          |
| **useSeconds**            | `boolean`                  | `false`            | 是否包含秒选择                                            |
| **hourStep**              | `number`                   | `1`                | 小时步进值                                                |
| **minuteStep**            | `number`                   | `30`               | 分钟步进值                                                |
| **secondStep**            | `number`                   | `1`                | 秒步进值                                                  |
| **startTimeProps**        | `Partial<TimePickerProps>` | `{}`               | 开始时间选择器额外属性                                    |
| **endTimeProps**          | `Partial<TimePickerProps>` | `{}`               | 结束时间选择器额外属性                                    |
| **attrs**                 | `Partial<TimePickerProps>` | `{}`               | 通用时间选择器属性（与 startTimeProps/endTimeProps 合并） |
| **defaultStartTime**      | `number \| null`           | `null`             | 默认开始时间值（时间戳）                                  |
| **defaultEndTime**        | `number \| null`           | `null`             | 默认结束时间值（时间戳）                                  |
| **defaultSingleTime**     | `number \| null`           | `null`             | 默认单个时间值（时间戳）                                  |
| **enableTimeRestriction** | `boolean`                  | `false`            | 是否启用智能时间限制（结束时间不早于开始时间）            |

### Events

| 事件名            | 参数                                                   | 说明                           |
| ----------------- | ------------------------------------------------------ | ------------------------------ |
| **change-range**  | `(startTime: number \| null, endTime: number \| null)` | 时间段改变（仅 range 模式）    |
| **change-single** | `(time: number \| null)`                               | 单个时间改变（仅 single 模式） |
| **change-start**  | `(time: number \| null)`                               | 开始时间改变                   |
| **change-end**    | `(time: number \| null)`                               | 结束时间改变                   |

### 暴露方法 (Expose)

通过 ref 调用：

| 字段/方法      | 类型                  | 说明                  |
| -------------- | --------------------- | --------------------- |
| **reset**      | `() => void`          | 重置所有时间值为 null |
| **startTime**  | `Ref<number \| null>` | 开始时间（可读写）    |
| **endTime**    | `Ref<number \| null>` | 结束时间（可读写）    |
| **singleTime** | `Ref<number \| null>` | 单个时间（可读写）    |

```typescript
const timeRef = ref()

// 重置所有时间
timeRef.value.reset()

// 直接读取时间值（Vue 自动解包 ref）
console.log(timeRef.value.startTime) // number | null
console.log(timeRef.value.endTime) // number | null
console.log(timeRef.value.singleTime) // number | null

// 直接设置时间值
const now = Date.now()
timeRef.value.startTime = now
timeRef.value.endTime = now + 3600000
timeRef.value.singleTime = now
```

> **注意**: v2.0 移除了旧版的 `getStartTime()`/`setStartTime()`/`getEndTime()`/`setEndTime()`/`getSingleTime()`/`setSingleTime()` 方法，改为直接访问 ref。调用方示例：`timeRef.value.startTime = value`。

### 类型定义

```typescript
import type { TimePickerProps } from 'naive-ui/es'

/** 时间选择模式 */
type TimeMode = 'range' | 'single'

/** 时间选择器 Props */
interface TimeProps {
  mode?: TimeMode
  startPlaceholder?: string
  endPlaceholder?: string
  placeholder?: string
  format?: string
  useHours?: boolean
  useMinutes?: boolean
  useSeconds?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  startTimeProps?: Partial<TimePickerProps>
  endTimeProps?: Partial<TimePickerProps>
  attrs?: Partial<TimePickerProps>
  defaultStartTime?: number | null
  defaultEndTime?: number | null
  defaultSingleTime?: number | null
  enableTimeRestriction?: boolean
}

/** 时间选择器暴露方法 */
interface TimeExpose {
  reset: () => void
  startTime: Ref<number | null>
  endTime: Ref<number | null>
  singleTime: Ref<number | null>
}
```

## 🎨 使用示例

::: details ⏰ 工作时间设置

```vue
<template>
  <div class="work-time-setting">
    <h3>工作时间设置</h3>
    <C_Time
      mode="range"
      start-placeholder="上班时间"
      end-placeholder="下班时间"
      format="HH:mm"
      :minute-step="15"
      :enable-time-restriction="true"
      :default-start-time="workTimeStart"
      :default-end-time="workTimeEnd"
      @change-range="handleWorkTimeChange"
    />

    <div
      v-if="workTimeDisplay"
      class="time-display"
    >
      <n-tag type="info">工作时间: {{ workTimeDisplay }}</n-tag>
    </div>
  </div>
</template>

<script setup>
  const workTimeStart = ref(new Date().setHours(9, 0, 0, 0))
  const workTimeEnd = ref(new Date().setHours(18, 0, 0, 0))
  const workTimeDisplay = ref('')

  const handleWorkTimeChange = (startTime, endTime) => {
    if (startTime && endTime) {
      const fmt = t =>
        new Date(t).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        })
      workTimeDisplay.value = `${fmt(startTime)} - ${fmt(endTime)}`
    } else {
      workTimeDisplay.value = ''
    }
  }
</script>
```

:::

::: details 📅 会议预约系统

```vue
<template>
  <div class="meeting-booking">
    <h3>会议预约</h3>
    <n-form
      :model="meetingForm"
      ref="formRef"
    >
      <n-form-item
        label="会议标题"
        path="title"
      >
        <n-input
          v-model:value="meetingForm.title"
          placeholder="请输入会议标题"
        />
      </n-form-item>

      <n-form-item label="会议时间">
        <C_Time
          mode="range"
          start-placeholder="会议开始时间"
          end-placeholder="会议结束时间"
          format="HH:mm"
          :minute-step="15"
          :enable-time-restriction="true"
          @change-range="handleMeetingTimeChange"
        />
      </n-form-item>

      <n-form-item label="提醒时间">
        <C_Time
          mode="single"
          placeholder="提前提醒时间"
          format="HH:mm"
          :minute-step="5"
          @change-single="handleReminderTimeChange"
        />
      </n-form-item>

      <n-form-item>
        <n-button
          type="primary"
          @click="handleSubmit"
          >预约会议</n-button
        >
        <n-button @click="handleReset">重置</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
  const meetingForm = ref({
    title: '',
    startTime: null,
    endTime: null,
    reminderTime: null,
  })

  const handleMeetingTimeChange = (startTime, endTime) => {
    meetingForm.value.startTime = startTime
    meetingForm.value.endTime = endTime
  }

  const handleReminderTimeChange = time => {
    meetingForm.value.reminderTime = time
  }
</script>
```

:::

::: details 🏪 营业时间管理

```vue
<template>
  <div class="business-hours">
    <h3>营业时间管理</h3>
    <div
      v-for="(day, index) in businessHours"
      :key="day.name"
      class="day-hours"
    >
      <div class="day-info">
        <n-checkbox v-model:checked="day.isOpen">
          {{ day.name }}
        </n-checkbox>
        <n-tag
          v-if="!day.isOpen"
          type="warning"
          size="small"
          >休息</n-tag
        >
      </div>

      <div
        v-if="day.isOpen"
        class="time-settings"
      >
        <C_Time
          mode="range"
          start-placeholder="开始营业"
          end-placeholder="结束营业"
          format="HH:mm"
          :minute-step="30"
          :enable-time-restriction="true"
          @change-range="
            (start, end) => handleBusinessTimeChange(index, start, end)
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  const businessHours = ref([
    { name: '周一', isOpen: true, startTime: null, endTime: null },
    { name: '周二', isOpen: true, startTime: null, endTime: null },
    { name: '周三', isOpen: true, startTime: null, endTime: null },
    { name: '周四', isOpen: true, startTime: null, endTime: null },
    { name: '周五', isOpen: true, startTime: null, endTime: null },
    { name: '周六', isOpen: true, startTime: null, endTime: null },
    { name: '周日', isOpen: false, startTime: null, endTime: null },
  ])

  const handleBusinessTimeChange = (index, startTime, endTime) => {
    businessHours.value[index].startTime = startTime
    businessHours.value[index].endTime = endTime
  }
</script>
```

:::

## 🛠️ 高级用法

::: details 🌈 动态配置时间格式

```vue
<template>
  <div class="dynamic-format">
    <n-radio-group v-model:value="timeFormat">
      <n-radio value="HH:mm">小时:分钟</n-radio>
      <n-radio value="HH:mm:ss">小时:分钟:秒</n-radio>
    </n-radio-group>

    <C_Time
      mode="range"
      :format="timeFormat"
      :use-seconds="timeFormat.includes('ss')"
      @change-range="handleTimeChange"
    />
  </div>
</template>
```

:::

::: details ⚡ 时间预设快捷选择

```vue
<template>
  <div class="time-presets">
    <div class="preset-buttons">
      <n-button
        v-for="preset in timePresets"
        :key="preset.label"
        size="small"
        @click="handlePresetSelect(preset)"
      >
        {{ preset.label }}
      </n-button>
    </div>

    <C_Time
      ref="timePickerRef"
      mode="range"
      :default-start-time="selectedPreset.startTime"
      :default-end-time="selectedPreset.endTime"
    />
  </div>
</template>

<script setup>
  const timePickerRef = ref()
  const selectedPreset = ref({ startTime: null, endTime: null })

  const timePresets = [
    {
      label: '上午时段',
      startTime: new Date().setHours(9, 0, 0, 0),
      endTime: new Date().setHours(12, 0, 0, 0),
    },
    {
      label: '下午时段',
      startTime: new Date().setHours(14, 0, 0, 0),
      endTime: new Date().setHours(17, 0, 0, 0),
    },
    {
      label: '全天工作',
      startTime: new Date().setHours(9, 0, 0, 0),
      endTime: new Date().setHours(18, 0, 0, 0),
    },
  ]

  const handlePresetSelect = preset => {
    // 直接设置时间 ref
    timePickerRef.value.startTime = preset.startTime
    timePickerRef.value.endTime = preset.endTime
  }
</script>
```

:::

## ⚠️ 注意事项

### 1. 时间格式与配置一致性

::: code-group

```vue [✅ 推荐]
<!-- 格式与配置一致 -->
<C_Time format="HH:mm:ss" :use-seconds="true" />
```

```vue [❌ 不推荐]
<!-- 格式与配置不匹配（启用秒时组件会自动修正格式） -->
<C_Time format="HH:mm" :use-seconds="true" />
```

:::

### 2. 智能时间限制仅在 range 模式下生效

```vue
<!-- ✅ range 模式 + 时间限制 -->
<C_Time mode="range" :enable-time-restriction="true" />

<!-- ⚠️ single 模式下 enable-time-restriction 无效 -->
<C_Time mode="single" :enable-time-restriction="true" />
```

### 3. 属性合并优先级

属性合并顺序：`attrs` < `startTimeProps`/`endTimeProps`（后者覆盖前者）

```vue
<C_Time
  :attrs="{ size: 'large', clearable: true }"
  :start-time-props="{ size: 'small' }"
/>
<!-- 开始时间选择器 size='small'，结束时间选择器 size='large' -->
```

### 4. 模式切换自动重置

切换 `mode` prop 时，所有时间值会自动重置为对应的 `default*` 值（或 null）。

## 🐛 故障排除

::: details ❓ Q1: 结束时间无法选择？

**A1:** 在 range 模式下，结束时间选择器在开始时间未选择前处于禁用状态。先选择开始时间即可。

:::

::: details ❓ Q2: 时间格式显示不正确？

**A2:** 当 `useSeconds` 为 `true` 但 `format` 不包含 `ss` 时，组件会自动切换到 `HH:mm:ss` 格式。

:::

::: details ❓ Q3: 事件不触发？

**A3:** 确保监听了正确模式对应的事件：range 模式使用 `change-range`，single 模式使用 `change-single`。

:::

::: details ❓ Q4: 默认时间不生效？

**A4:** 默认值需要是时间戳格式（毫秒）：

```javascript
// ✅ 正确
const defaultStart = new Date().setHours(9, 0, 0, 0)

// ❌ 错误
const defaultStart = '09:00'
```

:::

## 🎯 最佳实践

### 1. 根据场景选择模式

```vue
<!-- 工作时间设置：range 模式 -->
<C_Time mode="range" :enable-time-restriction="true" />

<!-- 闹钟设置：single 模式 -->
<C_Time mode="single" />
```

### 2. 合理设置步进值

```vue
<script setup>
  // 根据业务精度需求
  const minuteStep = computed(() => {
    if (businessType.value === 'appointment') return 15 // 预约
    if (businessType.value === 'attendance') return 1 // 考勤
    return 5
  })
</script>

<template>
  <C_Time :minute-step="minuteStep" />
</template>
```

### 3. 表单验证集成

```vue
<template>
  <n-form
    :model="formData"
    :rules="timeRules"
  >
    <n-form-item
      label="工作时间"
      path="workTime"
    >
      <C_Time
        mode="range"
        @change-range="handleWorkTimeChange"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
  const formData = ref({ workTime: null })

  const timeRules = {
    workTime: {
      validator: (rule, value) => {
        if (!value?.start || !value?.end) return new Error('请选择完整时间')
        const duration = value.end - value.start
        if (duration < 2 * 3600000) return new Error('工作时间不能少于2小时')
        return true
      },
      trigger: 'change',
    },
  }

  const handleWorkTimeChange = (startTime, endTime) => {
    formData.value.workTime =
      startTime && endTime ? { start: startTime, end: endTime } : null
  }
</script>
```

## 📝 更新日志

### v2.0.0 (2026-02-17)

- ♻️ 重构为薄 UI 壳 + `useTimeSelection` composable 架构
- ♻️ 类型定义迁移到 `types/modules/time.d.ts`
- ♻️ **Breaking**: 移除 `getStartTime()`/`setStartTime()`/`getEndTime()`/`setEndTime()`/`getSingleTime()`/`setSingleTime()` expose 方法
- ✨ 新增 `reset()` expose 方法
- ✨ expose 直接暴露 `startTime`/`endTime`/`singleTime` 响应式 ref
- ✨ 时间格式自动修正：`useSeconds` 为 true 时自动切换到 `HH:mm:ss`

### v1.0.0 (2025-06-02)

- ✨ 支持时间段和单个时间选择模式
- ✨ 智能时间限制功能
- ✨ 灵活的时间格式配置
- ✨ 完整的 TypeScript 支持
- ✨ 丰富的事件回调

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 时间选择器组件支持工作时间设置、会议预约、营业时间管理等多种场景。v2.0 简化了 expose API，直接通过 ref 读写时间值，无需调用 getter/setter 方法。
