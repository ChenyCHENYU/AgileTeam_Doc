---
outline: "deep"
---

# C_Skeleton 骨架屏

> 💀 多场景骨架屏占位组件，内置 8 种业务预设（文本/头像/卡片/表格/表单/列表/详情/图片），支持动画效果和自定义配置，提升页面加载体验

## 🚀 在线演示

<DemoIframe src="/preview/skeleton" title="骨架屏" height="600" />

## ✨ 特性

- **📦 8 种预设模式**: text / avatar / card / table / form / list / detail / image
- **🎭 动画效果**: 波浪（wave）和脉冲（pulse）两种加载动画
- **⚙️ 灵活配置**: 每种预设支持细粒度参数（行数/列数/是否显示头像等）
- **🔄 状态切换**: `loading` 控制骨架屏和真实内容的交替显示
- **🎨 CSS 变量**: 全局颜色/尺寸可定制，自动适配主题
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
  <C_Skeleton :loading="loading">
    <p>这是加载完成后显示的内容</p>
  </C_Skeleton>
</template>

<script setup>
const loading = ref(true);

// 模拟请求完成
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
```

### 表格骨架屏

```vue
<template>
  <C_Skeleton
    preset="table"
    :loading="tableLoading"
    :table="{ rows: 8, cols: 5, showHeader: true, showActions: true }"
  >
    <C_Table :options="tableOptions" :data="tableData" />
  </C_Skeleton>
</template>
```

### 表单骨架屏

```vue
<template>
  <C_Skeleton
    preset="form"
    :loading="formLoading"
    :form="{ fields: 8, cols: 2, showLabel: true, showActions: true }"
  >
    <C_Form :options="formOptions" :model="formData" />
  </C_Skeleton>
</template>
```

### 列表骨架屏

```vue
<template>
  <C_Skeleton
    preset="list"
    :loading="listLoading"
    :list="{ items: 6, showAvatar: true, descLines: 3 }"
  >
    <div v-for="item in listData" :key="item.id">
      {{ item.title }}
    </div>
  </C_Skeleton>
</template>
```

### 卡片骨架屏

```vue
<template>
  <C_Skeleton
    preset="card"
    :loading="cardLoading"
    :card="{ showCover: true, titleLines: 1, descLines: 3, showFooter: true }"
    :repeat="3"
  >
    <NCard v-for="item in cards" :key="item.id">
      {{ item.content }}
    </NCard>
  </C_Skeleton>
</template>
```

### 禁用动画

```vue
<template>
  <C_Skeleton :loading="true" :animation="false" preset="text" />
</template>
```

## � API 文档

### Props

| 参数             | 类型                                                                                 | 默认值   | 说明           |
| ---------------- | ------------------------------------------------------------------------------------ | -------- | -------------- |
| **preset**       | `'text' \| 'avatar' \| 'card' \| 'table' \| 'form' \| 'list' \| 'detail' \| 'image'` | `'text'` | 预设模式       |
| **loading**      | `boolean`                                                                            | `true`   | 是否显示骨架屏 |
| **animation**    | `'wave' \| 'pulse' \| false`                                                         | `'wave'` | 动画类型       |
| **repeat**       | `number`                                                                             | `3`      | 重复渲染次数   |
| **borderRadius** | `string`                                                                             | `'4px'`  | 骨架块圆角     |
| **table**        | `SkeletonTableConfig`                                                                | —        | 表格预设配置   |
| **form**         | `SkeletonFormConfig`                                                                 | —        | 表单预设配置   |
| **list**         | `SkeletonListConfig`                                                                 | —        | 列表预设配置   |
| **card**         | `SkeletonCardConfig`                                                                 | —        | 卡片预设配置   |
| **detail**       | `SkeletonDetailConfig`                                                               | —        | 详情预设配置   |

### SkeletonTableConfig

| 字段          | 类型      | 默认值 | 说明           |
| ------------- | --------- | ------ | -------------- |
| `rows`        | `number`  | `5`    | 数据行数       |
| `cols`        | `number`  | `4`    | 列数           |
| `showHeader`  | `boolean` | `true` | 是否显示表头   |
| `showActions` | `boolean` | `true` | 是否显示操作列 |

### SkeletonFormConfig

| 字段          | 类型      | 默认值 | 说明             |
| ------------- | --------- | ------ | ---------------- |
| `fields`      | `number`  | `6`    | 表单项数量       |
| `cols`        | `number`  | `2`    | 列数             |
| `showLabel`   | `boolean` | `true` | 是否显示标签     |
| `showActions` | `boolean` | `true` | 是否显示操作按钮 |

### SkeletonListConfig

| 字段         | 类型      | 默认值 | 说明         |
| ------------ | --------- | ------ | ------------ |
| `items`      | `number`  | `5`    | 列表项数量   |
| `showAvatar` | `boolean` | `true` | 是否显示头像 |
| `descLines`  | `number`  | `2`    | 描述文字行数 |

### SkeletonCardConfig

| 字段         | 类型      | 默认值 | 说明         |
| ------------ | --------- | ------ | ------------ |
| `showCover`  | `boolean` | `true` | 是否显示封面 |
| `titleLines` | `number`  | `1`    | 标题行数     |
| `descLines`  | `number`  | `2`    | 描述行数     |
| `showFooter` | `boolean` | `true` | 是否显示底部 |

### SkeletonDetailConfig

| 字段         | 类型      | 默认值 | 说明         |
| ------------ | --------- | ------ | ------------ |
| `fields`     | `number`  | `6`    | 字段数量     |
| `valueLines` | `number`  | `1`    | 值的行数     |
| `showAvatar` | `boolean` | `true` | 是否显示头像 |

### Slots

| 插槽名      | 说明                     |
| ----------- | ------------------------ |
| **default** | 加载完成后显示的真实内容 |

### CSS 变量

| 变量                             | 默认值    | 说明         |
| -------------------------------- | --------- | ------------ |
| `--c-skeleton-bg`                | `#e5e7eb` | 骨架块背景色 |
| `--c-skeleton-radius`            | `4px`     | 默认圆角     |
| `--c-skeleton-circle-size`       | `40px`    | 圆形占位尺寸 |
| `--c-skeleton-circle-sm`         | `32px`    | 小圆形尺寸   |
| `--c-skeleton-circle-lg`         | `56px`    | 大圆形尺寸   |
| `--c-skeleton-line-height`       | `16px`    | 文本行高     |
| `--c-skeleton-line-sm-height`    | `12px`    | 小文本行高   |
| `--c-skeleton-line-mini-height`  | `8px`     | 迷你文本行高 |
| `--c-skeleton-gap`               | `12px`    | 元素间距     |
| `--c-skeleton-card-cover-height` | `160px`   | 卡片封面高度 |
| `--c-skeleton-image-height`      | `200px`   | 图片占位高度 |

### 类型定义

```typescript
type SkeletonPreset =
  | "text"
  | "avatar"
  | "card"
  | "table"
  | "form"
  | "list"
  | "detail"
  | "image";
type SkeletonAnimation = "wave" | "pulse" | false;

interface SkeletonTableConfig {
  rows?: number;
  cols?: number;
  showHeader?: boolean;
  showActions?: boolean;
}

interface SkeletonFormConfig {
  fields?: number;
  cols?: number;
  showLabel?: boolean;
  showActions?: boolean;
}

interface SkeletonListConfig {
  items?: number;
  showAvatar?: boolean;
  descLines?: number;
}

interface SkeletonCardConfig {
  showCover?: boolean;
  titleLines?: number;
  descLines?: number;
  showFooter?: boolean;
}

interface SkeletonDetailConfig {
  fields?: number;
  valueLines?: number;
  showAvatar?: boolean;
}
```

## 🔧 常见问题

::: details ❌ 骨架屏和真实内容切换时闪烁

确保 `loading` 状态由实际异步操作控制，避免频繁切换：

```vue
<script setup>
const loading = ref(true);

onMounted(async () => {
  try {
    await fetchData();
  } finally {
    loading.value = false;
  }
});
</script>
```

:::

::: details ❌ 如何在暗色主题下适配？

组件通过 CSS 变量自动适配 Naive UI 暗色主题。如需进一步自定义：

```css
.dark .c-skeleton-block {
  --c-skeleton-bg: #334155;
}
```

:::

## � 更新日志

### v0.6.10 (2026-02-14)

- ✨ 新增 `C_Skeleton` 骨架屏组件
- ✨ 支持 8 种业务预设模式（text / avatar / card / table / form / list / detail / image）
- ✨ 支持波浪、脉冲两种加载动画
- ✨ 支持 CSS 变量主题定制

## 📚 相关资源

- [演示页面源码](../../views/demo/55-skeleton/index.vue)

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 骨架屏组件专为提升页面加载体验而设计，内置的 8 种业务预设覆盖了表格、表单、列表、卡片等常见场景，一行配置即可使用。如果遇到问题请先查看文档，或者在团队群里讨论。💀
