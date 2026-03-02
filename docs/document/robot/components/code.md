---
outline: 'deep'
---

# C_Code 代码高亮组件

> 🎨 基于 Naive UI 的高效代码高亮组件，让代码展示变得专业而优雅

## 🚀 在线演示

<DemoIframe src="/preview/code" title="代码编辑器" height="700" />


## ✨ 特性

- **🌈 多语言支持**: 支持 JavaScript、TypeScript、Python、Java 等 30+ 种编程语言
- **📋 一键复制**: 智能复制功能，支持悬浮按钮和标题栏双重交互
- **🖥️ 全屏查看**: 内置全屏模态框，完美展示长代码片段
- **🎯 智能加载**: 动态语言包加载，按需引入提升性能
- **🎨 语言图标**: 内置丰富的编程语言图标映射
- **📏 灵活布局**: 支持行号显示、自动换行、高度限制等配置
- **⌨️ 快捷操作**: ESC 键退出全屏，提升用户体验
- **🎭 加载状态**: 优雅的语言包加载提示
- **💪 TypeScript**: 完整的类型定义和类型安全
- **⚡ 高性能**: 基于 highlight.js 的优化渲染引擎
- **🎛️ 高度定制**: 支持自定义标题、样式和事件处理

## 📦 安装

```bash
# 确保已安装 highlight.js 相关依赖
npm install highlight.js
# 或者
bun add highlight.js
```

## 🎯 快速开始

### 基础用法

```vue {3-8,13-16,21-23}
<template>
  <!-- 最简单的代码高亮 -->
  <C_Code
    :code="jsCode"
    language="javascript"
    title="JavaScript 示例"
    @copy="handleCopy"
  />
</template>

<script setup>
const jsCode = `
function greet(name) {
  console.log(\`Hello, \${name}!\`)
  return \`Welcome, \${name}\`
}

greet('Vue Developer')
`

const handleCopy = (code) => {
  console.log('代码已复制:', code.length, '个字符')
}
</script>
```

### 多语言展示

```vue {10-17}
<template>
  <div class="code-examples">
    <n-tabs type="line" animated>
      <n-tab-pane
        v-for="(example, lang) in codeExamples"
        :key="lang"
        :name="lang"
        :tab="getLanguageLabel(lang)"
      >
        <C_Code
          :code="example.code"
          :language="lang"
          :title="example.title"
          :show-fullscreen="true"
          @copy="handleCopy"
          @fullscreen="handleFullscreen"
        />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
  const codeExamples = {
    javascript: {
      title: 'JavaScript ES6+ 示例',
      code: `
// 现代 JavaScript 示例
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`)
    const userData = await response.json()

    return {
      ...userData,
      isActive: userData.status === 'active',
      fullName: \`\${userData.firstName} \${userData.lastName}\`
    }
  } catch (error) {
    console.error('获取用户数据失败:', error)
    throw new Error('用户数据加载失败')
  }
}

// 使用示例
fetchUserData(123)
  .then(user => console.log('用户信息:', user))
  .catch(error => console.error(error))
`
    },
    typescript: {
      title: 'TypeScript 接口定义',
      code: `
// TypeScript 类型定义示例
interface User {
  id: number
  name: string
  email: string
  avatar?: string
  roles: Role[]
  createdAt: Date
  updatedAt: Date
}

interface Role {
  id: number
  name: string
  permissions: Permission[]
}

// 泛型函数示例
function createApiResponse<T>(
  data: T,
  success: boolean = true,
  message?: string
): ApiResponse<T> {
  return {
    data,
    success,
    message: message || (success ? '操作成功' : '操作失败'),
    timestamp: new Date().toISOString()
  }
}

// 使用示例
const userResponse = createApiResponse<User>({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  roles: [],
  createdAt: new Date(),
  updatedAt: new Date()
})
`
    }
  }

  const getLanguageLabel = (lang) => {
    const labels = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      vue: 'Vue 3'
    }
    return labels[lang] || lang.toUpperCase()
  }

  const handleCopy = (code) => {
    message.success(`已复制 ${code.length} 个字符`)
  }

  const handleFullscreen = (isFullscreen) => {
    message.info(isFullscreen ? '已进入全屏模式' : '已退出全屏模式')
  }
</script>
```

## 📖 API 文档

### Props

| 参数                 | 类型               | 默认值   | 说明               |
| -------------------- | ------------------ | -------- | ------------------ |
| **code**             | `string`           | `''`     | 要显示的代码内容   |
| **language**         | `string`           | `'text'` | 编程语言标识符     |
| **title**            | `string`           | `-`      | 代码块标题         |
| **showHeader**       | `boolean`          | `true`   | 是否显示标题栏     |
| **showLineNumbers**  | `boolean`          | `true`   | 是否显示行号       |
| **wordWrap**         | `boolean`          | `false`  | 是否启用自动换行   |
| **trim**             | `boolean`          | `true`   | 是否移除首尾空白   |
| **showFullscreen**   | `boolean`          | `false`  | 是否显示全屏按钮   |
| **maxHeight**        | `string \| number` | `-`      | 最大高度限制       |
| **autoLoadLanguage** | `boolean`          | `true`   | 是否自动加载语言包 |

### Events

| 事件名         | 参数                      | 说明               |
| -------------- | ------------------------- | ------------------ |
| **copy**       | `(code: string)`          | 复制代码时触发     |
| **click**      | `(event: MouseEvent)`     | 点击代码区域时触发 |
| **fullscreen** | `(isFullscreen: boolean)` | 全屏状态切换时触发 |

### 暴露方法

| 方法名               | 参数 | 返回值          | 说明             |
| -------------------- | ---- | --------------- | ---------------- |
| **copyCode**         | `-`  | `Promise<void>` | 手动触发复制代码 |
| **toggleFullscreen** | `-`  | `void`          | 手动切换全屏状态 |

### 支持的编程语言

| 语言           | 标识符       | 图标 | 语言           | 标识符       | 图标 |
| -------------- | ------------ | ---- | -------------- | ------------ | ---- |
| **JavaScript** | `javascript` | 🟨   | **HTML**       | `html`       | 🌐   |
| **TypeScript** | `typescript` | 🔷   | **CSS**        | `css`        | 🎨   |
| **Python**     | `python`     | 🐍   | **Vue**        | `vue`        | 💚   |
| **Java**       | `java`       | ☕   | **React**      | `react`      | ⚛️   |
| **C++**        | `cpp`        | ⚡   | **JSON**       | `json`       | 📄   |
| **Go**         | `go`         | 🐹   | **SQL**        | `sql`        | 🗃️   |
| **Rust**       | `rust`       | 🦀   | **Bash**       | `bash`       | 💻   |
| **PHP**        | `php`        | 🐘   | **YAML**       | `yaml`       | 📋   |
| **C#**         | `csharp`     | 💙   | **Markdown**   | `markdown`   | 📝   |

## 🎨 使用示例

::: details 📚 技术文档展示 - 完整的API文档系统
```vue 
<template>
  <div class="documentation">
    <n-card title="API 使用文档" style="margin-bottom: 16px;">
      <n-space>
        <n-select
          v-model:value="selectedApi"
          :options="apiOptions"
          placeholder="选择 API"
          style="width: 200px"
        />
        <n-button @click="generateExample" type="primary">
          生成示例
        </n-button>
      </n-space>
    </n-card>

    <div class="api-sections">
      <!-- 请求示例 -->
      <n-card title="请求示例" class="mb-16px">
        <n-tabs type="line">
          <n-tab-pane name="curl" tab="cURL">
            <C_Code
              :code="apiExamples.curl"
              language="bash"
              title="cURL 请求"
              @copy="handleCopy"
            />
          </n-tab-pane>
          <n-tab-pane name="javascript" tab="JavaScript">
            <C_Code
              :code="apiExamples.javascript"
              language="javascript"
              title="JavaScript Fetch"
              @copy="handleCopy"
            />
          </n-tab-pane>
          <n-tab-pane name="python" tab="Python">
            <C_Code
              :code="apiExamples.python"
              language="python"
              title="Python Requests"
              @copy="handleCopy"
            />
          </n-tab-pane>
        </n-tabs>
      </n-card>

      <!-- 响应示例 -->
      <n-card title="响应示例" class="mb-16px">
        <C_Code
          :code="apiExamples.response"
          language="json"
          title="JSON 响应"
          :max-height="400"
          @copy="handleCopy"
        />
      </n-card>
    </div>
  </div>
</template>

<script setup>
  const message = useMessage()
  const selectedApi = ref('users')

  const apiOptions = [
    { label: '用户管理', value: 'users' },
    { label: '文章管理', value: 'articles' },
    { label: '评论系统', value: 'comments' }
  ]

  const apiExamples = reactive({
    curl: `# 获取用户列表
curl -X GET "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json"

# 创建新用户
curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }'`,

    javascript: `// 使用 Fetch API
const apiClient = {
  baseURL: 'https://api.example.com/v1',
  token: 'YOUR_TOKEN',

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`
    const config = {
      headers: {
        'Authorization': \`Bearer \${this.token}\`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
      }

      return await response.json()
    } catch (error) {
      console.error('API 请求失败:', error)
      throw error
    }
  },

  // 获取用户列表
  async getUsers(params = {}) {
    const query = new URLSearchParams(params).toString()
    return this.request(\`/users?\${query}\`)
  },

  // 创建用户
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }
}

// 使用示例
apiClient.getUsers({ page: 1, limit: 10 })
  .then(data => console.log('用户列表:', data))
  .catch(error => console.error('获取失败:', error))`,

    python: `import requests
import json
from typing import Dict, Optional, Any

class APIClient:
    """API 客户端封装"""

    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })

    def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """发送 HTTP 请求"""
        url = f"{self.base_url}{endpoint}"

        try:
            response = self.session.request(method, url, **kwargs)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"API 请求失败: {e}")
            raise

    def get_users(self, page: int = 1, limit: int = 10) -> Dict[str, Any]:
        """获取用户列表"""
        params = {'page': page, 'limit': limit}
        return self._request('GET', '/users', params=params)

    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """创建新用户"""
        return self._request('POST', '/users', json=user_data)

# 使用示例
client = APIClient('https://api.example.com/v1', 'YOUR_TOKEN')

# 获取用户列表
users = client.get_users(page=1, limit=20)
print(f"获取到 {len(users['data'])} 个用户")

# 创建新用户
new_user = {
    'name': 'Jane Smith',
    'email': 'jane@example.com',
    'role': 'admin'
}

created_user = client.create_user(new_user)
print(f"用户创建成功，ID: {created_user['id']}")`,

    response: `{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://example.com/avatars/john.jpg",
        "role": "admin",
        "status": "active",
        "createdAt": "2025-01-01T00:00:00Z",
        "updatedAt": "2025-07-19T10:30:00Z",
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "bio": "Full-stack developer with 5+ years experience",
          "location": "San Francisco, CA",
          "website": "https://johndoe.dev"
        },
        "permissions": [
          "users:read",
          "users:write",
          "articles:read",
          "articles:write",
          "admin:dashboard"
        ]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  },
  "message": "用户列表获取成功",
  "timestamp": "2025-07-19T10:30:00Z",
  "requestId": "req_1234567890abcdef"
}`
  })

  const generateExample = () => {
    message.success(`已生成 ${selectedApi.value} API 示例`)
  }

  const handleCopy = (code) => {
    message.success(`已复制 ${code.length} 个字符到剪贴板`)
  }
</script>

<style scoped>
  .documentation {
    padding: 24px;
  }

  .api-sections .n-card {
    margin-bottom: 16px;
  }
</style>
```
:::

::: details 🎓 代码教程展示 - 交互式学习系统  
```vue 
<template>
  <div class="tutorial-demo">
    <n-card title="Vue 3 学习教程" style="margin-bottom: 16px;">
      <n-steps :current="currentStep" size="small">
        <n-step
          v-for="(step, index) in tutorialSteps"
          :key="index"
          :title="step.title"
        />
      </n-steps>
    </n-card>

    <n-grid cols="2" x-gap="16">
      <!-- 教程内容 -->
      <n-grid-item>
        <n-card :title="currentTutorial.title" size="small">
          <div class="tutorial-content">
            <div class="description">
              {{ currentTutorial.description }}
            </div>

            <div class="key-points">
              <h4>关键要点:</h4>
              <ul>
                <li v-for="point in currentTutorial.keyPoints" :key="point">
                  {{ point }}
                </li>
              </ul>
            </div>

            <C_Code
              :code="currentTutorial.code"
              :language="currentTutorial.language"
              :title="currentTutorial.codeTitle"
              :show-fullscreen="true"
              @copy="handleCopy"
            />

            <div class="tutorial-actions">
              <n-button-group>
                <n-button
                  @click="prevStep"
                  :disabled="currentStep === 0"
                >
                  上一步
                </n-button>
                <n-button
                  @click="nextStep"
                  :disabled="currentStep === tutorialSteps.length - 1"
                  type="primary"
                >
                  下一步
                </n-button>
              </n-button-group>
            </div>
          </div>
        </n-card>
      </n-grid-item>

      <!-- 实时预览 -->
      <n-grid-item>
        <n-card title="实时预览" size="small">
          <div class="preview-container">
            <div v-if="currentStep === 0" class="demo-basic">
              <h3>{{ messageText }}</h3>
              <n-button @click="updateMessage">更新消息</n-button>
            </div>

            <div v-if="currentStep === 1" class="demo-reactive">
              <n-input v-model:value="inputValue" placeholder="输入一些文字" />
              <p>你输入的是: {{ inputValue }}</p>
            </div>

            <div v-if="currentStep === 2" class="demo-computed">
              <n-input-number v-model:value="num1" placeholder="第一个数字" />
              <n-input-number v-model:value="num2" placeholder="第二个数字" />
              <p>计算结果: {{ computedSum }}</p>
            </div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
  const currentStep = ref(0)
  const inputValue = ref('')
  const num1 = ref(0)
  const num2 = ref(0)
  const messageText = ref('Hello Vue 3!')

  const computedSum = computed(() => {
    return (num1.value || 0) + (num2.value || 0)
  })

  const tutorialSteps = [
    {
      title: '响应式基础',
      description: '学习 Vue 3 的响应式系统基础，了解 ref 的使用方法。',
      keyPoints: [
        'ref() 用于创建响应式数据',
        '.value 用于访问和修改响应式数据',
        '模板中会自动解包，无需 .value'
      ],
      language: 'vue',
      codeTitle: 'ref 响应式示例',
      code: `<template>
  <div>
    <h3>{{ message }}</h3>
    <button @click="updateMessage">更新消息</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 创建响应式数据
const message = ref('Hello Vue 3!')

// 修改响应式数据的函数
const updateMessage = () => {
  message.value = '消息已更新: ' + new Date().toLocaleTimeString()
}
</script>`
    },
    {
      title: '双向绑定',
      description: '学习 v-model 的使用，实现表单元素的双向数据绑定。',
      keyPoints: [
        'v-model 实现双向数据绑定',
        '输入框的值会实时同步到数据',
        '数据变化也会更新输入框'
      ],
      language: 'vue',
      codeTitle: 'v-model 双向绑定',
      code: `<template>
  <div>
    <input v-model="inputValue" placeholder="输入一些文字" />
    <p>你输入的是: {{ inputValue }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 创建响应式数据用于双向绑定
const inputValue = ref('')

// 监听数据变化
watch(inputValue, (newValue) => {
  console.log('输入值变化:', newValue)
})
</script>`
    },
    {
      title: '计算属性',
      description: '学习 computed 计算属性，实现基于其他数据的派生数据。',
      keyPoints: [
        'computed 用于创建计算属性',
        '计算属性会缓存结果',
        '只有依赖的响应式数据发生变化时才会重新计算'
      ],
      language: 'vue',
      codeTitle: 'computed 计算属性',
      code: `<template>
  <div>
    <input type="number" v-model.number="num1" placeholder="第一个数字" />
    <input type="number" v-model.number="num2" placeholder="第二个数字" />
    <p>计算结果: {{ computedSum }}</p>
    <p>结果是否为偶数: {{ isEven }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const num1 = ref(0)
const num2 = ref(0)

// 计算属性 - 自动计算两数之和
const computedSum = computed(() => {
  console.log('计算属性执行')
  return (num1.value || 0) + (num2.value || 0)
})

// 另一个计算属性 - 判断结果是否为偶数
const isEven = computed(() => {
  return computedSum.value % 2 === 0
})
</script>`
    }
  ]

  const currentTutorial = computed(() => tutorialSteps[currentStep.value])

  const updateMessage = () => {
    messageText.value = '消息已更新: ' + new Date().toLocaleTimeString()
  }

  const nextStep = () => {
    if (currentStep.value < tutorialSteps.length - 1) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  const handleCopy = (code) => {
    message.success('代码已复制到剪贴板')
  }
</script>

<style scoped>
  .tutorial-demo {
    padding: 24px;
  }

  .tutorial-content {
    padding: 16px 0;
  }

  .description {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 16px;
    color: #555;
  }

  .key-points {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 20px;
    border-left: 4px solid #1890ff;
  }

  .key-points h4 {
    margin: 0 0 8px 0;
    color: #333;
  }

  .key-points ul {
    margin: 0;
    padding-left: 20px;
  }

  .key-points li {
    margin-bottom: 4px;
    color: #555;
  }

  .tutorial-actions {
    margin-top: 20px;
    text-align: center;
  }

  .preview-container {
    padding: 20px;
    background: #fafafa;
    border-radius: 6px;
    min-height: 200px;
  }

  .demo-basic, .demo-reactive, .demo-computed {
    padding: 16px;
  }

  .demo-basic h3 {
    color: #1890ff;
    margin-bottom: 16px;
  }
</style>
```
:::

::: details 🔍 代码对比工具 - 版本差异分析系统
```vue 
<template>
  <div class="code-comparison">
    <n-card title="代码对比工具" style="margin-bottom: 16px;">
      <n-space>
        <n-select
          v-model:value="selectedComparison"
          :options="comparisonOptions"
          placeholder="选择对比场景"
          style="width: 200px"
        />
        <n-button @click="swapCodeBlocks" type="primary">
          交换对比
        </n-button>
      </n-space>
    </n-card>

    <n-grid cols="2" x-gap="16">
      <!-- 左侧代码 -->
      <n-grid-item>
        <n-card :title="currentComparison.leftTitle" size="small">
          <template #header-extra>
            <n-tag type="error" size="small">
              - {{ getDifferenceCount().removed }} 行
            </n-tag>
          </template>

          <C_Code
            :code="currentComparison.leftCode"
            :language="currentComparison.language"
            :show-fullscreen="true"
            :max-height="500"
            @copy="handleCopy"
          />
        </n-card>
      </n-grid-item>

      <!-- 右侧代码 -->
      <n-grid-item>
        <n-card :title="currentComparison.rightTitle" size="small">
          <template #header-extra>
            <n-tag type="success" size="small">
              + {{ getDifferenceCount().added }} 行
            </n-tag>
          </template>

          <C_Code
            :code="currentComparison.rightCode"
            :language="currentComparison.language"
            :show-fullscreen="true"
            :max-height="500"
            @copy="handleCopy"
          />
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- 差异统计 -->
    <n-card class="mt-16px" title="差异统计">
      <n-grid cols="4" x-gap="16">
        <n-grid-item>
          <n-statistic label="总行数变化" :value="getDifferenceCount().total" />
        </n-grid-item>
        <n-grid-item>
          <n-statistic
            label="新增行数"
            :value="getDifferenceCount().added"
            value-style="color: #52c41a;"
          />
        </n-grid-item>
        <n-grid-item>
          <n-statistic
            label="删除行数"
            :value="getDifferenceCount().removed"
            value-style="color: #ff4d4f;"
          />
        </n-grid-item>
        <n-grid-item>
          <n-statistic
            label="修改百分比"
            :value="`${getDifferenceCount().percentage}%`"
          />
        </n-grid-item>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup>
  const selectedComparison = ref('vue-options-composition')

  const comparisonOptions = [
    { label: 'Vue Options API vs Composition API', value: 'vue-options-composition' },
    { label: 'JavaScript vs TypeScript', value: 'js-ts' }
  ]

  const comparisons = {
    'vue-options-composition': {
      leftTitle: 'Vue 2 Options API',
      rightTitle: 'Vue 3 Composition API',
      language: 'vue',
      leftCode: `<template>
  <div class="user-list">
    <h2>用户列表</h2>
    <div class="filters">
      <input v-model="searchTerm" placeholder="搜索用户..." />
    </div>
    <div class="user-grid">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        @click="selectUser(user)"
      >
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      searchTerm: '',
      loading: false
    }
  },

  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  },

  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await this.$http.get('/api/users')
        this.users = response.data
      } finally {
        this.loading = false
      }
    },

    selectUser(user) {
      this.$emit('user-selected', user)
    }
  },

  async mounted() {
    await this.fetchUsers()
  }
}
</script>`,

      rightCode: `<template>
  <div class="user-list">
    <h2>用户列表</h2>
    <div class="filters">
      <input v-model="searchTerm" placeholder="搜索用户..." />
    </div>
    <div class="user-grid">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        @click="selectUser(user)"
      >
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsers } from '@/composables/useUsers'

// 响应式数据
const searchTerm = ref('')

// 使用组合式函数
const { users, loading, fetchUsers } = useUsers()

// 计算属性
const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// 事件定义
const emit = defineEmits(['user-selected'])

// 方法
const selectUser = (user) => {
  emit('user-selected', user)
}

// 生命周期
onMounted(async () => {
  await fetchUsers()
})
</script>`
    }
  }

  const currentComparison = computed(() =>
    comparisons[selectedComparison.value]
  )

  const getDifferenceCount = () => {
    const leftLines = currentComparison.value.leftCode.split('\\n').length
    const rightLines = currentComparison.value.rightCode.split('\\n').length
    const diff = rightLines - leftLines

    return {
      total: Math.abs(diff),
      added: Math.max(0, diff),
      removed: Math.max(0, -diff),
      percentage: Math.round((Math.abs(diff) / leftLines) * 100)
    }
  }

  const swapCodeBlocks = () => {
    const current = comparisons[selectedComparison.value]
    [current.leftCode, current.rightCode] = [current.rightCode, current.leftCode];
    [current.leftTitle, current.rightTitle] = [current.rightTitle, current.leftTitle]
    message.success('代码块已交换')
  }

  const handleCopy = (code) => {
    message.success('代码已复制到剪贴板')
  }
</script>
```
:::

## 🛠️ 高级用法

::: details 🔄 动态语言加载 - 智能语言包管理
```vue 
<template>
  <div class="dynamic-language-demo">
    <n-space class="mb-16px">
      <n-select
        v-model:value="selectedLanguage"
        :options="availableLanguages"
        placeholder="选择编程语言"
        style="width: 200px"
      />
      <n-button
        @click="loadLanguageAndDisplay"
        :loading="loading"
        type="primary"
      >
        加载语言包
      </n-button>
    </n-space>

    <C_Code
      v-if="dynamicCode"
      :code="dynamicCode"
      :language="selectedLanguage"
      :title="`${selectedLanguage} 示例代码`"
      :auto-load-language="false"
      @copy="handleCopy"
    />
  </div>
</template>

<script setup>
import { useHighlight } from '@/plugins/highlight'

const highlight = useHighlight()
const message = useMessage()

const selectedLanguage = ref('')
const dynamicCode = ref('')
const loading = ref(false)

const availableLanguages = [
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Ruby', value: 'ruby' },
]

const codeExamples = {
  go: `package main

import (
    "fmt"
    "net/http"
    "encoding/json"
)

type User struct {
    ID   int    \`json:"id"\`
    Name string \`json:"name"\`
    Email string \`json:"email"\`
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
    user := User{
        ID:   1,
        Name: "John Doe",
        Email: "john@example.com",
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func main() {
    http.HandleFunc("/user", getUserHandler)
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}`,

  rust: `use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
}

fn main() {
    let user = User {
        id: 1,
        name: "Alice".to_string(),
        email: "alice@example.com".to_string(),
    };
    
    println!("User: {:?}", user);
}`,
}

const loadLanguageAndDisplay = async () => {
  if (!selectedLanguage.value) {
    message.warning('请先选择一种编程语言')
    return
  }

  loading.value = true

  try {
    // 检查语言包是否已加载
    const loadedLanguages = highlight.getLoadedLanguages()
    
    if (!loadedLanguages.includes(selectedLanguage.value)) {
      message.info(`正在加载 ${selectedLanguage.value} 语言包...`)
      await highlight.loadLanguage(selectedLanguage.value)
    }

    // 显示示例代码
    dynamicCode.value = codeExamples[selectedLanguage.value] || '// 暂无示例代码'
    message.success(`${selectedLanguage.value} 语言包加载成功`)
    
  } catch (error) {
    message.error(`语言包加载失败: ${error.message}`)
    console.error('Language loading error:', error)
  } finally {
    loading.value = false
  }
}

const handleCopy = (code) => {
  message.success('代码已复制到剪贴板')
}
</script>
```
:::

::: details 🎨 自定义主题样式 - 个性化代码展示
```vue 
<template>
  <div class="custom-theme-demo">
    <n-space class="mb-16px">
      <n-select
        v-model:value="selectedTheme"
        :options="themeOptions"
        placeholder="选择主题"
        style="width: 150px"
      />
      <n-color-picker v-model:value="customAccentColor" />
      <n-button @click="applyCustomTheme">应用自定义主题</n-button>
    </n-space>

    <C_Code
      :code="themeCode"
      language="css"
      title="自定义主题样式"
      :style="customCodeStyle"
      class="custom-themed-code"
      @copy="handleCopy"
    />
  </div>
</template>

<script setup>
const selectedTheme = ref('dark')
const customAccentColor = ref('#00d4aa')

const themeOptions = [
  { label: '深色主题', value: 'dark' },
  { label: '浅色主题', value: 'light' },
  { label: '护眼主题', value: 'eye-care' },
  { label: '高对比度', value: 'high-contrast' },
]

const themeCode = `/* 自定义代码高亮主题 */
.custom-themed-code {
  --code-bg: #1e1e1e;
  --code-text: #d4d4d4;
  --code-keyword: #569cd6;
  --code-string: #ce9178;
  --code-comment: #6a9955;
  --code-number: #b5cea8;
  --border-radius: 8px;
  --header-bg: #2d2d30;
}

.c-code-wrapper {
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 语法高亮颜色 */
.hljs-keyword { color: var(--code-keyword); }
.hljs-string { color: var(--code-string); }
.hljs-comment { color: var(--code-comment); }`

const customCodeStyle = computed(() => {
  const themes = {
    dark: {
      '--code-bg': '#1e1e1e',
      '--code-text': '#d4d4d4',
      '--header-bg': '#2d2d30',
    },
    light: {
      '--code-bg': '#ffffff',
      '--code-text': '#333333',
      '--header-bg': '#f5f5f5',
    },
    'eye-care': {
      '--code-bg': '#f7f3e9',
      '--code-text': '#5c4b37',
      '--header-bg': '#ede3d3',
    },
    'high-contrast': {
      '--code-bg': '#000000',
      '--code-text': '#ffffff',
      '--header-bg': '#333333',
    },
  }

  return {
    ...themes[selectedTheme.value],
    '--accent-color': customAccentColor.value,
  }
})

const applyCustomTheme = () => {
  const themeLabel = themeOptions.find(t => t.value === selectedTheme.value)?.label
  message.success(`已应用 ${themeLabel} 主题`)
}

const handleCopy = (code) => {
  message.success('主题代码已复制')
}
</script>

<style scoped>
.custom-theme-demo {
  padding: 20px;
}

.custom-themed-code {
  transition: all 0.3s ease;
}
</style>
```
:::

## ⚠️ 注意事项

### 1. 语言包大小

```vue
<!-- ✅ 推荐：按需加载语言包 -->
<script setup>
const loadLanguageOnDemand = async (language) => {
  try {
    await highlight.loadLanguage(language)
    // 语言包加载成功
  } catch (error) {
    console.warn(`语言包加载失败: ${language}`)
  }
}
</script>

<!-- ❌ 不推荐：一次性加载所有语言包 -->
<script setup>
import 'highlight.js/lib/languages/javascript'
import 'highlight.js/lib/languages/typescript'
// ... 加载太多语言包会增加包体积
</script>
```

### 2. 代码内容安全

```javascript
// ✅ 推荐：对用户输入的代码进行清理
const sanitizeCode = (code) => {
  return code
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

// ❌ 不推荐：直接使用未清理的用户输入
const unsafeCode = userInput // 可能包含恶意代码
```

### 3. 大型代码块性能

```vue
<!-- ✅ 推荐：限制代码块高度 -->
<C_Code
  :code="largeCode"
  language="javascript"
  :max-height="400"
/>

<!-- ❌ 不推荐：显示超大代码块而不限制高度 -->
<C_Code
  :code="veryLargeCode"
  language="javascript"
/>
```

### 4. 复制功能兼容性

```javascript
// ✅ 推荐：提供复制功能的降级方案
const copyWithFallback = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案：使用 textarea
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      return true
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}
```

## 🐛 故障排除

::: details ❓ Q1: 语言高亮不生效？
**A1:** 检查语言包加载：

```javascript
// 确保语言包已正确加载
const checkLanguageLoaded = async (language) => {
  const highlight = useHighlight()
  const loadedLanguages = highlight.getLoadedLanguages()

  if (!loadedLanguages.includes(language)) {
    await highlight.loadLanguage(language)
  }
}
```
:::

::: details ❓ Q2: 复制功能在某些浏览器不工作？
**A2:** 检查 HTTPS 和权限：

```javascript
// 检查复制 API 是否可用
const checkClipboardAPI = () => {
  if (!navigator.clipboard) {
    console.warn('Clipboard API 不可用，可能需要 HTTPS')
    return false
  }
  return true
}
```
:::

::: details ❓ Q3: 代码块样式异常？
**A3:** 检查 CSS 冲突：

```scss
// 确保代码块样式不被全局样式覆盖
.c-code-wrapper {
  .n-code {
    font-family: 'Fira Code', 'Consolas', monospace !important;
    line-height: 1.5 !important;
  }
}
```
:::

::: details ❓ Q4: 全屏模式样式问题？
**A4:** 检查 z-index 层级：

```scss
// 确保全屏模态框在最顶层
.fullscreen-content {
  z-index: 9999;
  position: relative;
}
```
:::

## 🎯 最佳实践

### 1. 代码内容管理

```javascript
// ✅ 推荐：标准化的代码片段结构
interface CodeSnippet {
  id: string
  title: string
  description: string
  language: string
  code: string
  tags: string[]
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  createdAt: Date
  updatedAt: Date
}

// 创建代码片段的工厂函数
const createCodeSnippet = (data: Partial<CodeSnippet>): CodeSnippet => {
  return {
    id: data.id || generateUniqueId(),
    title: data.title || '未命名代码片段',
    description: data.description || '',
    language: data.language || 'text',
    code: data.code || '',
    tags: data.tags || [],
    category: data.category || 'misc',
    difficulty: data.difficulty || 'beginner',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date()
  }
}
```

### 2. 性能优化策略

```vue
<template>
  <!-- 使用 v-memo 优化大量代码块渲染 -->
  <div
    v-for="snippet in codeSnippets"
    :key="snippet.id"
    v-memo="[snippet.code, snippet.language, snippet.title]"
  >
    <C_Code
      :code="snippet.code"
      :language="snippet.language"
      :title="snippet.title"
    />
  </div>
</template>

<script setup>
// 使用防抖优化搜索
const debouncedSearch = debounce((term) => {
  searchCodeSnippets(term)
}, 300)

// 虚拟化长列表
const visibleSnippets = computed(() => {
  if (allSnippets.value.length > 50) {
    return allSnippets.value.slice(
      virtualScrollState.startIndex,
      virtualScrollState.endIndex
    )
  }
  return allSnippets.value
})
</script>
```

### 3. 主题和样式定制

```scss
// 创建可复用的主题变量
:root {
  --code-bg: #ffffff;
  --code-text: #333333;
  --code-keyword: #0000ff;
  --code-string: #008000;
  --code-comment: #808080;
  --code-number: #ff6600;
}

[data-theme='dark'] {
  --code-bg: #1e1e1e;
  --code-text: #d4d4d4;
  --code-keyword: #569cd6;
  --code-string: #ce9178;
  --code-comment: #6a9955;
  --code-number: #b5cea8;
}

// 组件样式
.c-code-wrapper {
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;

  .hljs-keyword { color: var(--code-keyword); }
  .hljs-string { color: var(--code-string); }
  .hljs-comment { color: var(--code-comment); }
  .hljs-number { color: var(--code-number); }
}
```

### 4. 错误处理和用户体验

```vue
<script setup>
const codeState = reactive({
  loading: false,
  error: null,
  code: '',
  language: 'javascript',
})

// 带错误处理的代码加载
const loadCodeWithErrorHandling = async (source) => {
  codeState.loading = true
  codeState.error = null

  try {
    const code = await fetchCodeFromSource(source)
    codeState.code = code

    // 验证代码内容
    if (code.length > 50000) {
      message.warning('代码内容较长，可能影响性能')
    }
  } catch (error) {
    codeState.error = error.message
    message.error('代码加载失败: ' + error.message)
    codeState.code = '// 代码加载失败，请稍后重试'
  } finally {
    codeState.loading = false
  }
}

// 复制功能的完整错误处理
const handleCopyWithErrorHandling = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    message.success('代码已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    message.error('自动复制失败，请手动复制代码')
  }
}
</script>
```

## 📝 更新日志

### v1.0.0 (2025-07-19)

- ✨ 基于 Naive UI NCode 的完整组件封装
- ✨ 支持 30+ 种编程语言高亮显示
- ✨ 内置一键复制和全屏查看功能
- ✨ 动态语言包加载，按需引入
- ✨ 丰富的编程语言图标映射
- ✨ 悬浮复制按钮和智能交互
- ✨ ESC 键快捷操作支持
- ✨ 完整的 TypeScript 类型定义
- ✨ 自定义主题和样式配置
- ✨ 高性能代码渲染引擎

<!--@include: ./snippets/contribute.md -->

**💡 提示**: 这个代码高亮组件基于强大的 highlight.js 库构建，提供了完整的代码展示和交互功能。支持多种编程语言、主题定制、一键复制等特性，适用于技术文档、代码教程、API 文档等各种代码展示场景。无论是简单的代码片段还是复杂的代码对比，都能提供专业级的代码高亮体验。结合 TypeScript 支持和高度可定制的配置，让代码展示既美观又实用。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更优雅的代码展示体验！ 🎨