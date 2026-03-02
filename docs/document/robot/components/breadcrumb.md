---
outline: 'deep'
---

# C_Breadcrumb 面包屑导航组件

> 🍞 基于 NBreadcrumb 的智能面包屑导航，支持 **自动** / **手动** 双模式

## 🚀 在线演示

::: tip 💻 在线体验
该组件已集成在 Robot Admin 顶部导航栏中，登录后即可体验 → [Robot Admin](https://robotadmin.cn)
:::

## ✨ 特性

- **🔄 双模式**: 自动（零配置，从 `route.matched` 生成） / 手动（传 `items` 完全自定义）
- **🌍 i18n 支持**: `labelFormatter` 回调注入翻译函数
- **🎯 下拉菜单**: 存在子路由时自动生成下拉快速导航
- **🎨 图标显示**: `showIcon` 控制图标可见性（默认开启）
- **🚀 零配置**: 自动模式开箱即用，无需额外配置
- **💪 TypeScript**: 完整的类型导出（`BreadcrumbItem`）

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @robot-admin/naive-ui-components
```

```bash [pnpm]
pnpm add @robot-admin/naive-ui-components
```

```bash [npm]
npm install @robot-admin/naive-ui-components
```

:::

## 🎯 快速开始

### 自动模式（零配置）

组件从 `route.matched` 自动生成面包屑，只需路由配置包含 `meta.title`：

```vue
<template>
  <C_Breadcrumb
    :label-formatter="$t"
    @select="router.push"
  />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t: $t } = useI18n()
</script>
```

路由配置示例：

```javascript
const routes = [
  {
    path: '/system',
    meta: { title: '系统管理', icon: 'mdi:cog' },
    children: [
      {
        path: '/system/user',
        meta: { title: '用户管理', icon: 'mdi:account' },
      },
    ],
  },
]
// 访问 /system/user 时自动显示：系统管理 / 用户管理
```

### 手动模式

传入 `items` 完全自定义面包屑数据：

```vue
<template>
  <C_Breadcrumb
    :items="customBreadcrumbs"
    @select="handleSelect"
  />
</template>

<script setup>
const customBreadcrumbs = [
  { key: '/project', label: '项目管理', icon: 'mdi:folder' },
  {
    key: '/project/detail',
    label: '项目详情',
    icon: 'mdi:file-document',
    children: [
      { key: '/project/detail/info', label: '基本信息' },
      { key: '/project/detail/members', label: '项目成员' },
    ],
  },
]

const handleSelect = (path) => {
  router.push(path)
}
</script>
```

### 隐藏图标

```vue
<template>
  <C_Breadcrumb
    :show-icon="false"
    @select="router.push"
  />
</template>
```

## 📖 API 文档

### Props

| 参数               | 类型                          | 默认值 | 说明                                              |
| ------------------ | ----------------------------- | ------ | ------------------------------------------------- |
| **items**          | `BreadcrumbItem[]`            | —      | 手动传入面包屑数据（不传则自动从 route.matched 生成） |
| **showIcon**       | `boolean`                     | `true` | 是否显示图标                                      |
| **labelFormatter** | `(label: string) => string`   | —      | 标签文本格式化函数（仅自动模式生效，用于 i18n）   |

### Events

| 事件名     | 参数                | 说明                       |
| ---------- | ------------------- | -------------------------- |
| **select** | `(path: string)`    | 面包屑项被点击（返回路径 key） |

### BreadcrumbItem 类型

```typescript
interface BreadcrumbItem {
  key: string              // 路径 key
  label: string            // 显示文本
  icon?: string            // 图标名称（Iconify 格式）
  children?: BreadcrumbItem[] // 子级列表（用于下拉菜单）
}
```

## 📖 工作原理

### 自动模式生成机制

```
route.matched → 过滤有 meta.title 的记录 → 构建 BreadcrumbItem[]
                                          ↓
                                    每条记录的 children 
                                    → 自动生成下拉菜单选项
                                    → 支持最多三级嵌套
```

1. **路由匹配** — 获取当前路由的所有匹配记录 `route.matched`
2. **过滤处理** — 筛选包含 `meta.title` 的路由
3. **标签格式化** — 对每个 title 调用 `labelFormatter`（如 i18n 翻译）
4. **下拉支持** — 存在子路由时自动生成下拉菜单（最多三级）

## 🎨 使用示例

::: details 📋 后台管理系统头部 — 自动模式 + i18n

```vue
<template>
  <NLayoutHeader bordered>
    <div class="header-container">
      <C_Breadcrumb
        :label-formatter="$t"
        @select="router.push"
      />
      <div class="user-info">
        <C_Theme v-model="theme" />
        <C_Language v-model="lang" />
      </div>
    </div>
  </NLayoutHeader>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t: $t } = useI18n()
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}
.user-info {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
</style>
```

:::

::: details 🔗 手动模式 — 动态面包屑

```vue
<template>
  <C_Breadcrumb
    :items="dynamicBreadcrumbs"
    @select="router.push"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 根据当前路由 + 业务数据动态构建
const dynamicBreadcrumbs = computed(() => {
  const base = [{ key: '/home', label: '首页', icon: 'mdi:home' }]

  if (route.params.projectId) {
    base.push({
      key: `/project/${route.params.projectId}`,
      label: projectStore.currentProject?.name || '项目详情',
      icon: 'mdi:folder',
    })
  }

  if (route.params.taskId) {
    base.push({
      key: route.path,
      label: `任务 #${route.params.taskId}`,
      icon: 'mdi:clipboard-check',
    })
  }

  return base
})
</script>
```

:::

::: details 🎨 样式定制

```vue
<template>
  <C_Breadcrumb class="custom-breadcrumb" @select="router.push" />
</template>

<style>
.custom-breadcrumb {
  background: #f5f5f5;
  padding: 8px 16px;
  border-radius: 4px;
}

.custom-breadcrumb :deep(.n-breadcrumb-separator) {
  color: #999;
  margin: 0 12px;
}

.custom-breadcrumb :deep(.c-breadcrumb-link) {
  color: #666;
  cursor: pointer;
  transition: color 0.3s;
}

.custom-breadcrumb :deep(.c-breadcrumb-link:hover) {
  color: #1890ff;
}

.custom-breadcrumb :deep(.trigger) {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.custom-breadcrumb :deep(.trigger:hover) {
  background: rgba(0, 0, 0, 0.04);
}
</style>
```

:::

## ⚠️ 注意事项

::: code-group

```vue [✅ 推荐 — 传入 select 事件]
<!-- 组件不自动跳转路由，需监听 select 事件 -->
<C_Breadcrumb @select="router.push" />
```

```vue [❌ 避免 — 忘记处理 select]
<!-- 不传 @select，点击面包屑项无任何响应 -->
<C_Breadcrumb />
```

:::

### 迁移指南（从旧版迁移）

| 旧版                                  | 新版                                            |
| ------------------------------------- | ----------------------------------------------- |
| 零配置 + 内部自动路由跳转             | 零配置 + **需监听 `@select`** 自行 `router.push` |
| 无 i18n 支持                          | `:label-formatter="$t"`                         |
| 无手动模式                            | `:items="customBreadcrumbs"`                    |
| 无 select 事件                        | `@select="handleSelect"`                        |
| 无 showIcon 控制                      | `:show-icon="false"` 隐藏图标                   |

### 路由 meta 配置要求

```javascript
// ✅ 正确 — 面包屑会显示
{
  path: '/system/user',
  meta: { title: '用户管理', icon: 'mdi:account' }
}

// ❌ 缺少 title — 该层级不会出现在自动面包屑中
{
  path: '/system/user',
  meta: { icon: 'mdi:account' }  // 缺少 title
}
```

## 📝 更新日志

### v0.5.0 (2025-06)

- ♻️ **破坏性变更**: 组件不再自动跳转路由，改为 `@select` 事件
- ✨ 新增 `items` prop 手动模式
- ✨ 新增 `showIcon` prop（默认 true）
- ✨ 新增 `labelFormatter` i18n 支持
- ✨ 自动模式支持三级嵌套下拉

### v0.3.0 (2025-03)

- ✨ 初始版本（仅自动模式）


<!--@include: ./snippets/contribute.md -->


**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
