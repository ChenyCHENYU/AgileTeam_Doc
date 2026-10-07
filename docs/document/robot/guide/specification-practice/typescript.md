# TypeScript 与 Hooks 规范

---
title: "TypeScript 与 Hooks 规范"
outline: "deep"
description: "TypeScript 规范、工具函数与 Hooks"
---

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
