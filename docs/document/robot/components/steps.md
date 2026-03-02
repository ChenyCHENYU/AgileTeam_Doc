---
outline: 'deep'
---

# C_Steps 步骤条组件

> 📋 引导用户按照流程完成任务的步骤条组件，支持横向和纵向布局

## 🚀 在线演示

<DemoIframe src="/preview/steps" title="步骤条" height="700" />


## ✨ 特性

- **📐 双向布局**: 支持水平和垂直两种布局方向
- **🎯 状态管理**: 自动计算步骤状态（等待、进行中、完成、错误）
- **🖱️ 交互支持**: 可选择是否支持点击切换步骤
- **🎨 自定义图标**: 支持自定义步骤图标
- **⏰ 时间显示**: 支持显示步骤完成时间
- **📝 详细描述**: 支持步骤描述和详情信息
- **🚫 禁用状态**: 支持单独禁用某个步骤

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

### 基础用法

```vue {2-5}
<template>
  <C_Steps 
    v-model:current="currentStep" 
    :steps="steps" 
  />
</template>

<script setup>
const currentStep = ref(1)

const steps = [
  {
    title: '填写基本信息',
    description: '请填写您的基本信息'
  },
  {
    title: '验证身份',
    description: '验证您的身份信息'
  },
  {
    title: '完成注册',
    description: '注册完成，开始使用'
  }
]
</script>
```

### 可点击步骤

```vue {2-7}
<template>
  <C_Steps 
    v-model:current="currentStep"
    :steps="steps"
    clickable
    @change="handleStepChange"
  />
</template>

<script setup>
const handleStepChange = (index) => {
  console.log('切换到步骤:', index)
}
</script>
```

### 垂直布局

```vue {2-6}
<template>
  <C_Steps 
    :steps="steps"
    direction="vertical"
    :current="2"
  />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| **steps** | `StepItem[]` | `[]` | 步骤数据数组 |
| **current** | `number` | `0` | 当前步骤索引 |
| **direction** | `'horizontal' \| 'vertical'` | `'horizontal'` | 步骤条方向 |
| **clickable** | `boolean` | `false` | 是否可点击切换步骤 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| **update:current** | `number` | 当前步骤变化时触发 |
| **change** | `number` | 步骤切换时触发 |

### StepItem 数据结构

```typescript
interface StepItem {
  title: string                                    // 步骤标题
  description?: string                             // 步骤描述
  time?: string                                    // 完成时间
  icon?: string                                    // 自定义图标
  status?: 'wait' | 'process' | 'finish' | 'error' // 步骤状态
  disabled?: boolean                               // 是否禁用
  detail?: string                                  // 详细信息
}
```

### 状态类型

| 状态 | 说明 | 显示效果 |
| --- | --- | --- |
| **wait** | 等待执行 | 灰色数字 |
| **process** | 正在进行 | 蓝色数字 |
| **finish** | 已完成 | 绿色对勾 |
| **error** | 执行错误 | 红色感叹号 |

## 🎨 使用示例

::: details 📝 表单分步填写
```vue
<template>
  <div class="form-wizard">
    <!-- 步骤条 -->
    <C_Steps 
      v-model:current="currentStep"
      :steps="formSteps"
      clickable
      class="mb-6"
    />
    
    <!-- 表单内容 -->
    <div class="form-content">
      <component 
        :is="currentStepComponent"
        @next="nextStep"
        @prev="prevStep"
      />
    </div>
    
    <!-- 操作按钮 -->
    <div class="form-actions">
      <NButton 
        v-if="currentStep > 0"
        @click="prevStep"
      >
        上一步
      </NButton>
      
      <NButton 
        v-if="currentStep < formSteps.length - 1"
        type="primary"
        @click="nextStep"
      >
        下一步
      </NButton>
      
      <NButton 
        v-else
        type="primary"
        @click="submitForm"
      >
        提交
      </NButton>
    </div>
  </div>
</template>

<script setup>
const currentStep = ref(0)

const formSteps = [
  {
    title: '基本信息',
    description: '填写个人基本信息'
  },
  {
    title: '联系方式',
    description: '填写联系方式'
  },
  {
    title: '确认信息',
    description: '确认并提交信息'
  }
]

// 当前步骤组件
const currentStepComponent = computed(() => {
  const components = ['BasicInfo', 'ContactInfo', 'ConfirmInfo']
  return components[currentStep.value]
})

const nextStep = () => {
  if (currentStep.value < formSteps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitForm = () => {
  // 提交表单逻辑
  console.log('提交表单')
}
</script>
```
:::

::: details 📦 订单状态展示
```vue
<template>
  <NCard title="订单状态">
    <C_Steps 
      :steps="orderSteps"
      :current="currentOrderStep"
      direction="vertical"
    />
  </NCard>
</template>

<script setup>
const props = defineProps<{
  orderId: string
}>()

const currentOrderStep = ref(2)

const orderSteps = ref([
  {
    title: '订单确认',
    description: '您的订单已确认',
    time: '2025-08-11 10:30:00',
    status: 'finish'
  },
  {
    title: '商品出库',
    description: '商品已从仓库发出',
    time: '2025-08-11 14:20:00',
    status: 'finish'
  },
  {
    title: '运输中',
    description: '商品正在配送途中',
    time: '2025-08-11 16:00:00',
    status: 'process'
  },
  {
    title: '已送达',
    description: '商品已送达，请注意查收',
    status: 'wait'
  }
])

// 获取订单状态
const fetchOrderStatus = async () => {
  try {
    const response = await api.getOrderStatus(props.orderId)
    orderSteps.value = response.steps
    currentOrderStep.value = response.currentStep
  } catch (error) {
    console.error('获取订单状态失败:', error)
  }
}

onMounted(() => {
  fetchOrderStatus()
})
</script>
```
:::

::: details 🔄 流程审批状态
```vue
<template>
  <div class="approval-flow">
    <NCard title="审批流程">
      <C_Steps 
        :steps="approvalSteps"
        :current="currentApprovalStep"
        direction="vertical"
      />
    </NCard>
    
    <!-- 审批详情 -->
    <NCard 
      v-if="selectedStep"
      title="审批详情"
      class="mt-4"
    >
      <NDescriptions :column="2">
        <NDescriptionsItem label="审批人">
          {{ selectedStep.approver }}
        </NDescriptionsItem>
        <NDescriptionsItem label="审批时间">
          {{ selectedStep.time }}
        </NDescriptionsItem>
        <NDescriptionsItem label="审批意见" :span="2">
          {{ selectedStep.comment }}
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>
  </div>
</template>

<script setup>
const currentApprovalStep = ref(1)
const selectedStep = ref(null)

const approvalSteps = ref([
  {
    title: '提交申请',
    description: '申请已提交',
    time: '2025-08-10 09:00:00',
    status: 'finish',
    approver: '张三',
    comment: '申请材料齐全，流程开始'
  },
  {
    title: '部门审批',
    description: '部门经理审批中',
    time: '2025-08-10 14:30:00',
    status: 'process',
    approver: '李四',
    comment: '正在审核中...'
  },
  {
    title: 'HR审批',
    description: '人事部门审批',
    status: 'wait',
    approver: '王五',
    comment: ''
  },
  {
    title: '总经理审批',
    description: '总经理最终审批',
    status: 'wait',
    approver: '赵六',
    comment: ''
  }
])

// 点击步骤查看详情
const handleStepClick = (index) => {
  selectedStep.value = approvalSteps.value[index]
}
</script>
```
:::

::: details ⚠️ 错误状态处理
```vue
<template>
  <C_Steps 
    :steps="deploySteps"
    :current="currentDeployStep"
    direction="vertical"
  />
  
  <!-- 错误信息 -->
  <NAlert 
    v-if="hasError"
    type="error"
    title="部署失败"
    class="mt-4"
  >
    {{ errorMessage }}
    <template #action>
      <NButton size="small" @click="retryDeploy">
        重试
      </NButton>
    </template>
  </NAlert>
</template>

<script setup>
const currentDeployStep = ref(2)
const errorMessage = ref('')

const deploySteps = ref([
  {
    title: '代码检查',
    description: '检查代码质量和规范',
    status: 'finish',
    time: '2025-08-11 10:00:00'
  },
  {
    title: '构建应用',
    description: '编译和打包应用',
    status: 'finish',
    time: '2025-08-11 10:05:00'
  },
  {
    title: '部署测试环境',
    description: '部署到测试服务器',
    status: 'error',
    time: '2025-08-11 10:10:00'
  },
  {
    title: '部署生产环境',
    description: '部署到生产服务器',
    status: 'wait'
  }
])

const hasError = computed(() => {
  return deploySteps.value.some(step => step.status === 'error')
})

// 重试部署
const retryDeploy = async () => {
  try {
    // 重置错误状态
    const errorStep = deploySteps.value.find(step => step.status === 'error')
    if (errorStep) {
      errorStep.status = 'process'
    }
    
    // 执行重试逻辑
    await performDeploy()
    
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
```
:::

::: details 🎨 自定义图标步骤
```vue
<template>
  <C_Steps 
    :steps="customSteps"
    :current="2"
    clickable
  />
</template>

<script setup>
const customSteps = [
  {
    title: '选择商品',
    description: '浏览并选择心仪商品',
    icon: 'i-mdi:shopping',
    status: 'finish'
  },
  {
    title: '确认订单',
    description: '确认商品和收货信息',
    icon: 'i-mdi:clipboard-check',
    status: 'finish'
  },
  {
    title: '支付订单',
    description: '选择支付方式并完成支付',
    icon: 'i-mdi:credit-card',
    status: 'process'
  },
  {
    title: '等待收货',
    description: '商品配送中，请耐心等待',
    icon: 'i-mdi:truck-delivery',
    status: 'wait'
  }
]
</script>
```
:::

## 🎨 样式定制

::: details 🎨 自定义步骤条样式

```scss
// 自定义步骤条容器
.c-steps {
  &.steps-horizontal {
    display: flex;
    align-items: flex-start;
    
    .step-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
  }
  
  &.steps-vertical {
    .step-item {
      display: flex;
      margin-bottom: 24px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

// 自定义步骤指示器
.step-indicator {
  position: relative;
  
  .step-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s;
    
    // 等待状态
    .step-wait & {
      background: #f5f5f5;
      color: #999;
      border: 2px solid #d9d9d9;
    }
    
    // 进行中状态
    .step-process & {
      background: #1890ff;
      color: white;
      border: 2px solid #1890ff;
    }
    
    // 完成状态
    .step-finish & {
      background: #52c41a;
      color: white;
      border: 2px solid #52c41a;
    }
    
    // 错误状态
    .step-error & {
      background: #ff4d4f;
      color: white;
      border: 2px solid #ff4d4f;
    }
  }
}

// 自定义连接线
.step-line {
  position: absolute;
  background: #e8e8e8;
  transition: background 0.3s;
  
  .steps-horizontal & {
    top: 16px;
    left: 32px;
    right: -50%;
    height: 1px;
  }
  
  .steps-vertical & {
    top: 32px;
    left: 16px;
    bottom: -24px;
    width: 1px;
  }
  
  // 已完成的连接线
  .step-finish + .step-item &,
  .step-finish & {
    background: #52c41a;
  }
}

// 自定义步骤内容
.step-content {
  text-align: center;
  margin-top: 8px;
  
  .steps-vertical & {
    text-align: left;
    margin-top: 0;
    margin-left: 16px;
    flex: 1;
  }
  
  .step-title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }
  
  .step-description {
    font-size: 12px;
    color: #666;
    line-height: 1.4;
  }
  
  .step-time {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
}

// 可点击状态
.step-clickable {
  cursor: pointer;
  
  &:hover {
    .step-icon {
      transform: scale(1.1);
    }
  }
}

// 暗色主题
.dark {
  .step-icon {
    .step-wait & {
      background: #2a2a2a;
      color: #666;
      border-color: #404040;
    }
  }
  
  .step-line {
    background: #404040;
  }
  
  .step-title {
    color: #e8e8e8;
  }
  
  .step-description,
  .step-time {
    color: #b3b3b3;
  }
}
```

:::

## ⚙️ 高级用法

::: details 🔄 动态步骤更新

```vue
<script setup>
const steps = ref([...])

// 动态添加步骤
const addStep = (step) => {
  steps.value.push(step)
}

// 动态更新步骤状态
const updateStepStatus = (index, status) => {
  if (steps.value[index]) {
    steps.value[index].status = status
  }
}

// 批量更新步骤
const batchUpdateSteps = (updates) => {
  updates.forEach(({ index, ...data }) => {
    if (steps.value[index]) {
      Object.assign(steps.value[index], data)
    }
  })
}
</script>
```
:::

::: details 🔐 步骤验证

```vue
<script setup>
const validateStep = async (stepIndex) => {
  try {
    // 执行步骤验证逻辑
    const isValid = await validateStepData(stepIndex)
    
    if (isValid) {
      steps.value[stepIndex].status = 'finish'
      return true
    } else {
      steps.value[stepIndex].status = 'error'
      return false
    }
  } catch (error) {
    steps.value[stepIndex].status = 'error'
    return false
  }
}

const handleStepChange = async (index) => {
  // 验证当前步骤
  const isCurrentValid = await validateStep(currentStep.value)
  
  if (isCurrentValid || index < currentStep.value) {
    currentStep.value = index
  }
}
</script>
```
:::

## 🐛 常见问题

::: details ❓ Q1: 步骤状态不更新？

**A1:** 确保使用响应式数据：

```javascript
// ✅ 正确
const steps = ref([...])
steps.value[0].status = 'finish'

// ❌ 错误  
const steps = [...]
steps[0].status = 'finish'
```
:::

::: details ❓ Q2: 垂直布局样式异常？

**A2:** 检查容器高度设置：

```scss
.steps-container {
  min-height: 400px; // 确保有足够高度
}
```
:::

::: details ❓ Q3: 自定义图标不显示？

**A3:** 确保图标类名正确：

```vue
<!-- 确保图标库已引入 -->
<script setup>
const steps = [
  {
    title: '步骤1',
    icon: 'i-mdi:check' // 正确的图标类名
  }
]
</script>
```
:::

::: details ❓ Q4: 点击事件不触发？

**A4:** 检查 clickable 属性：

```vue
<C_Steps 
  :steps="steps"
  clickable  <!-- 必须设置为可点击 -->
  @change="handleChange"
/>
```
:::

## 🎯 最佳实践

### 1. 步骤数据结构

```javascript 
// 推荐的步骤数据结构
const createStep = (title, options = {}) => ({
  title,
  description: options.description || '',
  icon: options.icon || '',
  status: options.status || 'wait',
  disabled: options.disabled || false,
  time: options.time || '',
  detail: options.detail || ''
})
```

### 2. 状态管理

```javascript 
// 使用状态管理器统一管理步骤
export const useStepsStore = defineStore('steps', {
  state: () => ({
    currentStep: 0,
    steps: []
  }),
  
  actions: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    },
    
    setStepStatus(index, status) {
      if (this.steps[index]) {
        this.steps[index].status = status
      }
    }
  }
})
```

### 3. 无障碍支持

```vue 
<template>
  <div
    role="progressbar" 
    :aria-valuenow="currentStep"
    :aria-valuemax="steps.length - 1"
    :aria-label="`步骤 ${currentStep + 1} / ${steps.length}`"
  >
    <C_Steps :steps="steps" />
  </div>
</template>
```

## 📝 更新日志

### v1.0.0 (2025-07-14)

- ✨ 初始版本发布
- ✨ 支持水平和垂直布局
- ✨ 多种步骤状态支持
- ✨ 可点击切换功能
- ✨ 自定义图标支持
- ✨ 时间和描述展示

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 步骤条组件适用于引导用户完成多步骤流程，如表单填写、订单处理、审批流程等场景。组件支持自动状态计算和手动状态设置，可以根据业务需求灵活配置。建议在长流程中使用垂直布局以获得更好的可读性。