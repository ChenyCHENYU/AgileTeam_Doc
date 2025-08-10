---
outline: 'deep'
---

# C_Breadcrumb 面包屑导航组件

> 🍞 基于 Vue Router 的智能面包屑导航组件，自动生成路径导航

## ✨ 特性

- **🔄 自动生成**: 基于 Vue Router 路由配置自动生成面包屑
- **📱 响应式**: 自适应不同屏幕尺寸，移动端友好
- **🎯 下拉菜单**: 支持子路由下拉快速导航
- **🎨 图标支持**: 集成路由图标显示
- **🚀 零配置**: 开箱即用，无需额外配置
- **💪 TypeScript**: 完整的类型支持

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_Breadcrumb />
</template>
```

## 🎯 快速开始

### 基础用法

面包屑组件会自动读取当前路由信息并生成导航：

```vue
<template>
  <!-- 在布局组件中使用 -->
  <div class="layout-header">
    <C_Breadcrumb />
  </div>
</template>
```

### 路由配置

确保路由配置包含必要的 meta 信息：

```javascript
// router/routes.js
const routes = [
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: '仪表盘',
      icon: 'dashboard-icon',
    },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/dashboard/analysis.vue'),
        meta: {
          title: '数据分析',
          icon: 'chart-icon',
        },
      },
      {
        path: 'monitor',
        component: () => import('@/views/dashboard/monitor.vue'),
        meta: {
          title: '监控页',
          icon: 'monitor-icon',
        },
      },
    ],
  },
]
```

## 📖 工作原理

### 自动生成机制

组件通过监听 `route.matched` 自动生成面包屑：

1. **路由匹配**: 获取当前路由的所有匹配记录
2. **过滤处理**: 筛选包含 `meta.title` 的路由
3. **层级构建**: 自动构建父子关系
4. **下拉支持**: 存在子路由时自动生成下拉菜单

### 数据结构

```typescript
interface BreadcrumbItem {
  key: string // 路由路径
  label: string // 显示文本（来自 meta.title）
  icon?: string // 图标名称（来自 meta.icon）
  children?: BreadcrumbItem[] // 子路由列表
}
```

## 🎨 使用示例

### 场景 1: 标准后台管理系统

```vue
<template>
  <NLayout>
    <NLayoutHeader>
      <div class="header-container">
        <!-- Logo 区域 -->
        <div class="logo">Admin System</div>

        <!-- 面包屑导航 -->
        <C_Breadcrumb />

        <!-- 用户信息 -->
        <div class="user-info">用户中心</div>
      </div>
    </NLayoutHeader>

    <NLayoutContent>
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>

<script setup>
// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: '首页', icon: 'home' },
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'setting' },
    children: [
      {
        path: 'user',
        component: UserManage,
        meta: { title: '用户管理', icon: 'user' },
      },
      {
        path: 'role',
        component: RoleManage,
        meta: { title: '角色管理', icon: 'team' },
      },
      {
        path: 'menu',
        component: MenuManage,
        meta: { title: '菜单管理', icon: 'menu' },
      },
    ],
  },
]
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

.logo {
  width: 200px;
  font-size: 18px;
  font-weight: bold;
}

.user-info {
  margin-left: auto;
}
</style>
```

### 场景 2: 多级嵌套路由

```javascript
// 三级嵌套路由配置
const routes = [
  {
    path: '/project',
    component: Layout,
    meta: { title: '项目管理', icon: 'project' },
    children: [
      {
        path: 'list',
        component: ProjectList,
        meta: { title: '项目列表', icon: 'list' },
        children: [
          {
            path: 'detail/:id',
            component: ProjectDetail,
            meta: { title: '项目详情', icon: 'detail' },
          },
        ],
      },
    ],
  },
]

// 面包屑会自动显示：项目管理 / 项目列表 / 项目详情
// 点击"项目列表"会显示下拉菜单包含"项目详情"
```

### 场景 3: 动态路由标题

```vue
<template>
  <C_Breadcrumb />
</template>

<script setup>
// 动态设置路由标题
const route = useRoute()
const router = useRouter()

// 例如：根据 API 数据更新标题
const fetchProjectDetail = async () => {
  const project = await api.getProject(route.params.id)

  // 动态更新当前路由的 meta 信息
  route.meta.title = `项目：${project.name}`
}

onMounted(() => {
  fetchProjectDetail()
})
</script>
```

## 🎨 样式定制

### 自定义样式

```vue
<template>
  <C_Breadcrumb class="custom-breadcrumb" />
</template>

<style>
/* 自定义面包屑容器样式 */
.custom-breadcrumb {
  background: #f5f5f5;
  padding: 8px 16px;
  border-radius: 4px;
}

/* 自定义分隔符样式 */
.custom-breadcrumb :deep(.n-breadcrumb-separator) {
  color: #999;
  margin: 0 12px;
}

/* 自定义链接样式 */
.custom-breadcrumb :deep(.n-breadcrumb-item__link) {
  color: #666;
  transition: color 0.3s;
}

.custom-breadcrumb :deep(.n-breadcrumb-item__link:hover) {
  color: #1890ff;
}

/* 自定义下拉触发器样式 */
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

### 主题适配

```vue
<script setup>
// 配合暗色主题
const themeVars = {
  breadcrumbTextColor: '#c9d1d9',
  breadcrumbTextColorHover: '#58a6ff',
  breadcrumbTextColorPressed: '#1f6feb',
  breadcrumbSeparatorColor: '#6e7681',
}
</script>

<template>
  <NConfigProvider :theme-overrides="themeVars">
    <C_Breadcrumb />
  </NConfigProvider>
</template>
```

## ⚙️ 高级配置

### 路由 Meta 配置说明

```typescript
interface RouteMeta {
  title: string // 面包屑显示文本（必需）
  icon?: string // 图标名称（可选）
  hidden?: boolean // 是否在面包屑中隐藏
  breadcrumb?: boolean // 是否显示在面包屑中（默认 true）
}
```

### 完整路由配置示例

```javascript
const routes = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    meta: {
      title: '管理后台',
      icon: 'admin-icon',
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        meta: {
          title: '控制台',
          icon: 'dashboard-icon',
        },
      },
      {
        path: 'hidden-page',
        component: HiddenPage,
        meta: {
          title: '隐藏页面',
          hidden: true, // 不在面包屑中显示
        },
      },
    ],
  },
]
```

## 🐛 常见问题

### Q1: 面包屑不显示？

**A1:** 检查路由配置是否包含 `meta.title`：

```javascript
// ✅ 正确
{
  path: '/dashboard',
  meta: { title: '仪表盘' }
}

// ❌ 错误
{
  path: '/dashboard'
  // 缺少 meta.title
}
```

### Q2: 图标不显示？

**A2:** 确保 `C_Icon` 组件已正确配置，且图标名称正确：

```javascript
{
  path: '/user',
  meta: {
    title: '用户管理',
    icon: 'user' // 确保图标名称在 C_Icon 组件中存在
  }
}
```

### Q3: 下拉菜单不工作？

**A3:** 确保子路由配置正确：

```javascript
{
  path: '/parent',
  meta: { title: '父级菜单' },
  children: [  // 必须有 children 数组
    {
      path: 'child',
      meta: { title: '子菜单' }
    }
  ]
}
```

## 🎯 最佳实践

### 1. 路由配置规范

```javascript
// 统一的路由配置规范
const createRoute = (path, title, icon, component, children = []) => ({
  path,
  component,
  meta: { title, icon },
  children,
})

// 使用示例
const routes = [
  createRoute(
    '/system',
    '系统管理',
    'setting',
    Layout,
    [
      createRoute('/system/user', '用户管理', 'user', UserManage),
      createRoute('/system/role', '角色管理', 'team', RoleManage),
    ]
  ),
]
```

### 2. 性能优化

```vue
<template>
  <!-- 使用 v-show 而非 v-if 频繁切换 -->
  <div v-show="showBreadcrumb">
    <C_Breadcrumb />
  </div>
</template>

<script setup>
// 缓存计算结果
const showBreadcrumb = computed(() => {
  // 某些页面不显示面包屑
  return !['login', 'register'].includes(route.name)
})
</script>
```

### 3. 权限集成

```javascript
// 根据权限过滤面包屑
const filterBreadcrumbByPermission = (breadcrumb, permissions) => {
  return breadcrumb.filter(item => {
    if (item.meta?.permission) {
      return permissions.includes(item.meta.permission)
    }
    return true
  })
}
```

## 📝 更新日志

### v1.0.0 (2025-05-30)

- ✨ 初始版本发布
- ✨ 基于 Vue Router 自动生成面包屑
- ✨ 支持多级路由和下拉菜单
- ✨ 集成图标显示
- ✨ TypeScript 支持

## 🤝 贡献指南

组件位置：`src/components/global/C_Breadcrumb/index.vue`

如需扩展功能，请考虑：
1. 保持组件的简洁性
2. 确保向后兼容
3. 添加必要的类型定义
4. 更新文档说明

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved 😎

---

**💡 提示**: 面包屑组件设计为零配置使用，只需确保路由配置包含 `meta.title` 即可自动工作。组件会智能处理多级路由，并在存在子路由时自动生成下拉菜单，提供快速导航能力。