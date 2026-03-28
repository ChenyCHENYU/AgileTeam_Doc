---
outline: "deep"
---

# C_Progress 进度条

> 📊 进度展示组件，支持线性进度条和圆形进度环两种形态，内置状态颜色映射和过渡动画。

## ✨ 特性

- **⭕ 圆形进度环**：Canvas 绘制，适合仪表盘和完成率展示
- **➖ 线性进度条**：条状 Bar，常用于任务完成度、文件上传
- **🎨 状态颜色**：`normal` / `success` / `warning` / `error` 自动映射颜色
- **✨ 过渡动画**：`animated` 开启进度变化的平滑动画
- **📝 自定义内容**：圆形中心支持插槽自定义内容

## 🎯 快速开始

```vue
<template>
  <!-- 线性进度条 -->
  <C_Progress :percent="65" />

  <!-- 带状态 -->
  <C_Progress :percent="100" status="success" />

  <!-- 圆形进度环 -->
  <C_Progress :percent="78" circle :circle-size="200" />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `percent` | `number` | `0` | 进度百分比（0-100） |
| `showText` | `boolean` | `true` | 是否显示百分比文字 |
| `strokeHeight` | `number` | `12` | 线条高度（rpx，仅线性模式） |
| `color` | `string` | `''` | 自定义进度颜色（优先于 status） |
| `trackColor` | `string` | `'#E5E5EA'` | 轨道底色 |
| `animated` | `boolean` | `true` | 是否开启过渡动画 |
| `status` | `'normal' \| 'success' \| 'warning' \| 'error'` | `'normal'` | 状态（影响颜色） |
| `circle` | `boolean` | `false` | 是否为圆形进度环 |
| `circleSize` | `number` | `200` | 圆形尺寸（rpx） |
| `circleStrokeWidth` | `number` | `12` | 圆形线宽（rpx） |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 圆形进度环中心自定义内容（替代百分比文字） |

## 🎨 使用示例

::: details 💡 任务完成率仪表
```vue
<template>
  <view class="flex gap-4">
    <C_Progress
      v-for="task in tasks"
      :key="task.id"
      :percent="task.progress"
      circle
      :circle-size="160"
      :status="task.progress >= 100 ? 'success' : 'normal'"
    >
      <text class="text-xs">{{ task.name }}</text>
    </C_Progress>
  </view>
</template>
:::

::: details 💡 文件上传多级进度
```vue
<template>
  <view v-for="file in files" :key="file.id" class="mb-3">
    <view class="flex justify-between mb-1">
      <text class="text-sm">{{ file.name }}</text>
      <text class="text-sm text-gray-500">{{ file.progress }}%</text>
    </view>
    <C_Progress
      :percent="file.progress"
      :status="file.error ? 'error' : file.done ? 'success' : 'normal'"
      :show-text="false"
    />
  </view>
</template>
:::
