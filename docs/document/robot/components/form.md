---
outline: 'deep'
---

# C_Form 智能表单组件

> 🚀 基于 Naive UI 的超强动态表单生成器，「薄 UI 壳 + 厚 Composable 引擎」架构，让表单开发变得前所未有的简单

## ✨ 特性

- **🎯 8种布局模式** — 默认（default）、行内（inline）、网格（grid）、卡片（card）、标签页（tabs）、步骤（steps）、动态（dynamic）、自定义（custom）
- **🧩 16种表单控件** — input、textarea、inputNumber、select、checkbox、radio、switch、slider、rate、datePicker、daterange、timePicker、cascader、colorPicker、upload、editor
- **⚡ 统一 config 对象** — 单一 `config` prop 收拢原先 13 个分散 Props，配置清晰、维护简单
- **🛡️ 多层级验证** — 全量 / 字段级 / 步骤级 / 标签页级 / 动态字段 / 分组级验证
- **🎨 灵活的插槽系统** — `action` 插槽暴露 validate/reset/model 等全量 API
- **📱 响应式设计** — Grid 栅格自适应、Inline 自动换行
- **🔄 动态字段管理** — 运行时增删、切换可见性、配置导出
- **📝 布局事件回调** — tab/step 切换、字段增删、分组折叠等事件统一收入 config
- **💪 TypeScript** — 完整的类型定义和类型安全
- **⚡ 高性能渲染** — Composable 拆分引擎，大表单依然流畅

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

## 🏗️ 架构概览

```
C_Form/index.vue ──── 薄 UI 壳（~308 行，模板 + 事件桥接 + ComponentMap）
  │
  ├── useFormConfig     ← 配置解析（resolveFormConfig）
  ├── useFormState      ← 状态引擎（formModel + formRules + 多层验证）
  ├── useFormRenderer   ← 渲染引擎（16 种控件 VNode 生成）
  └── layouts/          ← 8 种布局组件
       ├── Default      ← 默认垂直布局
       ├── Inline       ← 行内横向布局
       ├── Grid         ← 栅格布局（cols + span）
       ├── Card         ← 卡片分组布局
       ├── Tabs         ← 标签页布局
       ├── Steps        ← 步骤向导布局
       ├── Dynamic      ← 动态字段布局
       └── Custom       ← 自定义渲染布局（设计模式 + 填写模式）
```

## 🎯 快速开始

### 基础用法

```vue {3-7}
<template>
  <!-- 最简单的表单 -->
  <C_Form
    :options="formOptions"
    :config="{ layout: 'default' }"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import { RULE_COMBOS, PRESET_RULES } from '@robot-admin/form-validate'

  const formOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: RULE_COMBOS.username('用户名'),
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: RULE_COMBOS.email('邮箱'),
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      rules: [
        PRESET_RULES.required('年龄'),
        PRESET_RULES.range('年龄', 1, 120),
      ],
      attrs: { min: 1, max: 120 },
    },
  ]

  const handleSubmit = ({ model, form }) => {
    console.log('表单数据:', model)
  }
</script>
```

### 8种布局类型一键切换

```vue {16-22}
<template>
  <div class="form-demo">
    <!-- 布局选择器 -->
    <div class="layout-selector">
      <button
        v-for="layout in layoutOptions"
        :key="layout.value"
        :class="{ active: currentLayout === layout.value }"
        @click="currentLayout = layout.value"
      >
        {{ layout.label }}
      </button>
    </div>

    <!-- 动态表单 — 只需切换 config.layout -->
    <C_Form
      ref="formRef"
      :options="formOptions"
      :config="formConfig"
      v-model="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@robot-admin/form-validate'

  const formRef = ref()
  const formData = ref({})
  const currentLayout = ref('default')

  const layoutOptions = [
    { label: '默认布局', value: 'default' },
    { label: '行内布局', value: 'inline' },
    { label: '网格布局', value: 'grid' },
    { label: '卡片布局', value: 'card' },
    { label: '标签页布局', value: 'tabs' },
    { label: '步骤布局', value: 'steps' },
    { label: '动态布局', value: 'dynamic' },
    { label: '自定义渲染', value: 'custom' },
  ]

  // 统一 config 对象 — 切换布局只改 layout 字段
  const formConfig = computed(() => ({
    layout: currentLayout.value,
    labelPlacement: 'left',
    labelWidth: 120,
    validateOnChange: false,
    // 各布局子配置
    grid: { cols: 24, gutter: 16 },
    tabs: {
      tabs: [
        { key: 'basic', title: '基本信息' },
        { key: 'contact', title: '联系方式' },
      ],
    },
    steps: {
      steps: [
        { key: 'step1', title: '基本信息', required: true },
        { key: 'step2', title: '联系方式' },
        { key: 'step3', title: '确认提交' },
      ],
      validateBeforeNext: true,
    },
  }))

  const formOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: RULE_COMBOS.username('用户名'),
      layout: { span: 12, tab: 'basic', step: 'step1' },
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱',
      rules: RULE_COMBOS.email('邮箱'),
      layout: { span: 12, tab: 'contact', step: 'step2' },
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      children: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
      rules: [PRESET_RULES.required('性别')],
      layout: { span: 12, tab: 'basic', step: 'step1' },
    },
  ]

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
  }
</script>
```

## 📖 API 文档

### Props（极简 API）

| 参数           | 类型           | 默认值 | 说明                         |
| -------------- | -------------- | ------ | ---------------------------- |
| **options**    | `FormOption[]` | `[]`   | 表单字段配置数组（必需）     |
| **modelValue** | `FormModel`    | `{}`   | 表单数据（v-model 双向绑定） |
| **config**     | `FormConfig`   | `{}`   | 统一配置对象                 |

### `config` 配置详解

```typescript
interface FormConfig extends LayoutCallbacks {
  layout?: LayoutType // 默认 'default'
  labelPlacement?: 'left' | 'top' // 默认 'left'
  labelWidth?: string | number // 默认 'auto'
  size?: 'small' | 'medium' | 'large' // 默认 'medium'
  disabled?: boolean // 默认 false
  readonly?: boolean // 默认 false
  showActions?: boolean // 默认 true
  validateOnChange?: boolean // 默认 false

  // 布局级子配置（仅对应布局生效）
  grid?: GridLayoutConfig
  inline?: InlineLayoutConfig
  card?: CardLayoutConfig
  tabs?: TabsLayoutConfig
  steps?: StepsLayoutConfig
  dynamic?: DynamicLayoutConfig
  custom?: CustomLayoutConfig
}
```

#### GridLayoutConfig — 网格布局

| 字段      | 类型     | 默认值 | 说明     |
| --------- | -------- | ------ | -------- |
| `cols`    | `number` | `24`   | 栅格列数 |
| `gutter`  | `number` | `0`    | 栅格间距 |
| `yGutter` | `number` | —      | 垂直间距 |
| `xGap`    | `number` | —      | 水平间距 |
| `yGap`    | `number` | —      | 垂直间距 |

#### InlineLayoutConfig — 行内布局

| 字段    | 类型                           | 默认值    | 说明     |
| ------- | ------------------------------ | --------- | -------- |
| `gap`   | `number`                       | `16`      | 元素间距 |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | 对齐方式 |
| `wrap`  | `boolean`                      | `true`    | 是否换行 |

#### CardLayoutConfig — 卡片布局

| 字段       | 类型            | 说明         |
| ---------- | --------------- | ------------ |
| `groups`   | `GroupConfig[]` | 卡片分组配置 |
| `spacing`  | `number`        | 卡片间距     |
| `bordered` | `boolean`       | 是否显示边框 |

#### TabsLayoutConfig — 标签页布局

| 字段         | 类型                                     | 说明             |
| ------------ | ---------------------------------------- | ---------------- |
| `tabs`       | `TabConfig[]`                            | 标签页配置       |
| `placement`  | `'top' \| 'left' \| 'right' \| 'bottom'` | 标签页位置       |
| `defaultTab` | `string`                                 | 默认激活的标签页 |

#### StepsLayoutConfig — 步骤布局

| 字段                 | 类型                  | 默认值     | 说明           |
| -------------------- | --------------------- | ---------- | -------------- |
| `steps`              | `StepConfig[]`        | —          | 步骤配置       |
| `vertical`           | `boolean`             | `false`    | 垂直布局       |
| `size`               | `'small' \| 'medium'` | `'medium'` | 步骤器尺寸     |
| `validateBeforeNext` | `boolean`             | `false`    | 下一步前验证   |
| `prevButtonText`     | `string`              | `'上一步'` | 上一步按钮文字 |
| `nextButtonText`     | `string`              | `'下一步'` | 下一步按钮文字 |
| `defaultStep`        | `number`              | `0`        | 默认步骤       |
| `showStepHeader`     | `boolean`             | `true`     | 显示步骤标题   |

#### DynamicLayoutConfig — 动态布局

| 字段                        | 类型               | 说明                   |
| --------------------------- | ------------------ | ---------------------- |
| `grid`                      | `{ cols, gutter }` | 内部网格配置           |
| `controls.showControls`     | `boolean`          | 显示全局控制按钮       |
| `controls.showItemControls` | `boolean`          | 显示每个字段的控制按钮 |
| `controls.showStats`        | `boolean`          | 显示统计信息           |
| `dynamic.allowAdd`          | `boolean`          | 允许添加字段           |
| `dynamic.allowRemove`       | `boolean`          | 允许删除字段           |
| `dynamic.allowToggle`       | `boolean`          | 允许切换可见性         |
| `dynamic.maxFields`         | `number`           | 最大字段数             |

#### CustomLayoutConfig — 自定义渲染布局

| 字段                       | 类型                       | 说明         |
| -------------------------- | -------------------------- | ------------ |
| `groups`                   | `GroupConfig[]`            | 分组配置     |
| `rendering.mode`           | `'enhanced' \| 'standard'` | 渲染模式     |
| `rendering.animations`     | `boolean`                  | 启用动画     |
| `rendering.tooltips`       | `boolean`                  | 启用提示     |
| `display.showIntro`        | `boolean`                  | 显示介绍     |
| `display.showModeSwitch`   | `boolean`                  | 显示模式切换 |
| `display.showGroupActions` | `boolean`                  | 显示分组操作 |
| `display.showStats`        | `boolean`                  | 显示统计     |

#### LayoutCallbacks — 布局事件回调

```typescript
interface LayoutCallbacks {
  // 标签页事件
  onTabChange?: (tabKey: string, tabIndex: number) => void
  onTabValidate?: (tabKey: string) => void

  // 步骤事件
  onStepChange?: (stepIndex: number, stepKey: string) => void
  onStepBeforeChange?: (currentStep: number, targetStep: number) => void
  onStepValidate?: (stepIndex: number) => void

  // 动态字段事件
  onFieldAdd?: (fieldConfig: DynamicFieldConfig) => void
  onFieldRemove?: (fieldId: string) => void
  onFieldToggle?: (fieldId: string, visible: boolean) => void
  onFieldsClear?: () => void

  // 自定义布局事件
  onRenderModeChange?: (mode: RenderMode) => void
  onGroupToggle?: (groupKey: string, collapsed: boolean) => void
  onGroupReset?: (groupKey: string) => void

  // 通用事件
  onFieldsChange?: (fields: FormOption[]) => void
}
```

### Events

| 事件名                | 参数                 | 说明                       |
| --------------------- | -------------------- | -------------------------- |
| **submit**            | `({ model, form })`  | 表单提交（验证通过后触发） |
| **update:modelValue** | `(model: FormModel)` | v-model 双向绑定           |
| **validate-success**  | `(model: FormModel)` | 验证成功                   |
| **validate-error**    | `(errors: unknown)`  | 验证失败                   |

> **注意**: 布局级事件（tab-change、step-change、field-add 等）已迁移到 `config` 的回调函数中，不再作为 emit 暴露。

### 暴露方法

| 方法名                       | 签名                                               | 说明                |
| ---------------------------- | -------------------------------------------------- | ------------------- |
| **validate**                 | `() => Promise<void>`                              | 全量验证            |
| **validateField**            | `(field: string \| string[]) => Promise<void>`     | 字段级验证          |
| **validateStep**             | `(stepIndex: number) => Promise<boolean>`          | 验证指定步骤        |
| **validateTab**              | `(tabKey: string) => Promise<boolean>`             | 验证指定标签页      |
| **validateDynamicFields**    | `() => Promise<boolean>`                           | 验证所有动态字段    |
| **validateCustomGroup**      | `(groupKey: string) => Promise<boolean>`           | 验证指定分组        |
| **clearValidation**          | `(field?: string \| string[]) => void`             | 清除验证状态        |
| **getModel**                 | `() => FormModel`                                  | 获取表单数据快照    |
| **setFields**                | `(fields: Record<string, any>) => void`            | 批量设置字段值      |
| **resetFields**              | `() => void`                                       | 重置到默认值        |
| **setFieldValue**            | `(field, value, shouldValidate?) => Promise<void>` | 设置单个字段值      |
| **getFieldValue**            | `(field: string) => any`                           | 获取单个字段值      |
| **setFieldsValue**           | `(fields, shouldValidate?) => Promise<void>`       | 批量设置 + 可选验证 |
| **initialize**               | `() => void`                                       | 手动重新初始化      |
| **formRef**                  | `Ref<FormInst \| null>`                            | 原生 NForm 实例引用 |
| **formModel**                | `reactive<FormModel>`                              | 响应式表单数据      |
| **layoutType**               | `ComputedRef<LayoutType>`                          | 当前布局类型        |
| **shouldShowDefaultActions** | `ComputedRef<boolean>`                             | 是否显示默认按钮    |

### Slots

#### action — 自定义操作按钮区

```vue
<C_Form :options="opts" :config="cfg">
  <template #action="{ form, model, validate, validateField, reset, setFields, getModel, clearValidation }">
    <n-space>
      <n-button type="primary" @click="validate">提交</n-button>
      <n-button @click="reset">重置</n-button>
    </n-space>
  </template>
</C_Form>
```

| 参数              | 类型                       | 说明       |
| ----------------- | -------------------------- | ---------- |
| `form`            | `FormInst \| null`         | NForm 实例 |
| `model`           | `FormModel`                | 表单数据   |
| `validate`        | `() => Promise<void>`      | 全量验证   |
| `validateField`   | `(field) => Promise<void>` | 字段验证   |
| `reset`           | `() => void`               | 重置表单   |
| `setFields`       | `(fields) => void`         | 批量设置   |
| `getModel`        | `() => FormModel`          | 获取快照   |
| `clearValidation` | `(field?) => void`         | 清除验证   |

> **注意**: `action` 插槽仅在 `showActions` 为 `true` 且布局不是 `steps`/`custom` 时显示（这两种布局有自己的控制按钮）。

#### uploadClick / uploadTip — 上传组件插槽

```vue
<C_Form :options="uploadOptions">
  <template #uploadClick>
    <n-button>点击上传</n-button>
  </template>
  <template #uploadTip>
    <p>支持 jpg、png 格式，单文件不超过 5MB</p>
  </template>
</C_Form>
```

::: details 🔧 类型定义 — 完整的 TypeScript 接口定义

#### 布局类型

```typescript
type LayoutType =
  | 'default'
  | 'inline'
  | 'grid'
  | 'card'
  | 'tabs'
  | 'steps'
  | 'dynamic'
  | 'custom'
```

#### 组件类型（16 种内置控件）

```typescript
type ComponentType =
  | 'input'
  | 'textarea'
  | 'inputNumber'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'slider'
  | 'rate'
  | 'datePicker'
  | 'daterange'
  | 'timePicker'
  | 'cascader'
  | 'colorPicker'
  | 'upload'
  | 'editor'
```

#### FormOption — 核心字段配置

```typescript
interface FormOption {
  id?: string // 唯一标识（动态字段用）
  type: ComponentType | string // 控件类型
  prop: string // 字段名
  label?: string // 标签文本
  value?: any // 初始默认值
  placeholder?: string // 占位文本
  rules?: FieldRule[] // 验证规则
  attrs?: Record<string, any> // 透传给底层 naive-ui 组件
  children?: OptionItem[] // select/checkbox/radio 的选项
  show?: boolean // false 时隐藏字段
  layout?: ItemLayoutConfig // 布局定位
  help?: string // 帮助文本
  required?: boolean // 是否必填
  dependsOn?: string | string[] // 依赖字段
  showWhen?: (formModel: Record<string, any>) => boolean // 条件显示
}
```

#### ItemLayoutConfig — 字段布局定位

```typescript
interface ItemLayoutConfig {
  span?: number // Grid 列跨度（基于 cols）
  offset?: number // 偏移
  width?: string | number // 固定宽度
  group?: string // Card/Custom 分组 key
  tab?: string // Tabs 标签页 key
  step?: string // Steps 步骤 key
  dynamic?: boolean // Dynamic 布局标记
  customRender?: boolean // 自定义渲染标记
  enhanced?: boolean // 增强模式标记
  class?: string // CSS 类名
  style?: CSSProperties // 内联样式
  hidden?: boolean // 隐藏
}
```

#### 分组/标签/步骤配置

```typescript
interface GroupConfig {
  key: string
  title: string
  description?: string
  icon?: string
  color?: string
  collapsible?: boolean
  collapsed?: boolean
  defaultExpanded?: boolean
}

interface TabConfig {
  key: string
  title: string
  description?: string
  disabled?: boolean
  icon?: string
}

interface StepConfig {
  key: string
  title: string
  description?: string
  disabled?: boolean
  icon?: string
  required?: boolean
}
```

:::

## 🎨 使用示例

::: details 📝 默认布局 — 基础表单 + 自定义操作栏

```vue {13-20}
<template>
  <C_Form
    ref="formRef"
    :options="formOptions"
    :config="formConfig"
    v-model="formData"
    @submit="handleSubmit"
    @validate-success="handleValidateSuccess"
    @validate-error="handleValidateError"
  >
    <!-- 自定义操作按钮 -->
    <template #action="{ validate, reset }">
      <C_ActionBar
        :actions="[
          {
            key: 'submit',
            label: '提交表单',
            type: 'primary',
            onClick: validate,
          },
          { key: 'reset', label: '重置表单', onClick: reset },
        ]"
        :config="{ align: 'right', gap: 16 }"
      />
    </template>
  </C_Form>
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@robot-admin/form-validate'

  const formRef = ref()
  const formData = ref({})

  const formConfig = computed(() => ({
    layout: 'default',
    labelPlacement: 'left',
    labelWidth: 120,
    validateOnChange: false,
    onFieldsChange: fields => console.log('字段变化:', fields),
  }))

  const formOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: RULE_COMBOS.username('用户名'),
    },
    {
      type: 'input',
      prop: 'realName',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      rules: [
        PRESET_RULES.required('真实姓名'),
        PRESET_RULES.length('真实姓名', 2, 20),
      ],
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      rules: [
        PRESET_RULES.required('年龄'),
        PRESET_RULES.range('年龄', 1, 120),
      ],
      attrs: { min: 1, max: 120 },
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      rules: [PRESET_RULES.required('性别')],
      children: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
      ],
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      placeholder: '请输入邮箱地址',
      rules: RULE_COMBOS.email('邮箱'),
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      placeholder: '请输入手机号',
      rules: RULE_COMBOS.mobile('手机号'),
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      placeholder: '请输入密码',
      rules: RULE_COMBOS.password('密码'),
      attrs: { type: 'password', showPasswordOn: 'mousedown' },
    },
    {
      type: 'textarea',
      prop: 'address',
      label: '地址',
      placeholder: '请输入详细地址',
      rules: [
        PRESET_RULES.required('地址'),
        PRESET_RULES.length('地址', 5, 200),
      ],
      attrs: { rows: 3 },
    },
    {
      type: 'editor',
      prop: 'description',
      label: '个人简介',
      placeholder: '请输入个人简介...',
      value: '',
      attrs: { height: 200 },
    },
  ]

  const handleSubmit = ({ model }) => {
    console.log('表单数据:', model)
    message.success('提交成功！')
  }
  const handleValidateSuccess = model => console.log('验证通过:', model)
  const handleValidateError = errors => message.error('请检查表单填写')
</script>
```

:::

::: details 📐 网格布局 — 栅格控制 + span 分配

```vue {5-8}
<template>
  <C_Form
    ref="formRef"
    :options="formOptions"
    :config="{
      layout: 'grid',
      grid: { cols: 24, gutter: 16 },
      labelPlacement: 'left',
    }"
    v-model="formData"
    @submit="handleSubmit"
  >
    <template #action="{ validate, reset }">
      <C_ActionBar
        :actions="[
          { key: 'submit', label: '提交', type: 'primary', onClick: validate },
          { key: 'reset', label: '重置', onClick: reset },
        ]"
      />
    </template>
  </C_Form>
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@robot-admin/form-validate'

  const formData = ref({})

  const formOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: RULE_COMBOS.username('用户名'),
      layout: { span: 12 }, // 占半行
    },
    {
      type: 'input',
      prop: 'realName',
      label: '真实姓名',
      rules: [PRESET_RULES.required('真实姓名')],
      layout: { span: 12 }, // 占半行
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱'),
      layout: { span: 12 },
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      rules: RULE_COMBOS.mobile('手机号'),
      layout: { span: 12 },
    },
    {
      type: 'textarea',
      prop: 'address',
      label: '地址',
      rules: [PRESET_RULES.required('地址')],
      attrs: { rows: 3 },
      layout: { span: 24 }, // 占整行
    },
  ]

  const handleSubmit = ({ model }) => {
    console.log('提交:', model)
  }
</script>
```

:::

::: details 📋 步骤布局 — 多步骤向导 + 验证后继续

```vue {5-19}
<template>
  <C_Form
    ref="formRef"
    :options="formOptions"
    :config="{
      layout: 'steps',
      labelWidth: 120,
      steps: {
        steps: [
          {
            key: 'basic',
            title: '基本信息',
            description: '填写基础资料',
            required: true,
          },
          { key: 'contact', title: '联系方式', description: '填写联系信息' },
          { key: 'security', title: '安全设置', description: '设置密码' },
          { key: 'confirm', title: '确认提交', description: '确认信息无误' },
        ],
        validateBeforeNext: true,
        showStepHeader: true,
      },
      onStepChange: (stepIndex, stepKey) => {
        console.log(`切换到步骤 ${stepIndex}: ${stepKey}`)
      },
    }"
    v-model="formData"
    @submit="handleFinalSubmit"
  />
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@robot-admin/form-validate'

  const formRef = ref()
  const formData = ref({})

  const formOptions = [
    // 步骤1: 基本信息
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: RULE_COMBOS.username('用户名'),
      layout: { step: 'basic' },
    },
    {
      type: 'input',
      prop: 'realName',
      label: '真实姓名',
      rules: [
        PRESET_RULES.required('真实姓名'),
        PRESET_RULES.length('真实姓名', 2, 20),
      ],
      layout: { step: 'basic' },
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      rules: [
        PRESET_RULES.required('年龄'),
        PRESET_RULES.range('年龄', 18, 65),
      ],
      attrs: { min: 18, max: 65 },
      layout: { step: 'basic' },
    },
    // 步骤2: 联系方式
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱'),
      layout: { step: 'contact' },
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      rules: RULE_COMBOS.mobile('手机号'),
      layout: { step: 'contact' },
    },
    {
      type: 'textarea',
      prop: 'address',
      label: '地址',
      rules: [PRESET_RULES.required('地址')],
      attrs: { rows: 3 },
      layout: { step: 'contact' },
    },
    // 步骤3: 安全设置
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      rules: RULE_COMBOS.password('密码'),
      attrs: { type: 'password', showPasswordOn: 'click' },
      layout: { step: 'security' },
    },
    {
      type: 'input',
      prop: 'confirmPassword',
      label: '确认密码',
      rules: [PRESET_RULES.required('确认密码')],
      attrs: { type: 'password' },
      layout: { step: 'security' },
    },
  ]

  const handleFinalSubmit = async ({ model }) => {
    console.log('最终提交:', model)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('注册成功！')
    } catch (error) {
      message.error('提交失败')
    }
  }
</script>
```

:::

::: details 🏷️ 标签页布局 — 分组管理 + 标签切换

```vue {5-16}
<template>
  <C_Form
    ref="formRef"
    :options="formOptions"
    :config="{
      layout: 'tabs',
      labelWidth: 120,
      tabs: {
        tabs: [
          { key: 'personal', title: '个人信息', icon: 'i-carbon:user' },
          { key: 'account', title: '账号信息', icon: 'i-carbon:locked' },
          { key: 'preferences', title: '偏好设置', icon: 'i-carbon:settings' },
        ],
        placement: 'top',
        defaultTab: 'personal',
      },
      onTabChange: (tabKey, tabIndex) => {
        console.log(`切换到标签: ${tabKey}`)
      },
    }"
    v-model="formData"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@robot-admin/form-validate'

  const formData = ref({})

  const formOptions = [
    // 个人信息标签
    {
      type: 'input',
      prop: 'name',
      label: '姓名',
      rules: [PRESET_RULES.required('姓名')],
      layout: { tab: 'personal' },
    },
    {
      type: 'select',
      prop: 'gender',
      label: '性别',
      children: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
      layout: { tab: 'personal' },
    },
    {
      type: 'datePicker',
      prop: 'birthday',
      label: '生日',
      attrs: { type: 'date' },
      layout: { tab: 'personal' },
    },
    // 账号信息标签
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱'),
      layout: { tab: 'account' },
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      rules: RULE_COMBOS.password('密码'),
      attrs: { type: 'password' },
      layout: { tab: 'account' },
    },
    // 偏好设置标签
    {
      type: 'switch',
      prop: 'darkMode',
      label: '深色模式',
      value: false,
      layout: { tab: 'preferences' },
    },
    {
      type: 'slider',
      prop: 'fontSize',
      label: '字体大小',
      value: 14,
      attrs: { min: 12, max: 24, step: 1 },
      layout: { tab: 'preferences' },
    },
  ]

  const handleSubmit = ({ model }) => {
    console.log('提交:', model)
  }
</script>
```

:::

::: details 🃏 卡片布局 — 分组卡片 + 折叠功能

```vue {5-14}
<template>
  <C_Form
    ref="formRef"
    :options="formOptions"
    :config="{
      layout: 'card',
      labelWidth: 120,
      card: {
        groups: [
          {
            key: 'basic',
            title: '基础信息',
            icon: 'i-carbon:user',
            collapsible: true,
          },
          {
            key: 'contact',
            title: '联系方式',
            icon: 'i-carbon:phone',
            collapsible: true,
          },
          {
            key: 'other',
            title: '其他信息',
            icon: 'i-carbon:document',
            collapsed: true,
          },
        ],
      },
    }"
    v-model="formData"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@robot-admin/form-validate'

  const formData = ref({})

  const formOptions = [
    {
      type: 'input',
      prop: 'name',
      label: '姓名',
      rules: [PRESET_RULES.required('姓名')],
      layout: { group: 'basic' },
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      rules: [PRESET_RULES.required('年龄')],
      attrs: { min: 1, max: 120 },
      layout: { group: 'basic' },
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱'),
      layout: { group: 'contact' },
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      rules: RULE_COMBOS.mobile('手机号'),
      layout: { group: 'contact' },
    },
    {
      type: 'textarea',
      prop: 'remark',
      label: '备注',
      attrs: { rows: 3 },
      layout: { group: 'other' },
    },
  ]

  const handleSubmit = ({ model }) => {
    console.log('提交:', model)
  }
</script>
```

:::

::: details 🔄 动态布局 — 运行时增删字段 + 可见性切换

```vue {5-17}
<template>
  <C_Form
    ref="formRef"
    :options="formOptions"
    :config="{
      layout: 'dynamic',
      dynamic: {
        grid: { cols: 24, gutter: 16 },
        controls: {
          showControls: true,
          showItemControls: true,
          showStats: true,
        },
        dynamic: {
          allowAdd: true,
          allowRemove: true,
          allowToggle: true,
          maxFields: 20,
        },
      },
      onFieldAdd: config => console.log('添加字段:', config),
      onFieldRemove: id => console.log('删除字段:', id),
    }"
    v-model="formData"
    @submit="handleSubmit"
  />
</template>

<script setup>
  const formData = ref({})

  const formOptions = [
    { type: 'input', prop: 'name', label: '姓名', layout: { dynamic: true } },
    { type: 'input', prop: 'email', label: '邮箱', layout: { dynamic: true } },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      layout: { dynamic: true },
    },
  ]

  const handleSubmit = ({ model }) => {
    console.log('提交:', model)
  }
</script>
```

:::

::: details 📋 封装验证工具 — PRESET_RULES + RULE_COMBOS + 自定义规则

```vue
<template>
  <C_Form
    ref="formRef"
    :options="advancedOptions"
    :config="{ layout: 'default', labelWidth: 120 }"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import {
    PRESET_RULES, // 单条预设规则
    RULE_COMBOS, // 规则组合（返回数组）
    customRule, // 自定义同步规则
    customAsyncRule, // 自定义异步规则
  } from '@robot-admin/form-validate'

  const formRef = ref()

  const advancedOptions = [
    {
      type: 'input',
      prop: 'username',
      label: '用户名',
      rules: [
        ...RULE_COMBOS.username('用户名'),
        // 异步检查用户名是否已存在
        customAsyncRule(
          async value => {
            if (!value) return true
            const res = await fetch(`/api/check-username?name=${value}`)
            const data = await res.json()
            return !data.exists
          },
          '用户名已存在，请换一个',
          'blur'
        ),
      ],
    },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      attrs: { type: 'password', showPasswordOn: 'click' },
      rules: RULE_COMBOS.password('密码'),
    },
    {
      type: 'input',
      prop: 'confirmPassword',
      label: '确认密码',
      attrs: { type: 'password' },
      rules: RULE_COMBOS.confirmPassword('确认密码', () =>
        formRef.value?.getFieldValue('password')
      ),
    },
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱'),
    },
    {
      type: 'input',
      prop: 'phone',
      label: '手机号',
      rules: RULE_COMBOS.mobile('手机号'),
    },
    {
      type: 'inputNumber',
      prop: 'age',
      label: '年龄',
      rules: [
        PRESET_RULES.required('年龄'),
        PRESET_RULES.range('年龄', 1, 120),
      ],
    },
    {
      type: 'checkbox',
      prop: 'agreements',
      label: '协议',
      children: [
        { label: '我已阅读《用户协议》', value: 'user' },
        { label: '我已阅读《隐私政策》', value: 'privacy' },
      ],
      rules: [
        customRule(
          value => Array.isArray(value) && value.length === 2,
          '请同意所有协议'
        ),
      ],
    },
  ]

  const handleSubmit = ({ model }) => {
    console.log('验证通过:', model)
  }
</script>
```

:::

::: details 🔗 条件显示和字段联动

```vue
<template>
  <C_Form
    :options="conditionalOptions"
    :config="{ layout: 'default', labelWidth: 120 }"
    v-model="formData"
    @submit="handleSubmit"
  />
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS } from '@robot-admin/form-validate'

  const formData = ref({})

  const conditionalOptions = computed(() => [
    {
      type: 'select',
      prop: 'userType',
      label: '用户类型',
      children: [
        { label: '个人用户', value: 'personal' },
        { label: '企业用户', value: 'business' },
      ],
      rules: [PRESET_RULES.required('用户类型')],
    },
    // 个人用户字段 — 根据 userType 显示
    {
      type: 'input',
      prop: 'personalName',
      label: '真实姓名',
      show: formData.value.userType === 'personal',
      rules:
        formData.value.userType === 'personal'
          ? [PRESET_RULES.required('真实姓名')]
          : [],
    },
    {
      type: 'input',
      prop: 'idCard',
      label: '身份证号',
      show: formData.value.userType === 'personal',
      rules:
        formData.value.userType === 'personal'
          ? [PRESET_RULES.required('身份证号'), PRESET_RULES.idCard('身份证号')]
          : [],
    },
    // 企业用户字段
    {
      type: 'input',
      prop: 'companyName',
      label: '公司名称',
      show: formData.value.userType === 'business',
      rules:
        formData.value.userType === 'business'
          ? [PRESET_RULES.required('公司名称')]
          : [],
    },
    {
      type: 'input',
      prop: 'license',
      label: '营业执照号',
      show: formData.value.userType === 'business',
      rules:
        formData.value.userType === 'business'
          ? [PRESET_RULES.required('营业执照号')]
          : [],
    },
    // 通用字段 — 始终显示
    {
      type: 'input',
      prop: 'email',
      label: '邮箱',
      rules: RULE_COMBOS.email('邮箱'),
    },
  ])

  // 切换用户类型时清空相关字段
  watch(
    () => formData.value.userType,
    (newType, oldType) => {
      if (oldType === 'personal') {
        delete formData.value.personalName
        delete formData.value.idCard
      } else if (oldType === 'business') {
        delete formData.value.companyName
        delete formData.value.license
      }
    }
  )

  const handleSubmit = ({ model }) => {
    console.log('提交:', model)
  }
</script>
```

:::

## 🛠️ 高级用法

::: details ⚙️ Composable 引擎 — useFormState 核心 API

```typescript
// useFormState 返回的完整 API（内部使用，高级场景可直接访问）
const {
  formModel, // reactive — 表单数据模型
  formRules, // reactive — 验证规则映射
  visibleOptions, // computed — 过滤 show !== false 的字段
  initialize, // 初始化/重新初始化
  handleFieldChange, // 字段变化处理（配合 validateOnChange）

  // 多层级验证
  validate, // 全量验证
  validateField, // 字段级验证
  validateStep, // 步骤级验证（by stepIndex）
  validateTab, // 标签页级验证（by tabKey）
  validateDynamicFields, // 动态字段验证
  validateCustomGroup, // 分组验证（by groupKey）
  clearValidation, // 清除验证

  // 数据操作
  getModel, // 获取数据快照
  setFields, // 批量设置
  resetFields, // 重置到默认值
  setFieldValue, // 单个设置 + 可选验证
  getFieldValue, // 单个获取
  setFieldsValue, // 批量设置 + 可选验证

  // 提交和重置
  handleSubmit, // 验证 → emit submit
  handleReset, // 重置表单
} = useFormState(options, config, emit, formRef)
```

**关键初始化行为**：

- 每个 `FormOption` 的 `value` 字段设置初始值
- 未提供 `value` 时使用 `DEFAULT_VALUES`：`input → ''`，`select → null`，`upload → []`
- `initialize()` 只设置新字段默认值（`if (!(prop in formModel))`），不会覆盖已有用户输入
  :::

::: details 🎨 自定义渲染器 — registerRenderer 扩展

```typescript
import { registerRenderer } from '@/composables/Form/useFormRenderer'

// 注册自定义控件渲染器
registerRenderer('myCustomInput', (item, props, C) => {
  return h(MyCustomInput, {
    ...props,
    customProp: item.attrs?.customProp,
  })
})

// 使用
const options = [
  {
    type: 'myCustomInput', // 使用注册的自定义类型
    prop: 'customField',
    label: '自定义字段',
    attrs: { customProp: 'value' },
  },
]
```

:::

::: details 📱 响应式布局 — Grid 自适应

```vue
<template>
  <C_Form
    :options="formOptions"
    :config="responsiveConfig"
    class="responsive-form"
  />
</template>

<script setup>
  const breakpoint = useBreakpoint()

  const responsiveConfig = computed(() => ({
    layout: 'grid',
    labelPlacement: breakpoint.value.xs ? 'top' : 'left',
    grid: {
      cols: breakpoint.value.lg ? 24 : breakpoint.value.md ? 12 : 1,
      gutter: 16,
    },
  }))
</script>
```

:::

## ⚠️ 注意事项

### 1. config 对象 vs 独立 Props

::: code-group

```vue [✅ 新模式（config 对象）]
<C_Form
  :options="opts"
  :config="{
    layout: 'grid',
    labelPlacement: 'top',
    grid: { cols: 24, gutter: 16 },
    onFieldsChange: handleFieldsChange,
  }"
/>
```

```vue [❌ 旧模式（不再支持）]
<!-- 不要使用分散的 Props -->
<C_Form
  :options="opts"
  layout="grid"
  label-placement="top"
  :grid="{ cols: 24 }"
  @fields-change="handleFieldsChange"
/>
```

:::

### 2. 验证规则配置

::: code-group

```typescript [✅ 推荐]
// 使用封装的验证工具
import { RULE_COMBOS, PRESET_RULES } from '@robot-admin/form-validate'

const options = [
  { rules: RULE_COMBOS.email('邮箱') }, // 规则组合
  { rules: [PRESET_RULES.required('姓名')] }, // 单条预设
  { rules: [customRule(v => v > 0, '必须大于0')] }, // 自定义
]
```

```typescript [❌ 不推荐]
// 手写规则缺少错误提示
const options = [{ rules: [{ required: true, type: 'email' }] }]
```

:::

### 3. 字段布局定位

::: code-group

```typescript [✅ 推荐]
// layout 字段精确控制字段归属
const options = [
  { prop: 'name', layout: { span: 12 } }, // Grid 布局：占 12/24 列
  { prop: 'email', layout: { tab: 'contact' } }, // Tabs 布局：属于 contact 标签
  { prop: 'age', layout: { step: 'basic' } }, // Steps 布局：属于 basic 步骤
  { prop: 'remark', layout: { group: 'other' } }, // Card 布局：属于 other 分组
]
```

```typescript [❌ 不推荐]
// 没有 layout 配置，字段位置不可控
const options = [{ prop: 'name' }]
```

:::

### 4. 性能优化

::: code-group

```vue [✅ 推荐]
<script setup>
  // config 使用 computed
  const formConfig = computed(() => ({
    layout: currentLayout.value,
    grid: { cols: gridCols.value },
  }))

  // options 使用 computed 处理条件显示
  const formOptions = computed(() =>
    baseOptions.map(opt => ({
      ...opt,
      show: shouldShowField(opt),
    }))
  )
</script>
```

```vue [❌ 不推荐]
<!-- 模板中内联过滤 -->
<template>
  <C_Form :options="baseOptions.filter(shouldShowField)" />
</template>
```

:::

## 🐛 故障排除

::: details ❓ Q1: 表单验证不生效？
**A1:** 检查验证规则来源和配置：

```typescript
// ✅ 使用封装的验证工具
import { RULE_COMBOS, PRESET_RULES } from '@robot-admin/form-validate'

const options = [
  {
    type: 'input',
    prop: 'email',
    label: '邮箱',
    rules: RULE_COMBOS.email('邮箱'), // ✅ 完整的验证规则
  },
]

// ❌ 常见错误：
// 1. rules 为空数组
// 2. 手写规则缺少 message
// 3. 异步规则没有用 customAsyncRule
```

:::

::: details ❓ Q2: 布局事件（tab-change 等）收不到？
**A2:** 布局事件已迁移到 `config` 的回调函数，不再是 emit：

```typescript
// ✅ 新方式：在 config 中注册回调
const config = {
  layout: 'tabs',
  onTabChange: (tabKey, tabIndex) => {
    console.log('切换到:', tabKey)
  },
  onStepChange: (stepIndex, stepKey) => {
    console.log('步骤:', stepIndex)
  },
}

// ❌ 旧方式（不再支持）
// <C_Form @tab-change="..." @step-change="..." />
```

:::

::: details ❓ Q3: 步骤布局点击 Switch/表单控件时跳回第一步？
**A3:** 这是已修复的 bug。如果使用旧版本，检查是否正确使用了 `stepStructureKey` 优化：

```typescript
// ✅ 确保 steps 配置不依赖 formModel
const config = {
  steps: {
    steps: [
      { key: 'basic', title: '基本信息' }, // ✅ 静态配置
      { key: 'contact', title: '联系方式' },
    ],
  },
}

// ❌ 不要让步骤配置依赖表单数据
// steps: formData.value.xxx ? [...] : [...]
```

:::

::: details ❓ Q4: 动态字段不显示？
**A4:** 确保字段配置中 `show` 属性正确：

```typescript
// show 属性控制字段可见性
const options = computed(() => [
  {
    type: 'input',
    prop: 'field',
    label: '字段',
    show: condition.value, // ✅ 使用响应式值
    // show: false,            // 静态隐藏
  },
])

// 或者使用 showWhen 函数
const options = [
  {
    type: 'input',
    prop: 'field',
    showWhen: model => model.type === 'advanced', // 根据表单数据动态判断
  },
]
```

:::

::: details ❓ Q5: action 插槽不显示？
**A5:** 检查布局类型和 showActions 配置：

```typescript
// action 插槽在以下情况不显示：
// 1. showActions: false
// 2. layout: 'steps'  — 步骤布局有自己的上/下一步按钮
// 3. layout: 'custom' — 自定义布局有自己的控制按钮

// ✅ 需要自定义操作按钮的布局
const config = {
  layout: 'default', // 或 'inline' / 'grid' / 'card' / 'tabs'
  showActions: true, // 默认就是 true
}
```

:::

## 🎯 最佳实践

### 1. 验证规则管理

```typescript
import {
  PRESET_RULES, // 单条规则：required, email, length, range, mobile, idCard...
  RULE_COMBOS, // 规则组合：username, email, mobile, password, confirmPassword...
  customRule, // 同步自定义验证
  customAsyncRule, // 异步自定义验证
} from '@robot-admin/form-validate'

// ✅ 推荐：使用预设组合
const rules = {
  username: RULE_COMBOS.username('用户名'), // 必填 + 长度 3-20
  email: RULE_COMBOS.email('邮箱'), // 必填 + 邮箱格式
  phone: RULE_COMBOS.mobile('手机号'), // 必填 + 手机号格式
  password: RULE_COMBOS.password('密码'), // 必填 + 长度 6-20
}

// ✅ 推荐：确认密码联动
const confirmRule = RULE_COMBOS.confirmPassword('确认密码', () =>
  formRef.value?.getFieldValue('password')
)

// ✅ 自定义验证
const companyEmailRule = customRule(
  value => value?.includes('@company.com'),
  '必须使用公司邮箱',
  'blur'
)
```

### 2. 表单配置提取

```typescript
// ✅ 推荐：配置提取到独立 data.ts
// data.ts
export const getFormOptions = (): FormOption[] => [
  { type: 'input', prop: 'name', label: '姓名', rules: [...] },
  { type: 'input', prop: 'email', label: '邮箱', rules: [...] },
]

export const getFormConfig = (): FormConfig => ({
  layout: 'grid',
  grid: { cols: 24, gutter: 16 },
  labelWidth: 120,
})

// index.vue
import { getFormOptions, getFormConfig } from './data'
const formOptions = getFormOptions()
const formConfig = getFormConfig()
```

### 3. 类型安全

```typescript
import type { FormOption, FormModel, FormConfig } from '@/types/modules/form'

// ✅ 定义表单数据类型
interface UserForm {
  username: string
  email: string
  age: number
  gender: 'male' | 'female'
}

const formData = ref<UserForm>({
  username: '',
  email: '',
  age: 0,
  gender: 'male',
})

// ✅ 类型约束的配置
const config: FormConfig = {
  layout: 'default',
  labelWidth: 120,
}
```

### 4. 错误处理模式

```typescript
const handleSubmit = async ({ model, form }) => {
  try {
    loading.value = true
    await api.save(model)
    message.success('保存成功')
  } catch (error) {
    if (error.response?.status === 400) {
      message.error('数据格式错误')
    } else if (error.response?.status === 409) {
      message.error('数据冲突，请刷新后重试')
    } else {
      message.error('保存失败，请稍后重试')
    }
    console.error('保存失败:', error)
  } finally {
    loading.value = false
  }
}

const handleValidateError = errors => {
  if (Array.isArray(errors) && errors.length > 0) {
    message.error(errors[0]?.message || '表单验证失败')
  }
}
```

## 📝 更新日志

### v2.0.0 (2026-02)

- ✨ 全新「薄 UI 壳 + 厚 Composable 引擎」架构重构
- ✨ 统一 `config` 对象替代原先 13 个分散 Props
- ✨ 布局事件迁移到 `config` 回调（`LayoutCallbacks`）
- ✨ `useFormConfig` 配置解析 Composable
- ✨ `useFormState` 状态引擎（多层级验证 API）
- ✨ `useFormRenderer` 渲染引擎（16 种控件 + 自定义扩展）
- ✨ 修复 Steps 布局点击表单控件跳回第一步的 bug
- ✨ 修复 Tabs 布局同类 watch 抖动问题
- ✨ 集成 `@robot-admin/form-validate` 验证工具
- ✨ 完整的 TypeScript 类型定义

### v1.5.0 (2025-06)

- 🆕 新增动态布局和自定义渲染
- 🔧 优化验证机制和错误处理

### v1.0.0 (2025-06)

- 🎉 首次发布
- 🎨 支持 8 种布局类型
- 🧩 支持 16 种表单控件
- ✅ 完善的验证系统

<!--@include: ./snippets/contribute.md -->

**💡 提示**: C_Form 组件采用「薄 UI 壳 + 厚 Composable 引擎」架构——UI 层 ~308 行只负责模板和组件映射，核心逻辑全部在 `useFormConfig` / `useFormState` / `useFormRenderer` 三个 Composable 中。统一的 `config` 对象让配置清晰可维护，16 种内置控件 + `registerRenderer` 扩展能力覆盖各种业务场景。集成 `@robot-admin/form-validate` 验证工具 + 多层级验证 API，从简单登录表单到复杂多步骤向导都能轻松应对。如果遇到问题请先查看文档，或者在团队群里讨论。🚀
