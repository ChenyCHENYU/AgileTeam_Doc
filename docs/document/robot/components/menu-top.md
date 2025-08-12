---
outline: 'deep'
---

# C_MenuTop 菜单顶部区域组件

> 🎨 侧边栏顶部 Logo 展示组件，支持视频动画和响应式折叠

## ✨ 特性

- **🎬 视频 Logo**: 支持 WebM 格式视频作为动态 Logo
- **📱 响应式折叠**: 自动检测父容器宽度，智能切换展示状态
- **✨ 视觉效果**: 光晕背景、渐变装饰、动画效果
- **🎨 主题适配**: 支持深色/浅色主题切换
- **🔄 平滑过渡**: 所有状态变化都有流畅的过渡动画
- **💫 交互反馈**: 悬停效果增强用户体验

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_MenuTop />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <!-- 在侧边栏顶部使用 -->
  <NLayoutSider>
    <C_MenuTop />
    <C_Menu :data="menuData" />
  </NLayoutSider>
</template>
```

### 配合菜单折叠

```vue
<template>
  <NLayoutSider
    :collapsed="collapsed"
    :collapsed-width="64"
    :width="240"
  >
    <!-- 组件会自动检测折叠状态 -->
    <C_MenuTop />
    
    <C_Menu 
      :data="menuData"
      :collapsed="collapsed"
    />
  </NLayoutSider>
</template>

<script setup>
const collapsed = ref(false)
</script>
```

## 📖 工作原理

### 自动折叠检测

组件通过 `ResizeObserver` 监听父容器宽度变化：

- **展开状态**: 父容器宽度 > 80px，显示完整 Logo 和文字
- **折叠状态**: 父容器宽度 ≤ 80px，仅显示 Logo，隐藏文字

### 组件结构

```
C_MenuTop
├── 背景装饰层（渐变效果）
├── Logo 容器
│   ├── 光晕背景
│   └── 视频 Logo
├── 分隔线（折叠时隐藏）
└── 文字内容（折叠时隐藏）
    ├── 主标题: Robot Admin
    └── 副标题: 机器人管理系统
```

## 🎨 使用示例

### 场景 1: 标准侧边栏布局

```vue
<template>
  <NLayout has-sider>
    <NLayoutSider
      bordered
      :collapsed="collapsed"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
      :inverted="inverted"
    >
      <!-- 菜单顶部 Logo 区域 -->
      <C_MenuTop />
      
      <!-- 导航菜单 -->
      <C_Menu 
        :data="menuData"
        :collapsed="collapsed"
        :inverted="inverted"
      />
      
      <!-- 底部折叠按钮 -->
      <div class="menu-footer">
        <NButton @click="collapsed = !collapsed">
          <C_Icon :name="collapsed ? 'MenuUnfold' : 'MenuFold'" />
        </NButton>
      </div>
    </NLayoutSider>

    <NLayout>
      <RouterView />
    </NLayout>
  </NLayout>
</template>

<script setup>
const collapsed = ref(false)
const inverted = ref(true)

const menuData = [
  // 菜单配置
]
</script>

<style scoped>
.menu-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}
</style>
```

### 场景 2: 自定义 Logo 视频

::: details 🎬 查看自定义 Logo 视频代码
```vue
<template>
  <C_MenuTop />
</template>

<script setup>
// 替换视频文件：
// 1. 将新的 logo 视频放置在 public 目录
// 2. 命名为 menu-top-logo.webm
// 3. 视频建议规格：
//    - 格式: WebM (VP9 编码)
//    - 尺寸: 80x80px 或等比例
//    - 时长: 2-5秒循环
//    - 文件大小: < 500KB
</script>
```
:::

### 场景 3: 配合主题切换

::: details 🌙 查看主题切换配合代码
```vue
<template>
  <div class="app-layout">
    <!-- 根据主题自动调整背景色 -->
    <NLayoutSider
      :inverted="themeStore.isDark"
    >
      <C_MenuTop />
    </NLayoutSider>
    
    <!-- 主题切换按钮 -->
    <NButton @click="toggleTheme">
      <C_Icon :name="themeStore.isDark ? 'Sun' : 'Moon'" />
    </NButton>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleDark()
}
</script>
```
:::

## 🎨 样式定制

### 修改文字内容

::: details ✏️ 查看文字内容修改代码
```scss
// index.scss
.text-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  font-weight: 700;
}

.text-subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 12px;
  letter-spacing: 2px;
}
```
:::

### 自定义动画效果

::: details ✨ 查看自定义动画效果代码
```scss
// 光晕脉冲动画
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1.1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.15);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

// 背景微光动画
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(100, 108, 255, 0.1) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}
```
:::

### 主题颜色配置

::: details 🎨 查看主题颜色配置代码
```javascript
// 在组件中修改背景色逻辑
const menuBgColor = computed(() => {
  // 自定义颜色方案
  const colorScheme = {
    dark: '#0d1425',      // 深色主题背景
    light: '#f0f2f5',     // 浅色主题背景
    blue: '#001529',      // 蓝色主题
    purple: '#1f1235',    // 紫色主题
  }
  
  return colorScheme[themeStore.currentTheme] || colorScheme.dark
})
```
:::

## ⚙️ 高级配置

### 视频 Logo 配置要求

| 属性 | 推荐值 | 说明 |
| --- | --- | --- |
| **格式** | WebM (VP9) | 兼容性好，文件小 |
| **尺寸** | 40x40px | 适配折叠和展开状态 |
| **时长** | 2-5秒 | 循环播放不会太快 |
| **文件大小** | < 500KB | 保证加载速度 |
| **背景** | 透明 | 适配不同主题 |

### 视频优化建议

::: details 🎞️ 查看视频优化建议代码
```bash
# 使用 FFmpeg 优化视频
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -vf "scale=80:80" -an -auto-alt-ref 0 \
  output.webm
```
:::

### 降级方案

::: details 🔄 查看降级方案代码
```vue
<template>
  <!-- 为不支持视频的浏览器提供降级方案 -->
  <div class="logo-container">
    <video
      v-if="supportsVideo"
      src="/menu-top-logo.webm"
      ...
    />
    <img
      v-else
      src="/logo.png"
      alt="Logo"
      class="logo-fallback"
    />
  </div>
</template>

<script setup>
// 检测视频支持
const supportsVideo = ref(true)

onMounted(() => {
  const video = document.createElement('video')
  supportsVideo.value = video.canPlayType('video/webm') !== ''
})
</script>
```
:::

## 🐛 常见问题

### Q1: 视频 Logo 不显示？

**A1:** 检查以下几点：

::: details 查看解决方案代码
```javascript
// 1. 确认文件路径正确
// 文件应放在 public 目录下
// public/menu-top-logo.webm

// 2. 检查视频格式支持
const checkVideoSupport = () => {
  const video = document.createElement('video')
  console.log('WebM 支持:', video.canPlayType('video/webm'))
}

// 3. 检查控制台网络请求
// 确保视频文件成功加载
```
:::

### Q2: 折叠检测不准确？

**A2:** 确保父容器有明确的宽度：

::: details 查看解决方案代码
```vue
<!-- ✅ 正确：父容器有明确宽度 -->
<NLayoutSider
  :collapsed="collapsed"
  :collapsed-width="64"
  :width="240"
>
  <C_MenuTop />
</NLayoutSider>

<!-- ❌ 错误：父容器宽度不明确 -->
<div style="width: auto">
  <C_MenuTop />
</div>
```
:::

### Q3: 主题切换后颜色不变？

**A3:** 确保正确使用主题 store：

::: details 查看解决方案代码
```javascript
// 确保 themeStore 正确初始化
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()

// 监听主题变化
watch(() => themeStore.isDark, (isDark) => {
  console.log('主题切换:', isDark ? '深色' : '浅色')
})
```
:::

## 🎯 最佳实践

### 1. 视频资源优化

```javascript
// 预加载视频资源
const preloadVideo = () => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'video'
  link.href = '/menu-top-logo.webm'
  document.head.appendChild(link)
}

onMounted(() => {
  preloadVideo()
})
```

### 2. 性能优化

```vue
<script setup>
// 使用防抖优化 resize 监听
import { debounce } from 'lodash-es'

const updateCollapsedState = debounce(() => {
  if (menuContainer.value) {
    isCollapsed.value = menuContainer.value.parentElement!.offsetWidth <= 80
  }
}, 100)
</script>
```

### 3. 无障碍支持

```vue
<template>
  <div
    role="banner"
    aria-label="应用 Logo 和标题"
    class="menu-top"
  >
    <video
      aria-hidden="true"
      ...
    />
    <div aria-label="Robot Admin 机器人管理系统">
      <!-- 文字内容 -->
    </div>
  </div>
</template>
```

## 📝 更新日志

### v1.0.0 (2025-05-19)

- ✨ 初始版本发布
- ✨ 支持视频 Logo
- ✨ 自动折叠检测
- ✨ 主题适配
- ✨ 动画效果
- ✨ 响应式设计

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 菜单顶部组件专为侧边栏设计，通过视频 Logo 和动画效果提升视觉体验。组件会自动检测父容器宽度变化，在折叠时智能隐藏文字内容，只保留 Logo。配合渐变背景和光晕效果，为应用增添现代感和科技感。