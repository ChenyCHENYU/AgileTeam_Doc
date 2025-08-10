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
- **💾 本地存储**: 搜索历史持久化保存
- **🚀 路由跳转**: 智能处理父子菜单导航

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

组件无对外暴露的 props，通过内部状态管理。

### Store 依赖

| Store | 说明 | 主要属性 |
| --- | --- | --- |
| **themeStore** | 主题管理 | `isDark` - 暗色模式状态 |
| **permissionStore** | 权限管理 | `showMenuListGet` - 菜单数据 |

### 快捷键

| 快捷键 | 功能 | 使用场景 |
| --- | --- | --- |
| **Ctrl/Cmd + K** | 打开搜索 | 全局 |
| **↑↓** | 上下导航 | 搜索面板内 |
| **Enter** | 选择当前项 | 搜索面板内 |
| **ESC** | 关闭面板 | 搜索面板内 |

### 数据结构

```typescript
interface SearchMenuItem {
  key: string         // 路由路径
  label: string       // 菜单标题
  icon?: Component    // 图标组件
  children?: MenuOption[]  // 子菜单
}

interface HistoryItem {
  query: string       // 搜索关键词
  menuItem: {         // 关联的菜单项
    key: string
    label: string
    icon?: any
    children?: any[]
  } | null
  timestamp: number   // 时间戳
}
```

## 🎨 使用示例

### 场景 1: 标准头部集成

```vue
<template>
  <NLayoutHeader>
    <div class="header-container">
      <div class="header-left">
        <Logo />
        <C_Breadcrumb />
      </div>
      
      <div class="header-center">
        <!-- 搜索面板 -->
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

### 场景 2: 自定义触发器

```vue
<template>
  <div class="custom-search-trigger">
    <!-- 隐藏默认触发器 -->
    <C_GlobalSearch v-show="false" ref="searchRef" />
    
    <!-- 自定义触发按钮 -->
    <NButton @click="openSearch" quaternary circle>
      <template #icon>
        <NIcon><SearchOutline /></NIcon>
      </template>
    </NButton>
    
    <!-- 或使用输入框样式 -->
    <NInput 
      placeholder="搜索菜单 (Ctrl+K)"
      readonly
      @click="openSearch"
    >
      <template #prefix>
        <NIcon><SearchOutline /></NIcon>
      </template>
    </NInput>
  </div>
</template>

<script setup>
const searchRef = ref()

const openSearch = () => {
  // 触发搜索面板打开
  searchRef.value?.openDialog()
}

// 监听快捷键
onMounted(() => {
  const handleKeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }
  }
  document.addEventListener('keydown', handleKeydown)
  onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
})
</script>
```

### 场景 3: 搜索历史管理

```vue
<template>
  <div class="search-history-manager">
    <NButton @click="viewAllHistory">查看所有历史</NButton>
    <NButton @click="exportHistory">导出历史</NButton>
    <NButton @click="importHistory">导入历史</NButton>
  </div>
</template>

<script setup>
// 查看所有历史
const viewAllHistory = () => {
  const history = JSON.parse(localStorage.getItem('robot-search-history') || '[]')
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

// 导入历史记录
const importHistory = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const text = await file.text()
      localStorage.setItem('robot-search-history', text)
      location.reload() // 重新加载以应用历史
    }
  }
  input.click()
}
</script>
```

### 场景 4: 扩展搜索功能

```vue
<template>
  <C_GlobalSearch ref="searchPaletteRef" />
</template>

<script setup>
import { s_permissionStore } from '@/stores/permission'

const searchPaletteRef = ref()
const permissionStore = s_permissionStore()

// 扩展搜索数据源
const extendedSearchItems = computed(() => {
  const menuItems = permissionStore.showMenuListGet
  const pageActions = [
    { key: '/logout', label: '退出登录', icon: 'mdi:logout' },
    { key: '/profile', label: '个人信息', icon: 'mdi:account' },
    { key: '/settings', label: '系统设置', icon: 'mdi:cog' },
  ]
  
  return [...menuItems, ...pageActions]
})

// 添加搜索命令
const searchCommands = {
  '/theme': () => themeStore.toggleTheme(),
  '/fullscreen': () => document.documentElement.requestFullscreen(),
  '/reload': () => location.reload(),
  '/clear': () => {
    localStorage.clear()
    message.success('缓存已清空')
  },
}

// 监听搜索输入，支持命令
watch(() => searchPaletteRef.value?.searchValue, (value) => {
  if (searchCommands[value]) {
    searchCommands[value]()
    searchPaletteRef.value?.closeDialog()
  }
})
</script>
```

## 🎨 样式定制

### 自定义主题样式

```scss
// index.scss
.robot-search-palette {
  // 触发按钮样式
  .robot-search-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    background: var(--n-color-modal);
    border: 1px solid var(--n-border-color);
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      border-color: var(--n-primary-color);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    // 暗色主题
    &.trigger-dark {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  // 快捷键标签
  .robot-trigger-shortcut {
    margin-left: auto;
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    font-size: 12px;
    font-family: monospace;
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
  background: var(--n-color-modal);
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  // 暗色主题
  &.dialog-dark {
    background: #1e1e1e;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

// 搜索结果高亮
.robot-highlight {
  background: var(--n-warning-color);
  color: var(--n-text-color-base);
  padding: 0 2px;
  border-radius: 2px;
}

// 动画效果
.robot-dialog-enter-active,
.robot-dialog-leave-active {
  transition: all 0.3s ease;
}

.robot-dialog-enter-from,
.robot-dialog-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
```

### 响应式适配

```scss
// 移动端适配
@media (max-width: 768px) {
  .robot-search-trigger {
    // 移动端只显示图标
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
  
  // 简化底部操作提示
  .robot-footer-actions {
    display: none;
  }
}
```

## ⚙️ 高级用法

### 搜索算法优化

```javascript
// 自定义搜索评分算法
const searchWithScore = (items, query) => {
  return items
    .map(item => {
      let score = 0
      const lowerLabel = item.label.toLowerCase()
      const lowerQuery = query.toLowerCase()
      
      // 完全匹配
      if (lowerLabel === lowerQuery) score += 100
      // 开头匹配
      else if (lowerLabel.startsWith(lowerQuery)) score += 50
      // 包含匹配
      else if (lowerLabel.includes(lowerQuery)) score += 20
      // 拼音匹配（需要引入拼音库）
      // else if (toPinyin(lowerLabel).includes(lowerQuery)) score += 10
      
      return { ...item, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
}
```

### 搜索防抖优化

```vue
<script setup>
import { debounce } from 'lodash-es'

// 防抖搜索
const debouncedSearch = debounce((value) => {
  // 执行搜索逻辑
  performSearch(value)
}, 300)

watch(searchValue, (value) => {
  debouncedSearch(value)
})
</script>
```

### 集成快捷命令

```javascript
// 命令模式
const commandPatterns = [
  {
    pattern: /^>/,  // 以 > 开头
    handler: (cmd) => executeCommand(cmd.slice(1)),
  },
  {
    pattern: /^@/,  // 以 @ 开头，搜索用户
    handler: (query) => searchUsers(query.slice(1)),
  },
  {
    pattern: /^#/,  // 以 # 开头，搜索标签
    handler: (query) => searchTags(query.slice(1)),
  },
]

// 处理特殊命令
const handleSpecialCommand = (input) => {
  for (const { pattern, handler } of commandPatterns) {
    if (pattern.test(input)) {
      handler(input)
      return true
    }
  }
  return false
}
```

## 🐛 常见问题

### Q1: 快捷键不生效？

**A1:** 检查是否有其他组件监听了相同快捷键：

```javascript
// ✅ 正确：阻止默认行为
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()  // 重要
    openDialog()
  }
})
```

### Q2: 搜索历史丢失？

**A2:** 检查 localStorage 是否正常：

```javascript
// 检查存储空间
if (!window.localStorage) {
  console.error('浏览器不支持 localStorage')
}

// 检查存储配额
navigator.storage.estimate().then(estimate => {
  console.log('存储使用:', estimate.usage)
  console.log('存储配额:', estimate.quota)
})
```

### Q3: 搜索结果不准确？

**A3:** 确保菜单数据正确规范化：

```javascript
// 使用 normalizeMenuOptions 处理菜单数据
import { normalizeMenuOptions } from '@/utils/d_menu'

const menuData = computed(() => {
  const raw = permissionStore.showMenuListGet
  return normalizeMenuOptions(raw)  // 规范化处理
})
```

### Q4: 点击父菜单无响应？

**A4:** 组件会智能处理父菜单，自动跳转到第一个子菜单：

```javascript
// 组件内部逻辑
if (item.children?.length) {
  // 有子菜单时跳转到第一个子菜单
  const firstChild = item.children[0]
  router.push(firstChild.key)
}
```

## 🎯 最佳实践

### 1. 菜单数据规范

```javascript
// 确保菜单项有必要字段
const validateMenuItem = (item) => ({
  key: item.key || item.path || '/',
  label: item.label || item.title || '未命名',
  icon: item.icon || 'mdi:file-document-outline',
  children: item.children || [],
})
```

### 2. 性能优化

```vue
<script setup>
// 使用计算属性缓存搜索结果
const searchResultsCache = new Map()

const getCachedResults = (query) => {
  if (searchResultsCache.has(query)) {
    return searchResultsCache.get(query)
  }
  
  const results = performSearch(query)
  searchResultsCache.set(query, results)
  
  // 限制缓存大小
  if (searchResultsCache.size > 50) {
    const firstKey = searchResultsCache.keys().next().value
    searchResultsCache.delete(firstKey)
  }
  
  return results
}
</script>
```

### 3. 用户体验优化

```javascript
// 记录用户偏好
const userPreferences = {
  // 记录点击次数
  recordClick(menuKey) {
    const clicks = JSON.parse(localStorage.getItem('menu-clicks') || '{}')
    clicks[menuKey] = (clicks[menuKey] || 0) + 1
    localStorage.setItem('menu-clicks', JSON.stringify(clicks))
  },
  
  // 获取常用菜单
  getFrequentMenus(limit = 5) {
    const clicks = JSON.parse(localStorage.getItem('menu-clicks') || '{}')
    return Object.entries(clicks)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([key]) => key)
  },
}
```

## 📝 更新日志

### v1.0.0 (2025-05-26)

- ✨ 初始版本发布
- ✨ 基础搜索功能
- ✨ 搜索历史记录
- ✨ 键盘导航支持
- ✨ 快捷键绑定
- ✨ 主题适配
- ✨ 高亮匹配文本

## 🤝 贡献指南

组件位置：`src/components/global/C_GlobalSearch/index.vue`

如需扩展功能，请考虑：
1. 保持搜索响应速度
2. 确保键盘导航流畅
3. 维护历史记录完整性
4. 更新文档说明

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved 😎

---

**💡 提示**: 搜索面板组件提供了类似 VS Code 的命令面板体验，通过 Ctrl+K 快速唤起，支持实时搜索菜单并记录搜索历史。组件完全支持键盘操作，无需鼠标即可完成导航。搜索历史自动保存，提供更快捷的访问体验。