---
outline: "deep"
---

# C_OrgChart 组织架构图

> 🏢 可交互的组织架构图组件，支持垂直/水平布局、节点折叠展开、缩放平移、自定义节点渲染，适用于组织架构、部门结构、层级关系可视化等场景

## 🚀 在线演示

<DemoIframe src="/preview/orgchart" title="组织架构图" height="700" />

## ✨ 特性

- **🌳 树形结构**: 递归渲染任意深度的组织架构树
- **📐 双向布局**: 支持垂直（上→下）和水平（左→右）两种布局方向
- **🔗 多种连线**: 直线、圆角、阶梯三种连线风格
- **🔍 缩放平移**: 鼠标滚轮缩放（0.3x–2x），拖拽平移画布
- **📂 折叠展开**: 节点可折叠/展开子树，支持默认折叠
- **🎨 自定义节点**: 通过 `#node` 插槽完全自定义节点渲染
- **🖱️ 节点事件**: 支持节点点击、展开、折叠事件
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
  <C_OrgChart :data="orgData" />
</template>

<script setup>
const orgData = {
  id: 1,
  label: "总经理",
  subtitle: "CEO",
  avatar: "/avatar/ceo.png",
  children: [
    {
      id: 2,
      label: "技术总监",
      subtitle: "CTO",
      children: [
        { id: 4, label: "前端组长", subtitle: "前端开发" },
        { id: 5, label: "后端组长", subtitle: "后端开发" },
      ],
    },
    {
      id: 3,
      label: "产品总监",
      subtitle: "CPO",
      children: [{ id: 6, label: "产品经理A", subtitle: "产品设计" }],
    },
  ],
};
</script>
```

### 水平布局 + 阶梯连线

```vue
<template>
  <C_OrgChart
    :data="orgData"
    direction="horizontal"
    line-style="stepped"
    line-color="#6366f1"
    :line-width="2"
  />
</template>
```

### 自定义节点渲染

```vue
<template>
  <C_OrgChart :data="orgData">
    <template #node="{ node, isLeaf, isExpanded }">
      <div class="custom-node">
        <NAvatar v-if="node.avatar" :src="node.avatar" round :size="48" />
        <div>
          <strong>{{ node.label }}</strong>
          <p>{{ node.subtitle }}</p>
        </div>
        <NTag v-if="isLeaf" size="small" type="info">叶节点</NTag>
      </div>
    </template>
  </C_OrgChart>
</template>
```

### 控制缩放与视图

```vue
<template>
  <div>
    <NSpace>
      <NButton @click="chartRef?.zoomIn()">放大</NButton>
      <NButton @click="chartRef?.zoomOut()">缩小</NButton>
      <NButton @click="chartRef?.resetView()">重置</NButton>
    </NSpace>
    <C_OrgChart
      ref="chartRef"
      :data="orgData"
      :initial-zoom="0.8"
      :min-zoom="0.2"
      :max-zoom="3"
    />
  </div>
</template>

<script setup>
const chartRef = ref();
</script>
```

## � API 文档

### Props

| 参数               | 类型                                   | 默认值       | 说明                  |
| ------------------ | -------------------------------------- | ------------ | --------------------- |
| **data**           | `OrgChartNode`                         | —            | 树形数据 **（必填）** |
| **direction**      | `'vertical' \| 'horizontal'`           | `'vertical'` | 布局方向              |
| **lineStyle**      | `'straight' \| 'rounded' \| 'stepped'` | `'rounded'`  | 连线风格              |
| **lineColor**      | `string`                               | `'#d1d5db'`  | 连线颜色              |
| **lineWidth**      | `number`                               | `2`          | 连线宽度（px）        |
| **nodeSpacing**    | `number`                               | `24`         | 同层节点间距（px）    |
| **levelSpacing**   | `number`                               | `48`         | 层级间距（px）        |
| **zoomable**       | `boolean`                              | `true`       | 是否启用缩放          |
| **pannable**       | `boolean`                              | `true`       | 是否启用拖拽平移      |
| **initialZoom**    | `number`                               | `1`          | 初始缩放比例          |
| **minZoom**        | `number`                               | `0.3`        | 最小缩放比例          |
| **maxZoom**        | `number`                               | `2`          | 最大缩放比例          |
| **collapsible**    | `boolean`                              | `true`       | 是否启用节点折叠      |

### OrgChartNode

| 字段        | 类型                      | 说明                         |
| ----------- | ------------------------- | ---------------------------- |
| `id`        | `string \| number`        | 节点唯一标识                 |
| `label`     | `string`                  | 节点标题（如姓名/部门名）    |
| `subtitle`  | `string`                  | 副标题（如职位/描述）        |
| `avatar`    | `string`                  | 头像 URL                     |
| `children`  | `OrgChartNode[]`          | 子节点列表                   |
| `className` | `string`                  | 自定义 CSS 类名              |
| `collapsed` | `boolean`                 | 是否默认折叠                 |
| `data`      | `Record<string, unknown>` | 透传数据，在事件回调中可获取 |

### Events

| 事件名              | 参数                   | 说明     |
| ------------------- | ---------------------- | -------- |
| **node-click**      | `(node: OrgChartNode)` | 节点点击 |
| **node-expand**     | `(node: OrgChartNode)` | 节点展开 |
| **node-collapse**   | `(node: OrgChartNode)` | 节点折叠 |

### Slots

| 插槽名   | 参数                                                           | 说明           |
| -------- | -------------------------------------------------------------- | -------------- |
| **node** | `{ node: OrgChartNode, isLeaf: boolean, isExpanded: boolean }` | 自定义节点渲染 |

### Expose 方法

| 方法名         | 类型          | 说明         |
| -------------- | ------------- | ------------ |
| **zoomIn**     | `() => void`  | 放大         |
| **zoomOut**    | `() => void`  | 缩小         |
| **resetView**  | `() => void`  | 重置视图     |
| **zoom**       | `Ref<number>` | 当前缩放比例 |

### CSS 变量

| 变量                          | 默认值                         | 说明       |
| ----------------------------- | ------------------------------ | ---------- |
| `--c-orgchart-line-color`     | `#d1d5db`                      | 连线颜色   |
| `--c-orgchart-line-width`     | `2px`                          | 连线宽度   |
| `--c-orgchart-node-spacing`   | `24px`                         | 节点间距   |
| `--c-orgchart-level-spacing`  | `48px`                         | 层级间距   |
| `--c-orgchart-node-bg`        | `var(--card-color, #ffffff)`   | 节点背景色 |
| `--c-orgchart-node-border`    | `var(--border-color, #e5e7eb)` | 节点边框色 |
| `--c-orgchart-node-shadow`    | `rgba(0, 0, 0, 0.06)`          | 节点阴影   |
| `--c-orgchart-label-color`    | `var(--text-color-1, #262626)` | 标题颜色   |
| `--c-orgchart-subtitle-color` | `var(--text-color-3, #999)`    | 副标题颜色 |
| `--c-orgchart-avatar-size`    | `36px`                         | 头像尺寸   |

### 类型定义

```typescript
interface OrgChartNode {
  id: string | number;
  label: string;
  subtitle?: string;
  avatar?: string;
  children?: OrgChartNode[];
  className?: string;
  collapsed?: boolean;
  data?: Record<string, unknown>;
}
```

## 🔧 常见问题

::: details ❌ 在小容器中节点被裁切

确保父容器有足够的宽高，或启用缩放平移功能让用户自行调整视野：

```vue
<div style="width: 100%; height: 600px; overflow: hidden;">
  <C_OrgChart :data="orgData" :zoomable="true" :pannable="true" />
</div>
```

:::

::: details ❌ 如何默认折叠某些节点？

在数据中设置 `collapsed: true`：

```typescript
const orgData = {
  id: 1,
  label: '根节点',
  children: [
    {
      id: 2,
      label: '子节点',
      collapsed: true, // 默认折叠
      children: [...]
    }
  ]
}
```

:::

## � 更新日志

### v0.6.10 (2026-02-14)

- ✨ 新增 `C_OrgChart` 组织架构图组件
- ✨ 支持垂直/水平两种布局方向
- ✨ 支持直线、圆角、阶梯三种连线风格
- ✨ 支持缩放平移、节点折叠展开
- ✨ 支持通过 `#node` 插槽自定义节点渲染

## 📚 相关资源

- [演示页面源码](../../views/demo/56-orgchart/index.vue)

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 组织架构图组件适用于人员组织、部门层级、审批链路等树形关系的可视化展示。通过缩放平移和节点折叠功能，大规模组织结构也能清晰呈现。如果遇到问题请先查看文档，或者在团队群里讨论。🏢
