---
outline: 'deep'
---

# C_Menu 菜单组件

> 🗂️ 基于 NaiveUI 的智能菜单组件，支持多级菜单、自动展开和主题定制

## ✨ 特性

- **🔄 自动展开**: 根据当前路由自动展开对应菜单项
- **📱 折叠模式**: 支持菜单折叠，节省侧边栏空间
- **🎨 主题定制**: 支持深色/浅色主题，可自定义样式
- **🚀 路由集成**: 与 Vue Router 深度集成，点击自动跳转
- **📋 多级菜单**: 支持无限层级的菜单嵌套
- **💪 TypeScript**: 完整的类型支持

## 📦 安装

组件已全局注册，直接使用即可：

```vue
<template>
  <C_Menu :data="menuData" />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <C_Menu :data="menuList" />
</template>

<script setup>
const menuList = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: 'DashboardOutlined',
    path: '/dashboard',
  },
  {
    label: '系统管理',
    key: 'system',
    icon: 'SettingOutlined',
    path: '/system',
    children: [
      {
        label: '用户管理',
        key: 'user',
        path: '/system/user',
      },
      {
        label: '角色管理',
        key: 'role',
        path: '/system/role',
      },
    ],
  },
]
</script>
```

### 折叠模式

```vue
<template>
  <div class="layout-sider">
    <C_Menu
      :data="menuList"
      :collapsed="isCollapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
    />
    
    <NButton @click="isCollapsed = !isCollapsed">
      {{ isCollapsed ? '展开' : '折叠' }}
    </NButton>
  </div>
</template>

<script setup>
const isCollapsed = ref(false)
</script>
```

## 📖 API 文档

### Props

| 参数                | 类型                          | 默认值       | 说明                             |
| ------------------- | ----------------------------- | ------------ | -------------------------------- |
| **data**            | `MenuOptions[]`               | `[]`         | 菜单数据数组（必需）             |
| **mode**            | `'vertical' \| 'horizontal'` | `'vertical'` | 菜单模式                         |
| **collapsed**       | `boolean`                     | `false`      | 是否折叠菜单                     |
| **collapsedWidth**  | `number`                      | `64`         | 折叠时的宽度                     |
| **collapsedIconSize** | `number`                    | `22`         | 折叠时图标大小                   |
| **inverted**        | `boolean`                     | `false`      | 是否使用反色主题（深色背景）     |

### 数据结构

```typescript
interface MenuOptions {
  label: string        // 菜单显示文本
  key: string          // 唯一标识
  icon?: string        // 图标名称
  path?: string        // 路由路径
  disabled?: boolean   // 是否禁用
  children?: MenuOptions[]  // 子菜单
}
```

## 🎨 使用示例

### 场景 1: 后台管理系统侧边栏

::: details 📋 查看后台管理系统侧边栏代码
```vue
<template>
  <NLayout has-sider>
    <NLayoutSider
      :collapsed="collapsed"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
      bordered
    >
      <!-- Logo 区域 -->
      <div class="logo-container">
        <img src="/logo.svg" alt="Logo" />
        <span v-show="!collapsed">管理系统</span>
      </div>

      <!-- 菜单组件 -->
      <C_Menu
        :data="menuData"
        :collapsed="collapsed"
        :inverted="true"
      />
    </NLayoutSider>

    <NLayout>
      <NLayoutHeader bordered>
        <NButton @click="collapsed = !collapsed">
          <C_Icon :name="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
        </NButton>
      </NLayoutHeader>
      
      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup>
const collapsed = ref(false)

const menuData = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: 'DashboardOutlined',
    path: '/dashboard',
  },
  {
    label: '用户中心',
    key: 'user-center',
    icon: 'UserOutlined',
    path: '/user',
    children: [
      {
        label: '个人信息',
        key: 'profile',
        path: '/user/profile',
      },
      {
        label: '账号设置',
        key: 'settings',
        path: '/user/settings',
      },
    ],
  },
  {
    label: '系统管理',
    key: 'system',
    icon: 'SettingOutlined',
    path: '/system',
    children: [
      {
        label: '用户管理',
        key: 'user-manage',
        path: '/system/user',
      },
      {
        label: '角色管理',
        key: 'role-manage',
        path: '/system/role',
      },
      {
        label: '菜单管理',
        key: 'menu-manage',
        path: '/system/menu',
      },
    ],
  },
]
</script>

<style scoped>
.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.logo-container img {
  width: 32px;
  height: 32px;
}

.logo-container span {
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}
</style>
```
:::

### 场景 2: 顶部导航菜单

::: details 📋 查看顶部导航菜单代码
```vue
<template>
  <NLayout>
    <NLayoutHeader bordered>
      <div class="header-container">
        <div class="logo">
          <img src="/logo.svg" alt="Logo" />
          <span>企业门户</span>
        </div>

        <!-- 水平菜单 -->
        <C_Menu
          :data="topMenuData"
          mode="horizontal"
          class="flex-1"
        />

        <div class="user-actions">
          <NButton>登录</NButton>
        </div>
      </div>
    </NLayoutHeader>

    <NLayoutContent>
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>

<script setup>
const topMenuData = [
  {
    label: '首页',
    key: 'home',
    icon: 'HomeOutlined',
    path: '/',
  },
  {
    label: '产品',
    key: 'products',
    icon: 'AppstoreOutlined',
    path: '/products',
    children: [
      {
        label: '产品列表',
        key: 'product-list',
        path: '/products/list',
      },
      {
        label: '产品分类',
        key: 'product-category',
        path: '/products/category',
      },
    ],
  },
  {
    label: '解决方案',
    key: 'solutions',
    icon: 'BulbOutlined',
    path: '/solutions',
  },
  {
    label: '关于我们',
    key: 'about',
    icon: 'TeamOutlined',
    path: '/about',
  },
]
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 24px;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 48px;
}

.logo img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.logo span {
  font-size: 18px;
  font-weight: 600;
}

.user-actions {
  margin-left: auto;
}
</style>
```
:::

### 场景 3: 动态权限菜单

::: details 🔐 查看动态权限菜单代码
```vue
<template>
  <C_Menu :data="permissionMenus" />
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 所有菜单配置
const allMenus = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: 'DashboardOutlined',
    path: '/dashboard',
    permission: 'dashboard:view',
  },
  {
    label: '用户管理',
    key: 'user',
    icon: 'UserOutlined',
    path: '/user',
    permission: 'user:view',
    children: [
      {
        label: '用户列表',
        key: 'user-list',
        path: '/user/list',
        permission: 'user:list',
      },
      {
        label: '添加用户',
        key: 'user-add',
        path: '/user/add',
        permission: 'user:add',
      },
    ],
  },
  {
    label: '系统设置',
    key: 'settings',
    icon: 'SettingOutlined',
    path: '/settings',
    permission: 'settings:view',
  },
]

// 根据用户权限过滤菜单
const filterMenusByPermission = (menus, permissions) => {
  return menus
    .filter(menu => {
      // 没有权限要求或用户有该权限
      return !menu.permission || permissions.includes(menu.permission)
    })
    .map(menu => {
      if (menu.children) {
        return {
          ...menu,
          children: filterMenusByPermission(menu.children, permissions),
        }
      }
      return menu
    })
    .filter(menu => {
      // 移除没有子菜单的空父菜单
      if (menu.children) {
        return menu.children.length > 0
      }
      return true
    })
}

// 计算有权限的菜单
const permissionMenus = computed(() => {
  return filterMenusByPermission(allMenus, userStore.permissions)
})
</script>
```
:::

## 🎨 样式定制

### 主题配置

::: details 🎨 查看主题配置代码
```vue
<template>
  <C_Menu
    :data="menuData"
    :inverted="isDark"
  />
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// 自定义主题变量
themeStore.setThemeOverrides({
  Menu: {
    itemTextColor: '#666',
    itemTextColorHover: '#1890ff',
    itemTextColorActive: '#1890ff',
    itemTextColorChildActive: '#1890ff',
    itemIconColor: '#666',
    itemIconColorHover: '#1890ff',
    itemIconColorActive: '#1890ff',
    itemColorActive: 'rgba(24, 144, 255, 0.1)',
    borderRadius: '4px',
  },
})
</script>
```
:::

### 自定义样式

::: details 🎨 查看自定义样式代码
```vue
<template>
  <C_Menu
    :data="menuData"
    class="custom-menu"
  />
</template>

<style>
/* 自定义菜单项样式 */
.custom-menu :deep(.n-menu-item) {
  margin: 4px 8px;
  border-radius: 8px;
}

/* 自定义激活状态 */
.custom-menu :deep(.n-menu-item-content--selected) {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: #fff !important;
}

/* 自定义图标 */
.custom-menu :deep(.n-menu-item-content__icon) {
  font-size: 18px;
}

/* 折叠状态样式 */
.custom-menu :deep(.n-menu--collapsed .n-menu-item) {
  justify-content: center;
}
</style>
```
:::

## ⚙️ 高级用法

### 程序化控制展开

::: details 🔧 查看程序化控制展开代码
```vue
<template>
  <C_Menu
    ref="menuRef"
    :data="menuData"
  />
  
  <NButton @click="expandAll">展开所有</NButton>
  <NButton @click="collapseAll">折叠所有</NButton>
</template>

<script setup>
const menuRef = ref()

// 展开所有菜单
const expandAll = () => {
  const allKeys = extractAllKeys(menuData)
  menuRef.value?.onExpandedKeysChange(allKeys)
}

// 折叠所有菜单
const collapseAll = () => {
  menuRef.value?.onExpandedKeysChange([])
}

// 提取所有菜单key
const extractAllKeys = (menus) => {
  return menus.reduce((keys, menu) => {
    if (menu.children) {
      keys.push(menu.path)
      keys.push(...extractAllKeys(menu.children))
    }
    return keys
  }, [])
}
</script>
```
:::

### 菜单数据持久化

::: details 💾 查看菜单数据持久化代码
```vue
<script setup>
// 保存展开状态到本地存储
const saveExpandedState = (keys) => {
  localStorage.setItem('menu-expanded-keys', JSON.stringify(keys))
}

// 恢复展开状态
const restoreExpandedState = () => {
  const saved = localStorage.getItem('menu-expanded-keys')
  return saved ? JSON.parse(saved) : []
}

// 在菜单组件中使用
const menuData = ref([...])
const expandedKeys = ref(restoreExpandedState())

watch(expandedKeys, (newKeys) => {
  saveExpandedState(newKeys)
})
</script>
```
:::

## 🐛 常见问题

### Q1: 菜单不自动展开？

**A1:** 确保菜单数据中的 `path` 与路由路径匹配：

::: details 查看解决方案代码
```javascript
// ✅ 正确
{
  path: '/system/user',  // 与路由路径一致
  label: '用户管理'
}

// ❌ 错误
{
  path: 'system/user',  // 缺少前导斜杠
  label: '用户管理'
}
```
:::

### Q2: 点击菜单不跳转？

**A2:** 检查菜单项是否配置了 `path` 属性：

::: details 查看解决方案代码
```javascript
// ✅ 正确
{
  label: '用户管理',
  key: 'user',
  path: '/user'  // 必须有 path
}

// ❌ 错误
{
  label: '用户管理',
  key: 'user'
  // 缺少 path
}
```
:::

### Q3: 折叠模式下子菜单不显示？

**A3:** 组件会自动处理折叠模式下的子菜单显示（通过 dropdown），确保：

::: details 查看解决方案代码
```vue
<!-- ✅ 正确使用 -->
<C_Menu
  :data="menuData"
  :collapsed="true"
  :collapsed-width="64"
/>

<!-- 确保父容器宽度正确 -->
<NLayoutSider
  :collapsed="collapsed"
  :collapsed-width="64"
  :width="240"
>
  <C_Menu ... />
</NLayoutSider>
```
:::

## 🎯 最佳实践

### 1. 菜单数据规范化

```javascript
// 统一的菜单数据生成函数
const createMenuItem = (label, key, path, icon = null, children = null) => ({
  label,
  key,
  path,
  ...(icon && { icon }),
  ...(children && { children }),
})

// 使用示例
const menuData = [
  createMenuItem('仪表盘', 'dashboard', '/dashboard', 'DashboardOutlined'),
  createMenuItem('系统管理', 'system', '/system', 'SettingOutlined', [
    createMenuItem('用户管理', 'user', '/system/user'),
    createMenuItem('角色管理', 'role', '/system/role'),
  ]),
]
```

### 2. 路由与菜单同步

```javascript
// router/index.js
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
    },
  },
]

// 从路由生成菜单
const generateMenuFromRoutes = (routes) => {
  return routes
    .filter(route => !route.meta?.hidden)
    .map(route => ({
      label: route.meta?.title || route.name,
      key: route.name || route.path,
      path: route.path,
      icon: route.meta?.icon,
      children: route.children ? generateMenuFromRoutes(route.children) : undefined,
    }))
}
```

### 3. 性能优化

```vue
<script setup>
// 使用 shallowRef 优化大型菜单数据
const menuData = shallowRef([...])

// 使用计算属性缓存处理结果
const processedMenus = computed(() => {
  return processMenuData(menuData.value)
})

// 防抖处理菜单展开
const debouncedExpandChange = debounce((keys) => {
  // 处理展开逻辑
}, 300)
</script>
```

## 📝 更新日志

### v1.0.0 (2025-05-11)

- ✨ 初始版本发布
- ✨ 支持垂直和水平菜单模式
- ✨ 自动展开当前路由菜单
- ✨ 支持菜单折叠模式
- ✨ 集成主题定制功能
- ✨ TypeScript 支持

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 菜单组件基于 NaiveUI 的 NMenu 组件封装，增强了路由集成和自动展开功能。组件会根据当前路由自动高亮和展开对应菜单项，支持无限层级嵌套和折叠模式。配合主题系统可以轻松实现深色/浅色主题切换。