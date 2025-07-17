---
outline: 'deep'
---

# C_Form 智能表单组件

> 🚀 基于 Naive UI 的超强动态表单生成器，让表单开发变得前所未有的简单

## ✨ 特性

- **🎯 8种布局模式** - 支持默认、行内、网格、卡片、标签页、步骤、动态、自定义等完整布局系统
- **🧩 15+种表单控件** - 内置丰富的表单控件类型，满足各种业务需求
- **⚡ 动态字段管理** - 运行时动态添加、删除、切换字段显示
- **🛡️ 强大的验证体系** - 集成封装的验证工具，支持同步和异步验证
- **🎨 灵活的插槽系统** - 支持自定义操作区、上传区等关键区域
- **📱 响应式设计** - 完美适配各种屏幕尺寸，自动布局优化
- **💪 TypeScript** - 完整的类型定义和类型安全
- **🔧 可扩展架构** - 易于扩展新的控件类型和布局模式
- **⚡ 高性能渲染** - 优化的渲染机制，大表单依然流畅

## 📦 安装

```bash
# 基于 Naive UI，确保已安装依赖
npm install naive-ui
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <!-- 最简单的表单 -->
  <C_Form
    :options="basicOptions"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import { RULE_COMBOS } from '@/utils/v_verify'

  const basicOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: RULE_COMBOS.username('用户名')
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: RULE_COMBOS.email('邮箱')
    }
  ]

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
  }
</script>
```

### 8种布局类型演示

```vue
<template>
  <div class="form-demo">
    <!-- 布局选择器 -->
    <div class="layout-selector">
      <button
        v-for="layout in layoutOptions"
        :key="layout.value"
        :class="{ active: currentLayout === layout.value }"
        @click="switchLayout(layout.value)"
      >
        {{ layout.label }}
      </button>
    </div>

    <!-- 动态表单展示 -->
    <C_Form
      :options="currentOptions"
      :layout-type="currentLayout"
      :layout-config="currentLayoutConfig"
      v-model="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS, customRule } from '@/utils/v_verify'

  const currentLayout = ref('default')
  const formData = ref({})

  const layoutOptions = [
    { label: '默认布局', value: 'default' },
    { label: '内联布局', value: 'inline' },
    { label: '网格布局', value: 'grid' },
    { label: '卡片布局', value: 'card' },
    { label: '标签页布局', value: 'tabs' },
    { label: '步骤布局', value: 'steps' },
    { label: '动态布局', value: 'dynamic' },
    { label: '自定义渲染', value: 'custom' },
  ]

  const baseOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: RULE_COMBOS.username('用户名')
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: RULE_COMBOS.email('邮箱')
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      children: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ],
      rules: [PRESET_RULES.required('性别')]
    },
    {
      type: 'datePicker',
      prop: 'birthday',
      label: '生日',
      attrs: { type: 'date' },
      rules: [PRESET_RULES.required('生日')]
    },
    {
      type: 'textarea',
      prop: 'description',
      label: '个人描述',
      placeholder: '请简单描述一下自己',
      attrs: { rows: 4 },
      rules: [PRESET_RULES.length('个人描述', 10, 200)]
    }
  ]

  const currentOptions = computed(() => {
    // 根据不同布局返回对应的字段配置
    return baseOptions
  })

  const currentLayoutConfig = computed(() => {
    const configs = {
      grid: { cols: 2, gap: 16 },
      card: {
        groups: [
          { key: 'basic', title: '基础信息' },
          { key: 'contact', title: '联系方式' }
        ]
      },
      tabs: {
        tabs: [
          { key: 'personal', title: '个人信息' },
          { key: 'contact', title: '联系方式' }
        ]
      }
    }
    return configs[currentLayout.value] || {}
  })

  const switchLayout = (layout) => {
    currentLayout.value = layout
    message.info(`已切换到${layoutOptions.find(opt => opt.value === layout)?.label}`)
  }

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
    message.success('表单提交成功')
  }
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **options** | `FormOption[]` | `[]` | 表单选项配置数组 |
| **layoutType** | `LayoutType` | `'default'` | 布局类型 |
| **layoutConfig** | `LayoutConfig` | `{}` | 布局配置 |
| **modelValue** | `FormModel` | `{}` | 表单数据（双向绑定） |
| **validateOnValueChange** | `boolean` | `false` | 值变化时是否验证 |
| **labelPlacement** | `'left' \| 'top'` | `'left'` | 标签位置 |
| **labelWidth** | `string \| number` | `'auto'` | 标签宽度 |
| **size** | `'small' \| 'medium' \| 'large'` | `'medium'` | 表单尺寸 |
| **disabled** | `boolean` | `false` | 是否禁用 |
| **readonly** | `boolean` | `false` | 是否只读 |
| **showDefaultActions** | `boolean` | `true` | 是否显示默认操作按钮 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **submit** | `(payload: SubmitEventPayload)` | 表单提交事件 |
| **update:modelValue** | `(model: FormModel)` | 表单数据更新事件 |
| **validate-success** | `(model: FormModel)` | 验证成功事件 |
| **validate-error** | `(errors: unknown)` | 验证失败事件 |
| **fields-change** | `(fields: FormOption[])` | 字段变化事件 |
| **tab-change** | `(tabKey: string)` | 标签页切换事件 |
| **step-change** | `(stepIndex: number, stepKey: string)` | 步骤切换事件 |
| **field-add** | `(fieldConfig: DynamicFieldConfig)` | 动态字段添加事件 |
| **field-remove** | `(fieldId: string)` | 动态字段删除事件 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| **action** | `{ form, model, validate, reset, ... }` | 自定义操作按钮区域 |
| **uploadClick** | `{}` | 自定义上传触发器 |
| **uploadTip** | `{}` | 自定义上传提示信息 |

### 类型定义

#### 表单选项接口

```typescript
interface FormOption {
  type: ComponentType
  prop: string
  label: string
  placeholder?: string
  value?: any
  rules?: FormItemRule[]
  attrs?: Record<string, any>
  children?: OptionItem[]
  show?: boolean
  layout?: FieldLayoutConfig
}
```

#### 布局类型

```typescript
type LayoutType = 
  | 'default'    // 默认布局
  | 'inline'     // 行内布局
  | 'grid'       // 网格布局
  | 'card'       // 卡片布局
  | 'tabs'       // 标签页布局
  | 'steps'      // 步骤布局
  | 'dynamic'    // 动态布局
  | 'custom'     // 自定义布局
```

#### 组件类型

```typescript
type ComponentType = 
  | 'input' | 'textarea' | 'inputNumber'
  | 'select' | 'checkbox' | 'radio'
  | 'datePicker' | 'daterange' | 'timePicker'
  | 'cascader' | 'colorPicker' | 'switch'
  | 'slider' | 'rate' | 'upload' | 'editor'
```

## 🎨 使用示例

### 场景 1: 用户注册表单（使用验证规则组合）

```vue
<template>
  <div class="user-registration">
    <n-card title="用户注册" style="max-width: 600px; margin: 0 auto;">
      <C_Form
        ref="registerFormRef"
        :options="registerOptions"
        layout-type="card"
        :layout-config="cardLayoutConfig"
        @submit="handleRegister"
        @validate-error="handleValidateError"
      >
        <template #action="{ validate, reset }">
          <n-space>
            <n-button 
              type="primary" 
              size="large"
              :loading="registering"
              v-debounce="{ delay: 300, immediate: false }"
              @click="validate"
            >
              注册
            </n-button>
            <n-button size="large" @click="reset">重置</n-button>
          </n-space>
        </template>
      </C_Form>
    </n-card>
  </div>
</template>

<script setup>
  import { RULE_COMBOS, PRESET_RULES, customRule } from '@/utils/v_verify'

  const registerFormRef = ref()
  const registering = ref(false)

  const cardLayoutConfig = {
    type: 'card',
    groups: [
      { key: 'basic', title: '基础信息' },
      { key: 'contact', title: '联系方式' },
      { key: 'security', title: '安全设置' }
    ]
  }

  const registerOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名（3-20位字符）',
      layout: { group: 'basic' },
      rules: RULE_COMBOS.username('用户名')
    },
    {
      type: 'input',
      prop: 'realName',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      layout: { group: 'basic' },
      rules: [
        PRESET_RULES.required('真实姓名'),
        PRESET_RULES.length('真实姓名', 2, 20)
      ]
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱地址',
      layout: { group: 'contact' },
      rules: RULE_COMBOS.email('邮箱')
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      placeholder: '请输入手机号',
      layout: { group: 'contact' },
      rules: RULE_COMBOS.mobile('手机号')
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      placeholder: '请输入密码（6-20位）',
      layout: { group: 'security' },
      attrs: { type: 'password', showPasswordOn: 'click' },
      rules: RULE_COMBOS.password('密码')
    },
    {
      type: 'input',
      prop: 'confirmPassword',
      label: '确认密码',
      placeholder: '请再次输入密码',
      layout: { group: 'security' },
      attrs: { type: 'password' },
      rules: RULE_COMBOS.confirmPassword('确认密码', () => registerFormRef.value?.getFieldValue('password'))
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      layout: { group: 'basic' },
      children: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '保密', value: 'secret' }
      ],
      rules: [PRESET_RULES.required('性别')]
    },
    {
      type: 'datePicker',
      prop: 'birthday',
      label: '生日',
      layout: { group: 'basic' },
      attrs: { type: 'date' },
      rules: [PRESET_RULES.required('生日')]
    },
    {
      type: 'checkbox',
      prop: 'agreements',
      label: '协议',
      layout: { group: 'security' },
      children: [
        { label: '我已阅读并同意《用户协议》', value: 'user_agreement' },
        { label: '我已阅读并同意《隐私政策》', value: 'privacy_policy' }
      ],
      rules: [
        customRule(
          (value) => Array.isArray(value) && value.length === 2,
          '请同意所有相关协议'
        )
      ]
    }
  ]

  const handleRegister = async ({ model }) => {
    registering.value = true
    
    try {
      // 模拟注册API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('注册数据:', model)
      message.success('注册成功！')
    } catch (error) {
      message.error('注册失败，请重试')
    } finally {
      registering.value = false
    }
  }

  const handleValidateError = (errors) => {
    console.log('表单验证失败:', errors)
    message.error('请检查表单填写是否正确')
  }
</script>

<style scoped>
  .user-registration {
    padding: 40px 20px;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
```

### 场景 2: 多步骤表单（项目申请流程）

```vue
<template>
  <div class="multi-step-form">
    <n-card title="项目申请流程">
      <C_Form
        ref="stepFormRef"
        :options="stepOptions"
        layout-type="steps"
        :layout-config="stepLayoutConfig"
        @step-change="handleStepChange"
        @step-validate="handleStepValidate"
        @submit="handleFinalSubmit"
      />
    </n-card>
  </div>
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS, customRule, customAsyncRule } from '@/utils/v_verify'

  const stepFormRef = ref()
  const currentStep = ref(0)

  const stepLayoutConfig = {
    type: 'steps',
    steps: {
      steps: [
        { key: 'basic', title: '基本信息', description: '填写项目基本信息' },
        { key: 'detail', title: '详细信息', description: '填写项目详细描述' },
        { key: 'team', title: '团队信息', description: '填写团队成员信息' },
        { key: 'confirm', title: '确认提交', description: '确认所有信息无误' }
      ],
      current: currentStep,
      allowJump: false
    }
  }

  const stepOptions = [
    // 第一步：基本信息
    {
      type: 'input',
      prop: 'projectName',
      label: '项目名称',
      placeholder: '请输入项目名称',
      layout: { step: 'basic' },
      rules: [
        PRESET_RULES.required('项目名称'),
        PRESET_RULES.length('项目名称', 3, 50)
      ]
    },
    {
      type: 'select',
      prop: 'projectType',
      label: '项目类型',
      layout: { step: 'basic' },
      children: [
        { label: 'Web应用', value: 'web' },
        { label: '移动应用', value: 'mobile' },
        { label: '桌面应用', value: 'desktop' },
        { label: '其他', value: 'other' }
      ],
      rules: [PRESET_RULES.required('项目类型')]
    },
    {
      type: 'daterange',
      prop: 'projectDuration',
      label: '项目周期',
      layout: { step: 'basic' },
      attrs: { type: 'daterange' },
      rules: [PRESET_RULES.required('项目周期')]
    },

    // 第二步：详细信息
    {
      type: 'textarea',
      prop: 'projectDescription',
      label: '项目描述',
      placeholder: '请详细描述项目内容、目标和特色',
      layout: { step: 'detail' },
      attrs: { rows: 6 },
      rules: [
        PRESET_RULES.required('项目描述'),
        PRESET_RULES.length('项目描述', 50, 1000)
      ]
    },
    {
      type: 'checkbox',
      prop: 'technologies',
      label: '技术栈',
      layout: { step: 'detail' },
      children: [
        { label: 'Vue.js', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'angular' },
        { label: 'Node.js', value: 'nodejs' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' }
      ],
      rules: [
        customRule(
          (value) => Array.isArray(value) && value.length > 0,
          '请选择至少一种技术栈'
        )
      ]
    },
    {
      type: 'upload',
      prop: 'projectFiles',
      label: '项目文档',
      layout: { step: 'detail' },
      attrs: {
        accept: '.pdf,.doc,.docx',
        max: 5,
        listType: 'text'
      }
    },

    // 第三步：团队信息
    {
      type: 'inputNumber',
      prop: 'teamSize',
      label: '团队规模',
      layout: { step: 'team' },
      attrs: { min: 1, max: 50 },
      rules: [
        PRESET_RULES.required('团队规模'),
        PRESET_RULES.range('团队规模', 1, 50)
      ]
    },
    {
      type: 'textarea',
      prop: 'teamDescription',
      label: '团队介绍',
      placeholder: '请介绍团队成员背景和分工',
      layout: { step: 'team' },
      attrs: { rows: 4 },
      rules: [
        PRESET_RULES.required('团队介绍'),
        PRESET_RULES.length('团队介绍', 20, 500)
      ]
    },
    {
      type: 'input',
      prop: 'contactPerson',
      label: '联系人',
      layout: { step: 'team' },
      rules: [
        PRESET_RULES.required('联系人'),
        PRESET_RULES.length('联系人', 2, 20)
      ]
    },
    {
      type: 'input',
      prop: 'contactPhone',
      label: '联系电话',
      layout: { step: 'team' },
      rules: RULE_COMBOS.mobile('联系电话')
    }
  ]

  const handleStepChange = (stepIndex, stepKey) => {
    currentStep.value = stepIndex
    console.log(`切换到步骤 ${stepIndex}: ${stepKey}`)
  }

  const handleStepValidate = async (stepIndex) => {
    console.log(`验证步骤 ${stepIndex}`)
    // 可以在这里添加自定义验证逻辑
    return true
  }

  const handleFinalSubmit = async ({ model }) => {
    console.log('最终提交数据:', model)
    
    try {
      // 模拟提交API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success('项目申请提交成功！')
    } catch (error) {
      message.error('提交失败，请重试')
    }
  }
</script>

<style scoped>
  .multi-step-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
  }
</style>
```

### 场景 3: 动态表单配置器（参考演示页面结构）

```vue
<template>
  <div class="form-demo">
    <n-h1>表单组件场景示例 - 展示所有8种布局类型的完整功能</n-h1>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="panel-title">
        布局控制中心 <span class="subtitle">/ 实时配置表单布局和行为</span>
      </div>

      <div class="control-grid">
        <!-- 布局选择器 -->
        <n-card hoverable class="control-card" :bordered="false">
          <div class="card-title">布局类型</div>
          <div class="layout-buttons">
            <button
              v-for="layout in layoutOptions"
              :key="layout.value"
              :class="['layout-btn', { active: currentLayout === layout.value }]"
              @click="switchLayout(layout.value)"
            >
              {{ layout.label }}
            </button>
          </div>
        </n-card>

        <!-- 配置面板 -->
        <n-card hoverable class="control-card" :bordered="false">
          <div class="card-title">表单配置</div>
          <div class="config-section">
            <div class="config-item">
              <span>标签位置</span>
              <div class="button-group">
                <button
                  v-for="item in labelPlacements"
                  :key="item.value"
                  :class="{ active: labelPlacement === item.value }"
                  @click="labelPlacement = item.value"
                >
                  {{ item.label }}
                </button>
              </div>
            </div>
            <div class="config-item">
              <span>实时验证</span>
              <div
                :class="['switch', { active: validateOnChange }]"
                @click="validateOnChange = !validateOnChange"
              />
            </div>
          </div>
          <div class="action-buttons">
            <button
              v-for="action in formActions"
              :key="action.key"
              :class="['action-btn', action.type]"
              v-debounce="{ delay: 300, immediate: false }"
              @click="handleAction(action.key)"
            >
              {{ action.label }}
            </button>
          </div>
        </n-card>

        <!-- 统计面板 -->
        <n-card hoverable class="control-card" :bordered="false">
          <div class="card-title">实时统计</div>
          <div class="stat-display">
            <div class="stat-number">{{ formStats.totalFields }}</div>
            <div class="stat-label">当前布局包含的字段总数</div>
          </div>
        </n-card>
      </div>
    </div>

    <!-- 表单展示 -->
    <n-card class="form-section" :bordered="false">
      <div class="form-header">
        <h3>{{ currentLayoutInfo.title }} - 演示</h3>
        <span class="field-badge">{{ formStats.totalFields }} 字段</span>
      </div>
      <div class="layout-info">
        <strong>{{ currentLayoutInfo.title }}</strong> -
        {{ currentLayoutInfo.content }}
      </div>

      <C_Form
        ref="formRef"
        :options="currentOptions"
        :layout-type="currentLayout"
        :layout-config="currentLayoutConfig"
        v-model="formData"
        :label-placement="labelPlacement"
        :validate-on-value-change="validateOnChange"
        @submit="handleSubmit"
        @validate-success="errorCount = 0"
        @validate-error="handleValidateError"
        @fields-change="currentFields = $event || []"
      />
    </n-card>

    <!-- 状态卡片 -->
    <div class="status-section">
      <div class="panel-title">状态监控面板</div>
      <div class="status-cards">
        <n-card
          v-for="(card, index) in statusCards"
          :key="index"
          :class="['status-card', card.type]"
          :bordered="false"
        >
          <div class="number">{{ card.value }}</div>
          <div class="label">{{ card.label }}</div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS, customRule } from '@/utils/v_verify'

  const formRef = ref()
  const formData = ref({})
  const currentLayout = ref('default')
  const labelPlacement = ref('left')
  const validateOnChange = ref(false)
  const currentFields = ref([])
  const errorCount = ref(0)

  const layoutOptions = [
    { label: '默认布局', value: 'default' },
    { label: '内联布局', value: 'inline' },
    { label: '网格布局', value: 'grid' },
    { label: '卡片布局', value: 'card' },
    { label: '标签页布局', value: 'tabs' },
    { label: '步骤布局', value: 'steps' },
    { label: '动态布局', value: 'dynamic' },
    { label: '自定义渲染', value: 'custom' },
  ]

  const labelPlacements = [
    { value: 'left', label: '左侧' },
    { value: 'top', label: '顶部' },
  ]

  const formActions = [
    { key: 'fill', type: 'fill', label: '填充测试' },
    { key: 'preview', type: 'preview', label: '预览数据' },
    { key: 'clear', type: 'clear', label: '清空数据' },
    { key: 'validate', type: 'validate', label: '验证表单' },
  ]

  // 基础表单选项（使用验证规则）
  const baseOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: RULE_COMBOS.username('用户名')
    },
    {
      type: 'input',
      prop: 'realName',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      rules: [
        PRESET_RULES.required('真实姓名'),
        PRESET_RULES.length('真实姓名', 2, 20)
      ]
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: RULE_COMBOS.email('邮箱')
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      placeholder: '请输入手机号',
      rules: RULE_COMBOS.mobile('手机号')
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      attrs: { min: 1, max: 120 },
      rules: [
        PRESET_RULES.required('年龄'),
        PRESET_RULES.range('年龄', 1, 120)
      ]
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      children: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ],
      rules: [PRESET_RULES.required('性别')]
    },
    {
      type: 'textarea',
      prop: 'description',
      label: '个人描述',
      placeholder: '请简单描述一下自己',
      attrs: { rows: 4 },
      rules: [PRESET_RULES.length('个人描述', 10, 200)]
    },
    {
      type: 'checkbox',
      prop: 'hobbies',
      label: '爱好',
      children: [
        { label: '阅读', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' },
        { label: '旅行', value: 'travel' }
      ]
    },
    {
      type: 'switch',
      prop: 'newsletter',
      label: '订阅新闻'
    }
  ]

  // 测试数据配置
  const testDataConfig = {
    getTestData(layoutType) {
      const baseData = {
        username: 'cheny_888',
        realName: 'CHENY',
        age: 28,
        gender: 'male',
        email: 'demo@cheny-test.com',
        phone: '16888888888',
        description: '这是一个测试用户的个人描述'
      }

      const extendedData = {
        hobbies: ['reading', 'music'],
        newsletter: true,
      }

      // 根据布局类型返回不同的数据
      const needsExtended = ['card', 'tabs', 'steps', 'dynamic', 'custom']
      if (needsExtended.includes(layoutType)) {
        return { ...baseData, ...extendedData }
      }

      return baseData
    }
  }

  const currentOptions = computed(() => {
    // 根据布局类型过滤和调整选项
    return baseOptions
  })

  const currentLayoutConfig = computed(() => {
    const configs = {
      grid: { cols: 2, gap: 16 },
      card: {
        groups: [
          { key: 'basic', title: '基础信息' },
          { key: 'contact', title: '联系方式' }
        ]
      },
      tabs: {
        tabs: [
          { key: 'personal', title: '个人信息' },
          { key: 'contact', title: '联系方式' }
        ]
      }
    }
    return configs[currentLayout.value] || {}
  })

  const currentLayoutInfo = computed(() => {
    const descriptions = {
      default: { title: '默认布局', content: '标准的垂直表单布局，适用于大多数场景' },
      inline: { title: '内联布局', content: '水平排列的表单布局，适用于简单表单' },
      grid: { title: '网格布局', content: '基于栅格系统的响应式布局' },
      card: { title: '卡片布局', content: '将表单项按功能分组显示' },
      tabs: { title: '标签页布局', content: '将表单项分散到不同标签页' },
      steps: { title: '步骤布局', content: '引导用户按步骤填写表单' },
      dynamic: { title: '动态布局', content: '支持动态添加删除字段' },
      custom: { title: '自定义渲染', content: '支持自定义渲染效果' }
    }
    return descriptions[currentLayout.value] || { title: '', content: '' }
  })

  const formStats = computed(() => {
    const totalFields = currentFields.value.length
    const filledCount = currentFields.value.filter(field =>
      isValueFilled(formData.value[field.prop])
    ).length
    const pendingCount = Math.max(0, totalFields - filledCount)
    const completionPercentage =
      totalFields === 0 ? 0 : Math.round((filledCount / totalFields) * 100)

    return {
      totalFields,
      filledCount,
      pendingCount,
      completionPercentage,
    }
  })

  const statusCards = computed(() => [
    {
      value: formStats.value.filledCount,
      label: '已填写字段',
      type: 'completed',
    },
    {
      value: formStats.value.pendingCount,
      label: '待填写字段',
      type: 'pending',
    },
    {
      value: `${formStats.value.completionPercentage}%`,
      label: '完成率',
      type: 'completion',
    },
    { value: errorCount.value, label: '验证错误', type: 'errors' },
  ])

  const isValueFilled = (value) => {
    if (value === null || value === undefined || value === '') return false
    if (typeof value === 'string') return value.trim() !== ''
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'number') return value > 0
    if (typeof value === 'boolean') return value === true
    return false
  }

  const switchLayout = (layout) => {
    currentLayout.value = layout
    resetForm()
    const layoutName = layoutOptions.find(opt => opt.value === layout)?.label || '未知'
    message.info(`已切换到${layoutName}`)
  }

  const resetForm = () => {
    formData.value = {}
    errorCount.value = 0
    currentFields.value = []
  }

  const handleAction = (actionKey) => {
    const actions = {
      fill: () => {
        const testData = testDataConfig.getTestData(currentLayout.value)
        Object.assign(formData.value, testData)
        message.success('已填充测试数据')
      },
      preview: () => {
        console.log('预览数据:', formData.value)
        message.success('数据已输出到控制台')
      },
      clear: () => {
        resetForm()
        formRef.value?.resetFields?.()
        message.info('已清空所有数据')
      },
      validate: async () => {
        try {
          if (!formRef.value?.validate) {
            message.warning('当前布局不支持验证功能')
            return
          }

          await formRef.value.validate()
          errorCount.value = 0
          message.success('表单验证通过')
        } catch (errors) {
          errorCount.value = Array.isArray(errors) ? errors.length : 1
          message.error('表单验证失败')
          console.error('验证错误:', errors)
        }
      },
    }

    actions[actionKey]?.()
  }

  const handleSubmit = ({ model }) => {
    console.log('表单提交:', model)
    message.success('表单提交成功')
  }

  const handleValidateError = (errors) => {
    errorCount.value = Array.isArray(errors) ? errors.length : 1
    console.error('表单验证失败:', errors)
  }
</script>

<style scoped>
  .form-demo {
    padding: 24px;
  }

  .control-panel {
    margin-bottom: 24px;
  }

  .panel-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .subtitle {
    font-size: 14px;
    color: #666;
    font-weight: normal;
  }

  .control-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
  }

  .control-card {
    padding: 16px;
  }

  .card-title {
    font-weight: bold;
    margin-bottom: 12px;
  }

  .layout-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .layout-btn {
    padding: 6px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.3s;
  }

  .layout-btn.active {
    background: #1890ff;
    color: white;
    border-color: #1890ff;
  }

  .config-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .config-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button-group {
    display: flex;
    gap: 4px;
  }

  .button-group button {
    padding: 4px 8px;
    border: 1px solid #d9d9d9;
    background: white;
    cursor: pointer;
    font-size: 12px;
  }

  .button-group button.active {
    background: #1890ff;
    color: white;
    border-color: #1890ff;
  }

  .switch {
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background: #ccc;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
  }

  .switch::after {
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: all 0.3s;
  }

  .switch.active {
    background: #1890ff;
  }

  .switch.active::after {
    left: 22px;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s;
  }

  .action-btn.fill {
    background: #52c41a;
    color: white;
  }

  .action-btn.preview {
    background: #1890ff;
    color: white;
  }

  .action-btn.clear {
    background: #ff4d4f;
    color: white;
  }

  .action-btn.validate {
    background: #faad14;
    color: white;
  }

  .stat-display {
    text-align: center;
  }

  .stat-number {
    font-size: 36px;
    font-weight: bold;
    color: #1890ff;
  }

  .stat-label {
    font-size: 12px;
    color: #666;
  }

  .form-section {
    margin-bottom: 24px;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .field-badge {
    background: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  .layout-info {
    margin-bottom: 16px;
    padding: 12px;
    background: #f9f9f9;
    border-radius: 4px;
    font-size: 14px;
  }

  .status-section {
    margin-top: 24px;
  }

  .status-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  .status-card {
    text-align: center;
    padding: 16px;
  }

  .status-card .number {
    font-size: 24px;
    font-weight: bold;
  }

  .status-card .label {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }

  .status-card.completed .number {
    color: #52c41a;
  }

  .status-card.pending .number {
    color: #faad14;
  }

  .status-card.completion .number {
    color: #1890ff;
  }

  .status-card.errors .number {
    color: #ff4d4f;
  }
</style>
```

## 🛠️ 高级用法

### 使用封装的验证工具

```vue
<template>
  <C_Form
    :options="advancedOptions"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS, customRule, customAsyncRule } from '@/utils/v_verify'

  const advancedOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [
        ...RULE_COMBOS.username('用户名'),
        // 添加异步验证检查用户名是否已存在
        customAsyncRule(
          async (value) => {
            if (!value) return true
            const exists = await checkUsernameExists(value)
            return !exists
          },
          '用户名已存在，请换一个',
          'blur'
        )
      ]
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      attrs: { type: 'password' },
      rules: RULE_COMBOS.password('密码')
    },
    {
      type: 'input',
      prop: 'confirmPassword',
      label: '确认密码',
      attrs: { type: 'password' },
      rules: RULE_COMBOS.confirmPassword('确认密码', () => formRef.value?.getFieldValue('password'))
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱')
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      rules: RULE_COMBOS.mobile('手机号')
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      rules: [
        PRESET_RULES.required('年龄'),
        PRESET_RULES.range('年龄', 1, 120)
      ]
    },
    {
      type: 'input',
      prop: 'website',
      label: '个人网站',
      rules: [PRESET_RULES.url('个人网站')]
    },
    {
      type: 'textarea',
      prop: 'bio',
      label: '个人简介',
      rules: [
        PRESET_RULES.required('个人简介'),
        PRESET_RULES.length('个人简介', 10, 500)
      ]
    }
  ]

  const formRef = ref()

  const checkUsernameExists = async (username) => {
    // 模拟异步检查用户名是否存在
    await new Promise(resolve => setTimeout(resolve, 500))
    return ['admin', 'test', 'user', 'root'].includes(username.toLowerCase())
  }

  const handleSubmit = ({ model }) => {
    console.log('验证通过，提交数据:', model)
    message.success('表单提交成功')
  }
</script>
```

### 条件显示和字段联动

```vue
<template>
  <C_Form
    :options="conditionalOptions"
    v-model="formData"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@/utils/v_verify'

  const formData = ref({})

  const conditionalOptions = computed(() => [
    {
      type: 'select',
      prop: 'userType',
      label: '用户类型',
      children: [
        { label: '个人用户', value: 'personal' },
        { label: '企业用户', value: 'business' }
      ],
      rules: [PRESET_RULES.required('用户类型')]
    },
    // 个人用户字段
    {
      type: 'input',
      prop: 'personalName',
      label: '真实姓名',
      show: formData.value.userType === 'personal',
      rules: formData.value.userType === 'personal' ? [
        PRESET_RULES.required('真实姓名'),
        PRESET_RULES.length('真实姓名', 2, 20)
      ] : []
    },
    {
      type: 'input',
      prop: 'idCard',
      label: '身份证号',
      show: formData.value.userType === 'personal',
      rules: formData.value.userType === 'personal' ? [
        PRESET_RULES.required('身份证号'),
        PRESET_RULES.idCard('身份证号')
      ] : []
    },
    // 企业用户字段
    {
      type: 'input',
      prop: 'companyName',
      label: '公司名称',
      show: formData.value.userType === 'business',
      rules: formData.value.userType === 'business' ? [
        PRESET_RULES.required('公司名称'),
        PRESET_RULES.length('公司名称', 2, 50)
      ] : []
    },
    {
      type: 'input',
      prop: 'businessLicense',
      label: '营业执照号',
      show: formData.value.userType === 'business',
      rules: formData.value.userType === 'business' ? [
        PRESET_RULES.required('营业执照号'),
        PRESET_RULES.length('营业执照号', 10, 30)
      ] : []
    },
    // 通用字段
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱')
    },
    {
      type: 'input',
      prop: 'phone',
      label: '联系电话',
      rules: RULE_COMBOS.mobile('联系电话')
    }
  ])

  // 当用户类型改变时，清空相关字段
  watch(() => formData.value.userType, (newType, oldType) => {
    if (oldType === 'personal') {
      delete formData.value.personalName
      delete formData.value.idCard
    } else if (oldType === 'business') {
      delete formData.value.companyName
      delete formData.value.businessLicense
    }
  })

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
    message.success('表单提交成功')
  }
</script>
```

### 防抖优化和性能提升

```vue
<template>
  <C_Form
    :options="performanceOptions"
    v-model="formData"
    @submit="handleSubmit"
  >
    <!-- 使用防抖指令优化提交按钮 -->
    <template #action="{ validate, reset }">
      <n-space>
        <n-button
          type="primary"
          size="large"
          v-debounce="{ delay: 500, immediate: false, onExecute: handleDebounceExecute }"
          @click="validate"
        >
          提交表单
        </n-button>
        <n-button size="large" @click="reset">重置</n-button>
      </n-space>
    </template>
  </C_Form>
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@/utils/v_verify'

  const formData = ref({})

  // 使用 shallowRef 优化大型选项数据
  const departmentOptions = shallowRef([
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '设计部', value: 'design' },
    { label: '运营部', value: 'operation' },
    // ... 更多选项
  ])

  const performanceOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: RULE_COMBOS.username('用户名')
    },
    {
      type: 'select',
      prop: 'department',
      label: '部门',
      children: departmentOptions.value,
      rules: [PRESET_RULES.required('部门')]
    },
    {
      type: 'textarea',
      prop: 'description',
      label: '描述',
      attrs: { rows: 4 },
      rules: [PRESET_RULES.length('描述', 10, 500)]
    }
  ]

  const handleDebounceExecute = () => {
    console.log('防抖执行中...')
  }

  const handleSubmit = ({ model }) => {
    console.log('表单提交:', model)
    message.success('表单提交成功')
  }
</script>
```

## 🎨 自定义样式

### CSS 变量定制

```scss
.c-form-wrapper {
  --form-primary-color: #1890ff;
  --form-border-color: #d9d9d9;
  --form-hover-color: #40a9ff;
  --form-error-color: #ff4d4f;
  --form-success-color: #52c41a;
  --form-warning-color: #faad14;
  --form-label-width: 100px;
  --form-item-margin: 16px;
  --form-border-radius: 6px;
}
```

### 响应式布局

```vue
<template>
  <C_Form
    :options="responsiveOptions"
    :layout-config="responsiveLayout"
    class="responsive-form"
  />
</template>

<script setup>
  const breakpoint = useBreakpoint()
  
  const responsiveLayout = computed(() => ({
    type: 'grid',
    cols: breakpoint.value.lg ? 3 : breakpoint.value.md ? 2 : 1,
    gap: 16
  }))
</script>

<style scoped>
  .responsive-form {
    :deep(.n-form-item-label) {
      @media (max-width: 768px) {
        margin-bottom: 8px;
      }
    }

    :deep(.n-form-item) {
      @media (max-width: 480px) {
        margin-bottom: 12px;
      }
    }
  }
</style>
```

## ⚠️ 注意事项

### 1. 表单数据绑定

```vue
<!-- ✅ 推荐：使用双向绑定 -->
<C_Form
  v-model="formData"
  :options="options"
/>

<!-- ❌ 不推荐：只监听事件 -->
<C_Form
  :options="options"
  @update:modelValue="handleUpdate"
/>
```

### 2. 验证规则配置

```vue
<!-- ✅ 推荐：使用封装的验证规则 -->
<script setup>
  import { RULE_COMBOS, PRESET_RULES } from '@/utils/v_verify'

  const options = [
    {
      type: 'input',
      prop: 'email',
      rules: RULE_COMBOS.email('邮箱') // 完整的验证规则组合
    }
  ]
</script>

<!-- ❌ 不推荐：手写验证规则 -->
<script setup>
  const options = [
    {
      type: 'input',
      prop: 'email',
      rules: [{ required: true, type: 'email' }] // 缺少错误提示
    }
  ]
</script>
```

### 3. 性能优化

```vue
<!-- ✅ 推荐：使用计算属性和防抖 -->
<script setup>
  const computedOptions = computed(() => {
    return baseOptions.map(option => ({
      ...option,
      show: shouldShowField(option)
    }))
  })

  // 使用防抖指令
  // <n-button v-debounce="{ delay: 300 }" @click="submit">提交</n-button>
</script>

<!-- ❌ 不推荐：在模板中计算 -->
<template>
  <C_Form :options="baseOptions.filter(shouldShowField)" />
</template>
```

## 🐛 故障排除

### 常见问题

#### Q1: 表单验证不生效？

**A1:** 检查验证规则配置：

```javascript
// 确保使用正确的验证规则
import { RULE_COMBOS, PRESET_RULES } from '@/utils/v_verify'

const rules = RULE_COMBOS.email('邮箱') // ✅ 正确
// 而不是
const rules = [{ required: true }] // ❌ 缺少完整验证
```

#### Q2: 异步验证不工作？

**A2:** 确保使用 customAsyncRule：

```javascript
import { customAsyncRule } from '@/utils/v_verify'

const asyncRule = customAsyncRule(
  async (value) => {
    const result = await checkValue(value)
    return result.isValid
  },
  '验证失败的错误信息',
  'blur'
)
```

#### Q3: 动态字段不显示？

**A3:** 检查字段配置：

```javascript
// 确保show属性设置正确
const option = {
  type: 'input',
  prop: 'dynamicField',
  label: '动态字段',
  show: computed(() => someCondition.value) // 使用计算属性
}
```

## 🎯 最佳实践

### 1. 验证规则使用

```javascript
import { RULE_COMBOS, PRESET_RULES, customRule } from '@/utils/v_verify'

// ✅ 推荐：使用预设规则组合
const goodRules = {
  username: RULE_COMBOS.username('用户名'),
  email: RULE_COMBOS.email('邮箱'),
  phone: RULE_COMBOS.mobile('手机号'),
  password: RULE_COMBOS.password('密码')
}

// ✅ 推荐：自定义验证规则
const customValidation = customRule(
  (value) => value && value.includes('@company.com'),
  '必须使用公司邮箱',
  'blur'
)
```

### 2. 错误处理

```javascript
const handleValidateError = (errors) => {
  // 处理验证错误
  if (Array.isArray(errors) && errors.length > 0) {
    const firstError = errors[0]
    message.error(firstError.message || '表单验证失败')
  }
  
  // 记录详细错误信息用于调试
  console.error('Form validation errors:', errors)
}
```

### 3. 表单结构设计

```javascript
// ✅ 推荐：清晰的表单结构
const formOptions = [
  // 基础信息组
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    layout: { group: 'basic' },
    rules: RULE_COMBOS.username('姓名')
  },
  // 联系信息组
  {
    type: 'input',
    prop: 'email',
    label: '邮箱',
    layout: { group: 'contact' },
    rules: RULE_COMBOS.email('邮箱')
  }
]
```

### 4. 类型安全

```typescript
// 定义表单数据类型
interface UserForm {
  username: string
  email: string
  age: number
  hobbies: string[]
}

// 使用类型约束
const formData = ref<UserForm>({
  username: '',
  email: '',
  age: 0,
  hobbies: []
})
```

## 📝 更新日志

### v2.0.0 (2025-07-17)

- ✨ 集成封装的验证工具 `v_verify.ts`
- ✨ 支持防抖指令优化表单交互
- ✨ 新增8种完整的布局模式
- ✨ 完善的TypeScript类型定义
- 🎨 优化演示页面和文档结构
- ⚡ 提升大表单渲染性能

### v1.5.0 (2025-06-15)

- 🆕 新增动态布局和自定义渲染
- 🔧 优化验证机制和错误处理
- 📱 改进移动端响应式适配

### v1.0.0 (2025-06-01)

- 🎉 首次发布
- 🎨 支持8种布局类型
- 🧩 支持15+表单控件
- ✅ 完善的验证系统

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved.

---

**💡 提示**: 这个表单组件设计用于快速构建各种复杂表单，支持8种布局模式和丰富的控件类型。集成了封装的验证工具 `v_verify.ts`，让表单验证变得简单而强大。结合防抖指令和类型安全设计，无论是简单的登录表单还是复杂的多步骤表单，都能轻松应对。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更高效的表单开发体验！ 🚀