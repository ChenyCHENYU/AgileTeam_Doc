# C_QRCode 二维码组件

> 基于 [qrcode](https://github.com/soldair/node-qrcode) 封装的二维码生成组件，支持 Canvas / SVG 双模式渲染、Logo 嵌入、多格式导出，适用于链接分享、扫码登录、支付二维码等场景。

**🖥 在线演示**: 运行项目后访问 `示范组件 → 二维码` 菜单查看完整演示。

## 特性

- 📱 **Canvas / SVG 双模式** — Canvas 渲染高性能，SVG 渲染无损缩放
- 🎨 **颜色自定义** — 前景色、背景色自由配置，支持品牌色
- 🏷 **Logo 嵌入** — 支持中心 Logo 叠加，自动提升纠错等级
- 🔧 **四级纠错** — L / M / Q / H 四级纠错，适应不同遮挡场景
- 📥 **多格式导出** — PNG / JPEG / SVG 一键下载
- 📏 **尺寸可控** — 像素级尺寸设置 + 留白边距调节
- 🏷 **标签文本** — 底部标签，适合批量生成标注
- ⚡ **响应式更新** — Props 变化自动重新渲染，零延迟同步
- 🛠 **Expose API** — 提供 `toDataURL` / `download` / `refresh` 方法

## 目录结构

```
C_QRCode/
├── index.vue                    # 主组件入口
├── index.scss                   # 组件样式
└── README.md                    # 本文档

# 关联文件（集中管理）
src/composables/QRCode/
└── useQRCode.ts                 # 核心渲染逻辑（Canvas/SVG/Logo/导出）

src/types/modules/
└── qrcode.d.ts                  # 类型定义
```

## 依赖

```bash
bun add qrcode
bun add -d @types/qrcode
```

## 基础用法

### 最简用法

```vue
<template>
  <C_QRCode value="https://example.com" />
</template>
```

### 自定义颜色与尺寸

```vue
<template>
  <C_QRCode
    value="https://example.com"
    :size="300"
    color="#1677ff"
    bg-color="#f0f5ff"
    :margin="4"
  />
</template>
```

### 带 Logo 的二维码

```vue
<template>
  <C_QRCode
    value="https://example.com"
    :size="300"
    error-correction-level="H"
    :logo="{
      src: '/logo.png',
      size: 0.2,
      borderRadius: 6,
      padding: 4,
      bgColor: '#ffffff',
    }"
  />
</template>
```

### SVG 模式输出

```vue
<template>
  <C_QRCode
    value="https://example.com"
    mode="svg"
    :size="200"
  />
</template>
```

### 导出 & 下载

```vue
<template>
  <C_QRCode
    ref="qrRef"
    value="https://example.com"
  />
  <button @click="handleDownload">下载 PNG</button>
  <button @click="handleCopy">复制 DataURL</button>
</template>

<script setup lang="ts">
  const qrRef = ref()

  async function handleDownload() {
    await qrRef.value.download('my-qrcode', 'png')
  }

  async function handleCopy() {
    const url = await qrRef.value.toDataURL('png')
    await navigator.clipboard.writeText(url)
  }
</script>
```

### 带标签的二维码

```vue
<template>
  <C_QRCode
    value="https://example.com/product/12345"
    :show-label="true"
    label="产品编号: 12345"
    :show-border="true"
  />
</template>
```

## API

### Props

| 属性                   | 类型                       | 默认值      | 说明                               |
| ---------------------- | -------------------------- | ----------- | ---------------------------------- |
| `value`                | `string`                   | —           | **必填**，二维码内容（文本 / URL） |
| `size`                 | `number`                   | `200`       | 二维码尺寸（px）                   |
| `color`                | `string`                   | `'#000000'` | 前景色                             |
| `bgColor`              | `string`                   | `'#FFFFFF'` | 背景色                             |
| `errorCorrectionLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'`       | 纠错等级                           |
| `margin`               | `number`                   | `2`         | 留白边距（模块数）                 |
| `mode`                 | `'canvas' \| 'svg'`        | `'canvas'`  | 渲染模式                           |
| `logo`                 | `LogoOptions`              | —           | Logo 配置，详见下表                |
| `showBorder`           | `boolean`                  | `true`      | 是否显示边框                       |
| `label`                | `string`                   | `''`        | 标签文本                           |
| `showLabel`            | `boolean`                  | `false`     | 是否显示标签                       |

### LogoOptions

| 属性           | 类型     | 默认值      | 说明                     |
| -------------- | -------- | ----------- | ------------------------ |
| `src`          | `string` | —           | **必填**，Logo 图片地址  |
| `size`         | `number` | `0.2`       | Logo 尺寸比例（0 ~ 0.4） |
| `borderRadius` | `number` | `4`         | Logo 圆角（px）          |
| `padding`      | `number` | `4`         | Logo 外边距（px）        |
| `bgColor`      | `string` | `'#ffffff'` | Logo 背景色              |

### Events

| 事件    | 回调参数         | 说明                 |
| ------- | ---------------- | -------------------- |
| `error` | `(error: Error)` | 二维码渲染失败时触发 |

### Expose 方法

| 方法        | 类型                                                                     | 说明             |
| ----------- | ------------------------------------------------------------------------ | ---------------- |
| `toDataURL` | `(type?: 'png' \| 'jpeg' \| 'svg', quality?: number) => Promise<string>` | 导出为 DataURL   |
| `download`  | `(filename?: string, type?: 'png' \| 'jpeg' \| 'svg') => Promise<void>`  | 下载二维码文件   |
| `refresh`   | `() => Promise<void>`                                                    | 强制刷新重新渲染 |

## 纠错等级说明

| 等级             | 容错率 | 适用场景               |
| ---------------- | ------ | ---------------------- |
| **L** (Low)      | ~7%    | 内容简短、无遮挡       |
| **M** (Medium)   | ~15%   | 通用场景（默认）       |
| **Q** (Quartile) | ~25%   | 嵌入小 Logo            |
| **H** (High)     | ~30%   | 嵌入大 Logo 或恶劣环境 |

> 💡 当配置了 `logo` 属性时，组件会自动将 L / M 等级提升为 Q，确保 Logo 不影响扫码成功率。

## 类型导出

```ts
import type {
  QRCodeProps,
  QRCodeExpose,
  LogoOptions,
  ErrorCorrectionLevel,
  RenderMode,
  ExportType,
} from '@/types/modules/qrcode'
```

## 常见问题

### Logo 加载失败？

确保 Logo 地址可访问且允许跨域。如果是外部 URL，需要对方服务器设置 `Access-Control-Allow-Origin` 响应头。本地图片建议放在 `public/` 目录下。

### Canvas 模式下导出图片模糊？

`size` 属性直接决定 Canvas 的像素宽高。如需高清导出，可将 `size` 设为实际显示尺寸的 2~3 倍，再通过 CSS 缩小显示。

### SVG 模式下无法嵌入 Logo？

SVG 模式下 Logo 嵌入暂不支持（因为 SVG 通过 `v-html` 渲染）。需要 Logo 功能请使用 Canvas 模式。

## 更新日志

### v1.0.0

- 🎉 初始版本
- Canvas / SVG 双模式渲染
- Logo 嵌入与自动纠错提升
- PNG / JPEG / SVG 多格式导出
- 完整 TypeScript 类型支持
