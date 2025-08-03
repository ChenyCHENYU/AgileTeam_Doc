---
outline: 'deep'
---

# C_Time 时间选择器组件

> ⏰ 基于 Naive UI 的智能时间选择器，让时间选择更精确、更便捷

## 🚀 特性

- **🔄 双模式支持**: 时间段选择和单个时间选择两种模式
- **🧠 智能时间限制**: 结束时间自动限制不早于开始时间
- **⚙️ 灵活配置**: 支持时分秒选择、步进值、格式自定义
- **🎯 精确控制**: 小时、分钟、秒级别的禁用控制
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🔧 高度可定制**: 支持占位符、属性传递等自定义配置
- **📡 丰富事件**: 多种时间变化事件回调
- **⚡ 智能重置**: 模式切换时自动重置相关状态

## 📦 安装

```bash
# 基于 Naive UI，确保已安装依赖
npm install naive-ui
```

## 🎯 快速开始

### 基础使用

```vue
<template>
  <!-- 最简单的时间段选择 -->
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

const handleSingleChange = (time) => {
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

| 参数                     | 类型                        | 默认值               | 说明                                |
| ------------------------ | --------------------------- | -------------------- | ----------------------------------- |
| **mode**                 | `'range' \| 'single'`       | `'range'`            | 时间选择模式                        |
| **startPlaceholder**     | `string`                    | `'请选择开始时间'`   | 开始时间占位符(仅range模式)         |
| **endPlaceholder**       | `string`                    | `'请选择结束时间'`   | 结束时间占位符(仅range模式)         |
| **placeholder**          | `string`                    | `'请选择时间'`       | 单个时间占位符(仅single模式)        |
| **format**               | `string`                    | `'HH:mm'`            | 时间格式                            |
| **useHours**             | `boolean`                   | `true`               | 是否包含小时选择                    |
| **useMinutes**           | `boolean`                   | `true`               | 是否包含分钟选择                    |
| **useSeconds**           | `boolean`                   | `false`              | 是否包含秒选择                      |
| **hourStep**             | `number`                    | `1`                  | 小时步进值                          |
| **minuteStep**           | `number`                    | `30`                 | 分钟步进值                          |
| **secondStep**           | `number`                    | `1`                  | 秒步进值                            |
| **startTimeProps**       | `Partial<TimePickerProps>`  | `{}`                 | 开始时间选择器额外属性              |
| **endTimeProps**         | `Partial<TimePickerProps>`  | `{}`                 | 结束时间选择器额外属性              |
| **attrs**                | `Partial<TimePickerProps>`  | `{}`                 | 通用时间选择器属性                  |
| **defaultStartTime**     | `number \| null`            | `null`               | 默认开始时间值                      |
| **defaultEndTime**       | `number \| null`            | `null`               | 默认结束时间值                      |
| **defaultSingleTime**    | `number \| null`            | `null`               | 默认单个时间值                      |
| **enableTimeRestriction** | `boolean`                   | `false`              | 是否启用智能时间限制                |

### Events

| 事件名            | 参数                                        | 说明                              |
| ----------------- | ------------------------------------------- | --------------------------------- |
| **change-range**  | `(startTime: number \| null, endTime: number \| null)` | 时间段改变事件(仅range模式)       |
| **change-single** | `(time: number \| null)`                    | 单个时间改变事件(仅single模式)    |
| **change-start**  | `(time: number \| null)`                    | 开始时间改变事件                  |
| **change-end**    | `(time: number \| null)`                    | 结束时间改变事件                  |

### 类型定义

#### Props 接口

```typescript
interface Props {
  mode?: 'range' | 'single'
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
```

## 🎨 使用示例

### 场景 1: 工作时间设置

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
    
    <div v-if="workTimeDisplay" class="time-display">
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
    const start = new Date(startTime).toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    const end = new Date(endTime).toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    workTimeDisplay.value = `${start} - ${end}`
  } else {
    workTimeDisplay.value = ''
  }
}
</script>

<style scoped>
.work-time-setting {
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
}

.time-display {
  margin-top: 12px;
}
</style>
```

### 场景 2: 会议预约系统

```vue
<template>
  <div class="meeting-booking">
    <h3>会议预约</h3>
    <n-form :model="meetingForm" :rules="meetingRules" ref="formRef">
      <n-form-item label="会议标题" path="title">
        <n-input v-model:value="meetingForm.title" placeholder="请输入会议标题" />
      </n-form-item>
      
      <n-form-item label="会议时间" path="timeRange">
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

      <n-form-item label="提醒时间" path="reminderTime">
        <C_Time 
          mode="single"
          placeholder="提前提醒时间"
          format="HH:mm"
          :minute-step="5"
          @change-single="handleReminderTimeChange"
        />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" @click="handleSubmit">预约会议</n-button>
        <n-button @click="handleReset">重置</n-button>
      </n-form-item>
    </n-form>

    <!-- 预约结果展示 -->
    <div v-if="bookingResult" class="booking-result">
      <n-alert type="success" title="预约成功">
        <p>会议: {{ bookingResult.title }}</p>
        <p>时间: {{ bookingResult.timeRange }}</p>
        <p>提醒: {{ bookingResult.reminder }}</p>
      </n-alert>
    </div>
  </div>
</template>

<script setup>
const formRef = ref()
const meetingForm = ref({
  title: '',
  timeRange: null,
  reminderTime: null
})

const bookingResult = ref(null)

const meetingRules = {
  title: {
    required: true,
    message: '请输入会议标题',
    trigger: 'blur'
  },
  timeRange: {
    validator: (rule, value) => {
      if (!value || !value.start || !value.end) {
        return new Error('请选择会议时间')
      }
      return true
    },
    trigger: 'change'
  }
}

const handleMeetingTimeChange = (startTime, endTime) => {
  meetingForm.value.timeRange = startTime && endTime ? {
    start: startTime,
    end: endTime
  } : null
}

const handleReminderTimeChange = (time) => {
  meetingForm.value.reminderTime = time
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      const { timeRange, reminderTime } = meetingForm.value
      
      bookingResult.value = {
        title: meetingForm.value.title,
        timeRange: `${formatTime(timeRange.start)} - ${formatTime(timeRange.end)}`,
        reminder: reminderTime ? `提前 ${formatTime(reminderTime)} 提醒` : '无提醒'
      }
    }
  })
}

const handleReset = () => {
  meetingForm.value = {
    title: '',
    timeRange: null,
    reminderTime: null
  }
  bookingResult.value = null
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
.meeting-booking {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

.booking-result {
  margin-top: 24px;
}
</style>
```

### 场景 3: 营业时间管理

```vue
<template>
  <div class="business-hours">
    <h3>营业时间管理</h3>
    <div class="hours-list">
      <div v-for="(day, index) in businessHours" :key="day.name" class="day-hours">
        <div class="day-info">
          <n-checkbox 
            v-model:checked="day.isOpen" 
            @update:checked="handleDayToggle(index)"
          >
            {{ day.name }}
          </n-checkbox>
          <n-tag v-if="!day.isOpen" type="warning" size="small">休息</n-tag>
        </div>

        <div v-if="day.isOpen" class="time-settings">
          <C_Time 
            mode="range"
            start-placeholder="开始营业"
            end-placeholder="结束营业"
            format="HH:mm"
            :minute-step="30"
            :enable-time-restriction="true"
            :default-start-time="day.startTime"
            :default-end-time="day.endTime"
            @change-range="handleBusinessTimeChange(index, $event)"
          />
        </div>
      </div>
    </div>

    <!-- 营业时间总览 -->
    <div class="hours-summary">
      <h4>营业时间总览</h4>
      <div class="summary-list">
        <div v-for="day in businessHours" :key="day.name" class="summary-item">
          <span class="day-name">{{ day.name }}:</span>
          <span class="day-hours">{{ getDayHoursText(day) }}</span>
        </div>
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

const handleDayToggle = (index) => {
  if (!businessHours.value[index].isOpen) {
    businessHours.value[index].startTime = null
    businessHours.value[index].endTime = null
  }
}

const handleBusinessTimeChange = (index, [startTime, endTime]) => {
  businessHours.value[index].startTime = startTime
  businessHours.value[index].endTime = endTime
}

const getDayHoursText = (day) => {
  if (!day.isOpen) return '休息'
  if (!day.startTime || !day.endTime) return '未设置'
  
  const start = new Date(day.startTime).toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  const end = new Date(day.endTime).toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  return `${start} - ${end}`
}
</script>

<style scoped>
.business-hours {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
}

.day-hours {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.day-info {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
}

.time-settings {
  flex: 1;
  margin-left: 16px;
}

.hours-summary {
  margin-top: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.day-name {
  font-weight: 500;
}
</style>
```

### 场景 4: 精确时间控制

```vue
<template>
  <div class="precise-time-control">
    <h3>精确时间控制</h3>
    
    <!-- 毫秒级时间选择 -->
    <div class="precision-section">
      <h4>高精度时间</h4>
      <C_Time 
        mode="single"
        placeholder="选择精确时间"
        format="HH:mm:ss"
        :use-seconds="true"
        :hour-step="1"
        :minute-step="1"
        :second-step="1"
        @change-single="handlePreciseTimeChange"
      />
      <p v-if="preciseTime" class="time-info">
        精确时间: {{ formatPreciseTime(preciseTime) }}
      </p>
    </div>

    <!-- 15分钟间隔时间 -->
    <div class="interval-section">
      <h4>15分钟间隔时间</h4>
      <C_Time 
        mode="range"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="HH:mm"
        :minute-step="15"
        :enable-time-restriction="true"
        @change-range="handleIntervalTimeChange"
      />
    </div>

    <!-- 自定义步进值 -->
    <div class="custom-step-section">
      <h4>自定义步进值</h4>
      <div class="step-controls">
        <n-input-number 
          v-model:value="customMinuteStep" 
          :min="1" 
          :max="30"
          placeholder="分钟步进"
        />
        <n-input-number 
          v-model:value="customSecondStep" 
          :min="1" 
          :max="30"
          placeholder="秒步进"
        />
      </div>
      
      <C_Time 
        mode="single"
        placeholder="自定义步进时间"
        format="HH:mm:ss"
        :use-seconds="true"
        :minute-step="customMinuteStep"
        :second-step="customSecondStep"
        @change-single="handleCustomStepTimeChange"
      />
    </div>
  </div>
</template>

<script setup>
const preciseTime = ref(null)
const customMinuteStep = ref(5)
const customSecondStep = ref(10)

const handlePreciseTimeChange = (time) => {
  preciseTime.value = time
}

const handleIntervalTimeChange = (startTime, endTime) => {
  console.log('间隔时间:', {
    start: startTime ? formatTime(startTime) : null,
    end: endTime ? formatTime(endTime) : null
  })
}

const handleCustomStepTimeChange = (time) => {
  console.log('自定义步进时间:', time ? formatPreciseTime(time) : null)
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatPreciseTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<style scoped>
.precise-time-control {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
}

.precision-section,
.interval-section,
.custom-step-section {
  margin-bottom: 32px;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
}

.step-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.time-info {
  margin-top: 8px;
  color: #666;
  font-size: 14px;
}
</style>
```

## 🛠️ 高级用法

### 动态配置时间格式

```vue
<template>
  <div class="dynamic-format">
    <n-radio-group v-model:value="timeFormat" @update:value="handleFormatChange">
      <n-radio value="HH:mm">小时:分钟</n-radio>
      <n-radio value="HH:mm:ss">小时:分钟:秒</n-radio>
      <n-radio value="mm:ss">分钟:秒</n-radio>
    </n-radio-group>

    <C_Time 
      mode="range"
      :format="timeFormat"
      :use-hours="includeHours"
      :use-minutes="includeMinutes"
      :use-seconds="includeSeconds"
      @change-range="handleTimeChange"
    />
  </div>
</template>

<script setup>
const timeFormat = ref('HH:mm')

const includeHours = computed(() => timeFormat.value.includes('HH'))
const includeMinutes = computed(() => timeFormat.value.includes('mm'))
const includeSeconds = computed(() => timeFormat.value.includes('ss'))

const handleFormatChange = (format) => {
  console.log('时间格式变更:', format)
}

const handleTimeChange = (startTime, endTime) => {
  console.log('时间变更:', { startTime, endTime })
}
</script>
```

### 条件性禁用控制

```vue
<template>
  <div class="conditional-disable">
    <n-switch 
      v-model:value="enableRestriction" 
      @update:value="handleRestrictionToggle"
    >
      <template #checked>启用时间限制</template>
      <template #unchecked>关闭时间限制</template>
    </n-switch>

    <C_Time 
      mode="range"
      :enable-time-restriction="enableRestriction"
      :start-time-props="startTimeProps"
      :end-time-props="endTimeProps"
      @change-range="handleTimeChange"
    />
  </div>
</template>

<script setup>
const enableRestriction = ref(true)

const startTimeProps = computed(() => ({
  disabled: !enableRestriction.value
}))

const endTimeProps = computed(() => ({
  disabled: !enableRestriction.value
}))

const handleRestrictionToggle = (enabled) => {
  console.log('时间限制:', enabled ? '启用' : '禁用')
}

const handleTimeChange = (startTime, endTime) => {
  if (enableRestriction.value && startTime && endTime && endTime <= startTime) {
    $message.warning('结束时间不能早于或等于开始时间')
  }
}
</script>
```

### 时间预设快捷选择

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
      @change-range="handleTimeChange"
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
    endTime: new Date().setHours(12, 0, 0, 0)
  },
  {
    label: '下午时段',
    startTime: new Date().setHours(14, 0, 0, 0),
    endTime: new Date().setHours(17, 0, 0, 0)
  },
  {
    label: '全天工作',
    startTime: new Date().setHours(9, 0, 0, 0),
    endTime: new Date().setHours(18, 0, 0, 0)
  }
]

const handlePresetSelect = (preset) => {
  selectedPreset.value = preset
  // 手动触发时间更新
  nextTick(() => {
    // 这里可以添加额外的预设选择逻辑
  })
}

const handleTimeChange = (startTime, endTime) => {
  console.log('时间选择:', { startTime, endTime })
}
</script>

<style scoped>
.preset-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
```

## 🔧 自定义样式

### CSS 变量

```scss
.c-time-wrapper {
  --time-primary-color: #1890ff;
  --time-border-color: #d9d9d9;
  --time-hover-border-color: #40a9ff;
  --time-focus-border-color: #1890ff;
  --time-separator-color: #666;
  --time-disabled-color: #f5f5f5;
}
```

### 自定义分隔符样式

```vue
<template>
  <C_Time mode="range" class="custom-separator" />
</template>

<style scoped>
.custom-separator :deep(.range-separator) {
  color: #1890ff;
  font-weight: bold;
  font-size: 14px;
  margin: 0 12px;
}

.custom-separator :deep(.time-range-container) {
  display: flex;
  align-items: center;
  gap: 0;
}
</style>
```

### 响应式布局

```vue
<template>
  <C_Time mode="range" class="responsive-time" />
</template>

<style scoped>
.responsive-time :deep(.time-range-container) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    
    .range-separator {
      display: none;
    }
  }
}
</style>
```

## ⚠️ 注意事项

### 1. 时间格式与配置一致性

```vue
<!-- ✅ 推荐：格式与配置一致 -->
<C_Time 
  format="HH:mm:ss" 
  :use-seconds="true" 
/>

<!-- ❌ 不推荐：格式与配置不匹配 -->
<C_Time 
  format="HH:mm:ss" 
  :use-seconds="false" 
/>
```

### 2. 智能时间限制使用

```vue
<!-- ✅ 推荐：在时间段选择中启用限制 -->
<C_Time 
  mode="range" 
  :enable-time-restriction="true" 
/>

<!-- ❌ 不推荐：在单个时间选择中启用限制（无效） -->
<C_Time 
  mode="single" 
  :enable-time-restriction="true" 
/>
```

### 3. 步进值设置合理性

```vue
<!-- ✅ 推荐：合理的步进值 -->
<C_Time :minute-step="15" :second-step="10" />

<!-- ❌ 不推荐：过大的步进值 -->
<C_Time :minute-step="45" :second-step="30" />
```

## 🐛 故障排除

### 常见问题

#### Q1: 结束时间无法选择怎么办？

**A1:** 检查以下几点：

1. 确认在 range 模式下已选择开始时间
2. 检查是否启用了 `enableTimeRestriction`
3. 确认时间选择器没有被禁用

```vue
<!-- 确保正确配置 -->
<C_Time 
  mode="range"
  :enable-time-restriction="true"
  @change-start="handleStartChange"
/>

<script setup>
const handleStartChange = (time) => {
  console.log('开始时间已选择:', time)
  // 现在可以选择结束时间了
}
</script>
```

#### Q2: 时间格式显示不正确？

**A2:** 检查格式配置：

```vue
<!-- ✅ 正确的格式配置 -->
<C_Time 
  format="HH:mm:ss"
  :use-hours="true"
  :use-minutes="true"
  :use-seconds="true"
/>

<!-- ❌ 格式字符串错误 -->
<C_Time format="hh:mm:ss" />  <!-- 应该使用 HH -->
```

#### Q3: 事件不触发怎么办？

**A3:** 确保正确监听事件：

```vue
<template>
  <C_Time 
    mode="range"
    @change-range="handleRangeChange"
    @change-start="handleStartChange"
    @change-end="handleEndChange"
  />
</template>

<script setup>
// 确保事件处理函数存在
const handleRangeChange = (startTime, endTime) => {
  console.log('时间段变更:', startTime, endTime)
}

const handleStartChange = (time) => {
  console.log('开始时间变更:', time)
}

const handleEndChange = (time) => {
  console.log('结束时间变更:', time)
}
</script>
```

#### Q4: 默认时间不生效？

**A4:** 检查默认值设置：

```vue
<script setup>
// ✅ 正确设置默认时间
const defaultStart = new Date().setHours(9, 0, 0, 0)
const defaultEnd = new Date().setHours(17, 0, 0, 0)
</script>

<template>
  <C_Time 
    mode="range"
    :default-start-time="defaultStart"
    :default-end-time="defaultEnd"
  />
</template>
```

## 🎯 最佳实践

### 1. 根据场景选择模式

```vue
<!-- ✅ 推荐：根据业务场景选择 -->
<!-- 工作时间设置：使用 range 模式 -->
<C_Time mode="range" />

<!-- 闹钟设置：使用 single 模式 -->
<C_Time mode="single" />

<!-- 会议时长：使用 range 模式 -->
<C_Time mode="range" :enable-time-restriction="true" />
```

### 2. 合理设置步进值

```vue
<template>
  <C_Time 
    :minute-step="businessMinuteStep"
    :second-step="businessSecondStep"
  />
</template>

<script setup>
// 根据业务精度要求设置步进值
const businessMinuteStep = computed(() => {
  // 预约类业务：15分钟步进
  if (businessType.value === 'appointment') return 15
  // 考勤类业务：1分钟步进
  if (businessType.value === 'attendance') return 1
  // 默认：5分钟步进
  return 5
})
</script>
```

### 3. 智能默认值

```vue
<script setup>
const intelligentDefaults = computed(() => {
  const now = new Date()
  const currentHour = now.getHours()
  
  // 根据当前时间智能设置默认值
  if (currentHour < 12) {
    // 上午：设置为上午工作时间
    return {
      start: new Date().setHours(9, 0, 0, 0),
      end: new Date().setHours(12, 0, 0, 0)
    }
  } else {
    // 下午：设置为下午工作时间
    return {
      start: new Date().setHours(14, 0, 0, 0),
      end: new Date().setHours(17, 0, 0, 0)
    }
  }
})
</script>

<template>
  <C_Time 
    mode="range"
    :default-start-time="intelligentDefaults.start"
    :default-end-time="intelligentDefaults.end"
  />
</template>
```

### 4. 表单验证集成

```vue
<template>
  <n-form :model="formData" :rules="timeRules">
    <n-form-item label="工作时间" path="workTime">
      <C_Time 
        mode="range"
        @change-range="handleWorkTimeChange"
      />
    </n-form-item>
  </n-form>
</template>

<script setup>
const formData = ref({
  workTime: null
})

const timeRules = {
  workTime: {
    validator: (rule, value) => {
      if (!value || !value.start || !value.end) {
        return new Error('请选择完整的工作时间')
      }
      
      const duration = value.end - value.start
      const minDuration = 2 * 60 * 60 * 1000 // 2小时
      
      if (duration < minDuration) {
        return new Error('工作时间不能少于2小时')
      }
      
      return true
    },
    trigger: 'change'
  }
}

const handleWorkTimeChange = (startTime, endTime) => {
  formData.value.workTime = startTime && endTime ? {
    start: startTime,
    end: endTime
  } : null
}
</script>
```

## 📝 更新日志

### v1.0.0 (2025-06-02)

- ✨ 支持时间段和单个时间选择模式
- ✨ 智能时间限制功能
- ✨ 灵活的时间格式配置
- ✨ 完整的 TypeScript 支持
- ✨ 丰富的事件回调
- ✨ 高度可定制的配置选项

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved.

---

**💡 提示**: 这个组件设计用于团队协作，支持工作时间设置、会议预约、营业时间管理等多种场景。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀