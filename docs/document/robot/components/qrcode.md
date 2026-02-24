---
outline: 'deep'
---

# C_QRCode 二维码组件

> 📱 基于 [qrcode](https://github.com/soldair/node-qrcode) 封装的高性能二维码生成组件，支持 Canvas / SVG 双模式渲染、Logo 叠加与多格式导出

## 🚀 特性

- **🖼️ 双渲染模式**: Canvas（默认）和 SVG 两种渲染引擎，适合不同使用场景
- **🏷️ Logo 叠加**: 在二维码中心叠加自定义 Logo，自动升级纠错等级保证可扫描性
- **📤 多格式导出**: 支持导出为 PNG、JPEG、SVG，并可直接触发浏览器下载
- **🎨 完全自定义**: 前景色、背景色、尺寸、边距均可自由配置
- **🛡️ 纠错等级**: 4 档纠错（L / M / Q / H），Logo 模式自动提升到 Q 级以上
- **🔄 自动重渲染**: 任意 prop 变化时自动重新生成二维码，无需手动调用
- **🏷️ 标签文本**: 可在二维码下方显示说明文字
- **💪 TypeScript**: 完整的类型定义，`LogoOptions`、`QRCodeExpose` 等均有类型保障

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add qrcode
bun add -D @types/qrcode
```

```bash [pnpm]
pnpm add qrcode
pnpm add -D @types/qrcode
```

```bash [yarn]
yarn add qrcode
yarn add -D @types/qrcode
```

```bash [npm]
npm install qrcode
npm install -D @types/qrcode
```

:::

## 🎯 快速开始

### 最简用法

```vue {3,6,9}
<template>
  <!-- 最简单的二维码 -->
  <C_QRCode value="https://vuejs.org" />

  <!-- 自定义颜色和尺寸 -->
  <C_QRCode
    value="Hello World"
    :size="300"
    color="#1677ff"
  />

  <!-- SVG 模式（矢量，无损缩放） -->
  <C_QRCode
    value="https://example.com"
    mode="svg"
  />
</template>

<script setup>
  // 无需导入，已全局注册
</script>
```

::: details 📱 三种常见场景 - 快速上手

```vue {6-10,16-24,30-41}
<template>
  <div>
    <!-- 1. 网址分享二维码 -->
    <section>
      <h4>页面分享</h4>
      <C_QRCode
        :value="currentUrl"
        :size="200"
        label="扫码访问"
        :show-label="true"
      />
    </section>

    <!-- 2. WiFi 连接二维码 -->
    <section>
      <h4>WiFi 连接</h4>
      <C_QRCode
        :value="`WIFI:T:WPA;S:${ssid};P:${password};;`"
        :size="200"
        :error-correction-level="'M'"
        color="#1a1a1a"
        bg-color="#f0f9ff"
      />
    </section>

    <!-- 3. 带 Logo 的品牌二维码 -->
    <section>
      <h4>品牌二维码</h4>
      <C_QRCode
        value="https://your-brand.com"
        :size="240"
        :error-correction-level="'H'"
        :logo="{
          src: '/logo.png',
          size: 0.25,
          borderRadius: 8,
          padding: 4,
          bgColor: '#ffffff',
        }"
      />
    </section>
  </div>
</template>

<script setup>
  const currentUrl = window.location.href
  const ssid = ref('MyWiFi')
  const password = ref('password123')
</script>
```

:::

::: details 📤 导出与下载 - ref 调用方法

```vue {3,24-36}
<template>
  <div>
    <C_QRCode
      ref="qrRef"
      value="https://example.com"
      :size="200"
      @error="onError"
    />
    <div class="actions">
      <n-button @click="downloadPng">下载 PNG</n-button>
      <n-button @click="downloadSvg">下载 SVG</n-button>
      <n-button @click="copyBase64">复制 Base64</n-button>
    </div>
    <img
      v-if="previewUrl"
      :src="previewUrl"
      style="width: 200px"
    />
  </div>
</template>

<script setup>
  const qrRef = ref()
  const previewUrl = ref('')

  // 下载 PNG
  async function downloadPng() {
    await qrRef.value?.download('my-qrcode', 'png')
  }

  // 下载 SVG（矢量）
  async function downloadSvg() {
    await qrRef.value?.download('my-qrcode', 'svg')
  }

  // 获取 DataURL 预览
  async function copyBase64() {
    const dataUrl = await qrRef.value?.toDataURL('png', 0.9)
    previewUrl.value = dataUrl
    await navigator.clipboard.writeText(dataUrl)
  }

  // 手动刷新（通常不需要，props 变化会自动触发）
  async function forceRefresh() {
    await qrRef.value?.refresh()
  }

  function onError(err) {
    console.error('二维码生成失败:', err.message)
  }
</script>
```

:::

::: details 🎨 动态配置 - 实时修改参数

```vue {3-13,20-30}
<template>
  <div>
    <C_QRCode
      :value="qrValue"
      :size="qrSize"
      :color="fgColor"
      :bg-color="bgColor"
      :error-correction-level="level"
      :margin="margin"
      :mode="renderMode"
      :logo="logoConfig"
      show-border
    />
    <!-- 控制面板 -->
    <div class="controls">
      <input
        v-model="qrValue"
        placeholder="输入二维码内容"
      />
      <input
        type="range"
        v-model="qrSize"
        min="100"
        max="400"
      />
      <select v-model="level">
        <option>L</option
        ><option>M</option>
        <option>Q</option
        ><option>H</option>
      </select>
      <select v-model="renderMode">
        <option value="canvas">Canvas</option>
        <option value="svg">SVG</option>
      </select>
    </div>
  </div>
</template>

<script setup>
  const qrValue = ref('https://vuejs.org')
  const qrSize = ref(200)
  const fgColor = ref('#000000')
  const bgColor = ref('#ffffff')
  const level = ref('M')
  const margin = ref(2)
  const renderMode = ref('canvas')

  // 带 Logo 配置
  const logoConfig = computed(() => ({
    src: '/logo.png',
    size: 0.2, // Logo 占二维码宽度的 20%
    borderRadius: 6,
    padding: 4,
    bgColor: '#ffffff',
  }))
</script>
```

:::

## 🔧 完整 API

### Props

| 属性                   | 类型                   | 默认值      | 说明                                         |
| ---------------------- | ---------------------- | ----------- | -------------------------------------------- |
| `value`                | `string`               | —           | **必填**，二维码内容（文本 / URL / WiFi 等） |
| `size`                 | `number`               | `200`       | 二维码尺寸（px），宽高相等                   |
| `color`                | `string`               | `'#000000'` | 前景色（深色模块颜色）                       |
| `bgColor`              | `string`               | `'#FFFFFF'` | 背景色                                       |
| `errorCorrectionLevel` | `ErrorCorrectionLevel` | `'M'`       | 纠错等级，有 Logo 时自动升级至 Q 级以上      |
| `margin`               | `number`               | `2`         | 留白边距（模块数，非像素）                   |
| `mode`                 | `RenderMode`           | `'canvas'`  | 渲染模式，`canvas` 或 `svg`                  |
| `logo`                 | `LogoOptions`          | —           | Logo 配置，设置后自动在二维码中心叠加 Logo   |
| `showBorder`           | `boolean`              | `true`      | 是否显示外层边框                             |
| `label`                | `string`               | `''`        | 二维码下方说明文字                           |
| `showLabel`            | `boolean`              | `false`     | 是否显示说明文字                             |

### LogoOptions

| 字段           | 类型     | 默认值      | 说明                                        |
| -------------- | -------- | ----------- | ------------------------------------------- |
| `src`          | `string` | —           | **必填**，Logo 图片地址（URL 或 base64）    |
| `size`         | `number` | `0.2`       | Logo 尺寸比例（相对二维码宽度，建议 ≤ 0.3） |
| `borderRadius` | `number` | `4`         | Logo 圆角半径（px）                         |
| `padding`      | `number` | `4`         | Logo 外白边（px），增强与二维码的视觉分离   |
| `bgColor`      | `string` | `'#ffffff'` | Logo 背景色                                 |

### ErrorCorrectionLevel

| 值  | 描述                                | 推荐场景                  |
| --- | ----------------------------------- | ------------------------- |
| `L` | 低纠错（7%破损恢复）                | 内容极长、对大小敏感      |
| `M` | 中等纠错（15%破损恢复）**（默认）** | 一般场景                  |
| `Q` | 较高纠错（25%破损恢复）             | 有少量 Logo 遮挡          |
| `H` | 最高纠错（30%破损恢复）             | Logo 较大或二维码会被折叠 |

> **提示**: 设置了 `logo` 时，组件会自动将 `L` 和 `M` 提升为 `Q` 级，无需手动设置。

### Events

| 事件名  | 参数             | 说明                 |
| ------- | ---------------- | -------------------- |
| `error` | `(error: Error)` | 二维码生成失败时触发 |

### Expose（ref 调用）

| 方法        | 参数                                     | 返回值            | 说明                  |
| ----------- | ---------------------------------------- | ----------------- | --------------------- |
| `toDataURL` | `(type?: ExportType, quality?: number)`  | `Promise<string>` | 导出为 DataURL 字符串 |
| `download`  | `(filename?: string, type?: ExportType)` | `Promise<void>`   | 触发浏览器下载        |
| `refresh`   | —                                        | `Promise<void>`   | 手动刷新重新渲染      |

### ExportType

| 值       | 说明                                 |
| -------- | ------------------------------------ |
| `'png'`  | PNG 格式（默认），无损，支持透明背景 |
| `'jpeg'` | JPEG 格式，文件更小，不支持透明背景  |
| `'svg'`  | SVG 矢量格式，无限缩放不失真         |

## 🖼️ Canvas vs SVG 渲染模式

| 对比项       | Canvas 模式                  | SVG 模式                      |
| ------------ | ---------------------------- | ----------------------------- |
| **渲染方式** | 像素位图渲染                 | 矢量 XML 渲染                 |
| **清晰度**   | 固定尺寸，放大失真           | 任意缩放不失真                |
| **Logo**     | ✅ 支持（Canvas API 叠加）   | ❌ 不支持                     |
| **导出**     | PNG / JPEG / SVG（重新生成） | 直接输出 SVG                  |
| **性能**     | GPU 加速，适合高频更新       | DOM 节点，内容复杂时较慢      |
| **推荐场景** | 需要 Logo、需要导出图片      | 纯展示、需要矢量 / 响应式布局 |

## ⚡ 注意事项

> [!WARNING]
> **Logo 尺寸限制**: Logo `size` 比例建议不超过 `0.3`（30%），超过会影响扫描成功率。即使配合 `H` 级纠错，二维码中心被大面积遮挡时也可能无法识别。

> [!NOTE]
> **跨域 Logo**: 使用外部 URL 作为 Logo 地址时，需要该图片服务器支持 CORS（组件已设置 `img.crossOrigin = 'anonymous'`）。如遇跨域错误，建议将 Logo 转为 base64 字符串传入。

> [!TIP]
> **自动重渲染**: 所有 props 变化会自动触发重新渲染，无需调用 `refresh()`。`refresh()` 方法主要用于强制刷新（如外部资源加载完成后）。

## 🐛 常见问题

::: details ❌ 二维码无法扫描

常见原因及解决方案：

1. **前景色太浅** — 深色模块与背景对比度不足，确保 `color` 和 `bgColor` 对比度足够高
2. **Logo 太大** — 将 `logo.size` 减小到 0.2 以下，或提升 `errorCorrectionLevel` 到 `H`
3. **内容过长** — 内容越长，二维码越密集，建议使用短链接替代完整 URL
4. **尺寸过小** — 将 `size` 增大到至少 150px

:::

::: details ❌ Logo 图片不显示（跨域错误）

将 Logo 转为 base64 可彻底解决跨域问题：

```typescript
async function getBase64Logo(url: string): Promise<string> {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

const logoSrc = ref('')
onMounted(async () => {
  logoSrc.value = await getBase64Logo('/logo.png')
})
```

```vue
<C_QRCode value="https://example.com" :logo="{ src: logoSrc, size: 0.2 }" />
```

:::

::: details ❌ SVG 模式下 download 下载的是矢量文件

这是预期行为。SVG 模式调用 `download('name', 'png')` 时，组件内部会临时创建 Canvas 重新渲染一次来生成 PNG，不会影响页面上展示的 SVG。

如果只需要 SVG 文件：

```ts
qrRef.value?.download('my-qrcode', 'svg') // 导出 .svg 矢量文件
qrRef.value?.download('my-qrcode', 'png') // 临时用 Canvas 生成 .png
```

:::

::: details ❌ 二维码内容变化后显示多余闪烁

props 变化会触发 debounce-free 的同步 watch，重新渲染有短暂的空白期。如果需要防抖：

```vue
<script setup>
  import { useDebounceFn } from '@vueuse/core'
  const qrRef = ref()

  // 防抖 300ms 再刷新（适合文本输入框实时更新场景）
  const debouncedRefresh = useDebounceFn(() => {
    qrRef.value?.refresh()
  }, 300)

  const inputValue = ref('https://example.com')
  // 内部 watch 已自动处理，无需手动调用
  // debouncedRefresh 适合父组件层面做节流
</script>
```

:::

## 🔄 未来规划

- [ ] 渐变色二维码
- [ ] 自定义码点形状（圆形、圆角码点）
- [ ] 批量生成 & 批量下载
- [ ] 二维码识别（扫描已有图片解码）
- [ ] 动态二维码（GIF 动效背景）

## 📚 相关资源

- [类型定义](../../types/modules/qrcode.d.ts)
- [useQRCode 组合函数](../../composables/QRCode/useQRCode.ts)
- [演示页面源码](../../views/demo/39-qrcode/index.vue)
- [qrcode npm 包](https://github.com/soldair/node-qrcode)

<!--@include: ./snippets/contribute.md -->
