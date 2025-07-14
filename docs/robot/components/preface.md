---
outline: 'deep'
---

# 🚀 Robot Admin 组件库

<div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-12 my-8 text-center text-white">
  <h1 class="text-4xl font-bold mb-4 leading-tight">
    <span class="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">重新定义</span><br>
    企业级组件开发体验
  </h1>
  <div class="text-lg opacity-90 leading-relaxed space-y-2">
    <p>- 当极致性能遇上保姆设计，当类型安全拥抱开发效率，你可以拥抱一下我</p>
    <p>- 先提供 30+ 精心打磨的组件，让每一个都是生产级的高效武器</p>
    <p>- 我会持续维护和完善，最后，希望你用得愉快！</p>
  </div>
</div>

::: tip ✨ 设计理念
Robot Admin 组件库不仅仅是功能的集合，更是开发奔赴业务驱动的体现。我们相信**好的组件应该让开发者专注于业务逻辑，而不是重复造轮子**。
:::

## 🎯 为什么选择 Robot Admin 组件？

::: details ⚡ 极致性能

- **零毫秒级响应** - 基于 Vue 3.5 Composition API
- **按需加载** - Tree Shaking 自动优化
- **虚拟滚动** - 大数据量流畅渲染
- **智能缓存** - 减少不必要的重渲染
  :::

::: details 🛡️ 类型安全

- **完整 TypeScript 支持** - 100% 类型覆盖
- **智能代码提示** - IDE 开发体验拉满
- **编译时检查** - 运行前发现问题
- **接口约束** - 杜绝传参错误
  :::

::: details 🎨 设计一致

- **统一设计语言** - 基于 Naive UI 设计规范
- **主题定制** - 深色/浅色模式无缝切换
- **响应式布局** - 移动端完美适配
- **动画流畅** - 60fps 的视觉体验
  :::

::: details 🔧 开箱即用

- **零配置启动** - 导入即可使用
- **完整文档** - 每个组件都有详细示例
- **最佳实践** - 内置业务场景解决方案
- **持续维护** - 跟进最新技术趋势
  :::

## 📊 组件统计

<ElTable :data="componentStats" stripe>
  <ElTableColumn prop="category" label="类别" width="180" />
  <ElTableColumn prop="count" label="数量" width="100" />
  <ElTableColumn prop="description" label="描述" />
  <ElTableColumn prop="status" label="状态" width="120" />
</ElTable>

::: info 📈 持续更新
我们每月都会新增 2-3 个组件，并不断优化现有组件的性能和功能。所有组件都经过**严格测试**，测试覆盖率达到 **85%+**。
:::

## 🎪 组件亮点

::: details 🔥 C_Form - 动态表单引擎

- 🔥 **8 种布局模式** - 满足各种业务场景
- ⚡ **动态生成** - JSON 配置驱动
- 🛡️ **完整校验** - 支持复杂验证规则
- 🎨 **响应式设计** - 移动端完美适配
  :::

::: details 🚀 C_Table - 超级表格

- 🚀 **虚拟滚动** - 万级数据流畅渲染
- 🔍 **高级搜索** - 多条件组合筛选
- 📊 **数据导出** - Excel/CSV 一键导出
- 🎯 **自定义列** - 灵活的列配置
  :::

::: details 📝 C_Editor - 编辑器家族

- 📝 **富文本编辑器** - 基于 WangEditor
- 💻 **代码编辑器** - 多语言语法高亮
- 📖 **Markdown 编辑器** - 实时预览
- 🎨 **JSON 编辑器** - 结构化数据编辑
  :::

:eyes:`还有更多不在一一赘述，你自行看着文档和代码开荒吧，伙计。`

## 🎯 自定义指令集合

<ElTable :data="directiveData" stripe>
  <ElTableColumn prop="directive" label="指令" width="150" />
  <ElTableColumn prop="description" label="功能描述" />
  <ElTableColumn prop="usage" label="使用场景" />
</ElTable>

::: warning 🔥 性能提示
所有指令都经过**性能优化**，使用了事件委托和智能缓存，不会对页面性能造成影响。
:::

## 🛠️ 技术架构

<div class="vp-feature-container">

<ElCard class="vp-feature-card">
  <div class="vp-feature-header">
    <span class="vp-feature-icon">🚀</span>
    <h4>Vue 3.5.13</h4>
    <span class="vp-badge">框架核心</span>
  </div>
  <p>最新的 Vue 3 版本，Composition API 提供更好的逻辑复用和组件组合能力</p>
</ElCard>

<ElCard class="vp-feature-card">
  <div class="vp-feature-header">
    <span class="vp-feature-icon">🛡️</span>
    <h4>TypeScript 5.8</h4>
    <span class="vp-badge">类型安全</span>
  </div>
  <p>完整的类型安全支持，100% 类型覆盖，智能代码提示，编译时错误检查</p>
</ElCard>

<ElCard class="vp-feature-card">
  <div class="vp-feature-header">
    <span class="vp-feature-icon">🎨</span>
    <h4>Naive UI 2.41</h4>
    <span class="vp-badge">UI 框架</span>
  </div>
  <p>现代化的 Vue 3 组件库，提供丰富的基础组件和完整的主题定制系统</p>
</ElCard>

<ElCard class="vp-feature-card">
  <div class="vp-feature-header">
    <span class="vp-feature-icon">⚡</span>
    <h4>UnoCSS 66.0</h4>
    <span class="vp-badge">样式引擎</span>
  </div>
  <p>即时原子化 CSS 引擎，按需生成样式，极致性能的现代化样式解决方案</p>
</ElCard>

</div>

## 🎨 使用体验

::: code-group

```vue [基础使用]
<template>
  <C_Form :config="formConfig" v-model="formData" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import type { FormConfig } from '@robot-admin/types'

const formConfig: FormConfig = {
  layout: 'grid',
  columns: 2,
}
</script>
```

```typescript [按需导入]
// 组件按需导入示例
import { C_Form, C_Table, C_Editor } from '@robot-admin/components'
// 在项目中直接使用的话，已经配置了自动导入

// 自动 Tree Shaking，只打包使用的组件
// 最终 Bundle 体积 < 2MB
```

:::

## 🚀 快速开始

::: code-group

```bash [NPM 安装]
# 独立组件库（规划中）
npm install @robot-admin/components
```

```bash [本地开发]
# 克隆项目
git clone https://github.com/ChenyCHENYU/robot_admin.git

# 极速安装（推荐使用 Bun）
bun install

# 启动项目
bun dev
```

```bash [在线体验]
# 访问在线 Demo
https://www.robotadmin.cn/
```

:::

::: info 🎯 下一步
准备好探索每个组件的强大功能了吗？让我们从**基础组件**开始，一步步构建你的企业级应用！
:::

---

<div class="bg-gradient-to-r from-pink-400 to-red-500 rounded-xl p-8 text-center text-white my-12">
  <p class="text-lg leading-relaxed m-0">
    <strong>🤖 Robot Admin</strong> - 让组件开发变得简单而优雅<br>
    <em>"好的组件不仅要功能强大，更要让开发者用得轻松愉快"</em>
  </p>
</div>

<style scoped>
.vp-feature-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.vp-feature-card {
  padding: 1.5rem;
}

.vp-feature-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.vp-feature-icon {
  font-size: 1.5rem;
}

.vp-feature-header h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.vp-badge {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
}

.vp-feature-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 0.9rem;
}
</style>

<script setup>
const componentStats = [
  { category: '🏗️ 基础组件', count: '12+', description: '表单、表格、布局等核心组件', status: '✅ 稳定' },
  { category: '🎨 展示组件', count: '8+', description: '图表、进度、标签等展示组件', status: '✅ 稳定' },
  { category: '✏️ 编辑器', count: '6+', description: '富文本、代码、Markdown 编辑器', status: '✅ 稳定' },
  { category: '🛠️ 功能组件', count: '10+', description: '上传、下载、导入导出等工具', status: '✅ 稳定' },
  { category: '🎪 自定义指令', count: '7+', description: '防抖、节流、权限等实用指令', status: '✅ 稳定' }
]

const directiveData = [
  { directive: 'v-copy', description: '一键复制到剪贴板', usage: '复制文本、链接、代码' },
  { directive: 'v-watermark', description: '页面水印保护', usage: '防截图、版权保护' },
  { directive: 'v-draggable', description: '元素拖拽排序', usage: '列表排序、布局调整' },
  { directive: 'v-debounce', description: '防抖优化', usage: '搜索框、按钮防重复' },
  { directive: 'v-throttle', description: '节流控制', usage: '滚动事件、窗口缩放' },
  { directive: 'v-longpress', description: '长按触发', usage: '移动端交互、快捷操作' },
  { directive: 'v-permission', description: '权限控制', usage: '按钮级权限管理' }
]
</script>
