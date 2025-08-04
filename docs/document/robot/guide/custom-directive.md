---
outline: "deep"
---

# Robot Admin 自定义指令使用指南

<div class="hero-banner">
  <h2>🎯 强大的 Vue.js 自定义指令系统</h2>
  <p>直接将特殊的响应式行为应用于 DOM 元素，提供预构建指令集合和自动注册系统</p>
</div>

自定义指令是 Vue.js 中的一项强大功能，允许你直接将特殊的响应式行为应用于 DOM 元素。Robot Admin 框架提供了一整套预构建的指令，让你可以轻松增强应用程序功能。

本项目中的指令遵循 Vue 3 的指令 API，并通过一个集中化的系统自动注册。每个指令遵循命名规范 `v-directiveName`，可以直接应用于 Vue 模板中的 HTML 元素。

## 🎯 可用指令概览

框架提供了以下内置指令：

| 指令              | 目的                   | 关键特性                         |
| ----------------- | ---------------------- | -------------------------------- |
| **v-copy**        | 将文本复制到剪贴板     | 成功/错误反馈，可配置选项        |
| **v-debounce**    | 防止快速函数调用       | 可配置延迟，事件自定义           |
| **v-drag**        | 使元素可拖动           | 边界限制，拖动手柄               |
| **v-longpress**   | 检测长按交互           | 可配置持续时间，防止冲突         |
| **v-permission**  | 控制元素访问           | 权限检查，后备行为               |
| **v-throttle**    | 限制函数执行频率       | 可配置时间，事件选项             |
| **v-watermark**   | 为元素添加水印         | 自定义文本，定位，样式           |

::: tip 💡 自动注册系统
Robot Admin 使用自动指令注册系统，在 `src/directives/modules/` 目录下的所有 `.ts` 文件都会在应用程序初始化时自动发现并注册。
:::

## 📋 指令详细使用

### v-copy - 复制指令

`v-copy` 指令允许用户通过点击元素将文本复制到剪贴板。

::: code-group

```vue [基本用法]
<template>
  <!-- 复制元素的内部文本 -->
  <div v-copy>点击复制此文本</div>

  <!-- 复制特定文本 -->
  <button v-copy="'要复制的文本'">复制</button>
</template>
```

```vue [高级配置]
<template>
  <!-- 带高级选项 -->
  <button v-copy="{
    text: '自定义要复制的文本',
    successMessage: '已复制到剪贴板！',
    onSuccess: () => console.log('复制成功')
  }">
    带选项复制
  </button>
</template>
```

:::

#### 配置选项

| 选项               | 类型                  | 默认值     | 描述                           |
| ------------------ | --------------------- | ---------- | ------------------------------ |
| **text**           | string                | 元素内容   | 要复制的文本                   |
| **successMessage** | string \| false       | '复制成功' | 成功通知消息（false 禁用）     |
| **errorMessage**   | string \| false       | '复制失败' | 错误通知消息（false 禁用）     |
| **onSuccess**      | Function              | () => {}   | 复制成功时的回调               |
| **onError**        | Function              | () => {}   | 复制失败时的回调               |
| **disabled**       | boolean               | false      | 禁用复制功能                   |
| **messageInstance**| any                   | null       | 自定义消息提供者实例           |

### v-permission - 权限指令

`v-permission` 指令根据用户权限控制元素的可见性或交互性。

::: code-group

```vue [基本权限控制]
<template>
  <!-- 如果用户缺少 'user:create' 权限则隐藏元素 -->
  <button v-permission="'user:create'">创建用户</button>

  <!-- 检查多个权限（任意匹配） -->
  <div v-permission="['user:edit', 'user:update']">编辑用户</div>
</template>
```

```vue [高级权限配置]
<template>
  <!-- 高级配置 -->
  <button v-permission="{
    permissions: ['user:delete'],
    mode: 'AND',
    fallback: 'disable',
    authData: userPermissions,
    onDenied: (reason) => console.log(reason)
  }">
    删除用户
  </button>
</template>
```

:::

#### 配置选项

| 选项            | 类型                          | 默认值 | 描述                           |
| --------------- | ----------------------------- | ------ | ------------------------------ |
| **permissions** | string \| string[]            | -      | 所需权限                       |
| **authData**    | Record<string, any>           | -      | 用于检查的权限数据对象         |
| **mode**        | 'AND' \| 'OR'                 | 'OR'   | 如何评估多个权限               |
| **fallback**    | 'hide' \| 'disable' \| 'show' | 'hide' | 权限被拒绝时的操作             |
| **onDenied**    | Function                      | -      | 权限被拒绝时的回调             |

### v-debounce - 防抖指令

防止快速函数调用，在指定时间内只执行最后一次触发。

::: code-group

```vue [防抖使用]
<template>
  <!-- 基本防抖 -->
  <button v-debounce="handleClick">防抖按钮</button>
  
  <!-- 自定义延迟时间 -->
  <input v-debounce:input.500="handleInput" placeholder="输入搜索" />
  
  <!-- 高级配置 -->
  <button v-debounce="{
    handler: handleSubmit,
    delay: 1000,
    immediate: false
  }">
    提交表单
  </button>
</template>

<script setup>
const handleClick = () => console.log('点击处理')
const handleInput = (e) => console.log('搜索:', e.target.value)
const handleSubmit = () => console.log('表单提交')
</script>
```

:::

### v-drag - 拖拽指令

使元素可拖动，支持边界限制和拖动手柄。

::: code-group

```vue [拖拽功能]
<template>
  <!-- 基本拖拽 -->
  <div v-drag class="draggable-box">可拖拽的盒子</div>
  
  <!-- 限制拖拽边界 -->
  <div v-drag="{ boundary: true }" class="bounded-drag">
    边界内拖拽
  </div>
  
  <!-- 指定拖拽手柄 -->
  <div v-drag="{ handle: '.drag-handle' }" class="drag-container">
    <div class="drag-handle">拖拽手柄</div>
    <div class="content">内容区域</div>
  </div>
</template>

<style scoped>
.draggable-box {
  width: 100px;
  height: 100px;
  background: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
}

.drag-handle {
  background: #35495e;
  padding: 10px;
  cursor: move;
  color: white;
}
</style>
```

:::

### v-longpress - 长按指令

检测长按交互，可配置持续时间。

::: code-group

```vue [长按检测]
<template>
  <!-- 基本长按 -->
  <button v-longpress="handleLongPress">长按我</button>
  
  <!-- 自定义长按时间 -->
  <div v-longpress:1500="handleCustomLongPress" class="long-press-area">
    长按 1.5 秒触发
  </div>
  
  <!-- 高级配置 -->
  <button v-longpress="{
    handler: handleAdvancedLongPress,
    duration: 2000,
    onStart: () => console.log('开始长按'),
    onCancel: () => console.log('取消长按')
  }">
    高级长按
  </button>
</template>

<script setup>
const handleLongPress = () => console.log('长按触发')
const handleCustomLongPress = () => console.log('自定义长按触发')
const handleAdvancedLongPress = () => console.log('高级长按触发')
</script>
```

:::


## 🛠️ 创建自定义指令

在 Robot Admin 框架中创建新指令非常简单：

### 步骤说明

1. **创建指令文件**：在 `src/directives/modules/` 中创建一个新的 TypeScript 文件（例如，`myDirective.ts`）

2. **实现指令逻辑**：按照以下模式实现指令

3. **自动注册**：指令将自动注册，并在你的组件中作为 `v-myDirective` 可用

::: code-group

```typescript [指令模板]
import type { Directive } from 'vue'

// 可选：为你的指令定义类型
interface MyDirectiveOptions {
  // 你的选项类型
  message?: string
  duration?: number
  onTrigger?: () => void
}

// 实现指令对象
const myDirective: Directive<HTMLElement, MyDirectiveOptions> = {
  // 指令首次绑定到元素时调用
  mounted(el, binding) {
    const options = typeof binding.value === 'object' ? binding.value : {}
    
    // 实现你的指令逻辑
    el.addEventListener('click', () => {
      console.log(options.message || '默认消息')
      options.onTrigger?.()
    })
  },
  
  // 绑定元素的父组件更新时调用
  updated(el, binding) {
    // 更新逻辑
  },
  
  // 指令从元素解绑时调用
  unmounted(el) {
    // 清理逻辑 - 移除事件监听器等
  }
}

export default myDirective
```

```vue [使用自定义指令]
<template>
  <!-- 使用你创建的指令 -->
  <button v-my-directive="{ 
    message: '自定义消息',
    duration: 3000,
    onTrigger: handleTrigger
  }">
    点击测试自定义指令
  </button>
</template>

<script setup>
const handleTrigger = () => {
  console.log('自定义指令被触发')
}
</script>
```

:::

## 🎨 TypeScript 集成

为了在创建或使用指令时提供适当的 TypeScript 支持，框架提供了类型定义：

::: code-group

```typescript [类型定义]
// 创建指令时
export interface MyOptions {
  // 你的指令选项
  text?: string
  delay?: number
  callback?: (value: any) => void
}

// 指令绑定类型
export interface MyBinding {
  value: MyOptions
  modifiers: Record<string, boolean>
  arg?: string
}

// 导出指令时
export default myDirective

// 也为使用者导出类型
export type { MyOptions, MyBinding }
```

:::

这确保了在组件中使用指令时的类型安全。

## 🚀 最佳实践

### 开发指南

| 实践                   | 说明                                       | 重要性  |
| ---------------------- | ------------------------------------------ | ------- |
| **清理资源**           | 在 `unmounted` 钩子中移除事件监听器        | 🔴 关键 |
| **类型化一切**         | 利用 TypeScript 为指令选项提供清晰接口     | 🟡 重要 |
| **提供合理默认值**     | 使指令在最小配置下即可工作                 | 🟡 重要 |
| **添加视觉反馈**       | 在适当情况下提供指令激活时的视觉反馈       | 🟡 重要 |
| **文档化用法**         | 添加清晰的 JSDoc 注释解释指令功能          | 🟡 重要 |

### 使用规范

::: code-group

```typescript [✅ 推荐做法]
// 正确的资源清理
const myDirective: Directive = {
  mounted(el, binding) {
    const handler = () => { /* 处理逻辑 */ }
    el.addEventListener('click', handler)
    
    // 将处理器存储在元素上以便清理
    el._clickHandler = handler
  },
  
  unmounted(el) {
    // 清理事件监听器
    if (el._clickHandler) {
      el.removeEventListener('click', el._clickHandler)
      delete el._clickHandler
    }
  }
}
```

```typescript [❌ 避免的做法]
// 不正确 - 没有清理资源
const badDirective: Directive = {
  mounted(el, binding) {
    // 添加事件监听器但从不清理
    el.addEventListener('click', () => {
      // 处理逻辑
    })
  }
  // 缺少 unmounted 钩子进行清理
}
```

:::

## 📋 指令注册系统

Robot Admin 框架使用自动指令注册系统：

### 工作原理

1. **自动发现**：扫描 `src/directives/modules/` 目录下的所有 `.ts` 文件
2. **自动注册**：在应用程序初始化时自动注册所有指令
3. **命名规范**：文件名转换为指令名（例如：`myDirective.ts` → `v-my-directive`）

<ImgPreview src="robot/guide/17.png" title="指令注册系统" width="80%"/>


### 目录结构

```
src/
├── directives/
│   ├── modules/
│   │   ├── copy.ts
│   │   ├── permission.ts
│   │   ├── debounce.ts
│   │   ├── drag.ts
│   │   ├── longpress.ts
│   │   ├── throttle.ts
│   │   ├── watermark.ts
│   │   └── myDirective.ts  // 你的自定义指令
│   ├── index.ts
│   └── install.ts
```

::: tip 🎯 开发建议
遵循这些实践并利用内置的指令系统，你可以创建强大、可重用的 DOM 操作，增强应用程序功能的同时保持代码质量。指令是 Vue.js 中直接操作 DOM 的推荐方式，合理使用可以大大提升用户体验。
:::

---

<!-- GitHub徽章组件 -->
<GitHubBadges />

<style>
.hero-banner {
  background: linear-gradient(135deg, #4fc08d 0%, #42b883 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  color: white;
  margin: 2rem 0;
}

.hero-banner h2 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.hero-banner p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-banner h2 {
    font-size: 1.5rem;
  }
}
</style>