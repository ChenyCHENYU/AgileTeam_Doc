---
outline: "deep"
---

# C_ImagePreview 图片预览

> 🔍 全屏图片预览组件，支持多图轮播、双指缩放（1x-3x）、长按保存和图片索引指示器。

## ✨ 特性

- **🖼️ 多图轮播**：swiper 切换，左右滑动浏览一组图片
- **🤏 双指缩放**：MovableView 实现 1x-3x 平滑缩放
- **💾 长按保存**：长按提示下载到相册（触发 `longpress` 事件）
- **📊 进度指示**：右下角显示「当前 / 总数」
- **❌ 关闭方式**：点击图片外区域或关闭按钮

## 🎯 快速开始

```vue
<template>
  <C_ImagePreview
    v-model:visible="visible"
    :images="images"
    :current="startIndex"
    @close="visible = false"
  />
</template>

<script setup lang="ts">
const visible = ref(false)
const startIndex = ref(0)

const images = [
  'https://example.com/photo1.jpg',
  'https://example.com/photo2.jpg',
]

function preview(index: number) {
  startIndex.value = index
  visible.value = true
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | `false` | 是否显示（v-model:visible） |
| `images` | `string[]` | `[]` | 图片 URL 数组 |
| `current` | `number` | `0` | 初始显示图片索引 |
| `showIndicator` | `boolean` | `true` | 是否显示图片索引指示器 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:visible` | `boolean` | v-model:visible 更新 |
| `change` | `number` | 切换图片时触发，传入当前索引 |
| `close` | - | 关闭时触发 |
| `longpress` | `string` | 长按图片时触发，传入图片 URL |

## 🎨 使用示例

::: details 💡 工单附件图片浏览（配合 C_Upload）
```vue
<template>
  <!-- 上传区展示缩略图 -->
  <view class="flex flex-wrap gap-2">
    <image
      v-for="(img, i) in attachments"
      :key="i"
      :src="img"
      class="w-20 h-20 rounded-lg object-cover"
      @click="openPreview(i)"
    />
  </view>

  <!-- 全屏预览 -->
  <C_ImagePreview
    v-model:visible="previewVisible"
    :images="attachments"
    :current="currentPreviewIndex"
    @longpress="saveToAlbum"
  />
</template>

<script setup lang="ts">
const previewVisible = ref(false)
const currentPreviewIndex = ref(0)

function openPreview(index: number) {
  currentPreviewIndex.value = index
  previewVisible.value = true
}

function saveToAlbum(url: string) {
  uni.saveImageToPhotosAlbum({ filePath: url })
}
</script>
:::
