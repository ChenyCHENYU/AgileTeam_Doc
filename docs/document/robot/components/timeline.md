---
outline: 'deep'
---

# C_Timeline 时间线

> 📅 垂直 / 水平两种布局的时间线组件，支持自定义节点图标与颜色、可折叠详情、Pending 状态

## 🚀 在线演示

<DemoIframe src="/preview/timeline" title="时间线" height="700" />

## ✨ 特性

- **↕️ 双向布局**: 垂直（默认）和水平两种方向
- **🏷️ 标签位置**: 垂直模式下支持 `left` / `right` / `alternate` 三种标签排列
- **🎨 自定义节点**: 每个节点可独立设置图标（Iconify）和颜色
- **📊 状态语义**: `success` / `warning` / `error` / `info` 四种预设状态色
- **📁 可折叠详情**: 节点内容支持折叠展开，减少长列表视觉压力
- **⏳ Pending 状态**: 尾部显示加载指示，适合实时数据流
- **🔃 反转排列**: 支持最新在前的反转排序
- **📐 三种尺寸**: `small` / `medium` / `large` 节点大小
- **🖊️ 连接线样式**: `solid` / `dashed` / `dotted` 三种线型
- **🎨 CSS 变量**: 全部尺寸颜色可通过 CSS 变量定制
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
  <C_Timeline :items="timelineData" />
</template>

<script setup>
  // 无需导入，已全局注册
  const timelineData = [
    { id: 1, title: '项目启动', time: '2026-01-01', status: 'success' },
    { id: 2, title: '需求评审', time: '2026-01-15', status: 'info' },
    { id: 3, title: '开发中', time: '2026-02-01', status: 'warning' },
  ]
</script>
```

> [!TIP]
> 每个节点通过 `items` 数组配置，支持丰富的字段自定义。

### 水平模式

```vue
<template>
  <C_Timeline :items="data" mode="horizontal" />
</template>
```

::: details 🎨 自定义节点 + 可折叠

```vue
<template>
  <C_Timeline
    :items="[
      {
        id: 1,
        title: '部署成功',
        content: '构建产物已推送至 CDN，版本号 v2.1.0',
        time: '2026-03-05 10:30',
        icon: 'mdi:rocket-launch',
        color: '#18a058',
        collapsible: true,
        defaultExpanded: false,
      },
      {
        id: 2,
        title: '代码审查通过',
        content: '3 位审查者已批准合并',
        time: '2026-03-05 09:15',
        icon: 'mdi:check-decagram',
        status: 'success',
        tags: [{ text: 'PR #128', type: 'info' }],
      },
    ]"
  />
</template>
```

:::

::: details ⏳ Pending + 交替排列

```vue {4-5}
<template>
  <C_Timeline
    :items="data"
    :pending="true"
    label-placement="alternate"
    pending-text="更多事件加载中..."
  />
</template>
```

:::

## 📋 API

### Props

| 属性             | 类型                                 | 默认值       | 说明                 |
| ---------------- | ------------------------------------ | ------------ | -------------------- |
| `items`          | `TimelineItem[]`                     | `[]`         | 时间线数据           |
| `mode`           | `'vertical' \| 'horizontal'`        | `'vertical'` | 布局方向             |
| `labelPlacement` | `'left' \| 'right' \| 'alternate'`  | `'right'`    | 垂直模式时间标签位置 |
| `pending`        | `boolean`                            | `false`      | 是否显示尾部加载指示 |
| `pendingText`    | `string`                             | `'加载中...'`| 加载文案             |
| `reverse`        | `boolean`                            | `false`      | 反转排列             |
| `size`           | `'small' \| 'medium' \| 'large'`    | `'medium'`   | 节点大小             |
| `lineType`       | `'solid' \| 'dashed' \| 'dotted'`   | `'solid'`    | 连接线样式           |
| `showTime`       | `boolean`                            | `true`       | 是否显示时间标签     |

### TimelineItem

| 字段              | 类型                                                         | 说明              |
| ----------------- | ------------------------------------------------------------ | ----------------- |
| `id`              | `string \| number`                                           | 唯一标识          |
| `title`           | `string`                                                     | **必填**，标题    |
| `content`         | `string`                                                     | 描述（支持 HTML） |
| `time`            | `string`                                                     | 时间标签          |
| `color`           | `string`                                                     | 节点颜色          |
| `icon`            | `string`                                                     | 节点图标          |
| `status`          | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'`  | 节点状态          |
| `collapsible`     | `boolean`                                                    | 是否可折叠        |
| `defaultExpanded` | `boolean`                                                    | 初始展开          |
| `tags`            | `{ text: string; type?: string }[]`                          | 标签组            |

### Events

| 事件         | 参数                       | 说明         |
| ------------ | -------------------------- | ------------ |
| `item-click` | `(item, index)`            | 节点被点击   |
| `expand`     | `(item, expanded: boolean)` | 折叠状态变化 |

### Slots

| 插槽    | 参数                | 说明           |
| ------- | ------------------- | -------------- |
| `dot`   | `{ item, index }`  | 自定义节点内容 |
| `title` | `{ item, index }`  | 自定义标题区域 |

### Expose 方法

| 方法          | 类型         | 说明               |
| ------------- | ------------ | ------------------ |
| `expandAll`   | `() => void` | 展开全部可折叠节点 |
| `collapseAll` | `() => void` | 折叠全部可折叠节点 |

### CSS 变量

| 变量                           | 默认值                     | 说明             |
| ------------------------------ | -------------------------- | ---------------- |
| `--tl-bg`                      | `transparent`              | 背景色           |
| `--tl-text-primary`            | `rgba(255,255,255,0.92)`  | 主文字色         |
| `--tl-text-secondary`          | `rgba(255,255,255,0.55)`  | 辅助文字色       |
| `--tl-line-color`              | `rgba(255,255,255,0.12)`  | 连接线颜色       |
| `--tl-line-width`              | `2px`                      | 连接线宽度       |
| `--tl-dot-size-md`             | `14px`                     | 默认节点尺寸     |
| `--tl-dot-success`             | `rgba(24,160,88,0.85)`    | 成功状态色       |
| `--tl-dot-warning`             | `rgba(240,160,32,0.85)`   | 警告状态色       |
| `--tl-dot-error`               | `rgba(208,48,80,0.85)`    | 错误状态色       |
| `--tl-dot-info`                | `rgba(32,128,240,0.85)`   | 信息状态色       |
| `--tl-content-bg`              | `rgba(40,40,45,0.6)`      | 内容区背景       |
| `--tl-content-radius`          | `10px`                     | 内容区圆角       |
| `--tl-gap`                     | `24px`                     | 节点间距         |
| `--tl-horizontal-item-width`   | `220px`                    | 水平模式节点宽度 |

### 类型定义

```typescript
interface TimelineItem {
  id: string | number
  title: string
  content?: string
  time?: string
  color?: string
  icon?: string
  status?: 'default' | 'success' | 'warning' | 'error' | 'info'
  collapsible?: boolean
  defaultExpanded?: boolean
  tags?: Array<{ text: string; type?: string }>
}

interface TimelineProps {
  items: TimelineItem[]
  mode?: 'vertical' | 'horizontal'
  labelPlacement?: 'left' | 'right' | 'alternate'
  pending?: boolean
  pendingText?: string
  reverse?: boolean
  size?: 'small' | 'medium' | 'large'
  lineType?: 'solid' | 'dashed' | 'dotted'
  showTime?: boolean
}
```

## 🔧 常见问题

::: details ❌ 水平模式下节点过多，如何滚动？

水平时间线超出容器宽度时自动显示横向滚动条。可通过 `--tl-horizontal-item-width` 调整每个节点宽度。

:::

::: details ❌ 交替排列模式下时间跑到左侧了

这是预期行为。`labelPlacement="alternate"` 时奇偶节点交错显示，时间标签和内容交替出现在两侧。

:::

## 🔄 未来规划

- [ ] 虚拟滚动（超长时间线）
- [ ] 分组 / 年份分隔
- [ ] 动画入场效果
- [ ] 连接时间线（多条时间线合并展示）

## 📚 相关资源

- [演示页面源码](../../views/demo/50-timeline/index.vue)

<!--@include: ./snippets/contribute.md -->
