---
outline: 'deep'
---

# C_Icon 通用图标组件

> 🎨 支持多种图标使用方式的通用图标组件，让图标使用更简单、更统一

## 🚀 在线演示

<DemoIframe src="/preview/icon" title="图标展示" height="700" />


## 🚀 特性

- **🔥 多种图标类型支持**: Iconify、UnoCSS、组件、SVG、图片
- **🎯 统一错误处理**: 智能错误提示，支持回退机制
- **♿ 无障碍支持**: 完整的 ARIA 标签和键盘导航
- **🎨 灵活样式**: 支持颜色、大小、旋转、翻转等自定义
- **⚡ 性能优化**: 懒加载、错误边界、内存优化
- **🧪 开发友好**: TypeScript 支持，详细的错误提示

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 已集成在项目中，无需单独安装
# 确保已安装依赖
bun install @iconify/vue
```

```bash [pnpm]
# 已集成在项目中，无需单独安装
# 确保已安装依赖
pnpm install @iconify/vue
```

```bash [yarn]
# 已集成在项目中，无需单独安装
# 确保已安装依赖
yarn add @iconify/vue
```

```bash [npm]
# 已集成在项目中，无需单独安装
# 确保已安装依赖
npm install @iconify/vue
```

:::

## 🎯 快速开始

### 基础使用

```vue {3,6}
<template>
  <!-- 最简单的使用方式 -->
  <C_Icon name="mdi:home" />

  <!-- 指定大小和颜色 -->
  <C_Icon name="mdi:heart" :size="24" color="red" />
</template>
```

### 五种图标类型

```vue {3-4,7,10,14-15,19}
<template>
  <!-- 1. Iconify 图标 (默认推荐) -->
  <C_Icon name="mdi:account" />
  <C_Icon name="heroicons:user-solid" />

  <!-- 2. UnoCSS 图标 -->
  <C_Icon type="unocss" name="i-mdi-home" />

  <!-- 3. 组件图标 -->
  <C_Icon type="component" :name="CustomIconComponent" />

  <!-- 4. SVG 路径 -->
  <C_Icon
    type="svg"
    svg-path="M12 2L2 7V10C2 16 7 21 12 21S22 16 22 10V7L12 2Z"
  />

  <!-- 5. 图片图标 -->
  <C_Icon type="image" name="/assets/icons/custom-icon.png" alt="自定义图标" />
</template>
```

## 📖 API 文档

### Props

| 参数               | 类型                                                       | 默认值           | 说明                                |
| ------------------ | ---------------------------------------------------------- | ---------------- | ----------------------------------- |
| **name**           | `string \| any`                                            | -                | 图标名称/路径/组件实例              |
| **type**           | `'iconify' \| 'unocss' \| 'component' \| 'svg' \| 'image'` | `'iconify'`      | 图标类型                            |
| **color**          | `string`                                                   | `'currentColor'` | 图标颜色                            |
| **size**           | `number \| string`                                         | `18`             | 图标大小(px)                        |
| **svgPath**        | `string`                                                   | `''`             | SVG 路径数据(仅 type=svg 时使用)    |
| **viewBox**        | `string`                                                   | `'0 0 24 24'`    | SVG viewBox(仅 type=svg 时使用)     |
| **alt**            | `string`                                                   | `''`             | 图片 alt 属性(仅 type=image 时使用) |
| **clickable**      | `boolean`                                                  | `false`          | 是否可点击                          |
| **loading**        | `boolean`                                                  | `false`          | 加载状态                            |
| **fallbackIcon**   | `string`                                                   | `''`             | 错误时的回退图标                    |
| **title**          | `string`                                                   | `''`             | 工具提示                            |
| **ariaLabel**      | `string`                                                   | `''`             | 无障碍标签                          |
| **customClass**    | `string`                                                   | `''`             | 自定义样式类                        |
| **rotate**         | `number`                                                   | `0`              | 旋转角度                            |
| **flip**           | `'horizontal' \| 'vertical' \| 'both'`                     | -                | 翻转方向                            |
| **componentProps** | `Record<string, any>`                                      | `{}`             | 传递给组件的额外属性                |

### Events

| 事件名    | 参数                          | 说明         |
| --------- | ----------------------------- | ------------ |
| **click** | `(event: MouseEvent)`         | 点击事件     |
| **error** | `(type: string, error?: any)` | 错误事件     |
| **load**  | `()`                          | 加载完成事件 |

### 暴露方法

| 方法名           | 参数 | 返回值             | 说明         |
| ---------------- | ---- | ------------------ | ------------ |
| **validate**     | -    | `void`             | 重新验证配置 |
| **hasError**     | -    | `Ref<boolean>`     | 是否有错误   |
| **errorMessage** | -    | `Ref<string>`      | 错误信息     |
| **el**           | -    | `Ref<HTMLElement>` | DOM 引用     |

## 🎨 使用示例

::: details 💡 导航菜单 - 可点击的导航图标
```vue 
<template>
  <nav class="nav-menu">
    <C_Icon
      name="mdi:home"
      :size="20"
      color="var(--primary-color)"
      clickable
      @click="handleNavClick('home')"
    />
    <C_Icon
      name="mdi:account"
      :size="20"
      clickable
      @click="handleNavClick('profile')"
    />
  </nav>
</template>

<script setup>
const handleNavClick = (route) => {
  console.log('导航到:', route)
  // 路由跳转逻辑
}
</script>
```
:::

::: details ⏳ 加载状态 - 动态加载效果
```vue
<template>
  <div class="loading-demo">
    <C_Icon
      name="mdi:loading"
      :size="24"
      color="blue"
      :loading="isLoading"
      :rotate="isLoading ? 360 : 0"
    />
    <span>{{ isLoading ? '加载中...' : '加载完成' }}</span>
  </div>
</template>

<script setup>
const isLoading = ref(true)

// 模拟异步加载
setTimeout(() => {
  isLoading.value = false
}, 3000)
</script>
```
:::

::: details ⚠️ 错误处理 - 智能回退机制
```vue 
<template>
  <div class="error-demo">
    <C_Icon
      name="invalid-icon-name"
      fallback-icon="mdi:alert"
      @error="handleIconError"
    />
  </div>
</template>

<script setup>
const handleIconError = (type, error) => {
  console.log(`图标加载失败: ${type}`, error)
  // 可以在这里进行错误上报
}
</script>
```
:::

::: details 🎨 自定义组件图标 - 传入 Vue 组件
```vue 
<template>
  <div class="custom-icon-demo">
    <C_Icon
      type="component"
      :name="MyCustomIcon"
      :size="32"
      color="purple"
      :component-props="{ variant: 'filled' }"
    />
  </div>
</template>

<script setup>
import MyCustomIcon from './MyCustomIcon.vue'
</script>
```
:::

## 🛠️ 高级用法

::: details 🔄 动态图标切换 - 点击切换图标和颜色
```vue 
<template>
  <div class="dynamic-icon">
    <C_Icon
      :name="currentIcon"
      :size="28"
      :color="iconColor"
      clickable
      @click="toggleIcon"
    />
  </div>
</template>

<script setup>
const icons = ['mdi:heart-outline', 'mdi:heart']
const colors = ['gray', 'red']
const currentIndex = ref(0)

const currentIcon = computed(() => icons[currentIndex.value])
const iconColor = computed(() => colors[currentIndex.value])

const toggleIcon = () => {
  currentIndex.value = (currentIndex.value + 1) % icons.length
}
</script>
```
:::

::: details 🎬 图标动画效果 - 旋转动画实现
```vue
<template>
  <div class="animated-icon">
    <C_Icon
      name="mdi:sync"
      :size="24"
      :rotate="rotateAngle"
      clickable
      @click="startRotation"
    />
  </div>
</template>

<script setup>
const rotateAngle = ref(0)

const startRotation = () => {
  const animate = () => {
    rotateAngle.value += 5
    if (rotateAngle.value < 360) {
      requestAnimationFrame(animate)
    } else {
      rotateAngle.value = 0
    }
  }
  animate()
}
</script>
```
:::

## 🔧 自定义样式

### CSS 变量

```scss
.c-icon {
  --icon-color: currentColor;
  --icon-hover-color: var(--primary-color);
  --icon-error-color: #ff4757;
  --icon-loading-color: #3742fa;
}
```

### 自定义类

```vue {2,6-13}
<template>
  <C_Icon name="mdi:star" custom-class="my-star-icon" />
</template>

<style scoped>
.my-star-icon {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: gold;
  }
}
</style>
```

## ⚠️ 注意事项

### 1. 图标命名规范

::: code-group

```vue [✅ 推荐] 
<!-- 使用标准前缀 -->
<C_Icon name="mdi:home" />
<C_Icon name="heroicons:user-solid" />
```

```vue [❌ 不推荐]
<!-- 缺少前缀 -->
<C_Icon name="home" />
```

:::

### 2. 性能优化

::: code-group

```vue [✅ 推荐] 
<!-- 合理使用size -->
<C_Icon name="mdi:home" :size="16" />
```

```vue [❌ 不推荐] 
<!-- 过大的图标 -->
<C_Icon name="mdi:home" :size="200" />
```

:::

### 3. 无障碍支持

::: code-group

```vue [✅ 推荐]
<!-- 提供有意义的标签 -->
<C_Icon 
  name="mdi:close" 
  clickable 
  aria-label="关闭弹窗"
  title="关闭" 
/>
```

```vue [❌ 不推荐] 
<!-- 缺少无障碍支持 -->
<C_Icon name="mdi:close" clickable />
```

:::

## 🐛 故障排除

### 常见问题

#### Q1: 图标不显示怎么办？

**A1:** 检查以下几点：

1. 确认图标名称格式正确 (如: `mdi:home`)
2. 检查网络连接 (Iconify 需要网络)
3. 查看控制台错误信息
4. 尝试使用 fallback-icon

```vue {2}
<!-- 使用回退图标 -->
<C_Icon name="可能不存在的图标" fallback-icon="mdi:help" />
```

#### Q2: 图标加载慢怎么办？

**A2:** 可以预加载常用图标：

```javascript {4}
// 在应用启动时预加载
import { preloadIcons } from '@iconify/vue'

preloadIcons(['mdi:home', 'mdi:user', 'mdi:settings'])
```

#### Q3: 如何处理图标错误？

**A3:** 监听错误事件：

```vue {2}
<template>
  <C_Icon name="mdi:home" @error="handleError" />
</template>

<script setup>
const handleError = (type, error) => {
  // 错误处理逻辑
  console.error(`图标错误 [${type}]:`, error)
}
</script>
```

## 🎯 最佳实践

### 1. 统一图标库

::: code-group

```vue [✅ 推荐] {2,3,4}
<!-- 统一使用一个图标库 -->
<C_Icon name="mdi:home" />
<C_Icon name="mdi:user" />
<C_Icon name="mdi:settings" />
```

```vue [❌ 不推荐] {2,3,4}
<!-- 混用不同图标库 -->
<C_Icon name="mdi:home" />
<C_Icon name="heroicons:user" />
<C_Icon name="tabler:settings" />
```

:::

### 2. 响应式设计

```vue {2,6-8}
<template>
  <C_Icon name="mdi:menu" :size="iconSize" />
</template>

<script setup>
const iconSize = computed(() => {
  return window.innerWidth > 768 ? 24 : 20
})
</script>
```

### 3. 主题适配

```vue {2,6-8}
<template>
  <C_Icon name="mdi:sun" :color="themeColor" />
</template>

<script setup>
const themeColor = computed(() => {
  return isDark.value ? '#ffd700' : '#ff6b35'
})
</script>
```

## 📝 更新日志

### v1.0.0 (2025-06-24)

- ✨ 支持 5 种图标类型
- ✨ 完整的错误处理机制
- ✨ 无障碍支持
- ✨ TypeScript 支持
- ✨ 性能优化


<!--@include: ./snippets/contribute.md -->


**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀