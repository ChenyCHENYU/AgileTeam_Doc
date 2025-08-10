---
outline: 'deep'
---

# C_FilePreview 文件预览组件

> 📄 强大的文件预览组件，支持 PDF、Word、Excel 等多种格式的在线预览

## ✨ 特性

- **📑 多格式支持**: PDF、Word（docx）、Excel（xlsx）文件预览
- **🔍 缩放控制**: 支持放大、缩小、适应屏幕等缩放操作
- **📖 分页导航**: PDF 文件支持页码跳转和翻页
- **📊 Excel 功能**: 多工作表切换、分页显示、格式保留
- **📝 Word 功能**: 文档目录导航、内容格式保留
- **🖥️ 全屏预览**: 支持全屏模式查看文件
- **💾 文件下载**: 一键下载预览文件
- **🎨 优雅界面**: 现代化的预览界面设计

## 📦 安装

```bash
# 安装必要依赖
bun add pdfjs-dist mammoth xlsx
```

组件已全局注册，直接使用即可：

```vue
<template>
  <C_FilePreview :file="file" />
</template>
```

## 🎯 快速开始

### 基础用法

```vue
<template>
  <!-- 通过文件对象预览 -->
  <C_FilePreview 
    :file="fileObject"
    :file-name="fileName"
  />
  
  <!-- 通过 URL 预览 -->
  <C_FilePreview 
    :url="fileUrl"
    :file-name="fileName"
  />
</template>

<script setup>
const fileObject = ref(null)
const fileUrl = ref('https://example.com/document.pdf')
const fileName = ref('示例文档.pdf')

// 处理文件选择
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileObject.value = file
    fileName.value = file.name
  }
}
</script>
```

### 自动预览模式

```vue
<template>
  <!-- 自动预览模式，直接显示预览内容 -->
  <C_FilePreview 
    :file="file"
    :auto-preview="true"
  />
</template>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| **file** | `File` | - | 文件对象 |
| **url** | `string` | - | 文件 URL 地址 |
| **fileName** | `string` | `'未知文件'` | 文件名称 |
| **autoPreview** | `boolean` | `false` | 是否自动预览 |

### Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| **preview** | `file: File \| string` | 打开预览时触发 |
| **download** | `file: File \| string` | 下载文件时触发 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| **openPreview** | - | `Promise<void>` | 打开预览窗口 |
| **downloadFile** | - | `void` | 下载文件 |
| **loadFile** | - | `Promise<void>` | 重新加载文件 |

## 🎨 使用示例

### 场景 1: 文件上传预览

```vue
<template>
  <div class="upload-preview">
    <NUpload
      :custom-request="customRequest"
      @change="handleUploadChange"
    >
      <NButton>选择文件</NButton>
    </NUpload>
    
    <!-- 文件列表 -->
    <div class="file-list">
      <div 
        v-for="item in fileList" 
        :key="item.id"
        class="file-item"
      >
        <C_FilePreview
          :file="item.file"
          :file-name="item.name"
          @preview="handlePreview(item)"
          @download="handleDownload(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const fileList = ref([])

const handleUploadChange = ({ file }) => {
  if (file.status === 'finished') {
    fileList.value.push({
      id: file.id,
      name: file.name,
      file: file.file,
      url: file.url,
    })
  }
}

const handlePreview = (item) => {
  console.log('预览文件:', item.name)
  // 记录预览行为
  trackEvent('file_preview', { fileName: item.name })
}

const handleDownload = (item) => {
  console.log('下载文件:', item.name)
  // 记录下载行为
  trackEvent('file_download', { fileName: item.name })
}

const customRequest = ({ file, onFinish }) => {
  // 模拟上传
  setTimeout(() => {
    onFinish()
  }, 1000)
}
</script>
```

### 场景 2: 文档管理系统

```vue
<template>
  <div class="document-manager">
    <NDataTable
      :columns="columns"
      :data="documents"
    />
  </div>
</template>

<script setup>
const documents = ref([
  {
    id: 1,
    name: '2024年度报告.pdf',
    type: 'pdf',
    size: 2048000,
    url: '/api/documents/1/download',
    uploadTime: '2024-01-15',
  },
  {
    id: 2,
    name: '项目计划.docx',
    type: 'word',
    size: 512000,
    url: '/api/documents/2/download',
    uploadTime: '2024-01-16',
  },
])

const columns = [
  {
    title: '文件名',
    key: 'name',
    render: (row) => h('span', row.name),
  },
  {
    title: '类型',
    key: 'type',
    render: (row) => h(NTag, { type: 'info' }, () => row.type.toUpperCase()),
  },
  {
    title: '大小',
    key: 'size',
    render: (row) => formatFileSize(row.size),
  },
  {
    title: '上传时间',
    key: 'uploadTime',
  },
  {
    title: '操作',
    key: 'actions',
    render: (row) => h(
      C_FilePreview,
      {
        url: row.url,
        fileName: row.name,
        onPreview: () => {
          message.info(`正在预览: ${row.name}`)
        },
        onDownload: () => {
          message.success(`开始下载: ${row.name}`)
        },
      }
    ),
  },
]
</script>
```

### 场景 3: 合同审批流程

```vue
<template>
  <div class="contract-approval">
    <NCard title="合同审批">
      <div class="contract-info">
        <NDescriptions :column="2">
          <NDescriptionsItem label="合同编号">
            {{ contract.id }}
          </NDescriptionsItem>
          <NDescriptionsItem label="合同类型">
            {{ contract.type }}
          </NDescriptionsItem>
          <NDescriptionsItem label="签约方">
            {{ contract.party }}
          </NDescriptionsItem>
          <NDescriptionsItem label="合同金额">
            ¥{{ contract.amount }}
          </NDescriptionsItem>
        </NDescriptions>
      </div>
      
      <!-- 合同文件预览 -->
      <div class="contract-preview">
        <h3>合同文件</h3>
        <C_FilePreview
          ref="contractPreviewRef"
          :url="contract.fileUrl"
          :file-name="contract.fileName"
          auto-preview
        />
      </div>
      
      <!-- 审批操作 -->
      <div class="approval-actions">
        <NSpace>
          <NButton 
            type="success"
            @click="handleApprove"
          >
            批准
          </NButton>
          <NButton 
            type="error"
            @click="handleReject"
          >
            驳回
          </NButton>
          <NButton
            @click="downloadContract"
          >
            下载合同
          </NButton>
        </NSpace>
      </div>
    </NCard>
  </div>
</template>

<script setup>
const contractPreviewRef = ref()

const contract = ref({
  id: 'HT-2024-001',
  type: '采购合同',
  party: 'XX科技有限公司',
  amount: '100,000',
  fileUrl: '/api/contracts/HT-2024-001.pdf',
  fileName: '采购合同-HT-2024-001.pdf',
})

const handleApprove = async () => {
  const result = await dialog.create({
    title: '确认批准',
    content: '确定要批准这份合同吗？',
    positiveText: '确认',
    negativeText: '取消',
  })
  
  if (result) {
    await api.approveContract(contract.value.id)
    message.success('合同已批准')
  }
}

const handleReject = async () => {
  // 驳回逻辑
}

const downloadContract = () => {
  contractPreviewRef.value?.downloadFile()
}
</script>
```

### 场景 4: 报表中心

```vue
<template>
  <div class="report-center">
    <NTabs type="card">
      <NTabPane name="sales" tab="销售报表">
        <C_FilePreview
          :url="'/api/reports/sales-2024.xlsx'"
          file-name="2024年销售报表.xlsx"
          auto-preview
        />
      </NTabPane>
      
      <NTabPane name="finance" tab="财务报表">
        <C_FilePreview
          :url="'/api/reports/finance-2024.xlsx'"
          file-name="2024年财务报表.xlsx"
          auto-preview
        />
      </NTabPane>
      
      <NTabPane name="analysis" tab="分析报告">
        <C_FilePreview
          :url="'/api/reports/analysis-2024.pdf'"
          file-name="2024年度分析报告.pdf"
          auto-preview
        />
      </NTabPane>
    </NTabs>
  </div>
</template>
```

## 🎨 样式定制

### 自定义预览窗口样式

```scss
// index.scss
.c-file-preview-wrapper {
  // 文件信息卡片
  .file-info-card {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    
    .file-icon {
      font-size: 40px;
    }
    
    .file-name {
      font-weight: 600;
      color: #333;
    }
  }
  
  // 模态框样式
  .modal-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .modal-header {
      padding: 12px 16px;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .modal-content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  }
  
  // PDF 预览样式
  .file-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .file-toolbar {
      padding: 8px 16px;
      background: #fafafa;
      border-bottom: 1px solid #e8e8e8;
    }
    
    .file-viewer {
      flex: 1;
      overflow: auto;
    }
  }
}

// 暗色主题
.dark {
  .file-info-card {
    background: #1f1f1f;
    
    .file-name {
      color: #e5e5e5;
    }
  }
  
  .modal-header {
    background: #1a1a1a;
    border-color: #333;
  }
}
```

### Excel 表格样式

```scss
.excel-table {
  width: 100%;
  border-collapse: collapse;
  
  th {
    background: #f5f5f5;
    font-weight: 600;
    border: 1px solid #d9d9d9;
    padding: 8px;
    
    &.row-number {
      width: 60px;
      text-align: center;
    }
  }
  
  td {
    border: 1px solid #e8e8e8;
    padding: 6px 8px;
    
    &.excel-cell {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  
  // 紧凑模式
  &.compact-mode {
    td {
      padding: 4px 6px;
      font-size: 12px;
    }
  }
}
```

## ⚙️ 高级配置

### 支持的文件格式

| 格式 | 扩展名 | 说明 |
| --- | --- | --- |
| **PDF** | `.pdf` | 使用 iframe 或 PDF.js 渲染 |
| **Word** | `.docx` | 使用 mammoth.js 转换为 HTML |
| **Excel** | `.xlsx`, `.xls` | 使用 xlsx 库解析 |

### 文件大小限制

```javascript
// 建议的文件大小限制
const FILE_SIZE_LIMITS = {
  pdf: 50 * 1024 * 1024,    // 50MB
  word: 20 * 1024 * 1024,   // 20MB
  excel: 30 * 1024 * 1024,  // 30MB
}

// 使用前检查文件大小
const checkFileSize = (file, type) => {
  const limit = FILE_SIZE_LIMITS[type]
  if (file.size > limit) {
    message.warning(`文件过大，建议不超过 ${formatFileSize(limit)}`)
    return false
  }
  return true
}
```

## 🐛 常见问题

### Q1: PDF 文件无法预览？

**A1:** 检查以下几点：

```javascript
// 1. 确保 PDF 文件可访问
const checkPdfUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

// 2. 处理跨域问题
// 需要服务器设置 CORS 头
// Access-Control-Allow-Origin: *
```

### Q2: Word 文档格式丢失？

**A2:** mammoth.js 只支持部分格式：

```javascript
// 支持的格式
const SUPPORTED_FORMATS = [
  '段落样式',
  '标题',
  '列表',
  '表格',
  '图片（转为 base64）',
]

// 不支持的格式
const UNSUPPORTED_FORMATS = [
  '页眉页脚',
  '批注',
  '修订记录',
  '复杂图表',
]
```

### Q3: Excel 表格过大加载慢？

**A3:** 使用分页加载：

```vue
<script setup>
// 已内置分页功能
const pageSize = ref(50) // 每页显示50行
const currentPage = ref(1)

// 可以调整每页大小
const PAGE_SIZE_OPTIONS = [20, 50, 100, 200]
</script>
```

### Q4: 文件下载失败？

**A4:** 检查下载实现：

```javascript
// 本地文件下载
const downloadLocalFile = (file) => {
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  a.click()
  URL.revokeObjectURL(url)
}

// 远程文件下载
const downloadRemoteFile = (url, fileName) => {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.target = '_blank'
  a.click()
}
```

## 🎯 最佳实践

### 1. 文件类型检测

```javascript
// 准确的文件类型检测
const detectFileType = (file) => {
  // 优先使用 MIME 类型
  const mimeType = file.type
  
  // 其次使用文件扩展名
  const extension = file.name.split('.').pop()?.toLowerCase()
  
  // 类型映射
  const typeMap = {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
  }
  
  return typeMap[mimeType] || getTypeByExtension(extension)
}
```

### 2. 性能优化

```javascript
// 大文件分片加载
const loadLargeFile = async (file) => {
  const CHUNK_SIZE = 1024 * 1024 // 1MB
  const chunks = Math.ceil(file.size / CHUNK_SIZE)
  
  for (let i = 0; i < chunks; i++) {
    const start = i * CHUNK_SIZE
    const end = Math.min(start + CHUNK_SIZE, file.size)
    const chunk = file.slice(start, end)
    
    // 处理分片
    await processChunk(chunk)
    
    // 更新进度
    updateProgress((i + 1) / chunks * 100)
  }
}
```

### 3. 错误处理

```javascript
// 统一的错误处理
const handleFileError = (error, fileType) => {
  const errorMessages = {
    pdf: 'PDF 文件可能已损坏或格式不正确',
    word: 'Word 文档解析失败，请确保是 .docx 格式',
    excel: 'Excel 文件读取失败，请检查文件完整性',
  }
  
  message.error(errorMessages[fileType] || '文件预览失败')
  
  // 上报错误
  reportError({
    type: 'file_preview_error',
    fileType,
    error: error.message,
  })
}
```

## 📝 更新日志

### v1.0.0 (2025-07-27)

- ✨ 初始版本发布
- ✨ 支持 PDF 预览和翻页
- ✨ 支持 Word 文档预览
- ✨ 支持 Excel 表格预览
- ✨ 全屏预览功能
- ✨ 文件下载功能
- ✨ 缩放控制功能

## 🤝 贡献指南

组件位置：`src/components/global/C_FilePreview/index.vue`

如需扩展功能，请考虑：
1. 添加更多文件格式支持
2. 优化大文件加载性能
3. 增强预览交互功能
4. 更新文档说明

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved 😎

---

**💡 提示**: 文件预览组件提供了专业的文档在线预览功能，支持 PDF、Word、Excel 等常见办公文档格式。通过内置的缩放、翻页、全屏等功能，提供接近原生应用的预览体验。组件自动识别文件类型并选择合适的渲染方式，让文档预览变得简单高效。