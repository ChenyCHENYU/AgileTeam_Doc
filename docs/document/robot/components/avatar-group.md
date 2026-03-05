---
outline: 'deep'
---

# C_AvatarGroup 头像组

> 👥 协作者头像堆叠展示组件，支持溢出 +N、在线状态、首字母 fallback、悬浮提示

## 🚀 在线演示

<DemoIframe src="/preview/avatar-group" title="头像组" height="700" />

## ✨ 特性

- **📚 堆叠展示**: 头像重叠排列，节省空间展示团队成员
- **➕ 溢出 +N**: 超过 `max` 数量自动显示 `+N` 溢出按钮
- **🟢 在线状态**: 支持 `online` / `offline` / `busy` / `away` 四种状态指示
- **🔤 首字母 Fallback**: 无头像时自动生成首字母 + 稳定背景色
- **💬 悬浮提示**: 鼠标悬停显示用户名 Tooltip
- **🖱️ 可点击**: 单个头像和 +N 按钮均支持点击事件
- **↔️ 排列方向**: `ltr`（从左到右）/ `rtl`（从右到左）
- **⭕ 双形状**: `circle`（圆形）/ `square`（圆角方形）
- **🎨 主题适配**: 使用 Naive UI CSS 变量，自动跟随亮暗主题
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
  <C_AvatarGroup
    :items="members"
    :max="5"
    :size="40"
    clickable
    @item-click="handleClick"
  />
</template>

<script setup>
  const members = [
    { id: 1, name: 'CHENY', src: '/avatar/cheny.png', status: 'online' },
    { id: 2, name: '张三', status: 'busy' },
    { id: 3, name: 'Alice', src: '/avatar/alice.png', status: 'away' },
    { id: 4, name: '李四', status: 'offline' },
    { id: 5, name: 'Bob', src: '/avatar/bob.png', status: 'online' },
    { id: 6, name: '王五', status: 'online' },
  ]

  const handleClick = (item) => {
    console.log('点击:', item.name)
  }
</script>
```

> [!TIP]
> 不需要传头像 URL — 组件会自动根据 `name` 生成首字母和稳定背景色。

::: details 🔲 方形 + RTL

```vue {4-5}
<template>
  <C_AvatarGroup
    :items="members"
    shape="square"
    direction="rtl"
    :size="48"
    :max="4"
  />
</template>
```

:::

::: details ➕ 点击 +N 显示全部

```vue
<template>
  <C_AvatarGroup
    :items="allMembers"
    :max="3"
    @overflow-click="showFullList"
  />
</template>

<script setup>
  const showFullList = (hiddenItems) => {
    console.log('隐藏的成员:', hiddenItems.map(i => i.name))
    // 弹出对话框显示完整列表...
  }
</script>
```

:::

## 📋 API

### Props

| 属性                | 类型                   | 默认值    | 说明                     |
| ------------------- | ---------------------- | --------- | ------------------------ |
| `items`             | `AvatarItem[]`         | —         | **必填**，头像数据       |
| `max`               | `number`               | `5`       | 最多显示数量             |
| `size`              | `number`               | `40`      | 头像尺寸（px）           |
| `overlap`           | `number`               | `-10`     | 堆叠偏移（负值表示重叠） |
| `shape`             | `'circle' \| 'square'` | `'circle'`| 头像形状                 |
| `showStatus`        | `boolean`              | `true`    | 是否显示状态指示点       |
| `showTooltip`       | `boolean`              | `true`    | 是否显示悬浮提示         |
| `clickable`         | `boolean`              | `false`   | 头像是否可点击           |
| `overflowClickable` | `boolean`              | `true`    | +N 按钮是否可点击        |
| `direction`         | `'ltr' \| 'rtl'`      | `'ltr'`   | 排列方向                 |

### AvatarItem

| 字段      | 类型                                       | 说明                     |
| --------- | ------------------------------------------ | ------------------------ |
| `id`      | `string \| number`                         | **必填**，唯一标识       |
| `name`    | `string`                                   | **必填**，姓名           |
| `src`     | `string`                                   | 头像图片 URL             |
| `tooltip` | `string`                                   | 悬浮提示（默认取 name）  |
| `status`  | `'online' \| 'offline' \| 'busy' \| 'away'` | 在线状态               |

### Events

| 事件            | 参数             | 说明             |
| --------------- | ---------------- | ---------------- |
| `itemClick`     | `(item: AvatarItem)` | 点击某个头像     |
| `overflowClick` | `(items: AvatarItem[])` | 点击 +N 溢出按钮 |

### 类型定义

```typescript
interface AvatarItem {
  id: string | number
  name: string
  src?: string
  tooltip?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
  extra?: Record<string, unknown>
}

interface AvatarGroupProps {
  items: AvatarItem[]
  max?: number
  size?: number
  overlap?: number
  shape?: 'circle' | 'square'
  showStatus?: boolean
  showTooltip?: boolean
  clickable?: boolean
  overflowClickable?: boolean
  direction?: 'ltr' | 'rtl'
}
```

### 内置工具函数

| 函数            | 说明                                    |
| --------------- | --------------------------------------- |
| `getInitials()` | 从名字提取首字母（支持中英文）          |
| `nameToColor()` | 根据名字生成稳定的背景色（16 色调色板） |

## 🔧 常见问题

::: details ❌ 头像图片加载失败怎么办？

组件检测到 `src` 图片加载失败时，自动回退到首字母 + 背景色显示，无需额外处理。

:::

::: details ❌ 如何自定义状态颜色？

状态颜色通过内置 `STATUS_COLOR_MAP` 定义：

```typescript
{
  online: '#18a058',  // 绿
  offline: '#909399', // 灰
  busy: '#e53e3e',    // 红
  away: '#f0a020',    // 橙
}
```

暂不支持通过 prop 覆盖，后续版本将开放。

:::

## 🔄 未来规划

- [ ] 自定义状态颜色 prop
- [ ] 头像 `#avatar` 作用域插槽
- [ ] +N `#overflow` 自定义插槽
- [ ] 动画入场效果
- [ ] 响应式 `max`（根据容器宽度自动计算）

## 📚 相关资源

- [演示页面源码](../../views/demo/53-avatar-group/index.vue)

<!--@include: ./snippets/contribute.md -->
