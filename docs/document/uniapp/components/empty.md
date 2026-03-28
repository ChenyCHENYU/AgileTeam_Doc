---
outline: "deep"
---

# C_Empty 空状态

> 🌫️ 空状态占位组件，内置 8 种场景插画，支持自定义文案、图标和操作按钮，统一全项目的空态视觉体验。

## ✨ 特性

- **🖼️ 8 种内置场景**：`default` / `network` / `search` / `permission` / `error` / `cart` / `message` / `collect`
- **✏️ 自定义文案**：覆盖内置文案或通过插槽完全自定义
- **🖱️ 操作按钮**：可选的重试/去浏览按钮，触发 `action` 事件
- **🎨 图标插槽**：提供 `icon` 插槽可替换图标区域

## 🎯 快速开始

```vue
<template>
  <!-- 内置语义类型 -->
  <C_Empty type="search" />

  <!-- 自定义文案 -->
  <C_Empty type="default" text="暂无工单" />

  <!-- 带操作按钮 -->
  <C_Empty type="network" show-action @action="reload" />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `string` | `'default'` | 空状态类型（见下表） |
| `text` | `string` | `''` | 自定义描述文案（会覆盖内置文案） |
| `icon` | `string` | `''` | 自定义图标名（UnoCSS 类名） |
| `iconSize` | `number` | `48` | 图标尺寸（px） |
| `showAction` | `boolean` | `false` | 是否显示操作按钮 |
| `actionText` | `string` | `'重新加载'` | 操作按钮文案 |

### 内置类型一览

| type | 图标 | 默认文案 | 适用场景 |
| --- | --- | --- | --- |
| `default` | 收件箱 | 暂无数据 | 通用列表为空 |
| `network` | WiFi 断开 | 网络异常 | 断网/请求超时 |
| `search` | 搜索 | 未找到结果 | 搜索无结果 |
| `permission` | 锁 | 暂无权限 | 无权限访问 |
| `error` | 警告圆 | 加载失败 | 接口报错 |
| `cart` | 购物车 | 购物车空空如也 | 空购物车 |
| `message` | 消息 | 暂无消息 | 消息列表为空 |
| `collect` | 爱心 | 暂无收藏 | 收藏列表为空 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `action` | - | 点击操作按钮时触发 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义文案内容 |
| `icon` | 自定义图标区域 |
| `action` | 自定义操作按钮 |

## 🎨 使用示例

::: details 💡 配合 C_List 的空状态联动
```vue
<template>
  <C_List
    :loading="loading"
    :finished="finished"
    :show-empty="!list.length && !loading"
    empty-type="search"
    empty-text="未找到符合条件的工单"
  >
    ...
  </C_List>
</template>
:::

::: details 💡 断网重试场景
```vue
<template>
  <C_Empty
    v-if="isNetworkError"
    type="network"
    show-action
    action-text="点击重试"
    @action="fetchData"
  />
</template>
:::
