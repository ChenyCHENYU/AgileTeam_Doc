# Robot Admin 项目代码规范指南

::: tip 写在前面
本文档基于 Robot Admin 项目实践，介绍如何使用 **现代化前端架构 + 工程化工具链** 的高效开发方案。相比传统开发方式，这套规范能减少 **60% 的重复代码**，提升 **80% 的开发效率**，并实现 **零维护成本** 的代码质量保障。
:::

## 🎯 为什么要用这套规范？

### 传统开发的痛点

<div class="pain-points">

| 痛点场景       | 问题描述                         | 时间浪费     | 风险等级   |
| -------------- | -------------------------------- | ------------ | ---------- |
| **代码风格不统一** | 每个开发者风格不同，难以维护     | 2小时/次review | ⭐⭐⭐⭐   |
| **组件重复开发** | 相似功能重复造轮子               | 1天/功能     | ⭐⭐⭐⭐⭐ |
| **类型定义分散** | 类型定义散落各处，容易不一致     | 3小时/次对接 | ⭐⭐⭐⭐   |
| **构建配置混乱** | 配置文件杂乱，难以维护和扩展     | 半天/次排查  | ⭐⭐⭐     |
| **提交信息不规范** | Git 历史混乱，难以追踪问题       | 1小时/次排查 | ⭐⭐⭐⭐   |
| **性能优化缺失** | 页面加载慢，用户体验差           | 2天/次优化   | ⭐⭐⭐⭐⭐ |

</div>

### 本规范方案的优势

::: code-group

```typescript [传统方式 - 手写配置 ❌]
// 每次都要手动配置
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/types/components.d.ts',
    }),
  ],
  // ... 还要手动配置很多选项 😵
})
```

```typescript [规范方式 - 模块化配置 ✅]
// 1. 模块化配置文件
// config/vite/index.ts
export { default as viteAutoImportPlugin } from './viteAutoImportConfig'
export { default as viteComponentsPlugin } from './viteComponentsConfig'
export { default as resolveConfig } from './viteResolveConfig'

// 2. 专门的功能配置
// config/vite/viteAutoImportConfig.ts
export default AutoImport({
  imports: [
    'vue',
    'vue-router',
    'pinia',
    { '@vueuse/core': ['useLocalStorage', 'useClipboard'] },
    { 'naive-ui': ['useDialog', 'useMessage', 'useNotification'] },
  ],
  dts: 'src/types/auto-imports.d.ts',
  dirs: ['src/stores', 'src/composables', 'src/hooks'],
  vueTemplate: true,
})

// 3. 一键导入使用
// vite.config.ts
import { viteAutoImportPlugin, viteComponentsPlugin, resolveConfig } from './config/vite'

export default defineConfig({
  plugins: [viteAutoImportPlugin, viteComponentsPlugin],
  resolve: resolveConfig,
})
```

:::

### 收益对比

<div class="roi-comparison">

| 对比维度     | 传统方式         | 规范方案         | 提升幅度    |
| ------------ | ---------------- | ---------------- | ----------- |
| **开发效率** | 2小时/配置       | 10分钟（模块化） | **92%** ⬆️ |
| **代码质量** | 依赖个人水平     | 统一标准检查     | **80%** ⬆️  |
| **维护成本** | 1天/次配置修改   | 10分钟/次修改    | **98%** ⬇️  |
| **新人上手** | 3天              | 4小时            | **89%** ⬇️  |
| **团队协作** | 沟通成本高       | 标准化流程       | **75%** ⬇️  |

</div>

::: warning 关键收益

- **92%** 配置效率提升（模块化配置）
- **80%** 代码质量提升（自动化检查）
- **98%** 维护成本降低（标准化流程）
- **89%** 上手时间减少（完整文档）
  :::

## 🔧 技术栈与架构

### 核心技术栈

| 工具                    | 版本    | 作用                            | 官方文档                                  |
| ----------------------- | ------- | ------------------------------- | ----------------------------------------- |
| **Vue 3**               | 3.5.30  | 渐进式 JavaScript 框架         | [文档](https://vuejs.org/)                |
| **TypeScript**          | 5.8.3   | JavaScript 的超集，提供类型系统 | [文档](https://www.typescriptlang.org/)   |
| **Vite**                | 7.3.1   | 下一代前端构建工具              | [文档](https://vitejs.dev/)              |
| **Naive UI**            | 2.44.1  | Vue 3 组件库                    | [文档](https://www.naiveui.com/)          |
| **UnoCSS**              | 66.6.6  | 原子化 CSS 引擎                 | [文档](https://uno.antfu.me/)            |
| **Pinia**               | 3.0.4   | Vue 状态管理库                  | [文档](https://pinia.vuejs.org/)          |
| **ESLint**              | 10.0.3  | JavaScript 代码检查工具        | [文档](https://eslint.org/)              |
| **Oxlint**              | 1.52.0  | 高性能 JavaScript/TypeScript 检查 | [文档](https://oxc.rs/)                  |

### 架构设计

```mermaid
graph TB
    A[开发规范] --> B[文件组织规范]
    A --> C[命名约定]
    A --> D[代码风格规范]
    A --> E[组件开发规范]
    A --> F[样式开发规范]
    A --> G[TypeScript 规范]
    A --> H[构建与配置]
    A --> I[Git 工作流]
    A --> J[性能优化]
    
    B --> K[三文件模式]
    B --> L[组件库组织]
    B --> M[类型模块化]
    
    C --> N[文件命名]
    C --> O[组件命名]
    C --> P[变量命名]
    
    D --> Q[编码规范]
    D --> R[函数定义]
    D --> S[条件语句]
    
    E --> T[组件结构]
    E --> U[Props/Emits]
    E --> V[组件通信]
    
    F --> W[SCSS 结构]
    F --> X[UnoCSS 配置]
    F --> Y[主题系统]
    
    G --> Z[类型定义]
    G --> AA[类型守卫]
    G --> BB[组件类型]
    
    H --> CC[Vite 配置]
    H --> DD[自动导入]
    H --> EE[构建优化]
    
    I --> FF[提交规范]
    I --> GG[代码检查]
    I --> HH[工作流程]
    
    J --> II[懒加载]
    J --> JJ[预加载]
    J --> KK[请求优化]
```

### 目录结构

```bash
Robot_Admin/
├── 📁 public/                    # 静态资源
├── 📁 src/                       # 源代码
│   ├── 📁 api/                   # API 接口层
│   │   ├── 📁 generated/         # 🤖 自动生成目录
│   │   ├── auth.ts               # 认证相关接口
│   │   └── permission-manage.ts  # 权限管理接口
│   ├── 📁 assets/                 # 静态资源
│   ├── 📁 axios/                 # Axios 封装 + 插件体系
│   ├── 📁 components/            # 组件库
│   │   ├── 📁 global/           # 全局组件 (C_ 前缀)
│   │   │   ├── 📁 C_Form/       # 表单组件体系
│   │   │   ├── 📁 C_Table/      # 表格组件体系
│   │   │   └── 📁 ...
│   │   └── 📁 local/            # 局部组件 (c_ 前缀)
│   ├── 📁 config/                # 配置文件
│   │   └── 📁 vite/            # Vite 配置模块化
│   ├── 📁 constant/              # 常量定义
│   ├── 📁 hooks/                 # 组合式函数
│   ├── 📁 lang/                  # 国际化文件
│   ├── 📁 lib/                   # 工具库
│   ├── 📁 plugins/               # 插件配置
│   ├── 📁 router/                # 路由配置
│   ├── 📁 stores/                # 状态管理
│   ├── 📁 styles/                # 样式文件
│   ├── 📁 types/                 # 类型定义
│   │   └── 📁 modules/          # 模块化类型定义
│   ├── 📁 utils/                 # 工具函数
│   └── 📁 views/                 # 页面组件
│       ├── 📁 demo/              # 演示页面 (01-34 编号)
│       └── 📁 ...
├── 📁 scripts/                   # 脚本文件
├── 📁 tsconfig/                  # TypeScript 配置
└── 配置文件...
```

::: tip 目录说明

- **components/global/** - 全局组件，使用 C_ 前缀命名
- **components/local/** - 局部组件，使用 c_ 前缀命名
- **config/vite/** - 模块化的 Vite 配置
- **types/modules/** - 模块化的类型定义
- **views/demo/** - 演示页面，按数字编号组织
  :::

## 📦 文件组织规范

### 页面组件三文件模式

每个功能页面遵循 **三文件组织模式**：

::: code-group

```bash [目录结构]
views/feature-name/
├── 📄 index.vue          # 主组件文件
├── 📄 index.scss         # 样式文件
└── 📄 data.ts           # 数据配置文件
```

```typescript [data.ts - 数据配置层]
// views/demo/07-form/data.ts
export const layoutOptions = [
  { label: '默认布局', value: 'default' as const },
  { label: '行内布局', value: 'inline' as const },
  { label: '网格布局', value: 'grid' as const },
  { label: '卡片布局', value: 'card' as const },
  { label: '标签页布局', value: 'tabs' as const },
  { label: '步骤布局', value: 'steps' as const },
] as const

export type LayoutType = typeof layoutOptions[number]['value']

export const testDataConfig = {
  getTestData(layoutType: LayoutType): Record<string, any> {
    // 测试数据生成逻辑
    return {
      layout: layoutType,
      items: generateFormItems(layoutType),
    }
  },
}

function generateFormItems(layoutType: LayoutType) {
  // 根据布局类型生成表单项
  switch (layoutType) {
    case 'default':
      return [
        { prop: 'name', label: '姓名', type: 'input' },
        { prop: 'email', label: '邮箱', type: 'input' },
      ]
    // ... 其他布局
  }
}
```

```scss [index.scss - 样式层]
/* views/demo/07-form/index.scss */
.form-demo {
  padding: 20px;

  .control-panel {
    margin-bottom: 20px;
    padding: 16px;
    background: var(--app-bg-card);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .form-container {
    background: var(--app-bg-body);
    border-radius: 8px;
    padding: 24px;
    
    .form-item {
      margin-bottom: 16px;
    }
  }
}
```

```vue [index.vue - 组件层]
<!-- views/demo/07-form/index.vue -->
<template>
  <div class="form-demo">
    <div class="control-panel">
      <NRadioGroup v-model:value="currentLayout">
        <NRadioButton
          v-for="option in layoutOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </NRadioButton>
      </NRadioGroup>
    </div>

    <div class="form-container">
      <C_Form
        :layout="currentLayout"
        :data="testData"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { layoutOptions, testDataConfig, type LayoutType } from './data'
  import './index.scss'

  // 响应式状态
  const currentLayout = ref<LayoutType>('default')
  
  // 计算属性
  const testData = computed(() => 
    testDataConfig.getTestData(currentLayout.value)
  )
  
  // 事件处理
  const handleSubmit = (formData: Record<string, any>) => {
    console.log('表单提交:', formData)
    window.$message?.success('提交成功')
  }
</script>
```

:::

### 组件库组织模式

#### 全局组件 (C\_ 前缀)

::: code-group

```bash [目录结构]
components/global/C_组件名/
├── 📄 index.vue          # 主组件
├── 📁 layouts/          # 布局变体 (如 C_Form)
│   ├── 📁 Default/
│   ├── 📁 Grid/
│   └── 📁 ...
└── 📁 components/       # 子组件 (可选)
```

```bash [C_Form 组件体系示例]
C_Form/
├── 📄 index.vue              # 主入口
├── 📁 layouts/               # 布局组件
│   ├── 📄 Default/index.vue
│   ├── 📄 Grid/index.vue
│   ├── 📄 Tabs/index.vue
│   └── 📄 Steps/index.vue
└── 📁 components/           # 子组件
    ├── 📄 FormItem/index.vue
    └── 📄 FormAction/index.vue
```

```vue [全局组件示例]
<!-- components/global/C_Form/index.vue -->
<template>
  <div class="c-form">
    <component
      :is="layoutComponent"
      :data="data"
      :config="config"
      @submit="$emit('submit', $event)"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import Default from './layouts/Default/index.vue'
  import Grid from './layouts/Grid/index.vue'
  import Tabs from './layouts/Tabs/index.vue'
  import Steps from './layouts/Steps/index.vue'

  interface Props {
    layout: 'default' | 'grid' | 'tabs' | 'steps'
    data: Record<string, any>
    config?: Record<string, any>
  }

  const props = withDefaults(defineProps<Props>(), {
    config: () => ({}),
  })

  defineEmits<{
    submit: [data: Record<string, any>]
  }>()

  const layoutComponent = computed(() => {
    const layoutMap = {
      default: Default,
      grid: Grid,
      tabs: Tabs,
      steps: Steps,
    }
    return layoutMap[props.layout]
  })
</script>

<style scoped lang="scss">
  .c-form {
    width: 100%;
  }
</style>
```

:::

#### 局部组件 (c\_ 前缀)

::: code-group

```bash [目录结构]
components/local/c_组件名/
├── 📄 index.vue          # 主组件
├── 📄 index.scss         # 样式文件
└── 📄 data.ts           # 数据文件 (可选)
```

```vue [局部组件示例]
<!-- components/local/c_UserCard/index.vue -->
<template>
  <div class="c-user-card">
    <div class="user-avatar">
      <NAvatar :src="user.avatar" :size="48" />
    </div>
    <div class="user-info">
      <div class="user-name">{{ user.name }}</div>
      <div class="user-email">{{ user.email }}</div>
      <div class="user-role">
        <NTag :type="roleTagType" size="small">
          {{ user.role }}
        </NTag>
      </div>
    </div>
    <div class="user-actions">
      <NSpace>
        <NButton size="small" @click="$emit('edit', user)">
          编辑
        </NButton>
        <NButton size="small" type="error" @click="$emit('delete', user)">
          删除
        </NButton>
      </NSpace>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import './index.scss'

  interface User {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
  }

  interface Props {
    user: User
  }

  const props = defineProps<Props>()

  defineEmits<{
    edit: [user: User]
    delete: [user: User]
  }>()

  const roleTagType = computed(() => {
    const roleTypeMap: Record<string, 'default' | 'info' | 'success' | 'warning' | 'error'> = {
      admin: 'error',
      manager: 'warning',
      user: 'info',
      guest: 'default',
    }
    return roleTypeMap[props.user.role] || 'default'
  })
</script>
```

```scss [样式文件]
/* components/local/c_UserCard/index.scss */
.c-user-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: var(--app-bg-card);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .user-avatar {
    margin-right: 16px;
  }

  .user-info {
    flex: 1;
    
    .user-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--app-text-primary);
      margin-bottom: 4px;
    }

    .user-email {
      font-size: 14px;
      color: var(--app-text-secondary);
      margin-bottom: 8px;
    }

    .user-role {
      display: inline-block;
    }
  }

  .user-actions {
    margin-left: 16px;
  }
}
```

:::

### 类型定义模块化

::: code-group

```bash [目录结构]
types/modules/
├── 📄 form.d.ts          # 表单相关类型
├── 📄 table.d.ts         # 表格相关类型
├── 📄 work-flow.d.ts     # 工作流类型
└── 📄 ...
```

```typescript [form.d.ts - 表单类型定义]
// types/modules/form.d.ts
export type LayoutType =
  | 'default'
  | 'inline'
  | 'grid'
  | 'card'
  | 'tabs'
  | 'steps'
  | 'dynamic'
  | 'custom'

export type ComponentType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'upload'
  | 'editor'
  | 'date-picker'
  | 'time-picker'
  | 'slider'
  | 'rate'

export interface FormOption {
  id?: string
  type: ComponentType | string
  prop: string
  label?: string
  value?: any
  placeholder?: string
  rules?: FieldRule[]
  layout?: ItemLayoutConfig
  options?: Array<{ label: string; value: any }>
  props?: Record<string, any>
  slots?: string[]
  span?: number
  offset?: number
}

export interface ItemLayoutConfig {
  span?: number
  offset?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export interface FieldRule {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change' | ['blur', 'change']
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  validator?: (rule: FieldRule, value: any) => boolean | string | Promise<boolean | string>
  type?: 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'date' | 'url' | 'hex' | 'email'
}
```

```typescript [table.d.ts - 表格类型定义]
// types/modules/table.d.ts
export interface TableColumn {
  key: string
  title?: string
  width?: number | string
  minWidth?: number
  maxWidth?: number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  type?: 'selection' | 'expand' | 'index'
  sorter?: boolean | 'default'
  filter?: boolean | FilterOption
  filterMultiple?: boolean
  filterOptionValue?: string | number | Array<string | number>
  render?: (value: any, record: Record<string, any>, index: number) => VNode
  ellipsis?: boolean | { tooltip?: boolean | string }
  children?: TableColumn[]
  resizable?: boolean
  className?: string
  titleColSpan?: number
}

export interface FilterOption {
  options: Array<{
    label: string
    value: string | number
  }>
}

export interface PaginationConfig {
  enabled: boolean
  page: number
  pageSize: number
  pageCount?: number
  itemCount?: number
  showSizePicker?: boolean
  pageSizes?: number[]
  showQuickJumper?: boolean
}

export interface TableAction<T = Record<string, any>> {
  key: string
  label: string
  icon?: string
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
  disabled?: boolean | ((record: T) => boolean)
  onClick: (record: T) => void | Promise<void>
}
```

:::

## 🎨 命名约定

### 文件命名规范

| 类型     | 命名规范          | 示例                   | 说明                     |
| -------- | ----------------- | ---------------------- | ------------------------ |
| Vue 组件 | PascalCase        | `UserManagement.vue`   | 组件文件名使用大驼峰     |
| 组件目录 | PascalCase        | `C_Form/`              | 组件目录名使用大驼峰     |
| 工具函数 | camelCase         | `useStorage.ts`        | 函数文件名使用小驼峰     |
| 常量文件 | UPPER_SNAKE_CASE  | `API_CONSTANTS.ts`     | 常量文件名使用大写下划线 |
| 样式文件 | kebab-case        | `user-management.scss` | 样式文件名使用短横线     |
| 类型文件 | camelCase + .d.ts | `userTypes.d.ts`       | 类型文件名使用小驼峰     |

### 组件命名规范

::: code-group

```typescript [全局组件 - C_ 前缀]
// 全局组件使用 C_ 前缀，表示可以在整个项目中使用
C_Form          // 表单组件
C_Table         // 表格组件
C_Icon          // 图标组件
C_Button        // 按钮组件
C_Modal         // 模态框组件
C_Upload        // 上传组件
```

```typescript [局部组件 - c_ 前缀]
// 局部组件使用 c_ 前缀，表示只在特定页面或组件中使用
c_UserCard      // 用户卡片
c_SearchFilter  // 搜索过滤器
c_DataPicker    // 日期选择器
c_FilePreview   // 文件预览
c_StatusBadge   // 状态徽章
```

```typescript [页面组件 - PascalCase]
// 页面组件使用 PascalCase，表示这是一个完整的页面
UserManagement  // 用户管理
Dashboard       // 仪表板
SystemSettings  // 系统设置
DataAnalysis    // 数据分析
```

```typescript [图标组件 - i- 前缀]
// 图标组件使用 i- 前缀，表示这是一个图标
i-mdi:home      // Material Design Icons 的 home 图标
i-carbon:edit   // Carbon Icons 的 edit 图标
i-fa:user       // Font Awesome 的 user 图标
i-tabler:settings // Tabler Icons 的 settings 图标
```

:::

### 变量命名规范

::: code-group

```typescript [常量 - UPPER_SNAKE_CASE]
// 常量使用全大写字母和下划线
const API_BASE_URL = 'https://api.example.com'
const MAX_FILE_SIZE = 10 * 1024 * 1024
const TOKEN_TIMEOUT_VALUE = 24 * 60 * 60 * 1000

// 常量对象
const LAYOUT_COMPONENT_MAP = {
  default: 'Default',
  grid: 'Grid',
  tabs: 'Tabs',
  steps: 'Steps',
} as const

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const
```

```typescript [变量和函数 - camelCase]
// 普通变量和函数使用小驼峰命名
const userName = 'John'
const isLoggedIn = true
const getUserInfo = () => {}
const handleSubmit = () => {}
const validateForm = (formData: FormData) => {}
```

```typescript [响应式变量 - 描述性命名]
// 响应式变量应该具有描述性，清楚表达其用途
const loading = ref(false)
const formData = reactive<Record<string, any>>({})
const filteredUsers = computed(() => users.value.filter(user => user.active))
const errorMessage = ref<string>('')
const isModalVisible = ref(false)
const selectedRows = ref<Array<string>>([])
```

```typescript [事件处理函数 - handle 前缀]
// 事件处理函数使用 handle 前缀，清楚表明这是一个事件处理器
const handleUserClick = (user: UserInfo) => {}
const handleFormSubmit = async (formData: FormData) => {}
const handleTabChange = (tabKey: string) => {}
const handleFileUpload = (file: File) => {}
const handleModalClose = () => {}
const handleSearch = (keyword: string) => {}
```

```typescript [计算属性 - 描述性命名]
// 计算属性应该具有描述性，表明这是一个派生值
const isFormValid = computed(() => {
  return formData.value.name && formData.value.email
})

const formattedDate = computed(() => {
  return new Date(date.value).toLocaleDateString()
})

const totalPrice = computed(() => {
  return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
```

:::

### CSS 类命名规范

::: code-group

```scss [BEM 命名规范]
// BEM (Block Element Modifier) 命名规范
.user-card {
  // Block 块
  padding: 16px;
  border-radius: 8px;
  
  &__header {
    // Element 元素
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    
    &--active {
      // Modifier 修饰符
      background-color: var(--app-primary-color);
    }
  }
  
  &__content {
    // Element 元素
    font-size: 14px;
    line-height: 1.5;
  }
  
  &__footer {
    // Element 元素
    margin-top: 12px;
    
    &--hidden {
      // Modifier 修饰符
      display: none;
    }
  }
}
```

```scss [UnoCSS 原子化类]
// UnoCSS 原子化类，使用工具类组合
.flex.items-center.justify-between.p-4
.text-lg.font-bold.text-primary
.rounded-lg.shadow-lg.hover:shadow-xl
.bg-white.dark:bg-gray-800
.transition-all.duration-300
```

```scss [组件状态类]
// 组件状态类命名
.component {
  // 默认状态
  &--default {
    // 默认样式
  }
  
  // 激活状态
  &--active {
    // 激活样式
  }
  
  // 禁用状态
  &--disabled {
    // 禁用样式
  }
  
  // 加载状态
  &--loading {
    // 加载样式
  }
  
  // 错误状态
  &--error {
    // 错误样式
  }
}
```

:::

## 💻 代码风格规范

### 基本编码规范

::: code-group

```typescript [✅ 推荐的代码风格]
// 使用 TypeScript 类型注解
const getUserList = async (
  params: UserListParams
): Promise<UserListResponse> => {
  try {
    const response = await getData('/users', { params })
    return response.data
  } catch (error) {
    console.error('获取用户列表失败:', error)
    throw error
  }
}

// 使用解构赋值
const { data, error } = await getUserList({ page: 1, pageSize: 10 })

// 使用模板字符串
const message = `用户 ${userName} 的操作已成功完成`

// 使用可选链操作符
const userEmail = user?.profile?.email ?? '未设置邮箱'

// 使用空值合并操作符
const displayName = user.nickname ?? user.name ?? '未知用户'
```

```typescript [❌ 避免的代码风格]
// 缺少类型注解
const getUserList = async params => {
  const response = await getData('/users/' + params.page)
  return response.data
}

// 使用字符串拼接
const message = '用户 ' + userName + ' 的操作已成功完成'

// 使用冗长的条件判断
const userEmail = user && user.profile && user.profile.email ? user.profile.email : '未设置邮箱'

// 使用 || 作为默认值（可能有问题）
const displayName = user.nickname || user.name || '未知用户' // 如果 nickname 是空字符串会被忽略
```

:::

### 函数定义规范

::: code-group

```typescript [✅ 好的示例]
/**
 * @description: 获取用户信息
 * @param userId 用户ID
 * @param options 可选配置
 * @returns 用户信息
 */
const getUserInfo = async (
  userId: string,
  options: GetUserOptions = {}
): Promise<UserInfo> => {
  const { includeProfile = false, includePermissions = false } = options

  try {
    const response = await getData(`/users/${userId}`, {
      params: { includeProfile, includePermissions },
    })
    return response.data
  } catch (error) {
    console.error('获取用户信息失败:', error)
    throw new Error(`获取用户 ${userId} 信息失败`)
  }
}

// 使用示例
const userInfo = await getUserInfo('123', {
  includeProfile: true,
  includePermissions: true,
})
```

```typescript [❌ 不好的示例]
// 缺少注释和类型注解
const getUserInfo = async (userId, options = {}) => {
  const { includeProfile = false } = options

  const response = await getData('/users/' + userId, {
    params: { includeProfile },
  })
  return response.data
}

// 错误处理不当
const getUserInfo = async (userId: string) => {
  try {
    const response = await getData(`/users/${userId}`)
    return response.data
  } catch (error) {
    // 吞掉错误，调用方无法知道是否出错
    return null
  }
}
```

:::

### 条件语句规范

::: code-group

```typescript [✅ 早期返回模式]
// 使用早期返回模式，减少嵌套
const renderUserStatus = (user: UserInfo) => {
  if (!user) return null
  if (user.loading) return <NSpin />
  if (user.error) return <NAlert type="error" message={user.error} />

  return <UserCard user={user} />
}

// 复杂条件的早期返回
const validateUser = (user: UserInfo): ValidationResult => {
  if (!user.id) {
    return { valid: false, message: '用户ID不能为空' }
  }
  
  if (!user.name || user.name.trim().length === 0) {
    return { valid: false, message: '用户名不能为空' }
  }
  
  if (!isValidEmail(user.email)) {
    return { valid: false, message: '邮箱格式不正确' }
  }
  
  return { valid: true }
}
```

```typescript [✅ 三元运算符用于简单条件]
// 简单条件使用三元运算符
const statusColor = user.active ? 'success' : 'error'
const buttonText = isLoading ? '加载中...' : '提交'
const className = isActive ? 'active' : 'inactive'

// 嵌套三元运算符（谨慎使用）
const getRoleColor = (role: string) => 
  role === 'admin' ? 'error' :
  role === 'manager' ? 'warning' :
  role === 'user' ? 'info' : 'default'
```

```typescript [✅ 对象映射用于多条件]
// 多条件使用对象映射
const statusText = {
  active: '在职',
  inactive: '离职',
  probation: '试用期',
  suspended: '停职'
}[user.status] || '未知'

// 复杂映射使用函数
const getStatusConfig = (status: string) => {
  const configMap = {
    active: { color: 'success', text: '在职', icon: 'mdi:check-circle' },
    inactive: { color: 'error', text: '离职', icon: 'mdi:close-circle' },
    probation: { color: 'warning', text: '试用期', icon: 'mdi:clock' },
    suspended: { color: 'default', text: '停职', icon: 'mdi:pause-circle' },
  }
  return configMap[status] || { color: 'default', text: '未知', icon: 'mdi:help-circle' }
}
```

```typescript [❌ 不推荐的条件语句]
// 深度嵌套的 if-else
const renderUserStatus = (user: UserInfo) => {
  if (user) {
    if (!user.loading) {
      if (!user.error) {
        return <UserCard user={user} />
      } else {
        return <NAlert type="error" message={user.error} />
      }
    } else {
      return <NSpin />
    }
  } else {
    return null
  }
}

// 过于复杂的条件判断
const getButtonText = () => {
  if (isLoading) {
    return '加载中...'
  } else {
    if (hasError) {
      return '重试'
    } else {
      if (isSubmitted) {
        return '已提交'
      } else {
        return '提交'
      }
    }
  }
}
```

:::

## 🧩 组件开发规范

### 组件结构模板

::: code-group

```vue [完整组件结构模板]
<!--
 * @Author: ChenYu ycyplus@gmail.com
 * @Date: 2025-XX-XX XX:XX:XX
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2025-XX-XX XX:XX:XX
 * @FilePath: \Robot_Admin\src\components\global\C_XXX\index.vue
 * @Description: 组件描述
 * Copyright (c) 2025 by CHENY, All Rights Reserved 😎.
-->

<template>
  <div class="c-xxx" :class="{ 'c-xxx--disabled': disabled }">
    <!-- 模板内容 -->
    <slot name="header">
      <div class="c-xxx__header">
        <h3 class="c-xxx__title">{{ title }}</h3>
      </div>
    </slot>
    
    <div class="c-xxx__content">
      <slot />
    </div>
    
    <slot name="footer">
      <div class="c-xxx__footer">
        <NSpace>
          <NButton @click="handleCancel">取消</NButton>
          <NButton type="primary" @click="handleConfirm">确认</NButton>
        </NSpace>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
  // 1. 导入语句
  import { ref, computed, onMounted, watch } from 'vue'
  import type { ComponentProps, ComponentEmits } from './types'

  // 2. Props 和 Emits 定义
  const props = withDefaults(defineProps<ComponentProps>(), {
    title: '默认标题',
    disabled: false,
    visible: true,
  })

  const emit = defineEmits<ComponentEmits>()

  // 3. 响应式状态
  const internalValue = ref(props.modelValue)
  const loading = ref(false)
  const error = ref<string>('')

  // 4. 计算属性
  const computedValue = computed(() => {
    // 计算逻辑
    return props.transform ? props.transform(internalValue.value) : internalValue.value
  })

  const isValid = computed(() => {
    return internalValue.value !== null && internalValue.value !== ''
  })

  // 5. 方法定义
  const handleChange = (value: any) => {
    internalValue.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }

  const handleConfirm = async () => {
    if (!isValid.value) {
      error.value = '请输入有效值'
      return
    }

    loading.value = true
    try {
      await props.onConfirm?.(computedValue.value)
      emit('confirm', computedValue.value)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '操作失败'
    } finally {
      loading.value = false
    }
  }

  const handleCancel = () => {
    emit('cancel')
  }

  // 6. 监听器
  watch(
    () => props.modelValue,
    (newValue) => {
      internalValue.value = newValue
    }
  )

  // 7. 生命周期
  onMounted(() => {
    // 初始化逻辑
    if (props.autoFocus) {
      // 自动聚焦逻辑
    }
  })

  // 8. 暴露给父组件的方法
  defineExpose({
    validate: () => isValid.value,
    getValue: () => computedValue.value,
    reset: () => {
      internalValue.value = props.defaultValue ?? null
      error.value = ''
    },
  })
</script>

<style lang="scss" scoped>
  .c-xxx {
    // 基础样式
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    background: var(--app-bg-card);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    // 状态样式
    &--disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    // 子元素样式
    &__header {
      margin-bottom: 16px;
    }

    &__title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--app-text-primary);
    }

    &__content {
      flex: 1;
      margin-bottom: 16px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
```

```typescript [types.ts - 类型定义]
// components/global/C_XXX/types.ts
export interface ComponentProps {
  /** 组件标题 */
  title?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可见 */
  visible?: boolean
  /** 绑定值 */
  modelValue?: any
  /** 默认值 */
  defaultValue?: any
  /** 是否自动聚焦 */
  autoFocus?: boolean
  /** 值转换函数 */
  transform?: (value: any) => any
  /** 确认回调 */
  onConfirm?: (value: any) => Promise<void> | void
}

export interface ComponentEmits {
  'update:modelValue': [value: any]
  change: [value: any]
  confirm: [value: any]
  cancel: []
}
```

:::

### Props 定义规范

::: code-group

```typescript [基础 Props 接口]
// 基础 Props 接口定义
interface ComponentProps {
  /** 必填属性 */
  requiredProp: string
  /** 可选属性 */
  optionalProp?: number
  /** 带默认值的属性 */
  propWithDefault?: boolean
  /** 复杂类型属性 */
  config?: {
    theme?: 'light' | 'dark'
    size?: 'small' | 'medium' | 'large'
    showHeader?: boolean
  }
  /** 函数类型属性 */
  onChange?: (value: string) => void
  /** 数组类型属性 */
  items?: Array<{ label: string; value: any }>
}

// 使用 withDefaults 设置默认值
const props = withDefaults(defineProps<ComponentProps>(), {
  optionalProp: 0,
  propWithDefault: true,
  config: () => ({
    theme: 'light',
    size: 'medium',
    showHeader: true,
  }),
  items: () => [],
})
```

```typescript [高级 Props 定义]
// 使用 PropType 定义复杂类型
import type { PropType } from 'vue'

interface ComponentProps {
  // 使用 PropType 定义对象数组
  users: Array<{
    id: string
    name: string
    email: string
    avatar?: string
  }>
  
  // 使用 PropType 定义函数类型
  validator: PropType<(value: any) => boolean | string>
  
  // 使用 PropType 定义枚举类型
  status: PropType<'pending' | 'success' | 'error' | 'warning'>
  
  // 使用 PropType 定义复杂对象
  options: PropType<{
    label: string
    value: any
    disabled?: boolean
    children?: Array<any>
  }[]>
}

// 使用示例
const props = defineProps<ComponentProps>()
```

```typescript [Props 验证]
// 使用验证器进行 Props 验证
const props = defineProps({
  // 基础类型验证
  basicProp: String,
  
  // 多种类型验证
  multiTypeProp: [String, Number],
  
  // 必填验证
  requiredProp: {
    type: String,
    required: true,
  },
  
  // 默认值验证
  propWithDefault: {
    type: Boolean,
    default: false,
  },
  
  // 自定义验证器
  customValidator: {
    type: String,
    validator: (value: string) => {
      return ['success', 'warning', 'error'].includes(value)
    },
  },
  
  // 对象类型验证
  objectProp: {
    type: Object,
    default: () => ({}),
    // 对象或数组默认值必须从一个工厂函数获取
  },
  
  // 函数类型验证
  functionProp: {
    type: Function,
    default: () => {},
  },
})
```

:::

### 组件通信规范

::: code-group

```typescript [父子组件通信 - Props + Emits]
// 父组件
<template>
  <ChildComponent
    v-model:value="inputValue"
    :options="options"
    :disabled="loading"
    @change="handleChange"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ChildComponent from './ChildComponent.vue'

  const inputValue = ref('')
  const loading = ref(false)
  const options = ref([
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
  ])

  const handleChange = (value: string) => {
    console.log('值变化:', value)
  }

  const handleConfirm = (value: string) => {
    console.log('确认提交:', value)
  }
</script>

// 子组件
<script setup lang="ts">
  interface Props {
    value: string
    options: Array<{ label: string; value: any }>
    disabled?: boolean
  }

  interface Emits {
    'update:value': [value: string]
    change: [value: string]
    confirm: [value: string]
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
  })

  const emit = defineEmits<Emits>()

  const handleChange = (value: string) => {
    emit('update:value', value)
    emit('change', value)
  }

  const handleConfirm = () => {
    emit('confirm', props.value)
  }
</script>
```

```typescript [依赖注入 - Provide/Inject]
// 父组件 - 提供数据
<script setup lang="ts">
  import { provide, ref } from 'vue'

  // 定义注入键
  const userContextKey = Symbol('user-context')

  // 提供响应式数据
  const currentUser = ref({
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  })

  // 提供方法
  const updateUser = (userData: Partial<User>) => {
    currentUser.value = { ...currentUser.value, ...userData }
  }

  // 提供给子组件
  provide(userContextKey, {
    user: currentUser,
    updateUser,
    isAdmin: computed(() => currentUser.value.role === 'admin'),
  })
</script>

// 子组件 - 注入数据
<script setup lang="ts">
  import { inject } from 'vue'

  // 注入数据
  const userContext = inject(userContextKey)

  // 检查是否成功注入
  if (!userContext) {
    throw new Error('UserContext not provided')
  }

  // 使用注入的数据和方法
  const { user, updateUser, isAdmin } = userContext

  const handleNameChange = () => {
    updateUser({ name: 'New Name' })
  }
</script>
```

```typescript [事件总线 - Mitt]
// utils/eventBus.ts
import mitt from 'mitt'

type Events = {
  'user:login': { userId: string; timestamp: number }
  'user:logout': { userId: string }
  'notification:show': { message: string; type: 'success' | 'error' | 'warning' }
}

export const eventBus = mitt<Events>()

// 组件 A - 发送事件
<script setup lang="ts">
  import { eventBus } from '@/utils/eventBus'

  const handleLogin = (userId: string) => {
    eventBus.emit('user:login', { userId, timestamp: Date.now() })
  }

  const showNotification = (message: string) => {
    eventBus.emit('notification:show', { message, type: 'success' })
  }
</script>

// 组件 B - 监听事件
<script setup lang="ts">
  import { onUnmounted } from 'vue'
  import { eventBus } from '@/utils/eventBus'

  const handleUserLogin = (data: { userId: string; timestamp: number }) => {
    console.log(`用户 ${data.userId} 在 ${data.timestamp} 登录`)
  }

  const handleNotification = (data: { message: string; type: string }) => {
    window.$message?.[data.type](data.message)
  }

  // 监听事件
  eventBus.on('user:login', handleUserLogin)
  eventBus.on('notification:show', handleNotification)

  // 组件卸载时移除监听
  onUnmounted(() => {
    eventBus.off('user:login', handleUserLogin)
    eventBus.off('notification:show', handleNotification)
  })
</script>
```

```typescript [组件引用 - Ref]
// 父组件
<template>
  <ChildComponent ref="childRef" />
  <NButton @click="handleCallChildMethod">调用子组件方法</NButton>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ChildComponent from './ChildComponent.vue'

  // 获取子组件引用
  const childRef = ref<InstanceType<typeof ChildComponent>>()

  const handleCallChildMethod = () => {
    if (childRef.value) {
      // 调用子组件暴露的方法
      childRef.value.validate()
      childRef.value.reset()
      
      // 访问子组件暴露的数据
      console.log('子组件数据:', childRef.value.getData())
    }
  }
</script>

// 子组件
<script setup lang="ts">
  import { ref } from 'vue'

  const formData = ref({
    name: '',
    email: '',
  })

  // 暴露方法和数据给父组件
  defineExpose({
    validate: () => {
      return formData.value.name !== '' && formData.value.email !== ''
    },
    reset: () => {
      formData.value = { name: '', email: '' }
    },
    getData: () => formData.value,
  })
</script>
```

:::

## 🎨 样式开发规范

### SCSS 文件结构

::: code-group

```scss [完整 SCSS 文件结构]
/*
 * @Author: ChenYu ycyplus@gmail.com
 * @Date: 2025-XX-XX XX:XX:XX
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2025-XX-XX XX:XX:XX
 * @FilePath: \Robot_Admin\src\views\xxx\index.scss
 * @Description: 样式描述
 * Copyright (c) 2025 by CHENY, All Rights Reserved 😎.
 */

// 1. 变量定义
$primary-color: #2080f0;
$success-color: #18a058;
$warning-color: #f0a020;
$error-color: #d03050;
$info-color: #0ea5e9;

// 间距变量
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// 字体大小变量
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-md: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;

// 圆角变量
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
$border-radius-xl: 16px;

// 阴影变量
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);

// 过渡变量
$transition-fast: 0.15s ease;
$transition-normal: 0.3s ease;
$transition-slow: 0.5s ease;

// 2. 混合器定义
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin text-ellipsis-multi($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@mixin button-variant($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: 1px solid $bg-color;

  &:hover {
    background-color: lighten($bg-color, 10%);
    border-color: lighten($bg-color, 10%);
  }

  &:active {
    background-color: darken($bg-color, 5%);
    border-color: darken($bg-color, 5%);
  }

  &.is-disabled {
    background-color: lighten($bg-color, 30%);
    border-color: lighten($bg-color, 30%);
    cursor: not-allowed;
  }
}

// 3. 样式定义
.component-name {
  // 基础样式
  position: relative;
  padding: $spacing-md;
  background-color: white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  transition: all $transition-normal;

  // 伪元素和伪类
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1));
    border-radius: inherit;
    opacity: 0;
    transition: opacity $transition-normal;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-lg;

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: $shadow-md;
  }

  // 修饰符
  &--active {
    background-color: $primary-color;
    color: white;
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  &--loading {
    pointer-events: none;
  }

  // 状态类
  &.is-success {
    background-color: $success-color;
    color: white;
  }

  &.is-warning {
    background-color: $warning-color;
    color: white;
  }

  &.is-error {
    background-color: $error-color;
    color: white;
  }

  // 子元素
  &__header {
    @include flex-between;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid #f0f0f0;

    &--compact {
      margin-bottom: $spacing-sm;
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  &__content {
    margin-bottom: $spacing-md;

    &--compact {
      margin-bottom: $spacing-sm;
    }
  }

  &__footer {
    @include flex-center;
    gap: $spacing-sm;

    &--right {
      justify-content: flex-end;
    }

    &--left {
      justify-content: flex-start;
    }
  }

  &__action {
    padding: $spacing-sm $spacing-md;
    border-radius: $border-radius-sm;
    cursor: pointer;
    transition: all $transition-fast;

    &:hover {
      background-color: #f5f5f5;
    }

    &--primary {
      @include button-variant($primary-color);
    }

    &--success {
      @include button-variant($success-color);
    }

    &--warning {
      @include button-variant($warning-color);
    }

    &--error {
      @include button-variant($error-color);
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    padding: $spacing-sm;
    border-radius: $border-radius-sm;

    &__header {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-xs;
    }

    &__footer {
      flex-direction: column;
      gap: $spacing-xs;
    }
  }
}
```

:::

### UnoCSS 配置规范

::: code-group

```typescript [unocss.config.ts - 完整配置]
// unocss.config.ts
import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { shortcutsArr } from './src/utils/unocss/shortcuts-arr'
import { iconSafelist } from './src/utils/unocss/icon-safelist'

export default defineConfig({
  // 预设配置
  presets: [
    presetWind3(), // Wind CSS 预设
    presetAttributify(), // 属性化模式
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],

  // 转换器
  transformers: [transformerDirectives()],

  // 快捷方式
  shortcuts: shortcutsArr,

  // 安全列表（确保图标类不被清除）
  safelist: iconSafelist,

  // 主题配置
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      // ... 更多颜色
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
  },

  // 规则配置
  rules: [
    // 自定义规则
    [/^text-shadow-(.+)$/, ([, c]) => ({ 'text-shadow': `0 0 10px ${c}` })],
    [/^border-(.+)-(.+)$/, ([, c, s]) => ({ border: `${s}px solid ${c}` })],
  ],

  // 变量配置
  variables: {
    dark: {
      '--app-bg-primary': '#1a1a1a',
      '--app-bg-secondary': '#2a2a2a',
      '--app-text-primary': '#ffffff',
      '--app-text-secondary': '#a0a0a0',
    },
    light: {
      '--app-bg-primary': '#ffffff',
      '--app-bg-secondary': '#f5f5f5',
      '--app-text-primary': '#333333',
      '--app-text-secondary': '#666666',
    },
  },

  // 排除配置
  exclude: [
    'node_modules/**',
    '.git/**',
    '.vscode/**',
    'dist/**',
  ],

  // 包含配置
  include: [
    'src/**/*.{vue,js,ts,jsx,tsx}',
    'components/**/*.{vue,js,ts,jsx,tsx}',
  ],
})
```

```typescript [shortcuts-arr.ts - 快捷方式配置]
// src/utils/unocss/shortcuts-arr.ts
export const shortcutsArr = [
  // 布局相关
  ['flex-center', 'flex items-center justify-center'],
  ['flex-between', 'flex items-center justify-between'],
  ['flex-start', 'flex items-center justify-start'],
  ['flex-end', 'flex items-center justify-end'],
  ['flex-col-center', 'flex flex-col items-center justify-center'],

  // 卡片样式
  ['card', 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-4'],
  ['card-hover', 'card hover:shadow-lg transition-shadow duration-300'],

  // 按钮样式
  ['btn', 'px-4 py-2 rounded-md cursor-pointer transition-colors duration-200'],
  ['btn-primary', 'btn bg-primary-500 text-white hover:bg-primary-600'],
  ['btn-success', 'btn bg-green-500 text-white hover:bg-green-600'],
  ['btn-warning', 'btn bg-yellow-500 text-white hover:bg-yellow-600'],
  ['btn-error', 'btn bg-red-500 text-white hover:bg-red-600'],

  // 文本样式
  ['text-ellipsis', 'truncate'],
  ['text-ellipsis-2', 'line-clamp-2'],
  ['text-ellipsis-3', 'line-clamp-3'],

  // 间距样式
  ['section-spacing', 'py-8'],
  ['content-spacing', 'py-4'],
  ['item-spacing', 'my-2'],

  // 状态样式
  ['loading', 'opacity-50 pointer-events-none'],
  ['disabled', 'opacity-60 cursor-not-allowed pointer-events-none'],
  ['active', 'bg-primary-100 dark:bg-primary-900'],

  // 表单样式
  ['form-group', 'mb-4'],
  ['form-label', 'block text-sm font-medium mb-2'],
  ['form-input', 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500'],
  ['form-error', 'text-red-500 text-sm mt-1'],
]
```

```typescript [icon-safelist.ts - 图标安全列表]
// src/utils/unocss/icon-safelist.ts
export const iconSafelist = [
  // Material Design Icons
  'i-mdi:home',
  'i-mdi:account',
  'i-mdi:settings',
  'i-mdi:menu',
  'i-mdi:close',
  'i-mdi:check',
  'i-mdi:alert',
  'i-mdi:information',
  'i-mdi:delete',
  'i-mdi:edit',
  'i-mdi:plus',
  'i-mdi:minus',
  'i-mdi:chevron-left',
  'i-mdi:chevron-right',
  'i-mdi:chevron-up',
  'i-mdi:chevron-down',

  // Carbon Icons
  'i-carbon:user',
  'i-carbon:search',
  'i-carbon:download',
  'i-carbon:upload',
  'i-carbon:calendar',
  'i-carbon:time',
  'i-carbon:location',
  'i-carbon:phone',
  'i-carbon:email',

  // Tabler Icons
  'i-tabler:dashboard',
  'i-tabler:users',
  'i-tabler:file-text',
  'i-tabler:chart-bar',
  'i-tabler:database',
  'i-tabler:server',
  'i-tabler:cloud',
  'i-tabler:shield',
  'i-tabler:key',
  'i-tabler:lock',
  'i-tabler:unlock',
  'i-tabler:eye',
  'i-tabler:eye-off',
]
```

:::

### 主题系统规范

::: code-group

```scss [theme-variables.scss - 主题变量]
// src/styles/theme-variables.scss
:root,
[data-theme='light'] {
  // 主色调
  --app-primary: #2080f0;
  --app-primary-hover: #4098fc;
  --app-primary-active: #1060c9;
  --app-primary-disabled: #a0cfff;

  // 功能色
  --app-success: #18a058;
  --app-warning: #f0a020;
  --app-error: #d03050;
  --app-info: #0ea5e9;

  // 背景色
  --app-bg-body: #ffffff;
  --app-bg-card: #ffffff;
  --app-bg-overlay: rgba(0, 0, 0, 0.45);
  --app-bg-hover: #f5f5f5;
  --app-bg-active: #e8e8e8;

  // 文本色
  --app-text-primary: #000000;
  --app-text-secondary: #666666;
  --app-text-tertiary: #999999;
  --app-text-quaternary: #cccccc;
  --app-text-disabled: #bfbfbf;

  // 边框色
  --app-border-color: #d9d9d9;
  --app-border-color-split: #f0f0f0;

  // 阴影
  --app-shadow-small: 0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
  --app-shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --app-shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  // 过渡
  --app-transition-fast: 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  --app-transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --app-transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  // 圆角
  --app-border-radius-small: 2px;
  --app-border-radius-base: 6px;
  --app-border-radius-medium: 8px;
  --app-border-radius-large: 12px;

  // 间距
  --app-spacing-xs: 4px;
  --app-spacing-sm: 8px;
  --app-spacing-md: 16px;
  --app-spacing-lg: 24px;
  --app-spacing-xl: 32px;
  --app-spacing-xxl: 48px;
}

[data-theme='dark'] {
  // 主色调
  --app-primary: #2080f0;
  --app-primary-hover: #4098fc;
  --app-primary-active: #1060c9;
  --app-primary-disabled: #a0cfff;

  // 功能色
  --app-success: #18a058;
  --app-warning: #f0a020;
  --app-error: #d03050;
  --app-info: #0ea5e9;

  // 背景色
  --app-bg-body: #101014;
  --app-bg-card: #18181c;
  --app-bg-overlay: rgba(255, 255, 255, 0.15);
  --app-bg-hover: #303034;
  --app-bg-active: #404044;

  // 文本色
  --app-text-primary: #ffffff;
  --app-text-secondary: #a3a3ad;
  --app-text-tertiary: #6b6b76;
  --app-text-quaternary: #4a4a52;
  --app-text-disabled: #303034;

  // 边框色
  --app-border-color: #303034;
  --app-border-color-split: #242428;

  // 阴影
  --app-shadow-small: 0 1px 2px rgba(0, 0, 0, 0.15), 0 1px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08);
  --app-shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.15);
  --app-shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.15);
}
```

```typescript [theme.ts - 主题切换逻辑]
// src/config/theme.ts
import type { GlobalTheme } from 'naive-ui'

export type ThemeMode = 'light' | 'dark' | 'auto'

export const getTheme = (mode: ThemeMode): GlobalTheme => {
  if (mode === 'dark') {
    return {
      name: 'dark',
      common: {
        primaryColor: '#2080f0',
        primaryColorHover: '#4098fc',
        primaryColorPressed: '#1060c9',
        primaryColorSuppl: '#4098fc',
      },
      Card: {
        color: '#18181c',
        colorModal: '#18181c',
        colorPopover: '#18181c',
        colorTarget: 'rgba(255, 255, 255, 0.05)',
      },
      Button: {
        textColor: '#ffffff',
      },
      // ... 更多组件配置
    }
  }

  return {
    name: 'light',
    common: {
      primaryColor: '#2080f0',
      primaryColorHover: '#4098fc',
      primaryColorPressed: '#1060c9',
      primaryColorSuppl: '#4098fc',
    },
    // ... 默认配置
  }
}

export const applyTheme = (mode: ThemeMode) => {
  const root = document.documentElement
  
  if (mode === 'auto') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const isDark = mediaQuery.matches
    root.setAttribute('data-theme', isDark ? 'dark' : 'light')
  } else {
    root.setAttribute('data-theme', mode)
  }
}

// 监听系统主题变化
export const watchSystemTheme = (callback: (isDark: boolean) => void) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches)
  }
  
  mediaQuery.addEventListener('change', handleChange)
  
  return () => {
    mediaQuery.removeEventListener('change', handleChange)
  }
}
```

```scss [使用主题变量]
// 组件中使用主题变量
.component {
  background-color: var(--app-bg-card);
  color: var(--app-text-primary);
  border: 1px solid var(--app-border-color);
  border-radius: var(--app-border-radius-base);
  box-shadow: var(--app-shadow-medium);
  transition: all var(--app-transition-base);

  &:hover {
    background-color: var(--app-bg-hover);
    box-shadow: var(--app-shadow-large);
  }

  &:active {
    background-color: var(--app-bg-active);
  }

  &--primary {
    background-color: var(--app-primary);
    color: white;

    &:hover {
      background-color: var(--app-primary-hover);
    }

    &:active {
      background-color: var(--app-primary-active);
    }
  }

  &--success {
    background-color: var(--app-success);
    color: white;
  }

  &--warning {
    background-color: var(--app-warning);
    color: white;
  }

  &--error {
    background-color: var(--app-error);
    color: white;
  }

  &--disabled {
    background-color: var(--app-bg-disabled);
    color: var(--app-text-disabled);
    cursor: not-allowed;
  }

  .component__title {
    color: var(--app-text-primary);
    font-size: var(--app-font-size-lg);
    margin-bottom: var(--app-spacing-sm);
  }

  .component__description {
    color: var(--app-text-secondary);
    font-size: var(--app-font-size-sm);
    line-height: 1.5;
  }

  .component__action {
    margin-top: var(--app-spacing-md);
    padding: var(--app-spacing-sm) var(--app-spacing-md);
    border-radius: var(--app-border-radius-small);
    transition: all var(--app-transition-fast);
  }
}
```

:::

## 📘 TypeScript 规范

### 类型定义规范

::: code-group

```typescript [基础类型定义]
// 基础类型定义
interface UserInfo {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt?: Date
}

// 泛型类型
interface ApiResponse<T> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp: number
}

// 联合类型
type ThemeMode = 'light' | 'dark' | 'auto'
type UserRole = 'admin' | 'manager' | 'user' | 'guest'
type RequestStatus = 'pending' | 'loading' | 'success' | 'error'

// 交叉类型
type UserWithPermissions = UserInfo & {
  permissions: string[]
  lastLoginAt: Date
}

// 工具类型
type PartialUserInfo = Partial<UserInfo>
type UserWithoutId = Omit<UserInfo, 'id'>
type UserKeys = keyof UserInfo
type UserValues = UserInfo[keyof UserInfo]
type UserRequired = Required<Pick<UserInfo, 'name' | 'email'>>

// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T
type IsString<T> = T extends string ? true : false
type ArrayElement<T> = T extends (infer U)[] ? U : never

// 映射类型
type ReadonlyUser = {
  readonly [K in keyof UserInfo]: UserInfo[K]
}

type OptionalUser = {
  [K in keyof UserInfo]?: UserInfo[K]
}

type UserGetters = {
  [K in keyof UserInfo as `get${Capitalize<string & K>}`]: () => UserInfo[K]
}
```

```typescript [高级类型定义]
// 条件类型的高级用法
type Flatten<T> = T extends Array<infer U> ? U : T

type UnpackPromise<T> = T extends Promise<infer U> ? U : T

// 函数类型
type EventHandler<T = any> = (event: T) => void
type AsyncEventHandler<T = any> = (event: T) => Promise<void>

type Validator<T> = (value: T) => boolean | string
type AsyncValidator<T> = (value: T) => Promise<boolean | string>

// 配置类型
interface ConfigOptions {
  api: {
    baseURL: string
    timeout: number
    retry: number
  }
  theme: {
    mode: ThemeMode
    primaryColor: string
  }
  features: {
    enableNotifications: boolean
    enableAnalytics: boolean
    enableDarkMode: boolean
  }
}

// 动态键类型
type DynamicKeys<T extends string> = {
  [K in T]: K
}

type UserActions = DynamicKeys<'create' | 'update' | 'delete' | 'view'>

// 递归类型
interface TreeNode<T = any> {
  id: string
  label: string
  data?: T
  children?: TreeNode<T>[]
  parent?: TreeNode<T>
}

// 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// 深度可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
```

```typescript [类型定义最佳实践]
// 使用 const 断言
const ROLES = ['admin', 'manager', 'user', 'guest'] as const
type Role = typeof ROLES[number]

const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

type HttpStatusCode = typeof HTTP_STATUS_CODES[keyof typeof HTTP_STATUS_CODES]

// 使用品牌类型
type Brand<T, B> = T & { __brand: B }

type UserId = Brand<string, 'UserId'>
type Email = Brand<string, 'Email'>

const createUserId = (id: string): UserId => id as UserId
const createEmail = (email: string): Email => email as Email

// 使用模板字面量类型
type EventName<T extends string> = `on${Capitalize<T>}`
type UserEventName = EventName<'login' | 'logout' | 'register'>

// 使用 infer 提取类型
type FirstParameter<T> = T extends (first: infer U, ...args: any[]) => any ? U : never
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never

// 使用条件类型进行类型守卫
type IsArray<T> = T extends any[] ? true : false
type IsFunction<T> = T extends Function ? true : false
```

:::

### 类型守卫规范

::: code-group

```typescript [类型谓词]
// 基础类型守卫
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

// 复杂类型守卫
function isUserInfo(obj: unknown): obj is UserInfo {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as any).id === 'string' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).email === 'string'
  )
}

function isApiResponse(obj: unknown): obj is ApiResponse<any> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'code' in obj &&
    'message' in obj &&
    'data' in obj &&
    'success' in obj &&
    typeof (obj as any).code === 'number' &&
    typeof (obj as any).message === 'string' &&
    typeof (obj as any).success === 'boolean'
  )
}

// 联合类型守卫
function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'auto'
}

function isUserRole(value: unknown): value is UserRole {
  return ['admin', 'manager', 'user', 'guest'].includes(value as string)
}

// 泛型类型守卫
function hasProperty<T extends string>(obj: unknown, prop: T): obj is Record<T, unknown> {
  return typeof obj === 'object' && obj !== null && prop in obj
}

function hasProperties<T extends Record<string, unknown>>(
  obj: unknown,
  props: (keyof T)[]
): obj is T {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    props.every(prop => prop in obj)
  )
}
```

```typescript [类型守卫使用示例]
// 使用示例
const processValue = (value: unknown) => {
  if (isString(value)) {
    // value 被推断为 string
    return value.toUpperCase()
  }

  if (isNumber(value)) {
    // value 被推断为 number
    return value.toFixed(2)
  }

  if (isUserInfo(value)) {
    // value 被推断为 UserInfo
    return `${value.name} (${value.email})`
  }

  if (isApiResponse(value)) {
    // value 被推断为 ApiResponse<any>
    return value.success ? value.data : value.message
  }

  return '未知类型'
}

// 处理 API 响应
const handleApiResponse = (response: unknown) => {
  if (!isApiResponse(response)) {
    throw new Error('无效的 API 响应格式')
  }

  if (!response.success) {
    throw new Error(response.message)
  }

  return response.data
}

// 处理表单数据
const validateFormData = (data: unknown): UserInfo => {
  if (!isUserInfo(data)) {
    throw new Error('无效的用户数据格式')
  }

  if (!data.email.includes('@')) {
    throw new Error('邮箱格式不正确')
  }

  return data
}

// 处理配置对象
const validateConfig = (config: unknown): ConfigOptions => {
  if (!isObject(config)) {
    throw new Error('配置必须是一个对象')
  }

  if (!hasProperty(config, 'api') || !isObject(config.api)) {
    throw new Error('API 配置缺失或格式错误')
  }

  if (!hasProperty(config, 'theme') || !isObject(config.theme)) {
    throw new Error('主题配置缺失或格式错误')
  }

  return config as ConfigOptions
}
```

```typescript [类型断言和类型转换]
// 类型断言
const getUserInfo = (user: unknown): UserInfo => {
  if (!isUserInfo(user)) {
    throw new Error('无效的用户信息')
  }
  
  return user // 类型守卫后，TypeScript 知道这是 UserInfo
}

// 类型转换函数
const asString = (value: unknown): string => {
  if (isString(value)) return value
  if (isNumber(value)) return value.toString()
  if (isBoolean(value)) return value.toString()
  if (value === null || value === undefined) return ''
  return String(value)
}

const asNumber = (value: unknown): number => {
  if (isNumber(value)) return value
  if (isString(value)) {
    const parsed = parseFloat(value)
    if (!isNaN(parsed)) return parsed
  }
  return 0
}

const asBoolean = (value: unknown): boolean => {
  if (isBoolean(value)) return value
  if (isString(value)) {
    return value.toLowerCase() === 'true' || value === '1'
  }
  if (isNumber(value)) {
    return value !== 0
  }
  return Boolean(value)
}

// 安全的类型转换
const safeCast = <T>(value: unknown, validator: (v: unknown) => v is T): T | null => {
  return validator(value) ? value : null
}

// 使用示例
const user = safeCast(data, isUserInfo)
const response = safeCast(data, isApiResponse)
const themeMode = safeCast(data, isThemeMode)
```

:::

### 组件类型规范

::: code-group

```typescript [组件 Props 类型]
// 基础 Props 类型
interface ComponentProps {
  modelValue: string
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  placeholder?: string
  maxlength?: number
  showCount?: boolean
  clearable?: boolean
  readonly?: boolean
  autofocus?: boolean
}

// 复杂 Props 类型
interface FormProps<T = Record<string, any>> {
  modelValue: T
  rules?: Record<keyof T, FieldRule[]>
  labelWidth?: number | string
  labelPosition?: 'left' | 'right' | 'top'
  labelAlign?: 'left' | 'right'
  inline?: boolean
  inlineMessage?: boolean
  showMessage?: boolean
  disabled?: boolean
  validateOnChange?: boolean
  validateOnBlur?: boolean
  requireMarkPlacement?: 'left' | 'right' | 'hide'
  showRequireMark?: boolean
  size?: 'small' | 'medium' | 'large'
  colon?: boolean
}

// 泛型 Props 类型
interface TableProps<T = Record<string, any>> {
  data: T[]
  columns: TableColumn[]
  loading?: boolean
  pagination?: PaginationConfig | false
  scrollX?: number | string
  scrollY?: number | string
  maxHeight?: number | string
  minHeight?: number | string
  bordered?: boolean
  striped?: boolean
  singleLine?: boolean
  singleColumn?: boolean
  size?: 'small' | 'medium' | 'large'
  rowKey?: (row: T) => string | number
  rowClassName?: (row: T, index: number) => string
  rowProps?: (row: T, index: number) => Record<string, any>
  summary?: (pageData: T[]) => any[]
  virtualScroll?: boolean
  cascade?: boolean
  childrenKey?: string
  indent?: number
  expandedRowKeys?: Array<string | number>
  defaultExpandedRowKeys?: Array<string | number>
  renderExpand?: (row: T, index: number) => VNode
  expandable?: boolean
}
```

```typescript [组件 Emits 类型]
// 基础 Emits 类型
interface ComponentEmits {
  'update:modelValue': [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [value: string]
  clear: []
  click: [event: MouseEvent]
}

// 复杂 Emits 类型
interface FormEmits<T = Record<string, any>> {
  'update:modelValue': [value: T]
  change: [value: T, oldValue: T]
  submit: [value: T]
  reset: []
  validate: [errors: Record<string, string[]> | null]
  validateError: [errors: Record<string, string[]>]
  validateSuccess: []
}

// 泛型 Emits 类型
interface TableEmits<T = Record<string, any>> {
  'update:checkedRowKeys': [keys: Array<string | number>]
  'update:expandedRowKeys': [keys: Array<string | number>]
  'sort': [sorter: { columnKey: string; order: 'ascend' | 'descend' | null }]
  'filter': [filters: Record<string, Array<string | number>>]
  'page-change': [page: number]
  'page-size-change': [pageSize: number]
  'row-click': [row: T, index: number]
  'row-dblclick': [row: T, index: number]
  'row-contextmenu': [row: T, index: number, event: MouseEvent]
  'row-mouseenter': [row: T, index: number]
  'row-mouseleave': [row: T, index: number]
  'select': [row: T, checked: boolean]
  'select-all': [checked: boolean]
  'expand': [row: T, expanded: boolean]
}
```

```typescript [组件实例类型]
// 基础组件实例类型
interface ComponentInstance {
  validate: () => Promise<boolean>
  reset: () => void
  getValue: () => string
  setValue: (value: string) => void
  focus: () => void
  blur: () => void
  select: () => void
  clear: () => void
}

// 复杂组件实例类型
interface FormInstance<T = Record<string, any>> {
  validate: (validateCallback?: (errors: Record<string, string[]> | null) => void) => Promise<boolean>
  validateField: (key: keyof T, callback?: (error: string | null) => void) => Promise<boolean>
  restoreValidation: () => void
  resetFields: () => void
  getFieldValue: (key: keyof T) => any
  setFieldValue: (key: keyof T, value: any) => void
  getFieldsValue: () => T
  setFieldsValue: (values: Partial<T>) => void
  clearValidate: (keys?: Array<keyof T>) => void
}

// 泛型组件实例类型
interface TableInstance<T = Record<string, any>> {
  filter: (filters: Record<string, Array<string | number>>) => void
  filter: (filters: Record<string, Array<string | number>>) => void
  sort: (sorter: { columnKey: string; order: 'ascend' | 'descend' | null }) => void
  page: (page: number) => void
  pageSize: (pageSize: number) => void
  expandAll: () => void
  collapseAll: () => void
  expandRow: (key: string | number) => void
  collapseRow: (key: string | number) => void
  scrollTo: (options: { left?: number; top?: number; index?: number; key?: string | number }) => void
  clearSorter: () => void
  clearFilter: () => void
  clearSelection: () => void
  selectAll: () => void
  unselectAll: () => void
}
```

```typescript [组件类型使用示例]
// 使用组件类型
const props = withDefaults(defineProps<ComponentProps>(), {
  disabled: false,
  size: 'medium',
  placeholder: '请输入',
  clearable: true,
})

const emit = defineEmits<ComponentEmits>()

// 暴露组件实例
defineExpose<ComponentInstance>({
  validate: async () => {
    // 验证逻辑
    return true
  },
  reset: () => {
    // 重置逻辑
  },
  getValue: () => props.modelValue,
  setValue: (value: string) => {
    emit('update:modelValue', value)
  },
  focus: () => {
    // 聚焦逻辑
  },
  blur: () => {
    // 失焦逻辑
  },
  select: () => {
    // 选择逻辑
  },
  clear: () => {
    emit('update:modelValue', '')
    emit('clear')
  },
})

// 在父组件中使用
const componentRef = ref<InstanceType<typeof Component>>()

const handleValidate = async () => {
  if (componentRef.value) {
    const isValid = await componentRef.value.validate()
    if (isValid) {
      console.log('验证通过')
    }
  }
}
```

:::

## 🔧 工具函数与 Hooks

### 组合式函数规范

::: code-group

```typescript [useStorage - 本地存储 Hook]
// hooks/useStorage/index.ts
import { ref, watch } from 'vue'

export const setItem = <T extends string | number | boolean | object | null>(
  key: string,
  value: T
): void => {
  const storageValue = isSerializable(value)
    ? JSON.stringify(value)
    : value instanceof Date
      ? value.toISOString()
      : String(value)

  window.localStorage.setItem(key, storageValue)
}

export const getItem = <T = unknown>(key: string): T | null => {
  const data = window.localStorage.getItem(key)
  if (data === null) return null

  try {
    return JSON.parse(data) as T
  } catch {
    return data as T
  }
}

export const removeItem = (key: string): void => {
  window.localStorage.removeItem(key)
}

export const clear = (): void => {
  window.localStorage.clear()
}

export const useStorage = <T>(
  key: string,
  defaultValue: T,
  storage: 'localStorage' | 'sessionStorage' = 'localStorage'
) => {
  const storageObject = storage === 'localStorage' ? window.localStorage : window.sessionStorage

  const getValue = (): T => {
    try {
      const item = storageObject.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const value = ref<T>(getValue())

  const setValue = (newValue: T): void => {
    try {
      storageObject.setItem(key, JSON.stringify(newValue))
      value.value = newValue
    } catch (error) {
      console.error(`Failed to save ${key} to ${storage}:`, error)
    }
  }

  const removeValue = (): void => {
    storageObject.removeItem(key)
    value.value = defaultValue
  }

  // 监听值变化，自动保存
  watch(
    value,
    (newValue) => {
      try {
        storageObject.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error(`Failed to save ${key} to ${storage}:`, error)
      }
    },
    { deep: true }
  )

  return {
    value,
    setValue,
    removeValue,
  }
}

// 辅助函数
function isSerializable(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return true
  if (value instanceof Date) return true
  if (Array.isArray(value)) return value.every(isSerializable)
  if (typeof value === 'object') {
    return Object.values(value).every(isSerializable)
  }
  return false
}
```

```typescript [useTableData - 表格数据 Hook]
// hooks/useTableData/index.ts
import { ref, reactive, computed } from 'vue'

interface TableDataOptions {
  immediate?: boolean
  pageSize?: number
}

export const useTableData = <T = any>(
  fetchFn: (params: any) => Promise<{ data: T[]; total: number }>,
  options: TableDataOptions = {}
) => {
  const { immediate = true, pageSize = 10 } = options

  // 响应式状态
  const loading = ref(false)
  const error = ref<string | null>(null)
  const tableData = ref<T[]>([])
  const total = ref(0)
  const pagination = reactive({
    page: 1,
    pageSize,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50, 100],
    showQuickJumper: true,
  })

  // 查询参数
  const queryParams = reactive({
    keyword: '',
    status: '',
    dateRange: null as [string, string] | null,
  })

  // 排序参数
  const sortParams = reactive({
    columnKey: '',
    order: null as 'ascend' | 'descend' | null,
  })

  // 筛选参数
  const filterParams = reactive<Record<string, any>>({})

  // 计算属性
  const hasData = computed(() => tableData.value.length > 0)
  const isEmpty = computed(() => !loading.value && !hasData.value)

  // 获取数据
  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const params = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...queryParams,
        ...sortParams,
        ...filterParams,
      }

      const response = await fetchFn(params)
      
      tableData.value = response.data || []
      total.value = response.total || 0
      pagination.itemCount = total.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取数据失败'
      tableData.value = []
      total.value = 0
      pagination.itemCount = 0
    } finally {
      loading.value = false
    }
  }

  // 刷新数据
  const refresh = () => {
    pagination.page = 1
    fetchData()
  }

  // 重置查询
  const resetQuery = () => {
    Object.assign(queryParams, {
      keyword: '',
      status: '',
      dateRange: null,
    })
    Object.assign(sortParams, {
      columnKey: '',
      order: null,
    })
    Object.keys(filterParams).forEach(key => delete filterParams[key])
    refresh()
  }

  // 分页变化
  const handlePageChange = (page: number) => {
    pagination.page = page
    fetchData()
  }

  const handlePageSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    fetchData()
  }

  // 排序变化
  const handleSortChange = (sorter: { columnKey: string; order: 'ascend' | 'descend' | null }) => {
    Object.assign(sortParams, sorter)
    fetchData()
  }

  // 筛选变化
  const handleFilterChange = (filters: Record<string, any>) => {
    Object.assign(filterParams, filters)
    refresh()
  }

  // 初始化
  if (immediate) {
    fetchData()
  }

  return {
    // 状态
    loading,
    error,
    tableData,
    total,
    pagination,
    queryParams,
    sortParams,
    filterParams,

    // 计算属性
    hasData,
    isEmpty,

    // 方法
    fetchData,
    refresh,
    resetQuery,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,
    handleFilterChange,
  }
}
```

```typescript [useFormSubmit - 表单提交 Hook]
// hooks/useFormSubmit/index.ts
import { ref } from 'vue'

interface SubmitOptions<T = any> {
  successMsg?: string
  errorMsg?: string
  confirmMsg?: string
  debounce?: number
  meta?: (data: T) => string
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export const useFormSubmit = <T extends ApiResponse = ApiResponse>() => {
  const loading = ref(false)

  const createSubmit = (
    apiFn: (model: any) => Promise<T>,
    options: SubmitOptions<T['data']> = {}
  ) => {
    const {
      successMsg = '操作成功',
      errorMsg = '操作失败',
      confirmMsg,
      debounce = 0,
      meta,
      onSuccess,
      onError,
    } = options

    let debounceTimer: NodeJS.Timeout | null = null

    return async (formScope: any) => {
      // 防抖处理
      if (debounce > 0) {
        if (debounceTimer) {
          clearTimeout(debounceTimer)
        }
        
        return new Promise<void>((resolve) => {
          debounceTimer = setTimeout(async () => {
            await executeSubmit(formScope, {
              apiFn,
              successMsg,
              errorMsg,
              confirmMsg,
              meta,
              onSuccess,
              onError,
            })
            resolve()
          }, debounce)
        })
      }

      return executeSubmit(formScope, {
        apiFn,
        successMsg,
        errorMsg,
        confirmMsg,
        meta,
        onSuccess,
        onError,
      })
    }
  }

  return { loading, createSubmit }
}

async function executeSubmit<T>(
  formScope: any,
  options: {
    apiFn: (model: any) => Promise<T>
    successMsg?: string
    errorMsg?: string
    confirmMsg?: string
    meta?: (data: any) => string
    onSuccess?: (data: any) => void
    onError?: (error: Error) => void
  }
) {
  const {
    apiFn,
    successMsg,
    errorMsg,
    confirmMsg,
    meta,
    onSuccess,
    onError,
  } = options

  try {
    // 表单验证
    const isValid = await formScope.validate()
    if (!isValid) {
      return
    }

    // 确认提示
    if (confirmMsg) {
      const confirmed = await window.$dialog?.warning({
        title: '确认操作',
        content: confirmMsg,
        positiveText: '确认',
        negativeText: '取消',
      })
      
      if (!confirmed) {
        return
      }
    }

    // 提交数据
    const response = await apiFn(formScope.model)

    // 处理响应
    if (response.code === 0 || response.success) {
      const message = meta ? meta(response.data) : successMsg
      window.$message?.success(message)
      
      onSuccess?.(response.data)
      
      // 重置表单
      formScope.resetFields()
    } else {
      throw new Error(response.message || errorMsg)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : errorMsg
    window.$message?.error(errorMessage)
    
    onError?.(error instanceof Error ? error : new Error(errorMessage))
  }
}

interface ApiResponse {
  code: number
  message: string
  data: any
  success?: boolean
}
```

:::

### 权限工具函数

::: code-group

```typescript [权限管理工具]
// utils/d_auth.ts
import { getItem, setItem } from '@/hooks/useStorage'

const TOKEN_KEY = 'app_token'
const REFRESH_TOKEN_KEY = 'app_refresh_token'
const USER_INFO_KEY = 'app_user_info'
const PERMISSIONS_KEY = 'app_permissions'
const TIME_STAMP = 'app_time_stamp'
const TOKEN_TIMEOUT_VALUE = 24 * 60 * 60 * 1000 // 24小时

export interface UserInfo {
  id: string
  username: string
  nickname: string
  email: string
  avatar?: string
  role: string
  permissions: string[]
}

// Token 管理
export const getToken = (): string | null => {
  return getItem(TOKEN_KEY)
}

export const setToken = (token: string): void => {
  setItem(TOKEN_KEY, token)
  d_setTimeStamp()
}

export const removeToken = (): void => {
  removeItem(TOKEN_KEY)
  removeItem(REFRESH_TOKEN_KEY)
  removeItem(USER_INFO_KEY)
  removeItem(PERMISSIONS_KEY)
  removeItem(TIME_STAMP)
}

export const getRefreshToken = (): string | null => {
  return getItem(REFRESH_TOKEN_KEY)
}

export const setRefreshToken = (refreshToken: string): void => {
  setItem(REFRESH_TOKEN_KEY, refreshToken)
}

// 用户信息管理
export const getUserInfo = (): UserInfo | null => {
  return getItem(USER_INFO_KEY)
}

export const setUserInfo = (userInfo: UserInfo): void => {
  setItem(USER_INFO_KEY, userInfo)
}

// 权限管理
export const getPermissions = (): string[] => {
  return getItem(PERMISSIONS_KEY) || []
}

export const setPermissions = (permissions: string[]): void => {
  setItem(PERMISSIONS_KEY, permissions)
}

export const hasPermission = (permission: string | string[]): boolean => {
  const permissions = getPermissions()
  
  if (Array.isArray(permission)) {
    return permission.some(p => permissions.includes(p))
  }
  
  return permissions.includes(permission)
}

export const hasAnyPermission = (permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(permission))
}

export const hasAllPermissions = (permissions: string[]): boolean => {
  return permissions.every(permission => hasPermission(permission))
}

export const hasRole = (role: string | string[]): boolean => {
  const userInfo = getUserInfo()
  if (!userInfo) return false
  
  if (Array.isArray(role)) {
    return role.includes(userInfo.role)
  }
  
  return userInfo.role === role
}

// 时间戳管理
export const d_getTimeStamp = (): number => {
  return getItem(TIME_STAMP) ?? 0
}

export const d_setTimeStamp = (): void => {
  setItem(TIME_STAMP, Date.now())
}

export const d_isCheckTimeout = (): boolean => {
  const currentTime = Date.now()
  const timeStamp = d_getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}

// 登录状态检查
export const isLoggedIn = (): boolean => {
  return !!getToken() && !d_isCheckTimeout()
}

// 自动登出
export const autoLogout = (): void => {
  removeToken()
  window.$message?.warning('登录已过期，请重新登录')
  window.location.href = '/login'
}

// 刷新 Token
export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      return false
    }

    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()
    
    if (data.code === 0) {
      setToken(data.data.token)
      setRefreshToken(data.data.refreshToken)
      return true
    }
    
    return false
  } catch (error) {
    console.error('刷新 Token 失败:', error)
    return false
  }
}
```

```typescript [权限指令]
// utils/directives/permission.ts
import type { App, Directive, DirectiveBinding } from 'vue'
import { hasPermission } from '../d_auth'

const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const { value } = binding
    
    if (!value) {
      return
    }

    if (!hasPermission(value)) {
      el.parentNode?.removeChild(el)
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const { value, oldValue } = binding
    
    if (!value) {
      return
    }

    if (value !== oldValue) {
      if (!hasPermission(value)) {
        el.parentNode?.removeChild(el)
      }
    }
  },
}

export const setupPermissionDirective = (app: App) => {
  app.directive('permission', permission)
}

export default permission
```

```typescript [权限 Hook]
// hooks/usePermission/index.ts
import { computed } from 'vue'
import { getUserInfo, hasPermission, hasRole } from '@/utils/d_auth'

export const usePermission = () => {
  const userInfo = computed(() => getUserInfo())
  
  const isAdmin = computed(() => hasRole('admin'))
  const isManager = computed(() => hasRole('manager'))
  const isUser = computed(() => hasRole('user'))
  
  const hasPermissionTo = (permission: string | string[]) => {
    return hasPermission(permission)
  }
  
  const hasAnyPermissionTo = (permissions: string[]) => {
    return permissions.some(permission => hasPermission(permission))
  }
  
  const hasAllPermissionsTo = (permissions: string[]) => {
    return permissions.every(permission => hasPermission(permission))
  }
  
  const hasRoleTo = (role: string | string[]) => {
    return hasRole(role)
  }
  
  const canAccess = (requiredPermissions: string | string[], requiredRoles?: string | string[]) => {
    const hasRequiredPermission = !requiredPermissions || hasPermission(requiredPermissions)
    const hasRequiredRole = !requiredRoles || hasRole(requiredRoles)
    
    return hasRequiredPermission && hasRequiredRole
  }
  
  return {
    userInfo,
    isAdmin,
    isManager,
    isUser,
    hasPermissionTo,
    hasAnyPermissionTo,
    hasAllPermissionsTo,
    hasRoleTo,
    canAccess,
  }
}
```

:::

## 🏗️ 构建与配置

### Vite 配置模块化

::: code-group

```typescript [config/vite/index.ts - 配置入口]
// config/vite/index.ts
export { default as viteConsolePlugin } from './viteConsolePluginConfig'
export { default as viteAutoImportPlugin } from './viteAutoImportConfig'
export { default as viteComponentsPlugin } from './viteComponentsConfig'
export { default as resolveConfig } from './viteResolveConfig'
export { default as serverConfig } from './viteServerConfig'
export { default as buildConfig } from './viteBuildConfig'
```

```typescript [vite.config.ts - 主配置文件]
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import {
  viteConsolePlugin,
  viteAutoImportPlugin,
  viteComponentsPlugin,
  resolveConfig,
  serverConfig,
  buildConfig,
} from './config/vite'

export default defineConfig({
  plugins: [
    vue(),
    viteConsolePlugin,
    viteAutoImportPlugin,
    viteComponentsPlugin,
  ],
  resolve: resolveConfig,
  server: serverConfig,
  build: buildConfig,
})
```

```typescript [config/vite/viteAutoImportConfig.ts - 自动导入配置]
// config/vite/viteAutoImportConfig.ts
import AutoImport from 'unplugin-auto-import/vite'

export default AutoImport({
  // 自动导入的库
  imports: [
    'vue',
    'vue-router',
    'pinia',
    {
      '@vueuse/core': [
        'useLocalStorage',
        'useClipboard',
        'useDebounceFn',
        'useThrottleFn',
        'useWindowSize',
        'useDark',
        'useToggle',
      ],
    },
    {
      'naive-ui': [
        'useDialog',
        'useMessage',
        'useNotification',
        'useLoadingBar',
        'useModal',
        'useDrawer',
      ],
    },
  ],

  // 生成类型声明文件
  dts: 'src/types/auto-imports.d.ts',

  // 自动导入的目录
  dirs: ['src/stores', 'src/composables', 'src/hooks'],

  // 在 Vue 模板中启用自动导入
  vueTemplate: true,

  // 解析器
  resolvers: [],

  // 忽略的文件
  ignore: [
    'dist',
    'node_modules',
    'src/types',
  ],

  // 全局变量
  globalImports: [
    {
      'window.$message': 'import { useMessage } from "naive-ui"',
      'window.$dialog': 'import { useDialog } from "naive-ui"',
      'window.$notification': 'import { useNotification } from "naive-ui"',
      'window.$loadingBar': 'import { useLoadingBar } from "naive-ui"',
    },
  ],

  // 自定义导入转换
  customImportTransform: (vite, id, path) => {
    // 自定义转换逻辑
    return null
  },

  // ESLint
  eslintrc: {
    enabled: true,
    filepath: './.eslintrc-auto-import.json',
    globalsPropValue: true,
  },
})
```

```typescript [config/vite/viteComponentsConfig.ts - 组件自动注册配置]
// config/vite/viteComponentsConfig.ts
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default Components({
  // 生成类型声明文件
  dts: 'src/types/components.d.ts',

  // 组件目录
  dirs: ['src/components/global', 'src/components/local'],

  // 组件文件扩展名
  extensions: ['vue'],

  // Vue 版本
  version: 3,

  // 解析器
  resolvers: [
    NaiveUiResolver(),
    
    // C_ 前缀组件解析
    (componentName) => {
      if (componentName.startsWith('C_')) {
        const name = componentName.slice(2)
        return {
          name,
          from: `./src/components/global/${componentName}/index.vue`,
        }
      }
      return null
    },
    
    // c_ 前缀组件解析
    (componentName) => {
      if (componentName.startsWith('c_')) {
        const name = componentName.slice(2)
        return {
          name,
          from: `./src/components/local/${componentName}/index.vue`,
        }
      }
      return null
    },
    
    // 图标解析
    IconsResolver({
      prefix: 'i',
    }),
  ],

  // 组件名称大小写
  caseSensitive: true,

  // 自动导入的组件
  include: [/\.vue$/, /\.vue\?vue/],

  // 排除的组件
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

  // 深度查找
  deep: true,

  // 允许覆盖
  allowOverrides: true,

  // 转换
  transformer: 'vue3',

  // 类型声明文件生成器
  dts: {
    tsConfigPath: './tsconfig.json',
  },
})
```

```typescript [config/vite/viteBuildConfig.ts - 构建优化配置]
// config/vite/viteBuildConfig.ts
import type { BuildOptions } from 'vite'

const buildConfig: BuildOptions = {
  // 目标浏览器
  target: 'es2015',

  // 输出目录
  outDir: 'dist',

  // 静态资源目录
  assetsDir: 'assets',

  // 压缩代码
  minify: 'terser',
  
  // 压缩选项
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },

  // 生成 source map
  sourcemap: false,

  // 构建报告
  reportCompressedSize: false,

  // 分块大小警告限制
  chunkSizeWarningLimit: 800,

  // Rollup 配置
  rollupOptions: {
    // 输入配置
    input: {
      main: resolve(__dirname, 'index.html'),
    },

    // 输出配置
    output: {
      // 手动分包配置
      manualChunks: {
        'vue-vendor': ['vue', 'vue-router', 'pinia'],
        'ui-vendor': ['naive-ui'],
        'editor-vendor': ['@kangc/v-md-editor', 'wangeditor'],
        'office-vendor': ['xlsx', 'mammoth', 'file-saver', 'jszip'],
        'chart-vendor': ['echarts', 'vue-echarts'],
        'icon-vendor': ['@iconify/vue'],
        'utils-vendor': ['lodash-es', 'dayjs', 'axios'],
      },

      // 文件命名
      chunkFileNames: 'js/[name]-[hash].js',
      entryFileNames: 'js/[name]-[hash].js',
      assetFileNames: (assetInfo) => {
        const name = assetInfo.name || ''

        // 图片文件
        if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
          return 'images/[name]-[hash].[ext]'
        }

        // 字体文件
        if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
          return 'fonts/[name]-[hash].[ext]'
        }

        // CSS 文件
        if (/\.css$/i.test(name)) {
          return 'css/[name]-[hash].[ext]'
        }

        // 其他资源
        return 'assets/[name]-[hash].[ext]'
      },

      // 动态导入命名
      dynamicImportFunction: 'import',
    },

    // 外部依赖
    external: [],

    // 插件
    plugins: [],
  },

  // 库模式
  lib: {
    entry: '',
    name: '',
    formats: ['es', 'umd'],
    fileName: (format) => `index.${format}.js`,
  },

  // CSS 代码分割
  cssCodeSplit: true,

  // SSR 构建
  ssr: false,

  // 实验性功能
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` }
      } else {
        return { relative: true }
      }
    },
  },
}

export default buildConfig
```

```typescript [config/vite/viteServerConfig.ts - 开发服务器配置]
// config/vite/viteServerConfig.ts
import type { ServerOptions } from 'vite'
import { HEAVY_PAGE_ROUTES } from './heavyPages'

const serverConfig: ServerOptions = {
  // 服务器主机名
  host: true,

  // 服务器端口
  port: 3000,

  // 自动打开浏览器
  open: true,

  // CORS 配置
  cors: true,

  // 代理配置
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
    '/upload': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },

  // 预热文件
  warmup: {
    clientFiles: [
      './src/App.vue',
      './src/router/index.ts',
      // 预热重量级页面
      ...HEAVY_PAGE_ROUTES.map(route => `./src/views${route}/index.vue`),
    ],
  },

  // HMR 配置
  hmr: {
    overlay: true,
  },

  // 监听文件
  watch: {
    usePolling: false,
    ignored: ['!**/node_modules/**', '!**/dist/**'],
  },

  // 头部配置
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
}

export default serverConfig
```

```typescript [config/vite/heavyPages.ts - 重量级页面配置]
// config/vite/heavyPages.ts
export const HEAVY_PAGE_ROUTES = [
  '/demo/13-calendar', // 日历组件（FullCalendar，体积大）
  '/demo/16-text-editor', // 富文本编辑器（WangEditor，体积大）
  '/demo/29-antv-x6-editor', // 流程图编辑器（AntV X6，体积大）
  '/demo/30-excel-all', // Excel 处理（xlsx，体积大）
  '/demo/33-v-table-gantt', // 甘特图（v-table-gantt，体积大）
]
```

:::

### 构建优化配置

::: code-group

```typescript [代码分割优化]
// config/vite/codeSplitting.ts
export const codeSplittingConfig = {
  // 手动分包策略
  manualChunks: {
    // 核心框架
    'vue-core': ['vue', 'vue-router', 'pinia'],
    
    // UI 框架
    'ui-framework': ['naive-ui'],
    
    // 工具库
    'utils': ['lodash-es', 'dayjs', 'axios', 'js-cookie'],
    
    // 图标库
    'icons': ['@iconify/vue'],
    
    // 编辑器
    'editors': ['@kangc/v-md-editor', 'wangeditor'],
    
    // 图表库
    'charts': ['echarts', 'vue-echarts'],
    
    // 办公文档处理
    'office': ['xlsx', 'mammoth', 'file-saver', 'jszip'],
    
    // 流程图
    'diagram': ['@antv/x6'],
    
    // 甘特图
    'gantt': ['v-table-gantt'],
    
    // 日历
    'calendar': ['@fullcalendar/vue3', '@fullcalendar/core', '@fullcalendar/interaction'],
  },

  // 分包策略
  chunkSizeWarningLimit: 1000,
  
  // 压缩配置
  minify: 'terser',
  
  // 压缩选项
  terserOptions: {
    compress: {
      // 移除 console
      drop_console: true,
      // 移除 debugger
      drop_debugger: true,
      // 移除无用代码
      pure_funcs: ['console.log', 'console.info', 'console.debug'],
    },
    mangle: {
      // 保留类名
      keep_classnames: process.env.NODE_ENV === 'development',
      // 保留函数名
      keep_fnames: process.env.NODE_ENV === 'development',
    },
  },
}
```

```typescript [资源优化配置]
// config/vite/assetsOptimization.ts
export const assetsOptimizationConfig = {
  // 资源文件命名
  assetFileNames: (assetInfo: any) => {
    const name = assetInfo.name || ''
    
    // 图片文件
    if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
      return 'images/[name]-[hash].[ext]'
    }
    
    // 字体文件
    if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
      return 'fonts/[name]-[hash].[ext]'
    }
    
    // CSS 文件
    if (/\.css$/i.test(name)) {
      return 'css/[name]-[hash].[ext]'
    }
    
    // JS 文件
    if (/\.(js|mjs)$/i.test(name)) {
      return 'js/[name]-[hash].[ext]'
    }
    
    // 其他资源
    return 'assets/[name]-[hash].[ext]'
  },

  // 图片压缩
  imagemin: {
    // JPEG 压缩
    jpeg: {
      quality: 80,
    },
    // PNG 压缩
    png: {
      quality: [0.6, 0.8],
    },
    // SVG 压缩
    svg: {
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
        {
          name: 'removeEmptyAttrs',
          active: true,
        },
      ],
    },
  },

  // 字体优化
  fontOptimization: {
    // 字体子集化
    subsets: ['latin', 'latin-ext'],
    // 字体显示策略
    display: 'swap',
    // 预加载关键字体
    preload: ['Inter-Regular.woff2', 'Inter-Medium.woff2'],
  },

  // 预加载关键资源
  preload: [
    // 关键 CSS
    { href: '/css/main.css', as: 'style' },
    // 关键 JS
    { href: '/js/main.js', as: 'script' },
    // 关键字体
    { href: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
  ],

  // 预连接到外部域名
  preconnect: [
    { href: 'https://fonts.googleapis.com' },
    { href: 'https://fonts.gstatic.com' },
    { href: 'https://api.example.com' },
  ],

  // DNS 预解析
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
}
```

```typescript [性能优化配置]
// config/vite/performanceOptimization.ts
export const performanceOptimizationConfig = {
  // 启用压缩
  compression: true,
  
  // 启用 Brotli 压缩
  brotliCompress: true,
  
  // 启用 Gzip 压缩
  gzipCompress: true,
  
  // 缓存策略
  cache: {
    // 静态资源缓存时间
    maxAge: 31536000, // 1 年
    // HTML 文件缓存时间
    htmlMaxAge: 3600, // 1 小时
    // 服务工作者缓存
    swCache: true,
  },
  
  // 代码分割
  codeSplitting: {
    // 路由级别分割
    routeLevelSplitting: true,
    // 组件级别分割
    componentLevelSplitting: true,
    // 第三方库分割
    vendorSplitting: true,
  },
  
  // 懒加载
  lazyLoading: {
    // 图片懒加载
    images: true,
    // 路由懒加载
    routes: true,
    // 组件懒加载
    components: true,
  },
  
  // 预加载
  preloading: {
    // 关键路由预加载
    criticalRoutes: ['/dashboard', '/user-management'],
    // 关键组件预加载
    criticalComponents: ['C_Table', 'C_Form'],
    // 关键资源预加载
    criticalAssets: ['/css/main.css', '/js/main.js'],
  },
  
  // 网络优化
  networkOptimization: {
    // 启用 HTTP/2
    http2: true,
    // 启用 HTTP/3
    http3: false,
    // 启用服务推送
    serverPush: false,
    // 启用早期提示
    earlyHints: true,
  },
  
  // 运行时优化
  runtimeOptimization: {
    // 启用虚拟滚动
    virtualScrolling: true,
    // 启用无限滚动
    infiniteScroll: true,
    // 启用防抖和节流
    debounceThrottle: true,
    // 启用内存优化
    memoryOptimization: true,
  },
}
```

:::

## 🔄 Git 工作流

### 完整的 Git 提交体系

#### 1. Commitizen 配置

项目使用 **cz-customizable** 进行交互式提交：

::: code-group

```javascript [.cz-config.js - 提交配置]
// .cz-config.js
module.exports = {
  // 提交类型配置
  types: [
    { value: 'wip', name: 'wip:      🚧 开发中' },
    { value: 'feat', name: 'feat:     🎯 新功能' },
    { value: 'fix', name: 'fix:      🐛 Bug 修复（会触发 patch）' },
    { value: 'perf', name: 'perf:     ⚡️ 性能优化（会触发 patch）' },
    { value: 'deps', name: 'deps:     📦 依赖更新（会触发 patch）' },
    { value: 'refactor', name: 'refactor: ♻️  重构（不改变行为）' },
    { value: 'docs', name: 'docs:     📚 文档变更' },
    { value: 'test', name: 'test:     🔎 测试相关' },
    { value: 'style', name: 'style:    💄 代码样式（空格、分号等）' },
    { value: 'build', name: 'build:    🧳 构建/打包' },
    { value: 'chore', name: 'chore:    🔧 其他杂项' },
    { value: 'revert', name: 'revert:   🔙 回退' },
  ],

  // 交互式配置
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(必填，格式如：模块/子模块):',
    subject: '请简要描述提交(必填，不加句号):',
    body: '请输入更详细的说明(可选):\n',
    footer: 'Footer(可选): 例如 "Closes #123" 或 "Release-As: 1.3.1"\n',
    confirmCommit: '确认提交以上内容？(y/n/e/h)',
  },

  // 跳过问题，保持简洁
  skipQuestions: ['body'],

  // 允许破坏性变更
  allowBreakingChanges: ['feat', 'fix', 'refactor'],
  breakingPrefix: 'BREAKING CHANGE:',

  // 主题长度限制
  subjectLimit: 88,

  // 默认值
  defaultScope: '',
  defaultSubject: '',
  defaultBody: '',
  defaultFooter: '',

  // 自定义问题
  customQuestions: [
    {
      type: 'input',
      name: 'issue',
      message: '关联的 Issue 编号 (可选):',
    },
  ],
}
```

```json [package.json - 脚本配置]
{
  "scripts": {
    "commit": "git-cz",
    "commit:retry": "git-cz --retry",
    "commit:all": "git add . && git-cz"
  },
  "devDependencies": {
    "commitizen": "^4.3.0",
    "cz-customizable": "^7.0.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "./.cz-config.js"
    }
  }
}
```

:::

#### 2. 提交命令

```bash
# 使用 Commitizen 交互式提交
bun run commit
# 等同于
bunx cz

# 重试上次提交
bun run commit:retry

# 添加所有文件并提交
bun run commit:all

# 手动提交（不推荐，但需要了解）
git commit -m "type(scope): description"
```

#### 3. 提交信息格式

```bash
# 标准格式
<type>(<scope>): <subject>

<body>

<footer>

# 示例
feat(user): 添加用户管理功能

实现了用户的增删改查功能，包括：
- 用户列表展示
- 用户信息编辑
- 用户权限管理

Closes #123
Release-As: 1.2.0
```

### 代码质量保障体系

#### 1. 双重 Lint 检查

::: code-group

```bash [package.json 脚本]
{
  "scripts": {
    "lint": "oxlint . --fix -D correctness --ignore-path .gitignore && eslint . --fix",
    "lint:oxlint": "oxlint . --fix -D correctness --ignore-path .gitignore",
    "lint:eslint": "eslint . --fix",
    "lint:check": "oxlint . -D correctness --ignore-path .gitignore && eslint ."
  }
}

# 检查流程：
# 1. Oxlint - 高性能 JavaScript/TypeScript 检查
#    - 速度快（比 ESLint 快 50-100 倍）
#    - 专注正确性检查 (-D correctness)
#    - 自动修复 (--fix)
#    - 忽略 .gitignore 文件

# 2. ESLint - Vue/TypeScript 专用检查
#    - Vue 组件规范检查
#    - TypeScript 类型检查
#    - 代码风格检查
#    - 自动修复 (--fix)
```

```typescript [eslint.config.ts - ESLint 配置]
// eslint.config.ts
import { defineConfigWithVueTs } from '@eslint/configs'
import * as oxlint from 'eslint-plugin-oxlint'
import pluginVue from 'eslint-plugin-vue'
import vueTsConfigs from 'eslint-plugin-vue-tsconfigs'

export default defineConfigWithVueTs(
  // Oxlint 高性能检查
  ...oxlint.configs['flat/recommended'],

  // Vue 专用规则
  pluginVue.configs['flat/essential'],

  // TypeScript 专用规则
  vueTsConfigs.recommended,

  // 自定义规则
  {
    rules: {
      // JSDoc 注释要求
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          contexts: [
            'MethodDefinition:not([accessibility="private"])',
            'MethodDefinition[kind="constructor"]',
          ],
        },
      ],

      // 引号规范
      '@typescript-eslint/quotes': ['error', 'single'],
      'vue/html-quotes': ['error', 'double'],

      // 组件命名
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: ['router-view', 'router-link', '/^icon-/', '/^C_/', '/^c_/'],
        },
      ],

      // 复杂度控制
      'max-depth': ['error', 4],
      'complexity': ['warn', 10],
      'max-params': ['warn', 6],

      // 其他规则
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  }
)
```

:::

#### 2. Pre-commit Hooks

::: code-group

```bash [.husky/pre-commit - 提交前钩子]
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 1. Oxlint 检查所有暂存文件，不允许任何警告
bunx oxlint --max-warnings 0

# 2. lint-staged 对暂存文件执行格式化和修复
npx lint-staged

# 3. 类型检查
bun run type-check

# 4. 单元测试
bun run test:unit
```

```json [package.json - lint-staged 配置]
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,vue}": [
      "oxlint --max-warnings 0 --deny-warnings",
      "eslint --fix --no-cache",
      "prettier --write"
    ],
    "src/**/*.{scss,less,css}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}

# 处理流程：
# 1. 对暂存文件进行 Oxlint 检查（零警告策略）
# 2. ESLint 自动修复问题
# 3. Prettier 格式化代码
# 4. Stylelint 修复样式问题
# 5. Prettier 格式化其他文件
```

```bash [.husky/commit-msg - 提交信息钩子]
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 检查提交信息格式
bunx --no-install commitlint --edit "$1"

# 检查提交信息长度
if [ ${#1} -gt 88 ]; then
  echo "❌ 提交信息过长，请控制在 88 字符以内"
  exit 1
fi

# 检查提交信息格式
if ! echo "$1" | grep -qE "^(wip|feat|fix|perf|deps|refactor|docs|test|style|build|chore|revert)\(.*\): .+"; then
  echo "❌ 提交信息格式不正确，请使用 type(scope): description 格式"
  exit 1
fi
```

```javascript [commitlint.config.js - 提交信息检查配置]
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'wip', 'feat', 'fix', 'docs', 'style', 'refactor',
        'perf', 'test', 'chore', 'revert', 'build', 'deps'
      ]
    ],
    'subject-case': [0], // 允许任意大小写
    'subject-max-length': [2, 'always', 88], // 主题最大长度
    'body-max-line-length': [2, 'always', 88], // 正文最大长度
    'footer-max-line-length': [2, 'always', 88], // 脚注最大长度
  }
}
```

:::

#### 3. 完整的开发工作流

::: code-group

```bash [开发提交流程]
# 1. 创建功能分支
git checkout -b feature/user-management

# 2. 开发功能
# ... 编写代码 ...

# 3. 添加文件到暂存区
git add .

# 4. 交互式提交（推荐）
bun run commit

# 5. 提交流程：
#    - 选择提交类型 (feat/fix/docs 等)
#    - 输入影响范围 (user/login/api 等)
#    - 输入提交描述 (简洁明了)
#    - 可选：详细说明
#    - 可选：关联 Issue 或版本号

# 6. 自动执行检查：
#    - Oxlint 代码检查
#    - ESLint 代码修复
#    - Prettier 代码格式化
#    - Commitlint 消息格式验证
#    - TypeScript 类型检查
#    - 单元测试

# 7. 推送分支
git push origin feature/user-management

# 8. 创建 Pull Request
#    - 填写 PR 描述
#    - 关联相关 Issue
#    - 请求代码审查

# 9. 代码审查通过后合并
#    - 使用 squash merge 合并 PR
#    - 自动删除功能分支
```

```bash [分支管理规范]
# 分支命名
feature/功能名称
bugfix/问题描述
hotfix/紧急修复
release/版本号

# 示例
feature/user-management
bugfix/login-validation-error
hotfix/security-patch
release/v1.2.0

# 主分支
main      # 生产环境代码
develop   # 开发环境代码

# 辅助分支
feature/*  # 功能开发分支
bugfix/*   # Bug 修复分支
hotfix/*   # 紧急修复分支
release/*  # 发布准备分支
```

```bash [版本发布流程]
# 1. 创建发布分支
git checkout -b release/v1.2.0 develop

# 2. 更新版本号
# 更新 package.json 中的版本号
# 更新 CHANGELOG.md

# 3. 提交版本更新
git add .
bun run commit

# 4. 合并到主分支
git checkout main
git merge --no-ff release/v1.2.0

# 5. 创建标签
git tag -a v1.2.0 -m "Release version 1.2.0"

# 6. 合并回开发分支
git checkout develop
git merge --no-ff release/v1.2.0

# 7. 删除发布分支
git branch -d release/v1.2.0

# 8. 推送所有分支和标签
git push origin main develop
git push origin --tags

# 9. 自动化流程
#    - CI/CD 流水线自动构建
#    - 自动部署到测试环境
#    - 自动生成发布说明
```

:::

## ⚡ 性能优化规范

### 组件懒加载

::: code-group

```typescript [路由懒加载]
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: () => import('@/views/user-management/index.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true,
      preload: true, // 预加载
    },
  },
  {
    path: '/demo/:id',
    name: 'Demo',
    component: () => import('@/views/demo/[id]/index.vue'),
    props: true,
  },
  // 重量级页面
  {
    path: '/demo/13-calendar',
    name: 'CalendarDemo',
    component: () => import('@/views/demo/13-calendar/index.vue'),
    meta: {
      heavy: true, // 标记为重量级页面
    },
  },
  {
    path: '/demo/16-text-editor',
    name: 'TextEditorDemo',
    component: () => import('@/views/demo/16-text-editor/index.vue'),
    meta: {
      heavy: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 预加载关键路由
router.beforeEach(async (to, from, next) => {
  if (to.meta.preload && to.meta.preload !== from.meta.preload) {
    // 预加载组件
    const component = await to.matched[0].components?.default
  }
  next()
})

export default router
```

```typescript [组件懒加载]
// components/HeavyComponent/index.vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// 基础懒加载
const HeavyComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)

// 带加载状态的懒加载
const HeavyComponentWithLoading = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: () => import('./LoadingComponent.vue'),
  errorComponent: () => import('./ErrorComponent.vue'),
  delay: 200,
  timeout: 3000,
})

// 工厂函数懒加载
const createLazyComponent = (componentPath: string) => {
  return defineAsyncComponent({
    loader: () => import(/* @vite-ignore */ componentPath),
    loadingComponent: () => import('./LoadingComponent.vue'),
    errorComponent: () => import('./ErrorComponent.vue'),
    delay: 200,
    timeout: 5000,
  })
}

// 使用示例
const LazyChart = createLazyComponent('./ChartComponent.vue')
const LazyTable = createLazyComponent('./TableComponent.vue')
const LazyForm = createLazyComponent('./FormComponent.vue')
</script>

<template>
  <div>
    <!-- 基础懒加载 -->
    <HeavyComponent />
    
    <!-- 带加载状态的懒加载 -->
    <HeavyComponentWithLoading />
    
    <!-- 条件懒加载 -->
    <LazyChart v-if="showChart" />
    <LazyTable v-if="showTable" />
    <LazyForm v-if="showForm" />
  </div>
</template>
```

```typescript [动态导入优化]
// utils/dynamicImports.ts
// 预加载关键组件
export const preloadComponents = async () => {
  const components = [
    () => import('@/components/global/C_Table/index.vue'),
    () => import('@/components/global/C_Form/index.vue'),
    () => import('@/components/global/C_Modal/index.vue'),
  ]
  
  // 并行预加载
  await Promise.all(components.map(comp => comp()))
}

// 按需加载组件
export const loadComponent = async (componentName: string) => {
  try {
    const component = await import(`@/components/${componentName}.vue`)
    return component.default
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error)
    return null
  }
}

// 条件加载
export const conditionalLoad = async (condition: boolean, componentPath: string) => {
  if (!condition) return null
  
  try {
    const component = await import(componentPath)
    return component.default
  } catch (error) {
    console.error(`Failed to conditionally load component: ${componentPath}`, error)
    return null
  }
}

// 使用示例
// preloadComponents() // 在应用启动时预加载
// const MyComponent = await loadComponent('MyComponent')
// const ConditionalComponent = await conditionalLoad(user.isAdmin, './AdminPanel.vue')
```

:::

### 资源预加载配置

::: code-group

```typescript [config/vite/heavyPages.ts - 重量级页面配置]
// config/vite/heavyPages.ts
export const HEAVY_PAGE_ROUTES = [
  '/demo/13-calendar', // 日历组件（FullCalendar，体积大）
  '/demo/16-text-editor', // 富文本编辑器（WangEditor，体积大）
  '/demo/29-antv-x6-editor', // 流程图编辑器（AntV X6，体积大）
  '/demo/30-excel-all', // Excel 处理（xlsx，体积大）
  '/demo/33-v-table-gantt', // 甘特图（v-table-gantt，体积大）
]

export const PRELOAD_ROUTES = [
  '/dashboard', // 仪表板
  '/user-management', // 用户管理
  '/system-settings', // 系统设置
]

export const PREFETCH_RESOURCES = [
  '/fonts/Inter-Regular.woff2',
  '/fonts/Inter-Medium.woff2',
  '/css/main.css',
  '/js/main.js',
]
```

```typescript [config/vite/viteServerConfig.ts - 预加载配置]
// config/vite/viteServerConfig.ts
import { HEAVY_PAGE_ROUTES, PRELOAD_ROUTES } from './heavyPages'

export default {
  // 预热文件
  warmup: {
    clientFiles: [
      './src/App.vue',
      './src/router/index.ts',
      // 预热重量级页面
      ...HEAVY_PAGE_ROUTES.map(route => `./src/views${route}/index.vue`),
      // 预热关键路由
      ...PRELOAD_ROUTES.map(route => `./src/views${route}/index.vue`),
    ],
  },

  // 预加载配置
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'naive-ui',
      // 预构建重量级依赖
      '@fullcalendar/vue3',
      '@fullcalendar/core',
      '@fullcalendar/interaction',
      'wangeditor',
      '@antv/x6',
      'xlsx',
      'v-table-gantt',
    ],
  },
}
```

```typescript [utils/resourcePreloading.ts - 资源预加载工具]
// utils/resourcePreloading.ts
export const preloadResource = (url: string, as: string = 'script'): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = as
    
    if (as === 'font') {
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
    }
    
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to preload: ${url}`))
    
    document.head.appendChild(link)
  })
}

export const prefetchResource = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to prefetch: ${url}`))
    
    document.head.appendChild(link)
  })
}

export const preloadCriticalResources = async () => {
  const criticalResources = [
    { url: '/fonts/Inter-Regular.woff2', as: 'font' },
    { url: '/fonts/Inter-Medium.woff2', as: 'font' },
    { url: '/css/main.css', as: 'style' },
    { url: '/js/main.js', as: 'script' },
  ]
  
  try {
    await Promise.all(
      criticalResources.map(resource => 
        preloadResource(resource.url, resource.as)
      )
    )
    console.log('Critical resources preloaded successfully')
  } catch (error) {
    console.error('Failed to preload critical resources:', error)
  }
}

export const preloadRouteComponents = async (routes: string[]) => {
  try {
    await Promise.all(
      routes.map(route => {
        const componentName = route.split('/').pop()
        return import(`@/views${route}/index.vue`)
      })
    )
    console.log('Route components preloaded successfully')
  } catch (error) {
    console.error('Failed to preload route components:', error)
  }
}

// 在应用启动时预加载关键资源
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    preloadCriticalResources()
  })
}
```

```typescript [hooks/usePreload.ts - 预加载 Hook]
// hooks/usePreload.ts
import { onMounted, onUnmounted } from 'vue'
import { preloadResource, prefetchResource, preloadRouteComponents } from '@/utils/resourcePreloading'

export const usePreload = () => {
  let idleCallback: number | null = null
  
  const preloadWhenIdle = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      idleCallback = requestIdleCallback(callback)
    } else {
      setTimeout(callback, 100)
    }
  }
  
  const preloadComponent = (componentPath: string) => {
    preloadWhenIdle(() => {
      import(/* @vite-ignore */ componentPath)
    })
  }
  
  const preloadRoute = (routePath: string) => {
    preloadWhenIdle(() => {
      const componentName = routePath.split('/').pop()
      import(`@/views${routePath}/index.vue`)
    })
  }
  
  const prefetchRoute = (routePath: string) => {
    prefetchResource(routePath)
  }
  
  onMounted(() => {
    // 在浏览器空闲时预加载
    preloadRoute('/dashboard')
    preloadRoute('/user-management')
    preloadComponent('@/components/global/C_Table/index.vue')
    preloadComponent('@/components/global/C_Form/index.vue')
  })
  
  onUnmounted(() => {
    if (idleCallback && 'cancelIdleCallback' in window) {
      cancelIdleCallback(idleCallback)
    }
  })
  
  return {
    preloadComponent,
    preloadRoute,
    prefetchRoute,
  }
}
```

:::

### 请求优化

::: code-group

```typescript [utils/requestOptimization.ts - 请求优化工具]
// utils/requestOptimization.ts
import { getData, postData } from '@/axios/request'

// 带缓存的请求
export const getCachedData = async <T = any>(
  url: string,
  options: {
    ttl?: number // 缓存时间（毫秒）
    key?: string // 缓存键
  } = {}
): Promise<T> => {
  const { ttl = 60000, key = url } = options
  
  // 检查缓存
  const cached = localStorage.getItem(`cache:${key}`)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < ttl) {
      return data
    }
  }
  
  // 发起请求
  const response = await getData(url)
  
  // 缓存结果
  localStorage.setItem(`cache:${key}`, JSON.stringify({
    data: response.data,
    timestamp: Date.now(),
  }))
  
  return response.data
}

// 防抖请求
export const debounceRequest = <T = any>(
  requestFn: (...args: any[]) => Promise<T>,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: any[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = setTimeout(async () => {
        try {
          const result = await requestFn(...args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, delay)
    })
  }
}

// 节流请求
export const throttleRequest = <T = any>(
  requestFn: (...args: any[]) => Promise<T>,
  interval: number = 1000
) => {
  let lastRequestTime = 0
  
  return (...args: any[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      const now = Date.now()
      
      if (now - lastRequestTime >= interval) {
        lastRequestTime = now
        
        requestFn(...args)
          .then(resolve)
          .catch(reject)
      } else {
        // 如果在节流期间内，则忽略请求
        reject(new Error('Request throttled'))
      }
    })
  }
}

// 重试请求
export const retryRequest = async <T = any>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      
      if (i === maxRetries) {
        throw lastError
      }
      
      // 指数退避
      const retryDelay = delay * Math.pow(2, i)
      await new Promise(resolve => setTimeout(resolve, retryDelay))
    }
  }
  
  throw lastError!
}

// 并发请求控制
export class RequestQueue {
  private queue: Array<() => Promise<any>> = []
  private running = 0
  private maxConcurrent: number
  
  constructor(maxConcurrent: number = 5) {
    this.maxConcurrent = maxConcurrent
  }
  
  add<T = any>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await requestFn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
      
      this.process()
    })
  }
  
  private async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return
    }
    
    this.running++
    const requestFn = this.queue.shift()!
    
    try {
      await requestFn()
    } finally {
      this.running--
      this.process()
    }
  }
}

// 使用示例
const requestQueue = new RequestQueue(3) // 最多并发 3 个请求
```

```typescript [hooks/useRequestOptimization.ts - 请求优化 Hook]
// hooks/useRequestOptimization.ts
import { ref, computed } from 'vue'
import { getCachedData, debounceRequest, retryRequest } from '@/utils/requestOptimization'

export const useRequestOptimization = () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  // 带缓存的请求
  const useCachedRequest = <T = any>(
    url: string,
    options: { ttl?: number; key?: string } = {}
  ) => {
    const data = ref<T | null>(null)
    const refreshing = ref(false)
    
    const execute = async (refresh = false) => {
      if (refresh) {
        refreshing.value = true
      } else {
        loading.value = true
      }
      
      error.value = null
      
      try {
        const result = await getCachedData<T>(url, {
          ...options,
          key: refresh ? undefined : options.key, // 刷新时不使用缓存
        })
        
        data.value = result
      } catch (err) {
        error.value = err instanceof Error ? err : new Error('Request failed')
      } finally {
        loading.value = false
        refreshing.value = false
      }
    }
    
    return {
      data,
      loading,
      refreshing,
      error,
      execute,
      refresh: () => execute(true),
    }
  }
  
  // 防抖请求
  const useDebouncedRequest = <T = any>(
    requestFn: (...args: any[]) => Promise<T>,
    delay: number = 300
  ) => {
    const debouncedFn = debounceRequest(requestFn, delay)
    
    const execute = async (...args: any[]) => {
      loading.value = true
      error.value = null
      
      try {
        return await debouncedFn(...args)
      } catch (err) {
        error.value = err instanceof Error ? err : new Error('Request failed')
        throw err
      } finally {
        loading.value = false
      }
    }
    
    return { execute, loading, error }
  }
  
  // 重试请求
  const useRetryRequest = <T = any>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ) => {
    const execute = async () => {
      loading.value = true
      error.value = null
      
      try {
        return await retryRequest(requestFn, maxRetries, delay)
      } catch (err) {
        error.value = err instanceof Error ? err : new Error('Request failed')
        throw err
      } finally {
        loading.value = false
      }
    }
    
    return { execute, loading, error }
  }
  
  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    useCachedRequest,
    useDebouncedRequest,
    useRetryRequest,
  }
}
```

```typescript [api/optimizedApi.ts - 优化的 API 示例]
// api/optimizedApi.ts
import { getData, postData } from '@/axios/request'
import { useRequestOptimization } from '@/hooks/useRequestOptimization'

const { useCachedRequest, useDebouncedRequest, useRetryRequest } = useRequestOptimization()

// 用户列表 API（带缓存）
export const useUserList = () => {
  return useCachedRequest('/api/users', {
    ttl: 60000, // 缓存 1 分钟
    key: 'user-list',
  })
}

// 搜索 API（防抖）
export const useSearchUsers = () => {
  return useDebouncedRequest(
    (keyword: string) => getData('/api/users/search', { params: { keyword } }),
    500 // 500ms 防抖
  )
}

// 上传 API（重试）
export const useUploadFile = () => {
  return useRetryRequest(
    (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      return postData('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    3, // 最多重试 3 次
    1000 // 1 秒延迟
  )
}

// 使用示例
// const { data: users, loading, error, refresh } = useUserList()
// const { execute: searchUsers } = useSearchUsers()
// const { execute: uploadFile } = useUploadFile()
```

:::

---

## 📝 总结

本代码规范文档基于 Robot Admin 项目的实际架构深度分析，涵盖了：

1. **文件组织规范** - 三文件模式、组件库结构、类型模块化
2. **命名约定** - 文件、组件、变量、CSS 类命名规范
3. **代码风格** - TypeScript、Vue 组件、函数定义规范
4. **组件开发** - 组件结构、Props/Emits、通信规范
5. **样式开发** - SCSS 结构、UnoCSS 配置、主题系统
6. **TypeScript** - 类型定义、类型守卫、组件类型规范
7. **工具函数** - Hooks、权限管理、请求优化规范
8. **构建配置** - Vite 模块化、自动导入、构建优化
9. **Git 工作流** - 提交规范、代码检查流程
10. **性能优化** - 懒加载、预加载、请求优化

这些规范确保了项目的：

- 🎯 **一致性** - 统一的代码风格和架构模式
- 🚀 **可维护性** - 清晰的文件组织和命名约定
- 🔧 **可扩展性** - 模块化的组件和配置设计
- ⚡ **高性能** - 优化的构建和加载策略
- 🛡️ **类型安全** - 完整的 TypeScript 类型定义
- 🔄 **自动化** - 完善的工程化工具链

遵循这些规范，团队可以高效协作，构建高质量的企业级应用。

---

<!-- GitHub徽章组件 -->
<GitHubBadges />

<style scoped>
.pain-points table,
.roi-comparison table,
.comparison-table table,
.demo-showcase table,
.efficiency-analysis table,
.quality-metrics table,
.team-collaboration table,
.usage-recommendations table {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.pain-points table th,
.roi-comparison table th,
.comparison-table table th,
.demo-showcase table th,
.efficiency-analysis table th,
.quality-metrics table th,
.team-collaboration table th,
.usage-recommendations table th {
  background: rgba(64, 158, 255, 0.1);
}

.pain-points table td:nth-child(3),
.roi-comparison table td:nth-child(4) {
  font-weight: bold;
  color: #ff6b6b;
}

.demo-showcase table td:nth-child(2),
.efficiency-analysis table td:nth-child(3),
.quality-metrics table td:nth-child(2),
.team-collaboration table td:nth-child(2) {
  font-weight: bold;
  color: #51cf66;
}
</style>
