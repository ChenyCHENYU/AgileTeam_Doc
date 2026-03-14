---
outline: "deep"
---

# Robot Admin 主题定制详解

<div class="hero-banner">
  <h2>🎨 灵活的主题定制系统</h2>
  <p>支持浅色、深色和系统模式的主题系统，提供程序化主题定制能力</p>
</div>

Robot Admin 应用程序具有灵活的主题系统，支持浅色、深色和基于系统的模式，以及程序化的主题定制。本指南将详细介绍如何在开发工作中使用和扩展主题功能。

## 🎯 主题系统架构

Robot Admin 的主题系统建立在 NaiveUI 的主题功能之上，并进行了自定义扩展。它由以下几个关键组件组成：

| 组件             | 作用                           | 特性                     |
| ---------------- | ------------------------------ | ------------------------ |
| **主题配置**     | 定义主题颜色、样式和组件覆盖   | 结构化配置，易于扩展     |
| **主题存储**     | 管理主题状态、持久性和过渡     | 响应式状态管理           |
| **主题UI组件**   | 提供用于切换主题的用户界面     | 直观的用户交互           |
| **全局主题提供者** | 在整个应用程序中应用主题     | 统一的主题分发           |

### 支持的主题模式

系统支持三种主题模式：

- **浅色模式** - 默认浅色外观
- **深色模式** - 适用于低光环境的深色外观  
- **系统模式** - 自动与用户的系统偏好同步

::: tip 💡 主题特色
主题系统提供平滑的切换过渡效果，自动持久化用户偏好，并支持运行时动态定制。
:::

## 🔄 使用主题切换器

应用程序包含一个内置的主题切换器组件，允许用户循环切换可用的主题模式：

::: code-group

```vue [C_Header/index.vue - 主题切换器使用]
<template>
  <div class="header-actions">
    <!-- 主题切换器自动循环切换模式 -->
    <C_Theme />
  </div>
</template>
```

```vue [C_Theme/index.vue - 主题切换器组件]
<template>
  <div class="theme-toggle" @click="toggleTheme">
    <n-icon size="20">
      <component :is="currentIcon" />
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { s_themeStore } from '@/stores/theme'

const themeStore = s_themeStore()

// 根据当前模式显示不同图标
const currentIcon = computed(() => {
  switch (themeStore.mode) {
    case 'light':
      return 'SunIcon'      // 🌞 浅色模式 - 太阳图标
    case 'dark':
      return 'MoonIcon'     // 🌙 深色模式 - 月亮图标
    case 'system':
      return 'SystemIcon'   // ☀️🌙 系统模式 - 太阳-月亮图标
    default:
      return 'SunIcon'
  }
})

const toggleTheme = () => {
  const modes = ['light', 'dark', 'system']
  const currentIndex = modes.indexOf(themeStore.mode)
  const nextIndex = (currentIndex + 1) % modes.length
  themeStore.setMode(modes[nextIndex])
}
</script>
```

:::

## 🛠️ 主题配置结构

主题配置在 `src/config/theme.ts` 中定义，遵循扩展 NaiveUI 主题系统的结构化格式：

::: code-group

```typescript [theme.ts - 主题配置结构]
// 基本主题结构
interface GlobalThemeOverrides {
  // 应用到整个主题的通用属性
  common?: {
    primaryColor?: string
    primaryColorHover?: string
    primaryColorPressed?: string
    bodyColor?: string
    cardColor?: string
    // 其他通用属性
  }
  
  // 特定组件的主题属性
  Menu?: {
    itemTextColor?: string
    itemColorActive?: string
    arrowColor?: string
    // 其他菜单属性
  }
  
  Button?: {
    textColor?: string
    textColorHover?: string
    // 按钮特定属性
  }
  
  // 其他组件覆盖
}
```

```typescript [theme.ts - 默认主题配置]
// 浅色主题配置
export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#4098fc',
    primaryColorPressed: '#1c7cd8',
    bodyColor: '#ffffff',
    cardColor: '#ffffff',
  },
  Menu: {
    color: '#ffffff',
    itemTextColor: '#333639',
    itemColorActive: '#2080f0',
  },
}

// 深色主题配置
export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2080f0',
    primaryColorHover: '#4098fc',
    primaryColorPressed: '#1c7cd8',
    bodyColor: '#0d1425',
    cardColor: '#18181c',
  },
  Menu: {
    color: '#0d1425',
    itemTextColor: '#e5e7eb',
    itemColorActive: '#2080f0',
  },
}
```

:::

## 🎛️ 程序化主题管理

您可以使用主题存储来程序化管理主题，这在需要自定义主题或响应组件中的用户偏好时非常有用：

### 访问主题存储

::: code-group

```typescript [theme-usage.ts - 主题存储使用]
import { s_themeStore } from '@/stores/theme'

// 在组件中使用
const themeStore = s_themeStore()

// 读取主题信息
const isDarkMode = themeStore.isDark
const currentMode = themeStore.mode
const themeConfig = themeStore.themeOverrides

// 更改主题模式
themeStore.setMode('dark')    // 切换到深色模式
themeStore.setMode('light')   // 切换到浅色模式
themeStore.setMode('system')  // 跟随系统偏好
```

:::

### 自定义主题属性

在运行时自定义主题属性：

::: code-group

```typescript [custom-theme.ts - 自定义主题]
import { s_themeStore } from '@/stores/theme'

const themeStore = s_themeStore()

// 更新主颜色
themeStore.updateThemeOverrides({
  common: {
    primaryColor: '#ff0000',      // 更改为红色
    primaryColorHover: '#ff3333',
    primaryColorPressed: '#cc0000'
  }
})

// 自定义菜单样式
themeStore.updateThemeOverrides({
  Menu: {
    itemTextColor: '#666666',
    itemColorActive: '#ff0000'
  }
})

// 重置为默认主题
themeStore.resetThemeOverrides()
```

```vue [CustomTheme.vue - 主题定制组件示例]
<template>
  <div class="theme-customizer">
    <n-card title="主题定制器">
      <n-space vertical>
        <!-- 主题模式选择 -->
        <n-form-item label="主题模式">
          <n-select
            v-model:value="currentMode"
            :options="modeOptions"
            @update:value="handleModeChange"
          />
        </n-form-item>
        
        <!-- 主色调选择 -->
        <n-form-item label="主色调">
          <n-color-picker
            v-model:value="primaryColor"
            @update:value="handleColorChange"
          />
        </n-form-item>
        
        <!-- 重置按钮 -->
        <n-button @click="resetTheme">
          重置为默认
        </n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { s_themeStore } from '@/stores/theme'

const themeStore = s_themeStore()
const currentMode = ref(themeStore.mode)
const primaryColor = ref('#2080f0')

const modeOptions = [
  { label: '浅色模式', value: 'light' },
  { label: '深色模式', value: 'dark' },
  { label: '跟随系统', value: 'system' }
]

onMounted(() => {
  // 初始化当前主题值
  primaryColor.value = themeStore.themeOverrides.common?.primaryColor || '#2080f0'
})

const handleModeChange = (mode: string) => {
  themeStore.setMode(mode as any)
}

const handleColorChange = (color: string) => {
  themeStore.updateThemeOverrides({
    common: {
      primaryColor: color,
      primaryColorHover: adjustBrightness(color, 10),
      primaryColorPressed: adjustBrightness(color, -10)
    }
  })
}

const resetTheme = () => {
  themeStore.resetThemeOverrides()
  primaryColor.value = '#2080f0'
  currentMode.value = 'system'
}

// 颜色亮度调整工具函数
const adjustBrightness = (color: string, amount: number): string => {
  // 简化的颜色调整逻辑
  return color
}
</script>
```

:::

## 🌍 全局主题应用

主题通过 NaiveUI 的 `NConfigProvider` 在应用程序根目录应用：

::: code-group

```vue [App.vue - 全局主题提供者]
<template>
  <NConfigProvider
    :theme="themeStore.currentTheme"
    :theme-overrides="themeStore.themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="global-config-provider"
  >
    <NLoadingBarProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <RouterView />
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { zhCN, dateZhCN } from 'naive-ui'

const themeStore = useThemeStore()
</script>
```

:::

这确保了所有组件之间的一致性主题应用。

## ✨ 主题过渡效果

主题存储包括内置过渡，以实现平滑的主题切换：

::: code-group

```typescript [theme/index.ts - 主题过渡实现]
// 主题过渡代码
const setMode = async (newMode: ThemeMode) => {
  // 创建过渡样式
  const transitionStyle = document.createElement('style')
  transitionStyle.textContent = `
    /* 全局过渡效果 */
    .layout-container :deep(.n-layout .n-layout-scroll-container),
    .layout-sider, .n-menu, .layout-header, .layout-footer {
      transition: background-color 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* 组件过渡效果 */
    .n-card, .n-button, .n-input {
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
  `
  document.head.appendChild(transitionStyle)
  
  // 设置新模式
  mode.value = newMode
  localStorage.setItem(THEME_MODE_KEY, newMode)
  
  // 更新body类名
  await nextTick()
  updateBodyClass()
  
  // 过渡后清理
  setTimeout(() => {
    document.head.removeChild(transitionStyle)
  }, 750)
}

// 更新body类名
const updateBodyClass = () => {
  if (isDark.value) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}
```

:::

调用 `setMode()` 时，它会自动：
- 为相关元素添加过渡样式
- 应用不透明度过渡以减少视觉闪烁
- 等待过渡完成后再清理

## 🔧 扩展主题系统

### 添加新的主题属性

更新 `theme.ts` 中的 `GlobalThemeOverrides` 接口：

::: code-group

```typescript [extended-theme.ts - 扩展主题]
export interface ExtendedThemeOverrides extends GlobalThemeOverrides {
  common?: {
    // 现有属性
    primaryColor?: string
    primaryColorHover?: string
    
    // 自定义属性  
    accentColor?: string
    cardBackground?: string
    borderRadius?: string
  }
  
  // 添加新的组件覆盖
  CustomComponent?: {
    backgroundColor?: string
    textColor?: string
    borderColor?: string
  }
}

// 使用扩展主题
export const customThemeOverrides: ExtendedThemeOverrides = {
  common: {
    primaryColor: '#2080f0',
    accentColor: '#52c41a',
    cardBackground: '#fafafa',
    borderRadius: '8px'
  },
  CustomComponent: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderColor: '#d9d9d9'
  }
}
```

:::

### 创建主题预设

创建多个预设主题供用户选择：

::: code-group

```typescript [theme-presets.ts - 主题预设]
// 主题预设定义
export const themePresets = {
  default: {
    name: '默认蓝色',
    colors: {
      primaryColor: '#2080f0',
      primaryColorHover: '#4098fc',
      primaryColorPressed: '#1c7cd8'
    }
  },
  
  green: {
    name: '自然绿色',
    colors: {
      primaryColor: '#52c41a',
      primaryColorHover: '#73d13d',
      primaryColorPressed: '#389e0d'
    }
  },
  
  purple: {
    name: '优雅紫色',
    colors: {
      primaryColor: '#722ed1',
      primaryColorHover: '#9254de',
      primaryColorPressed: '#531dab'
    }
  },
  
  orange: {
    name: '活力橙色',
    colors: {
      primaryColor: '#fa8c16',
      primaryColorHover: '#ffa940',
      primaryColorPressed: '#d46b08'
    }
  }
}

// 应用主题预设
export const applyThemePreset = (presetKey: keyof typeof themePresets) => {
  const preset = themePresets[presetKey]
  const themeStore = useThemeStore()
  
  themeStore.updateThemeOverrides({
    common: preset.colors
  })
}
```

:::

## 📋 最佳实践

### 开发建议

| 实践           | 说明                           | 重要性  |
| -------------- | ------------------------------ | ------- |
| **一致性配色** | 使用主题系统统一颜色管理       | 🔴 关键 |
| **平滑过渡**   | 利用内置过渡效果提升体验       | 🟡 重要 |
| **响应式适配** | 确保主题在不同设备上的适配     | 🟡 重要 |
| **用户偏好**   | 尊重并保存用户的主题选择       | 🔴 关键 |

### 主题开发规范

::: code-group

```typescript [theme-best-practices.ts]
// ✅ 推荐的主题使用方式
import { useThemeStore } from '@/stores/theme'

// 1. 响应式获取主题状态
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// 2. 使用主题常量而不是硬编码
const primaryColor = computed(() => 
  themeStore.themeOverrides.common?.primaryColor || '#2080f0'
)

// 3. 条件性样式应用
const cardStyle = computed(() => ({
  backgroundColor: isDark.value ? '#18181c' : '#ffffff',
  borderColor: isDark.value ? '#2d2d30' : '#e0e0e6'
}))

// ❌ 避免的做法
const hardCodedColor = '#2080f0'  // 硬编码颜色
const darkMode = localStorage.getItem('theme') === 'dark'  // 直接访问存储
```

:::

::: tip 🎯 开发建议
Robot Admin 主题系统为创建视觉吸引力和可定制的用户界面提供了坚实的基础。通过利用内置的主题存储和配置系统，可以创建尊重用户偏好的应用程序，同时保持一致的设计语言。对于大多数用例，默认主题模式将足够，而程序化 API 则允许完全自定义满足特定需求。
:::

---

<!-- GitHub徽章组件 -->
<GitHubBadges />

<style>
.hero-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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