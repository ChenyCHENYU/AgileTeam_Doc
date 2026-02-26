---
outline: 'deep'
---

# C_FormulaEditor 公式编辑器

> 🧮 自研的可视化公式编辑器，让业务人员也能自主配置计算规则。支持变量点选、虚拟键盘联动、自由键盘输入、实时语法校验与样例数据计算预览，广泛适用于绩效核算、成本规则、销售提成等场景。

## ✨ 特性

- **🎯 变量点选插入** — 左侧面板分组展示可用变量，点击即插入彩色 Chip 到光标位置，支持搜索过滤
- **⌨️ 虚拟键盘联动** — 运算符 / 数字 / 比较符 / 逻辑关键词一键插入，与键盘输入双向联动
- **📝 自由键盘输入** — 支持直接打字、粘贴，`[变量名]` 自动渲染为彩色 Chip
- **✅ 实时语法校验** — 括号匹配、变量合法性、函数注册检查，三态反馈（空/合法/错误）
- **📊 计算结果预览** — 传入样例数据后，实时展示公式执行结果及变量取值
- **ƒ 12 个内置函数** — IF / AND / OR / NOT / SUM / AVG / MAX / MIN / ABS / ROUND / CEIL / FLOOR
- **🌗 主题自动适配** — 完整跟随 Naive UI 亮色 / 暗色主题，CSS 变量驱动
- **📱 响应式布局** — 768px 以下自动切换为上下堆叠布局
- **💪 TypeScript** — 完整的类型定义，所有 Props / Events / Expose 均有类型约束

## 📦 安装

::: code-group

```bash [bun（推荐）]
# 安装公式求值引擎
bun add expr-eval
```

```bash [pnpm]
pnpm add expr-eval
```

```bash [yarn]
yarn add expr-eval
```

```bash [npm]
npm install expr-eval
```

:::

组件已全局注册，无需手动 import，直接在模板中使用 `<C_FormulaEditor />` 即可。

## 🎯 快速开始

### 基础用法

```vue {3-8,14-28}
<template>
  <C_FormulaEditor
    v-model="formula"
    :variables="variables"
    :sample-data="sampleData"
    @change="onChange"
    @validation-change="onValidation"
  />
</template>

<script setup lang="ts">
  const formula = ref('[销售额] / [目标额] * 100')

  const variables: FormulaVariable[] = [
    { name: '销售额', field: 'sales', type: 'number', group: '业绩数据' },
    { name: '目标额', field: 'target', type: 'number', group: '业绩数据' },
    { name: '成本', field: 'cost', type: 'number', group: '财务数据' },
  ]

  const sampleData = {
    sales: 150000,
    target: 100000,
    cost: 80000,
  }

  function onChange(value: string) {
    console.log('公式变更:', value)
  }

  function onValidation(result: FormulaValidation) {
    console.log('校验状态:', result.valid, result.message)
  }
</script>
```

::: details 📊 绩效核算场景 — 多档位三元表达式
```vue
<template>
  <div>
    <C_FormulaEditor
      v-model="formula"
      :variables="perfVariables"
      :sample-data="sampleRow"
      @validation-change="onValidation"
    />
    <NTag :type="isValid ? 'success' : 'error'" style="margin-top: 12px">
      {{ isValid ? '公式合法，可保存' : '公式有误，请检查' }}
    </NTag>
  </div>
</template>

<script setup lang="ts">
  const formula = ref(
    '[完成值] >= [卓越档目标值] ? ([完成值] - [卓越档目标值]) * [卓越系数] + 150000 : [完成值] >= [优秀档目标值] ? ([完成值] - [优秀档目标值]) * [优秀系数] + 87500 : [完成值] * [基础系数]'
  )

  const perfVariables: FormulaVariable[] = [
    { name: '完成值', field: 'actual', type: 'number', group: '业绩数据' },
    { name: '卓越档目标值', field: 'target_excellent', type: 'number', group: '目标值' },
    { name: '优秀档目标值', field: 'target_good', type: 'number', group: '目标值' },
    { name: '达标档目标值', field: 'target_standard', type: 'number', group: '目标值' },
    { name: '卓越系数', field: 'coeff_excellent', type: 'number', group: '系数' },
    { name: '优秀系数', field: 'coeff_good', type: 'number', group: '系数' },
    { name: '基础系数', field: 'coeff_base', type: 'number', group: '系数' },
  ]

  const sampleRow = {
    actual: 120000,
    target_excellent: 100000,
    target_good: 80000,
    target_standard: 60000,
    coeff_excellent: 1.5,
    coeff_good: 1.2,
    coeff_base: 0.8,
  }

  const isValid = ref(true)
  function onValidation(result: FormulaValidation) {
    isValid.value = result.valid
  }
</script>
```
:::

::: details 🎛️ 精简模式 — 仅公式输入框（无面板 / 无键盘）
```vue
<template>
  <!-- 适合弹窗、抽屉等空间受限的场景 -->
  <C_FormulaEditor
    v-model="formula"
    :variables="variables"
    :sample-data="sampleData"
    :show-variable-panel="false"
    :show-keyboard="false"
  />
</template>

<script setup lang="ts">
  const formula = ref('[价格] * [数量] * (1 - [折扣率])')

  const variables: FormulaVariable[] = [
    { name: '价格', field: 'price', type: 'number', group: '商品' },
    { name: '数量', field: 'qty', type: 'number', group: '商品' },
    { name: '折扣率', field: 'discount', type: 'number', group: '规则' },
  ]

  const sampleData = { price: 199, qty: 3, discount: 0.1 }
</script>
```
:::

::: details 🔧 编程式控制 — 通过 Expose API 操控编辑器
```vue
<template>
  <C_FormulaEditor
    ref="editorRef"
    v-model="formula"
    :variables="variables"
    :sample-data="sampleData"
  />

  <NSpace :size="8" style="margin-top: 12px">
    <NButton type="primary" size="small" @click="editorRef?.insertAtCursor('[销售额]')">
      插入「销售额」
    </NButton>
    <NButton size="small" @click="editorRef?.insertAtCursor(' / ')">插入 ÷</NButton>
    <NButton size="small" @click="editorRef?.insertAtCursor('[目标额]')">插入「目标额」</NButton>
    <NButton size="small" @click="editorRef?.insertAtCursor(' * 100')">插入 ×100</NButton>
    <NButton size="small" @click="handleGetValue">获取当前值</NButton>
    <NButton size="small" @click="handleValidate">手动校验</NButton>
    <NButton size="small" @click="editorRef?.reset()">重置</NButton>
  </NSpace>
</template>

<script setup lang="ts">
  const message = useMessage()
  const editorRef = ref<FormulaEditorExpose>()
  const formula = ref('')

  const variables: FormulaVariable[] = [
    { name: '销售额', field: 'sales', type: 'number', group: '业绩数据' },
    { name: '目标额', field: 'target', type: 'number', group: '业绩数据' },
  ]
  const sampleData = { sales: 150000, target: 100000 }

  function handleGetValue() {
    const value = editorRef.value?.getValue()
    message.success(`当前公式：${value || '(空)'}`)
  }

  function handleValidate() {
    const result = editorRef.value?.validate()
    if (result?.valid) {
      message.success('校验通过')
    } else {
      message.error(`校验失败：${result?.message}`)
    }
  }
</script>
```
:::

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **modelValue** | `string` | `''` | 公式字符串（双向绑定），变量用 `[变量名]` 包裹 |
| **variables** | `FormulaVariable[]` | `[]` | 可选变量列表，分组展示在左侧面板 |
| **functions** | `FormulaFunction[]` | 内置 12 个 | 可用函数列表，不传则使用内置函数 |
| **sampleData** | `Record<string, number\|string\|boolean>` | — | 样例数据（键为变量 `field`），用于计算预览 |
| **disabled** | `boolean` | `false` | 禁用所有交互 |
| **placeholder** | `string` | 默认提示文本 | 输入区占位提示 |
| **height** | `string \| number` | `'auto'` | 容器高度，数字单位为 px |
| **show-preview** | `boolean` | `true` | 是否显示底部计算预览面板 |
| **show-keyboard** | `boolean` | `true` | 是否显示虚拟键盘 |
| **show-variable-panel** | `boolean` | `true` | 是否显示左侧变量/函数面板 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **update:modelValue** | `(value: string)` | 公式变更时触发（v-model 内部事件） |
| **change** | `(value: string)` | 公式变更回调，与 update:modelValue 同步触发 |
| **validation-change** | `(result: FormulaValidation)` | 校验状态变更时触发 |

### 暴露方法

| 方法名 | 签名 | 说明 |
|--------|------|------|
| **getValue** | `() => string` | 获取当前公式字符串 |
| **setValue** | `(expr: string) => void` | 以编程方式设置公式 |
| **reset** | `() => void` | 重置为 modelValue 初始值 |
| **validate** | `() => FormulaValidation` | 手动触发公式校验并返回结果 |
| **insertAtCursor** | `(text: string) => void` | 在当前光标位置插入文本 |
| **focus** | `() => void` | 聚焦公式输入区 |

## 📐 类型定义

#### 变量数据类型

```typescript
type FormulaVariableType = 'number' | 'text' | 'boolean'
```

#### 变量定义接口

```typescript
interface FormulaVariable {
  name: string               // 显示名称（如 "完成值"）
  field: string              // 字段标识（用于存储和 sampleData 取值，如 "completion"）
  type: FormulaVariableType  // 数据类型
  group?: string             // 分组名称（面板中分组折叠展示）
  description?: string       // 变量说明
}
```

#### 函数定义接口

```typescript
interface FormulaFunction {
  name: string       // 函数名（如 "IF"）
  signature: string  // 函数签名（如 "IF(条件, 真值, 假值)"）
  description: string
  category?: string  // 函数分类
}
```

#### 校验结果接口

```typescript
interface FormulaValidation {
  valid: boolean      // 是否合法
  message: string     // 校验信息（合法时为 "合法" / 错误时为具体原因）
  position?: number   // 错误位置（字符索引）
}
```

#### 组件 Props 接口

```typescript
interface FormulaEditorProps {
  modelValue?: string
  variables?: FormulaVariable[]
  functions?: FormulaFunction[]
  sampleData?: Record<string, number | string | boolean>
  disabled?: boolean
  placeholder?: string
  height?: string | number
  showPreview?: boolean
  showKeyboard?: boolean
  showVariablePanel?: boolean
}
```

#### 组件 Expose 接口

```typescript
interface FormulaEditorExpose {
  getValue: () => string
  setValue: (expr: string) => void
  reset: () => void
  validate: () => FormulaValidation
  insertAtCursor: (text: string) => void
  focus: () => void
}
```

## 💡 公式语法说明

### 变量引用

用方括号包裹变量名：`[完成值]`、`[目标额]`、`[提成比例]`

### 运算符速查

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `+` `-` `*` `/` | 四则运算 | `[销售额] - [成本]` |
| `%` | 取模 | `[数量] % [箱规]` |
| `>` `<` `>=` `<=` | 比较 | `[完成值] >= [目标值]` |
| `==` `!=` | 相等 / 不等 | `[状态] == 1` |
| `? :` | 三元条件 | `[分数] >= 60 ? '及格' : '不及格'` |
| `AND` `OR` | 逻辑与 / 或 | `AND([a] > 0, [b] > 0)` |

### 内置函数速查

| 函数 | 说明 | 示例 |
|------|------|------|
| `IF` | 条件判断 | `IF([分数] >= 90, '优秀', '一般')` |
| `AND` / `OR` / `NOT` | 逻辑运算 | `AND([年龄] > 18, [认证] == 1)` |
| `SUM` / `AVG` / `MAX` / `MIN` | 聚合计算 | `AVG([语文], [数学], [英语])` |
| `ABS` | 绝对值 | `ABS([偏差值])` |
| `ROUND` | 四舍五入 | `ROUND([金额] / 3, 2)` |
| `CEIL` / `FLOOR` | 向上/向下取整 | `CEIL([数量] / [箱规])` |

## 🎨 使用示例

::: details 📋 表单集成 — 在业务表单中嵌入公式编辑器
```vue
<template>
  <n-form :model="ruleForm" :rules="formRules" ref="formRef" label-placement="left" label-width="100px">
    <n-form-item label="规则名称" path="name">
      <n-input v-model:value="ruleForm.name" placeholder="请输入规则名称" />
    </n-form-item>
    <n-form-item label="计算公式" path="formula">
      <C_FormulaEditor
        v-model="ruleForm.formula"
        :variables="variables"
        :sample-data="sampleData"
        @validation-change="onValidation"
      />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleSubmit" :disabled="!formulaValid">
        保存规则
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
  const message = useMessage()
  const formRef = ref()
  const formulaValid = ref(false)
  const ruleForm = ref({ name: '', formula: '' })
  const formRules = {
    name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    formula: [{ required: true, message: '请配置计算公式', trigger: 'change' }],
  }
  const variables: FormulaVariable[] = [
    { name: '销售额', field: 'sales', type: 'number', group: '业绩数据' },
    { name: '目标额', field: 'target', type: 'number', group: '业绩数据' },
    { name: '提成比例', field: 'commission_rate', type: 'number', group: '规则参数' },
    { name: '基础工资', field: 'base_salary', type: 'number', group: '规则参数' },
  ]
  const sampleData = { sales: 150000, target: 100000, commission_rate: 8, base_salary: 6000 }
  function onValidation(result: FormulaValidation) { formulaValid.value = result.valid }
  function handleSubmit() {
    formRef.value?.validate((errors: any) => {
      if (!errors && formulaValid.value) message.success('规则保存成功')
    })
  }
</script>
```
:::

::: details 🏆 成绩评级场景 — IF 函数多条件嵌套
```vue
<template>
  <C_FormulaEditor v-model="formula" :variables="gradeVariables" :sample-data="gradeSampleData" />
</template>

<script setup lang="ts">
  const formula = ref('IF([总分] >= 270, "优秀", IF([总分] >= 180, "良好", "待提升"))')
  const gradeVariables: FormulaVariable[] = [
    { name: '语文', field: 'chinese', type: 'number', group: '成绩' },
    { name: '数学', field: 'math', type: 'number', group: '成绩' },
    { name: '英语', field: 'english', type: 'number', group: '成绩' },
    { name: '总分', field: 'total', type: 'number', group: '汇总' },
    { name: '平均分', field: 'avg_score', type: 'number', group: '汇总' },
  ]
  const gradeSampleData = { chinese: 92, math: 88, english: 95, total: 275, avg_score: 91.67 }
</script>
```
:::

::: details 💰 销售提成场景 — 阶梯式提成规则
```vue
<template>
  <C_FormulaEditor v-model="formula" :variables="salesVariables" :sample-data="salesSampleData" />
</template>

<script setup lang="ts">
  const formula = ref(
    '[基础工资] + ([销售额] >= [目标额] ? ([销售额] - [目标额]) * 0.15 + [目标额] * 0.08 : [销售额] * 0.05)'
  )
  const salesVariables: FormulaVariable[] = [
    { name: '销售额', field: 'sales', type: 'number', group: '业绩数据' },
    { name: '目标额', field: 'target', type: 'number', group: '业绩数据' },
    { name: '退货额', field: 'returns', type: 'number', group: '业绩数据' },
    { name: '基础工资', field: 'base_salary', type: 'number', group: '规则参数' },
  ]
  const salesSampleData = { sales: 150000, target: 100000, returns: 5000, base_salary: 6000 }
</script>
```
:::

## 🛠️ 高级用法

::: details 🔌 自定义函数扩展 — 注册业务专属函数
```typescript
// composables/FormulaEditor/useFormulaEvaluator.ts
// 在 parser 实例上注册自定义函数实现
parser.functions['COMMISSION'] = (sales: number, rate: number) => {
  return Math.floor(sales * rate / 100 * 100) / 100
}
```

```typescript
// 同时在 functions prop 中声明，左侧面板「常用函数」Tab 可见
const customFunctions: FormulaFunction[] = [
  {
    name: 'COMMISSION',
    signature: 'COMMISSION(销售额, 提成比例)',
    description: '按比例计算提成（结果精度到分）',
    category: '业务函数',
  },
]
```

```vue
<C_FormulaEditor v-model="formula" :variables="variables" :functions="customFunctions" />
```
:::

::: details 📤 公式持久化 — 保存与加载
```typescript
async function saveFormula() {
  const formula = editorRef.value?.getValue()
  const validation = editorRef.value?.validate()
  if (!validation?.valid) {
    message.error(`公式不合法：${validation?.message}`)
    return
  }
  await api.saveRule({ formula, fieldList: vars.map(v => v.field) })
  message.success('规则保存成功')
}

async function loadFormula(ruleId: string) {
  const { formula } = await api.getRule(ruleId)
  currentFormula.value = formula  // 直接赋值，Chip 自动解析渲染
}
```
:::

::: details 🔍 从公式中提取变量列表
```typescript
function extractVariables(formula: string): string[] {
  const matches = formula.match(/\[([^\]]+)\]/g) ?? []
  return [...new Set(matches.map(m => m.slice(1, -1)))]
}

const vars = extractVariables('[销售额] / [目标额] * 100')
// => ['销售额', '目标额']

const usedFields = vars
  .map(name => variables.find(v => v.name === name)?.field)
  .filter(Boolean)
// => ['sales', 'target']
```
:::

## ⚠️ 注意事项

### 1. 变量 name 与 field 的区别

::: code-group

```typescript [✅ 正确]
const variables = [{ name: '销售额', field: 'sales', type: 'number' }]
const sampleData = { sales: 150000 }   // ✅ 用 field
const formula = '[销售额] * 0.08'      // ✅ 用 name（含方括号）
```

```typescript [❌ 错误]
const sampleData = { '销售额': 150000 }  // ❌ sampleData 不要用 name 作键
const formula = 'sales * 0.08'          // ❌ 公式变量不要漏掉方括号
```

:::

### 2. 精简模式使用建议

::: code-group

```vue [✅ 弹窗 / 抽屉推荐]
<n-alert type="info" :bordered="false" style="margin-bottom: 8px">
  变量请用方括号包裹，例如 <code>[销售额]</code>
</n-alert>
<C_FormulaEditor
  v-model="formula"
  :variables="variables"
  :show-variable-panel="false"
  :show-keyboard="false"
/>
```

```vue [✅ 完整模式（默认）]
<C_FormulaEditor v-model="formula" :variables="variables" :sample-data="sampleData" />
```

:::

### 3. 表单提交联动校验

::: code-group

```typescript [✅ 推荐]
const formulaValid = ref(false)
function onValidation(result: FormulaValidation) {
  formulaValid.value = result.valid && formula.value.trim().length > 0
}
function handleSubmit() {
  const result = editorRef.value?.validate()
  if (!result?.valid) { message.error('请先修正公式错误'); return }
  // 继续提交...
}
```

```typescript [❌ 不推荐]
function handleSubmit() {
  api.save({ formula: formula.value })  // ❌ 不做任何校验直接提交
}
```

:::

## 🐛 故障排除

::: details ❓ Q1: 计算预览显示"传入 sampleData 后可预览"？
**原因：** 没有传入 `sample-data` prop，或 sampleData 键用了变量 name 而非 field。

```typescript
const variables = [{ name: '销售额', field: 'sales', type: 'number' }]
const sampleData = { sales: 100000 }   // ✅ 用 field 'sales'
// const sampleData = { '销售额': 100000 } // ❌ 用 name 无法匹配
```
:::

::: details ❓ Q2: 点击变量面板，变量总是插在最前面而不是光标处？
组件已内置 `blur` 时保存 Range（`savedRange`），点击变量时会恢复到上次光标位置。请确认：使用前先点击一次输入区获焦，再点击变量面板。
:::

::: details ❓ Q3: 校验提示"未知函数 XXX"？
默认只内置 12 个函数。自定义函数需两步：① `functions` prop 中声明（面板可见）；② `useFormulaEvaluator.ts` 中注册实现（`parser.functions['XXX'] = fn`）。
:::

::: details ❓ Q4: 预览结果显示 "unexpected TEOF: EOF"？
公式不完整（末尾有悬空运算符或括号未闭合），根据「问题」区域的三态提示修正即可。
:::

::: details ❓ Q5: 暗色模式下颜色显示异常？
确保组件处于 `<n-config-provider :theme="darkTheme">` 的主题上下文中。
:::

## 🎯 最佳实践

### 1. 变量分组命名

```typescript
// ✅ 通过 group 分组，面板自动折叠展示，提升变量查找效率
const variables: FormulaVariable[] = [
  { name: '完成值', field: 'actual', type: 'number', group: '业绩数据' },
  { name: '卓越档目标值', field: 'target_excellent', type: 'number', group: '目标值' },
  { name: '卓越系数', field: 'coeff_excellent', type: 'number', group: '系数' },
]
```

### 2. 始终传入真实样例数据

```typescript
// ✅ 用真实业务数值，配置者能立即验证结果是否符合预期
const sampleData = { actual: 120000, target_excellent: 100000, coeff_excellent: 1.5 }
```

### 3. 校验状态联动提交按钮

```typescript
// ✅ 用校验状态控制保存按钮，从入口阻止不合法公式提交
const canSave = ref(false)
function onValidation(result: FormulaValidation) {
  canSave.value = result.valid && formula.value.trim().length > 0
}
```

### 4. 结合 description 提升变量可读性

```typescript
// ✅ 为关键变量添加 description，鼠标悬停可查看说明
const variables: FormulaVariable[] = [
  {
    name: '卓越系数', field: 'coeff_excellent', type: 'number', group: '系数',
    description: '卓越档目标达成时的绩效放大系数，通常为 1.2~2.0',
  },
]
```

### 5. 错误处理与回滚

```typescript
// ✅ 保存失败时恢复原公式，避免丢失已配置内容
const previousFormula = ref('')
async function handleSave() {
  previousFormula.value = formula.value
  try {
    await api.saveRule({ formula: formula.value })
    message.success('保存成功')
  } catch {
    formula.value = previousFormula.value
    message.error('保存失败，公式已恢复')
  }
}
```

## 📁 文件结构

```
C_FormulaEditor/
├── index.vue                    # 主组件（布局编排 + 状态管理）
├── constants.ts                 # 虚拟键盘布局、内置函数列表、运算符集合
├── components/
│   ├── FormulaInput.vue         # 公式输入区（contenteditable + Token 渲染 + 光标管理）
│   ├── VariablePanel.vue        # 变量/函数面板（分组折叠 + 搜索过滤）
│   ├── VirtualKeyboard.vue      # 虚拟键盘（运算符区 + 数字区 + 动作键）
│   └── FormulaPreview.vue       # 计算结果预览（变量取值 + 求值结果）
└── README.md

src/types/modules/formula-editor.d.ts    # 完整 TypeScript 类型导出
src/composables/FormulaEditor/
├── useFormulaParser.ts          # 分词引擎 + 语法校验（括号/变量/函数检查）
└── useFormulaEvaluator.ts       # 求值引擎（基于 expr-eval@2.0.2）
```

## 📝 更新日志

### v1.0.0 (2026-02-26)

- ✨ 变量点选插入（分组折叠 + 搜索过滤，点击后插入彩色 Chip）
- ✨ 虚拟键盘联动（运算符 / 数字 / 逻辑 / 比较 / 动作键，键帽 3D 立体效果）
- ✨ contenteditable 自由输入，`[变量名]` 自动渲染为 Chip
- ✨ blur 时保存光标 Range，点击面板后仍精确恢复插入位置
- ✨ 实时三态语法校验（空 / 合法 / 错误，括号匹配 / 变量检查 / 函数注册）
- ✨ 12 个内置函数（IF / AND / OR / NOT / SUM / AVG / MAX / MIN / ABS / ROUND / CEIL / FLOOR）
- ✨ 样例数据实时计算预览（展示变量取值与最终结果）
- ✨ 精简模式（可单独关闭面板 / 键盘 / 预览）
- ✨ 编程控制 API（insertAtCursor / getValue / setValue / reset / validate / focus）
- ✨ 亮色 / 暗色主题自动适配
- ✨ 响应式布局，768px 以下自动切换堆叠排列

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 公式编辑器专为需要业务人员自主配置计算规则的场景设计，支持从简单的四则运算到多档位三元嵌套公式。通过样例数据预览功能，配置者可以在保存前直接验证公式结果是否符合预期，大幅降低规则配置的出错率。如遇问题请先查阅本文档，或在团队群里讨论。🧮
