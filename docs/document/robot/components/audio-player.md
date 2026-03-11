---
outline: 'deep'
---

# C_AudioPlayer 音频播放器

> 🎵 音频播放组件，支持播放列表、进度控制、音量调节、多种循环模式、迷你主题

## 🚀 在线演示

<DemoIframe src="/preview/audio-player" title="音频播放器" height="700" />

## ✨ 特性

- **🎶 播放列表**: 内置可展开播放列表面板，显示曲目信息
- **⏩ 进度控制**: 点击进度条跳转，实时显示当前 / 总时长
- **🔊 音量调节**: 滑块调节 + 静音切换
- **🔁 四种循环模式**: 列表循环 / 单曲循环 / 单次播放 / 随机播放
- **🖼️ 封面显示**: 可选封面图，无封面时显示图标占位
- **🎨 双主题**: `default`（完整面板）/ `minimal`（胶囊迷你模式）
- **⏯️ 上下曲切换**: 上一曲 / 下一曲快速切换
- **📡 事件完备**: `play` / `pause` / `ended` / `modeChange` 全生命周期
- **🎨 CSS 变量**: 全部颜色通过 CSS 变量定制，适配亮暗主题
- **💪 TypeScript**: 完整类型定义

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

## 🎯 快速开始

### 最简用法

```vue
<template>
  <C_AudioPlayer :tracks="playlist" show-playlist />
</template>

<script setup>
  const playlist = [
    {
      id: '1',
      title: '晴天',
      artist: '周杰伦',
      src: '/audio/sunny.mp3',
      cover: '/cover/sunny.jpg',
    },
    {
      id: '2',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      src: '/audio/shape-of-you.mp3',
    },
  ]
</script>
```

> [!TIP]
> 组件基于原生 `HTMLAudioElement`，无需任何第三方音频库依赖。

### 迷你模式

```vue
<template>
  <C_AudioPlayer
    :tracks="playlist"
    theme="minimal"
  />
</template>
```

::: details 🎛️ 完整播放器配置

```vue {4-8}
<template>
  <C_AudioPlayer
    :tracks="playlist"
    :initial-index="0"
    mode="shuffle"
    :show-playlist="true"
    :show-cover="true"
    :autoplay="false"
    @play="onPlay"
    @pause="onPause"
    @ended="onEnded"
    @mode-change="onModeChange"
  />
</template>

<script setup>
  const onPlay = (index) => console.log('播放:', index)
  const onPause = () => console.log('暂停')
  const onEnded = (index) => console.log('结束:', index)
  const onModeChange = (mode) => console.log('模式:', mode)
</script>
```

:::

## � API 文档

### Props

| 参数           | 类型                                          | 默认值      | 说明             |
| -------------- | --------------------------------------------- | ----------- | ---------------- |
| **tracks**       | `AudioTrack[]`                                | —           | **必填**，播放列表 |
| **initialIndex** | `number`                                      | `0`         | 初始播放索引     |
| **showPlaylist** | `boolean`                                     | `true`      | 是否显示播放列表 |
| **showCover**    | `boolean`                                     | `true`      | 是否显示封面     |
| **autoplay**     | `boolean`                                     | `false`     | 是否自动播放     |
| **mode**         | `'list' \| 'loop' \| 'single' \| 'shuffle'`  | `'list'`    | 循环模式         |
| **theme**        | `'default' \| 'minimal'`                      | `'default'` | 主题外观         |

### AudioTrack

| 字段       | 类型               | 说明                  |
| ---------- | ------------------ | --------------------- |
| `id`       | `string \| number` | **必填**，唯一标识    |
| `title`    | `string`           | **必填**，曲目名称    |
| `artist`   | `string`           | 艺术家 / 作者         |
| `src`      | `string`           | **必填**，音频源 URL  |
| `cover`    | `string`           | 封面图 URL            |
| `duration` | `number`           | 预设时长（秒）        |

### Events

| 事件         | 参数             | 说明         |
| ------------ | ---------------- | ------------ |
| **play**       | `(index: number)` | 开始播放     |
| **pause**      | —                | 暂停         |
| **ended**      | `(index: number)` | 播放结束     |
| **modeChange** | `(mode: string)` | 播放模式切换 |

### CSS 变量

| 变量              | 映射来源                | 说明         |
| ----------------- | ----------------------- | ------------ |
| `--ap-bg`         | `var(--card-color)`     | 背景色       |
| `--ap-border`     | `var(--border-color)`   | 边框色       |
| `--ap-accent`     | `var(--primary-color)`  | 主题强调色   |
| `--ap-text`       | `var(--text-color-1)`   | 主文字色     |
| `--ap-text-sub`   | `var(--text-color-3)`   | 辅助文字色   |

### 类型定义

```typescript
interface AudioTrack {
  id: string | number
  title: string
  artist?: string
  src: string
  cover?: string
  duration?: number
  extra?: Record<string, unknown>
}

interface AudioPlayerProps {
  tracks: AudioTrack[]
  initialIndex?: number
  showPlaylist?: boolean
  showCover?: boolean
  autoplay?: boolean
  mode?: 'list' | 'loop' | 'single' | 'shuffle'
  theme?: 'default' | 'minimal'
}
```

### 循环模式说明

| 模式      | 图标               | 行为描述                     |
| --------- | ------------------ | ---------------------------- |
| `list`    | `mdi:repeat`       | 列表循环：播完最后一首回到第一首 |
| `loop`    | `mdi:repeat-once`  | 单曲循环：当前曲目无限重播   |
| `single`  | `mdi:numeric-1-box`| 单次播放：播完一首停止       |
| `shuffle` | `mdi:shuffle-variant`| 随机播放：随机跳转下一首   |

## 🔧 常见问题

::: details ❌ 自动播放不生效

浏览器策略限制未经用户交互的自动播放。`autoplay` 只在用户已有交互（如点击页面）后生效。建议默认关闭，由用户主动点击播放。

:::

::: details ❌ 进度条点击跳转不准确

确保音频资源支持 Range 请求（服务端返回 `Accept-Ranges: bytes`），否则 `seek` 操作可能受限。

:::

## � 更新日志

### v1.0.0

- ✨ 新增 `C_AudioPlayer` 音频播放器组件
- ✨ 支持播放列表、封面展示、多循环模式
- ✨ 支持进度条拖拽与音量控制

## 📚 相关资源

- [演示页面源码](../../views/demo/54-audio-player/index.vue)

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 音频播放器组件适用于音乐播放、有声读物、播客等场景。支持多种循环模式和播放列表管理。如果遇到问题请先查看文档，或者在团队群里讨论。🎵
