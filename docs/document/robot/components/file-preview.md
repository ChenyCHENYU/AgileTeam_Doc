---
outline: 'deep'
---

# C_FilePreview 文件预览组件

> 📄 基于 Naive UI 的多格式文件预览组件，支持 PDF / Word / Excel 在线预览

## 🚀 在线演示

<DemoIframe src="/preview/file-preview" title="文件预览" height="700" />


## ✨ 特性

- **📝 多格式支持**: PDF（iframe）、Word（mammoth → HTML）、Excel（xlsx 解析 → 表格渲染）
- **🔍 智能检测**: 根据文件扩展名自动识别类型，展示对应图标与标签
- **📂 双输入模式**: 支持 `File` 对象直传 & URL 远程加载
- **🖥️ 全屏预览**: 跨浏览器全屏切换（Fullscreen API + vendor prefix 回退）
- **📊 Excel 增强**: 多 Sheet 切换、合并单元格、分页浏览、格式化数字/日期、紧凑/完整视图
- **📑 Word 增强**: 自动提取文档目录（h1 ~ h6）、点击跳转、缩放控制
- **💾 文件下载**: 本地 File 直接 Blob 下载，远程 URL 新窗口打开
- **🏗️ 薄 UI 壳架构**: 逻辑由 `useFilePreview` + `useFullscreen` composable 驱动
- **🧩 子组件分离**: PdfViewer / WordViewer / ExcelViewer 独立子组件，职责清晰
- **💪 TypeScript**: 完整类型定义，统一从 `types/modules/file-preview.d.ts` 导入

## 🏗️ 架构

```
C_FilePreview/
├── index.vue                   ← 薄 UI 壳 (~230 行，模板 + 胶水层)
├── index.scss                  ← 主样式（文件卡片 + 模态框容器）
├── data.ts                     ← 常量配置 + 工具函数 + 文件加载器
├── components/
│   ├── PdfViewer/
│   │   ├── index.vue           ← PDF 预览（翻页 + 缩放 + iframe）
│   │   └── index.scss
│   ├── WordViewer/
│   │   ├── index.vue           ← Word 预览（目录 + 缩放 + HTML 渲染）
│   │   └── index.scss
│   └── ExcelViewer/
│       ├── index.vue           ← Excel 预览（Sheet 切换 + 分页 + 合并单元格）
│       └── index.scss
composables/FilePreview/
├── index.ts                    ← barrel export
├── useFilePreview.ts           ← 核心引擎：加载 / 类型检测 / 下载 / 状态管理
├── useFullscreen.ts            ← 全屏切换：事件监听 + 跨浏览器兼容
types/modules/
├── file-preview.d.ts           ← FilePreviewType / ExcelSheet / DocHeading / ...
```

## 📦 依赖

::: code-group

```bash [bun (推荐)]
bun install naive-ui mammoth xlsx
```

```bash [pnpm]
pnpm install naive-ui mammoth xlsx
```

:::

| 依赖       | 用途                                                  |
| ---------- | ----------------------------------------------------- |
| `naive-ui` | UI 组件库（NModal / NButton / NTag / NPagination 等） |
| `mammoth`  | Word 文档（.doc / .docx）转 HTML                      |
| `xlsx`     | Excel 文件（.xls / .xlsx）解析                        |

## 🎯 快速开始

### 通过 File 对象预览

```vue
<template>
  <input
    type="file"
    @change="handleFileChange"
  />
  <C_FilePreview
    v-if="currentFile"
    :file="currentFile"
  />
</template>

<script setup lang="ts">
  const currentFile = ref<File>()
  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    currentFile.value = target.files?.[0]
  }
</script>
```

### 通过 URL 预览

```vue
<template>
  <C_FilePreview
    url="https://example.com/report.pdf"
    file-name="年度报告.pdf"
  />
</template>
```

### 自动预览模式

```vue
<template>
  <!-- autoPreview 跳过文件信息卡片，直接打开预览模态框 -->
  <C_FilePreview
    :file="someFile"
    auto-preview
    @preview="onPreview"
    @download="onDownload"
  />
</template>
```

## � API 文档

### Props

| 参数          | 类型      | 默认值       | 说明                               |
| ------------- | --------- | ------------ | ---------------------------------- |
| **file**        | `File`    | —            | 直接传入的 File 对象               |
| **url**         | `string`  | —            | 远程文件 URL（与 `file` 二选一）   |
| **fileName**    | `string`  | `'未知文件'` | 显示的文件名（用于类型检测和展示） |
| **autoPreview** | `boolean` | `false`      | 是否跳过文件卡片直接打开预览       |

> `file` 和 `url` 至少传入一个。当同时提供时，优先使用 `file`。

### Events

| 事件       | 参数                     | 说明                               |
| ---------- | ------------------------ | ---------------------------------- |
| **preview**  | `(file: File \| string)` | 预览打开时触发，参数为 File 或 URL |
| **download** | `(file: File \| string)` | 下载触发，参数为 File 或 URL       |

### 支持的文件格式

| 扩展名           | 类型  | 预览方式                   |
| ---------------- | ----- | -------------------------- |
| `.pdf`           | PDF   | iframe 嵌入浏览器原生渲染  |
| `.doc` / `.docx` | Word  | mammoth 转 HTML + 目录提取 |
| `.xls` / `.xlsx` | Excel | xlsx 解析 → 自定义表格渲染 |

## 🧩 子组件

### PdfViewer

| Props        | 类型     | 说明                          |
| ------------ | -------- | ----------------------------- |
| `pdfUrl`     | `string` | PDF 文件的 Blob URL（带参数） |
| `totalPages` | `number` | 总页数                        |

**功能特性**:

- 上一页 / 下一页导航，支持手动输入页码
- 缩放控制：放大 / 缩小 / 重置（步进 25%，范围 50% ~ 300%）
- 使用 `<iframe>` 利用浏览器原生 PDF 渲染

### WordViewer

| Props      | 类型           | 说明                         |
| ---------- | -------------- | ---------------------------- |
| `content`  | `string`       | mammoth 转换后的 HTML 字符串 |
| `headings` | `DocHeading[]` | 提取的文档标题列表           |

**功能特性**:

- 文档目录侧边栏（支持展开/收起），点击标题平滑滚动
- 缩放控制：放大 / 缩小 / 重置（步进 10%，范围 50% ~ 200%）
- 通过 `v-html` 渲染 Word 转换后的 HTML 内容

### ExcelViewer

| Props    | 类型           | 说明                 |
| -------- | -------------- | -------------------- |
| `sheets` | `ExcelSheet[]` | Excel 工作表数据列表 |

| Events   | 参数 | 说明                     |
| -------- | ---- | ------------------------ |
| `reload` | —    | 用户点击"重新解析"时触发 |

**功能特性**:

- 多工作表切换（NTabs 卡片模式）
- 合并单元格（rowspan / colspan）正确渲染
- 分页浏览（可选 20 / 50 / 100 / 200 条每页）
- 完整格式 / 紧凑视图切换
- 列字母标识（A, B, C, …）+ 行号显示
- 单元格智能分类：数字（千分位格式化）、日期、布尔值、甘特图字符、长文本

## 🔧 Composables

### useFilePreview

文件预览核心引擎，管理加载状态、文件类型检测、数据解析和下载。

```typescript
import { useFilePreview } from '@/composables/FilePreview/useFilePreview'

const {
  // 状态
  loading, // Ref<boolean>  — 是否加载中
  error, // Ref<string>   — 错误信息
  fileSize, // Ref<number>   — 文件大小（字节）
  showModal, // Ref<boolean>  — 模态框显示状态

  // 解析后的数据
  pdfUrl, // Ref<string>         — PDF Blob URL
  pdfTotalPages, // Ref<number>         — PDF 总页数
  wordContent, // Ref<string>         — Word HTML 内容
  wordHeadings, // Ref<DocHeading[]>   — Word 文档标题
  excelSheets, // Ref<ExcelSheet[]>   — Excel 工作表

  // 计算属性
  displayFileName, // ComputedRef<string>          — 展示文件名
  fileType, // ComputedRef<FilePreviewType>  — 文件类型
  fileConfig, // ComputedRef<FileConfig>       — 类型配置（图标/颜色/标签）

  // 方法
  loadFile, // () => Promise<void>  — 加载/重新加载文件
  openPreview, // () => Promise<void>  — 打开预览（showModal + loadFile + emit）
  downloadFile, // () => void           — 下载文件
} = useFilePreview(
  {
    file: Ref<File | undefined>,
    url: Ref<string | undefined>,
    fileName: Ref<string>,
  },
  emit
)
```

**内部行为**:

- `loadFile` 根据 `fileType` 自动调用对应的 `loadPdf` / `loadWord` / `loadExcel`
- 远程 URL 先 `fetch` 转 `Blob` → `File`，再交给对应加载器
- `onUnmounted` 时自动回收 PDF 的 Blob URL（`URL.revokeObjectURL`）
- `watch(file.size)` 实时同步文件大小

### useFullscreen

全屏状态管理 composable，支持跨浏览器兼容。

```typescript
import { useFullscreen } from '@/composables/FilePreview/useFullscreen'

const containerRef = ref<HTMLElement>()
const {
  isFullscreen, // Ref<boolean>          — 当前是否全屏
  toggleFullscreen, // () => Promise<void>   — 切换全屏
  exitFullscreen, // () => Promise<void>   — 退出全屏
} = useFullscreen(containerRef)
```

**内部行为**:

- `onMounted` 注册 `fullscreenchange` 事件（含 webkit / moz / MS 前缀）
- `onUnmounted` 自动清理事件监听
- `toggleFullscreen` 依次尝试标准 API → webkit → moz → ms
- `exitFullscreen` 额外处理 `document.fullscreenElement` 为空的情况

## 📐 类型定义

所有类型定义在 `types/modules/file-preview.d.ts`，全局可用无需导入：

```typescript
/** 支持的文件类型 */
type FilePreviewType = 'pdf' | 'word' | 'excel' | 'unknown'

/** 文件类型配置（图标、颜色、标签类型） */
interface FileConfig {
  tagType: string
  icon: string
  color: string
}

/** 缩放配置 */
interface ZoomConfig {
  min: number
  max: number
  step: number
  default: number
}

/** Excel 单元格 */
interface ExcelCell {
  value: any
  rowspan?: number
  colspan?: number
  merged?: boolean
  hidden?: boolean
  style?: any
}

/** Excel 行数据 — 列键 → 单元格 */
interface ExcelRow {
  [key: string]: ExcelCell
}

/** Excel 列配置 */
interface ExcelColumn {
  title: string
  key: string
  width: number
}

/** Excel 工作表 */
interface ExcelSheet {
  name: string
  data: ExcelRow[]
  merges: any[]
  columns: ExcelColumn[]
}

/** Word 文档标题 */
interface DocHeading {
  id: string
  text: string
  level: number
}

/** 文件预览组件 Props */
interface FilePreviewProps {
  file?: File
  url?: string
  fileName?: string
  autoPreview?: boolean
}

/** 加载结果 — PDF */
interface PdfLoadResult {
  url: string
  totalPages: number
}

/** 加载结果 — Word */
interface WordLoadResult {
  content: string
  headings: DocHeading[]
}

/** 加载结果 — Excel */
interface ExcelLoadResult {
  sheets: ExcelSheet[]
}
```

## 🛠️ 工具函数 (data.ts)

### 常量

| 常量                | 类型                              | 说明                                |
| ------------------- | --------------------------------- | ----------------------------------- |
| `FILE_TYPE_MAP`     | `Record<string, FilePreviewType>` | 扩展名 → 文件类型映射               |
| `FILE_CONFIGS`      | `Record<string, FileConfig>`      | 文件类型 → 图标/颜色/标签配置       |
| `ZOOM_CONFIGS`      | `Record<string, ZoomConfig>`      | PDF / Word 缩放参数                 |
| `PAGE_SIZE_OPTIONS` | `number[]`                        | Excel 分页选项 `[20, 50, 100, 200]` |
| `FULLSCREEN_EVENTS` | `string[]`                        | 全屏事件名列表（含 vendor prefix）  |

### 函数

| 函数                     | 签名                                       | 说明                                  |
| ------------------------ | ------------------------------------------ | ------------------------------------- |
| `extractFileNameFromUrl` | `(url: string) => string`                  | 从 URL 提取文件名                     |
| `formatFileSize`         | `(bytes: number) => string`                | 字节 → 可读大小（如 `2.5 MB`）        |
| `getFileType`            | `(fileName: string) => FilePreviewType`    | 根据文件名判断类型                    |
| `getFileConfig`          | `(fileType: string) => FileConfig`         | 获取类型对应的图标/颜色配置           |
| `createZoomHandler`      | `(valueRef, config) => (action) => void`   | 创建缩放操作处理器                    |
| `getColumnLetter`        | `(index: number) => string`                | 列索引 → 字母标识（0→A, 25→Z, 26→AA） |
| `formatCellValue`        | `(value: any) => string`                   | 单元格值格式化（数字千分位等）        |
| `getCellClass`           | `(value: any) => string`                   | 根据值类型返回 CSS 类名               |
| `processExcelSheet`      | `(worksheet, merges) => { data, columns }` | 解析工作表数据 + 合并单元格映射       |
| `loadPdf`                | `(file: File) => Promise<PdfLoadResult>`   | 创建 PDF Blob URL                     |
| `loadWord`               | `(file: File) => Promise<WordLoadResult>`  | mammoth 转 HTML + 标题提取            |
| `loadExcel`              | `(file: File) => Promise<ExcelLoadResult>` | xlsx 解析所有工作表                   |

## 🎨 样式说明

### 主样式 (index.scss)

- `.file-info-card` — 文件信息卡片模式（hover 动画 + 阴影）
- `.modal-container` — 预览模态框容器（header + content 弹性布局）
- `.preview-header` — 文件信息栏（类型标签 + 文件名 + 大小 + 操作按钮）
- `.status-container` — 加载/错误状态居中容器

### 子组件样式

| 文件                     | 说明                                                                        |
| ------------------------ | --------------------------------------------------------------------------- |
| `PdfViewer/index.scss`   | PDF 工具栏 + iframe 容器                                                    |
| `WordViewer/index.scss`  | Word 布局（侧边栏目录 + 文档区域）、`:deep()` 覆盖 mammoth 生成的 HTML 样式 |
| `ExcelViewer/index.scss` | Excel 表格样式（合并单元格、单元格类型颜色、紧凑模式、分页 z-index 覆盖）   |

## 💡 使用场景

### 场景一：文件上传后预览

```vue
<template>
  <NUpload @change="handleUpload">
    <NButton>上传文件</NButton>
  </NUpload>

  <C_FilePreview
    v-if="uploadedFile"
    :file="uploadedFile"
    @preview="handlePreview"
    @download="handleDownload"
  />
</template>

<script setup lang="ts">
  const uploadedFile = ref<File>()

  const handleUpload = ({ file }: { file: { file: File } }) => {
    uploadedFile.value = file.file
  }

  const handlePreview = (file: File | string) => {
    console.log('预览文件:', file)
  }

  const handleDownload = (file: File | string) => {
    console.log('下载文件:', file)
  }
</script>
```

### 场景二：远程文件列表

```vue
<template>
  <div
    v-for="item in fileList"
    :key="item.url"
  >
    <C_FilePreview
      :url="item.url"
      :file-name="item.name"
    />
  </div>
</template>

<script setup lang="ts">
  const fileList = ref([
    { url: '/api/files/report.pdf', name: '月度报告.pdf' },
    { url: '/api/files/data.xlsx', name: '数据汇总.xlsx' },
    { url: '/api/files/doc.docx', name: '技术文档.docx' },
  ])
</script>
```

### 场景三：拖拽上传 + 多文件预览

```vue
<template>
  <NUploadDragger
    multiple
    @change="handleFiles"
  >
    拖拽文件到此处
  </NUploadDragger>

  <C_FilePreview
    v-for="f in files"
    :key="f.name"
    :file="f"
  />
</template>

<script setup lang="ts">
  const files = ref<File[]>([])

  const handleFiles = ({ fileList }: any) => {
    files.value = fileList.map((item: any) => item.file)
  }
</script>
```

## ⚠️ 注意事项

1. **PDF 渲染依赖浏览器**: 使用 `<iframe>` 嵌入，依赖浏览器原生 PDF 插件。Chrome / Edge / Firefox 均内置支持。
2. **Word 转换有损**: mammoth 专注于语义转换，复杂排版（表格嵌套、高级样式）可能丢失。适合文本为主的文档。
3. **Excel 大文件**: 超大 Excel 文件（> 10MB）可能导致浏览器卡顿。建议后端做分页或文件大小限制。
4. **跨域 URL**: 远程 URL 需支持 CORS，否则 `fetch` 会失败。
5. **内存回收**: 组件卸载时自动回收 PDF Blob URL（`URL.revokeObjectURL`），无需手动处理。
6. **全屏兼容**: 旧版 Safari 使用 `webkitRequestFullscreen`，IE 使用 `msRequestFullscreen`，组件已做降级处理。

## 📝 更新日志

### v2.0.0 — Composable 架构重构

**架构改进**:

- 主组件从 **817 行** 精简至 **~230 行**（薄 UI 壳模式）
- 提取 **useFilePreview** composable — 核心逻辑引擎（~190 行）
- 提取 **useFullscreen** composable — 全屏状态管理（~75 行）
- 类型定义统一迁移至 `types/modules/file-preview.d.ts`

**子组件拆分**:

- **PdfViewer** — 翻页 + 缩放 + iframe 渲染
- **WordViewer** — 目录导航 + 缩放 + HTML 渲染
- **ExcelViewer** — Sheet 切换 + 分页 + 合并单元格 + 格式切换

**data.ts 重构**:

- 移除工厂函数模式（`createFileLoaders` / `createFullscreenToggler`）
- 改为纯异步函数（`loadPdf` / `loadWord` / `loadExcel`），返回类型化结果对象
- 类型定义移出，仅保留常量 + 工具函数 + 加载器

**Demo 页面清理**:

- 移除无效配置变量：`showHeader`、`showToolbar`、`allowDownload`
- 移除对应的 UI 控件和样式

### v1.0.0 — 初始版本

- 支持 PDF / Word / Excel 三种格式预览
- 文件信息卡片 + 模态框预览
- 基础全屏支持

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 文件预览组件支持 PDF、Word、Excel 等常见格式的在线预览。适用于文档管理、审批流程等场景。如果遇到问题请先查看文档，或者在团队群里讨论。📄
