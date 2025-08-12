---
outline: 'deep'
---

# C_TagsView 标签页组件

> 🏷️ 多标签页导航组件，提供快速切换和标签管理功能

## ✨ 特性

- **📌 标签管理**: 添加、关闭、固定标签页
- **🖱️ 右键菜单**: 丰富的标签操作选项
- **💾 持久化存储**: 自动保存标签状态到本地
- **🎯 路由同步**: 与 Vue Router 深度集成
- **📜 滚动支持**: 标签过多时支持横向滚动
- **🎨 视觉反馈**: 当前激活标签高亮显示
- **⚡ 快捷操作**: 支持滚轮横向滚动

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_TagsView />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <!-- 在布局头部使用 -->
  <NLayoutHeader>
    <div class="header-container">
      <C_Breadcrumb />
      <C_TagsView />
    </div>
  </NLayoutHeader>
</template>
```

### 配合路由使用

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '首页',
      icon: 'mdi:home',
      affix: true,  // 固定标签，不可关闭
    },
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '用户管理',
      icon: 'mdi:account',
    },
  },
]
```

## 📖 API 文档

### Store 方法

组件使用 `appStore` 管理标签状态：

| 方法 | 参数 | 说明 |
| --- | --- | --- |
| **addTag** | `tag: Tag` | 添加新标签 |
| **removeTag** | `index: number` | 移除指定标签 |
| **removeOtherTags** | `index: number` | 关闭其他标签 |
| **removeLeftTags** | `index: number` | 关闭左侧标签 |
| **removeRightTags** | `index: number` | 关闭右侧标签 |
| **removeAllTags** | - | 关闭所有标签 |
| **setActiveTag** | `path: string` | 设置激活标签 |

### 标签数据结构

```typescript
interface Tag {
  path: string      // 路由路径
  title: string     // 标签标题
  icon?: string     // 图标名称
  meta?: {
    affix?: boolean // 是否固定（不可关闭）
  }
}
```

### 右键菜单选项

| 选项 | 功能 | 快捷键 |
| --- | --- | --- |
| 关闭 | 关闭当前标签 | - |
| 关闭其他 | 关闭除当前外的所有标签 | - |
| 关闭左侧 | 关闭左侧所有标签 | - |
| 关闭右侧 | 关闭右侧所有标签 | - |
| 关闭所有 | 关闭所有可关闭标签 | - |

## 🎨 使用示例

### 场景 1: 标准后台管理系统

```vue
<template>
  <NLayout>
    <NLayoutHeader bordered>
      <!-- 面包屑导航 -->
      <C_Breadcrumb />
      
      <!-- 标签页导航 -->
      <C_TagsView />
    </NLayoutHeader>

    <NLayoutContent>
      <RouterView v-slot="{ Component }">
        <KeepAlive :include="cachedViews">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </NLayoutContent>
  </NLayout>
</template>

<script setup>
import { s_appStore } from '@/stores/app'

const appStore = s_appStore()

// 缓存的页面组件名称
const cachedViews = computed(() => {
  return appStore.tagsViewList
    .filter(tag => tag.meta?.cache !== false)
    .map(tag => tag.name)
})
</script>
```

### 场景 2: 固定常用标签

::: details 📌 查看固定标签配置代码
```javascript
// 路由配置
const routes = [
  {
    path: '/',
    component: Dashboard,
    meta: {
      title: '工作台',
      icon: 'mdi:view-dashboard',
      affix: true,  // 固定标签
    },
  },
  {
    path: '/todo',
    component: TodoList,
    meta: {
      title: '待办事项',
      icon: 'mdi:format-list-checks',
      affix: true,  // 固定标签
    },
  },
  {
    path: '/report',
    component: Report,
    meta: {
      title: '数据报表',
      icon: 'mdi:chart-line',
      // 普通标签，可关闭
    },
  },
]
```
:::

### 场景 3: 动态标签管理

::: details 🔧 查看动态标签管理代码
```vue
<template>
  <div class="workspace">
    <!-- 工具栏 -->
    <div class="toolbar">
      <NButton @click="openInNewTag">在新标签中打开</NButton>
      <NButton @click="closeCurrentTag">关闭当前标签</NButton>
      <NButton @click="refreshCurrentTag">刷新当前页面</NButton>
    </div>

    <C_TagsView ref="tagsViewRef" />
  </div>
</template>

<script setup>
import { s_appStore } from '@/stores/app'

const route = useRoute()
const router = useRouter()
const appStore = s_appStore()

// 在新标签中打开
const openInNewTag = () => {
  const newPath = `/detail/${Date.now()}`
  
  appStore.addTag({
    path: newPath,
    title: `详情-${Date.now()}`,
    icon: 'mdi:file-document',
  })
  
  router.push(newPath)
}

// 关闭当前标签
const closeCurrentTag = () => {
  const currentIndex = appStore.tagsViewList.findIndex(
    tag => tag.path === route.path
  )
  
  if (currentIndex !== -1) {
    appStore.removeTag(currentIndex)
    
    // 跳转到上一个标签
    if (appStore.tagsViewList.length > 0) {
      const prevTag = appStore.tagsViewList[Math.max(0, currentIndex - 1)]
      router.push(prevTag.path)
    } else {
      router.push('/')
    }
  }
}

// 刷新当前页面
const refreshCurrentTag = () => {
  // 先跳转到重定向页面
  router.push(`/redirect${route.path}`)
}
</script>
```
:::

### 场景 4: 标签限制和提示

::: details ⚠️ 查看标签限制和提示代码
```vue
<script setup>
import { s_appStore } from '@/stores/app'

const appStore = s_appStore()
const message = useMessage()

// 限制最大标签数
const MAX_TAGS = 10

// 监听标签添加
watch(
  () => appStore.tagsViewList.length,
  (newLength, oldLength) => {
    if (newLength > MAX_TAGS && newLength > oldLength) {
      message.warning(`最多只能打开 ${MAX_TAGS} 个标签页`)
      
      // 移除最早的非固定标签
      const firstNonAffixIndex = appStore.tagsViewList.findIndex(
        tag => !tag.meta?.affix
      )
      
      if (firstNonAffixIndex !== -1) {
        appStore.removeTag(firstNonAffixIndex)
      }
    }
  }
)

// 标签关闭前确认
const beforeCloseTag = (tag) => {
  if (tag.meta?.unsaved) {
    return confirm('该页面有未保存的更改，确定要关闭吗？')
  }
  return true
}
</script>
```
:::

## 🎨 样式定制

### 自定义标签样式

::: details 🎨 查看自定义标签样式代码
```scss
// index.scss
.tags-view-container {
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.tags-track {
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  
  // 隐藏滚动条
  &::-webkit-scrollbar {
    height: 0;
  }
}

.tags-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  gap: 5px;
  
  // 标签样式
  .n-tag {
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

// 暗色主题
.dark {
  .tags-view-container {
    background: #1f1f1f;
    border-bottom-color: #333;
  }
}
```
:::

### 自定义右键菜单

::: details 🖱️ 查看自定义右键菜单代码
```vue
<script setup>
// 自定义右键菜单选项
const customContextMenuOptions = computed(() => [
  {
    label: '刷新',
    key: 'refresh',
    icon: () => h('span', { class: 'i-mdi:refresh' }),
  },
  {
    label: '复制路径',
    key: 'copy',
    icon: () => h('span', { class: 'i-mdi:content-copy' }),
  },
  { type: 'divider' },
  // ... 原有选项
])

// 处理自定义菜单操作
const handleCustomMenuSelect = (key) => {
  switch (key) {
    case 'refresh':
      router.push(`/redirect${selectedTag.value.path}`)
      break
    case 'copy':
      navigator.clipboard.writeText(selectedTag.value.path)
      message.success('路径已复制')
      break
  }
}
</script>
```
:::

## ⚙️ 高级用法

### 标签状态持久化

::: details 💾 查看标签状态持久化代码
```javascript
// 已内置持久化功能，自动保存到 localStorage
// 可以自定义持久化逻辑

const customPersist = {
  save(tags) {
    // 自定义保存逻辑，如保存到服务器
    api.saveUserTags(tags)
  },
  
  load() {
    // 自定义加载逻辑
    return api.getUserTags()
  },
}
```
:::

### 标签拖拽排序

::: details 🔄 查看标签拖拽排序代码
```vue
<script setup>
import { VueDraggableNext } from 'vue-draggable-next'

// 启用拖拽排序
const enableDragSort = ref(true)

const handleDragEnd = (event) => {
  const { oldIndex, newIndex } = event
  appStore.moveTag(oldIndex, newIndex)
}
</script>

<template>
  <VueDraggableNext
    v-model="appStore.tagsViewList"
    :animation="200"
    @end="handleDragEnd"
  >
    <NTag v-for="tag in appStore.tagsViewList" ...>
      {{ tag.title }}
    </NTag>
  </VueDraggableNext>
</template>
```
:::

## 🐛 常见问题

### Q1: 标签不显示图标？

**A1:** 确保路由 meta 中配置了 icon：

::: details 查看解决方案代码
```javascript
// ✅ 正确
{
  path: '/user',
  meta: {
    title: '用户管理',
    icon: 'mdi:account'  // 需要配置图标
  }
}
```
:::

### Q2: 固定标签无法关闭？

**A2:** 这是设计特性，固定标签通过 `meta.affix` 标记：

::: details 查看解决方案代码
```javascript
{
  path: '/',
  meta: {
    title: '首页',
    affix: true  // 设置为固定标签
  }
}
```
:::

### Q3: 标签状态丢失？

**A3:** 检查 localStorage 是否正常工作：

::: details 查看解决方案代码
```javascript
// 手动检查存储
console.log(localStorage.getItem('tagsViewList'))
console.log(localStorage.getItem('activeTag'))

// 清除缓存重试
localStorage.removeItem('tagsViewList')
localStorage.removeItem('activeTag')
```
:::

### Q4: 滚轮滚动不工作？

**A4:** 确保标签容器有正确的样式：

::: details 查看解决方案代码
```scss
.tags-track {
  overflow-x: auto;  // 必需
  overflow-y: hidden;  // 防止垂直滚动
}
```
:::

## 🎯 最佳实践

### 1. 路由配置规范

```javascript
// 统一的路由 meta 配置
const createRoute = (path, component, meta) => ({
  path,
  component,
  meta: {
    title: meta.title || '未命名页面',
    icon: meta.icon || 'mdi:file',
    affix: meta.affix || false,
    cache: meta.cache !== false,  // 默认缓存
    ...meta,
  },
})
```

### 2. 性能优化

```vue
<script setup>
// 使用 shallowRef 优化大量标签
import { shallowRef } from 'vue'

// 防抖滚动
import { debounce } from 'lodash-es'

const debouncedScroll = debounce((scrollLeft) => {
  tagsContainer.value.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  })
}, 100)
</script>
```

### 3. 标签数量控制

```javascript
// 限制标签数量
const TAG_LIMIT = 15

// 自动关闭最旧的标签
const autoCloseOldest = () => {
  if (appStore.tagsViewList.length > TAG_LIMIT) {
    const oldestIndex = appStore.tagsViewList.findIndex(
      tag => !tag.meta?.affix
    )
    if (oldestIndex !== -1) {
      appStore.removeTag(oldestIndex)
    }
  }
}
```

## 📝 更新日志

### v1.0.0 (2025-05-26)

- ✨ 初始版本发布
- ✨ 基础标签管理功能
- ✨ 右键菜单支持
- ✨ 本地持久化存储
- ✨ 滚轮横向滚动
- ✨ 路由同步功能

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 标签页组件提供了类似浏览器的多标签导航体验，通过右键菜单可以快速管理标签。组件自动保存标签状态，刷新页面后仍能保持之前打开的标签。配合路由的 meta 配置，可以实现固定标签、自定义图标等功能。