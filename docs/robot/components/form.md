---
outline: 'deep'
---


# C_Form 智能表单组件

> 🚀 基于 Naive UI 的超强动态表单生成器，让表单开发变得前所未有的简单

## ✨ 特性

- **🎯 多种布局模式**: 支持默认、行内、网格、卡片、标签页、步骤、动态等 8 种布局
- **🧩 丰富的控件类型**: 内置 15+ 种表单控件，满足各种业务需求
- **⚡ 动态字段管理**: 运行时动态添加、删除、切换字段显示
- **🛡️ 完整的验证体系**: 集成强大的表单验证，支持异步验证
- **🎨 灵活的插槽系统**: 支持自定义操作区、上传区等关键区域
- **📱 响应式设计**: 完美适配各种屏幕尺寸
- **💪 TypeScript**: 完整的类型定义和类型安全
- **🔧 可扩展架构**: 易于扩展新的控件类型和布局模式
- **⚡ 高性能渲染**: 优化的渲染机制，大表单依然流畅

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
  const basicOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '用户名不能为空' }]
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: [
        { required: true, message: '邮箱不能为空' },
        { type: 'email', message: '邮箱格式不正确' }
      ]
    }
  ]

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
  }
</script>
```

### 多种控件类型

```vue
<template>
  <C_Form
    :options="richOptions"
    layout-type="grid"
    :layout-config="{ cols: 2, gap: 16 }"
    @submit="handleSubmit"
  />
</template>

<script setup>
  const richOptions = [
    {
      type: 'input',
      prop: 'name',
      label: '姓名',
      placeholder: '请输入姓名'
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      children: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]
    },
    {
      type: 'datePicker',
      prop: 'birthday',
      label: '生日',
      attrs: { type: 'date' }
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      attrs: { min: 0, max: 120 }
    },
    {
      type: 'radio',
      prop: 'education',
      label: '学历',
      children: [
        { label: '高中', value: 'high' },
        { label: '本科', value: 'bachelor' },
        { label: '硕士', value: 'master' },
        { label: '博士', value: 'doctor' }
      ]
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
      type: 'textarea',
      prop: 'description',
      label: '个人描述',
      placeholder: '请简单描述一下自己',
      attrs: { rows: 4 }
    },
    {
      type: 'switch',
      prop: 'isPublic',
      label: '公开资料'
    }
  ]

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
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

#### 布局配置接口

```typescript
interface LayoutConfig {
  type?: LayoutType
  // 网格布局配置
  cols?: number
  gap?: number
  // 标签页配置
  tabs?: TabConfig[]
  // 步骤配置
  steps?: StepConfig
  // 动态配置
  dynamic?: DynamicConfig
}
```

## 🎨 使用示例

### 场景 1: 用户注册表单

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
              @click="validate"
            >
              注册
            </n-button>
            <n-button size="large" @click="reset">重置</n-button>
            <n-button 
              size="large" 
              text 
              @click="$router.push('/login')"
            >
              已有账号？立即登录
            </n-button>
          </n-space>
        </template>
      </C_Form>
    </n-card>

    <!-- 注册成功弹窗 -->
    <n-modal v-model:show="showSuccessModal">
      <n-card title="注册成功" style="width: 400px;">
        <n-result status="success" description="恭喜您注册成功！">
          <template #footer>
            <n-button type="primary" @click="goToLogin">
              去登录
            </n-button>
          </template>
        </n-result>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
  const registerFormRef = ref()
  const registering = ref(false)
  const showSuccessModal = ref(false)

  const cardLayoutConfig = {
    type: 'card',
    cols: 1,
    gap: 16
  }

  const registerOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名（3-20位字符）',
      rules: [
        { required: true, message: '用户名不能为空' },
        { min: 3, max: 20, message: '用户名长度在3-20位之间' }
      ]
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱地址',
      rules: [
        { required: true, message: '邮箱不能为空' },
        { type: 'email', message: '邮箱格式不正确' }
      ]
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      placeholder: '请输入密码（6-20位）',
      attrs: { type: 'password', showPasswordOn: 'click' },
      rules: [
        { required: true, message: '密码不能为空' },
        { min: 6, max: 20, message: '密码长度在6-20位之间' }
      ]
    },
    {
      type: 'input',
      prop: 'confirmPassword',
      label: '确认密码',
      placeholder: '请再次输入密码',
      attrs: { type: 'password' },
      rules: [
        { required: true, message: '确认密码不能为空' },
        {
          validator: (rule, value, callback, source) => {
            if (value !== source.password) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          }
        }
      ]
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      placeholder: '请输入手机号',
      rules: [
        { required: true, message: '手机号不能为空' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
      ]
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      children: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '保密', value: 'secret' }
      ],
      rules: [{ required: true, message: '请选择性别' }]
    },
    {
      type: 'datePicker',
      prop: 'birthday',
      label: '生日',
      attrs: { type: 'date' },
      rules: [{ required: true, message: '请选择生日' }]
    },
    {
      type: 'checkbox',
      prop: 'agreements',
      label: '协议',
      children: [
        { label: '我已阅读并同意《用户协议》', value: 'user_agreement' },
        { label: '我已阅读并同意《隐私政策》', value: 'privacy_policy' }
      ],
      rules: [
        { 
          required: true, 
          message: '请同意相关协议',
          validator: (rule, value) => {
            return Array.isArray(value) && value.length === 2
          }
        }
      ]
    }
  ]

  const handleRegister = async ({ model }) => {
    registering.value = true
    
    try {
      // 模拟注册API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('注册数据:', model)
      $message.success('注册成功！')
      showSuccessModal.value = true
    } catch (error) {
      $message.error('注册失败，请重试')
    } finally {
      registering.value = false
    }
  }

  const handleValidateError = (errors) => {
    console.log('表单验证失败:', errors)
    $message.error('请检查表单填写是否正确')
  }

  const goToLogin = () => {
    showSuccessModal.value = false
    $router.push('/login')
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

### 场景 2: 多步骤表单

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
      rules: [{ required: true, message: '项目名称不能为空' }]
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
      rules: [{ required: true, message: '请选择项目类型' }]
    },
    {
      type: 'daterange',
      prop: 'projectDuration',
      label: '项目周期',
      layout: { step: 'basic' },
      attrs: { type: 'daterange' },
      rules: [{ required: true, message: '请选择项目周期' }]
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
        { required: true, message: '项目描述不能为空' },
        { min: 50, message: '项目描述至少50个字符' }
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
      rules: [{ required: true, message: '请选择至少一种技术栈' }]
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
      rules: [{ required: true, message: '请输入团队规模' }]
    },
    {
      type: 'textarea',
      prop: 'teamDescription',
      label: '团队介绍',
      placeholder: '请介绍团队成员背景和分工',
      layout: { step: 'team' },
      attrs: { rows: 4 },
      rules: [{ required: true, message: '团队介绍不能为空' }]
    },
    {
      type: 'input',
      prop: 'contactPerson',
      label: '联系人',
      layout: { step: 'team' },
      rules: [{ required: true, message: '联系人不能为空' }]
    },
    {
      type: 'input',
      prop: 'contactPhone',
      label: '联系电话',
      layout: { step: 'team' },
      rules: [
        { required: true, message: '联系电话不能为空' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
      ]
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
      
      $message.success('项目申请提交成功！')
      $dialog.success({
        title: '提交成功',
        content: '您的项目申请已提交，我们会在3个工作日内处理并反馈结果。',
        positiveText: '确定'
      })
    } catch (error) {
      $message.error('提交失败，请重试')
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

### 场景 3: 动态表单配置

```vue
<template>
  <div class="dynamic-form-config">
    <n-space vertical size="large">
      <!-- 表单配置区 -->
      <n-card title="表单设计器">
        <C_Form
          ref="designerFormRef"
          :options="designerOptions"
          layout-type="dynamic"
          :layout-config="dynamicLayoutConfig"
          @field-add="handleFieldAdd"
          @field-remove="handleFieldRemove"
          @fields-change="handleFieldsChange"
        />
      </n-card>

      <!-- 预览区 -->
      <n-card title="表单预览">
        <C_Form
          ref="previewFormRef"
          :options="dynamicFormOptions"
          layout-type="grid"
          :layout-config="{ cols: 2, gap: 16 }"
          @submit="handlePreviewSubmit"
        />
      </n-card>

      <!-- 配置代码导出 -->
      <n-card title="配置代码">
        <n-code
          :code="formConfigCode"
          language="javascript"
          :hljs="hljs"
        />
        <template #action>
          <n-button @click="copyFormConfig">复制配置</n-button>
        </template>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
  import hljs from 'highlight.js/lib/core'
  import javascript from 'highlight.js/lib/languages/javascript'
  
  hljs.registerLanguage('javascript', javascript)

  const designerFormRef = ref()
  const previewFormRef = ref()
  const dynamicFormOptions = ref([])

  const dynamicLayoutConfig = {
    type: 'dynamic',
    dynamic: {
      allowAdd: true,
      allowRemove: true,
      allowSort: true,
      availableTypes: [
        'input', 'textarea', 'select', 'checkbox', 
        'radio', 'datePicker', 'inputNumber', 'switch'
      ]
    }
  }

  const designerOptions = [
    {
      type: 'input',
      prop: 'fieldLabel',
      label: '字段标签',
      placeholder: '请输入字段标签'
    },
    {
      type: 'select',
      prop: 'fieldType',
      label: '字段类型',
      children: [
        { label: '文本输入', value: 'input' },
        { label: '多行文本', value: 'textarea' },
        { label: '下拉选择', value: 'select' },
        { label: '单选框', value: 'radio' },
        { label: '复选框', value: 'checkbox' },
        { label: '数字输入', value: 'inputNumber' },
        { label: '日期选择', value: 'datePicker' },
        { label: '开关', value: 'switch' }
      ]
    },
    {
      type: 'input',
      prop: 'fieldProp',
      label: '字段名称',
      placeholder: '请输入字段名称（英文）'
    },
    {
      type: 'input',
      prop: 'fieldPlaceholder',
      label: '占位符',
      placeholder: '请输入占位符文本'
    },
    {
      type: 'switch',
      prop: 'fieldRequired',
      label: '是否必填'
    }
  ]

  const formConfigCode = computed(() => {
    return `const formOptions = ${JSON.stringify(dynamicFormOptions.value, null, 2)}`
  })

  const handleFieldAdd = (fieldConfig) => {
    console.log('添加字段:', fieldConfig)
    
    const newField = {
      type: fieldConfig.fieldType || 'input',
      prop: fieldConfig.fieldProp || `field_${Date.now()}`,
      label: fieldConfig.fieldLabel || '新字段',
      placeholder: fieldConfig.fieldPlaceholder || '',
      rules: fieldConfig.fieldRequired ? [
        { required: true, message: `${fieldConfig.fieldLabel}不能为空` }
      ] : []
    }

    // 为特殊类型添加默认选项
    if (['select', 'radio', 'checkbox'].includes(newField.type)) {
      newField.children = [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' }
      ]
    }

    dynamicFormOptions.value.push(newField)
    $message.success('字段添加成功')
  }

  const handleFieldRemove = (fieldId) => {
    const index = dynamicFormOptions.value.findIndex(field => field.prop === fieldId)
    if (index > -1) {
      dynamicFormOptions.value.splice(index, 1)
      $message.success('字段删除成功')
    }
  }

  const handleFieldsChange = (fields) => {
    console.log('字段配置变化:', fields)
    dynamicFormOptions.value = [...fields]
  }

  const handlePreviewSubmit = ({ model }) => {
    console.log('预览表单提交:', model)
    $message.success('预览表单提交成功')
  }

  const copyFormConfig = async () => {
    try {
      await navigator.clipboard.writeText(formConfigCode.value)
      $message.success('配置代码已复制到剪贴板')
    } catch (error) {
      $message.error('复制失败，请手动复制')
    }
  }

  // 初始化一些示例字段
  onMounted(() => {
    dynamicFormOptions.value = [
      {
        type: 'input',
        prop: 'name',
        label: '姓名',
        placeholder: '请输入姓名',
        rules: [{ required: true, message: '姓名不能为空' }]
      },
      {
        type: 'select',
        prop: 'department',
        label: '部门',
        children: [
          { label: '技术部', value: 'tech' },
          { label: '产品部', value: 'product' },
          { label: '设计部', value: 'design' }
        ]
      }
    ]
  })
</script>

<style scoped>
  .dynamic-form-config {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
</style>
```

## 🛠️ 高级用法

### 自定义验证规则

```vue
<template>
  <C_Form
    :options="advancedOptions"
    @submit="handleSubmit"
  />
</template>

<script setup>
  const advancedOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: [
        { required: true, message: '用户名不能为空' },
        {
          // 异步验证
          asyncValidator: async (rule, value) => {
            if (!value) return Promise.resolve()
            
            // 模拟异步检查用户名是否存在
            const exists = await checkUsernameExists(value)
            if (exists) {
              return Promise.reject('用户名已存在')
            }
            return Promise.resolve()
          },
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      attrs: { type: 'password' },
      rules: [
        { required: true, message: '密码不能为空' },
        {
          // 自定义验证器
          validator: (rule, value) => {
            const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
            return strongRegex.test(value)
          },
          message: '密码必须包含大小写字母、数字和特殊字符'
        }
      ]
    }
  ]

  const checkUsernameExists = async (username) => {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    return ['admin', 'test', 'user'].includes(username)
  }

  const handleSubmit = ({ model }) => {
    console.log('验证通过，提交数据:', model)
  }
</script>
```

### 条件显示字段

```vue
<template>
  <C_Form
    :options="conditionalOptions"
    @submit="handleSubmit"
  />
</template>

<script setup>
  const formData = ref({})

  const conditionalOptions = computed(() => [
    {
      type: 'select',
      prop: 'userType',
      label: '用户类型',
      children: [
        { label: '个人用户', value: 'personal' },
        { label: '企业用户', value: 'business' }
      ]
    },
    {
      type: 'input',
      prop: 'personalName',
      label: '真实姓名',
      show: formData.value.userType === 'personal' // 条件显示
    },
    {
      type: 'input',
      prop: 'personalIdCard',
      label: '身份证号',
      show: formData.value.userType === 'personal'
    },
    {
      type: 'input',
      prop: 'companyName',
      label: '公司名称',
      show: formData.value.userType === 'business'
    },
    {
      type: 'input',
      prop: 'businessLicense',
      label: '营业执照号',
      show: formData.value.userType === 'business'
    }
  ])

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
  }
</script>
```

### 表单联动

```vue
<template>
  <C_Form
    :options="linkedOptions"
    v-model="formData"
    @submit="handleSubmit"
  />
</template>

<script setup>
  const formData = ref({})

  // 省市数据
  const provinces = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广东', value: 'guangdong' }
  ]

  const cities = {
    beijing: [{ label: '北京市', value: 'beijing_city' }],
    shanghai: [{ label: '上海市', value: 'shanghai_city' }],
    guangdong: [
      { label: '广州市', value: 'guangzhou' },
      { label: '深圳市', value: 'shenzhen' }
    ]
  }

  const linkedOptions = computed(() => [
    {
      type: 'select',
      prop: 'province',
      label: '省份',
      children: provinces
    },
    {
      type: 'select',
      prop: 'city',
      label: '城市',
      children: formData.value.province 
        ? cities[formData.value.province] || []
        : [],
      attrs: { 
        disabled: !formData.value.province,
        placeholder: formData.value.province ? '请选择城市' : '请先选择省份'
      }
    }
  ])

  // 当省份改变时，清空城市选择
  watch(() => formData.value.province, () => {
    formData.value.city = null
  })

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
  }
</script>
```

## 🎨 自定义样式

### CSS 变量

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

### 主题定制

```vue
<template>
  <div class="custom-theme">
    <!-- 深色主题 -->
    <C_Form
      :options="options"
      class="dark-theme"
    />

    <!-- 彩色主题 -->
    <C_Form
      :options="options"
      class="colorful-theme"
    />
  </div>
</template>

<style scoped>
  .dark-theme {
    --form-bg-color: #1f1f1f;
    --form-text-color: #ffffff;
    --form-border-color: #434343;
    --form-primary-color: #177ddc;
  }

  .colorful-theme {
    --form-primary-color: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    --form-hover-color: #ff6b6b;
    --form-focus-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
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
<!-- ✅ 推荐：完整的验证规则 -->
<script setup>
  const options = [
    {
      type: 'input',
      prop: 'email',
      rules: [
        { required: true, message: '邮箱不能为空' },
        { type: 'email', message: '邮箱格式不正确' }
      ]
    }
  ]
</script>

<!-- ❌ 不推荐：缺少验证信息 -->
<script setup>
  const options = [
    {
      type: 'input',
      prop: 'email',
      rules: [{ required: true }] // 缺少错误提示
    }
  ]
</script>
```

### 3. 性能优化

```vue
<!-- ✅ 推荐：使用计算属性 -->
<script setup>
  const computedOptions = computed(() => {
    return baseOptions.map(option => ({
      ...option,
      show: shouldShowField(option)
    }))
  })
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
// 确保规则格式正确
const rules = [
  { required: true, message: '不能为空' }, // ✅ 正确
  { required: true }, // ❌ 缺少message
  'required' // ❌ 格式错误
]
```

#### Q2: 动态字段不显示？

**A2:** 检查字段配置：

```javascript
// 确保show属性设置正确
const option = {
  type: 'input',
  prop: 'dynamicField',
  label: '动态字段',
  show: true // 确保不是false或undefined
}
```

#### Q3: 表单数据不更新？

**A3:** 检查数据绑定：

```vue
<!-- 使用v-model确保双向绑定 -->
<C_Form
  v-model="formData"
  :options="options"
/>
```

#### Q4: 自定义组件渲染失败？

**A4:** 检查组件注册：

```javascript
// 确保自定义组件已正确注册
const COMPONENT_MAP = {
  customInput: resolveComponent('CustomInput') // 确保组件存在
}
```

## 🎯 最佳实践

### 1. 表单结构设计

```javascript
// ✅ 推荐：清晰的表单结构
const formOptions = [
  // 基础信息组
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    layout: { group: 'basic' }
  },
  // 联系信息组
  {
    type: 'input',
    prop: 'email',
    label: '邮箱',
    layout: { group: 'contact' }
  }
]
```

### 2. 错误处理

```javascript
const handleSubmit = async ({ model, form }) => {
  try {
    await submitForm(model)
    $message.success('提交成功')
  } catch (error) {
    // 处理业务错误
    if (error.code === 'VALIDATION_ERROR') {
      // 设置服务端验证错误
      form.setFieldsError(error.fieldErrors)
    } else {
      $message.error('提交失败，请重试')
    }
  }
}
```

### 3. 国际化支持

```javascript
const { t } = useI18n()

const options = computed(() => [
  {
    type: 'input',
    prop: 'name',
    label: t('form.name'),
    placeholder: t('form.namePlaceholder'),
    rules: [
      { required: true, message: t('form.nameRequired') }
    ]
  }
])
```

### 4. 类型安全

```typescript
// 定义表单数据类型
interface UserForm {
  name: string
  email: string
  age: number
}

// 使用类型约束
const formData = ref<UserForm>({
  name: '',
  email: '',
  age: 0
})
```

## 📝 更新日志

### v1.0.0 (2025-07-15)

- ✨ 支持8种布局模式（默认、行内、网格、卡片、标签页、步骤、动态、自定义）
- ✨ 内置15+种表单控件类型
- ✨ 完整的表单验证体系
- ✨ 动态字段管理功能
- ✨ 灵活的插槽系统
- ✨ 完整的TypeScript支持
- ✨ 响应式设计支持

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved.

---

**💡 提示**: 这个表单组件设计用于快速构建各种复杂表单，支持多种布局和丰富的控件类型。无论是简单的登录表单还是复杂的多步骤表单，都能轻松应对。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更高效的表单开发体验！ 🚀