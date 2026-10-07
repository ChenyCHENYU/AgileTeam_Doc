---
outline: "deep"
---

# C_AudioPlayer 音频播放器组件

> 🎵 带播放列表与封面展示的音频播放器，支持多种播放模式与主题外观

## 🚀 在线演示

<DemoIframe src="/preview/audio-player" title="音频播放器" height="600" />

## ✨ 特性

- **📚 播放列表**: 内置列表面板，可配置显示/隐藏
- **🎛️ 播放模式**: 列表顺序 / 列表循环 / 单曲循环 / 随机播放
- **🖼️ 封面展示**: 支持专辑封面与极简两种主题
- **▶️ 自动播放**: 可配置挂载后自动播放

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add @robot-admin/naive-ui-components
```

```bash [pnpm]
pnpm add @robot-admin/naive-ui-components
```

```bash [npm]
npm install @robot-admin/naive-ui-components
```

:::

## 🎯 基础用法

```vue
<template>
  <C_AudioPlayer :tracks="tracks" show-playlist mode="loop" />
</template>

<script setup>
const tracks = [
  { title: '示例曲目', artist: 'AGILE TEAM', url: '/audio/demo.mp3' },
]
</script>
```

## 📋 API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `tracks` | `AudioTrack[]` | — | 播放列表（必填） |
| `initial-index` | `number` | `0` | 初始激活索引 |
| `show-playlist` | `boolean` | `true` | 是否显示播放列表面板 |
| `show-cover` | `boolean` | `true` | 是否显示封面 |
| `autoplay` | `boolean` | `false` | 是否挂载后自动播放 |
| `mode` | `'list' \| 'loop' \| 'single' \| 'shuffle'` | `'list'` | 播放模式 |
| `theme` | `'default' \| 'minimal'` | `'default'` | 主题外观 |

完整的类型定义请查看包内 `C_AudioPlayer/types.ts`。
