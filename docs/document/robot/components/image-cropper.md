---
outline: 'deep'
---

# C_ImageCropper 图片裁剪

> 🖼️ 基于 [vue-cropper](https://github.com/xyxiao001/vue-cropper) 封装的 Vue 3 图片裁剪组件，支持自由/固定比例裁剪、旋转缩放翻转、多格式输出、弹窗模式，适配头像上传和 Banner 裁剪等场景。

## 🚀 特性

- **🎯 灵活比例** — 自由裁剪 / 1:1 / 16:9 / 4:3 / 3:2 / 自定义比例一键切换
- **🔄 旋转缩放翻转** — 工具栏 + 编程 API 双重控制
- **👁️ 实时预览** — `@realTime` 事件驱动的零延迟预览面板
- **📦 多格式输出** — PNG / JPEG / WebP + 质量控制 + 最大尺寸约束
- **🪟 弹窗模式** — `modal` 属性开启弹窗裁剪，适配上传后二次裁剪
- **🎭 圆形裁剪** — `circular` 属性实现圆形头像裁剪遮罩
- **📐 边界约束** — `centerBox` 裁剪框始终在图片范围内，不会超出
- **🔒 滚轮锁定** — 禁止鼠标滚轮缩放背景图，操作更可控
- **🌗 主题适配** — 自动跟随 Naive UI 亮色/暗色主题

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add vue-cropper@next
```

```bash [pnpm]
pnpm add vue-cropper@next
```

```bash [yarn]
yarn add vue-cropper@next
```

```bash [npm]
npm install vue-cropper@next
```

:::

> **说明**: `vue-cropper@next` 对应 vue-cropper `^1.1.4`（Vue 3 版本）。

## 🎯 快速开始

### 最简用法

```vue {3-7,12}
<template>
  <C_ImageCropper
    ref="cropperRef"
    src="/path/to/image.jpg"
    :aspect-ratio="1"
    @crop="onCrop"
  />
</template>

<script setup lang="ts">
  // 无需导入，已全局注册

  const cropperRef = ref()

  function onCrop(result) {
    console.log(result.base64, result.blob, result.width, result.height)
  }
</script>
```

::: details 🪟 弹窗模式 — 上传后二次裁剪

```vue {3-10,15-25}
<template>
  <NButton @click="cropperRef?.open('/path/to/image.jpg')">
    打开裁剪
  </NButton>

  <C_ImageCropper
    ref="cropperRef"
    modal
    modal-title="裁剪 Banner"
    :aspect-ratio="16 / 9"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
  import type { ImageCropperExpose, CropResult } from '@/types/modules/image-cropper'

  const cropperRef = ref<ImageCropperExpose>()

  function onConfirm(result: CropResult) {
    console.log('裁剪结果:', result.base64)
    // 上传到服务器
    uploadAvatar(result.blob)
  }
</script>
```

弹窗模式自带「确认裁剪」和「取消」按钮，适合用户上传图片后进行二次裁剪。

:::

::: details 🎭 圆形头像裁剪

```vue {4-5}
<template>
  <C_ImageCropper
    src="/avatar.jpg"
    :aspect-ratio="1"
    circular
    output-format="png"
    @crop="onCrop"
  />
</template>

<script setup lang="ts">
  function onCrop(result) {
    console.log('圆形头像:', result.width, 'x', result.height)
  }
</script>
```

设置 `circular` 后，裁剪区域显示圆形遮罩，但输出仍为方形图片（需自行在展示时加 `border-radius: 50%`）。

:::

::: details 📁 从 File 对象加载图片（配合上传组件）

```vue {3-9,16-22}
<template>
  <NUpload
    :show-file-list="false"
    accept="image/*"
    @before-upload="handleBeforeUpload"
  >
    <NButton>选择图片</NButton>
  </NUpload>

  <C_ImageCropper
    ref="cropperRef"
    :show-toolbar="true"
    :aspect-ratio="1"
    height="500px"
  />
</template>

<script setup lang="ts">
  import type { ImageCropperExpose } from '@/types/modules/image-cropper'

  const cropperRef = ref<ImageCropperExpose>()

  function handleBeforeUpload({ file }) {
    if (file.file) {
      cropperRef.value?.loadFile(file.file)
    }
    return false // 阻止自动上传
  }
</script>
```

:::

::: details 🔧 编程式控制 — 通过 ref 调用全部 API

```vue {4-11,18-35}
<template>
  <C_ImageCropper ref="cropperRef" src="/image.jpg" />

  <NSpace :size="8" style="margin-top: 12px">
    <NButton @click="cropperRef?.rotate(90)">顺时针 90°</NButton>
    <NButton @click="cropperRef?.rotate(-90)">逆时针 90°</NButton>
    <NButton @click="cropperRef?.zoom(0.1)">放大</NButton>
    <NButton @click="cropperRef?.zoom(-0.1)">缩小</NButton>
    <NButton @click="cropperRef?.flipX()">水平翻转</NButton>
    <NButton @click="cropperRef?.flipY()">垂直翻转</NButton>
    <NButton @click="cropperRef?.reset()">重置</NButton>
    <NButton type="primary" @click="handleCrop">获取裁剪结果</NButton>
  </NSpace>
</template>

<script setup lang="ts">
  import type { ImageCropperExpose, CropResult } from '@/types/modules/image-cropper'

  const cropperRef = ref<ImageCropperExpose>()

  async function handleCrop() {
    const result: CropResult = await cropperRef.value!.getCropResult()
    console.log('base64:', result.base64.substring(0, 50) + '...')
    console.log('blob:', result.blob.size, 'bytes')
    console.log('尺寸:', result.width, 'x', result.height)
    console.log('格式:', result.format)
  }
</script>
```

:::

::: details ⚙️ 输出控制 — 格式、质量、最大尺寸

```vue {4-7}
<template>
  <C_ImageCropper
    src="/large-image.jpg"
    output-format="webp"
    :output-quality="0.85"
    :max-output-width="1920"
    :max-output-height="1080"
    @crop="onCrop"
  />
</template>

<script setup lang="ts">
  function onCrop(result) {
    // 输出 WebP 格式，质量 85%
    // 宽度不超过 1920px，高度不超过 1080px
    console.log('输出尺寸:', result.width, 'x', result.height)
    console.log('格式:', result.format) // 'webp'
  }
</script>
```

`maxOutputWidth` / `maxOutputHeight` 为 0 时不限制，非零时按比例缩放到指定范围内。

:::

## 📖 API 文档

### Props

| 属性                | 类型                          | 默认值       | 说明                               |
| ------------------- | ----------------------------- | ------------ | ---------------------------------- |
| `src`               | `string`                      | `''`         | 图片源（URL / base64）             |
| `aspect-ratio`      | `number`                      | `0`          | 裁剪比例，0 = 自由裁剪            |
| `output-format`     | `'png' \| 'jpeg' \| 'webp'`  | `'png'`      | 输出图片格式                       |
| `output-quality`    | `number`                      | `0.92`       | JPEG/WebP 输出质量（0~1）          |
| `max-output-width`  | `number`                      | `0`          | 输出最大宽度 px，0 = 不限          |
| `max-output-height` | `number`                      | `0`          | 输出最大高度 px，0 = 不限          |
| `show-preview`      | `boolean`                     | `true`       | 显示右侧预览面板                   |
| `show-toolbar`      | `boolean`                     | `true`       | 显示工具栏（比例/旋转/翻转/缩放） |
| `circular`          | `boolean`                     | `false`      | 圆形裁剪遮罩                       |
| `disabled`          | `boolean`                     | `false`      | 禁用编辑                           |
| `height`            | `string \| number`            | `'400px'`    | 容器高度                           |
| `modal`             | `boolean`                     | `false`      | 弹窗模式                           |
| `modal-title`       | `string`                      | `'图片裁剪'` | 弹窗标题                           |

### Events

| 事件      | 参数                      | 说明                     |
| --------- | ------------------------- | ------------------------ |
| `crop`    | `(result: CropResult)`    | 裁剪完成（内联 & 弹窗） |
| `ready`   | `()`                      | 图片加载完成             |
| `error`   | `(error: Event)`          | 图片加载失败             |
| `confirm` | `(result: CropResult)`    | 弹窗「确认裁剪」点击    |
| `cancel`  | `()`                      | 弹窗「取消」点击         |

### Expose

| 方法                    | 签名                              | 说明                               |
| ----------------------- | --------------------------------- | ---------------------------------- |
| `getCropResult()`       | `() => Promise<CropResult>`       | 获取裁剪结果（base64 + blob）      |
| `rotate(angle)`         | `(angle: number) => void`         | 旋转（正数顺时针，负数逆时针）     |
| `zoom(scale)`           | `(scale: number) => void`         | 缩放（正数放大，负数缩小）         |
| `flipX()`               | `() => void`                      | 水平翻转                           |
| `flipY()`               | `() => void`                      | 垂直翻转                           |
| `reset()`               | `() => void`                      | 重置所有变换                       |
| `setAspectRatio(ratio)` | `(ratio: number) => void`         | 动态设置裁剪比例                   |
| `loadFile(file)`        | `(file: File) => void`            | 从 File 对象加载图片               |
| `open(src?)`            | `(src?: string) => void`          | 打开弹窗（modal 模式）             |
| `close()`               | `() => void`                      | 关闭弹窗                           |

### 预设比例

| 预设  | 值        | 说明               |
| ----- | --------- | ------------------ |
| 自由  | `0`       | 不锁定比例         |
| 1:1   | `1`       | 正方形（头像）     |
| 16:9  | `1.7778`  | 宽屏（Banner）     |
| 4:3   | `1.3333`  | 标准屏幕比例       |
| 3:2   | `1.5`     | 摄影常用比例       |

## 📐 类型定义

```typescript
/** 输出图片格式 */
type CropOutputFormat = 'png' | 'jpeg' | 'webp'

/** 裁剪结果 */
interface CropResult {
  base64: string          // base64 数据
  blob: Blob              // Blob 对象（用于上传）
  width: number           // 宽度 px
  height: number          // 高度 px
  format: CropOutputFormat // 输出格式
}

/** 预设裁剪比例 */
interface AspectRatioPreset {
  label: string           // 显示名称
  value: number           // 比例值（0=自由）
}

/** 组件 Props */
interface ImageCropperProps {
  src?: string
  aspectRatio?: number
  outputFormat?: CropOutputFormat
  outputQuality?: number
  maxOutputWidth?: number
  maxOutputHeight?: number
  showPreview?: boolean
  showToolbar?: boolean
  circular?: boolean
  disabled?: boolean
  height?: string | number
  modal?: boolean
  modalTitle?: string
}

/** 组件暴露方法 */
interface ImageCropperExpose {
  getCropResult: () => Promise<CropResult>
  rotate: (angle: number) => void
  zoom: (scale: number) => void
  flipX: () => void
  flipY: () => void
  reset: () => void
  setAspectRatio: (ratio: number) => void
  loadFile: (file: File) => void
  open: (src?: string) => void
  close: () => void
}
```

## ⚠️ 注意事项

::: code-group

```vue [✅ 正确]
<!-- 基础内联裁剪 -->
<C_ImageCropper src="/image.jpg" :aspect-ratio="1" @crop="onCrop" />

<!-- 弹窗模式 + 编程打开 -->
<C_ImageCropper ref="cropperRef" modal @confirm="onConfirm" />
<script setup>
  cropperRef.value?.open('/image.jpg')
</script>

<!-- 从 File 加载（配合上传组件） -->
<script setup>
  cropperRef.value?.loadFile(file)
</script>

<!-- 获取裁剪结果 -->
<script setup>
  const result = await cropperRef.value?.getCropResult()
  // result.base64, result.blob, result.width, result.height
</script>
```

```vue [❌ 错误]
<!-- 不要直接传 File 对象给 src -->
<C_ImageCropper :src="fileObject" />
<!-- 应使用 loadFile(file) 方法 -->

<!-- 不要同时使用内联和弹窗模式 -->
<C_ImageCropper src="/image.jpg" modal />
<!-- modal 模式下不需要 src，通过 open(src) 传入 -->

<!-- 不要忘记处理异步的 getCropResult -->
<script setup>
  // ❌ 缺少 await
  const result = cropperRef.value?.getCropResult()
  // ✅ 正确
  const result = await cropperRef.value?.getCropResult()
</script>
```

:::

## 🐛 故障排除

::: details ❌ 裁剪区域显示空白 / 图片不显示

1. 确认 `src` 是有效的图片 URL 或 base64 字符串
2. 跨域图片可能被浏览器阻止, 需要服务端配置 CORS
3. 从 File 加载时请使用 `loadFile(file)` 而非直接赋值 `src`

```vue
<!-- ✅ 正确 - 使用 loadFile 方法 -->
<script setup>
  cropperRef.value?.loadFile(file)
</script>

<!-- ✅ 正确 - 使用 base64 -->
<script setup>
  const reader = new FileReader()
  reader.onload = e => imgSrc.value = e.target.result
  reader.readAsDataURL(file)
</script>
```

:::

::: details ❌ 弹窗打开后裁剪区域异常

弹窗内的 cropper 需要在 DOM 渲染后初始化。如果弹窗打开后裁剪区域大小异常，原因通常是容器尺寸变化。组件内部已通过分离 `modalCropperRef` 和 `inlineCropperRef` 处理此问题。

如果仍有异常，尝试在 `open()` 后延迟执行操作：

```ts
cropperRef.value?.open('/image.jpg')
await nextTick()
// 此时 cropper 已就绪
```

:::

::: details ❌ 输出图片模糊

1. 检查 `output-quality` 是否设置过低（JPEG/WebP 建议 ≥ 0.8）
2. 检查 `max-output-width` / `max-output-height` 是否限制了输出尺寸
3. 源图片分辨率本身较低时，裁剪区域不要选择过大区域

```vue
<!-- 高质量输出 -->
<C_ImageCropper
  :output-quality="0.95"
  :max-output-width="0"
  :max-output-height="0"
  output-format="png"
/>
```

:::

::: details ❌ 控制台出现 ResizeObserver loop 警告

这是 vue-cropper 内部使用 ResizeObserver 时的浏览器级别告警，不会影响功能。组件已在全局通过 `errorHandler` 静默处理此类无害警告。

:::

## 🎯 最佳实践

1. **头像裁剪**: 使用 `:aspect-ratio="1"` + `circular` + `output-format="png"` 确保正方形 + 透明通道
2. **Banner 裁剪**: 使用 `:aspect-ratio="16/9"` + `output-format="webp"` + `:output-quality="0.85"` 平衡质量与体积
3. **弹窗模式**: 配合 NUpload，先上传后 `open(src)` 弹窗裁剪，`@confirm` 拿到结果再上传
4. **大图优化**: 设置 `max-output-width` / `max-output-height` 限制输出尺寸，避免超大 base64 数据
5. **编程获取结果**: 使用 `await getCropResult()` 获取裁剪结果，返回 `{ base64, blob, width, height, format }`

## 📁 文件结构

```
C_ImageCropper/
├── index.vue                         # 主组件（内联 + 弹窗模式）
├── index.scss                        # 组件样式（主题适配）
├── components/
│   ├── CropperToolbar.vue            # 操作工具栏（比例/旋转/翻转/缩放）
│   └── CropperPreview.vue            # 预览面板（@realTime 驱动）
└── README.md

types/modules/image-cropper.d.ts      # 完整 TypeScript 类型定义
composables/ImageCropper/
└── useCropperCore.ts                 # vue-cropper 实例管理 + 输出处理
```

## 📚 相关资源

- [演示页面源码](../../views/demo/45-image-cropper/index.vue)
- [vue-cropper GitHub](https://github.com/xyxiao001/vue-cropper)
- [vue-cropper 文档](https://github.com/xyxiao001/vue-cropper#readme)

## 📝 更新日志

### v1.0.0

- 🎉 初始版本
- 自由/固定比例裁剪（5 种预设 + 自定义）
- 旋转、缩放、水平/垂直翻转
- 实时预览面板
- 多格式输出（PNG / JPEG / WebP）+ 质量控制 + 最大尺寸约束
- 弹窗模式（NModal 集成）
- 圆形裁剪遮罩
- 亮色/暗色主题适配
- File / URL / base64 多种图片加载方式
