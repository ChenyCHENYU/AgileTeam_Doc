---
outline: 'deep'
---

# C_ContextMenu 右键菜单

> 🖱️ 声明式配置的右键上下文菜单组件，支持快捷键标注、嵌套子菜单、危险操作高亮

## 🚀 在线演示

<DemoIframe src="/preview/context-menu" title="右键菜单" height="700" />

## ✨ 特性

- **📋 声明式配置**: 通过 `ContextMenuItem[]` 数组驱动，无需手写菜单 DOM
- **📂 嵌套子菜单**: 无限层级嵌套，自动处理弹出位置
- **⌨️ 快捷键标注**: 菜单项右侧显示快捷键提示（仅展示）
- **🚨 危险操作**: 支持 `danger` 标记，红色高亮删除等危险操作
- **➖ 分割线**: 通过 `divider: true` 插入视觉分组分割线
- **🚫 禁用 / 隐藏**: 单项禁用 (`disabled`) 或动态隐藏 (`hidden`)
- **🎯 精准定位**: 基于鼠标坐标精准弹出，自动避免溢出视口
- **🔧 编程控制**: `open(x, y)` / `close()` expose 方法
- **🎨 毛玻璃效果**: 背景模糊 + 半透明，macOS 风格
- **💪 TypeScript**: 完整类型定义

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

### 最简用法

```vue
<template>
  <div @contextmenu.prevent="handleContextMenu">
    右键点击此区域
  </div>
  <C_ContextMenu
    ref="menuRef"
    :items="menuItems"
    @select="onSelect"
  />
</template>

<script setup>
  const menuRef = ref()

  const menuItems = [
    { key: 'copy', label: '复制', icon: 'mdi:content-copy', shortcut: 'Ctrl+C' },
    { key: 'paste', label: '粘贴', icon: 'mdi:content-paste', shortcut: 'Ctrl+V' },
    { key: 'd1', label: '', divider: true },
    { key: 'delete', label: '删除', icon: 'mdi:delete-outline', danger: true },
  ]

  const handleContextMenu = (e) => {
    menuRef.value.open(e.clientX, e.clientY)
  }

  const onSelect = (item) => {
    console.log('选中:', item.key)
  }
</script>
```

> [!TIP]
> 使用 `@contextmenu.prevent` 阻止浏览器默认右键菜单，再调用 `open(x, y)` 在指定坐标打开。

::: details 📂 嵌套子菜单

```typescript
const items = [
  {
    key: 'file',
    label: '文件',
    icon: 'mdi:file-outline',
    children: [
      { key: 'new', label: '新建', shortcut: 'Ctrl+N' },
      { key: 'open', label: '打开', shortcut: 'Ctrl+O' },
      {
        key: 'recent',
        label: '最近文件',
        children: [
          { key: 'r1', label: 'index.vue' },
          { key: 'r2', label: 'types.ts' },
        ],
      },
    ],
  },
  { key: 'd1', label: '', divider: true },
  { key: 'quit', label: '退出', danger: true },
]
```

:::

## 📋 API

### Props

| 属性               | 类型                 | 默认值    | 说明               |
| ------------------ | -------------------- | --------- | ------------------ |
| `items`            | `ContextMenuItem[]`  | `[]`      | 菜单项列表         |
| `minWidth`         | `number`             | `180`     | 菜单最小宽度（px） |
| `maxWidth`         | `number`             | `280`     | 菜单最大宽度（px） |
| `subMenuPlacement` | `'right' \| 'left'`  | `'right'` | 子菜单展开方向     |
| `autoClose`        | `boolean`            | `true`    | 点击项后自动关闭   |
| `disabled`         | `boolean`            | `false`   | 禁用整个菜单       |
| `zIndex`           | `number`             | `9999`    | 层级               |

### ContextMenuItem

| 字段       | 类型                 | 说明                 |
| ---------- | -------------------- | -------------------- |
| `key`      | `string`             | **必填**，唯一标识   |
| `label`    | `string`             | **必填**，菜单文字   |
| `icon`     | `string`             | 图标（Iconify）      |
| `shortcut` | `string`             | 快捷键标注（仅展示） |
| `disabled` | `boolean`            | 禁用                 |
| `hidden`   | `boolean`            | 隐藏                 |
| `divider`  | `boolean`            | 渲染为分割线         |
| `children` | `ContextMenuItem[]`  | 子菜单               |
| `danger`   | `boolean`            | 危险操作高亮         |

### Events

| 事件     | 参数                        | 说明       |
| -------- | --------------------------- | ---------- |
| `select` | `(item: ContextMenuItem)`   | 选中菜单项 |
| `open`   | `({ x: number, y: number })` | 菜单打开   |
| `close`  | —                           | 菜单关闭   |

### Expose 方法

| 方法         | 类型                            | 说明                     |
| ------------ | ------------------------------- | ------------------------ |
| `open`       | `(x: number, y: number) => void` | 在指定坐标打开菜单     |
| `close`      | `() => void`                    | 关闭菜单                 |
| `visible`    | `ComputedRef<boolean>`          | 当前是否可见             |

### CSS 变量

| 变量                     | 默认值                     | 说明       |
| ------------------------ | -------------------------- | ---------- |
| `--ctx-bg`               | `rgba(35,35,40,0.98)`     | 背景色     |
| `--ctx-bg-blur`          | `12px`                     | 背景模糊   |
| `--ctx-border`           | `rgba(255,255,255,0.08)`  | 边框色     |
| `--ctx-radius`           | `10px`                     | 圆角       |
| `--ctx-text-primary`     | `rgba(255,255,255,0.88)`  | 文字颜色   |
| `--ctx-text-danger`      | `rgba(208,48,80,0.9)`     | 危险操作色 |
| `--ctx-item-hover-bg`    | `rgba(255,255,255,0.08)`  | 悬停背景   |
| `--ctx-shortcut-color`   | `rgba(255,255,255,0.3)`   | 快捷键颜色 |
| `--ctx-divider-color`    | `rgba(255,255,255,0.06)`  | 分割线颜色 |

### 类型定义

```typescript
interface ContextMenuItem {
  key: string
  label: string
  icon?: string
  shortcut?: string
  disabled?: boolean
  hidden?: boolean
  divider?: boolean
  children?: ContextMenuItem[]
  danger?: boolean
}

interface ContextMenuProps {
  items: ContextMenuItem[]
  minWidth?: number
  maxWidth?: number
  subMenuPlacement?: 'right' | 'left'
  autoClose?: boolean
  disabled?: boolean
  zIndex?: number
}
```

## 🔧 常见问题

::: details ❌ 菜单超出屏幕边缘

组件内部自动计算视口边界，会将菜单翻转到可见区域。如仍然超出，可调整 `maxWidth` 减小菜单宽度。

:::

::: details ❌ 如何在不同区域显示不同菜单？

为不同区域绑定不同的菜单配置和 `ref`：

```vue
<div @contextmenu.prevent="e => fileMenuRef.open(e.clientX, e.clientY)">文件区</div>
<div @contextmenu.prevent="e => editMenuRef.open(e.clientX, e.clientY)">编辑区</div>
<C_ContextMenu ref="fileMenuRef" :items="fileItems" />
<C_ContextMenu ref="editMenuRef" :items="editItems" />
```

:::

## 🔄 未来规划

- [ ] 键盘导航（上下方向键 + Enter 选择）
- [ ] 菜单项搜索
- [ ] 动态菜单项（函数式 items）
- [ ] 右键自动绑定指令 `v-contextmenu`

## 📚 相关资源

- [演示页面源码](../../views/demo/51-context-menu/index.vue)

<!--@include: ./snippets/contribute.md -->
