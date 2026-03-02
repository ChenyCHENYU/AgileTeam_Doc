---
outline: 'deep'
---

# C_FormSearch 智能搜索组件

> 🔍 基于 Naive UI 的高效搜索表单组件，让数据检索变得简单而优雅

## 🚀 在线演示

<DemoIframe src="/preview/form-search" title="搜索表单" height="700" />


## ✨ 特性

- **🔍 多种搜索控件**: 支持输入框、选择器、日期范围等多种搜索方式
- **💾 智能历史记录**: 自动缓存搜索历史，支持快速选择和管理
- **📱 响应式展开**: 超过阈值的字段自动支持展开收起（默认 7 个）
- **⚡ 实时交互**: 输入框聚焦显示历史记录，`@mousedown.prevent` 防止面板误关闭
- **🎯 事件驱动**: 完整的搜索、重置、参数变更事件系统
- **🧹 智能验证**: 搜索前自动检测是否有有效条件（可关闭）
- **🏗️ 薄 UI 壳架构**: 逻辑由 `useSearchState` + `useSearchHistory` composable 驱动
- **💪 TypeScript**: 完整的类型定义，统一从 `types/modules/search.d.ts` 导入
- **⚙️ 统一配置**: 通过 `config` 对象灵活控制折叠阈值、历史条数、验证行为

## 🏗️ 架构

```
C_FormSearch/
├── index.vue          ← 薄 UI 壳 (~246 行，纯模板 + 胶水层)
├── index.scss         ← 样式（响应式布局 + 历史面板）
composables/FormSearch/
├── index.ts           ← barrel export
├── useSearchHistory.ts ← 历史记录 CRUD / localStorage / 焦点面板
├── useSearchState.ts  ← 字段初始化 / 折叠展开 / 搜索重置 / 内部组合 history
types/modules/
├── search.d.ts        ← SearchFieldType / SearchFormItem / SearchFormParams / SearchConfig
```

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 基于 Naive UI，确保已安装依赖
bun install naive-ui
```

```bash [pnpm]
pnpm install naive-ui
```

```bash [yarn]
yarn add naive-ui
```

```bash [npm]
npm install naive-ui
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-8}
<template>
  <!-- 最简单的搜索表单 -->
  <C_FormSearch
    :form-item-list="searchFields"
    :form-params="searchParams"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup lang="ts">
  import type { SearchFormItem, SearchFormParams } from '@/types/modules/search'

  const searchParams = reactive<SearchFormParams>({
    username: '',
    status: null,
    createTime: null,
  })

  const searchFields: SearchFormItem[] = [
    {
      type: 'input',
      prop: 'username',
      placeholder: '请输入用户名',
    },
    {
      type: 'select',
      prop: 'status',
      placeholder: '请选择状态',
      list: [
        { labelDefault: '启用', value: 1 },
        { labelDefault: '禁用', value: 0 },
      ],
    },
    {
      type: 'date-range',
      prop: 'createTime',
    },
  ]

  const handleSearch = (params: SearchFormParams) => {
    console.log('搜索参数:', params)
  }

  const handleReset = () => {
    console.log('重置表单')
  }
</script>
```

### 带历史记录 + 展开收起

```vue {5-6}
<template>
  <C_FormSearch
    :form-item-list="searchFields"
    :form-params="searchParams"
    form-search-input-history-string="user-search-history"
    :config="{ foldThreshold: 5 }"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup lang="ts">
  import type { SearchFormItem, SearchFormParams } from '@/types/modules/search'

  const searchParams = reactive<SearchFormParams>({
    keyword: '',
    username: '',
    email: '',
    department: null,
    status: null,
    priority: null,
    createTime: null,
    updateTime: null,
  })

  const searchFields: SearchFormItem[] = [
    {
      type: 'input',
      prop: 'keyword',
      placeholder: '请输入搜索关键词',
      hisList: [], // 声明 hisList 即开启该字段的历史记录
    },
    {
      type: 'input',
      prop: 'username',
      placeholder: '请输入用户名',
      hisList: [],
    },
    {
      type: 'input',
      prop: 'email',
      placeholder: '请输入邮箱地址',
    },
    {
      type: 'select',
      prop: 'department',
      placeholder: '请选择部门',
      list: [
        { labelDefault: '技术部', value: 'tech' },
        { labelDefault: '产品部', value: 'product' },
        { labelDefault: '运营部', value: 'operation' },
        { labelDefault: '设计部', value: 'design' },
      ],
    },
    {
      type: 'select',
      prop: 'status',
      placeholder: '请选择状态',
      list: [
        { labelDefault: '正常', value: 1 },
        { labelDefault: '禁用', value: 0 },
        { labelDefault: '待审核', value: 2 },
      ],
    },
    {
      type: 'select',
      prop: 'priority',
      placeholder: '请选择优先级',
      list: [
        { labelDefault: '高优先级', value: 'high' },
        { labelDefault: '中优先级', value: 'medium' },
        { labelDefault: '低优先级', value: 'low' },
      ],
    },
    {
      type: 'date-range',
      prop: 'createTime',
    },
    {
      type: 'date-range',
      prop: 'updateTime',
    },
  ]

  const handleSearch = (params: SearchFormParams) => {
    console.log('搜索参数:', params)
  }

  const handleReset = () => {
    console.log('重置表单')
  }
</script>
```

## 📖 API 文档

### Props

| 参数                             | 类型                             | 默认值     | 说明                                               |
| -------------------------------- | -------------------------------- | ---------- | -------------------------------------------------- |
| **formItemList**                 | `SearchFormItem[]`               | `[]`       | 搜索字段配置数组                                   |
| **formParams**                   | `SearchFormParams`               | —          | 搜索参数对象（响应式）                             |
| **formSearchInputHistoryString** | `string`                         | —          | 历史记录 localStorage 存储键名，不传则禁用历史功能 |
| **bordered**                     | `boolean`                        | `true`     | 是否显示卡片边框                                   |
| **size**                         | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸                                           |
| **config**                       | `SearchConfig`                   | —          | 统一配置对象（见下表）                             |

#### SearchConfig

| 属性                | 类型      | 默认值 | 说明                         |
| ------------------- | --------- | ------ | ---------------------------- |
| **foldThreshold**   | `number`  | `7`    | 超过此数量的字段默认折叠     |
| **historyMaxItems** | `number`  | `5`    | 每个字段最多保留的历史条数   |
| **requireValue**    | `boolean` | `true` | 搜索前是否要求至少一个有效值 |

### Events

| 事件名            | 参数                         | 说明                     |
| ----------------- | ---------------------------- | ------------------------ |
| **search**        | `(params: SearchFormParams)` | 通过验证后触发搜索       |
| **reset**         | —                            | 重置表单后触发           |
| **change-params** | `(params: SearchFormParams)` | 重置时表单参数变更时触发 |

### Expose（暴露方法）

| 名称                | 类型                    | 说明              |
| ------------------- | ----------------------- | ----------------- |
| **formRef**         | `Ref<FormInst \| null>` | NForm 实例引用    |
| **formParams**      | `Ref<SearchFormParams>` | 当前表单参数      |
| **searchFn**        | `() => void`            | 手动触发搜索      |
| **cleanFn**         | `() => void`            | 手动触发重置      |
| **changeFoldState** | `() => void`            | 切换展开/收起状态 |

## 类型定义

### SearchFieldType

```typescript
/** 搜索字段支持的控件类型 */
type SearchFieldType = 'input' | 'select' | 'date-range' | 'spacer'
```

### SearchFormItem

```typescript
/** 搜索表单字段配置 */
interface SearchFormItem {
  type: SearchFieldType // 控件类型，'spacer' 为占位符
  prop: string // 字段名（绑定到 formParams 的 key）
  placeholder?: string // 占位提示文本
  list?: SearchOptionItem[] // select 的选项列表
  hisList?: string[] // 声明即开启历史记录（input 专用）
  isFocus?: boolean // 内部运行时状态，无需手动设置
  show?: boolean // 字段是否显示（折叠时自动管理）
}
```

### SearchOptionItem

```typescript
/** select 选项类型（兼容 labelDefault） */
interface SearchOptionItem {
  labelDefault?: string // 向后兼容的标签字段
  label?: string // 标准标签字段
  value?: string | number | boolean // 选项值
  disabled?: boolean // 是否禁用
  [key: string]: any // 扩展字段
}
```

### SearchFormParams

```typescript
/** 搜索表单参数 */
interface SearchFormParams {
  pageNum?: number
  pageSize?: number
  [key: string]: any
}
```

### SearchConfig

```typescript
/** C_FormSearch 统一配置对象 */
interface SearchConfig {
  foldThreshold?: number // 折叠阈值，默认 7
  historyMaxItems?: number // 历史记录最大条数，默认 5
  requireValue?: boolean // 搜索前要求至少一个有效值，默认 true
}
```

## 🎨 使用示例

::: details 📝 完整演示页面 — 基础 / 高级 / 超多字段三种场景

```vue
<template>
  <div class="search-demo">
    <NH1 class="main-title">表单搜索组件场景示例</NH1>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h3>基础用法（3个字段）</h3>
      <C_FormSearch
        :form-item-list="basicFormConfig.items"
        :form-params="basicFormParams"
        :form-search-input-history-string="basicFormConfig.historyKey"
        @search="handleBasicSearch"
        @reset="handleBasicReset"
        @change-params="handleParamsChange"
      />
    </div>

    <!-- 高级用法 -->
    <div class="demo-section">
      <h3>高级用法（12个字段 - 默认显示7个，展开显示全部）</h3>
      <C_FormSearch
        :form-item-list="advancedFormConfig.items"
        :form-params="advancedFormParams"
        :form-search-input-history-string="advancedFormConfig.historyKey"
        @search="handleAdvancedSearch"
        @reset="handleAdvancedReset"
      />
    </div>

    <!-- 超多字段测试 -->
    <div class="demo-section">
      <h3>超多字段测试（16个字段）</h3>
      <C_FormSearch
        :form-item-list="megaFormConfig.items"
        :form-params="megaFormParams"
        :form-search-input-history-string="megaFormConfig.historyKey"
        @search="handleMegaSearch"
        @reset="handleMegaReset"
      />
    </div>

    <!-- 搜索结果展示 -->
    <div
      class="demo-section"
      v-if="searchResults.length > 0"
    >
      <h3>搜索结果</h3>
      <NCard>
        <pre>{{ JSON.stringify(searchResults, null, 2) }}</pre>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    basicFormConfig,
    advancedFormConfig,
    megaFormConfig,
    generateMockResults,
    type BasicFormParams,
    type AdvancedFormParams,
    type MegaFormParams,
    type SearchResult,
  } from './data'
  import type { SearchFormParams } from '@/types/modules/search'

  const message = useMessage()
  const searchResults = ref<SearchResult[]>([])

  const basicFormParams = reactive<BasicFormParams>({
    ...basicFormConfig.params,
  })
  const advancedFormParams = reactive<AdvancedFormParams>({
    ...advancedFormConfig.params,
  })
  const megaFormParams = reactive<MegaFormParams>({ ...megaFormConfig.params })

  // 注意：handler 参数类型必须使用 SearchFormParams（组件 emit 的类型）
  // 需要具体类型时在内部做 as 断言

  function handleBasicSearch(params: SearchFormParams) {
    message.success('搜索成功！')
    searchResults.value = generateMockResults(
      'basic',
      params as BasicFormParams
    )
  }

  function handleBasicReset() {
    Object.assign(basicFormParams, basicFormConfig.params)
    searchResults.value = []
  }

  function handleAdvancedSearch(params: SearchFormParams) {
    message.success('高级搜索成功！')
    searchResults.value = generateMockResults(
      'advanced',
      params as AdvancedFormParams
    )
  }

  function handleAdvancedReset() {
    Object.assign(advancedFormParams, advancedFormConfig.params)
    searchResults.value = []
  }

  function handleMegaSearch(params: SearchFormParams) {
    message.success('超多字段搜索成功！')
    searchResults.value = generateMockResults('mega', params as MegaFormParams)
  }

  function handleMegaReset() {
    Object.assign(megaFormParams, megaFormConfig.params)
    searchResults.value = []
  }

  function handleParamsChange(params: SearchFormParams) {
    console.log('参数变化:', params)
  }
</script>
```

:::

::: details 🗂️ 数据配置文件 — 类型定义 + 字段配置 + mock 数据

```typescript
import type { SearchFormItem, SearchOptionItem } from '@/types/modules/search'

// ============ 扩展类型（页面级） ============

export interface BaseFormParams {
  pageNum: number
  pageSize: number
  [key: string]: any
}

export interface BasicFormParams extends BaseFormParams {
  name: string
  status: number | null
  dateRange: string | null
}

export interface AdvancedFormParams extends BaseFormParams {
  keyword: string
  category: string | null
  level: string | null
  region: string
  timeRange: string | null
  price: string
  tags: string
  department: string | null
  priority: string | null
  assignee: string
  project: string
  version: string
}

export interface FormConfig<T extends BaseFormParams> {
  params: T
  items: SearchFormItem[]
  historyKey: string
}

// ============ 基础示例配置 ============

export const basicFormConfig: FormConfig<BasicFormParams> = {
  params: {
    name: '',
    status: null,
    dateRange: null,
    pageNum: 1,
    pageSize: 10,
  },
  items: [
    {
      type: 'input',
      prop: 'name',
      placeholder: '请输入用户名称',
      hisList: [], // 声明 hisList 即开启历史记录
    },
    {
      type: 'select',
      prop: 'status',
      placeholder: '请选择状态',
      list: [
        { labelDefault: '启用', value: 1 },
        { labelDefault: '禁用', value: 0 },
        { labelDefault: '待审核', value: 2 },
      ],
    },
    {
      type: 'date-range',
      prop: 'dateRange',
      placeholder: '请选择时间范围',
    },
  ],
  historyKey: 'basic_search_history',
}

// ============ 高级示例配置（12 个字段，超过 7 个自动折叠） ============

export const advancedFormConfig: FormConfig<AdvancedFormParams> = {
  params: {
    keyword: '',
    category: null,
    level: null,
    region: '',
    timeRange: null,
    price: '',
    tags: '',
    department: null,
    priority: null,
    assignee: '',
    project: '',
    version: '',
    pageNum: 1,
    pageSize: 20,
  },
  items: [
    {
      type: 'input',
      prop: 'keyword',
      placeholder: '请输入关键词搜索',
      hisList: [],
    },
    {
      type: 'select',
      prop: 'category',
      placeholder: '请选择分类',
      list: [
        { labelDefault: '科技' },
        { labelDefault: '教育' },
        { labelDefault: '娱乐' },
      ],
    },
    {
      type: 'select',
      prop: 'level',
      placeholder: '请选择级别',
      list: [
        { labelDefault: '初级' },
        { labelDefault: '中级' },
        { labelDefault: '高级' },
      ],
    },
    { type: 'input', prop: 'region', placeholder: '请输入地区', hisList: [] },
    { type: 'date-range', prop: 'timeRange', placeholder: '请选择时间范围' },
    { type: 'input', prop: 'price', placeholder: '请输入价格', hisList: [] },
    { type: 'input', prop: 'tags', placeholder: '请输入标签', hisList: [] },
    {
      type: 'select',
      prop: 'department',
      placeholder: '请选择部门',
      list: [
        { labelDefault: '技术部' },
        { labelDefault: '产品部' },
        { labelDefault: '运营部' },
      ],
    },
    {
      type: 'select',
      prop: 'priority',
      placeholder: '请选择优先级',
      list: [
        { labelDefault: '高' },
        { labelDefault: '中' },
        { labelDefault: '低' },
      ],
    },
    {
      type: 'input',
      prop: 'assignee',
      placeholder: '请输入负责人',
      hisList: [],
    },
    {
      type: 'input',
      prop: 'project',
      placeholder: '请输入项目名称',
      hisList: [],
    },
    {
      type: 'input',
      prop: 'version',
      placeholder: '请输入版本号',
      hisList: [],
    },
  ],
  historyKey: 'advanced_search_history',
}

// ============ 搜索结果类型 ============

export interface SearchResult {
  id: number
  [key: string]: unknown
}

export function generateMockResults(
  type: string,
  params: Record<string, any>
): SearchResult[] {
  return [{ id: Date.now(), type, ...params }]
}
```

:::

::: details 🔗 搜索条件联动 — 动态字段列表

```vue
<template>
  <C_FormSearch
    :form-item-list="linkedFields"
    :form-params="searchParams"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
  import type { SearchFormItem, SearchFormParams } from '@/types/modules/search'

  const searchParams = reactive<SearchFormParams>({
    category: null,
    subCategory: null,
  })

  const subCategoryMap: Record<
    string,
    { labelDefault: string; value: string }[]
  > = {
    electronics: [
      { labelDefault: '手机', value: 'phone' },
      { labelDefault: '电脑', value: 'computer' },
    ],
    clothing: [
      { labelDefault: '男装', value: 'men' },
      { labelDefault: '女装', value: 'women' },
    ],
  }

  // formItemList 是 computed → 当 searchParams 变化时自动更新
  // 组件内部 watch(props.formItemList) 会自动同步
  const linkedFields = computed<SearchFormItem[]>(() => [
    {
      type: 'select',
      prop: 'category',
      placeholder: '请选择分类',
      list: [
        { labelDefault: '电子产品', value: 'electronics' },
        { labelDefault: '服装', value: 'clothing' },
      ],
    },
    {
      type: 'select',
      prop: 'subCategory',
      placeholder: searchParams.category ? '请选择子分类' : '请先选择分类',
      list: searchParams.category
        ? (subCategoryMap[searchParams.category] ?? [])
        : [],
    },
  ])

  // 分类变化时清空子分类
  watch(
    () => searchParams.category,
    () => {
      searchParams.subCategory = null
    }
  )

  const handleSearch = (params: SearchFormParams) => {
    console.log('联动搜索:', params)
  }
</script>
```

:::

::: details 💾 与 C_Table 配合使用 — 典型的搜索+表格页面

```vue
<template>
  <div class="user-management">
    <C_FormSearch
      ref="searchRef"
      :form-item-list="searchFields"
      :form-params="searchParams"
      form-search-input-history-string="user-mgmt-search"
      @search="handleSearch"
      @reset="handleReset"
    />

    <C_Table
      ref="tableRef"
      :columns="columns"
      :data="tableData"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
  import type { SearchFormItem, SearchFormParams } from '@/types/modules/search'

  const searchRef = ref()
  const tableRef = ref()
  const loading = ref(false)
  const tableData = ref([])

  const searchParams = reactive<SearchFormParams>({
    keyword: '',
    status: null,
    createTime: null,
    pageNum: 1,
    pageSize: 20,
  })

  const searchFields: SearchFormItem[] = [
    {
      type: 'input',
      prop: 'keyword',
      placeholder: '搜索用户名、邮箱',
      hisList: [],
    },
    {
      type: 'select',
      prop: 'status',
      placeholder: '用户状态',
      list: [
        { labelDefault: '正常', value: 1 },
        { labelDefault: '禁用', value: 0 },
      ],
    },
    { type: 'date-range', prop: 'createTime' },
  ]

  const handleSearch = async (params: SearchFormParams) => {
    loading.value = true
    try {
      const res = await fetchUsers(params)
      tableData.value = res.list
    } finally {
      loading.value = false
    }
  }

  const handleReset = () => {
    Object.assign(searchParams, { keyword: '', status: null, createTime: null })
    handleSearch(searchParams)
  }

  // 通过 expose 的 searchFn 手动触发搜索（如翻页后刷新）
  const refreshTable = () => searchRef.value?.searchFn()
</script>
```

:::

## 🛠️ 高级用法

### `config` 配置示例

```vue
<C_FormSearch
  :form-item-list="fields"
  :form-params="params"
  form-search-input-history-string="my-search"
  :config="{
    foldThreshold: 5, // 5 个字段后开始折叠
    historyMaxItems: 10, // 每个字段保留 10 条历史
    requireValue: false, // 允许空搜索
  }"
  @search="handleSearch"
/>
```

### 通过 expose 编程式调用

```typescript
const searchRef = ref()

// 手动触发搜索
searchRef.value?.searchFn()

// 手动触发重置
searchRef.value?.cleanFn()

// 手动切换展开/收起
searchRef.value?.changeFoldState()

// 读取当前表单参数
console.log(searchRef.value?.formParams)
```

### `spacer` 占位符

```typescript
// 使用 'spacer' 类型在搜索栏中插入空位，调整布局对齐
const fields: SearchFormItem[] = [
  { type: 'input', prop: 'name', placeholder: '姓名' },
  { type: 'select', prop: 'status', placeholder: '状态', list: [...] },
  { type: 'spacer', prop: '_spacer1' },  // 占位，不渲染控件
  { type: 'date-range', prop: 'dateRange' },
]
```

## ⚠️ 注意事项

### 1. handler 参数类型

组件 `@search` emit 的参数类型是通用的 `SearchFormParams`。如果需要具体类型，在 handler 内部做断言：

::: code-group

```typescript [✅ 推荐]
import type { SearchFormParams } from '@/types/modules/search'

function handleSearch(params: SearchFormParams) {
  // 内部按需断言
  const typed = params as MySearchParams
  console.log(typed.username)
}
```

```typescript [❌ 编译错误]
// handler 参数不能比 emit 类型更窄
function handleSearch(params: MySearchParams) {
  // TS Error: 不能将 SearchFormParams 分配给 MySearchParams
}
```

:::

### 2. 搜索参数必须是响应式的

::: code-group

```typescript [✅ 推荐]
const searchParams = reactive({ username: '', status: null })
// 或
const searchParams = ref({ username: '', status: null })
```

```typescript [❌ 不推荐]
// 普通对象不会触发视图更新
const searchParams = { username: '', status: null }
```

:::

### 3. 历史记录配置

::: code-group

```vue [✅ 推荐]
<!-- 每个页面使用唯一的 key -->
<C_FormSearch form-search-input-history-string="user-management-search" />
```

```vue [❌ 不推荐]
<!-- 通用 key 会导致不同页面历史记录冲突 -->
<C_FormSearch form-search-input-history-string="search" />
```

:::

### 4. 启用历史记录的条件

- 必须传入 `form-search-input-history-string` prop
- 字段的 `hisList` 必须声明为 `[]`（仅 `input` 类型有效）

```typescript
// ✅ 开启历史记录
{ type: 'input', prop: 'keyword', placeholder: '关键词', hisList: [] }

// ❌ 不会有历史记录（没有 hisList）
{ type: 'input', prop: 'keyword', placeholder: '关键词' }
```

## 🐛 故障排除

::: details ❓ Q1: 搜索表单渲染报错 `Cannot read properties of undefined (reading 'type')`？
**A1:** 如果你在自定义 composable 中包装了 `useSearchState` 的返回值到一个普通对象里（如 `const state = useSearchState(...)`），在模板中用 `state.formParams` 等方式访问，Vue 不会自动解包嵌套的 Ref，导致 NForm 收到 Ref 对象而非普通对象。

**解决方案**：始终解构 composable 返回值为顶层变量：

```typescript
// ✅ 正确 — 解构为顶层变量，模板自动解包
const { formRef, formParams, visibleFields, searchFn, resetFn } = useSearchState(...)

// ❌ 错误 — 嵌套在普通对象中，模板不会自动解包
const state = useSearchState(...)  // state.formParams 在模板中是 Ref 对象
```

:::

::: details ❓ Q2: 历史记录不显示？
**A2:** 检查两个条件：

1. 是否传入了 `form-search-input-history-string` prop
2. 字段配置中是否声明了 `hisList: []`

```vue
<C_FormSearch
  form-search-input-history-string="my-page-search"  <!-- ① 必须传入 -->
  :form-item-list="[
    { type: 'input', prop: 'name', hisList: [] }     // ② 必须声明 hisList
  ]"
  :form-params="params"
/>
```

:::

::: details ❓ Q3: 展开收起按钮不出现？
**A3:** 字段数量必须超过折叠阈值（默认 7）。可通过 `config.foldThreshold` 调整：

```vue
<C_FormSearch
  :config="{ foldThreshold: 3 }"
  :form-item-list="fields"  <!-- 需要 > 3 个字段 -->
  :form-params="params"
/>
```

:::

::: details ❓ Q4: 选择器选项不显示？
**A4:** 确保选项至少有 `labelDefault` 或 `label` 字段：

```typescript
// ✅ 正确
list: [
  { labelDefault: '显示文本', value: 1 }, // 使用 labelDefault
  { label: '显示文本', value: 2 }, // 或使用 label
]

// ❌ 错误 — 缺少显示文本
list: [{ value: 1 }]
```

:::

::: details ❓ Q5: 空搜索时总是提示"请输入搜索内容"？
**A5:** 默认开启了 `requireValue` 验证。如果允许空搜索，关闭即可：

```vue
<C_FormSearch :config="{ requireValue: false }" ... />
```

:::

## 📝 更新日志

### v2.0.0 (2026-02-16)

- ♻️ **薄 UI 壳重构**：index.vue 从 428 行精简到 ~246 行
- 🏗️ **Composable 提取**：逻辑拆分为 `useSearchHistory` + `useSearchState`
- 🆕 **新增 config prop**：统一配置 `foldThreshold` / `historyMaxItems` / `requireValue`
- 🆕 **新增 `SearchFieldType`**：正式化 `'spacer'` 类型（替代旧 `'%'`）
- 🆕 **新增 `SearchConfig` 接口**：类型安全的配置对象
- 🐛 **修复 Ref 未解包**：composable 返回值改为顶层解构，避免模板渲染崩溃
- 🐛 **修复 blur 竞态**：`setTimeout(200ms)` → `@mousedown.prevent` 防止历史面板误关闭
- 🐛 **修复 Props 不响应**：新增 `watch(props.formItemList)` 自动同步外部变化
- 🗑️ **消除类型重复**：组件内移除内联类型定义，统一从 `types/modules/search.d.ts` 导入
- 📝 handler 参数类型统一为 `SearchFormParams`，消费端按需 `as` 断言

### v1.0.0 (2025-07-17)

- ✨ 支持多种搜索控件类型（输入框、选择器、日期范围）
- ✨ 智能历史记录功能
- ✨ 响应式展开收起功能
- ✨ 完整的事件系统
- ✨ 基于 Naive UI 的统一视觉风格
