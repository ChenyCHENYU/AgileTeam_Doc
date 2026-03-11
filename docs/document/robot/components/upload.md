---
outline: 'deep'
---

# C_Upload 增强型上传组件

> 📤 分片上传 · 断点续传 · 秒传校验 · 并发控制 — 让大文件上传不再焦虑

## 🚀 在线演示

<DemoIframe src="/preview/upload" title="文件上传" height="700" />


## 🚀 特性

- **📦 多模式上传**: 单文件 / 多文件 / 目录上传
- **🖱️ 拖拽 & 粘贴**: 拖拽上传 + Ctrl+V 粘贴上传
- **🧩 分片上传**: 大文件自动切片，可配置分片大小
- **⚡ 秒传校验**: spark-md5 计算文件 hash，相同文件直接跳过
- **🔄 断点续传**: 中断后自动查询已上传分片，续传未完成部分
- **🎛️ 并发控制**: 可配最大并发数，队列管理自动调度
- **📊 进度跟踪**: 单文件进度 + 分片进度 + 总体进度
- **🖼️ 图片预览**: 自动生成缩略图，网格预览模式
- **🔧 自定义上传**: 支持 OSS 直传 / 七牛等自定义协议
- **💪 TypeScript**: 完整的类型定义和类型安全

## 📦 安装

::: code-group

```bash [bun (推荐)]
# spark-md5 用于文件哈希计算
bun add spark-md5
bun add -D @types/spark-md5
```

```bash [pnpm]
pnpm add spark-md5
pnpm add -D @types/spark-md5
```

```bash [yarn]
yarn add spark-md5
yarn add -D @types/spark-md5
```

```bash [npm]
npm install spark-md5
npm install -D @types/spark-md5
```

:::

## 🎯 快速开始

### 基础使用

```vue {3,6,9}
<template>
  <!-- 最简单的文件上传 -->
  <C_Upload action="/api/upload" @success="handleSuccess" />

  <!-- 图片上传（预览模式） -->
  <C_Upload accept="image/*" list-type="image" multiple />

  <!-- 分片上传（大文件） -->
  <C_Upload chunked :chunk-size="2 * 1024 * 1024" multiple />
</template>

<script setup>
const handleSuccess = (file, response) => {
  console.log('上传成功:', file.name, response)
}
</script>
```

::: details 🖱️ 拖拽 & 粘贴上传 - 多种文件输入方式
```vue {4-11}
<template>
  <div class="upload-demo">
    <!-- 拖拽 + 粘贴上传 -->
    <C_Upload
      action="/api/upload"
      multiple
      draggable
      pasteable
      tip="拖拽文件到此处，或按 Ctrl+V 粘贴"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
const handleChange = (fileList) => {
  console.log('文件列表变化:', fileList)
}
</script>
```
:::

::: details 🧩 分片上传 - 大文件断点续传
```vue {4-16}
<template>
  <div class="chunk-upload-demo">
    <!-- 分片上传 + 秒传 + 断点续传 -->
    <C_Upload
      action="/api/upload/chunk"
      multiple
      chunked
      :chunk-size="5 * 1024 * 1024"
      :concurrency="3"
      :instant-check="checkInstantUpload"
      :uploaded-chunks-query="queryUploadedChunks"
      :merge-chunks="mergeChunks"
      :max-size="500 * 1024 * 1024"
      tip="支持大文件分片上传，最大 500MB"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup>
// 秒传检查：根据 hash 判断文件是否已存在
const checkInstantUpload = async (hash, filename) => {
  const res = await fetch(`/api/upload/check?hash=${hash}`)
  const data = await res.json()
  return { exists: data.exists, url: data.url }
}

// 查询已上传分片（断点续传）
const queryUploadedChunks = async (hash) => {
  const res = await fetch(`/api/upload/chunks?hash=${hash}`)
  const data = await res.json()
  return data.uploadedIndexes // [0, 1, 3, 5] 已上传的分片索引
}

// 合并分片
const mergeChunks = async (hash, filename, totalChunks) => {
  const res = await fetch('/api/upload/merge', {
    method: 'POST',
    body: JSON.stringify({ hash, filename, totalChunks }),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await res.json()
  return { url: data.url }
}

const handleSuccess = (file, response) => {
  console.log('上传完成:', file.name, response)
}
</script>
```
:::

## 📖 API 文档

### Props

| 参数                    | 类型                                                  | 默认值  | 说明                                |
| ----------------------- | ----------------------------------------------------- | ------- | ----------------------------------- |
| **action**              | `string`                                              | `''`    | 上传地址                            |
| **headers**             | `Record<string, string>`                              | `{}`    | 请求头                              |
| **data**                | `Record<string, any>`                                 | `{}`    | 附加字段                            |
| **multiple**            | `boolean`                                             | `false` | 是否多选                            |
| **directory**           | `boolean`                                             | `false` | 是否允许目录上传                    |
| **accept**              | `string`                                              | `''`    | 接受的文件类型（同 input accept）   |
| **maxSize**             | `number`                                              | `0`     | 文件大小限制（bytes，0=不限）       |
| **maxCount**            | `number`                                              | `0`     | 最大文件数（0=不限）                |
| **disabled**            | `boolean`                                             | `false` | 是否禁用                            |
| **draggable**           | `boolean`                                             | `true`  | 是否启用拖拽上传                    |
| **pasteable**           | `boolean`                                             | `false` | 是否启用粘贴上传                    |
| **chunked**             | `boolean`                                             | `false` | 是否分片上传                        |
| **chunkSize**           | `number`                                              | `2MB`   | 分片大小（bytes）                   |
| **concurrency**         | `number`                                              | `3`     | 最大并发数                          |
| **showFileList**        | `boolean`                                             | `true`  | 是否显示文件列表                    |
| **listType**            | `'text' \| 'image'`                                   | `'text'`| 列表类型                            |
| **showThumbnail**       | `boolean`                                             | `true`  | 是否显示图片缩略图                  |
| **customRequest**       | `CustomUploadRequest`                                 | -       | 自定义上传函数                      |
| **instantCheck**        | `(hash, filename) => Promise<{exists, url?}>`         | -       | 秒传检查函数                        |
| **uploadedChunksQuery** | `(hash) => Promise<number[]>`                         | -       | 已上传分片查询                      |
| **mergeChunks**         | `(hash, filename, totalChunks) => Promise<{url}>`     | -       | 分片合并函数                        |
| **beforeUpload**        | `(file: File) => boolean \| Promise<boolean \| File>` | -       | 上传前拦截                          |
| **tip**                 | `string`                                              | `''`    | 提示文本                            |
| **defaultFileList**     | `UploadFileItem[]`                                    | `[]`    | 已有文件列表（回显）                |

### Events

| 事件名       | 参数                                              | 说明             |
| ------------ | ------------------------------------------------- | ---------------- |
| **change**   | `(fileList: UploadFileItem[])`                    | 文件列表变更     |
| **success**  | `(file: UploadFileItem, response: any)`           | 单文件上传成功   |
| **error**    | `(file: UploadFileItem, error: Error)`            | 单文件上传失败   |
| **progress** | `(file: UploadFileItem, percent: number)`         | 单文件进度       |
| **remove**   | `(file: UploadFileItem)`                          | 文件移除         |
| **finish**   | `(fileList: UploadFileItem[])`                    | 全部上传完成     |
| **exceed**   | `(files: File[], fileList: UploadFileItem[])`     | 超出限制         |

### 暴露方法

| 方法名             | 参数              | 返回值              | 说明               |
| ------------------ | ----------------- | ------------------- | ------------------ |
| **selectFiles**    | -                 | `void`              | 手动触发文件选择   |
| **startUpload**    | -                 | `void`              | 手动开始上传       |
| **pauseAll**       | -                 | `void`              | 暂停所有上传       |
| **resumeAll**      | -                 | `void`              | 恢复所有上传       |
| **clearAll**       | -                 | `void`              | 清空文件列表       |
| **removeFile**     | `uid: string`     | `void`              | 移除指定文件       |
| **retryFile**      | `uid: string`     | `void`              | 重试失败文件       |
| **getFileList**    | -                 | `UploadFileItem[]`  | 获取当前文件列表   |
| **getSuccessList** | -                 | `UploadFileItem[]`  | 获取成功文件列表   |

### 暴露属性

| 字段             | 类型     | 说明               |
| ---------------- | -------- | ------------------ |
| **totalPercent**  | `number` | 总体进度（0-100）  |

### 类型定义

#### 文件状态

```typescript
type UploadFileStatus =
  | 'pending'    // 等待上传
  | 'hashing'    // 计算 hash
  | 'uploading'  // 上传中
  | 'success'    // 上传成功
  | 'error'      // 上传失败
  | 'paused'     // 已暂停
  | 'instant'    // 秒传成功
```

#### 文件项

```typescript
interface UploadFileItem {
  uid: string           // 唯一标识
  name: string          // 文件名
  size: number          // 文件大小（bytes）
  type: string          // MIME 类型
  status: UploadFileStatus
  percent: number       // 上传进度（0-100）
  hash?: string         // 文件 hash
  chunkProgress?: ChunkProgress  // 分片进度
  raw?: File            // 原生 File 对象
  thumbUrl?: string     // 缩略图 URL
  url?: string          // 上传成功后的 URL
  response?: any        // 服务端响应
  error?: string        // 错误信息
}
```

#### 分片进度

```typescript
interface ChunkProgress {
  uploadedChunks: number  // 已上传分片数
  totalChunks: number     // 总分片数
  uploadedBytes: number   // 已上传字节
  totalBytes: number      // 总字节
}
```

## 🎨 使用示例

::: details 🏢 企业文档管理 - 多类型文件上传
```vue
<template>
  <div class="doc-upload">
    <h3>文档上传</h3>
    <C_Upload
      action="/api/documents/upload"
      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
      multiple
      :max-size="20 * 1024 * 1024"
      :max-count="20"
      :headers="uploadHeaders"
      :data="{ category: 'document', department: 'tech' }"
      tip="支持 PDF、Word、Excel、PPT，单文件最大 20MB"
      @success="handleDocSuccess"
      @finish="handleAllDone"
    />
  </div>
</template>

<script setup>
const uploadHeaders = {
  Authorization: `Bearer ${getToken()}`,
}

const handleDocSuccess = (file, response) => {
  console.log('文档上传成功:', file.name, response.url)
}

const handleAllDone = (fileList) => {
  const successCount = fileList.filter(f => f.status === 'success').length
  $message.success(`上传完成，${successCount} 个文件成功`)
}
</script>
```
:::

::: details 🖼️ 图片库管理 - 批量图片上传 + 预览
```vue
<template>
  <div class="gallery-upload">
    <h3>图片库上传</h3>
    <C_Upload
      ref="galleryRef"
      action="/api/gallery/upload"
      accept="image/*"
      multiple
      list-type="image"
      :max-count="50"
      :max-size="10 * 1024 * 1024"
      :before-upload="validateImage"
      tip="仅支持 JPG/PNG/WebP，单张最大 10MB"
      @success="handleImageSuccess"
    />

    <NSpace style="margin-top: 16px">
      <NButton @click="galleryRef?.clearAll()">清空</NButton>
      <NButton type="primary" @click="handleSubmitGallery">
        提交到图片库
      </NButton>
    </NSpace>
  </div>
</template>

<script setup>
const galleryRef = ref()

const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    $message.error(`${file.name} 格式不支持`)
    return false
  }
  return true
}

const handleImageSuccess = (file, response) => {
  console.log('图片上传:', file.name, response)
}

const handleSubmitGallery = () => {
  const list = galleryRef.value?.getSuccessList() ?? []
  if (list.length === 0) {
    $message.warning('请先上传图片')
    return
  }
  // 提交到图片库...
  $message.success(`${list.length} 张图片已提交`)
}
</script>
```
:::

::: details 🎥 视频上传 - 大文件分片断点续传
```vue
<template>
  <div class="video-upload">
    <h3>视频上传</h3>
    <C_Upload
      ref="videoRef"
      action="/api/video/chunk"
      accept="video/*"
      chunked
      :chunk-size="5 * 1024 * 1024"
      :concurrency="3"
      :max-size="2 * 1024 * 1024 * 1024"
      :instant-check="checkVideoExists"
      :uploaded-chunks-query="getUploadedChunks"
      :merge-chunks="mergeVideoChunks"
      tip="支持主流视频格式，最大 2GB，支持断点续传"
      @success="handleVideoSuccess"
    />

    <NSpace style="margin-top: 12px">
      <NButton @click="videoRef?.pauseAll()">暂停</NButton>
      <NButton @click="videoRef?.resumeAll()">恢复</NButton>
    </NSpace>
  </div>
</template>

<script setup>
const videoRef = ref()

const checkVideoExists = async (hash, filename) => {
  const res = await request.get('/api/video/check', { params: { hash } })
  return { exists: res.data.exists, url: res.data.url }
}

const getUploadedChunks = async (hash) => {
  const res = await request.get('/api/video/chunks', { params: { hash } })
  return res.data.indexes
}

const mergeVideoChunks = async (hash, filename, totalChunks) => {
  const res = await request.post('/api/video/merge', {
    hash,
    filename,
    totalChunks,
  })
  return { url: res.data.url }
}

const handleVideoSuccess = (file, response) => {
  $message.success(`视频 ${file.name} 上传完成`)
}
</script>
```
:::

::: details ☁️ OSS 直传 - 自定义上传函数
```vue
<template>
  <div class="oss-upload">
    <h3>OSS 直传</h3>
    <C_Upload
      multiple
      :custom-request="ossUpload"
      tip="文件直传 OSS，不经过服务端中转"
      @success="handleOssSuccess"
    />
  </div>
</template>

<script setup>
const ossUpload = (options) => {
  const controller = new AbortController()

  // 1. 获取上传凭证
  getOssPolicy().then(async (policy) => {
    const formData = new FormData()
    formData.append('key', `uploads/${Date.now()}_${options.filename}`)
    formData.append('policy', policy.policy)
    formData.append('OSSAccessKeyId', policy.accessKeyId)
    formData.append('signature', policy.signature)
    formData.append('file', options.file)

    try {
      const res = await fetch(policy.host, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      if (res.ok) {
        options.onSuccess?.({ url: `${policy.host}/${formData.get('key')}` })
      } else {
        options.onError?.(new Error('OSS 上传失败'))
      }
    } catch (err) {
      options.onError?.(err)
    }
  })

  return { abort: () => controller.abort() }
}

const handleOssSuccess = (file, response) => {
  console.log('OSS 地址:', response.url)
}
</script>
```
:::

## 🛠️ 高级用法

::: details 🔒 上传前校验 - 文件类型 & 大小 & 尺寸
```vue
<template>
  <C_Upload
    accept="image/*"
    :max-size="5 * 1024 * 1024"
    :before-upload="validateBeforeUpload"
    tip="仅支持 JPG/PNG，大小 ≤ 5MB，尺寸 ≤ 4096×4096"
  />
</template>

<script setup>
const validateBeforeUpload = async (file) => {
  // 1. 类型校验
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    $message.error('仅支持 JPG/PNG 格式')
    return false
  }

  // 2. 大小校验（Props maxSize 已处理，这里做额外逻辑）
  if (file.size > 5 * 1024 * 1024) {
    $message.error('文件不能超过 5MB')
    return false
  }

  // 3. 图片尺寸校验
  const dimensions = await getImageDimensions(file)
  if (dimensions.width > 4096 || dimensions.height > 4096) {
    $message.error('图片尺寸不能超过 4096×4096')
    return false
  }

  return true
}

function getImageDimensions(file) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  })
}
</script>
```
:::

::: details 📋 表单集成 - 与 NForm 配合使用
```vue
<template>
  <NForm ref="formRef" :model="formData" :rules="rules">
    <NFormItem label="项目名称" path="name">
      <NInput v-model:value="formData.name" />
    </NFormItem>

    <NFormItem label="附件" path="attachments">
      <C_Upload
        ref="uploadRef"
        action="/api/upload"
        multiple
        :max-count="5"
        @change="handleFileChange"
      />
    </NFormItem>

    <NFormItem>
      <NButton type="primary" @click="handleSubmit">提交</NButton>
    </NFormItem>
  </NForm>
</template>

<script setup>
const formRef = ref()
const uploadRef = ref()

const formData = ref({
  name: '',
  attachments: [],
})

const rules = {
  name: { required: true, message: '请输入项目名称' },
  attachments: {
    validator: () => {
      const list = uploadRef.value?.getSuccessList() ?? []
      if (list.length === 0) return new Error('请上传至少一个附件')
      return true
    },
  },
}

const handleFileChange = (fileList) => {
  formData.value.attachments = fileList.filter(f => f.status === 'success')
}

const handleSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('提交:', formData.value)
    }
  })
}
</script>
```
:::

## ⚠️ 注意事项

### 1. 分片上传配置

::: code-group

```vue [✅ 推荐]
<!-- 大文件场景开启分片，配合后端 API -->
<C_Upload
  chunked
  :chunk-size="5 * 1024 * 1024"
  :instant-check="checkFn"
  :uploaded-chunks-query="queryFn"
  :merge-chunks="mergeFn"
/>
```

```vue [❌ 不推荐]
<!-- 开了分片但不配合并函数 -->
<C_Upload chunked />
```

:::

### 2. 并发控制

::: code-group

```vue [✅ 推荐]
<!-- 合理设置并发数，避免服务端过载 -->
<C_Upload :concurrency="3" />
```

```vue [❌ 不推荐]
<!-- 并发过高可能导致服务端限流 -->
<C_Upload :concurrency="20" />
```

:::

### 3. 文件校验

::: code-group

```vue [✅ 推荐]
<!-- 前置校验 + maxSize 双保险 -->
<C_Upload
  :max-size="10 * 1024 * 1024"
  :before-upload="validateFn"
  accept="image/*"
/>
```

```vue [❌ 不推荐]
<!-- 不设任何限制 -->
<C_Upload />
```

:::

## 🐛 故障排除

### 常见问题

::: details ❓ Q1: 分片上传失败后如何续传？
**A1:** 组件内置断点续传机制：

1. 传入 `uploadedChunksQuery` 函数查询已上传分片
2. 组件自动跳过已上传分片，只传剩余部分
3. 如果上传过程中断，使用 `retryFile(uid)` 重试

```vue
<C_Upload
  chunked
  :uploaded-chunks-query="queryUploadedChunks"
/>
```
:::

::: details ❓ Q2: 秒传不生效？
**A2:** 确保以下配置正确：

1. 传入 `instantCheck` 函数
2. 后端根据文件 hash 返回 `{ exists: true, url: '...' }`
3. 确保开启了 `chunked` 模式（秒传依赖 hash 计算）

```vue
<C_Upload
  chunked
  :instant-check="async (hash, filename) => {
    const res = await api.checkFile(hash)
    return { exists: res.exists, url: res.url }
  }"
/>
```
:::

::: details ❓ Q3: 粘贴上传不工作？
**A3:** 需要显式开启 `pasteable` 属性：

```vue
<C_Upload pasteable />
```

注意：粘贴事件监听在 `document` 上，如果页面有其他粘贴处理逻辑可能冲突。
:::

::: details ❓ Q4: 如何配合 C_ImageCropper 使用？
**A4:** 通过 `beforeUpload` 拦截图片文件，打开裁剪弹窗，裁剪完成后返回新文件：

```vue
<script setup>
const beforeUpload = async (file) => {
  if (!file.type.startsWith('image/')) return true

  // 打开裁剪弹窗
  const croppedFile = await openCropperDialog(file)
  return croppedFile || false
}
</script>
```
:::

## 🎯 最佳实践

### 1. 根据文件大小选择上传模式

```vue
<script setup>
// 小文件：普通上传
// 大文件：分片上传
const CHUNK_THRESHOLD = 10 * 1024 * 1024 // 10MB
</script>

<template>
  <C_Upload
    :chunked="true"
    :chunk-size="5 * 1024 * 1024"
    :instant-check="checkFn"
  />
</template>
```

### 2. 合理的错误处理

```vue
<script setup>
const handleError = (file, error) => {
  // 区分不同错误类型
  if (error.message.includes('网络')) {
    $message.error(`${file.name}: 网络异常，请检查网络后重试`)
  } else if (error.message.includes('413')) {
    $message.error(`${file.name}: 文件过大，服务器拒绝`)
  } else {
    $message.error(`${file.name}: ${error.message}`)
  }
}
</script>
```

### 3. 性能优化

```vue
<script setup>
// 限制并发数避免浏览器连接数上限
// Chrome 对同一域名最多 6 个 TCP 连接
const OPTIMAL_CONCURRENCY = 3

// 分片大小建议 2-5MB，过小增加请求开销，过大影响断点续传粒度
const OPTIMAL_CHUNK_SIZE = 2 * 1024 * 1024
</script>
```

## 📝 更新日志

### v1.0.0 (2026-02-27)

- ✨ 单文件 / 多文件 / 目录上传
- ✨ 拖拽上传 + Ctrl+V 粘贴上传
- ✨ 分片上传（可配置 chunkSize）
- ✨ 断点续传（查询已上传分片）
- ✨ 秒传校验（spark-md5 hash）
- ✨ 并发控制（可配最大并发数）
- ✨ 图片预览缩略图网格模式
- ✨ 完整的 TypeScript 类型定义
- ✨ 自定义上传函数（OSS 直传等）

> **与 @robot-admin/file-utils 的关系**：零耦合。file-utils 是文件下载/导出方向（downloadBlob、Excel、ZIP），C_Upload 是上传方向，完全相反。

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 分片上传需要后端配合提供分片接收、查询、合并三个 API。如果后端暂不支持，可以先用普通上传模式，后续再切换到分片模式，组件 API 兼容两种模式。 🚀
