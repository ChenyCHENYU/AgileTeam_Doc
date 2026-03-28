---
outline: "deep"
---

# C_Watermark 水印

> 🔐 页面水印组件，在内容区叠加文字水印层，支持全页覆盖、自定义旋转角度、颜色和间距，用于保护敏感信息展示。

## ✨ 特性

- **🌊 全页模式**：`fullPage` 覆盖整个页面（fixed 定位）
- **🔤 文字水印**：纯 CSS 实现，轻量无 Canvas 开销
- **📐 角度/间距**：`rotate`（旋转角度）和 `gap`（x/y 间距）灵活控制密度
- **🛡️ 防截图提示**：内容叠加水印，作为展示层保护措施

## 🎯 快速开始

```vue
<template>
  <!-- 局部水印（只覆盖包裹的内容） -->
  <C_Watermark text="机密文档 robot@2025">
    <view class="p-4">
      <C_Card title="合同内容">...</C_Card>
    </view>
  </C_Watermark>
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `text` | `string` | `''` | 水印文字内容（空值则不渲染水印层） |
| `fontSize` | `number` | `14` | 文字大小（px） |
| `color` | `string` | `'rgba(0,0,0,0.1)'` | 文字颜色（建议低透明度） |
| `rotate` | `number` | `-30` | 水印旋转角度（度） |
| `gap` | `[number, number]` | `[120, 80]` | 水印横向/纵向间距（px） |
| `fullPage` | `boolean` | `false` | 是否覆盖整个页面 |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 需要加水印的内容区域 |

## 🎨 使用示例

::: details 💡 全页水印（用户信息）
```vue
<template>
  <C_Watermark
    :text="`${userStore.userInfo.name} ${userStore.userInfo.phone}`"
    full-page
    :rotate="-25"
    color="rgba(0,0,0,0.06)"
  >
    <!-- 整个页面内容 -->
    <router-view />
  </C_Watermark>
</template>
:::

::: details 💡 合同/报表局部水印
```vue
<template>
  <C_Watermark text="内部资料 禁止外传" :font-size="12" :gap="[80, 60]">
    <view class="contract-content">
      <C_Title title="劳动合同" />
      <text class="contract-body">{{ contract.content }}</text>
    </view>
  </C_Watermark>
</template>
:::
