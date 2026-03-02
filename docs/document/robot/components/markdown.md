---
outline: 'deep'
---

# C_Markdown 编辑器组件

> ✍️ 基于 v-md-editor 的强大 Markdown 编辑器组件，让内容创作变得简单而优雅

## 🚀 在线演示

<DemoIframe src="/preview/markdown" title="Markdown 编辑器" height="700" />


## ✨ 特性

- **📝 多种编辑模式**: 支持编辑、可编辑、预览三种模式自由切换
- **🎨 实时预览**: 所见即所得的实时渲染效果
- **🖼️ 图片上传**: 支持拖拽上传和粘贴上传图片
- **🔢 字数统计**: 实时字数统计和长度限制控制
- **💾 自动保存**: 智能自动保存，防止内容丢失
- **🛠️ 工具栏定制**: 灵活的工具栏配置，支持自定义按钮
- **📱 全屏模式**: 沉浸式编辑体验
- **📋 目录导航**: 自动生成文档目录
- **⌨️ 语法高亮**: 代码块语法高亮显示
- **🔗 快捷操作**: 丰富的快捷键和辅助功能
- **💪 TypeScript**: 完整的类型定义和类型安全
- **📦 轻量封装**: 保持原有功能的同时增强易用性

## 📦 安装

::: code-group

```bash [bun (推荐)]
# 安装 v-md-editor 依赖
bun add @kangc/v-md-editor
```

```bash [pnpm]
# 安装 v-md-editor 依赖
pnpm install @kangc/v-md-editor
```

```bash [yarn]
# 安装 v-md-editor 依赖
yarn add @kangc/v-md-editor
```

```bash [npm]
# 安装 v-md-editor 依赖
npm install @kangc/v-md-editor
```

:::

## 🎯 快速开始

### 基础用法

```vue {3-9}
<template>
  <!-- 最简单的 Markdown 编辑器 -->
  <C_Markdown
    v-model="content"
    height="400px"
    placeholder="请输入 Markdown 内容..."
    @change="handleChange"
    @save="handleSave"
  />
</template>

<script setup>
const content = ref(`# Hello Markdown

这是一个**Markdown编辑器**的示例。

## 功能特性

- 支持实时预览
- 支持语法高亮
- 支持图片上传

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`)
}

greet('Vue Developer')
\`\`\`
`)

const handleChange = (text, html) => {
  console.log('内容变化:', { text: text.length, html: html.length })
}

const handleSave = (text, html) => {
  console.log('保存内容:', { text, html })
}
</script>
```

::: details 📝 表单集成示例 - 完整的文章编辑表单
```vue
<template>
  <div class="article-editor">
    <n-form :model="articleForm" :rules="formRules" label-placement="top">
      <n-form-item label="文章标题" path="title">
        <n-input 
          v-model:value="articleForm.title" 
          placeholder="请输入文章标题"
          :maxlength="100"
          show-count
        />
      </n-form-item>

      <n-form-item label="文章内容" path="content">
        <div class="markdown-wrapper">
          <C_Markdown
            v-model="articleForm.content"
            height="500px"
            placeholder="请输入文章内容..."
            :max-length="20000"
            :auto-save="true"
            :auto-save-interval="30000"
            @change="handleContentChange"
            @save="handleContentSave"
            @upload-image="handleImageUpload"
            @word-count-change="handleWordCountChange"
            @auto-save="handleAutoSave"
          />
          
          <div class="editor-stats">
            <n-space>
              <n-tag type="info" size="small">
                字数: {{ wordCount }} / 20000
              </n-tag>
              <n-tag v-if="lastAutoSaveTime" type="success" size="small">
                自动保存: {{ lastAutoSaveTime }}
              </n-tag>
            </n-space>
          </div>
        </div>
      </n-form-item>

      <n-form-item>
        <n-space>
          <n-button type="primary" @click="submitArticle" :loading="submitting">
            发布文章
          </n-button>
          <n-button @click="saveAsDraft" :loading="savingDraft">
            保存草稿
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
const articleForm = reactive({
  title: '',
  content: ''
})

const wordCount = ref(0)
const lastAutoSaveTime = ref('')
const submitting = ref(false)
const savingDraft = ref(false)

const formRules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
}

const handleImageUpload = (event, insertImage, files) => {
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      insertImage({
        url: e.target.result,
        desc: file.name
      })
    }
    reader.readAsDataURL(file)
  })
  
  message.success(`成功上传 ${files.length} 张图片`)
}

const handleAutoSave = (text) => {
  lastAutoSaveTime.value = new Date().toLocaleTimeString()
  message.info('内容已自动保存')
}

const submitArticle = async () => {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    message.success('文章发布成功！')
  }, 2000)
}
</script>

<style scoped>
.article-editor {
  padding: 24px;
}

.markdown-wrapper {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.editor-stats {
  padding: 12px 16px;
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
}
</style>
```
:::

## 📖 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **modelValue** | `string` | `''` | 编辑器内容（双向绑定） |
| **height** | `string \| number` | `'400px'` | 编辑器高度 |
| **disabled** | `boolean` | `false` | 是否禁用编辑器 |
| **placeholder** | `string` | `'请输入 Markdown 内容...'` | 占位符文本 |
| **mode** | `'edit' \| 'editable' \| 'preview'` | `'editable'` | 编辑模式 |
| **toolbar** | `object` | `-` | 工具栏配置 |
| **uploadImageConfig** | `object` | `{ accept: 'image/*', multiple: false }` | 图片上传配置 |
| **maxLength** | `number` | `50000` | 最大字符数限制 |
| **autoSave** | `boolean` | `false` | 是否启用自动保存 |
| **autoSaveInterval** | `number` | `30000` | 自动保存间隔（毫秒） |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **update:modelValue** | `(value: string)` | 内容更新时触发 |
| **change** | `(text: string, html: string)` | 内容变化时触发 |
| **save** | `(text: string, html: string)` | 手动保存时触发 |
| **upload-image** | `(event: Event, insertImage: Function, files: FileList)` | 上传图片时触发 |
| **word-count-change** | `(count: number)` | 字数变化时触发 |
| **auto-save** | `(text: string)` | 自动保存时触发 |
| **max-length-exceeded** | `(currentLength: number, maxLength: number)` | 超出最大长度时触发 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| **focus** | `-` | `void` | 聚焦到编辑器 |
| **getHtml** | `-` | `string` | 获取 HTML 内容 |
| **insertText** | `(text: string)` | `void` | 在当前位置插入文本 |

### 模式说明

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| **edit** | 编辑模式 | 传统的编辑和预览分离模式 |
| **editable** | 可编辑模式 | 实时渲染，所见即所得 |
| **preview** | 预览模式 | 只读显示，用于内容展示 |

## 🎨 使用示例

::: details 🏢 博客文章编辑系统 - 完整的内容管理工作流
```vue
<template>
  <div class="blog-editor">
    <n-card title="文章编辑器">
      <template #header-extra>
        <n-space>
          <n-button @click="loadTemplate" type="primary" size="small">
            加载模板
          </n-button>
          <n-button @click="exportMarkdown" size="small">
            导出 Markdown
          </n-button>
        </n-space>
      </template>

      <n-grid cols="1 800:2" x-gap="16">
        <!-- 文章信息 -->
        <n-grid-item>
          <n-card title="文章信息" size="small">
            <n-form :model="articleInfo" label-placement="top">
              <n-form-item label="文章标题">
                <n-input
                  v-model:value="articleInfo.title"
                  placeholder="请输入标题"
                  :maxlength="100"
                  show-count
                />
              </n-form-item>

              <n-form-item label="分类标签">
                <n-space vertical>
                  <n-select
                    v-model:value="articleInfo.category"
                    :options="categoryOptions"
                    placeholder="选择分类"
                  />
                  <n-dynamic-tags v-model:value="articleInfo.tags" />
                </n-space>
              </n-form-item>
            </n-form>
          </n-card>
        </n-grid-item>

        <!-- 编辑统计 -->
        <n-grid-item>
          <n-card title="编辑统计" size="small">
            <n-grid cols="2" x-gap="12" y-gap="12">
              <n-grid-item>
                <n-statistic label="字符数" :value="editorStats.characters" />
              </n-grid-item>
              <n-grid-item>
                <n-statistic label="预计阅读" :value="`${editorStats.readingTime}分钟`" />
              </n-grid-item>
            </n-grid>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-card>

    <!-- Markdown 编辑器 -->
    <n-card title="内容编辑" class="mt-16px">
      <template #header-extra>
        <n-space>
          <n-tag v-if="isAutoSaving" type="warning" size="small">
            正在保存...
          </n-tag>
          <n-tag v-else-if="lastSaveTime" type="success" size="small">
            {{ lastSaveTime }}
          </n-tag>
        </n-space>
      </template>

      <C_Markdown
        ref="editorRef"
        v-model="articleContent"
        height="600px"
        :auto-save="true"
        :auto-save-interval="15000"
        :max-length="50000"
        placeholder="开始创作你的精彩文章..."
        @change="handleContentChange"
        @auto-save="handleAutoSave"
        @upload-image="handleImageUpload"
      />
    </n-card>

    <!-- 操作按钮 -->
    <n-card class="mt-16px">
      <n-space justify="space-between">
        <n-space>
          <n-button @click="previewArticle" type="info">
            预览文章
          </n-button>
          <n-button @click="saveDraft" :loading="savingDraft">
            保存草稿
          </n-button>
        </n-space>
        
        <n-space>
          <n-button @click="publishArticle" type="primary" :loading="publishing">
            立即发布
          </n-button>
        </n-space>
      </n-space>
    </n-card>
  </div>
</template>

<script setup>
const message = useMessage()

const editorRef = ref()
const isAutoSaving = ref(false)
const lastSaveTime = ref('')
const savingDraft = ref(false)
const publishing = ref(false)

const articleInfo = reactive({
  title: '',
  category: '',
  tags: []
})

const categoryOptions = [
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '产品设计', value: 'design' }
]

const articleContent = ref(`# 文章标题

## 概述

在这里开始你的创作...`)

const editorStats = reactive({
  characters: 0,
  readingTime: 0
})

const handleContentChange = (text, html) => {
  editorStats.characters = text.length
  editorStats.readingTime = Math.ceil(text.split(' ').length / 200)
}

const handleAutoSave = (text) => {
  isAutoSaving.value = true
  
  setTimeout(() => {
    isAutoSaving.value = false
    lastSaveTime.value = `自动保存于 ${new Date().toLocaleTimeString()}`
  }, 1000)
}

const handleImageUpload = (event, insertImage, files) => {
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      insertImage({
        url: e.target.result,
        desc: file.name
      })
    }
    reader.readAsDataURL(file)
  })
  
  message.success(`上传 ${files.length} 张图片`)
}

const publishArticle = async () => {
  if (!articleInfo.title.trim()) {
    message.error('请输入文章标题')
    return
  }
  
  publishing.value = true
  
  setTimeout(() => {
    publishing.value = false
    message.success('文章发布成功！')
  }, 2000)
}

const loadTemplate = () => {
  const template = `# 技术分享：[技术名称]

## 背景介绍

为什么选择这个技术...

## 核心特性

### 特性一
- 优点
- 缺点

## 实践案例

\`\`\`javascript
// 代码示例
\`\`\`

## 总结

技术总结...`
  
  articleContent.value = template
  message.success('模板已加载')
}

const exportMarkdown = () => {
  const blob = new Blob([articleContent.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${articleInfo.title || 'article'}.md`
  a.click()
  URL.revokeObjectURL(url)
  message.success('Markdown 文件已导出')
}
</script>

<style scoped>
.blog-editor {
  padding: 24px;
}
</style>
```
:::

::: details 📚 文档管理系统 - 团队协作文档编辑
```vue
<template>
  <div class="document-manager">
    <n-card title="文档管理系统">
      <template #header-extra>
        <n-button @click="createNewDocument" type="primary">
          新建文档
        </n-button>
      </template>

      <n-grid cols="1 600:3" x-gap="16">
        <!-- 文档列表 -->
        <n-grid-item>
          <n-card title="文档列表" size="small">
            <div class="document-list">
              <div
                v-for="doc in documents"
                :key="doc.id"
                class="document-item"
                :class="{ active: currentDocument?.id === doc.id }"
                @click="selectDocument(doc)"
              >
                <div class="doc-info">
                  <h4>{{ doc.title }}</h4>
                  <p>{{ doc.summary }}</p>
                  <div class="doc-meta">
                    <span>{{ formatDate(doc.updatedAt) }}</span>
                    <span>{{ doc.wordCount }} 字</span>
                  </div>
                </div>
              </div>
            </div>
          </n-card>
        </n-grid-item>

        <!-- 编辑器 -->
        <n-grid-item span="2">
          <n-card size="small">
            <template #header>
              <n-input
                v-if="currentDocument"
                v-model:value="currentDocument.title"
                placeholder="文档标题"
                @blur="updateDocumentTitle"
              />
              <span v-else>请选择或创建文档</span>
            </template>

            <template #header-extra>
              <n-space v-if="currentDocument">
                <n-tag :type="getStatusType(currentDocument.status)" size="small">
                  {{ getStatusText(currentDocument.status) }}
                </n-tag>
                <n-button @click="saveDocument" size="small" :loading="saving">
                  保存
                </n-button>
              </n-space>
            </template>

            <div v-if="currentDocument" class="document-editor">
              <C_Markdown
                v-model="currentDocument.content"
                height="500px"
                :auto-save="true"
                :auto-save-interval="20000"
                placeholder="开始编写你的文档..."
                @change="handleDocumentChange"
                @auto-save="handleDocumentAutoSave"
                @word-count-change="handleWordCountChange"
              />

              <div class="editor-footer">
                <n-space justify="space-between">
                  <div>
                    <span>字数: {{ currentDocument.wordCount }}</span>
                    <span>最后修改: {{ formatDate(currentDocument.updatedAt) }}</span>
                  </div>
                  
                  <div>
                    <n-space>
                      <n-button @click="shareDocument" size="small">
                        分享文档
                      </n-button>
                      <n-button @click="exportDocument" size="small">
                        导出
                      </n-button>
                    </n-space>
                  </div>
                </n-space>
              </div>
            </div>

            <div v-else class="empty-editor">
              <n-empty description="请选择一个文档开始编辑">
                <template #extra>
                  <n-button @click="createNewDocument" type="primary">
                    创建新文档
                  </n-button>
                </template>
              </n-empty>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup>
const message = useMessage()

const documents = ref([
  {
    id: 1,
    title: '产品需求文档',
    summary: '新版本产品功能需求和规格说明',
    content: `# 产品需求文档 v2.0

## 概述

本文档描述了产品新版本的功能需求...

## 核心功能

### 用户管理
- 用户注册/登录
- 权限管理

### 内容管理
- 文档创建
- 版本控制`,
    status: 'published',
    wordCount: 156,
    author: 'Alice',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
])

const currentDocument = ref(null)
const saving = ref(false)

const getStatusType = (status) => {
  const types = {
    draft: 'warning',
    published: 'success',
    archived: 'default'
  }
  return types[status] || 'default'
}

const getStatusText = (status) => {
  const texts = {
    draft: '草稿',
    published: '已发布',
    archived: '已归档'
  }
  return texts[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN')
}

const selectDocument = (doc) => {
  currentDocument.value = { ...doc }
}

const createNewDocument = () => {
  const newDoc = {
    id: Date.now(),
    title: '新建文档',
    summary: '请编写文档摘要',
    content: `# 新建文档

## 开始编写

在这里开始你的内容创作...`,
    status: 'draft',
    wordCount: 0,
    author: 'Current User',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  documents.value.unshift(newDoc)
  currentDocument.value = { ...newDoc }
  message.success('新文档已创建')
}

const handleDocumentChange = (text, html) => {
  if (!currentDocument.value) return
  
  currentDocument.value.updatedAt = new Date()
  
  const docIndex = documents.value.findIndex(d => d.id === currentDocument.value.id)
  if (docIndex > -1) {
    documents.value[docIndex].content = text
    documents.value[docIndex].updatedAt = currentDocument.value.updatedAt
  }
}

const handleWordCountChange = (count) => {
  if (!currentDocument.value) return
  
  currentDocument.value.wordCount = count
  
  const docIndex = documents.value.findIndex(d => d.id === currentDocument.value.id)
  if (docIndex > -1) {
    documents.value[docIndex].wordCount = count
  }
}

const saveDocument = async () => {
  if (!currentDocument.value) return
  
  saving.value = true
  
  setTimeout(() => {
    saving.value = false
    currentDocument.value.updatedAt = new Date()
    
    const docIndex = documents.value.findIndex(d => d.id === currentDocument.value.id)
    if (docIndex > -1) {
      documents.value[docIndex] = { ...currentDocument.value }
    }
    
    message.success('文档保存成功')
  }, 1000)
}

// 初始化选择第一个文档
onMounted(() => {
  if (documents.value.length > 0) {
    selectDocument(documents.value[0])
  }
})
</script>

<style scoped>
.document-manager {
  padding: 24px;
}

.document-list {
  max-height: 500px;
  overflow-y: auto;
}

.document-item {
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.document-item:hover {
  border-color: #d0d0d0;
  background: #fafafa;
}

.document-item.active {
  border-color: #1890ff;
  background: #f0f8ff;
}

.doc-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.doc-info p {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #666;
}

.doc-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #999;
}

.document-editor {
  padding: 16px 0;
}

.editor-footer {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
  color: #666;
}

.empty-editor {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
}
</style>
```
:::

::: details 📊 知识库系统 - 智能内容分类和搜索
```vue
<template>
  <div class="knowledge-base">
    <n-card title="知识库管理">
      <template #header-extra>
        <n-space>
          <n-input
            v-model:value="searchKeyword"
            placeholder="搜索知识库..."
            style="width: 200px"
          >
            <template #prefix>
              <div class="i-mdi:magnify"></div>
            </template>
          </n-input>
          <n-button @click="createNewArticle" type="primary">
            新建文章
          </n-button>
        </n-space>
      </template>

      <n-grid cols="1 800:4" x-gap="16">
        <!-- 分类导航 -->
        <n-grid-item>
          <n-card title="知识分类" size="small">
            <n-tree
              :data="categoryTree"
              :selected-keys="selectedCategories"
              selectable
              @update:selected-keys="handleCategorySelect"
            />
          </n-card>
        </n-grid-item>

        <!-- 文章列表 -->
        <n-grid-item span="2">
          <n-card title="文章列表" size="small">
            <template #header-extra>
              <span>共 {{ filteredArticles.length }} 篇文章</span>
            </template>

            <div class="article-list">
              <div
                v-for="article in paginatedArticles"
                :key="article.id"
                class="article-card"
                :class="{ active: currentArticle?.id === article.id }"
                @click="selectArticle(article)"
              >
                <div class="article-header">
                  <h3>{{ article.title }}</h3>
                  <n-tag :type="getStatusType(article.status)" size="small">
                    {{ getStatusText(article.status) }}
                  </n-tag>
                </div>
                
                <p class="article-summary">{{ article.summary }}</p>
                
                <div class="article-meta">
                  <n-space>
                    <span>{{ article.category }}</span>
                    <span>{{ article.author }}</span>
                    <span>{{ formatDate(article.updatedAt) }}</span>
                  </n-space>
                </div>

                <div class="article-tags">
                  <n-tag
                    v-for="tag in article.tags.slice(0, 3)"
                    :key="tag"
                    size="small"
                    style="margin-right: 4px;"
                  >
                    {{ tag }}
                  </n-tag>
                </div>
              </div>
            </div>
          </n-card>
        </n-grid-item>

        <!-- 编辑器 -->
        <n-grid-item>
          <n-card size="small">
            <template #header>
              <span v-if="currentArticle">编辑文章</span>
              <span v-else>选择文章</span>
            </template>

            <div v-if="currentArticle" class="article-editor">
              <!-- 文章基础信息 -->
              <n-form :model="currentArticle" size="small">
                <n-form-item label="标题">
                  <n-input v-model:value="currentArticle.title" />
                </n-form-item>
                
                <n-form-item label="摘要">
                  <n-input
                    v-model:value="currentArticle.summary"
                    type="textarea"
                    :rows="2"
                  />
                </n-form-item>

                <n-form-item label="分类">
                  <n-select
                    v-model:value="currentArticle.category"
                    :options="categoryOptions"
                  />
                </n-form-item>

                <n-form-item label="标签">
                  <n-dynamic-tags v-model:value="currentArticle.tags" />
                </n-form-item>
              </n-form>

              <!-- Markdown 编辑器 -->
              <n-divider />
              
              <C_Markdown
                v-model="currentArticle.content"
                height="400px"
                :auto-save="true"
                :auto-save-interval="25000"
                placeholder="开始编写知识文章..."
                @change="handleArticleChange"
                @auto-save="handleArticleAutoSave"
              />

              <div class="editor-stats">
                <n-space justify="space-between">
                  <div>
                    <span>字数: {{ currentArticle.wordCount }}</span>
                    <span>预计阅读: {{ Math.ceil(currentArticle.wordCount / 300) }}分钟</span>
                  </div>
                  <div>
                    <span>最后保存: {{ formatDate(currentArticle.updatedAt) }}</span>
                  </div>
                </n-space>
              </div>
            </div>

            <div v-else class="empty-editor">
              <n-empty description="请选择一篇文章开始编辑">
                <template #extra>
                  <n-button @click="createNewArticle" type="primary">
                    创建新文章
                  </n-button>
                </template>
              </n-empty>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup>
const searchKeyword = ref('')
const selectedCategories = ref([])
const currentArticle = ref(null)

const categoryTree = [
  {
    key: 'frontend',
    label: '前端开发',
    children: [
      { key: 'vue', label: 'Vue.js' },
      { key: 'react', label: 'React' },
      { key: 'css', label: 'CSS/Sass' }
    ]
  },
  {
    key: 'backend',
    label: '后端开发',
    children: [
      { key: 'nodejs', label: 'Node.js' },
      { key: 'python', label: 'Python' },
      { key: 'database', label: '数据库' }
    ]
  }
]

const categoryOptions = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' }
]

const articles = ref([
  {
    id: 1,
    title: 'Vue 3 组合式 API 完全指南',
    summary: '深入学习 Vue 3 的组合式 API，掌握现代 Vue 开发最佳实践',
    content: `# Vue 3 组合式 API 完全指南

## 什么是组合式 API？

组合式 API 是 Vue 3 中引入的一套新的 API 设计...

## 基础用法

### ref 和 reactive

\`\`\`javascript
import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({
  user: null,
  loading: false
})
\`\`\``,
    category: 'vue',
    status: 'published',
    author: 'Alice',
    tags: ['Vue', 'JavaScript', 'Frontend'],
    wordCount: 3280,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
])

const filteredArticles = computed(() => {
  let filtered = articles.value

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(keyword) ||
      article.summary.toLowerCase().includes(keyword)
    )
  }

  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(article =>
      selectedCategories.value.includes(article.category)
    )
  }

  return filtered
})

const paginatedArticles = computed(() => {
  return filteredArticles.value.slice(0, 10)
})

const getStatusType = (status) => {
  const types = {
    published: 'success',
    draft: 'warning',
    archived: 'default'
  }
  return types[status] || 'default'
}

const getStatusText = (status) => {
  const texts = {
    published: '已发布',
    draft: '草稿',
    archived: '已归档'
  }
  return texts[status] || status
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN')
}

const handleCategorySelect = (keys) => {
  selectedCategories.value = keys
}

const selectArticle = (article) => {
  currentArticle.value = { ...article }
}

const createNewArticle = () => {
  const newArticle = {
    id: Date.now(),
    title: '新知识文章',
    summary: '请编写文章摘要',
    content: `# 新知识文章

## 概述

在这里分享你的知识和经验...`,
    category: 'vue',
    status: 'draft',
    author: 'Current User',
    tags: [],
    wordCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  articles.value.unshift(newArticle)
  currentArticle.value = { ...newArticle }
  message.success('新文章已创建')
}

const handleArticleChange = (text, html) => {
  if (!currentArticle.value) return
  
  currentArticle.value.wordCount = text.length
  currentArticle.value.updatedAt = new Date()
  
  const articleIndex = articles.value.findIndex(a => a.id === currentArticle.value.id)
  if (articleIndex > -1) {
    articles.value[articleIndex] = { ...currentArticle.value }
  }
}

const handleArticleAutoSave = (text) => {
  if (!currentArticle.value) return
  currentArticle.value.updatedAt = new Date()
  message.info('文章已自动保存')
}

// 初始化选择第一篇文章
onMounted(() => {
  if (articles.value.length > 0) {
    selectArticle(articles.value[0])
  }
})
</script>

<style scoped>
.knowledge-base {
  padding: 24px;
}

.article-list {
  max-height: 600px;
  overflow-y: auto;
}

.article-card {
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.article-card:hover {
  border-color: #d0d0d0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.article-card.active {
  border-color: #1890ff;
  background: #f0f8ff;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.article-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  flex: 1;
  margin-right: 12px;
}

.article-summary {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.article-meta {
  margin-bottom: 12px;
  font-size: 12px;
  color: #999;
}

.article-editor {
  padding: 16px 0;
}

.editor-stats {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
  color: #666;
}

.empty-editor {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
}
</style>
```
:::

## 🛠️ 高级用法

::: details 🎨 自定义工具栏配置 - 个性化编辑体验
```vue 
<template>
  <C_Markdown
    v-model="content"
    :left-toolbar="customLeftToolbar"
    :right-toolbar="customRightToolbar"
    :toolbar="customToolbarConfig"
  />
</template>

<script setup>
const customLeftToolbar = 'undo redo clear | h1 h2 h3 | bold italic strikethrough quote | ul ol table hr | link image code'
const customRightToolbar = 'preview toc sync-scroll fullscreen'
  
const customToolbarConfig = {
  image: {
    title: '插入图片',
    icon: 'v-md-icon-img',
    action: (editor) => {
      // 自定义图片插入逻辑
    }
  },
  customButton: {
    title: '自定义按钮',
    icon: 'v-md-icon-custom',
    action: (editor) => {
      editor.insert(() => ({
        text: '自定义内容',
        replaceSelection: true
      }))
    }
  }
}
</script>
```
:::

::: details 🎭 主题定制 - 自定义编辑器外观
```vue 
<template>
  <div class="custom-markdown-theme">
    <C_Markdown
      v-model="content"
      height="500px"
      class="custom-editor"
    />
  </div>
</template>

<style>
.custom-markdown-theme {
  --md-primary-color: #1890ff;
  --md-bg-color: #ffffff;
  --md-text-color: #333333;
  --md-border-color: #e0e0e0;
  --md-code-bg: #f5f5f5;
}

.custom-editor {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 自定义编辑器样式 */
.custom-editor .v-md-editor {
  background: var(--md-bg-color);
  color: var(--md-text-color);
}

.custom-editor .v-md-editor__toolbar {
  background: var(--md-bg-color);
  border-bottom: 1px solid var(--md-border-color);
}

.custom-editor .v-md-editor__toolbar-item:hover {
  background: var(--md-primary-color);
  color: white;
}
</style>
```
:::

::: details 🔗 插件扩展 - 增强编辑器功能
```vue 
<template>
  <C_Markdown
    v-model="content"
    :plugins="markdownPlugins"
    @plugin-action="handlePluginAction"
  />
</template>

<script setup>
const markdownPlugins = [
  {
    name: 'mermaid',
    component: MermaidPlugin,
    config: {
      theme: 'default'
    }
  },
  {
    name: 'katex',
    component: KatexPlugin,
    config: {
      delimiters: [
        { left: ', right: ', display: true },
        { left: '$', right: '$', display: false }
      ]
    }
  },
  {
    name: 'highlight',
    component: HighlightPlugin,
    config: {
      languages: ['javascript', 'python', 'bash', 'sql']
    }
  }
]

const handlePluginAction = (pluginName, action, data) => {
  console.log(`插件 ${pluginName} 执行了 ${action}`, data)
}
</script>
```
:::

::: details 🤝 协作编辑 - 实时多人编辑功能
```vue
<template>
  <div class="collaborative-editor">
    <div class="collaboration-status">
      <n-space>
        <n-tag v-if="isConnected" type="success">
          已连接
        </n-tag>
        <n-tag v-else type="error">
          已断开
        </n-tag>
        
        <span>在线用户: {{ onlineUsers.length }}</span>
        
        <n-avatar-group :size="24" :max="5">
          <n-avatar
            v-for="user in onlineUsers"
            :key="user.id"
            :src="user.avatar"
            :title="user.name"
          />
        </n-avatar-group>
      </n-space>
    </div>

    <C_Markdown
      v-model="collaborativeContent"
      height="500px"
      :auto-save="false"
      @change="handleCollaborativeChange"
    />
  </div>
</template>

<script setup>
import { useWebSocket } from '@/composables/useWebSocket'

const { 
  isConnected, 
  sendMessage, 
  onMessage 
} = useWebSocket('ws://localhost:3001/collaborate')

const collaborativeContent = ref('')
const onlineUsers = ref([])
const documentId = 'doc_123'

const handleCollaborativeChange = (text, html) => {
  const operation = createOperation(collaborativeContent.value, text)
  
  sendMessage({
    type: 'operation',
    documentId,
    operation,
    userId: currentUser.id
  })
  
  collaborativeContent.value = text
}

onMessage((message) => {
  switch (message.type) {
    case 'operation':
      if (message.userId !== currentUser.id) {
        collaborativeContent.value = applyOperation(
          collaborativeContent.value,
          message.operation
        )
      }
      break
      
    case 'users_update':
      onlineUsers.value = message.users
      break
  }
})
</script>

<style scoped>
.collaborative-editor {
  padding: 20px;
}

.collaboration-status {
  margin-bottom: 16px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 6px;
}
</style>
```
:::

::: details 📚 版本控制 - 文档版本管理系统
```vue 
<template>
  <div class="version-controlled-editor">
    <n-space class="mb-16px">
      <n-button @click="saveVersion" type="primary">
        保存版本
      </n-button>
      <n-button @click="showVersionHistory">
        版本历史
      </n-button>
      <n-button @click="compareVersions">
        对比版本
      </n-button>
    </n-space>

    <C_Markdown
      v-model="versionedContent"
      height="500px"
      :auto-save="true"
      :auto-save-interval="30000"
      @change="handleVersionedChange"
      @auto-save="handleAutoSave"
    />

    <!-- 版本历史模态框 -->
    <n-modal v-model:show="showVersionModal" style="width: 800px;">
      <n-card title="版本历史">
        <n-list>
          <n-list-item
            v-for="version in versions"
            :key="version.id"
          >
            <n-space justify="space-between">
              <div>
                <h4>{{ version.title }}</h4>
                <p>{{ version.description }}</p>
                <small>{{ formatDate(version.createdAt) }}</small>
              </div>
              <n-space>
                <n-button @click="previewVersion(version)">
                  预览
                </n-button>
                <n-button @click="restoreVersion(version)" type="primary">
                  恢复
                </n-button>
              </n-space>
            </n-space>
          </n-list-item>
        </n-list>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
const versionedContent = ref('')
const versions = ref([])
const showVersionModal = ref(false)
const currentVersion = ref(1)

const saveVersion = () => {
  const version = {
    id: Date.now(),
    version: ++currentVersion.value,
    title: `版本 ${currentVersion.value}`,
    description: '手动保存的版本',
    content: versionedContent.value,
    createdAt: new Date(),
    author: 'Current User'
  }
  
  versions.value.unshift(version)
  message.success(`版本 ${version.version} 已保存`)
}

const handleVersionedChange = (text, html) => {
  // 检测重大变更
  const changePercent = calculateChangePercent(
    versions.value[0]?.content || '',
    text
  )
  
  if (changePercent > 50) {
    message.info('检测到重大变更，建议保存版本')
  }
}

const calculateChangePercent = (oldText, newText) => {
  const oldLines = oldText.split('\n')
  const newLines = newText.split('\n')
  
  let changes = 0
  const maxLines = Math.max(oldLines.length, newLines.length)
  
  for (let i = 0; i < maxLines; i++) {
    if (oldLines[i] !== newLines[i]) {
      changes++
    }
  }
  
  return Math.round((changes / maxLines) * 100)
}

const restoreVersion = (version) => {
  dialog.warning({
    title: '确认恢复',
    content: `确定要恢复到版本 ${version.version} 吗？当前未保存的修改将丢失。`,
    positiveText: '恢复',
    negativeText: '取消',
    onPositiveClick: () => {
      versionedContent.value = version.content
      message.success(`已恢复到版本 ${version.version}`)
    }
  })
}
</script>
```
:::

## ⚠️ 注意事项

### 1. 内容长度限制

::: code-group

```vue [✅ 推荐]
<!-- 设置合理的长度限制 -->
<C_Markdown
  v-model="content"
  :max-length="50000"
  @max-length-exceeded="handleMaxLength"
/>

<script setup>
const handleMaxLength = (current, max) => {
  message.warning(`内容长度超出限制：${current}/${max}`)
}
</script>
```

```vue [❌ 不推荐]
<!-- 没有长度限制可能导致性能问题 -->
<C_Markdown v-model="content" />
```

:::

### 2. 图片上传处理

::: code-group

```javascript [✅ 推荐]
// 正确处理图片上传
const handleImageUpload = async (event, insertImage, files) => {
  for (const file of files) {
    try {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        message.error('只能上传图片文件')
        continue
      }
      
      // 验证文件大小
      if (file.size > 5 * 1024 * 1024) {
        message.error('图片大小不能超过5MB')
        continue
      }
      
      // 上传到服务器
      const url = await uploadToServer(file)
      insertImage({ url, desc: file.name })
      
    } catch (error) {
      message.error(`上传失败: ${error.message}`)
    }
  }
}
```

```javascript [❌ 不推荐]
// 直接使用 base64 可能导致内容过大
const handleImageUpload = (event, insertImage, files) => {
  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = e => {
      insertImage({ url: e.target.result }) // base64 可能很大
    }
    reader.readAsDataURL(file)
  })
}
```

:::

### 3. 自动保存配置

::: code-group

```vue [✅ 推荐]
<!-- 合理的自动保存间隔 -->
<C_Markdown
  v-model="content"
  :auto-save="true"
  :auto-save-interval="30000"  <!-- 30秒，不要太频繁 -->
  @auto-save="handleAutoSave"
/>
```

```vue [❌ 不推荐]
<!-- 过于频繁的自动保存 -->
<C_Markdown
  v-model="content"
  :auto-save="true"
  :auto-save-interval="1000"  <!-- 1秒，太频繁 -->
/>
```

:::

## 🐛 故障排除

### 常见问题

::: details ❓ Q1: 编辑器不显示或样式异常？
**A1:** 检查 CSS 依赖是否正确加载：

```javascript
// 确保在 main.js 中引入了必要的样式
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// 检查是否有 CSS 冲突
// 在浏览器开发者工具中查看元素样式
```
:::

::: details ❓ Q2: 图片上传功能不工作？
**A2:** 检查上传配置和事件处理：

```vue
<C_Markdown
  v-model="content"
  :upload-image-config="{ accept: 'image/*', multiple: true }"
  @upload-image="handleUpload"
/>

<script setup>
const handleUpload = (event, insertImage, files) => {
  console.log('上传事件触发:', files.length)
  // 确保处理函数被正确调用
}
</script>
```
:::

::: details ❓ Q3: 自动保存不生效？
**A3:** 检查自动保存配置：

```vue
<C_Markdown
  v-model="content"
  :auto-save="true"                    <!-- 确保开启 -->
  :auto-save-interval="30000"          <!-- 设置间隔 -->
  @auto-save="handleAutoSave"          <!-- 监听事件 -->
/>

<script setup>
const handleAutoSave = (text) => {
  console.log('自动保存触发:', text.length)
  // 确保事件处理函数被调用
}
</script>
```
:::

::: details ❓ Q4: 字数统计不准确？
**A4:** 检查字数统计逻辑：

```javascript
// 字数统计可能包含 Markdown 语法字符
const getActualWordCount = (markdown) => {
  // 移除 Markdown 语法后计算
  const plainText = markdown
    .replace(/[#*`_~\[\]()]/g, '')  // 移除语法字符
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
    .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
    .trim()
  
  return plainText.length
}
```
:::

## 🎯 最佳实践

### 1. 内容管理策略

```javascript 
// ✅ 推荐：结构化的内容管理
class MarkdownContentManager {
  constructor() {
    this.content = ref('')
    this.metadata = reactive({
      title: '',
      author: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      category: ''
    })
    this.statistics = reactive({
      wordCount: 0,
      characterCount: 0,
      readingTime: 0
    })
  }

  updateContent(newContent) {
    this.content.value = newContent
    this.metadata.updatedAt = new Date()
    this.updateStatistics(newContent)
  }

  updateStatistics(content) {
    this.statistics.characterCount = content.length
    this.statistics.wordCount = this.countWords(content)
    this.statistics.readingTime = Math.ceil(this.statistics.wordCount / 200)
  }

  exportMetadata() {
    return {
      ...this.metadata,
      ...this.statistics,
      content: this.content.value
    }
  }
}
```

### 2. 性能优化策略

```vue 
<template>
  <!-- 使用防抖优化频繁变更 -->
  <C_Markdown
    v-model="content"
    @change="debouncedHandleChange"
    @word-count-change="debouncedWordCountChange"
  />
</template>

<script setup>
import { debounce } from 'lodash-es'

// 防抖处理内容变更
const debouncedHandleChange = debounce((text, html) => {
  handleContentChange(text, html)
}, 500)

// 使用 shallowRef 优化大内容
const content = shallowRef('')

// 分片处理大型文档
const processLargeContent = (content) => {
  const chunkSize = 10000
  const chunks = []
  
  for (let i = 0; i < content.length; i += chunkSize) {
    chunks.push(content.slice(i, i + chunkSize))
  }
  
  return chunks
}
</script>
```

### 3. 数据持久化最佳实践

```javascript 
// 文档持久化管理器
class DocumentPersistenceManager {
  constructor(documentId) {
    this.documentId = documentId
    this.autoSaveTimer = null
    this.pendingChanges = false
  }

  async saveDocument(content, metadata) {
    try {
      const saveData = {
        id: this.documentId,
        content,
        metadata,
        version: this.incrementVersion(),
        savedAt: new Date().toISOString()
      }

      // 保存到服务器
      await this.saveToServer(saveData)
      
      // 备份到本地存储
      this.saveToLocal(saveData)
      
      this.pendingChanges = false
      return true
      
    } catch (error) {
      console.error('保存失败:', error)
      
      // 降级到本地存储
      this.saveToLocal({ content, metadata, error: error.message })
      throw error
    }
  }

  startAutoSave(content, metadata, interval = 30000) {
    this.stopAutoSave()
    
    this.autoSaveTimer = setInterval(async () => {
      if (this.pendingChanges) {
        try {
          await this.saveDocument(content.value, metadata)
          console.log('自动保存成功')
        } catch (error) {
          console.warn('自动保存失败:', error)
        }
      }
    }, interval)
  }

  async saveToServer(data) {
    const response = await fetch(`/api/documents/${this.documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`服务器保存失败: ${response.statusText}`)
    }

    return response.json()
  }

  saveToLocal(data) {
    try {
      localStorage.setItem(
        `document_${this.documentId}`,
        JSON.stringify(data)
      )
    } catch (error) {
      console.warn('本地存储失败:', error)
    }
  }

  markChanged() {
    this.pendingChanges = true
  }

  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer)
      this.autoSaveTimer = null
    }
  }
}

// 使用示例
const persistenceManager = new DocumentPersistenceManager('doc_123')

const handleContentChange = (text, html) => {
  persistenceManager.markChanged()
}

onMounted(() => {
  persistenceManager.startAutoSave(content, metadata, 30000)
})

onUnmounted(() => {
  persistenceManager.stopAutoSave()
})
```

### 4. 错误处理和用户体验

```vue 
<script setup>
const editorState = reactive({
  content: '',
  loading: false,
  error: null,
  saving: false,
  lastSaved: null
})

// 统一错误处理
const handleError = (error, context = '') => {
  console.error(`${context}错误:`, error)
  
  editorState.error = error.message
  
  // 根据错误类型给出不同提示
  if (error.name === 'NetworkError') {
    message.error('网络连接失败，请检查网络设置')
  } else if (error.name === 'ValidationError') {
    message.warning('内容格式有误，请检查后重试')
  } else {
    message.error('操作失败，请稍后重试')
  }
}

// 带重试机制的保存
const saveWithRetry = async (content, maxRetries = 3) => {
  let retries = 0
  
  while (retries < maxRetries) {
    try {
      editorState.saving = true
      await saveDocument(content)
      editorState.lastSaved = new Date()
      editorState.error = null
      return true
      
    } catch (error) {
      retries++
      
      if (retries >= maxRetries) {
        handleError(error, '保存')
        return false
      }
      
      // 指数退避重试
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, retries) * 1000)
      )
    } finally {
      editorState.saving = false
    }
  }
}

// 优雅的降级处理
const handleContentChange = async (text, html) => {
  try {
    // 尝试正常处理
    await processContentChange(text, html)
    
  } catch (error) {
    // 降级到基础功能
    console.warn('高级功能失败，使用基础模式:', error)
    
    // 至少保证基本的内容更新
    editorState.content = text
    
    // 提示用户
    message.warning('部分功能暂时不可用，但内容已保存')
  }
}
</script>
```

## 📝 更新日志

### v1.0.0 (2025-07-19)

- ✨ 基于 v-md-editor 的完整组件封装
- ✨ 支持编辑、可编辑、预览三种模式
- ✨ 内置图片上传和文件处理功能
- ✨ 智能字数统计和长度限制
- ✨ 自动保存和手动保存支持
- ✨ 自定义工具栏配置
- ✨ 全屏编辑模式
- ✨ 目录导航和语法高亮
- ✨ 完整的TypeScript类型定义
- ✨ 丰富的事件系统和回调支持

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个 Markdown 编辑器组件基于强大的 `v-md-editor` 库构建，提供了完整的内容创作和编辑功能。支持多种编辑模式、实时预览、图片上传、自动保存等特性，适用于博客文章、技术文档、知识库等各种内容创作场景。无论是简单的文本编辑还是复杂的协作创作，都能提供专业级的编辑体验。结合 TypeScript 支持和高度可定制的配置，让内容创作既高效又愉悦。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更优雅的内容创作体验！ ✍️