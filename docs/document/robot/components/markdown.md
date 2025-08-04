---
outline: 'deep'
---



# C_Markdown 编辑器组件

> ✍️ 基于 v-md-editor 的强大 Markdown 编辑器组件，让内容创作变得简单而优雅

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

```bash
# 安装 v-md-editor 依赖
npm install @kangc/v-md-editor
# 或者
bun add @kangc/v-md-editor
```

## 🎯 快速开始

### 基础用法

```vue
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

### 表单集成示例

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

      <n-form-item label="文章摘要" path="summary">
        <n-input
          v-model:value="articleForm.summary"
          type="textarea"
          placeholder="请输入文章摘要"
          :rows="3"
          :maxlength="200"
          show-count
        />
      </n-form-item>

      <n-form-item label="文章分类" path="category">
        <n-select
          v-model:value="articleForm.category"
          :options="categoryOptions"
          placeholder="请选择文章分类"
        />
      </n-form-item>

      <n-form-item label="文章标签" path="tags">
        <n-dynamic-tags v-model:value="articleForm.tags" />
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
            @max-length-exceeded="handleMaxLengthExceeded"
            @auto-save="handleAutoSave"
          />
          
          <div class="editor-stats">
            <n-space>
              <n-tag type="info" size="small">
                字数: {{ wordCount }} / 20000
              </n-tag>
              <n-tag 
                :type="wordCount > 18000 ? 'warning' : 'success'" 
                size="small"
              >
                {{ wordCount > 18000 ? '接近上限' : '字数正常' }}
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
          <n-button @click="previewArticle">
            预览文章
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
  const articleForm = reactive({
    title: '',
    summary: '',
    category: '',
    tags: [],
    content: ''
  })

  const categoryOptions = [
    { label: '技术分享', value: 'tech' },
    { label: '生活感悟', value: 'life' },
    { label: '产品设计', value: 'design' },
    { label: '行业观察', value: 'industry' }
  ]

  const formRules = {
    title: [
      { required: true, message: '请输入文章标题', trigger: 'blur' },
      { min: 5, max: 100, message: '标题长度为 5 到 100 个字符', trigger: 'blur' }
    ],
    summary: [
      { required: true, message: '请输入文章摘要', trigger: 'blur' },
      { max: 200, message: '摘要不能超过 200 个字符', trigger: 'blur' }
    ],
    category: [
      { required: true, message: '请选择文章分类', trigger: 'change' }
    ],
    content: [
      { required: true, message: '请输入文章内容', trigger: 'blur' },
      { min: 100, message: '文章内容不能少于 100 个字符', trigger: 'blur' }
    ]
  }

  const wordCount = ref(0)
  const lastAutoSaveTime = ref('')
  const submitting = ref(false)
  const savingDraft = ref(false)

  const handleContentChange = (text, html) => {
    // 实时内容变化处理
    console.log('内容变化:', { textLength: text.length, htmlLength: html.length })
  }

  const handleContentSave = (text, html) => {
    message.success('内容已手动保存')
    console.log('手动保存:', { text, html })
  }

  const handleImageUpload = (event, insertImage, files) => {
    // 模拟图片上传
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        insertImage({
          url: e.target.result,
          desc: file.name,
          width: 'auto',
          height: 'auto'
        })
      }
      reader.readAsDataURL(file)
    })
    
    message.success(`成功上传 ${files.length} 张图片`)
  }

  const handleWordCountChange = (count) => {
    wordCount.value = count
  }

  const handleMaxLengthExceeded = (currentLength, maxLength) => {
    message.error(`内容长度超出限制！当前 ${currentLength} 字符，最大 ${maxLength} 字符`)
  }

  const handleAutoSave = (text) => {
    lastAutoSaveTime.value = new Date().toLocaleTimeString()
    message.info('内容已自动保存')
    console.log('自动保存:', text.length, '个字符')
  }

  const submitArticle = async () => {
    try {
      await formRef.value?.validate()
      submitting.value = true
      
      // 模拟发布流程
      setTimeout(() => {
        submitting.value = false
        message.success('文章发布成功！')
      }, 2000)
    } catch (error) {
      message.error('请完善表单信息')
    }
  }

  const saveAsDraft = async () => {
    savingDraft.value = true
    
    // 模拟保存草稿
    setTimeout(() => {
      savingDraft.value = false
      message.success('草稿保存成功！')
    }, 1000)
  }

  const previewArticle = () => {
    if (!articleForm.content.trim()) {
      message.warning('请先输入文章内容')
      return
    }
    
    // 打开预览模态框
    showPreviewModal.value = true
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
| **tocNavPosition** | `'left' \| 'right'` | `'right'` | 目录导航位置 |
| **defaultFullscreen** | `boolean` | `false` | 是否默认全屏 |
| **autofocus** | `boolean` | `false` | 是否自动聚焦 |
| **includeLevel** | `number[]` | `[1,2,3,4,5,6]` | 目录包含的标题级别 |
| **leftToolbar** | `string` | `'undo redo clear \| h bold italic...'` | 左侧工具栏配置 |
| **rightToolbar** | `string` | `'preview toc sync-scroll fullscreen'` | 右侧工具栏配置 |
| **maxLength** | `number` | `50000` | 最大字符数限制 |
| **showWordCount** | `boolean` | `true` | 是否显示字数统计 |
| **autoSave** | `boolean` | `false` | 是否启用自动保存 |
| **autoSaveInterval** | `number` | `30000` | 自动保存间隔（毫秒） |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| **update:modelValue** | `(value: string)` | 内容更新时触发 |
| **change** | `(text: string, html: string)` | 内容变化时触发 |
| **save** | `(text: string, html: string)` | 手动保存时触发 |
| **upload-image** | `(event: Event, insertImage: Function, files: FileList)` | 上传图片时触发 |
| **fullscreen-change** | `(isFullscreen: boolean)` | 全屏状态切换时触发 |
| **copy-code-success** | `(text: string)` | 复制代码成功时触发 |
| **word-count-change** | `(count: number)` | 字数变化时触发 |
| **auto-save** | `(text: string)` | 自动保存时触发 |
| **max-length-exceeded** | `(currentLength: number, maxLength: number)` | 超出最大长度时触发 |

### 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| **focus** | `-` | `void` | 聚焦到编辑器 |
| **getHtml** | `-` | `string` | 获取 HTML 内容 |
| **insertText** | `(text: string)` | `void` | 在当前位置插入文本 |
| **wordCount** | `-` | `ComputedRef<number>` | 获取当前字数 |

### 模式说明

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| **edit** | 编辑模式 | 传统的编辑和预览分离模式 |
| **editable** | 可编辑模式 | 实时渲染，所见即所得 |
| **preview** | 预览模式 | 只读显示，用于内容展示 |

## 🎨 使用示例

### 场景 1: 博客文章编辑系统

```vue
<template>
  <div class="blog-editor">
    <n-card title="文章编辑器" style="margin-bottom: 16px;">
      <template #header-extra>
        <n-space>
          <n-button @click="loadTemplate" type="primary" size="small">
            加载模板
          </n-button>
          <n-button @click="exportMarkdown" size="small">
            导出 Markdown
          </n-button>
          <n-button @click="importMarkdown" size="small">
            导入文档
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

              <n-form-item label="作者信息">
                <n-input
                  v-model:value="articleInfo.author"
                  placeholder="请输入作者姓名"
                />
              </n-form-item>

              <n-form-item label="发布设置">
                <n-space vertical>
                  <n-radio-group v-model:value="articleInfo.status">
                    <n-radio value="draft">草稿</n-radio>
                    <n-radio value="published">发布</n-radio>
                    <n-radio value="scheduled">定时发布</n-radio>
                  </n-radio-group>
                  
                  <n-date-picker
                    v-if="articleInfo.status === 'scheduled'"
                    v-model:value="articleInfo.publishTime"
                    type="datetime"
                    placeholder="选择发布时间"
                  />
                </n-space>
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
                <n-statistic label="单词数" :value="editorStats.words" />
              </n-grid-item>
              <n-grid-item>
                <n-statistic label="段落数" :value="editorStats.paragraphs" />
              </n-grid-item>
              <n-grid-item>
                <n-statistic label="预计阅读" :value="`${editorStats.readingTime}分钟`" />
              </n-grid-item>
            </n-grid>

            <n-divider />

            <div class="edit-history">
              <h4>编辑历史</h4>
              <n-timeline>
                <n-timeline-item
                  v-for="(record, index) in editHistory"
                  :key="index"
                  :type="record.type"
                  :title="record.action"
                  :content="record.time"
                />
              </n-timeline>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-card>

    <!-- Markdown 编辑器 -->
    <n-card title="内容编辑">
      <template #header-extra>
        <n-space>
          <n-tag v-if="isAutoSaving" type="warning" size="small">
            正在保存...
          </n-tag>
          <n-tag v-else-if="lastSaveTime" type="success" size="small">
            {{ lastSaveTime }}
          </n-tag>
          <n-button @click="toggleMode" size="small">
            {{ modeLabels[editorMode] }}
          </n-button>
        </n-space>
      </template>

      <C_Markdown
        ref="editorRef"
        v-model="articleContent"
        :mode="editorMode"
        height="600px"
        :auto-save="true"
        :auto-save-interval="15000"
        :max-length="50000"
        placeholder="开始创作你的精彩文章..."
        @change="handleContentChange"
        @save="handleManualSave"
        @auto-save="handleAutoSave"
        @upload-image="handleImageUpload"
        @word-count-change="handleWordCountChange"
        @fullscreen-change="handleFullscreenChange"
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
          <n-button @click="resetArticle" type="warning">
            重置
          </n-button>
          <n-button @click="publishArticle" type="primary" :loading="publishing">
            {{ articleInfo.status === 'scheduled' ? '定时发布' : '立即发布' }}
          </n-button>
        </n-space>
      </n-space>
    </n-card>

    <!-- 预览模态框 -->
    <n-modal v-model:show="showPreview" preset="card" style="width: 90%; max-width: 1200px;">
      <template #header>
        <span>📖 文章预览</span>
      </template>

      <div class="article-preview">
        <header class="preview-header">
          <h1>{{ articleInfo.title || '未命名文章' }}</h1>
          <div class="preview-meta">
            <n-space>
              <span>作者: {{ articleInfo.author || '匿名' }}</span>
              <span>分类: {{ getCategoryLabel(articleInfo.category) }}</span>
              <span>发布时间: {{ new Date().toLocaleDateString() }}</span>
            </n-space>
          </div>
          <div class="preview-tags">
            <n-tag
              v-for="tag in articleInfo.tags"
              :key="tag"
              size="small"
              style="margin-right: 8px;"
            >
              {{ tag }}
            </n-tag>
          </div>
        </header>

        <main class="preview-content">
          <C_Markdown
            :model-value="articleContent"
            mode="preview"
            height="auto"
          />
        </main>

        <footer class="preview-footer">
          <n-space justify="space-between">
            <div class="article-stats">
              <n-space>
                <span>字数: {{ editorStats.characters }}</span>
                <span>预计阅读: {{ editorStats.readingTime }}分钟</span>
              </n-space>
            </div>
            <div class="article-actions">
              <n-space>
                <n-button @click="shareArticle">分享</n-button>
                <n-button @click="exportArticle">导出</n-button>
              </n-space>
            </div>
          </n-space>
        </footer>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
  const message = useMessage()
  const dialog = useDialog()

  const editorRef = ref()
  const editorMode = ref('editable')
  const showPreview = ref(false)
  const isAutoSaving = ref(false)
  const lastSaveTime = ref('')
  const savingDraft = ref(false)
  const publishing = ref(false)

  const modeLabels = {
    edit: '编辑模式',
    editable: '实时模式',
    preview: '预览模式'
  }

  const articleInfo = reactive({
    title: '',
    author: '',
    status: 'draft',
    publishTime: null,
    category: '',
    tags: []
  })

  const categoryOptions = [
    { label: '前端开发', value: 'frontend' },
    { label: '后端开发', value: 'backend' },
    { label: '移动开发', value: 'mobile' },
    { label: '人工智能', value: 'ai' },
    { label: '产品设计', value: 'design' },
    { label: '项目管理', value: 'management' }
  ]

  const articleContent = ref(`# 文章标题

## 概述

在这里开始你的创作...

## 主要内容

### 第一部分

内容详情...

### 第二部分

更多内容...

## 总结

文章总结...

---

> 感谢阅读！如果这篇文章对你有帮助，请点赞和分享。`)

  const editorStats = reactive({
    characters: 0,
    words: 0,
    paragraphs: 0,
    readingTime: 0
  })

  const editHistory = ref([
    { action: '创建文档', time: '刚刚', type: 'success' },
    { action: '添加标题', time: '1分钟前', type: 'info' },
    { action: '编辑内容', time: '2分钟前', type: 'info' }
  ])

  const calculateStats = (text) => {
    editorStats.characters = text.length
    editorStats.words = text.split(/\s+/).filter(word => word.length > 0).length
    editorStats.paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    editorStats.readingTime = Math.ceil(editorStats.words / 200) // 假设每分钟阅读200字
  }

  const handleContentChange = (text, html) => {
    calculateStats(text)
    
    // 记录编辑历史
    editHistory.value.unshift({
      action: '内容修改',
      time: '刚刚',
      type: 'info'
    })
    
    // 限制历史记录数量
    if (editHistory.value.length > 10) {
      editHistory.value.pop()
    }
  }

  const handleWordCountChange = (count) => {
    editorStats.characters = count
  }

  const handleAutoSave = (text) => {
    isAutoSaving.value = true
    
    // 模拟自动保存
    setTimeout(() => {
      isAutoSaving.value = false
      lastSaveTime.value = `自动保存于 ${new Date().toLocaleTimeString()}`
      
      editHistory.value.unshift({
        action: '自动保存',
        time: '刚刚',
        type: 'success'
      })
    }, 1000)
  }

  const handleManualSave = (text, html) => {
    lastSaveTime.value = `手动保存于 ${new Date().toLocaleTimeString()}`
    message.success('内容已保存')
    
    editHistory.value.unshift({
      action: '手动保存',
      time: '刚刚',
      type: 'success'
    })
  }

  const handleImageUpload = (event, insertImage, files) => {
    Array.from(files).forEach(file => {
      // 模拟上传到云存储
      const formData = new FormData()
      formData.append('image', file)
      
      // 这里应该是实际的上传逻辑
      const reader = new FileReader()
      reader.onload = (e) => {
        insertImage({
          url: e.target.result,
          desc: file.name,
          width: 'auto',
          height: 'auto'
        })
      }
      reader.readAsDataURL(file)
    })
    
    message.success(`上传 ${files.length} 张图片`)
    
    editHistory.value.unshift({
      action: `上传图片 ${files.length} 张`,
      time: '刚刚',
      type: 'success'
    })
  }

  const handleFullscreenChange = (isFullscreen) => {
    message.info(`${isFullscreen ? '进入' : '退出'}全屏模式`)
  }

  const toggleMode = () => {
    const modes = ['edit', 'editable', 'preview']
    const currentIndex = modes.indexOf(editorMode.value)
    editorMode.value = modes[(currentIndex + 1) % modes.length]
  }

  const loadTemplate = () => {
    const templates = {
      tech: `# 技术分享：[技术名称]

## 背景介绍

为什么选择这个技术...

## 核心特性

### 特性一
- 优点
- 缺点

### 特性二
- 应用场景

## 实践案例

\`\`\`javascript
// 代码示例
\`\`\`

## 总结

技术总结...`,
      
      tutorial: `# 教程：[教程标题]

## 前置条件

在开始之前，你需要：
- 条件一
- 条件二

## 步骤详解

### 步骤一：环境搭建

详细说明...

### 步骤二：核心实现

代码实现...

### 步骤三：测试验证

测试方法...

## 常见问题

Q: 问题一？
A: 解答一

## 参考资源

- [链接一](url)
- [链接二](url)`
    }

    dialog.info({
      title: '选择模板',
      content: '请选择要加载的模板类型',
      action: () => [
        h(NButton, { 
          onClick: () => {
            articleContent.value = templates.tech
            message.success('技术分享模板已加载')
          }
        }, '技术分享'),
        h(NButton, { 
          onClick: () => {
            articleContent.value = templates.tutorial
            message.success('教程模板已加载')
          }
        }, '教程指南')
      ]
    })
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

  const importMarkdown = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.markdown,.txt'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        articleContent.value = e.target.result
        message.success('文档导入成功')
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const getCategoryLabel = (value) => {
    return categoryOptions.find(opt => opt.value === value)?.label || '未分类'
  }

  const previewArticle = () => {
    if (!articleContent.value.trim()) {
      message.warning('请先编写文章内容')
      return
    }
    showPreview.value = true
  }

  const saveDraft = async () => {
    savingDraft.value = true
    
    // 模拟保存草稿
    setTimeout(() => {
      savingDraft.value = false
      articleInfo.status = 'draft'
      message.success('草稿保存成功')
      
      editHistory.value.unshift({
        action: '保存草稿',
        time: '刚刚',
        type: 'success'
      })
    }, 1500)
  }

  const publishArticle = async () => {
    if (!articleInfo.title.trim()) {
      message.error('请输入文章标题')
      return
    }
    
    if (!articleContent.value.trim()) {
      message.error('请编写文章内容')
      return
    }

    publishing.value = true
    
    // 模拟发布流程
    setTimeout(() => {
      publishing.value = false
      articleInfo.status = 'published'
      message.success('文章发布成功！')
      
      editHistory.value.unshift({
        action: '发布文章',
        time: '刚刚',
        type: 'success'
      })
    }, 2000)
  }

  const resetArticle = () => {
    dialog.warning({
      title: '确认重置',
      content: '确定要重置所有内容吗？此操作不可恢复。',
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick: () => {
        Object.assign(articleInfo, {
          title: '',
          author: '',
          status: 'draft',
          publishTime: null,
          category: '',
          tags: []
        })
        articleContent.value = ''
        message.success('内容已重置')
      }
    })
  }

  const shareArticle = () => {
    const shareData = {
      title: articleInfo.title,
      text: `查看文章：${articleInfo.title}`,
      url: window.location.href
    }
    
    if (navigator.share) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(shareData.url)
      message.success('文章链接已复制到剪贴板')
    }
  }

  const exportArticle = () => {
    const content = `# ${articleInfo.title}

**作者**: ${articleInfo.author}
**分类**: ${getCategoryLabel(articleInfo.category)}
**标签**: ${articleInfo.tags.join(', ')}
**发布时间**: ${new Date().toLocaleDateString()}

---

${articleContent.value}`

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${articleInfo.title || 'article'}_complete.md`
    a.click()
    URL.revokeObjectURL(url)
    message.success('完整文章已导出')
  }

  // 初始化统计
  onMounted(() => {
    calculateStats(articleContent.value)
  })
</script>

<style scoped>
  .blog-editor {
    padding: 24px;
  }

  .edit-history h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #333;
  }

  .article-preview {
    padding: 24px;
  }

  .preview-header {
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e0e0e0;
  }

  .preview-header h1 {
    margin: 0 0 12px 0;
    font-size: 28px;
    color: #333;
  }

  .preview-meta {
    margin-bottom: 12px;
    color: #666;
    font-size: 14px;
  }

  .preview-tags {
    margin-bottom: 16px;
  }

  .preview-content {
    min-height: 400px;
    margin-bottom: 32px;
  }

  .preview-footer {
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
    font-size: 14px;
    color: #666;
  }
</style>
```

### 场景 2: 文档管理系统

```vue
<template>
  <div class="document-manager">
    <n-card title="文档管理系统" style="margin-bottom: 16px;">
      <template #header-extra>
        <n-space>
          <n-button @click="createNewDocument" type="primary">
            新建文档
          </n-button>
          <n-button @click="importDocument">
            导入文档
          </n-button>
        </n-space>
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
                <div class="doc-actions">
                  <n-dropdown :options="getDocMenuOptions(doc)" @select="handleDocAction">
                    <n-button size="tiny" quaternary>
                      <template #icon>
                        <div class="i-mdi:dots-vertical"></div>
                      </template>
                    </n-button>
                  </n-dropdown>
                </div>
              </div>
            </div>
          </n-card>
        </n-grid-item>

        <!-- 编辑器 -->
        <n-grid-item span="2">
          <n-card size="small">
            <template #header>
              <div class="editor-header">
                <n-input
                  v-if="currentDocument"
                  v-model:value="currentDocument.title"
                  placeholder="文档标题"
                  style="font-weight: 600;"
                  @blur="updateDocumentTitle"
                />
                <span v-else>请选择或创建文档</span>
              </div>
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
                @upload-image="handleImgPreviewUpload"
              />

              <div class="editor-footer">
                <n-space justify="space-between">
                  <div class="document-stats">
                    <n-space>
                      <span>字数: {{ currentDocument.wordCount }}</span>
                      <span>最后修改: {{ formatDate(currentDocument.updatedAt) }}</span>
                      <span>版本: v{{ currentDocument.version }}</span>
                    </n-space>
                  </div>
                  
                  <div class="document-actions">
                    <n-space>
                      <n-button @click="showVersionHistory" size="small">
                        版本历史
                      </n-button>
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

    <!-- 版本历史模态框 -->
    <n-modal v-model:show="showVersionModal" preset="dialog" style="width: 800px;">
      <template #header>
        <span>版本历史 - {{ currentDocument?.title }}</span>
      </template>

      <div class="version-history">
        <n-timeline>
          <n-timeline-item
            v-for="version in documentVersions"
            :key="version.id"
            :type="version.type"
          >
            <template #header>
              <div class="version-header">
                <span class="version-title">{{ version.title }}</span>
                <n-space>
                  <n-tag size="small">v{{ version.version }}</n-tag>
                  <span class="version-time">{{ formatDate(version.createdAt) }}</span>
                </n-space>
              </div>
            </template>
            
            <div class="version-content">
              <p>{{ version.description }}</p>
              <div class="version-stats">
                <n-space>
                  <span>字数: {{ version.wordCount }}</span>
                  <span>修改者: {{ version.author }}</span>
                </n-space>
              </div>
              <div class="version-actions">
                <n-space>
                  <n-button @click="previewVersion(version)" size="small">
                    预览
                  </n-button>
                  <n-button @click="restoreVersion(version)" size="small" type="primary">
                    恢复此版本
                  </n-button>
                </n-space>
              </div>
            </div>
          </n-timeline-item>
        </n-timeline>
      </div>
    </n-modal>

    <!-- 分享模态框 -->
    <n-modal v-model:show="showShareModal" preset="dialog" style="width: 600px;">
      <template #header>
        <span>分享文档 - {{ currentDocument?.title }}</span>
      </template>

      <div class="share-options">
        <n-space vertical size="large">
          <div class="share-section">
            <h4>分享链接</h4>
            <n-input-group>
              <n-input v-model:value="shareLink" readonly />
              <n-button @click="copyShareLink" type="primary">
                复制链接
              </n-button>
            </n-input-group>
          </div>

          <div class="share-section">
            <h4>权限设置</h4>
            <n-radio-group v-model:value="sharePermission">
              <n-space vertical>
                <n-radio value="read">只读权限</n-radio>
                <n-radio value="comment">评论权限</n-radio>
                <n-radio value="edit">编辑权限</n-radio>
              </n-space>
            </n-radio-group>
          </div>

          <div class="share-section">
            <h4>邀请协作者</h4>
            <n-space>
              <n-input v-model:value="inviteEmail" placeholder="输入邮箱地址" />
              <n-button @click="sendInvitation" type="primary">
                发送邀请
              </n-button>
            </n-space>
          </div>
        </n-space>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
  const message = useMessage()
  const dialog = useDialog()

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
- 个人资料

### 内容管理
- 文档创建
- 版本控制
- 协作编辑

## 技术要求

### 前端技术栈
- Vue 3
- TypeScript
- Naive UI

### 后端技术栈
- Node.js
- MongoDB
- Redis`,
      status: 'published',
      wordCount: 156,
      version: 2,
      author: 'Alice',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: 'API 接口文档',
      summary: '系统 API 接口详细说明',
      content: `# API 接口文档

## 认证接口

### POST /auth/login
用户登录接口

**请求参数:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**响应数据:**
\`\`\`json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "用户名",
    "email": "user@example.com"
  }
}
\`\`\`

## 用户接口

### GET /users
获取用户列表

### POST /users
创建新用户

### PUT /users/:id
更新用户信息

### DELETE /users/:id
删除用户`,
      status: 'draft',
      wordCount: 98,
      version: 1,
      author: 'Bob',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ])

  const currentDocument = ref(null)
  const saving = ref(false)
  const showVersionModal = ref(false)
  const showShareModal = ref(false)
  const shareLink = ref('')
  const sharePermission = ref('read')
  const inviteEmail = ref('')

  const documentVersions = ref([
    {
      id: 1,
      version: 2,
      title: '添加新功能模块',
      description: '增加了用户权限管理和内容协作功能',
      wordCount: 156,
      author: 'Alice',
      type: 'success',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      version: 1,
      title: '初始版本',
      description: '创建了基础的产品需求文档结构',
      wordCount: 89,
      author: 'Alice',
      type: 'info',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  ])

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
    return new Date(date).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const selectDocument = (doc) => {
    if (currentDocument.value?.id === doc.id) return
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
      version: 1,
      author: 'Current User',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    documents.value.unshift(newDoc)
    currentDocument.value = { ...newDoc }
    message.success('新文档已创建')
  }

  const updateDocumentTitle = () => {
    if (!currentDocument.value) return
    
    const docIndex = documents.value.findIndex(d => d.id === currentDocument.value.id)
    if (docIndex > -1) {
      documents.value[docIndex].title = currentDocument.value.title
      documents.value[docIndex].updatedAt = new Date()
    }
  }

  const handleDocumentChange = (text, html) => {
    if (!currentDocument.value) return
    
    currentDocument.value.updatedAt = new Date()
    
    // 更新文档列表中的对应项
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

  const handleDocumentAutoSave = (text) => {
    if (!currentDocument.value) return
    
    currentDocument.value.updatedAt = new Date()
    message.info('文档已自动保存')
  }

  const handleImgPreviewUpload = (event, insertImage, files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        insertImage({
          url: e.target.result,
          desc: file.name,
          width: 'auto',
          height: 'auto'
        })
      }
      reader.readAsDataURL(file)
    })
    
    message.success(`上传 ${files.length} 张图片`)
  }

  const saveDocument = async () => {
    if (!currentDocument.value) return
    
    saving.value = true
    
    // 模拟保存
    setTimeout(() => {
      saving.value = false
      currentDocument.value.updatedAt = new Date()
      currentDocument.value.version += 1
      
      // 更新文档列表
      const docIndex = documents.value.findIndex(d => d.id === currentDocument.value.id)
      if (docIndex > -1) {
        documents.value[docIndex] = { ...currentDocument.value }
      }
      
      message.success('文档保存成功')
    }, 1000)
  }

  const getDocMenuOptions = (doc) => {
    return [
      { label: '重命名', key: 'rename', doc },
      { label: '复制', key: 'duplicate', doc },
      { label: '导出', key: 'export', doc },
      { type: 'divider' },
      { label: '删除', key: 'delete', doc }
    ]
  }

  const handleDocAction = (key, option) => {
    const doc = option.doc
    
    switch (key) {
      case 'rename':
        // 重命名逻辑
        break
      case 'duplicate':
        const duplicated = {
          ...doc,
          id: Date.now(),
          title: `${doc.title} (副本)`,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        documents.value.push(duplicated)
        message.success('文档已复制')
        break
      case 'export':
        exportSingleDocument(doc)
        break
      case 'delete':
        dialog.warning({
          title: '确认删除',
          content: `确定要删除文档 "${doc.title}" 吗？`,
          positiveText: '删除',
          negativeText: '取消',
          onPositiveClick: () => {
            const index = documents.value.findIndex(d => d.id === doc.id)
            if (index > -1) {
              documents.value.splice(index, 1)
              if (currentDocument.value?.id === doc.id) {
                currentDocument.value = null
              }
              message.success('文档已删除')
            }
          }
        })
        break
    }
  }

  const showVersionHistory = () => {
    if (!currentDocument.value) return
    showVersionModal.value = true
  }

  const previewVersion = (version) => {
    message.info(`预览版本 v${version.version}`)
  }

  const restoreVersion = (version) => {
    dialog.info({
      title: '确认恢复',
      content: `确定要恢复到版本 v${version.version} 吗？当前未保存的修改将丢失。`,
      positiveText: '恢复',
      negativeText: '取消',
      onPositiveClick: () => {
        // 恢复版本逻辑
        message.success(`已恢复到版本 v${version.version}`)
        showVersionModal.value = false
      }
    })
  }

  const shareDocument = () => {
    if (!currentDocument.value) return
    
    shareLink.value = `https://docs.example.com/share/${currentDocument.value.id}`
    showShareModal.value = true
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink.value)
    message.success('分享链接已复制到剪贴板')
  }

  const sendInvitation = () => {
    if (!inviteEmail.value) {
      message.warning('请输入邮箱地址')
      return
    }
    
    // 模拟发送邀请
    setTimeout(() => {
      message.success(`邀请已发送到 ${inviteEmail.value}`)
      inviteEmail.value = ''
    }, 1000)
  }

  const exportDocument = () => {
    if (!currentDocument.value) return
    exportSingleDocument(currentDocument.value)
  }

  const exportSingleDocument = (doc) => {
    const content = `# ${doc.title}

**作者**: ${doc.author}
**创建时间**: ${formatDate(doc.createdAt)}
**最后修改**: ${formatDate(doc.updatedAt)}
**版本**: v${doc.version}

---

${doc.content}`

    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.title}.md`
    a.click()
    URL.revokeObjectURL(url)
    message.success('文档已导出')
  }

  const importDocument = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.markdown,.txt'
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from(e.target.files)
      
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target.result
          const newDoc = {
            id: Date.now() + Math.random(),
            title: file.name.replace(/\.(md|markdown|txt)$/, ''),
            summary: '导入的文档',
            content,
            status: 'draft',
            wordCount: content.length,
            version: 1,
            author: 'Current User',
            createdAt: new Date(),
            updatedAt: new Date()
          }
          
          documents.value.unshift(newDoc)
        }
        reader.readAsText(file)
      })
      
      message.success(`成功导入 ${files.length} 个文档`)
    }
    input.click()
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
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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

  .doc-info {
    flex: 1;
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
    line-height: 1.4;
  }

  .doc-meta {
    display: flex;
    gap: 12px;
    font-size: 11px;
    color: #999;
  }

  .doc-actions {
    margin-left: 8px;
  }

  .editor-header {
    width: 100%;
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

  .version-history {
    max-height: 400px;
    overflow-y: auto;
  }

  .version-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .version-title {
    font-weight: 600;
    color: #333;
  }

  .version-time {
    font-size: 12px;
    color: #999;
  }

  .version-content p {
    margin: 8px 0;
    color: #666;
  }

  .version-stats {
    margin: 8px 0;
    font-size: 12px;
    color: #999;
  }

  .version-actions {
    margin-top: 8px;
  }

  .share-options {
    padding: 16px 0;
  }

  .share-section {
    margin-bottom: 20px;
  }

  .share-section h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #333;
  }
</style>
```

### 场景 3: 知识库系统

```vue
<template>
  <div class="knowledge-base">
    <n-card title="知识库管理" style="margin-bottom: 16px;">
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
              :expanded-keys="expandedCategories"
              selectable
              @update:selected-keys="handleCategorySelect"
              @update:expanded-keys="handleCategoryExpand"
            />
          </n-card>

          <n-card title="快速筛选" size="small" class="mt-16px">
            <n-space vertical>
              <div>
                <h4>文章状态</h4>
                <n-checkbox-group v-model:value="statusFilter">
                  <n-space vertical>
                    <n-checkbox value="published">已发布</n-checkbox>
                    <n-checkbox value="draft">草稿</n-checkbox>
                    <n-checkbox value="archived">已归档</n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </div>

              <div>
                <h4>更新时间</h4>
                <n-radio-group v-model:value="timeFilter">
                  <n-space vertical>
                    <n-radio value="today">今天</n-radio>
                    <n-radio value="week">本周</n-radio>
                    <n-radio value="month">本月</n-radio>
                    <n-radio value="all">全部</n-radio>
                  </n-space>
                </n-radio-group>
              </div>
            </n-space>
          </n-card>
        </n-grid-item>

        <!-- 文章列表 -->
        <n-grid-item span="2">
          <n-card title="文章列表" size="small">
            <template #header-extra>
              <n-space>
                <span>共 {{ filteredArticles.length }} 篇文章</span>
                <n-select
                  v-model:value="sortBy"
                  :options="sortOptions"
                  size="small"
                  style="width: 120px"
                />
              </n-space>
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
                    <span>{{ article.viewCount }} 浏览</span>
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
                  <span v-if="article.tags.length > 3" class="more-tags">
                    +{{ article.tags.length - 3 }}
                  </span>
                </div>
              </div>
            </div>

            <n-pagination
              v-model:page="currentPage"
              :page-count="totalPages"
              :page-size="pageSize"
              show-size-picker
              :page-sizes="[10, 20, 50]"
              @update:page-size="handlePageSizeChange"
              class="mt-16px"
            />
          </n-card>
        </n-grid-item>

        <!-- 编辑器 -->
        <n-grid-item>
          <n-card size="small">
            <template #header>
              <span v-if="currentArticle">编辑文章</span>
              <span v-else>选择文章</span>
            </template>

            <template #header-extra>
              <n-space v-if="currentArticle">
                <n-button @click="previewArticle" size="small">
                  预览
                </n-button>
                <n-button @click="publishArticle" size="small" type="primary">
                  发布
                </n-button>
              </n-space>
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

                <n-grid cols="2" x-gap="12">
                  <n-grid-item>
                    <n-form-item label="分类">
                      <n-select
                        v-model:value="currentArticle.category"
                        :options="categoryOptions"
                      />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item label="状态">
                      <n-select
                        v-model:value="currentArticle.status"
                        :options="statusOptions"
                      />
                    </n-form-item>
                  </n-grid-item>
                </n-grid>

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
                @upload-image="handleArticleImageUpload"
              />

              <div class="editor-stats">
                <n-space justify="space-between">
                  <div>
                    <n-space>
                      <span>字数: {{ currentArticle.wordCount }}</span>
                      <span>预计阅读: {{ Math.ceil(currentArticle.wordCount / 300) }}分钟</span>
                    </n-space>
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

    <!-- 预览模态框 -->
    <n-modal v-model:show="showPreviewModal" preset="card" style="width: 90%; max-width: 1000px;">
      <template #header>
        <span>📖 文章预览 - {{ currentArticle?.title }}</span>
      </template>

      <div class="article-preview">
        <div class="preview-header">
          <h1>{{ currentArticle?.title }}</h1>
          <div class="preview-meta">
            <n-space>
              <n-tag>{{ currentArticle?.category }}</n-tag>
              <span>作者: {{ currentArticle?.author }}</span>
              <span>发布时间: {{ formatDate(currentArticle?.updatedAt) }}</span>
            </n-space>
          </div>
          <p class="preview-summary">{{ currentArticle?.summary }}</p>
          <div class="preview-tags">
            <n-tag
              v-for="tag in currentArticle?.tags"
              :key="tag"
              size="small"
              style="margin-right: 8px;"
            >
              {{ tag }}
            </n-tag>
          </div>
        </div>

        <div class="preview-content">
          <C_Markdown
            :model-value="currentArticle?.content"
            mode="preview"
            height="auto"
          />
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
  const message = useMessage()
  const dialog = useDialog()

  const searchKeyword = ref('')
  const selectedCategories = ref([])
  const expandedCategories = ref(['frontend', 'backend'])
  const statusFilter = ref(['published', 'draft'])
  const timeFilter = ref('all')
  const sortBy = ref('updated')
  const currentPage = ref(1)
  const pageSize = ref(10)
  const currentArticle = ref(null)
  const showPreviewModal = ref(false)

  const categoryTree = [
    {
      key: 'frontend',
      label: '前端开发',
      children: [
        { key: 'vue', label: 'Vue.js' },
        { key: 'react', label: 'React' },
        { key: 'css', label: 'CSS/Sass' },
        { key: 'javascript', label: 'JavaScript' }
      ]
    },
    {
      key: 'backend',
      label: '后端开发',
      children: [
        { key: 'nodejs', label: 'Node.js' },
        { key: 'python', label: 'Python' },
        { key: 'database', label: '数据库' },
        { key: 'api', label: 'API设计' }
      ]
    },
    {
      key: 'devops',
      label: '运维部署',
      children: [
        { key: 'docker', label: 'Docker' },
        { key: 'ci-cd', label: 'CI/CD' },
        { key: 'monitoring', label: '监控' }
      ]
    }
  ]

  const categoryOptions = [
    { label: 'Vue.js', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'CSS/Sass', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' },
    { label: '数据库', value: 'database' },
    { label: 'API设计', value: 'api' }
  ]

  const statusOptions = [
    { label: '已发布', value: 'published' },
    { label: '草稿', value: 'draft' },
    { label: '已归档', value: 'archived' }
  ]

  const sortOptions = [
    { label: '最新更新', value: 'updated' },
    { label: '创建时间', value: 'created' },
    { label: '浏览量', value: 'views' },
    { label: '标题', value: 'title' }
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
\`\`\`

### computed 计算属性

\`\`\`javascript
const doubleCount = computed(() => count.value * 2)
\`\`\`

## 高级用法

### 自定义 Hook

\`\`\`javascript
function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return { count, increment, decrement }
}
\`\`\`

## 最佳实践

1. 合理组织逻辑
2. 抽象可复用逻辑
3. 注意响应式规则

## 总结

组合式 API 让我们能够更好地组织和复用逻辑...`,
      category: 'vue',
      status: 'published',
      author: 'Alice',
      tags: ['Vue', 'JavaScript', 'Frontend'],
      viewCount: 1256,
      wordCount: 3280,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Node.js 性能优化实战',
      summary: 'Node.js 应用性能优化的实用技巧和最佳实践',
      content: `# Node.js 性能优化实战

## 性能监控

### 使用 Clinic.js

\`\`\`bash
npm install -g clinic
clinic doctor -- node app.js
\`\`\`

## 内存优化

### 避免内存泄漏

常见的内存泄漏原因：
- 全局变量
- 闭包
- 事件监听器

### 内存监控

\`\`\`javascript
const used = process.memoryUsage()
console.log('RSS:', used.rss / 1024 / 1024)
console.log('Heap Used:', used.heapUsed / 1024 / 1024)
\`\`\`

## CPU 优化

### 避免阻塞事件循环

\`\`\`javascript
// 错误做法
function heavyComputation() {
  for (let i = 0; i < 1000000000; i++) {
    // 大量计算
  }
}

// 正确做法
function heavyComputationAsync() {
  return new Promise((resolve) => {
    setImmediate(() => {
      // 分批处理
      resolve()
    })
  })
}
\`\`\`

## 网络优化

### HTTP/2 支持

\`\`\`javascript
const http2 = require('http2')
const fs = require('fs')

const server = http2.createSecureServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
})
\`\`\`

## 缓存策略

### Redis 缓存

\`\`\`javascript
const redis = require('redis')
const client = redis.createClient()

async function getCachedData(key) {
  const cached = await client.get(key)
  if (cached) {
    return JSON.parse(cached)
  }
  
  const data = await fetchDataFromDB(key)
  await client.setex(key, 3600, JSON.stringify(data))
  return data
}
\`\`\`

## 总结

性能优化是一个持续的过程...`,
      category: 'nodejs',
      status: 'published',
      author: 'Bob',
      tags: ['Node.js', 'Performance', 'Backend'],
      viewCount: 892,
      wordCount: 2156,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      title: 'CSS Grid 布局完全指南',
      summary: '全面掌握 CSS Grid 布局系统，构建复杂的网页布局',
      content: `# CSS Grid 布局完全指南

## Grid 基础概念

CSS Grid 是一个二维布局系统...

## 基础语法

### 定义网格容器

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
\`\`\`

### 网格项目定位

\`\`\`css
.grid-item {
  grid-column: 1 / 3;
  grid-row: 2 / 4;
}
\`\`\`

## 高级特性

### 网格区域命名

\`\`\`css
.grid-container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## 响应式网格

### 使用 auto-fit 和 auto-fill

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

## 实战案例

### 卡片布局

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
}
\`\`\`

## 浏览器支持

现代浏览器都支持 CSS Grid...

## 总结

CSS Grid 是构建现代网页布局的强大工具...`,
      category: 'css',
      status: 'draft',
      author: 'Charlie',
      tags: ['CSS', 'Layout', 'Frontend'],
      viewCount: 445,
      wordCount: 1890,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    }
  ])

  const filteredArticles = computed(() => {
    let filtered = articles.value

    // 搜索关键词过滤
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(keyword) ||
        article.summary.toLowerCase().includes(keyword) ||
        article.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    }

    // 分类过滤
    if (selectedCategories.value.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.value.includes(article.category)
      )
    }

    // 状态过滤
    if (statusFilter.value.length > 0) {
      filtered = filtered.filter(article =>
        statusFilter.value.includes(article.status)
      )
    }

    // 时间过滤
    if (timeFilter.value !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      switch (timeFilter.value) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setMonth(now.getMonth() - 1)
          break
      }
      
      filtered = filtered.filter(article =>
        new Date(article.updatedAt) >= filterDate
      )
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy.value) {
        case 'updated':
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'views':
          return b.viewCount - a.viewCount
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredArticles.value.length / pageSize.value)
  })

  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredArticles.value.slice(start, end)
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
    return new Date(date).toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleCategorySelect = (keys) => {
    selectedCategories.value = keys
    currentPage.value = 1
  }

  const handleCategoryExpand = (keys) => {
    expandedCategories.value = keys
  }

  const handlePageSizeChange = (size) => {
    pageSize.value = size
    currentPage.value = 1
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

在这里分享你的知识和经验...

## 详细内容

### 要点一

详细说明...

### 要点二

进一步解释...

## 总结

知识要点总结...`,
      category: 'vue',
      status: 'draft',
      author: 'Current User',
      tags: [],
      viewCount: 0,
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
    
    // 更新文章列表中的对应项
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

  const handleArticleImageUpload = (event, insertImage, files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        insertImage({
          url: e.target.result,
          desc: file.name,
          width: 'auto',
          height: 'auto'
        })
      }
      reader.readAsDataURL(file)
    })
    
    message.success(`上传 ${files.length} 张图片`)
  }

  const previewArticle = () => {
    if (!currentArticle.value) return
    showPreviewModal.value = true
  }

  const publishArticle = () => {
    if (!currentArticle.value) return
    
    if (currentArticle.value.status === 'published') {
      message.info('文章已经是发布状态')
      return
    }
    
    currentArticle.value.status = 'published'
    currentArticle.value.updatedAt = new Date()
    
    // 更新文章列表
    const articleIndex = articles.value.findIndex(a => a.id === currentArticle.value.id)
    if (articleIndex > -1) {
      articles.value[articleIndex] = { ...currentArticle.value }
    }
    
    message.success('文章已发布到知识库')
  }

  // 监听搜索关键词变化，重置分页
  watch([searchKeyword, statusFilter, timeFilter], () => {
    currentPage.value = 1
  })

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

  .article-tags {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .more-tags {
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

  .article-preview {
    padding: 24px;
  }

  .preview-header {
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }

  .preview-header h1 {
    margin: 0 0 16px 0;
    font-size: 28px;
    color: #333;
  }

  .preview-meta {
    margin-bottom: 12px;
    font-size: 14px;
    color: #666;
  }

  .preview-summary {
    margin: 12px 0 16px 0;
    font-size: 16px;
    color: #555;
    font-style: italic;
    line-height: 1.6;
  }

  .preview-tags {
    margin-bottom: 16px;
  }

  .preview-content {
    min-height: 400px;
  }
</style>
```

## 🛠️ 高级用法

### 自定义工具栏配置

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

### 主题定制

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

  .custom-editor .v-md-editor__toolbar-item {
    color: var(--md-text-color);
  }

  .custom-editor .v-md-editor__toolbar-item:hover {
    background: var(--md-primary-color);
    color: white;
  }
</style>
```

### 插件扩展

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
          { left: '$', right: '$', display: true },
          { left: ', right: ', display: false }
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

### 协作编辑

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
  import { useOperationalTransform } from '@/composables/useOperationalTransform'

  const { 
    isConnected, 
    sendMessage, 
    onMessage 
  } = useWebSocket('ws://localhost:3001/collaborate')

  const {
    applyOperation,
    createOperation,
    transformOperation
  } = useOperationalTransform()

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
          const transformedOp = transformOperation(
            message.operation,
            pendingOperations.value
          )
          collaborativeContent.value = applyOperation(
            collaborativeContent.value,
            transformedOp
          )
        }
        break
        
      case 'users_update':
        onlineUsers.value = message.users
        break
        
      case 'cursor_position':
        updateUserCursor(message.userId, message.position)
        break
    }
  })

  const updateUserCursor = (userId, position) => {
    // 更新其他用户的光标位置显示
  }
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

### 版本控制

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

  const handleAutoSave = (text) => {
    // 自动保存不创建新版本，只更新当前内容
    if (versions.value.length > 0) {
      versions.value[0].content = text
      versions.value[0].updatedAt = new Date()
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

  const showVersionHistory = () => {
    showVersionModal.value = true
  }

  const previewVersion = (version) => {
    // 在新窗口或模态框中预览版本内容
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

  const compareVersions = () => {
    // 实现版本对比功能
  }
</script>
```

## ⚠️ 注意事项

### 1. 内容长度限制

```vue
<!-- ✅ 推荐：设置合理的长度限制 -->
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

<!-- ❌ 不推荐：没有长度限制可能导致性能问题 -->
<C_Markdown v-model="content" />
```

### 2. 图片上传处理

```javascript
// ✅ 推荐：正确处理图片上传
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

// ❌ 不推荐：直接使用 base64 可能导致内容过大
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

### 3. 自动保存配置

```vue
<!-- ✅ 推荐：合理的自动保存间隔 -->
<C_Markdown
  v-model="content"
  :auto-save="true"
  :auto-save-interval="30000"  <!-- 30秒，不要太频繁 -->
  @auto-save="handleAutoSave"
/>

<!-- ❌ 不推荐：过于频繁的自动保存 -->
<C_Markdown
  v-model="content"
  :auto-save="true"
  :auto-save-interval="1000"  <!-- 1秒，太频繁 -->
/>
```

### 4. 内存管理

```javascript
// ✅ 推荐：及时清理大型内容
const handleContentChange = (text, html) => {
  // 如果内容过大，考虑分片处理
  if (text.length > 100000) {
    console.warn('内容较大，可能影响性能')
  }
  
  // 清理不必要的历史记录
  if (changeHistory.length > 50) {
    changeHistory.splice(30) // 只保留最近30次变更
  }
}

// ❌ 不推荐：无限制的历史记录累积
const handleContentChange = (text, html) => {
  changeHistory.push({ text, html, timestamp: Date.now() })
  // 历史记录无限增长，可能导致内存泄漏
}
```

## 🐛 故障排除

### 常见问题

#### Q1: 编辑器不显示或样式异常？

**A1:** 检查 CSS 依赖是否正确加载：

```javascript
// 确保在 main.js 中引入了必要的样式
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// 检查是否有 CSS 冲突
// 在浏览器开发者工具中查看元素样式
```

#### Q2: 图片上传功能不工作？

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

#### Q3: 自动保存不生效？

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

#### Q4: 字数统计不准确？

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

#### Q5: 全屏模式样式问题？

**A5:** 检查全屏模式的 z-index 和样式：

```scss
// 确保全屏模式有足够高的层级
.v-md-editor--fullscreen {
  z-index: 9999 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
}
```

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

  countWords(text) {
    return text
      .replace(/[#*`_~\[\]()]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0).length
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

  // 防抖处理字数统计
  const debouncedWordCountChange = debounce((count) => {
    updateWordCount(count)
  }, 300)

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

  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer)
      this.autoSaveTimer = null
    }
  }

  markChanged() {
    this.pendingChanges = true
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

  loadFromLocal() {
    try {
      const saved = localStorage.getItem(`document_${this.documentId}`)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.warn('本地加载失败:', error)
      return null
    }
  }

  incrementVersion() {
    const current = localStorage.getItem(`version_${this.documentId}`) || '0'
    const newVersion = parseInt(current) + 1
    localStorage.setItem(`version_${this.documentId}`, newVersion.toString())
    return newVersion
  }
}

// 使用示例
const persistenceManager = new DocumentPersistenceManager('doc_123')

const handleContentChange = (text, html) => {
  persistenceManager.markChanged()
}

const handleAutoSave = async (text) => {
  try {
    await persistenceManager.saveDocument(text, currentMetadata.value)
    message.success('自动保存成功')
  } catch (error) {
    message.error('自动保存失败')
  }
}

onMounted(() => {
  persistenceManager.startAutoSave(content, metadata, 30000)
})

onUnmounted(() => {
  persistenceManager.stopAutoSave()
})
```

### 4. 协作编辑最佳实践

```javascript
// 协作编辑管理器
class CollaborativeEditingManager {
  constructor(documentId, userId) {
    this.documentId = documentId
    this.userId = userId
    this.operationQueue = []
    this.isConnected = ref(false)
    this.collaborators = ref([])
  }

  async connect() {
    try {
      this.socket = new WebSocket(`ws://localhost:3001/collaborate/${this.documentId}`)
      
      this.socket.onopen = () => {
        this.isConnected.value = true
        this.sendUserJoin()
      }

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        this.handleMessage(message)
      }

      this.socket.onclose = () => {
        this.isConnected.value = false
        this.reconnect()
      }

    } catch (error) {
      console.error('连接失败:', error)
    }
  }

  sendOperation(operation) {
    if (this.isConnected.value) {
      this.socket.send(JSON.stringify({
        type: 'operation',
        documentId: this.documentId,
        userId: this.userId,
        operation,
        timestamp: Date.now()
      }))
    } else {
      this.operationQueue.push(operation)
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case 'operation':
        this.applyRemoteOperation(message.operation)
        break
      case 'user_joined':
        this.collaborators.value.push(message.user)
        break
      case 'user_left':
        const index = this.collaborators.value.findIndex(u => u.id === message.userId)
        if (index > -1) {
          this.collaborators.value.splice(index, 1)
        }
        break
    }
  }

  applyRemoteOperation(operation) {
    // 使用操作变换算法应用远程操作
    const transformedOp = this.transformOperation(operation)
    this.applyToEditor(transformedOp)
  }

  sendUserJoin() {
    this.socket.send(JSON.stringify({
      type: 'user_join',
      documentId: this.documentId,
      user: {
        id: this.userId,
        name: getCurrentUser().name,
        avatar: getCurrentUser().avatar
      }
    }))
  }

  reconnect() {
    setTimeout(() => {
      console.log('尝试重新连接...')
      this.connect()
    }, 3000)
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
    }
  }
}
```

### 5. 错误处理和用户体验

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

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved.

---

**💡 提示**: 这个 Markdown 编辑器组件基于强大的 v-md-editor 库构建，提供了完整的内容创作和编辑功能。支持多种编辑模式、实时预览、图片上传、自动保存等特性，适用于博客文章、技术文档、知识库等各种内容创作场景。无论是简单的文本编辑还是复杂的协作创作，都能提供专业级的编辑体验。结合 TypeScript 支持和高度可定制的配置，让内容创作既高效又愉悦。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更优雅的内容创作体验！ ✍️
