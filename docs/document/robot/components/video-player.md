---
outline: 'deep'
---

# C_VideoPlayer 视频播放器组件

> 🎬 基于 [xgplayer（西瓜播放器）](https://h5player.bytedance.com/) 封装的教育场景视频播放器，专为在线课程、企业培训、知识库等场景设计

## 🚀 特性

- **🎥 多格式支持**: MP4 / HLS (.m3u8) / DASH（预留），自动检测源类型
- **📡 清晰度切换**: 360p ~ 4K 全清晰度手动切换 + 自适应码率
- **⚡ 倍速播放**: 0.5x ~ 3.0x 倍速，教育场景高频需求
- **📖 章节标记**: 进度条章节分段，快速导航到知识点
- **🔖 书签笔记**: 任意时间点打标签、记笔记
- **📊 进度追踪**: 精确记录观看时长、完成百分比，支持心跳上报
- **🔄 断点续播**: 自动从上次离开的位置恢复播放
- **🛡️ 防作弊**: 防跳播、焦点检测、动态水印三重保障
- **❓ 视频测验**: 指定时间弹出测验题，支持必须答对才能继续
- **🖼️ 画中画**: 画中画模式，滚动自动浮动小窗
- **⌨️ 快捷键**: 完整的键盘操作支持
- **📈 数据分析**: 播放行为事件上报，支持自定义回调
- **📝 字幕**: 多语言字幕轨道切换
- **🖼️ 缩略图预览**: 进度条 hover 时显示帧缩略图
- **🌗 暗黑模式**: 自动适配明暗主题
- **💪 TypeScript**: 完整的类型定义和类型安全

## 📦 安装

::: code-group

```bash [bun (推荐)]
bun add xgplayer xgplayer-hls
```

```bash [pnpm]
pnpm add xgplayer xgplayer-hls
```

```bash [yarn]
yarn add xgplayer xgplayer-hls
```

```bash [npm]
npm install xgplayer xgplayer-hls
```

:::

## 🎯 快速开始

### 最简用法

```vue {3,6,9}
<template>
  <!-- 最简单的视频播放器 -->
  <C_VideoPlayer url="https://example.com/video.mp4" />

  <!-- HLS 视频流 -->
  <C_VideoPlayer url="https://example.com/stream.m3u8" source-type="hls" />

  <!-- 自适应容器宽度 -->
  <C_VideoPlayer url="https://example.com/video.mp4" fluid />
</template>

<script setup>
// 无需导入，已全局注册
</script>
```

::: details 📺 三种常见场景 - 快速上手

```vue {6-8,14-18,25-33}
<template>
  <div>
    <!-- 1. 简单视频预览 -->
    <section>
      <h4>视频预览</h4>
      <C_VideoPlayer
        url="https://example.com/video.mp4"
        poster="https://example.com/cover.jpg"
        fluid
      />
    </section>

    <!-- 2. 带断点续播的课程视频 -->
    <section>
      <h4>课程视频</h4>
      <C_VideoPlayer
        :url="courseUrl"
        :start-time="savedProgress"
        :chapters="chapters"
        :on-progress="saveProgress"
      />
    </section>

    <!-- 3. 企业培训（含防作弊） -->
    <section>
      <h4>培训视频</h4>
      <C_VideoPlayer
        :url="trainingUrl"
        :anti-cheat="{
          preventSeekOnFirstWatch: true,
          focusDetection: true,
          watermark: true,
          watermarkText: `学员: ${userName}`,
        }"
        :on-progress="reportProgress"
      />
    </section>
  </div>
</template>

<script setup>
const savedProgress = ref(0) // 从后端获取
const userName = '张三'
const courseUrl = 'https://example.com/course/lesson01.m3u8'
const trainingUrl = 'https://example.com/training/01.mp4'

const chapters = [
  { id: 'ch1', title: '课程概述', startTime: 0, endTime: 120 },
  { id: 'ch2', title: '核心概念', startTime: 120, endTime: 480 },
  { id: 'ch3', title: '实践演练', startTime: 480, endTime: 900 },
]

function saveProgress(data) {
  localStorage.setItem('progress', JSON.stringify(data))
}

function reportProgress(data) {
  api.saveProgress(data)
}
</script>
```

:::

### 完整教育场景

::: details 🎓 完整教育模式 - 含章节、测验、字幕、防作弊

```vue {9-17,19-25,27-36,38-44}
<template>
  <C_VideoPlayer
    ref="playerRef"
    url="https://example.com/course/lesson01.m3u8"
    poster="https://example.com/course/lesson01-cover.jpg"
    :width="960"
    :height="540"
    :start-time="savedProgress"
    :playback-rates="[0.75, 1.0, 1.25, 1.5, 2.0]"
    :default-playback-rate="1.0"
    :quality-list="qualityList"
    :chapters="chapters"
    :quizzes="quizzes"
    :subtitles="subtitles"
    :anti-cheat="antiCheatConfig"
    :on-progress="handleProgress"
    :on-analytics="handleAnalytics"
    pip
    keyboard
    @ready="onReady"
    @state-change="onStateChange"
    @ended="onEnded"
    @quality-change="onQualityChange"
    @chapter-change="onChapterChange"
    @quiz-answer="onQuizAnswer"
    @bookmark-change="onBookmarkChange"
    @progress-update="onProgressUpdate"
  />
</template>

<script setup lang="ts">
import type {
  QualityDefinition,
  Chapter,
  VideoQuiz,
  SubtitleTrack,
  ProgressData,
  AnalyticsEvent,
  AntiCheatConfig,
  PlayerState,
  QualityLevel,
  Bookmark,
} from '@/components/global/C_VideoPlayer/types'

const playerRef = ref()
const savedProgress = ref(0) // 从 API 获取上次进度

const qualityList: QualityDefinition[] = [
  { label: '360p', url: 'https://example.com/360p.m3u8', bitrate: 500 },
  { label: '720p', url: 'https://example.com/720p.m3u8', bitrate: 1500 },
  { label: '1080p', url: 'https://example.com/1080p.m3u8', bitrate: 3000 },
  { label: '4K', url: 'https://example.com/4k.m3u8', bitrate: 8000 },
]

const chapters: Chapter[] = [
  { id: 'ch1', title: '课程概述', startTime: 0, endTime: 120 },
  { id: 'ch2', title: '核心概念', startTime: 120, endTime: 480 },
  { id: 'ch3', title: '实践演练', startTime: 480, endTime: 900 },
  { id: 'ch4', title: '总结回顾', startTime: 900, endTime: 1080 },
]

const quizzes: VideoQuiz[] = [
  {
    id: 'q1',
    triggerTime: 120,
    type: 'single',
    title: '以下哪个是 Vue 3 的核心特性？',
    options: [
      { key: 'A', label: 'Options API' },
      { key: 'B', label: 'Composition API' },
      { key: 'C', label: 'jQuery 插件' },
    ],
    answer: 'B',
    required: true,
  },
]

const subtitles: SubtitleTrack[] = [
  { language: 'zh', label: '中文', src: '/subtitles/zh.vtt', default: true },
  { language: 'en', label: 'English', src: '/subtitles/en.vtt' },
]

const antiCheatConfig: AntiCheatConfig = {
  preventSeekOnFirstWatch: true,
  focusDetection: true,
  watermark: true,
  watermarkText: '学员: 张三 ID: 12345',
  heartbeatInterval: 30000,
  onHeartbeat: (data) => api.heartbeat(data),
}

function handleProgress(data: ProgressData) {
  api.saveProgress(data) // 上报进度到后端
}

function handleAnalytics(event: AnalyticsEvent) {
  analytics.track(event.type, event)
}

function onReady() { console.log('播放器就绪') }
function onStateChange(state: PlayerState) { console.log('播放状态:', state) }
function onEnded() { console.log('课程播放完毕') }
function onQualityChange(quality: QualityLevel) { console.log('清晰度:', quality) }
function onChapterChange(chapter: Chapter) { console.log('章节:', chapter.title) }
function onQuizAnswer(quizId: string, answer: string | string[], isCorrect: boolean) {
  api.submitQuizAnswer({ quizId, answer, isCorrect })
}
function onBookmarkChange(bookmarks: Bookmark[]) { api.saveBookmarks(bookmarks) }
function onProgressUpdate(data: ProgressData) { /* 实时进度 */ }
</script>
```

:::

::: details 🔧 编程式控制 - ref 调用播放器方法

```vue {4-5,22-27}
<template>
  <div>
    <C_VideoPlayer
      ref="playerRef"
      url="https://example.com/video.mp4"
    />
    <div class="controls">
      <n-button @click="playerRef?.play()">播放</n-button>
      <n-button @click="playerRef?.pause()">暂停</n-button>
      <n-button @click="seekTo(60)">跳到 1:00</n-button>
      <n-button @click="setSpeed(1.5)">1.5x 倍速</n-button>
    </div>
    <div v-if="progressInfo">
      已观看: {{ Math.round(progressInfo.watchedPercent) }}%
    </div>
  </div>
</template>

<script setup>
const playerRef = ref()
const progressInfo = ref(null)

function seekTo(time) {
  playerRef.value?.seek(time)
}

function setSpeed(rate) {
  playerRef.value?.setPlaybackRate(rate)
}

// 获取 xgplayer 原始实例进行扩展
function extendPlayer() {
  const instance = playerRef.value?.getPlayerInstance()
  instance?.on('customEvent', handler)
}
</script>
```

:::

## 🔧 完整 API

### Props

| 属性                  | 类型                                    | 默认值                                    | 说明                    |
| --------------------- | --------------------------------------- | ----------------------------------------- | ----------------------- |
| `url`                 | `string`                                | —                                         | **必填**，视频源地址    |
| `sourceType`          | `'mp4' \| 'hls' \| 'dash' \| 'flv'`    | 自动检测                                  | 视频源类型              |
| `width`               | `number \| string`                      | `'100%'`                                  | 播放器宽度              |
| `height`              | `number \| string`                      | `'100%'`                                  | 播放器高度              |
| `poster`              | `string`                                | —                                         | 封面图地址              |
| `fluid`               | `boolean`                               | `false`                                   | 是否自适应容器宽度      |
| `autoplay`            | `boolean`                               | `false`                                   | 是否自动播放            |
| `autoplayMuted`       | `boolean`                               | `false`                                   | 是否自动静音播放        |
| `loop`                | `boolean`                               | `false`                                   | 是否循环播放            |
| `volume`              | `number`                                | `0.75`                                    | 初始音量 0-1            |
| `startTime`           | `number`                                | `0`                                       | 起始播放时间（秒）      |
| `playbackRates`       | `PlaybackRate[]`                        | `[0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0]` | 倍速列表                |
| `defaultPlaybackRate` | `PlaybackRate`                          | `1.0`                                     | 默认倍速                |
| `pip`                 | `boolean`                               | `true`                                    | 是否开启画中画          |
| `fullscreen`          | `boolean`                               | `true`                                    | 是否开启全屏            |
| `cssFullscreen`       | `boolean`                               | `true`                                    | 是否开启网页全屏        |
| `miniPlayer`          | `boolean`                               | `false`                                   | 是否开启小窗播放        |
| `screenshot`          | `boolean`                               | `false`                                   | 是否显示截图按钮        |
| `keyboard`            | `boolean`                               | `true`                                    | 是否开启快捷键          |
| `lang`                | `string`                                | `'zh-cn'`                                 | 语言                    |
| `qualityList`         | `QualityDefinition[]`                   | —                                         | 清晰度列表              |
| `defaultQuality`      | `QualityLevel`                          | —                                         | 默认清晰度              |
| `chapters`            | `Chapter[]`                             | —                                         | 章节列表                |
| `subtitles`           | `SubtitleTrack[]`                       | —                                         | 字幕轨道列表            |
| `quizzes`             | `VideoQuiz[]`                           | —                                         | 视频内测验列表          |
| `bookmarks`           | `Bookmark[]`                            | —                                         | 初始书签列表            |
| `thumbnail`           | `ThumbnailConfig`                       | —                                         | 缩略图预览配置          |
| `onProgress`          | `ProgressReporter`                      | —                                         | 进度上报回调            |
| `antiCheat`           | `AntiCheatConfig`                       | —                                         | 防作弊配置              |
| `onAnalytics`         | `AnalyticsReporter`                     | —                                         | 数据分析上报回调        |
| `playerOptions`       | `Partial<IPlayerOptions>`               | —                                         | xgplayer 原生配置透传   |

### AntiCheatConfig 配置项

| 字段                      | 类型                              | 默认值  | 说明                            |
| ------------------------- | --------------------------------- | ------- | ------------------------------- |
| `preventSeekOnFirstWatch` | `boolean`                         | `false` | 首次观看防跳播                  |
| `focusDetection`          | `boolean`                         | `false` | 焦点检测（离开页面自动暂停）    |
| `watermark`               | `boolean`                         | `false` | 是否显示动态水印                |
| `watermarkText`           | `string`                          | —       | 水印文字（如用户名 / ID）       |
| `heartbeatInterval`       | `number`                          | `30000` | 心跳上报间隔（ms）              |
| `onHeartbeat`             | `(data: ProgressData) => void`    | —       | 心跳上报回调                    |

### Events

| 事件名             | 参数                                                                 | 说明             |
| ------------------ | -------------------------------------------------------------------- | ---------------- |
| `ready`            | —                                                                    | 播放器就绪       |
| `stateChange`      | `(state: PlayerState)`                                               | 播放状态变化     |
| `timeUpdate`       | `(currentTime: number, duration: number)`                            | 播放时间更新     |
| `ended`            | —                                                                    | 播放结束         |
| `error`            | `(error: Error)`                                                     | 播放错误         |
| `qualityChange`    | `(quality: QualityLevel)`                                            | 清晰度切换       |
| `rateChange`       | `(rate: number)`                                                     | 倍速切换         |
| `fullscreenChange` | `(isFullscreen: boolean)`                                            | 全屏状态变化     |
| `bookmarkChange`   | `(bookmarks: Bookmark[])`                                            | 书签变化         |
| `quizAnswer`       | `(quizId: string, answer: string \| string[], isCorrect: boolean)`   | 测验作答         |
| `chapterChange`    | `(chapter: Chapter)`                                                 | 章节切换         |
| `progressUpdate`   | `(data: ProgressData)`                                               | 进度更新         |

### Expose（ref 调用）

| 方法                     | 参数                    | 返回值         | 说明                     |
| ------------------------ | ----------------------- | -------------- | ------------------------ |
| `play()`                 | —                       | `void`         | 播放                     |
| `pause()`                | —                       | `void`         | 暂停                     |
| `seek(time)`             | `time: number`          | `void`         | 跳转到指定时间（秒）     |
| `setPlaybackRate(rate)`  | `rate: number`          | `void`         | 设置倍速                 |
| `setVolume(volume)`      | `volume: number` (0-1)  | `void`         | 设置音量                 |
| `switchQuality(quality)` | `quality: QualityLevel` | `void`         | 切换清晰度               |
| `getProgressData()`      | —                       | `ProgressData` | 获取当前进度数据         |
| `destroy()`              | —                       | `void`         | 销毁播放器               |
| `getPlayerInstance()`    | —                       | `Player`       | 获取 xgplayer 原始实例   |

## ⌨️ 快捷键

| 快捷键    | 功能            |
| --------- | --------------- |
| `Space`   | 播放 / 暂停     |
| `←`       | 快退 5 秒       |
| `→`       | 快进 5 秒       |
| `↑`       | 音量增加 10%    |
| `↓`       | 音量减少 10%    |
| `F`       | 全屏 / 退出全屏 |
| `M`       | 静音 / 取消静音 |
| `Esc`     | 退出全屏        |

## 🎯 适用场景

| 场景              | 示例                           | 关键配置                                  |
| ----------------- | ------------------------------ | ----------------------------------------- |
| 🎓 **在线课程**   | 视频课件 + 章节 + 测验         | `chapters` + `quizzes` + `onProgress`    |
| 🏢 **企业培训**   | 培训视频 + 防作弊 + 进度追踪   | `antiCheat` + `onProgress`               |
| 📺 **视频预览**   | 简单视频播放 + 基本控制        | 仅传 `url`，最简用法                      |
| 📡 **直播回放**   | HLS 流 + 清晰度切换            | `source-type="hls"` + `qualityList`      |
| 📖 **知识库**     | 带书签笔记 + 章节导航          | `chapters` + `bookmarks`                 |

## ⚡ 性能优化

1. **播放器懒加载** — xgplayer 和 xgplayer-hls 均使用动态 `import()` 按需加载，不阻塞首屏
2. **`shallowRef`** — 播放器实例使用 `shallowRef` 避免深度响应性能损耗
3. **节流上报** — 进度上报每 5 秒一次，心跳默认每 30 秒一次
4. **`sendBeacon` 兜底** — 页面关闭时使用 `sendBeacon` 保证进度数据不丢失
5. **`IntersectionObserver`** — 小窗播放使用原生观察器，无轮询消耗
6. **`localStorage` 缓存** — 音量、倍速、播放进度、书签均本地持久化
7. **严格生命周期管理** — 所有定时器、监听器在 `onBeforeUnmount` 中清理

## 📁 目录结构

```
C_VideoPlayer/
├── index.vue                    # 主组件入口
├── types.ts                     # 类型定义
├── constants.ts                 # 常量配置
├── README.md                    # 本文档
├── composables/
│   ├── index.ts                 # 统一导出
│   ├── usePlayerCore.ts         # 播放器核心逻辑（初始化/销毁）
│   ├── usePlaybackControl.ts    # 播放控制（播放/暂停/倍速/音量）
│   ├── useProgressTracker.ts    # 学习进度追踪 & 心跳上报
│   ├── useQualitySwitch.ts      # 清晰度切换
│   ├── useChapters.ts           # 章节标记
│   ├── useBookmarks.ts          # 书签笔记
│   ├── useAntiCheat.ts          # 防作弊（防跳播/焦点检测/水印）
│   ├── useSubtitle.ts           # 字幕管理
│   ├── useQuiz.ts               # 视频内测验弹窗
│   ├── useMiniPlayer.ts         # 小窗播放
│   └── useKeyboard.ts           # 快捷键
├── components/
│   ├── ControlBar.vue           # 自定义控制栏
│   ├── QualitySelector.vue      # 清晰度选择器
│   ├── SpeedSelector.vue        # 倍速选择器
│   ├── ChapterMarkers.vue       # 章节标记 UI
│   ├── BookmarkPanel.vue        # 书签面板
│   ├── QuizOverlay.vue          # 测验弹窗
│   ├── WatermarkOverlay.vue     # 动态水印
│   └── ThumbnailPreview.vue     # 缩略图预览（扩展预留）
└── plugins/
    ├── index.ts                 # 统一导出
    ├── hls-adapter.ts           # HLS 适配（懒加载）
    ├── dash-adapter.ts          # DASH 适配（预留）
    └── analytics-reporter.ts    # 数据上报插件
```

> **说明**：本组件功能复杂（11 个 composable + 8 个子组件 + 3 个插件），composables 和 types 保留在组件目录内，未抽离到全局 `src/composables/` 和 `src/types/modules/`。

## ⚠️ 注意事项

> [!WARNING]
> **依赖安装**: 使用前请确保已安装 `xgplayer` 和 `xgplayer-hls`，否则 HLS 流将无法播放。

> [!NOTE]
> **防作弊水印**: 动态水印是 DOM 叠加方式，普通截图工具可以截取。如需更高安全等级，建议结合服务端帧级水印方案。

> [!TIP]
> **首次观看防跳播**: `preventSeekOnFirstWatch` 仅限制首次观看，进度数据基于 `localStorage` 本地存储。如需服务端校验，请结合心跳上报实现。

## 🐛 常见问题

::: details ❌ HLS 流无法播放

确认已安装 `xgplayer-hls` 依赖，且设置了 `source-type="hls"`。

```bash
bun add xgplayer-hls
```

```vue
<!-- 必须显式指定 source-type -->
<C_VideoPlayer
  url="https://example.com/stream.m3u8"
  source-type="hls"
/>
```

组件通过 `hls-adapter.ts` 动态懒加载 HLS 插件，确保 `xgplayer-hls` 已正确安装。

:::

::: details ❌ 进度数据在页面关闭时丢失

页面关闭时组件自动通过 `sendBeacon` 上报最后一次进度，但需要后端支持 `POST` 接收。如果仍需兜底：

```ts
// 手动监听 beforeunload 做二次保障
window.addEventListener('beforeunload', () => {
  const data = playerRef.value?.getProgressData()
  if (data) {
    navigator.sendBeacon('/api/progress', JSON.stringify(data))
  }
})
```

:::

::: details ❌ 如何获取 xgplayer 原始实例扩展功能

```ts
const playerRef = ref()

// 播放器就绪后调用
function extendPlayer() {
  const instance = playerRef.value?.getPlayerInstance()
  // 可调用所有 xgplayer 原生 API
  instance?.on('customEvent', (data) => {
    console.log('自定义事件:', data)
  })
}
```

:::

::: details ❌ 移动端全屏失效

移动端全屏需要用户手势触发，不能在 `autoplay` 时主动全屏。建议使用 CSS 全屏替代：

```vue
<C_VideoPlayer
  url="..."
  :autoplay="false"
  :autoplay-muted="true"
  css-fullscreen
/>
```

`cssFullscreen`（网页全屏）在移动端兼容性更好。

:::

## 🔄 未来规划

- [ ] DASH 协议完整支持
- [ ] FLV 直播流支持
- [ ] 弹幕互动功能
- [ ] AI 字幕自动生成
- [ ] DRM 加密播放
- [ ] 移动端手势操作（左右滑快进、上下滑音量/亮度）
- [ ] 独立 NPM 包发布 `@robot-admin/video-player`

## 📚 相关资源

- [类型定义](./types.ts)
- [演示页面源码](../../views/demo/37-video-player/index.vue)
- [xgplayer 官方文档](https://h5player.bytedance.com/)

<!--@include: ./snippets/contribute.md -->
