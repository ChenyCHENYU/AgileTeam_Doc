---
outline: 'deep'
---

# C_Menu 菜单组件

> 🗂️ 基于 NMenu 的智能树形导航菜单，支持 **路由适配** / **原生直传** 双模式

## 🚀 在线演示

::: tip 💻 在线体验
该组件已集成在 Robot Admin 侧边栏中，登录后即可体验多级菜单导航 → [Robot Admin](https://robotadmin.cn)
:::

## ✨ 特性

- **🔄 双数据模式**: `routes`（路由自动适配） / `options`（NMenu 原生 MenuOption[]）
- **🌍 i18n 解耦**: `labelFormatter` 回调注入翻译函数，无需绑定任何 i18n 方案
- **📱 折叠模式**: 支持菜单折叠，含折叠宽度 / 图标大小 / 下拉方向控制
- **🎨 主题定制**: `inverted` 反色 + `themeOverrides` 自定义样式覆盖
- **🚀 路由跟踪**: 自动展开当前路由对应的菜单项 & 子路径推导
- **📋 适配器配置**: 通过 `adapterConfig` 自定义 key / label / icon 取值、过滤逻辑
- **💪 TypeScript**: 完整的类型导出（`RouteItem`、`MenuAdapterConfig`）

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

### 路由模式（推荐）

传入 `routes`，组件内置适配器自动转换为 NMenu 的 `MenuOption[]`：

```vue
<template>
  <C_Menu
    :routes="menuRoutes"
    :value="route.path"
    :label-formatter="$t"
    @select="router.push"
  />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 兼容 Vue Router RouteRecordRaw & 后端返回的 JSON 路由表
const menuRoutes = [
  {
    path: '/dashboard',
    meta: { title: '仪表盘', icon: 'mdi:monitor-dashboard' },
  },
  {
    path: '/system',
    meta: { title: '系统管理', icon: 'mdi:cog' },
    children: [
      { path: '/system/user', meta: { title: '用户管理', icon: 'mdi:account' } },
      { path: '/system/role', meta: { title: '角色管理', icon: 'mdi:shield-account' } },
    ],
  },
]
</script>
```

### 原生模式

直传 NMenu 的 `MenuOption[]`，零转换：

```vue
<template>
  <C_Menu
    :options="nativeMenuOptions"
    :value="route.path"
    @select="router.push"
  />
</template>

<script setup>
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { HomeOutline } from '@vicons/ionicons5'

const nativeMenuOptions = [
  {
    key: '/home',
    label: '首页',
    icon: () => h(NIcon, null, { default: () => h(HomeOutline) }),
  },
]
</script>
```

### 折叠模式

```vue
<template>
  <C_Menu
    :routes="menuRoutes"
    :value="route.path"
    :collapsed="isCollapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :inverted="true"
    @select="router.push"
  />
</template>

<script setup>
import { ref } from 'vue'
const isCollapsed = ref(false)
</script>
```

## 📖 API 文档

### Props

| 参数                  | 类型                          | 默认值        | 说明                                                                     |
| --------------------- | ----------------------------- | ------------- | ------------------------------------------------------------------------ |
| **routes**            | `RouteItem[]`                 | —             | 路由数据，内置适配器自动转 MenuOption[]                                  |
| **options**           | `MenuOption[]`                | —             | NMenu 原生选项（优先级 > routes）                                        |
| **adapterConfig**     | `MenuAdapterConfig`           | —             | 适配器配置（仅 routes 模式），自定义 key/label/icon/filter               |
| **labelFormatter**    | `(label: string) => string`   | —             | 标签文本格式化（快捷方式，优先级 > adapterConfig.labelFormatter）        |
| **value**             | `string`                      | `''`          | 当前激活菜单项的 key（通常传 `route.path`）                              |
| **mode**              | `'vertical' \| 'horizontal'`  | `'vertical'`  | 菜单布局方向                                                             |
| **collapsed**         | `boolean`                     | `false`       | 是否折叠                                                                 |
| **collapsedWidth**    | `number`                      | `64`          | 折叠时宽度                                                               |
| **collapsedIconSize** | `number`                      | `22`          | 折叠时图标大小                                                           |
| **inverted**          | `boolean`                     | `false`       | 是否使用反色主题（深色背景）                                             |
| **themeOverrides**    | `Record<string, any>`         | —             | NMenu 主题样式覆盖                                                       |
| **indent**            | `number`                      | `24`          | 子菜单缩进像素                                                           |
| **rootIndent**        | `number`                      | `16`          | 根级缩进像素                                                             |
| **dropdownProps**     | `DropdownProps`               | `{ placement: 'right-start', trigger: 'hover' }` | 折叠模式下拉属性 |

### Events

| 事件名                  | 参数                      | 说明             |
| ----------------------- | ------------------------- | ---------------- |
| **select**              | `(key: string)`           | 菜单项被选中     |
| **update:expandedKeys** | `(keys: string[])`        | 展开项变化       |

### Expose

| 方法/属性      | 类型                      | 说明                   |
| -------------- | ------------------------- | ---------------------- |
| **showOption** | `(key: string) => void`   | 展开并滚动到指定菜单项 |
| **menuRef**    | `Ref<MenuInst \| null>`   | NMenu 实例引用         |

### RouteItem 类型

```typescript
interface RouteItem {
  path: string                              // 路由路径（必须）
  name?: string                             // 路由名称
  redirect?: string                         // 重定向路径
  component?: string | (() => Promise<any>) // 组件
  meta?: {
    title?: string       // 页面/菜单标题
    icon?: string | (() => VNode) // 图标（Iconify 格式或渲染函数）
    hidden?: boolean     // 是否在菜单中隐藏
    affix?: boolean      // 是否固定标签栏
    keepAlive?: boolean  // 是否缓存
    orderNo?: number     // 排序权重
    [key: string]: any
  }
  children?: RouteItem[]
  type?: 'group' | 'divider'               // NMenu 特殊类型
  disabled?: boolean
}
```

### MenuAdapterConfig 类型

```typescript
interface MenuAdapterConfig {
  labelFormatter?: (title: string) => string       // i18n 格式化
  getKey?: (route: RouteItem) => string            // 自定义 key 取值（默认 route.path）
  getLabel?: (route: RouteItem) => string          // 自定义 label 取值（默认 meta.title）
  filter?: (route: RouteItem) => boolean           // 过滤器（默认排除 hidden）
  renderIcon?: (icon) => (() => VNode) | undefined // 自定义图标渲染
  recursive?: boolean                              // 是否递归处理子路由（默认 true）
}
```

## 🎨 使用示例

::: details 📋 后台管理系统侧边栏 — routes 模式 + 折叠

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
      <div class="logo">
        <img src="/logo.svg" alt="Logo" />
        <span v-show="!collapsed">Robot Admin</span>
      </div>

      <C_Menu
        :routes="appStore.menuRoutes"
        :value="route.path"
        :collapsed="collapsed"
        :inverted="true"
        :label-formatter="$t"
        @select="router.push"
      />
    </NLayoutSider>

    <NLayout>
      <NLayoutContent>
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'

const { t: $t } = useI18n()
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const collapsed = ref(false)
</script>
```

:::

::: details 🌐 顶部导航 — 水平模式

```vue
<template>
  <NLayoutHeader bordered>
    <div class="header-nav">
      <C_Menu
        :routes="topRoutes"
        :value="route.path"
        mode="horizontal"
        @select="router.push"
      />
    </div>
  </NLayoutHeader>
</template>
```

:::

::: details 🔧 自定义适配器 — 后端 JSON + 自定义 key

```vue
<template>
  <C_Menu
    :routes="apiRoutes"
    :value="route.path"
    :adapter-config="adapterConfig"
    @select="router.push"
  />
</template>

<script setup>
const adapterConfig = {
  getKey: (route) => route.name || route.path,       // 用 name 作为 key
  getLabel: (route) => route.meta?.title || '未命名', // 自定义 label
  filter: (route) => !route.meta?.hidden && route.meta?.title, // 排除无标题的
  labelFormatter: (title) => `📋 ${title}`,          // 前缀装饰（或注入 i18n）
}
</script>
```

:::

::: details ⚡ createMenuOptions 独立使用

```typescript
// 适配器也可以脱离组件独立使用
import { createMenuOptions, flattenRoutes } from '@robot-admin/naive-ui-components'

// 基础转换
const menuOptions = createMenuOptions(routes)

// 带 i18n + 过滤
const i18nMenuOptions = createMenuOptions(routes, {
  labelFormatter: t,
  filter: route => !route.meta?.hidden,
})

// 路由扁平化（用于全局搜索）
const flatRoutes = flattenRoutes(routes)
```

:::

## ⚠️ 注意事项

::: code-group

```vue [✅ 推荐 — routes 模式]
<!-- 传 routes + labelFormatter，组件自动处理转换 -->
<C_Menu
  :routes="menuRoutes"
  :value="route.path"
  :label-formatter="$t"
  @select="router.push"
/>
```

```vue [❌ 避免 — 旧版 data prop]
<!-- ⚠️ 已废弃 data prop，请迁移到 routes 或 options -->
<C_Menu :data="menuData" />
```

:::

### 迁移指南（从旧版迁移）

旧版使用 `data: MenuOptions[]`，新版有两种迁移方式：

| 旧版                                   | 新版路由模式                                     | 新版原生模式                  |
| -------------------------------------- | ------------------------------------------------ | ----------------------------- |
| `:data="menuData"`                     | `:routes="menuRoutes"`                           | `:options="menuOptions"`      |
| `label / key / icon / path / children` | `path + meta.title + meta.icon + children`       | NMenu 原生 `MenuOption[]` 格式 |
| 无 i18n 支持                           | `:label-formatter="$t"`                          | 自行在 label 中处理           |
| 无 select 事件                         | `@select="router.push"`                          | `@select="router.push"`      |

## 🔧 高级用法

### 配合权限过滤

```typescript
import { createMenuOptions } from '@robot-admin/naive-ui-components'
import type { RouteItem, MenuAdapterConfig } from '@robot-admin/naive-ui-components'

const config: MenuAdapterConfig = {
  labelFormatter: (title) => t(`menu.${title}`),
  filter: (route) => {
    // 仅显示有权限的菜单
    return !route.meta?.hidden && hasPermission(route.meta?.permissions)
  },
}

const menuOptions = createMenuOptions(apiRoutes, config)
```

### 路由跟踪原理

组件内部通过以下逻辑自动管理展开状态：

1. **路径段推导** — 将 `value`（当前路径）按 `/` 分割，依次作为展开 key
2. **祖先查找** — 在 `mergedOptions` 中递归查找目标 key 的所有父级
3. **合并展开** — 新旧 expandedKeys 取并集，确保手动展开的不会被覆盖
4. **滚动聚焦** — `nextTick` 后调用 `menuRef.showOption()` 滚动到激活项

## 📝 更新日志

### v0.5.0 (2025-06)

- ♻️ **破坏性变更**: 移除旧版 `data` prop，改为 `routes` / `options` 双模式
- ✨ 新增 `adapterConfig` 适配器配置
- ✨ 新增 `labelFormatter` i18n 支持
- ✨ 新增 `value` prop 精确控制激活项
- ✨ 新增 `themeOverrides` / `indent` / `rootIndent` / `dropdownProps`
- ✨ 新增 `update:expandedKeys` 事件
- ✨ Expose `showOption()` & `menuRef`

### v0.3.0 (2025-03)

- ✨ 初始版本（`data` prop 模式）


<!--@include: ./snippets/contribute.md -->


**💡 提示**: 这个组件设计用于团队协作，如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更好的开发体验！ 🚀
