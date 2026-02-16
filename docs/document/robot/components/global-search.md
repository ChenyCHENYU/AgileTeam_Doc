---
outline: 'deep'
---

# C_GlobalSearch 搜索面板组件

> 🔍 全局搜索面板，提供快速导航菜单搜索和历史记录功能

## ✨ 特性

- **⌨️ 快捷键支持**: Ctrl+K 快速唤起搜索
- **🔎 实时搜索**: 输入即搜，支持关键词高亮
- **📚 搜索历史**: 自动记录最近搜索，支持快速访问
- **🎯 键盘导航**: 完整的键盘操作支持，无需鼠标
- **🎨 主题适配**: 自动适应暗色/亮色主题
- **💾 本地存储**: 搜索历史持久化保存（最多 10 条，显示最近 5 条）
- **🚀 路由跳转**: 智能处理父子菜单导航（有子菜单时自动跳转第一个子菜单）

## 🏗️ 架构

组件采用 **薄 UI 壳 + 厚 Composable 引擎** 架构：

| 文件                 | 职责                                     | 行数 |
| -------------------- | ---------------------------------------- | ---- |
| `index.vue`          | 模板渲染（无 props，纯 composable 驱动） | ~230 |
| `useGlobalSearch.ts` | 搜索/历史/键盘导航/对话框控制/快捷键     | ~240 |
| `globalSearch.d.ts`  | SearchMenuItem / HistoryItem 类型定义    | ~20  |
| `index.scss`         | 样式                                     | ~743 |

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_GlobalSearch />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <!-- 在头部工具栏使用 -->
  <div class="header-toolbar">
    <C_GlobalSearch />
    <C_UserAvatar />
    <C_ThemeSwitch />
  </div>
</template>
```

### 配合路由使用

```javascript
// router/index.js
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: '工作台',
      icon: 'mdi:view-dashboard',
    },
  },
  {
    path: '/user',
    component: UserLayout,
    meta: {
      title: '用户管理',
      icon: 'mdi:account',
    },
    children: [
      {
        path: 'list',
        component: UserList,
        meta: { title: '用户列表' },
      },
    ],
  },
]
```

## 📖 API 文档

### Props

组件无对外暴露的 props，通过内部 `useGlobalSearch` composable 管理所有状态。

### Store 依赖

| Store               | 说明     | 主要属性                     |
| ------------------- | -------- | ---------------------------- |
| **themeStore**      | 主题管理 | `isDark` — 暗色模式状态      |
| **permissionStore** | 权限管理 | `showMenuListGet` — 菜单数据 |

### 快捷键

| 快捷键           | 功能       | 使用场景               |
| ---------------- | ---------- | ---------------------- |
| **Ctrl/Cmd + K** | 打开搜索   | 全局（组件挂载后注册） |
| **↑↓**           | 上下导航   | 搜索面板内             |
| **Enter**        | 选择当前项 | 搜索面板内             |
| **ESC**          | 关闭面板   | 搜索面板内             |

### 数据结构

```typescript
/** 全局搜索菜单项 */
interface SearchMenuItem {
  key: string // 路由路径
  label: string // 菜单标题
  icon?: any // 图标组件
  children?: MenuOption[] // 子菜单
}

/** 搜索历史记录项 */
interface HistoryItem {
  query: string // 搜索关键词
  menuItem: {
    // 关联的菜单项
    key: string
    label: string
    icon?: any
    children?: any[]
  } | null
  timestamp: number // 时间戳
}
```

### 内部行为说明

| 行为           | 说明                                                               |
| -------------- | ------------------------------------------------------------------ |
| **菜单扁平化** | 将嵌套菜单树递归展平为一维数组，使所有层级菜单都可搜索             |
| **搜索匹配**   | 同时匹配 `label`（菜单标题）和 `key`（路由路径）                   |
| **父菜单跳转** | 点击有子菜单的项时，自动跳转到第一个子菜单路由                     |
| **历史存储**   | 使用 `localStorage`，key 为 `robot-search-history`，最多保存 10 条 |
| **重复历史**   | 相同 query + 相同 menuItem.key 的记录不会重复添加                  |

## 🎨 使用示例

### 场景 1: 标准头部集成

::: details 🔗 查看标准头部集成代码

```vue
<template>
  <NLayoutHeader>
    <div class="header-container">
      <div class="header-left">
        <Logo />
        <C_Breadcrumb />
      </div>

      <div class="header-center">
        <C_GlobalSearch />
      </div>

      <div class="header-right">
        <C_Notification />
        <C_UserMenu />
      </div>
    </div>
  </NLayoutHeader>
</template>

<style scoped>
  .header-center {
    flex: 1;
    max-width: 600px;
    margin: 0 auto;
  }
</style>
```

:::

### 场景 2: 搜索历史管理

::: details 📚 查看搜索历史管理代码

```vue
<script setup>
  // 查看所有历史
  const viewAllHistory = () => {
    const history = JSON.parse(
      localStorage.getItem('robot-search-history') || '[]'
    )
    console.table(history)
  }

  // 导出历史记录
  const exportHistory = () => {
    const history = localStorage.getItem('robot-search-history') || '[]'
    const blob = new Blob([history], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `search-history-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
</script>
```

:::

## 🎨 样式定制

### 自定义主题样式

::: details 🎨 查看自定义主题样式代码

```scss
.robot-search-palette {
  // 触发按钮样式
  .robot-search-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-color: var(--n-primary-color);
      transform: translateY(-1px);
    }

    &.trigger-dark {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
}

// 对话框样式
.robot-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
}

.robot-dialog-container {
  width: 90%;
  max-width: 600px;
  max-height: 70vh;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  &.dialog-dark {
    background: #1e1e1e;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

// 搜索结果高亮
.robot-highlight {
  background: var(--n-warning-color);
  padding: 0 2px;
  border-radius: 2px;
}
```

:::

### 响应式适配

::: details 📱 查看响应式适配代码

```scss
@media (max-width: 768px) {
  .robot-search-trigger {
    .robot-trigger-text,
    .robot-trigger-shortcut {
      display: none;
    }
  }

  .robot-dialog-container {
    width: 95%;
    max-height: 80vh;
    margin-top: 5vh;
  }

  .robot-footer-actions {
    display: none;
  }
}
```

:::

## 🐛 常见问题

::: details ❓ Q1: 快捷键不生效？

**A1:** 组件内部在 `onMounted` 中注册了 `Ctrl/Cmd + K` 全局监听，并自动 `preventDefault`。如果有其他组件也监听了相同快捷键，可能会冲突。

:::

::: details ❓ Q2: 搜索历史丢失？

**A2:** 历史记录存储在 `localStorage`，key 为 `robot-search-history`。检查浏览器是否启用了 localStorage。

:::

::: details ❓ Q3: 搜索结果不准确？

**A3:** 搜索同时匹配菜单标题（label）和路由路径（key）。确保 `permissionStore.showMenuListGet` 返回的菜单数据经过 `normalizeMenuOptions` 正确处理。

:::

::: details ❓ Q4: 点击父菜单无响应？

**A4:** 组件会智能处理父菜单，当菜单项有子菜单时，自动跳转到第一个子菜单路由：

```javascript
// 内部逻辑
if (item.children?.length) {
  const firstChild = item.children[0]
  router.push(firstChild.key)
}
```

:::

## 🎯 最佳实践

### 1. 菜单数据规范

```javascript
// 确保菜单项有必要字段
const validateMenuItem = item => ({
  key: item.key || item.path || '/',
  label: item.label || item.title || '未命名',
  icon: item.icon || undefined,
  children: item.children || [],
})
```

### 2. 用户体验优化

```javascript
// 记录用户偏好
const userPreferences = {
  recordClick(menuKey) {
    const clicks = JSON.parse(localStorage.getItem('menu-clicks') || '{}')
    clicks[menuKey] = (clicks[menuKey] || 0) + 1
    localStorage.setItem('menu-clicks', JSON.stringify(clicks))
  },

  getFrequentMenus(limit = 5) {
    const clicks = JSON.parse(localStorage.getItem('menu-clicks') || '{}')
    return Object.entries(clicks)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([key]) => key)
  },
}
```

## 📝 更新日志

### v2.0.0 (2026-02-17)

- ♻️ 重构为薄 UI 壳 + `useGlobalSearch` composable 架构
- ♻️ 类型定义迁移到 `types/modules/globalSearch.d.ts`
- ♻️ script 逻辑从 ~150 行缩减到 ~15 行（纯 composable 解构）

### v1.0.0 (2025-05-26)

- ✨ 初始版本发布
- ✨ 基础搜索功能
- ✨ 搜索历史记录
- ✨ 键盘导航支持
- ✨ 快捷键绑定
- ✨ 主题适配
- ✨ 高亮匹配文本

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 搜索面板组件提供了类似 VS Code 的命令面板体验，通过 Ctrl+K 快速唤起，支持实时搜索菜单并记录搜索历史。组件完全支持键盘操作，搜索历史自动保存在 localStorage 中。
