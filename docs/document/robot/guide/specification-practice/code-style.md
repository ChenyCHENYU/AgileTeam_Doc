# 命名与代码风格

---
title: "命名与代码风格"
outline: "deep"
description: "命名约定与代码风格规范"
---

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
