---
outline: "deep"
---

# C_Signature 电子签名

> ✍️ Canvas 手写电子签名组件，支持撤销、清除和导出 PNG/JPG，适用于合同签署、工单确认等需要手写名字的场景。

## ✨ 特性

- **✏️ 平滑笔迹**：连续贝塞尔曲线绘制，笔迹圆润自然
- **↩️ 撤销操作**：按路径记录，逐步撤销上一笔
- **🖼️ 导出图片**：输出为 base64 或临时文件路径，直接上传服务器
- **🎨 样式可配**：画笔颜色、粗细、背景色全部可定制
- **📋 内置操作栏**：清除 / 撤销 / 确认三个按钮（可隐藏自行实现）

## 🎯 快速开始

```vue
<template>
  <C_Signature
    placeholder="请在此处手写签名"
    @confirm="onSignConfirm"
    @clear="onSignClear"
  />
</template>

<script setup lang="ts">
function onSignConfirm({ filePath, base64 }: { filePath: string; base64: string }) {
  // filePath: 临时文件路径，可直接用于上传
  // base64: 可直接在 image src 中显示
  form.signatureUrl = filePath
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `penColor` | `string` | `'#000000'` | 画笔颜色 |
| `lineWidth` | `number` | `3` | 画笔粗细（px） |
| `bgColor` | `string` | `'#FFFFFF'` | 画布背景颜色 |
| `height` | `number` | `400` | 画布高度（rpx） |
| `showFooter` | `boolean` | `true` | 是否显示底部 清除/撤销/确认 操作栏 |
| `exportType` | `'png' \| 'jpg'` | `'png'` | 导出图片格式 |
| `placeholder` | `string` | `'请在此处签名'` | 未绘制时的占位提示 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `confirm` | `{ filePath: string, base64: string }` | 点击确认后导出图片触发 |
| `clear` | - | 点击清除按钮触发 |

### 实例方法（模板引用）

| 方法名 | 说明 |
| --- | --- |
| `clear()` | 清除画板 |
| `undo()` | 撤销上一笔 |
| `confirm()` | 导出签名图片（触发 confirm 事件） |

## 🎨 使用示例

::: details 💡 工单完工确认签名
```vue
<template>
  <C_Card title="客户签名确认">
    <C_Signature
      ref="sigRef"
      pen-color="#1A1A1A"
      :line-width="4"
      :height="500"
      :show-footer="false"
      @confirm="onSigned"
    />
    <view class="flex gap-3 mt-4">
      <wd-button type="info" @click="sigRef.clear()">重新签名</wd-button>
      <wd-button type="primary" block @click="sigRef.confirm()">确认签名</wd-button>
    </view>
  </C_Card>
</template>

<script setup lang="ts">
const sigRef = ref()

async function onSigned({ filePath }: { filePath: string }) {
  const url = await uploadSignature(filePath)
  await completeOrder({ signatureUrl: url })
  uni.showToast({ title: '签名成功', icon: 'success' })
}
</script>
:::
