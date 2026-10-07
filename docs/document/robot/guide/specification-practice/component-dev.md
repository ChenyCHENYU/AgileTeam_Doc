# 组件与样式开发规范

---
title: "组件与样式开发规范"
outline: "deep"
description: "组件开发规范与样式开发规范"
---

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
