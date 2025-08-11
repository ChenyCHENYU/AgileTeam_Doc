---
outline: 'deep'
---

# C_FormSearch 智能搜索组件

> 🔍 基于 Naive UI 的高效搜索表单组件，让数据检索变得简单而优雅

## ✨ 特性

- **🔍 多种搜索控件**: 支持输入框、选择器、日期范围等多种搜索方式
- **💾 智能历史记录**: 自动缓存搜索历史，支持快速选择和管理
- **📱 响应式展开**: 超过7个字段自动支持展开收起功能
- **⚡ 实时交互**: 输入框聚焦显示历史记录，提升用户体验
- **🎯 事件驱动**: 完整的搜索、重置、参数变更事件系统
- **🧹 智能验证**: 自动检测搜索条件，避免无效搜索
- **🎨 统一风格**: 基于 Naive UI 的一致视觉体验
- **💪 TypeScript**: 完整的类型定义和类型安全
- **⚡ 高性能**: 优化的渲染机制，大量字段依然流畅

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

### 基础用法

```vue {4,5,6,7}
<template>
  <!-- 最简单的搜索表单 -->
  <C_FormSearch
    :form-item-list="searchFields"
    :form-params="searchParams"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
  const searchParams = ref({
    username: '',
    status: null,
    createTime: null,
  })

  const searchFields = [
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

  const handleSearch = (params) => {
    console.log('搜索参数:', params)
  }

  const handleReset = () => {
    console.log('重置表单')
  }
</script>
```

### 多种搜索控件

```vue {6,7,8,9,10}
<template>
  <C_FormSearch
    :form-item-list="richSearchFields"
    :form-params="searchParams"
    form-search-input-history-string="user-search-history"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
  const searchParams = ref({
    keyword: '',
    username: '',
    email: '',
    department: null,
    status: null,
    priority: null,
    createTime: null,
    updateTime: null,
  })

  const richSearchFields = [
    {
      type: 'input',
      prop: 'keyword',
      placeholder: '请输入搜索关键词',
    },
    {
      type: 'input', 
      prop: 'username',
      placeholder: '请输入用户名',
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
        { labelDefault: '设计部', value: 'design' }
      ]
    },
    {
      type: 'select',
      prop: 'status',
      placeholder: '请选择状态',
      list: [
        { labelDefault: '正常', value: 1 },
        { labelDefault: '禁用', value: 0 },
        { labelDefault: '待审核', value: 2 }
      ]
    },
    {
      type: 'select',
      prop: 'priority',
      placeholder: '请选择优先级',
      list: [
        { labelDefault: '高优先级', value: 'high' },
        { labelDefault: '中优先级', value: 'medium' },
        { labelDefault: '低优先级', value: 'low' }
      ]
    },
    {
      type: 'date-range',
      prop: 'createTime',
    },
    {
      type: 'date-range',
      prop: 'updateTime',
    }
  ]

  const handleSearch = (params) => {
    console.log('搜索参数:', params)
  }

  const handleReset = () => {
    console.log('重置表单')
  }
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **formItemList** | `SearchFormItem[]` | `[]` | 搜索字段配置数组 |
| **formParams** | `SearchFormParams` | `{}` | 搜索参数对象（双向绑定） |
| **formSearchInputHistoryString** | `string` | `-` | 历史记录存储键名 |
| **bordered** | `boolean` | `true` | 是否显示卡片边框 |
| **size** | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **search** | `(params: SearchFormParams)` | 执行搜索时触发 |
| **reset** | `-` | 重置表单时触发 |
| **change-params** | `(params: SearchFormParams)` | 表单参数变更时触发 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| **searchFn** | `-` | `void` | 手动触发搜索 |
| **cleanFn** | `-` | `void` | 手动触发重置 |
| **changeFoldState** | `-` | `void` | 切换展开收起状态 |

::: details 🔧 类型定义 - 完整的 TypeScript 接口定义

#### 搜索表单项接口

```typescript
interface SearchFormItem {
  type: 'input' | 'select' | 'date-range' | '%'
  prop: string
  placeholder?: string
  list?: OptionItem[]
  hisList?: string[]
  isFocus?: boolean
  show?: boolean
}
```

#### 选项项接口

```typescript
interface OptionItem {
  labelDefault?: string
  label?: string
  value: any
}
```

#### 搜索参数接口

```typescript
interface SearchFormParams {
  [key: string]: any
}
```

#### 表单配置接口

```typescript
export interface FormConfig<T extends BaseFormParams> {
  params: T
  items: SearchFormItem[]
  historyKey: string
}
```

#### 基础表单参数

```typescript
export interface BaseFormParams {
  pageNum: number
  pageSize: number
}
```
:::

## 🎨 使用示例

::: details 📝 用户管理搜索 - 完整的管理系统搜索示例
```vue {6,7,8,9,10,11,12}
<template>
  <div class="user-management">
    <n-card title="用户管理" style="margin-bottom: 16px;">
      <C_FormSearch
        ref="userSearchRef"
        :form-item-list="userSearchFields"
        :form-params="userSearchParams"
        form-search-input-history-string="user-management-search"
        @search="handleUserSearch"
        @reset="handleUserReset"
        @change-params="handleParamsChange"
      />
    </n-card>

    <!-- 用户列表 -->
    <n-card title="用户列表">
      <n-data-table
        :columns="userColumns"
        :data="userList"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>
  </div>
</template>

<script setup>
  const userSearchRef = ref()
  const loading = ref(false)
  const userList = ref([])
  
  const userSearchParams = ref({
    username: '',
    realName: '',
    email: '',
    phone: '',
    department: null,
    status: null,
    role: null,
    createTime: null,
    lastLoginTime: null,
  })

  const userSearchFields = [
    {
      type: 'input',
      prop: 'username',
      placeholder: '请输入用户名',
    },
    {
      type: 'input',
      prop: 'realName',
      placeholder: '请输入真实姓名',
    },
    {
      type: 'input',
      prop: 'email',
      placeholder: '请输入邮箱地址',
    },
    {
      type: 'input',
      prop: 'phone',
      placeholder: '请输入手机号',
    },
    {
      type: 'select',
      prop: 'department',
      placeholder: '请选择部门',
      list: [
        { labelDefault: '技术部', value: 'tech' },
        { labelDefault: '产品部', value: 'product' },
        { labelDefault: '运营部', value: 'operation' },
        { labelDefault: '人事部', value: 'hr' },
        { labelDefault: '财务部', value: 'finance' }
      ]
    },
    {
      type: 'select',
      prop: 'status',
      placeholder: '请选择状态',
      list: [
        { labelDefault: '正常', value: 1 },
        { labelDefault: '禁用', value: 0 },
        { labelDefault: '待激活', value: 2 }
      ]
    },
    {
      type: 'select',
      prop: 'role',
      placeholder: '请选择角色',
      list: [
        { labelDefault: '管理员', value: 'admin' },
        { labelDefault: '普通用户', value: 'user' },
        { labelDefault: '访客', value: 'guest' }
      ]
    },
    {
      type: 'date-range',
      prop: 'createTime',
    },
    {
      type: 'date-range',
      prop: 'lastLoginTime',
    }
  ]

  const userColumns = [
    { title: '用户名', key: 'username' },
    { title: '真实姓名', key: 'realName' },
    { title: '邮箱', key: 'email' },
    { title: '部门', key: 'department' },
    { title: '状态', key: 'status' },
    { title: '创建时间', key: 'createTime' },
    { 
      title: '操作',
      key: 'actions',
      render: (row) => [
        h(NButton, { size: 'small' }, '编辑'),
        h(NButton, { size: 'small', type: 'error' }, '删除')
      ]
    }
  ]

  const pagination = reactive({
    page: 1,
    pageSize: 20,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50, 100]
  })

  const handleUserSearch = async (params) => {
    console.log('用户搜索参数:', params)
    loading.value = true
    
    try {
      // 处理日期范围参数
      const searchData = { ...params }
      if (searchData.createTime && Array.isArray(searchData.createTime)) {
        searchData.createStartTime = searchData.createTime[0]
        searchData.createEndTime = searchData.createTime[1]
        delete searchData.createTime
      }
      if (searchData.lastLoginTime && Array.isArray(searchData.lastLoginTime)) {
        searchData.lastLoginStartTime = searchData.lastLoginTime[0]
        searchData.lastLoginEndTime = searchData.lastLoginTime[1]
        delete searchData.lastLoginTime
      }

      // 添加分页参数
      searchData.pageNum = pagination.page
      searchData.pageSize = pagination.pageSize

      // 模拟API调用
      const response = await userApi.searchUsers(searchData)
      
      userList.value = response.data.list
      pagination.itemCount = response.data.total
      
      message.success(`搜索完成，共找到 ${response.data.total} 条用户记录`)
    } catch (error) {
      message.error('搜索失败，请重试')
      console.error('用户搜索错误:', error)
    } finally {
      loading.value = false
    }
  }

  const handleUserReset = () => {
    console.log('重置用户搜索')
    pagination.page = 1
    loadDefaultUserData()
  }

  const handleParamsChange = (params) => {
    console.log('搜索参数变更:', params)
  }

  const handlePageChange = (page) => {
    pagination.page = page
    userSearchRef.value.searchFn()
  }

  const loadDefaultUserData = async () => {
    loading.value = true
    try {
      const response = await userApi.getUsers({
        pageNum: pagination.page,
        pageSize: pagination.pageSize
      })
      userList.value = response.data.list
      pagination.itemCount = response.data.total
    } catch (error) {
      message.error('加载用户数据失败')
    } finally {
      loading.value = false
    }
  }

  // 页面初始化
  onMounted(() => {
    loadDefaultUserData()
  })
</script>

<style scoped>
  .user-management {
    padding: 24px;
  }
</style>
```
:::

::: details 🎬 演示页面 - 多种字段配置和功能展示
```vue {20,24,34}
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
  import { reactive, ref } from 'vue'
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

  const message = useMessage()
  const searchResults = ref<SearchResult[]>([])

  // 创建响应式表单参数 - 使用精确类型
  const basicFormParams = reactive<BasicFormParams>({
    ...basicFormConfig.params,
  })
  const advancedFormParams = reactive<AdvancedFormParams>({
    ...advancedFormConfig.params,
  })
  const megaFormParams = reactive<MegaFormParams>({ ...megaFormConfig.params })

  /**
   * * @description: 重置表单参数到初始状态的辅助函数
   * ? @param {T} target 目标表单参数对象
   * ? @param {T} source 源初始参数对象
   * ! @return {void} 无返回值，直接修改目标对象
   */
  function resetFormParams<T extends Record<string, unknown>>(
    target: T,
    source: T
  ): void {
    Object.keys(target).forEach(key => {
      target[key] = source[key]
    })
  }

  /**
   * * @description: 处理基础表单搜索事件
   * ? @param {BasicFormParams} params 基础表单搜索参数
   * ! @return {void} 无返回值，执行搜索并更新结果
   */
  function handleBasicSearch(params: BasicFormParams) {
    console.log('基础搜索参数:', params)
    message.success('搜索成功！')
    searchResults.value = generateMockResults('basic', params)
  }

  /**
   * * @description: 处理基础表单重置事件
   * ! @return {void} 无返回值，重置表单并清空搜索结果
   */
  function handleBasicReset() {
    resetFormParams(basicFormParams, basicFormConfig.params)
    searchResults.value = []
    message.info('表单已重置')
  }

  /**
   * * @description: 处理高级表单搜索事件
   * ? @param {AdvancedFormParams} params 高级表单搜索参数
   * ! @return {void} 无返回值，执行搜索并更新结果
   */
  function handleAdvancedSearch(params: AdvancedFormParams) {
    console.log('高级搜索参数:', params)
    message.success('高级搜索成功！')
    searchResults.value = generateMockResults('advanced', params)
  }

  /**
   * * @description: 处理高级表单重置事件
   * ! @return {void} 无返回值，重置表单并清空搜索结果
   */
  function handleAdvancedReset() {
    resetFormParams(advancedFormParams, advancedFormConfig.params)
    searchResults.value = []
    message.info('高级表单已重置')
  }

  /**
   * * @description: 处理超多字段表单搜索事件
   * ? @param {MegaFormParams} params 超多字段表单搜索参数
   * ! @return {void} 无返回值，执行搜索并更新结果
   */
  function handleMegaSearch(params: MegaFormParams) {
    console.log('超多字段搜索参数:', params)
    message.success('超多字段搜索成功！')
    searchResults.value = generateMockResults('mega', params)
  }

  /**
   * * @description: 处理超多字段表单重置事件
   * ! @return {void} 无返回值，重置表单并清空搜索结果
   */
  function handleMegaReset() {
    resetFormParams(megaFormParams, megaFormConfig.params)
    searchResults.value = []
    message.info('超多字段表单已重置')
  }

  /**
   * * @description: 处理表单参数变化事件
   * ? @param {BasicFormParams | AdvancedFormParams | MegaFormParams} params 变化的表单参数
   * ! @return {void} 无返回值，仅用于日志记录和调试
   */
  function handleParamsChange(
    params: BasicFormParams | AdvancedFormParams | MegaFormParams
  ) {
    console.log('参数变化:', params)
  }
</script>

<style lang="scss" scoped>
  .search-demo {
    padding: 20px;

    .main-title {
      margin-bottom: 24px;
      text-align: center;
    }

    .demo-section {
      margin-bottom: 40px;

      h3 {
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 2px solid var(--n-primary-color);
        font-size: 16px;
      }
    }

    pre {
      background: var(--n-code-color);
      padding: 16px;
      border-radius: 6px;
      font-size: 12px;
      line-height: 1.5;
      overflow-x: auto;
    }
  }
</style>
```
:::

::: details 🗂️ 数据配置 - 完整的类型定义和配置示例
```typescript
// 基础类型定义
export interface OptionItem {
  labelDefault?: string
  label?: string
  value?: string | number
  disabled?: boolean
}

export interface SearchFormItem {
  type: 'input' | 'select' | 'date-range' | '%'
  prop: string
  placeholder?: string
  list?: OptionItem[]
  hisList?: string[]
  isFocus?: boolean
  show?: boolean
}

// 表单参数类型定义
export interface BaseFormParams {
  pageNum: number
  pageSize: number
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

// 配置类型
export interface FormConfig<T extends BaseFormParams> {
  params: T
  items: SearchFormItem[]
  historyKey: string
}

// 基础示例配置
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
      hisList: [],
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

// 高级示例配置
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
    pageSize: 10,
  },
  items: [
    {
      type: 'input',
      prop: 'keyword',
      placeholder: '请输入关键词',
    },
    {
      type: 'select',
      prop: 'category',
      placeholder: '请选择分类',
      list: [
        { labelDefault: '技术文档', value: 'tech' },
        { labelDefault: '产品需求', value: 'product' },
        { labelDefault: '运营活动', value: 'operation' },
      ],
    },
    {
      type: 'select',
      prop: 'level',
      placeholder: '请选择级别',
      list: [
        { labelDefault: '高优先级', value: 'high' },
        { labelDefault: '中优先级', value: 'medium' },
        { labelDefault: '低优先级', value: 'low' },
      ],
    },
    {
      type: 'input',
      prop: 'region',
      placeholder: '请输入地区',
    },
    {
      type: 'date-range',
      prop: 'timeRange',
    },
    {
      type: 'input',
      prop: 'price',
      placeholder: '请输入价格范围',
    },
    {
      type: 'input',
      prop: 'tags',
      placeholder: '请输入标签',
    },
    {
      type: 'select',
      prop: 'department',
      placeholder: '请选择部门',
      list: [
        { labelDefault: '技术部', value: 'tech' },
        { labelDefault: '产品部', value: 'product' },
        { labelDefault: '运营部', value: 'operation' },
      ],
    },
    {
      type: 'select',
      prop: 'priority',
      placeholder: '请选择优先级',
      list: [
        { labelDefault: '紧急', value: 'urgent' },
        { labelDefault: '普通', value: 'normal' },
        { labelDefault: '延后', value: 'delayed' },
      ],
    },
    {
      type: 'input',
      prop: 'assignee',
      placeholder: '请输入负责人',
    },
    {
      type: 'input',
      prop: 'project',
      placeholder: '请输入项目名称',
    },
    {
      type: 'input',
      prop: 'version',
      placeholder: '请输入版本号',
    },
  ],
  historyKey: 'advanced_search_history',
}

// 搜索结果类型
export interface SearchResult {
  id: number
  title: string
  type: string
  timestamp: string
  params: Record<string, any>
}

// 生成模拟搜索结果
export function generateMockResults(
  type: string,
  params: Record<string, any>
): SearchResult[] {
  return [
    {
      id: Date.now(),
      title: `${type} 搜索结果`,
      type,
      timestamp: new Date().toISOString(),
      params,
    },
  ]
}
```
:::

## 🛠️ 高级用法

::: details 🔄 自定义防抖处理 - 优化搜索性能
```vue {10,11,12,13,14,15,16,17,18,19,20}
<template>
  <C_FormSearch
    ref="searchRef"
    :form-item-list="searchFields"
    :form-params="searchParams"
    @search="handleSearch"
  >
    <!-- 使用防抖指令自定义搜索按钮 -->
    <template #action="{ validate }">
      <n-space>
        <n-button
          type="primary"
          v-debounce="{ delay: 500, immediate: false, onExecute: handleDebounceExecute }"
          @click="validate"
        >
          搜索
        </n-button>
        <n-button @click="handleReset">重置</n-button>
      </n-space>
    </template>
  </C_FormSearch>
</template>

<script setup>
  const searchRef = ref()

  const handleDebounceExecute = () => {
    console.log('防抖执行中...')
  }

  const handleSearch = (params) => {
    console.log('搜索参数:', params)
    performSearch(params)
  }

  const handleReset = () => {
    searchRef.value.cleanFn()
  }
</script>
```
:::

::: details 🔗 搜索条件联动 - 智能字段关联
```vue {5,15,16,17,26,27,28,38,39,40,50,51,52}
<template>
  <C_FormSearch
    :form-item-list="linkedSearchFields"
    :form-params="searchParams"
    @search="handleLinkedSearch"
    @change-params="handleParamsChange"
  />
</template>

<script setup>
  const searchParams = ref({
    category: null,
    subCategory: null,
    brand: null,
    model: null
  })

  // 分类数据
  const categories = ref([
    { labelDefault: '电子产品', value: 'electronics' },
    { labelDefault: '服装', value: 'clothing' },
    { labelDefault: '家具', value: 'furniture' }
  ])

  const subCategories = ref({
    electronics: [
      { labelDefault: '手机', value: 'phone' },
      { labelDefault: '电脑', value: 'computer' }
    ],
    clothing: [
      { labelDefault: '男装', value: 'men' },
      { labelDefault: '女装', value: 'women' }
    ],
    furniture: [
      { labelDefault: '沙发', value: 'sofa' },
      { labelDefault: '床', value: 'bed' }
    ]
  })

  const linkedSearchFields = computed(() => [
    {
      type: 'select',
      prop: 'category',
      placeholder: '请选择分类',
      list: categories.value
    },
    {
      type: 'select',
      prop: 'subCategory',
      placeholder: searchParams.value.category ? '请选择子分类' : '请先选择分类',
      list: searchParams.value.category 
        ? subCategories.value[searchParams.value.category] || []
        : []
    }
  ])

  // 监听分类变化，清空下级选择
  watch(() => searchParams.value.category, () => {
    searchParams.value.subCategory = null
    searchParams.value.brand = null
  })

  const handleLinkedSearch = (params) => {
    console.log('联动搜索参数:', params)
  }

  const handleParamsChange = (params) => {
    console.log('参数变化:', params)
  }
</script>
```
:::

::: details 💾 搜索结果缓存 - 提升用户体验
```vue {3,4,5,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72}
<template>
  <C_FormSearch
    :form-item-list="searchFields"
    :form-params="searchParams"
    @search="handleCachedSearch"
  />
</template>

<script setup>
  const searchCache = ref(new Map())
  const cacheExpireTime = 5 * 60 * 1000 // 5分钟过期

  const generateCacheKey = (params) => {
    return JSON.stringify(params)
  }

  const getCachedResult = (cacheKey) => {
    const cached = searchCache.value.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < cacheExpireTime) {
      return cached.data
    }
    return null
  }

  const setCachedResult = (cacheKey, data) => {
    searchCache.value.set(cacheKey, {
      data,
      timestamp: Date.now()
    })
    
    // 限制缓存大小
    if (searchCache.value.size > 50) {
      const firstKey = searchCache.value.keys().next().value
      searchCache.value.delete(firstKey)
    }
  }

  const handleCachedSearch = async (params) => {
    const cacheKey = generateCacheKey(params)
    
    // 尝试从缓存获取结果
    const cachedResult = getCachedResult(cacheKey)
    if (cachedResult) {
      console.log('使用缓存结果:', cachedResult)
      message.success('使用缓存数据，搜索完成')
      return
    }

    // 缓存未命中，执行实际搜索
    try {
      loading.value = true
      const result = await api.search(params)
      
      // 缓存搜索结果
      setCachedResult(cacheKey, result)
      
      console.log('搜索结果已缓存:', result)
      message.success('搜索完成')
    } catch (error) {
      message.error('搜索失败')
    } finally {
      loading.value = false
    }
  }
</script>
```
:::

::: details ✅ 高级验证示例 - 集成验证工具
```vue {14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162}
<template>
  <C_FormSearch
    :form-item-list="advancedSearchFields"
    :form-params="searchParams"
    @search="handleAdvancedValidatedSearch"
  />
</template>

<script setup>
  import { PRESET_RULES, RULE_COMBOS, customRule, customAsyncRule } from '@/utils/v_verify'

  const searchParams = ref({
    username: '',
    email: '',
    phone: '',
    website: '',
    userAge: null,
    dateRange: null,
  })

  const advancedSearchFields = [
    {
      type: 'input',
      prop: 'username',
      placeholder: '请输入用户名（支持字母数字下划线，3-20位）',
    },
    {
      type: 'input',
      prop: 'email',
      placeholder: '请输入邮箱地址',
    },
    {
      type: 'input',
      prop: 'phone',
      placeholder: '请输入手机号',
    },
    {
      type: 'input',
      prop: 'website',
      placeholder: '请输入网站链接',
    },
    {
      type: 'inputNumber',
      prop: 'userAge',
      placeholder: '请输入年龄范围',
    },
    {
      type: 'date-range',
      prop: 'dateRange',
    },
  ]

  const handleAdvancedValidatedSearch = async (params) => {
    try {
      // 基础非空检查
      const hasValidCondition = Object.entries(params)
        .filter(([key]) => !['pageNum', 'pageSize'].includes(key))
        .some(([key, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0 && value[0] !== null
          }
          return value !== null && value !== undefined && value !== ''
        })

      if (!hasValidCondition) {
        message.warning('请输入搜索条件')
        return
      }

      // 使用预设规则组合进行验证
      const validationTasks = []

      // 用户名验证（使用规则组合，但跳过必填验证）
      if (params.username) {
        validationTasks.push(
          PRESET_RULES.username('用户名').validator(null, params.username)
        )
      }

      // 邮箱验证
      if (params.email) {
        validationTasks.push(
          PRESET_RULES.email('邮箱').validator(null, params.email)
        )
      }

      // 手机号验证
      if (params.phone) {
        validationTasks.push(
          PRESET_RULES.mobile('手机号').validator(null, params.phone)
        )
      }

      // URL验证
      if (params.website) {
        validationTasks.push(
          PRESET_RULES.url('网站链接').validator(null, params.website)
        )
      }

      // 年龄范围验证
      if (params.userAge) {
        validationTasks.push(
          PRESET_RULES.range('年龄', 1, 150).validator(null, params.userAge)
        )
      }

      // 自定义日期范围验证
      if (params.dateRange && Array.isArray(params.dateRange)) {
        const dateRangeRule = customRule(
          (value) => {
            if (!Array.isArray(value) || value.length !== 2) return false
            const [start, end] = value
            const diffDays = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
            return diffDays >= 1 && diffDays <= 365 // 至少1天，最多1年
          },
          '日期范围必须在1天到1年之间',
          'blur'
        )
        validationTasks.push(
          dateRangeRule.validator(null, params.dateRange)
        )
      }

      // 并行执行所有验证
      try {
        await Promise.all(validationTasks)
      } catch (error) {
        message.error(error.message)
        return
      }

      // 异步验证示例（检查用户名是否存在）
      if (params.username) {
        try {
          const asyncRule = customAsyncRule(
            async (username) => {
              // 模拟异步检查
              const response = await checkUsernameExists(username)
              return !response.exists // 如果用户名不存在，验证通过
            },
            '用户名已存在，请尝试其他用户名',
            'blur'
          )
          await asyncRule.validator(null, params.username)
        } catch (error) {
          message.warning(error.message)
          // 异步验证失败不阻止搜索，只是警告
        }
      }

      // 执行搜索
      await performSearch(params)
      message.success('搜索完成')
    } catch (error) {
      console.error('搜索错误:', error)
      message.error('搜索服务异常，请稍后重试')
    }
  }

  // 模拟异步检查用户名是否存在
  const checkUsernameExists = async (username) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { exists: ['admin', 'test', 'user'].includes(username) }
  }
</script>
```
:::

## 🎨 自定义样式

::: details 🎨 CSS 变量定制 - 主题色彩和尺寸配置
```scss
.c-form-search-wrapper {
  --search-primary-color: #1890ff;
  --search-border-color: #d9d9d9;
  --search-hover-color: #40a9ff;
  --search-history-bg: #ffffff;
  --search-history-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --search-item-gap: 16px;
  --search-border-radius: 6px;
  --search-button-height: 32px;
  --search-input-height: 32px;
}
```
:::

::: details 📱 响应式布局 - 移动端适配优化
```vue {5,6}
<template>
  <C_FormSearch
    :form-item-list="responsiveFields"
    :form-params="searchParams"
    :class="searchFormClass"
  />
</template>

<script setup>
  const breakpoint = useBreakpoint()
  
  const searchFormClass = computed(() => ({
    'search-form-mobile': breakpoint.value.xs,
    'search-form-tablet': breakpoint.value.md,
    'search-form-desktop': breakpoint.value.lg
  }))
</script>

<style scoped>
  .search-form-mobile :deep(.form-search-item-box) {
    flex: 1 1 100%;
    min-width: auto;
  }

  .search-form-tablet :deep(.form-search-item-box) {
    flex: 1 1 calc(50% - 8px);
    min-width: 200px;
  }

  .search-form-desktop :deep(.form-search-item-box) {
    flex: 1 1 calc(25% - 12px);
    min-width: 220px;
  }

  @media (max-width: 768px) {
    :deep(.form-search-tool) {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
```
:::

::: details 🌈 主题定制 - 深色主题和彩色主题
```vue
<template>
  <div class="custom-search-theme">
    <!-- 深色主题 -->
    <C_FormSearch
      :form-item-list="searchFields"
      :form-params="searchParams"
      class="dark-search-theme"
    />

    <!-- 彩色主题 -->
    <C_FormSearch
      :form-item-list="searchFields"
      :form-params="searchParams"
      class="colorful-search-theme"
    />
  </div>
</template>

<style scoped>
.dark-search-theme {
  --search-bg-color: #1f1f1f;
  --search-text-color: #ffffff;
  --search-border-color: #434343;
  --search-primary-color: #177ddc;
  --search-history-bg: #2f2f2f;
  --search-hover-bg: rgba(255, 255, 255, 0.1);
}

.colorful-search-theme {
  --search-primary-color: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  --search-hover-color: #ff6b6b;
  --search-focus-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
  --search-border-radius: 12px;
  --search-history-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.colorful-search-theme :deep(.n-button--primary-type) {
  background: var(--search-primary-color);
  border: none;
}
</style>
```
:::

## ⚠️ 注意事项

### 1. 搜索参数绑定

::: code-group

```vue [✅ 推荐] {3,4}
<!-- 使用响应式对象 -->
<script setup>
  const searchParams = ref({
    username: '',
    status: null
  })
</script>
```

```vue [❌ 不推荐] {3,4}
<!-- 直接赋值对象 -->
<script setup>
  const searchParams = {
    username: '',
    status: null
  }
</script>
```

:::

### 2. 历史记录配置

::: code-group

```vue [✅ 推荐] {3}
<!-- 为不同页面设置不同的历史记录键 -->
<C_FormSearch
  form-search-input-history-string="user-management-search"
  :form-item-list="searchFields"
  :form-params="searchParams"
/>
```

```vue [❌ 不推荐] {3}
<!-- 使用通用键名 -->
<C_FormSearch
  form-search-input-history-string="search"
  :form-item-list="searchFields"
  :form-params="searchParams"
/>
```

:::

### 3. 搜索条件验证

::: code-group

```javascript [✅ 推荐] {2,3,4,5,6,7,8,9,10,11,12,13,14}
// 完整的搜索条件验证
const validateSearchParams = (params) => {
  const validKeys = Object.keys(params).filter(
    key => !['pageNum', 'pageSize'].includes(key)
  )
  
  return validKeys.some(key => {
    const value = params[key]
    if (Array.isArray(value)) {
      return value.length > 0 && value[0] !== null
    }
    return value !== null && value !== undefined && value !== ''
  })
}
```

```javascript [❌ 不推荐] {2,3}
// 简单的空值检查
const validateSearchParams = (params) => {
  return Object.values(params).some(value => !!value)
}
```

:::

## 🐛 故障排除

::: details ❓ Q1: 历史记录不显示？
**A1:** 检查历史记录配置：

```javascript
// 确保设置了历史记录存储键
<C_FormSearch
  form-search-input-history-string="your-unique-key" // 必须设置
  :form-item-list="searchFields"
  :form-params="searchParams"
/>
```
:::

::: details ❓ Q2: 展开收起按钮不出现？
**A2:** 检查字段数量：

```javascript
// 展开收起功能需要超过7个字段
const searchFields = [
  // 至少需要8个或以上的字段
  { type: 'input', prop: 'field1' },
  { type: 'input', prop: 'field2' },
  // ... 需要更多字段
]
```
:::

::: details ❓ Q3: 搜索参数不更新？
**A3:** 检查参数绑定：

```vue
<!-- 确保使用响应式数据 -->
<script setup>
  const searchParams = ref({}) // 使用 ref
  // 或
  const searchParams = reactive({}) // 使用 reactive
</script>
```
:::

::: details ❓ Q4: 选择器选项不显示？
**A4:** 检查选项配置：

```javascript
// 确保选项格式正确
const list = [
  { labelDefault: '显示文本', value: '值' }, // ✅ 正确格式
  { label: '显示文本', value: '值' }, // ✅ 备用格式
  { value: '值' }, // ❌ 缺少显示文本
]
```
:::

::: details ❓ Q5: 日期范围不生效？
**A5:** 检查日期字段配置：

```javascript
// 确保日期范围字段类型正确
{
  type: 'date-range', // 必须是 'date-range'
  prop: 'dateRange',
  placeholder: '请选择日期范围'
}
```
:::

## 🎯 最佳实践

### 1. 搜索字段设计

```javascript {4,5,6,7,8,9,10,11,12,13,14,15,16,17,18}
// ✅ 推荐：语义化的字段配置
const searchFields = [
  {
    type: 'input',
    prop: 'username',
    placeholder: '请输入用户名或邮箱', // 明确的提示信息
  },
  {
    type: 'select',
    prop: 'status',
    placeholder: '请选择用户状态',
    list: [
      { labelDefault: '正常', value: 1 }, // 清晰的标签
      { labelDefault: '禁用', value: 0 },
      { labelDefault: '待激活', value: 2 }
    ]
  }
]
```

### 2. 历史记录管理

```javascript {2,3,4,5,6,7,8,9}
// 为不同模块设置不同的历史记录键
const userManagementHistory = 'user-management-search'
const articleManagementHistory = 'article-management-search'
const orderManagementHistory = 'order-management-search'

// 避免使用通用键名
// ❌ 不推荐
const genericHistory = 'search-history'
```

### 3. 防抖优化

```vue {8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69}
<template>
  <!-- 使用防抖指令优化搜索交互 -->
  <C_FormSearch
    :form-item-list="searchFields"
    :form-params="searchParams"
    @search="handleSearch"
  >
    <!-- 自定义搜索按钮使用防抖指令 -->
    <template #action="{ validate }">
      <n-space>
        <n-button
          type="primary"
          v-debounce="{ delay: 300, immediate: false }"
          @click="validate"
        >
          搜索
        </n-button>
        <n-button @click="handleReset">重置</n-button>
      </n-space>
    </template>
  </C_FormSearch>
</template>

<script setup>
  // 大型选项数据优化
  const departmentOptions = shallowRef([
    // 大量部门数据，使用 shallowRef 避免深度响应式
  ])

  // 搜索结果缓存
  const searchCache = new Map()
  const CACHE_EXPIRE_TIME = 5 * 60 * 1000 // 5分钟

  const handleSearch = async (params) => {
    const cacheKey = JSON.stringify(params)
    
    // 检查缓存
    const cached = searchCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRE_TIME) {
      tableData.value = cached.data
      message.success('使用缓存数据')
      return
    }

    // 执行搜索
    const result = await performSearch(params)
    
    // 缓存结果
    searchCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    })
    
    tableData.value = result
  }
</script>
```

### 4. 类型安全和代码规范

```typescript {2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62}
// 定义精确的搜索参数类型
interface UserSearchParams {
  username: string
  email: string
  department: string | null
  status: number | null
  createTime: string[] | null
  pageNum: number
  pageSize: number
}

// 搜索字段配置类型
interface SearchFormItem {
  type: 'input' | 'select' | 'date-range' | '%'
  prop: keyof UserSearchParams
  placeholder?: string
  list?: OptionItem[]
  hisList?: string[]
  isFocus?: boolean
  show?: boolean
}

// 使用类型约束
const searchParams = ref<UserSearchParams>({
  username: '',
  email: '',
  department: null,
  status: null,
  createTime: null,
  pageNum: 1,
  pageSize: 20,
})

const searchFields: SearchFormItem[] = [
  {
    type: 'input',
    prop: 'username',
    placeholder: '请输入用户名',
  },
  {
    type: 'select',
    prop: 'department',
    placeholder: '请选择部门',
    list: [
      { labelDefault: '技术部', value: 'tech' },
      { labelDefault: '产品部', value: 'product' },
    ],
  },
]

// 类型安全的搜索处理函数
const handleSearch = (params: UserSearchParams) => {
  console.log('搜索参数:', params)
  // TypeScript 会提供完整的类型检查和自动补全
}
```

## 📝 更新日志

### v1.0.0 (2025-07-17)

- ✨ 支持多种搜索控件类型（输入框、选择器、日期范围、占位符）
- ✨ 智能历史记录功能，自动缓存和管理搜索历史
- ✨ 响应式展开收起功能，超过7个字段自动支持展开收起
- ✨ 完整的事件系统（搜索、重置、参数变更）
- ✨ 智能搜索条件验证，避免无效搜索
- ✨ 完整的TypeScript支持
- ✨ 基于Naive UI的统一视觉风格
- ✨ 支持防抖指令优化搜索交互

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个搜索组件专为提升数据检索效率而设计，支持智能历史记录、响应式布局和多种搜索控件。无论是简单的关键词搜索还是复杂的多条件筛选，都能提供流畅的用户体验。结合防抖指令和类型安全设计，让搜索功能既高效又可靠。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更高效的搜索体验！ 🔍