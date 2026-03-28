---
outline: "deep"
---

# C_Upload 上传

> 📤 图片上传组件，支持拍照/相册选择、文件大小校验、上传进度展示和图片预览，v-model 直接绑定文件列表。

## ✨ 特性

- **📷 统一入口**：`chooseImage` 支持相机+相册双来源
- **⚖️ 大小校验**：超出 `maxSize` 自动过滤并触发 `oversize` 事件
- **⏳ 进度展示**：文件 `status: 'uploading'` 时显示进度条
- **👁️ 预览联动**：点击已上传图片触发 `preview` 事件（可配合 C_ImagePreview）
- **❌ 可删除**：`deletable` 控制每项右上角删除按钮

## 🎯 快速开始

```vue
<template>
  <C_Upload v-model="fileList" :max-count="6" @choose="onChoose" />
</template>

<script setup lang="ts">
const { fileList, handleChoose } = useUpload()

async function onChoose(files: any[]) {
  for (const file of files) {
    handleChoose(file)
  }
}
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `UploadFile[]` | `[]` | 文件列表（v-model） |
| `maxCount` | `number` | `9` | 最大上传数量 |
| `maxSize` | `number` | `10485760` | 最大文件大小（字节，默认 10MB） |
| `previewSize` | `string` | `'80px'` | 预览图尺寸（CSS 值） |
| `deletable` | `boolean` | `true` | 是否显示删除按钮 |
| `disabled` | `boolean` | `false` | 是否禁用 |

### UploadFile 类型

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `url` | `string` | 图片地址（本地临时路径或服务端 URL） |
| `status` | `'pending' \| 'uploading' \| 'done' \| 'error'` | 上传状态 |
| `progress` | `number` | 上传进度（0-100） |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| `update:modelValue` | `UploadFile[]` | v-model 更新 |
| `choose` | `tempFiles[]` | 选择文件后触发，传入临时文件列表 |
| `delete` | `number` | 删除文件时触发，传入索引 |
| `preview` | `number` | 点击预览时触发，传入索引 |
| `oversize` | `tempFile` | 文件超出 maxSize 时触发 |

## 🎨 使用示例

::: details 💡 配合 useUpload 上传到服务器
```vue
<template>
  <C_Upload
    v-model="fileList"
    :max-count="3"
    @choose="onChoose"
    @preview="idx => previewIndex = idx"
  />
  <C_ImagePreview
    v-model:visible="previewVisible"
    :images="fileList.map(f => f.url)"
    :current="previewIndex"
  />
</template>

<script setup lang="ts">
const { fileList, upload } = useUpload()
const previewVisible = ref(false)
const previewIndex = ref(0)

watch(previewIndex, () => { previewVisible.value = true })

async function onChoose(tempFiles: any[]) {
  for (const file of tempFiles) {
    await upload(file.path)
  }
}
</script>
:::
