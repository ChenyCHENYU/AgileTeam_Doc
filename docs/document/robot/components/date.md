---
outline: 'deep'
---

# C_Date 日期选择器组件

> 📅 基于 Naive UI 的智能日期选择器，让日期选择更智能、更便捷

## 🚀 特性

- **🔄 五种选择模式**: 单日期、日期时间、日期范围、日期时间范围、智能范围
- **🧠 智能联动限制**: 结束日期自动限制不早于开始日期
- **🚫 灵活禁用规则**: 支持禁用今天之前/之后的日期
- **⚙️ 高度可配置**: 支持占位符、格式化、额外属性传递
- **💪 TypeScript**: 完整的类型定义和类型安全
- **📡 丰富事件系统**: 多种日期变化事件回调
- **🔧 暴露接口**: 提供清空方法和内部状态访问
- **⚡ 响应式设计**: 自适应布局和样式

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 基于 Naive UI，确保已安装依赖
bun install naive-ui
```

```bash [pnpm]
# 基于 Naive UI，确保已安装依赖
pnpm install naive-ui
```

```bash [yarn]
# 基于 Naive UI，确保已安装依赖
yarn add naive-ui
```

```bash [npm]
# 基于 Naive UI，确保已安装依赖
npm install naive-ui
```

:::

## 🎯 快速开始

### 基础使用

```vue {3,6,9}
<template>
  <!-- 最简单的单日期选择 -->
  <C_Date mode="date" @change="handleDateChange" />

  <!-- 日期范围选择 -->
  <C_Date mode="daterange" @change="handleRangeChange" />

  <!-- 智能双日期选择 -->
  <C_Date mode="smart-range" @update:smartRange="handleSmartRangeChange" />
</template>

<script setup>
const handleDateChange = (value) => {
  console.log('日期变更:', value)
}

const handleRangeChange = (value) => {
  console.log('范围变更:', value)
}

const handleSmartRangeChange = (value) => {
  console.log('智能范围变更:', value)
}
</script>
```

::: details 🔄 五种选择模式 - 覆盖所有日期选择场景
```vue {7,16,25,34,43}
<template>
  <div class="date-modes-demo">
    <!-- 1. 单日期选择 -->
    <div class="demo-section">
      <h4>单日期选择</h4>
      <C_Date
        mode="date"
        placeholder="请选择日期"
        @update:singleDate="handleSingleDate"
      />
    </div>

    <!-- 2. 日期时间选择 -->
    <div class="demo-section">
      <h4>日期时间选择</h4>
      <C_Date
        mode="datetime"
        placeholder="请选择日期时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        @update:singleDateTime="handleSingleDateTime"
      />
    </div>

    <!-- 3. 日期范围选择 -->
    <div class="demo-section">
      <h4>日期范围选择</h4>
      <C_Date
        mode="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @update:dateRange="handleDateRange"
      />
    </div>

    <!-- 4. 日期时间范围选择 -->
    <div class="demo-section">
      <h4>日期时间范围选择</h4>
      <C_Date
        mode="datetimerange"
        start-placeholder="开始日期时间"
        end-placeholder="结束日期时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        @update:dateTimeRange="handleDateTimeRange"
      />
    </div>

    <!-- 5. 智能双日期选择 -->
    <div class="demo-section">
      <h4>智能双日期选择</h4>
      <C_Date
        mode="smart-range"
        start-placeholder="选择开始日期"
        end-placeholder="选择结束日期"
        @update:smartRange="handleSmartRange"
      />
    </div>
  </div>
</template>

<script setup>
const handleSingleDate = (value) => {
  console.log('单日期:', value)
}

const handleSingleDateTime = (value) => {
  console.log('日期时间:', value)
}

const handleDateRange = (value) => {
  console.log('日期范围:', value)
}

const handleDateTimeRange = (value) => {
  console.log('日期时间范围:', value)
}

const handleSmartRange = (value) => {
  console.log('智能范围:', value)
}
</script>

<style scoped>
.demo-section {
  margin-bottom: 20px;
  padding: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
}
</style>
```
:::

## 📖 API 文档

### Props

| 参数                    | 类型                                                                      | 默认值         | 说明                       |
| ----------------------- | ------------------------------------------------------------------------- | -------------- | -------------------------- |
| **mode**                | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'smart-range'` | `'date'`       | 日期选择器模式             |
| **placeholder**         | `string`                                                                  | `''`           | 占位符文本(单日期模式)     |
| **startPlaceholder**    | `string`                                                                  | `''`           | 开始日期占位符(范围模式)   |
| **endPlaceholder**      | `string`                                                                  | `''`           | 结束日期占位符(范围模式)   |
| **disabled**            | `boolean`                                                                 | `false`        | 是否禁用                   |
| **disabledBeforeToday** | `boolean`                                                                 | `false`        | 是否禁用今天之前的日期     |
| **disabledAfterToday**  | `boolean`                                                                 | `false`        | 是否禁用今天之后的日期     |
| **valueFormat**         | `string`                                                                  | `'yyyy-MM-dd'` | 值格式化字符串             |
| **startDateProps**      | `Record<string, any>`                                                     | `{}`           | 开始日期额外属性(智能范围) |
| **endDateProps**        | `Record<string, any>`                                                     | `{}`           | 结束日期额外属性(智能范围) |

### Events

| 事件名                    | 参数                                          | 说明                 |
| ------------------------- | --------------------------------------------- | -------------------- |
| **update:singleDate**     | `(value: number \| null)`                     | 单日期变化事件       |
| **update:singleDateTime** | `(value: number \| null)`                     | 单日期时间变化事件   |
| **update:dateRange**      | `(value: [number, number] \| null)`           | 日期范围变化事件     |
| **update:dateTimeRange**  | `(value: [number, number] \| null)`           | 日期时间范围变化事件 |
| **update:smartRange**     | `(value: [number, number] \| null)`           | 智能范围变化事件     |
| **change**                | `(value: number \| [number, number] \| null)` | 通用变化事件         |

### 暴露方法

| 方法名       | 参数 | 返回值 | 说明           |
| ------------ | ---- | ------ | -------------- |
| **clearAll** | -    | `void` | 清空所有日期值 |

### 暴露属性

| 属性名             | 类型                            | 说明             |
| ------------------ | ------------------------------- | ---------------- |
| **singleDate**     | `Ref<number \| null>`           | 单日期值         |
| **singleDateTime** | `Ref<number \| null>`           | 单日期时间值     |
| **dateRange**      | `Ref<[number, number] \| null>` | 日期范围值       |
| **dateTimeRange**  | `Ref<[number, number] \| null>` | 日期时间范围值   |
| **startDate**      | `Ref<number \| null>`           | 智能范围开始日期 |
| **endDate**        | `Ref<number \| null>`           | 智能范围结束日期 |

::: details 🔧 类型定义 - 完整的 TypeScript 接口
#### 日期选择器模式

```typescript
type DatePickerMode =
  | 'date' // 单日期选择
  | 'datetime' // 日期时间选择
  | 'daterange' // 日期范围选择
  | 'datetimerange' // 日期时间范围选择
  | 'smart-range' // 智能双日期选择
```

#### 日期值类型

```typescript
type DateValue = number | null
type DateRangeValue = [number, number] | null
```
:::

## 🎨 使用示例

::: details 🏖️ 假期申请系统 - 智能假期时间选择
```vue {14,15,16,17,18}
<template>
  <div class="vacation-application">
    <h3>假期申请</h3>
    <n-form :model="vacationForm" :rules="vacationRules" ref="formRef">
      <n-form-item label="假期类型" path="type">
        <n-select
          v-model:value="vacationForm.type"
          :options="vacationTypes"
          placeholder="请选择假期类型"
        />
      </n-form-item>

      <n-form-item label="假期时间" path="dateRange">
        <C_Date
          mode="smart-range"
          start-placeholder="假期开始日期"
          end-placeholder="假期结束日期"
          :disabled-before-today="true"
          @update:smartRange="handleVacationDateChange"
        />
      </n-form-item>

      <n-form-item label="申请原因" path="reason">
        <n-input
          v-model:value="vacationForm.reason"
          type="textarea"
          placeholder="请填写申请原因"
          :rows="3"
        />
      </n-form-item>

      <n-form-item>
        <n-button type="primary" @click="handleSubmit">提交申请</n-button>
        <n-button @click="handleReset">重置</n-button>
      </n-form-item>
    </n-form>

    <!-- 申请结果 -->
    <div v-if="applicationResult" class="application-result">
      <n-alert type="success" title="申请提交成功">
        <p>假期类型: {{ applicationResult.typeName }}</p>
        <p>假期时间: {{ applicationResult.dateRange }}</p>
        <p>假期天数: {{ applicationResult.days }} 天</p>
      </n-alert>
    </div>
  </div>
</template>

<script setup>
const formRef = ref()
const vacationForm = ref({
  type: null,
  dateRange: null,
  reason: '',
})

const applicationResult = ref(null)

const vacationTypes = [
  { label: '年假', value: 'annual' },
  { label: '病假', value: 'sick' },
  { label: '事假', value: 'personal' },
  { label: '调休', value: 'compensatory' },
]

const vacationRules = {
  type: {
    required: true,
    message: '请选择假期类型',
    trigger: 'change',
  },
  dateRange: {
    validator: (rule, value) => {
      if (!value || !Array.isArray(value) || value.length !== 2) {
        return new Error('请选择完整的假期时间')
      }

      const [start, end] = value
      const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

      if (daysDiff > 30) {
        return new Error('单次假期申请不能超过30天')
      }

      return true
    },
    trigger: 'change',
  },
  reason: {
    required: true,
    message: '请填写申请原因',
    trigger: 'blur',
  },
}

const handleVacationDateChange = (value) => {
  vacationForm.value.dateRange = value
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      const { type, dateRange, reason } = vacationForm.value
      const typeName = vacationTypes.find((t) => t.value === type)?.label
      const [start, end] = dateRange
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1

      applicationResult.value = {
        typeName,
        dateRange: `${formatDate(start)} 至 ${formatDate(end)}`,
        days,
      }
    }
  })
}

const handleReset = () => {
  vacationForm.value = {
    type: null,
    dateRange: null,
    reason: '',
  }
  applicationResult.value = null
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.vacation-application {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
}

.application-result {
  margin-top: 24px;
}
</style>
```
:::

::: details 🎉 活动报名时间管理 - 报名时间限制配置
```vue {15,16,17,18,25,26,27,28,29,30}
<template>
  <div class="event-registration">
    <h3>活动报名时间设置</h3>
    <n-card title="活动基本信息">
      <n-form :model="eventForm" label-placement="left" label-width="120px">
        <n-form-item label="活动名称">
          <n-input
            v-model:value="eventForm.name"
            placeholder="请输入活动名称"
          />
        </n-form-item>

        <n-form-item label="活动日期">
          <C_Date
            mode="daterange"
            start-placeholder="活动开始日期"
            end-placeholder="活动结束日期"
            :disabled-before-today="true"
            @update:dateRange="handleEventDateChange"
          />
        </n-form-item>

        <n-form-item label="报名时间">
          <C_Date
            mode="smart-range"
            start-placeholder="报名开始时间"
            end-placeholder="报名截止时间"
            :disabled-before-today="true"
            :end-date-props="registrationEndDateProps"
            @update:smartRange="handleRegistrationDateChange"
          />
        </n-form-item>

        <n-form-item label="活动描述">
          <n-input
            v-model:value="eventForm.description"
            type="textarea"
            placeholder="请输入活动描述"
            :rows="3"
          />
        </n-form-item>

        <n-form-item>
          <n-button type="primary" @click="handleSaveEvent">保存活动</n-button>
          <n-button @click="handlePreviewEvent">预览</n-button>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- 活动预览 -->
    <n-card v-if="eventPreview" title="活动预览" class="mt-4">
      <div class="event-preview">
        <h4>{{ eventPreview.name }}</h4>
        <div class="event-info">
          <p><strong>活动时间:</strong> {{ eventPreview.eventDate }}</p>
          <p><strong>报名时间:</strong> {{ eventPreview.registrationDate }}</p>
          <p><strong>活动描述:</strong> {{ eventPreview.description }}</p>
          <n-tag :type="eventPreview.registrationStatus.type">
            {{ eventPreview.registrationStatus.text }}
          </n-tag>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
const eventForm = ref({
  name: '',
  eventDate: null,
  registrationDate: null,
  description: '',
})

const eventPreview = ref(null)

// 报名截止时间不能晚于活动开始时间
const registrationEndDateProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    if (!eventForm.value.eventDate || !eventForm.value.eventDate[0]) {
      return false
    }

    const eventStartDate = eventForm.value.eventDate[0]
    return timestamp >= eventStartDate
  },
}))

const handleEventDateChange = (value) => {
  eventForm.value.eventDate = value
  // 如果活动日期改变，重置报名时间
  eventForm.value.registrationDate = null
}

const handleRegistrationDateChange = (value) => {
  eventForm.value.registrationDate = value
}

const handleSaveEvent = () => {
  if (validateEventForm()) {
    // 保存逻辑
    $message.success('活动保存成功')
    handlePreviewEvent()
  }
}

const handlePreviewEvent = () => {
  if (!validateEventForm()) return

  const { name, eventDate, registrationDate, description } = eventForm.value

  eventPreview.value = {
    name,
    eventDate: `${formatDate(eventDate[0])} 至 ${formatDate(eventDate[1])}`,
    registrationDate: `${formatDate(registrationDate[0])} 至 ${formatDate(
      registrationDate[1]
    )}`,
    description,
    registrationStatus: getRegistrationStatus(registrationDate),
  }
}

const validateEventForm = () => {
  const { name, eventDate, registrationDate } = eventForm.value

  if (!name || !eventDate || !registrationDate) {
    $message.warning('请填写完整的活动信息')
    return false
  }

  return true
}

const getRegistrationStatus = (registrationDate) => {
  if (!registrationDate) return { type: 'default', text: '未设置' }

  const now = Date.now()
  const [start, end] = registrationDate

  if (now < start) {
    return { type: 'info', text: '报名未开始' }
  } else if (now >= start && now <= end) {
    return { type: 'success', text: '报名进行中' }
  } else {
    return { type: 'error', text: '报名已截止' }
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.event-registration {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}

.event-preview {
  padding: 16px;
}

.event-info p {
  margin: 8px 0;
}
</style>
```
:::

::: details 📊 财务报表查询 - 动态时间范围和快捷选择
```vue {18,19,20,21,22}
<template>
  <div class="financial-report">
    <h3>财务报表查询</h3>
    <n-card>
      <div class="query-form">
        <div class="form-row">
          <n-form-item label="报表类型">
            <n-select
              v-model:value="queryForm.reportType"
              :options="reportTypes"
              placeholder="请选择报表类型"
              @update:value="handleReportTypeChange"
            />
          </n-form-item>

          <n-form-item label="查询时间">
            <C_Date
              :mode="datePickerMode"
              :start-placeholder="startPlaceholder"
              :end-placeholder="endPlaceholder"
              :disabled-after-today="true"
              value-format="yyyy-MM-dd"
              @change="handleDateChange"
            />
          </n-form-item>

          <n-form-item>
            <n-button type="primary" @click="handleQuery" :loading="querying">
              查询报表
            </n-button>
            <n-button @click="handleExport" :disabled="!reportData">
              导出报表
            </n-button>
          </n-form-item>
        </div>

        <!-- 快捷日期选择 -->
        <div class="quick-dates">
          <span class="quick-label">快捷选择:</span>
          <n-button
            v-for="quick in quickDates"
            :key="quick.label"
            size="small"
            @click="handleQuickDate(quick)"
          >
            {{ quick.label }}
          </n-button>
        </div>
      </div>

      <!-- 报表结果 -->
      <div v-if="reportData" class="report-result">
        <n-divider title-placement="left">
          {{ queryForm.reportTypeName }} - {{ reportPeriod }}
        </n-divider>

        <div class="report-summary">
          <n-statistic
            v-for="item in reportData.summary"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            :precision="2"
          />
        </div>

        <n-data-table
          :columns="reportColumns"
          :data="reportData.details"
          :pagination="pagination"
        />
      </div>
    </n-card>
  </div>
</template>

<script setup>
const queryForm = ref({
  reportType: 'daily',
  reportTypeName: '日报表',
  dateValue: null,
})

const reportData = ref(null)
const querying = ref(false)

const reportTypes = [
  { label: '日报表', value: 'daily' },
  { label: '周报表', value: 'weekly' },
  { label: '月报表', value: 'monthly' },
  { label: '自定义区间', value: 'custom' },
]

const quickDates = computed(() => {
  const today = new Date()
  const getDateTimestamp = (date) => {
    date.setHours(0, 0, 0, 0)
    return date.getTime()
  }

  return [
    {
      label: '今天',
      value: getDateTimestamp(new Date(today)),
      mode: 'date',
    },
    {
      label: '本周',
      value: [
        getDateTimestamp(
          new Date(today.getTime() - today.getDay() * 24 * 60 * 60 * 1000)
        ),
        getDateTimestamp(new Date(today)),
      ],
      mode: 'range',
    },
    {
      label: '本月',
      value: [
        getDateTimestamp(new Date(today.getFullYear(), today.getMonth(), 1)),
        getDateTimestamp(new Date(today)),
      ],
      mode: 'range',
    },
  ]
})

// 根据报表类型确定日期选择器模式
const datePickerMode = computed(() => {
  const { reportType } = queryForm.value
  if (reportType === 'daily') return 'date'
  if (reportType === 'custom') return 'daterange'
  return 'daterange'
})

const startPlaceholder = computed(() => {
  const { reportType } = queryForm.value
  const placeholders = {
    weekly: '选择周开始日期',
    monthly: '选择月份开始',
    custom: '自定义开始日期',
  }
  return placeholders[reportType] || '开始日期'
})

const endPlaceholder = computed(() => {
  const { reportType } = queryForm.value
  const placeholders = {
    weekly: '选择周结束日期',
    monthly: '选择月份结束',
    custom: '自定义结束日期',
  }
  return placeholders[reportType] || '结束日期'
})

const reportPeriod = computed(() => {
  if (!queryForm.value.dateValue) return ''

  if (Array.isArray(queryForm.value.dateValue)) {
    const [start, end] = queryForm.value.dateValue
    return `${formatDate(start)} 至 ${formatDate(end)}`
  } else {
    return formatDate(queryForm.value.dateValue)
  }
})

const reportColumns = [
  { title: '日期', key: 'date' },
  {
    title: '收入',
    key: 'income',
    render: (row) => `¥${row.income.toFixed(2)}`,
  },
  {
    title: '支出',
    key: 'expense',
    render: (row) => `¥${row.expense.toFixed(2)}`,
  },
  {
    title: '净利润',
    key: 'profit',
    render: (row) => `¥${row.profit.toFixed(2)}`,
  },
]

const pagination = {
  pageSize: 10,
}

const handleReportTypeChange = (value) => {
  const reportType = reportTypes.find((t) => t.value === value)
  queryForm.value.reportTypeName = reportType?.label || ''
  queryForm.value.dateValue = null
}

const handleDateChange = (value) => {
  queryForm.value.dateValue = value
}

const handleQuickDate = (quick) => {
  queryForm.value.dateValue = quick.value
  // 如果需要，可以自动触发查询
  handleQuery()
}

const handleQuery = async () => {
  if (!queryForm.value.dateValue) {
    $message.warning('请选择查询时间')
    return
  }

  querying.value = true

  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 模拟报表数据
    reportData.value = {
      summary: [
        { label: '总收入', value: 125680.5 },
        { label: '总支出', value: 89420.3 },
        { label: '净利润', value: 36260.2 },
        { label: '利润率', value: 28.86 },
      ],
      details: generateMockReportData(),
    }

    $message.success('报表查询成功')
  } catch (error) {
    $message.error('报表查询失败')
  } finally {
    querying.value = false
  }
}

const handleExport = () => {
  // 导出逻辑
  $message.success('报表导出成功')
}

const generateMockReportData = () => {
  // 生成模拟报表数据
  const data = []
  for (let i = 0; i < 15; i++) {
    const income = Math.random() * 10000 + 5000
    const expense = Math.random() * 8000 + 3000
    data.push({
      date: formatDate(Date.now() - i * 24 * 60 * 60 * 1000),
      income,
      expense,
      profit: income - expense,
    })
  }
  return data.reverse()
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.financial-report {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.query-form {
  margin-bottom: 24px;
}

.form-row {
  display: flex;
  gap: 16px;
  align-items: end;
  margin-bottom: 16px;
}

.form-row .n-form-item {
  margin-bottom: 0;
}

.quick-dates {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
}

.quick-label {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
}

.report-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.report-result {
  margin-top: 24px;
}
</style>
```
:::

## 🛠️ 高级用法

::: details 🔒 动态禁用规则 - 智能日期限制
```vue {9,10,14,15,16,17,18,19,20,21,25,26,27,28,29,30}
<template>
  <div class="dynamic-disable">
    <n-switch v-model:value="weekendsOnly" @update:value="handleWeekendToggle">
      <template #checked>仅工作日</template>
      <template #unchecked>全部日期</template>
    </n-switch>

    <C_Date
      mode="daterange"
      :start-date-props="dynamicStartProps"
      :end-date-props="dynamicEndProps"
      @change="handleDateChange"
    />
  </div>
</template>

<script setup>
const weekendsOnly = ref(false)

const dynamicStartProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    if (!weekendsOnly.value) return false

    const date = new Date(timestamp)
    const dayOfWeek = date.getDay()
    // 禁用周末（0=周日, 6=周六）
    return dayOfWeek === 0 || dayOfWeek === 6
  },
}))

const dynamicEndProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    if (!weekendsOnly.value) return false

    const date = new Date(timestamp)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  },
}))

const handleWeekendToggle = (value) => {
  console.log('工作日模式:', value)
}

const handleDateChange = (value) => {
  console.log('日期变更:', value)
}
</script>
```
:::

::: details 🎨 自定义格式化 - 多种日期格式支持
```vue {12,15}
<template>
  <div class="custom-format">
    <n-radio-group
      v-model:value="dateFormat"
      @update:value="handleFormatChange"
    >
      <n-radio value="yyyy-MM-dd">标准格式 (2024-01-01)</n-radio>
      <n-radio value="yyyy/MM/dd">斜杠格式 (2024/01/01)</n-radio>
      <n-radio value="MM-dd-yyyy">美式格式 (01-01-2024)</n-radio>
      <n-radio value="dd/MM/yyyy">欧式格式 (01/01/2024)</n-radio>
    </n-radio-group>

    <C_Date
      mode="daterange"
      :value-format="dateFormat"
      @change="handleDateChange"
    />

    <p v-if="formattedResult">格式化结果: {{ formattedResult }}</p>
  </div>
</template>

<script setup>
const dateFormat = ref('yyyy-MM-dd')
const formattedResult = ref('')

const handleFormatChange = (format) => {
  console.log('格式变更:', format)
}

const handleDateChange = (value) => {
  if (value && Array.isArray(value)) {
    const [start, end] = value
    formattedResult.value = `${formatTimestamp(start)} 至 ${formatTimestamp(
      end
    )}`
  }
}

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('zh-CN')
}
</script>
```
:::

::: details 🔗 联动多个日期选择器 - 项目阶段时间级联
```vue {13,14,15,16,24,25,26,27,28,35,36,37,38,39}
<template>
  <div class="cascading-dates">
    <h4>项目阶段时间设置</h4>

    <div class="phase-dates">
      <div class="phase-item">
        <label>需求分析阶段</label>
        <C_Date
          mode="smart-range"
          start-placeholder="需求分析开始"
          end-placeholder="需求分析结束"
          :disabled-before-today="true"
          @update:smartRange="handlePhase1Change"
        />
      </div>

      <div class="phase-item">
        <label>开发阶段</label>
        <C_Date
          mode="smart-range"
          start-placeholder="开发开始"
          end-placeholder="开发结束"
          :start-date-props="phase2StartProps"
          :end-date-props="phase2EndProps"
          @update:smartRange="handlePhase2Change"
        />
      </div>

      <div class="phase-item">
        <label>测试阶段</label>
        <C_Date
          mode="smart-range"
          start-placeholder="测试开始"
          end-placeholder="测试结束"
          :start-date-props="phase3StartProps"
          :end-date-props="phase3EndProps"
          @update:smartRange="handlePhase3Change"
        />
      </div>
    </div>

    <!-- 时间线预览 -->
    <div v-if="hasAllPhases" class="timeline-preview">
      <h5>项目时间线预览</h5>
      <div class="timeline">
        <div
          v-for="phase in phaseTimeline"
          :key="phase.name"
          class="timeline-item"
        >
          <div class="phase-name">{{ phase.name }}</div>
          <div class="phase-duration">{{ phase.duration }}</div>
          <div class="phase-dates">{{ phase.dates }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const phase1Date = ref(null) // 需求分析
const phase2Date = ref(null) // 开发
const phase3Date = ref(null) // 测试

// 开发阶段不能早于需求分析结束
const phase2StartProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    if (!phase1Date.value || !phase1Date.value[1]) return false
    return timestamp < phase1Date.value[1]
  },
}))

const phase2EndProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    // 开发结束时间限制逻辑
    return false
  },
}))

// 测试阶段不能早于开发结束
const phase3StartProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    if (!phase2Date.value || !phase2Date.value[1]) return false
    return timestamp < phase2Date.value[1]
  },
}))

const phase3EndProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    // 测试结束时间限制逻辑
    return false
  },
}))

const hasAllPhases = computed(() => {
  return phase1Date.value && phase2Date.value && phase3Date.value
})

const phaseTimeline = computed(() => {
  if (!hasAllPhases.value) return []

  return [
    {
      name: '需求分析',
      duration: calculateDuration(phase1Date.value),
      dates: formatDateRange(phase1Date.value),
    },
    {
      name: '开发阶段',
      duration: calculateDuration(phase2Date.value),
      dates: formatDateRange(phase2Date.value),
    },
    {
      name: '测试阶段',
      duration: calculateDuration(phase3Date.value),
      dates: formatDateRange(phase3Date.value),
    },
  ]
})

const handlePhase1Change = (value) => {
  phase1Date.value = value
  // 重置后续阶段
  if (value) {
    phase2Date.value = null
    phase3Date.value = null
  }
}

const handlePhase2Change = (value) => {
  phase2Date.value = value
  // 重置测试阶段
  if (value) {
    phase3Date.value = null
  }
}

const handlePhase3Change = (value) => {
  phase3Date.value = value
}

const calculateDuration = (dateRange) => {
  if (!dateRange) return '未设置'
  const [start, end] = dateRange
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
  return `${days} 天`
}

const formatDateRange = (dateRange) => {
  if (!dateRange) return '未设置'
  const [start, end] = dateRange
  return `${formatDate(start)} - ${formatDate(end)}`
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.cascading-dates {
  max-width: 600px;
}

.phase-dates {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;
}

.phase-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.phase-item label {
  min-width: 100px;
  font-weight: 500;
}

.timeline-preview {
  margin-top: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 100px 80px 1fr;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e8e8e8;
}

.phase-name {
  font-weight: 500;
}

.phase-duration {
  color: #1890ff;
  font-weight: 500;
}

.phase-dates {
  color: #666;
}
</style>
```
:::

## 🔧 自定义样式

::: details 🎨 CSS 变量定制 - 主题色彩配置
```scss
.c-date-wrapper {
  --date-primary-color: #1890ff;
  --date-border-color: #d9d9d9;
  --date-hover-border-color: #40a9ff;
  --date-focus-border-color: #1890ff;
  --date-disabled-bg-color: #f5f5f5;
  --date-disabled-text-color: #ccc;
}
```
:::

::: details 📱 响应式布局 - 移动端适配
```vue
<template>
  <C_Date mode="smart-range" class="responsive-date" />
</template>

<style scoped>
.responsive-date {
  width: 100%;

  :deep(.flex) {
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
    }
  }

  :deep(.flex-1) {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
```
:::

::: details 🌈 自定义间距样式 - 组件间距调整
```vue
<template>
  <C_Date mode="smart-range" class="custom-spacing" />
</template>

<style scoped>
.custom-spacing :deep(.gap-2\.5) {
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
}
</style>
```
:::

## ⚠️ 注意事项

### 1. 模式选择

::: code-group

```vue [✅ 推荐] {2,4}
<!-- 根据需求选择合适的模式 -->
<C_Date mode="smart-range" />
<!-- 需要联动限制时 -->
<C_Date mode="daterange" />
<!-- 简单范围选择时 -->
```

```vue [❌ 不推荐]
<!-- 所有场景都使用同一种模式 -->
<C_Date mode="daterange" />
<!-- 所有场景 -->
```

:::

### 2. 禁用规则设置

::: code-group

```vue [✅ 推荐] {4}
<!-- 合理设置禁用规则 -->
<C_Date
  :disabled-before-today="true"  <!-- 预约类业务 -->
  :disabled-after-today="false"
/>
```

```vue [❌ 不推荐] {4}
<!-- 过度限制 -->
<C_Date
  :disabled-before-today="true"
  :disabled-after-today="true"  <!-- 只能选今天 -->
/>
```

:::

### 3. 事件监听

::: code-group

```vue [✅ 推荐] {4}
<!-- 监听具体事件 -->
<C_Date
  mode="smart-range"
  @update:smartRange="handleSmartRange"
/>
```

```vue [❌ 不推荐] {4}
<!-- 只监听通用事件 -->
<C_Date
  mode="smart-range"
  @change="handleChange"  <!-- 不如具体事件清晰 -->
/>
```

:::

## 🐛 故障排除

### 常见问题

::: details ❓ Q1: 智能范围模式结束日期无法选择？
**A1:** 检查以下几点：

1. 确认已选择开始日期
2. 检查禁用规则设置
3. 确认事件监听正确

```vue {2}
<!-- 确保正确配置 -->
<C_Date mode="smart-range" @update:smartRange="handleSmartRange" />

<script setup>
const handleSmartRange = (value) => {
  console.log('智能范围变更:', value)
  // 确保事件处理函数存在
}
</script>
```
:::

::: details ❓ Q2: 日期格式显示不正确？
**A2:** 检查 valueFormat 设置：

::: code-group

```vue [✅ 正确] {4}
<!-- 正确的格式设置 -->
<C_Date
  mode="datetime"
  value-format="yyyy-MM-dd HH:mm:ss"
/>
```

```vue [❌ 错误] {4}
<!-- 格式字符串错误 -->
<C_Date
  mode="datetime"
  value-format="YYYY-mm-dd"  <!-- 应该是 yyyy-MM-dd -->
/>
```

:::

::: details ❓ Q3: 禁用规则不生效？
**A3:** 确保使用正确的属性：

```vue {5,6}
<template>
  <C_Date
    mode="smart-range"
    :start-date-props="startProps"
    :end-date-props="endProps"
  />
</template>

<script setup>
const startProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    // 禁用逻辑
    return false
  },
}))

const endProps = computed(() => ({
  isDateDisabled: (timestamp) => {
    // 禁用逻辑
    return false
  },
}))
</script>
```
:::

::: details ❓ Q4: 清空功能不工作？
**A4:** 使用暴露的 clearAll 方法：

```vue {2,7}
<template>
  <C_Date ref="datePickerRef" />
  <n-button @click="handleClear">清空日期</n-button>
</template>

<script setup>
const datePickerRef = ref()

const handleClear = () => {
  datePickerRef.value?.clearAll()
}
</script>
```
:::

## 🎯 最佳实践

### 1. 根据业务场景选择模式

```vue {3,6,9}
<!-- ✅ 推荐：根据业务特点选择 -->
<!-- 预约业务：使用智能范围，禁用过去日期 -->
<C_Date mode="smart-range" :disabled-before-today="true" />

<!-- 报表查询：使用普通范围，允许历史日期 -->
<C_Date mode="daterange" :disabled-after-today="true" />

<!-- 生日选择：使用单日期，禁用未来日期 -->
<C_Date mode="date" :disabled-after-today="true" />
```

### 2. 合理的默认值设置

```vue
<script setup>
const getIntelligentDefaults = () => {
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  // 根据业务类型设置不同的默认值
  return {
    booking: [tomorrow.getTime(), nextWeek.getTime()], // 预约：明天到下周
    report: [
      new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
      now.getTime(),
    ], // 报表：本月
    vacation: null, // 假期：无默认值，用户自选
  }
}
</script>
```

### 3. 表单验证集成

```vue {5,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27}
<template>
  <n-form :model="formData" :rules="dateRules">
    <n-form-item label="活动时间" path="eventDate">
      <C_Date mode="smart-range" @update:smartRange="handleEventDateChange" />
    </n-form-item>
  </n-form>
</template>

<script setup>
const formData = ref({
  eventDate: null,
})

const dateRules = {
  eventDate: {
    validator: (rule, value) => {
      if (!value || !Array.isArray(value) || value.length !== 2) {
        return new Error('请选择完整的活动时间')
      }

      const [start, end] = value
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1

      if (duration < 1) {
        return new Error('活动时间至少为1天')
      }

      if (duration > 30) {
        return new Error('活动时间不能超过30天')
      }

      return true
    },
    trigger: 'change',
  },
}

const handleEventDateChange = (value) => {
  formData.value.eventDate = value
}
</script>
```

### 4. 性能优化

```vue {3,6,7,8,9,10,11,12,13,14,17,18,19}
<script setup>
// 使用计算属性优化禁用函数
const disabledDateCache = new Map()

const optimizedDisabledDate = computed(() => {
  return (timestamp) => {
    // 使用缓存避免重复计算
    if (disabledDateCache.has(timestamp)) {
      return disabledDateCache.get(timestamp)
    }

    const result = calculateDisabledDate(timestamp)
    disabledDateCache.set(timestamp, result)
    return result
  }
})

// 清理缓存
onUnmounted(() => {
  disabledDateCache.clear()
})
</script>
```

## 📝 更新日志

### v1.0.0 (2025-07-14)

- ✨ 支持五种日期选择模式
- ✨ 智能联动限制功能
- ✨ 灵活的禁用规则配置
- ✨ 完整的 TypeScript 支持
- ✨ 丰富的事件系统
- ✨ 暴露清空方法和内部状态

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个组件设计用于团队协作，支持假期申请、活动报名、财务报表、任务跟踪等多种场景。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀