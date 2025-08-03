---
outline: 'deep'
---

# C_Code 代码高亮组件

> 🎨 基于 Naive UI 的高效代码高亮组件，让代码展示变得专业而优雅

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

```vue
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

```vue
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

interface Permission {
  id: number
  action: string
  resource: string
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
    },
    python: {
      title: 'Python 数据处理',
      code: `
# Python 数据处理示例
import pandas as pd
import numpy as np
from typing import List, Dict, Optional

class DataAnalyzer:
    """数据分析器类"""

    def __init__(self, data: pd.DataFrame):
        self.data = data
        self.results: Dict[str, any] = {}

    def analyze_user_behavior(self) -> Dict[str, float]:
        """分析用户行为数据"""
        # 计算基础统计信息
        stats = {
            'total_users': len(self.data),
            'avg_session_duration': self.data['session_duration'].mean(),
            'bounce_rate': (self.data['page_views'] == 1).sum() / len(self.data),
            'conversion_rate': self.data['converted'].sum() / len(self.data)
        }

        # 用户分群分析
        high_value_users = self.data[
            (self.data['revenue'] > self.data['revenue'].quantile(0.8)) &
            (self.data['session_duration'] > 300)
        ]

        stats['high_value_user_ratio'] = len(high_value_users) / len(self.data)

        self.results.update(stats)
        return stats

    def generate_insights(self) -> List[str]:
        """生成数据洞察"""
        insights = []

        if self.results.get('bounce_rate', 0) > 0.7:
            insights.append("跳出率较高，需要优化页面内容")

        if self.results.get('conversion_rate', 0) < 0.05:
            insights.append("转化率偏低，建议优化转化流程")

        return insights

# 使用示例
data = pd.read_csv('user_behavior.csv')
analyzer = DataAnalyzer(data)
results = analyzer.analyze_user_behavior()
insights = analyzer.generate_insights()

print("分析结果:", results)
print("改进建议:", insights)
`
    },
    vue: {
      title: 'Vue 3 组件示例',
      code: `
<template>
  <div class="user-profile">
    <div class="profile-header">
      <img :src="user.avatar" :alt="user.name" class="avatar" />
      <div class="user-info">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
        <n-tag :type="user.isActive ? 'success' : 'default'">
          {{ user.isActive ? '在线' : '离线' }}
        </n-tag>
      </div>
    </div>

    <div class="profile-stats">
      <div v-for="stat in userStats" :key="stat.label" class="stat-item">
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <div class="profile-actions">
      <n-button type="primary" @click="sendMessage">
        发送消息
      </n-button>
      <n-button @click="viewProfile">
        查看详情
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  avatar: string
  isActive: boolean
}

interface UserStat {
  label: string
  value: string | number
}

const props = defineProps<{
  userId: number
}>()

const emit = defineEmits<{
  message: [userId: number]
  viewProfile: [userId: number]
}>()

const user = ref<User | null>(null)
const loading = ref(false)

const userStats = computed((): UserStat[] => [
  { label: '关注者', value: '1.2K' },
  { label: '关注中', value: '234' },
  { label: '帖子', value: '89' },
  { label: '点赞', value: '3.4K' }
])

const fetchUser = async () => {
  loading.value = true
  try {
    const response = await userApi.getUser(props.userId)
    user.value = response.data
  } finally {
    loading.value = false
  }
}

const sendMessage = () => {
  emit('message', props.userId)
}

const viewProfile = () => {
  emit('viewProfile', props.userId)
}

onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
.user-profile {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 16px;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  text-align: center;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 6px;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #666;
}
</style>
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

<style scoped>
  .code-examples {
    padding: 20px;
  }
</style>
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

| 语言           | 标识符       | 图标 |
| -------------- | ------------ | ---- |
| **JavaScript** | `javascript` | 🟨   |
| **TypeScript** | `typescript` | 🔷   |
| **Python**     | `python`     | 🐍   |
| **Java**       | `java`       | ☕   |
| **C++**        | `cpp`        | ⚡   |
| **Go**         | `go`         | 🐹   |
| **Rust**       | `rust`       | 🦀   |
| **PHP**        | `php`        | 🐘   |
| **C#**         | `csharp`     | 💙   |
| **HTML**       | `html`       | 🌐   |
| **CSS**        | `css`        | 🎨   |
| **Vue**        | `vue`        | 💚   |
| **React**      | `react`      | ⚛️   |
| **JSON**       | `json`       | 📄   |
| **SQL**        | `sql`        | 🗃️   |
| **Bash**       | `bash`       | 💻   |
| **YAML**       | `yaml`       | 📋   |
| **XML**        | `xml`        | 📑   |
| **Markdown**   | `markdown`   | 📝   |

## 🎨 使用示例

### 场景 1: 技术文档展示

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

      <!-- SDK 示例 -->
      <n-card title="SDK 使用示例">
        <n-tabs type="line">
          <n-tab-pane name="vue" tab="Vue 3">
            <C_Code
              :code="sdkExamples.vue"
              language="vue"
              title="Vue 3 Composition API"
              :show-fullscreen="true"
              @copy="handleCopy"
              @fullscreen="handleFullscreen"
            />
          </n-tab-pane>
          <n-tab-pane name="react" tab="React">
            <C_Code
              :code="sdkExamples.react"
              language="react"
              title="React Hooks"
              :show-fullscreen="true"
              @copy="handleCopy"
            />
          </n-tab-pane>
        </n-tabs>
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

    def update_user(self, user_id: int, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """更新用户信息"""
        return self._request('PUT', f'/users/{user_id}', json=user_data)

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
          "website": "https://johndoe.dev",
          "social": {
            "github": "johndoe",
            "twitter": "john_doe_dev",
            "linkedin": "johndoe"
          }
        },
        "preferences": {
          "theme": "dark",
          "language": "en",
          "timezone": "America/Los_Angeles",
          "notifications": {
            "email": true,
            "push": false,
            "sms": false
          }
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

  const sdkExamples = {
    vue: `<template>
  <div class="user-manager">
    <div class="header">
      <h2>用户管理</h2>
      <n-button @click="refreshUsers" :loading="loading">
        刷新
      </n-button>
    </div>

    <n-data-table
      :columns="columns"
      :data="users"
      :loading="loading"
      :pagination="pagination"
      @update:page="handlePageChange"
    />

    <!-- 用户详情模态框 -->
    <n-modal v-model:show="showUserModal" preset="dialog">
      <template #header>
        <span>{{ editingUser ? '编辑用户' : '新增用户' }}</span>
      </template>

      <UserForm
        v-model:user="currentUser"
        :loading="submitting"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'
import type { User, UserFilters } from '@/types/user'

const {
  users,
  loading,
  pagination,
  filters,
  refreshUsers,
  createUser,
  updateUser,
  deleteUser
} = useUsers()

const showUserModal = ref(false)
const editingUser = ref<User | null>(null)
const currentUser = ref<Partial<User>>({})
const submitting = ref(false)

const columns = [
  {
    title: '用户名',
    key: 'name',
    render: (row: User) => h('span', { class: 'font-medium' }, row.name)
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '角色',
    key: 'role',
    render: (row: User) => h(NTag, {
      type: row.role === 'admin' ? 'error' : 'default'
    }, row.role)
  },
  {
    title: '状态',
    key: 'status',
    render: (row: User) => h(NTag, {
      type: row.status === 'active' ? 'success' : 'warning'
    }, row.status === 'active' ? '活跃' : '禁用')
  },
  {
    title: '操作',
    key: 'actions',
    render: (row: User) => h(NSpace, [
      h(NButton, {
        size: 'small',
        onClick: () => editUser(row)
      }, '编辑'),
      h(NButton, {
        size: 'small',
        type: 'error',
        onClick: () => handleDelete(row)
      }, '删除')
    ])
  }
]

const editUser = (user: User) => {
  editingUser.value = user
  currentUser.value = { ...user }
  showUserModal.value = true
}

const handleSubmit = async (userData: Partial<User>) => {
  submitting.value = true
  try {
    if (editingUser.value) {
      await updateUser(editingUser.value.id, userData)
    } else {
      await createUser(userData as Omit<User, 'id'>)
    }
    closeModal()
    await refreshUsers()
  } finally {
    submitting.value = false
  }
}

const handleDelete = async (user: User) => {
  // 确认删除逻辑
  await deleteUser(user.id)
  await refreshUsers()
}

const closeModal = () => {
  showUserModal.value = false
  editingUser.value = null
  currentUser.value = {}
}

const handlePageChange = (page: number) => {
  pagination.value.current = page
  refreshUsers()
}

// 初始化加载
onMounted(() => {
  refreshUsers()
})
</script>`,

    react: `import React, { useState, useEffect, useCallback } from 'react'
import { Button, Table, Modal, Form, Input, Select, Tag, Space, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import { useUsers } from '../hooks/useUsers'
import type { User, UserFormData } from '../types/user'

const { Option } = Select

export const UserManager: React.FC = () => {
  const {
    users,
    loading,
    pagination,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  } = useUsers()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form] = Form.useForm()

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'default'}>
          {role}
        </Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'orange'}>
          {status === 'active' ? '活跃' : '禁用'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ]

  const handleEdit = (user: User) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleSubmit = async (values: UserFormData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, values)
        message.success('用户更新成功')
      } else {
        await createUser(values)
        message.success('用户创建成功')
      }
      setIsModalOpen(false)
      fetchUsers()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const handleDelete = async (user: User) => {
    Modal.confirm({
      title: '确认删除',
      content: \`确定要删除用户 "\${user.name}" 吗？\`,
      onOk: async () => {
        try {
          await deleteUser(user.id)
          message.success('用户删除成功')
          fetchUsers()
        } catch (error) {
          message.error('删除失败')
        }
      }
    })
  }

  const handleTableChange = (pagination: any) => {
    fetchUsers({
      page: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  const refreshUsers = useCallback(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="user-manager">
      <div className="header mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">用户管理</h2>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={refreshUsers}
            loading={loading}
          >
            刷新
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增用户
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            \`第 \${range[0]}-\${range[1]} 条，共 \${total} 条\`
        }}
        onChange={handleTableChange}
        rowKey="id"
      />

      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="pt-4"
        >
          <Form.Item
            name="name"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式不正确' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="user">普通用户</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="active">活跃</Option>
              <Option value="inactive">禁用</Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? '更新' : '创建'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}`
  }

  const generateExample = () => {
    // 根据选择的 API 生成对应示例
    message.success(`已生成 ${selectedApi.value} API 示例`)
  }

  const handleCopy = (code) => {
    message.success(`已复制 ${code.length} 个字符到剪贴板`)
  }

  const handleFullscreen = (isFullscreen) => {
    message.info(isFullscreen ? '已进入全屏模式' : '已退出全屏模式')
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

### 场景 2: 代码教程展示

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
              <h3>{{ message }}</h3>
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

            <div v-if="currentStep === 3" class="demo-lifecycle">
              <p>组件已挂载 {{ mountedTime }} 秒</p>
              <n-button @click="resetTimer">重置计时器</n-button>
            </div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
  const message = useMessage()
  const currentStep = ref(0)

  // 示例数据
  const inputValue = ref('')
  const num1 = ref(0)
  const num2 = ref(0)
  const mountedTime = ref(0)
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
import { ref } from 'vue'

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
    },
    {
      title: '生命周期',
      description: '学习 Vue 3 组件的生命周期钩子函数。',
      keyPoints: [
        'onMounted 在组件挂载后执行',
        'onUnmounted 在组件卸载前执行',
        '生命周期钩子用于处理副作用'
      ],
      language: 'vue',
      codeTitle: '生命周期钩子',
      code: `<template>
  <div>
    <p>组件已挂载 {{ mountedTime }} 秒</p>
    <button @click="resetTimer">重置计时器</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mountedTime = ref(0)
let timer = null

// 组件挂载后执行
onMounted(() => {
  console.log('组件已挂载')

  // 启动计时器
  timer = setInterval(() => {
    mountedTime.value++
  }, 1000)
})

// 组件卸载前执行
onUnmounted(() => {
  console.log('组件即将卸载')

  // 清理计时器
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 重置计时器
const resetTimer = () => {
  mountedTime.value = 0
}
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

  const resetTimer = () => {
    mountedTime.value = 0
  }

  const handleCopy = (code) => {
    message.success('代码已复制到剪贴板')
  }

  // 计时器逻辑
  let timer = null
  onMounted(() => {
    timer = setInterval(() => {
      mountedTime.value++
    }, 1000)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })
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

  .demo-basic, .demo-reactive, .demo-computed, .demo-lifecycle {
    padding: 16px;
  }

  .demo-basic h3 {
    color: #1890ff;
    margin-bottom: 16px;
  }

  .demo-reactive input, .demo-computed input {
    margin-bottom: 12px;
    width: 100%;
  }

  .demo-computed input {
    margin-right: 8px;
    width: calc(50% - 4px);
  }
</style>
```

### 场景 3: 代码对比工具

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
        <n-button @click="copyDifferences">
          复制差异
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
            :title="currentComparison.leftTitle"
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
            :title="currentComparison.rightTitle"
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

    <!-- 差异详情 -->
    <n-card class="mt-16px" title="详细差异">
      <n-collapse>
        <n-collapse-item
          v-for="(diff, index) in detailedDifferences"
          :key="index"
          :title="diff.title"
        >
          <div class="diff-content">
            <div class="diff-description">{{ diff.description }}</div>

            <div v-if="diff.example" class="diff-example">
              <h5>示例代码:</h5>
              <C_Code
                :code="diff.example"
                :language="currentComparison.language"
                :show-header="false"
                @copy="handleCopy"
              />
            </div>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>

<script setup>
  const message = useMessage()
  const selectedComparison = ref('vue-options-composition')

  const comparisonOptions = [
    { label: 'Vue Options API vs Composition API', value: 'vue-options-composition' },
    { label: 'JavaScript vs TypeScript', value: 'js-ts' },
    { label: 'React Class vs Hooks', value: 'react-class-hooks' },
    { label: 'CSS vs Tailwind', value: 'css-tailwind' }
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
      <select v-model="selectedRole">
        <option value="">所有角色</option>
        <option value="admin">管理员</option>
        <option value="user">普通用户</option>
      </select>
    </div>

    <div class="user-grid">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="user-card"
        @click="selectUser(user)"
      >
        <img :src="user.avatar" :alt="user.name" />
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <span class="role">{{ user.role }}</span>
      </div>
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',

  data() {
    return {
      users: [],
      searchTerm: '',
      selectedRole: '',
      loading: false,
      selectedUser: null
    }
  },

  computed: {
    filteredUsers() {
      let filtered = this.users

      if (this.searchTerm) {
        filtered = filtered.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }

      if (this.selectedRole) {
        filtered = filtered.filter(user => user.role === this.selectedRole)
      }

      return filtered
    }
  },

  watch: {
    searchTerm(newTerm) {
      this.debouncedSearch(newTerm)
    }
  },

  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await this.$http.get('/api/users')
        this.users = response.data
      } catch (error) {
        this.$message.error('获取用户列表失败')
      } finally {
        this.loading = false
      }
    },

    selectUser(user) {
      this.selectedUser = user
      this.$emit('user-selected', user)
    },

    debouncedSearch: debounce(function(term) {
      console.log('搜索用户:', term)
    }, 300)
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
      <select v-model="selectedRole">
        <option value="">所有角色</option>
        <option value="admin">管理员</option>
        <option value="user">普通用户</option>
      </select>
    </div>

    <div class="user-grid">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="user-card"
        @click="selectUser(user)"
      >
        <img :src="user.avatar" :alt="user.name" />
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <span class="role">{{ user.role }}</span>
      </div>
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { debounce } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { useUsers } from '@/composables/useUsers'

// 响应式数据
const searchTerm = ref('')
const selectedRole = ref('')
const selectedUser = ref(null)

// 使用组合式函数
const { users, loading, fetchUsers } = useUsers()
const message = useMessage()

// 计算属性
const filteredUsers = computed(() => {
  let filtered = users.value

  if (searchTerm.value) {
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (selectedRole.value) {
    filtered = filtered.filter(user => user.role === selectedRole.value)
  }

  return filtered
})

// 事件定义
const emit = defineEmits(['user-selected'])

// 监听器
const debouncedSearch = debounce((term) => {
  console.log('搜索用户:', term)
}, 300)

watch(searchTerm, (newTerm) => {
  debouncedSearch(newTerm)
})

// 方法
const selectUser = (user) => {
  selectedUser.value = user
  emit('user-selected', user)
}

// 生命周期
onMounted(async () => {
  try {
    await fetchUsers()
  } catch (error) {
    message.error('获取用户列表失败')
  }
})
</script>`
    },

    'js-ts': {
      leftTitle: 'JavaScript (ES6+)',
      rightTitle: 'TypeScript',
      language: 'typescript',
      leftCode: `// JavaScript 用户管理类
export class UserManager {
  constructor(apiClient) {
    this.apiClient = apiClient
    this.users = []
    this.cache = new Map()
  }

  async fetchUsers(filters = {}) {
    const cacheKey = JSON.stringify(filters)

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      const response = await this.apiClient.get('/users', { params: filters })
      const users = response.data

      this.cache.set(cacheKey, users)
      this.users = users

      return users
    } catch (error) {
      console.error('获取用户失败:', error)
      throw new Error('用户数据加载失败')
    }
  }

  async createUser(userData) {
    if (!userData.name || !userData.email) {
      throw new Error('用户名和邮箱是必需的')
    }

    const response = await this.apiClient.post('/users', userData)
    const newUser = response.data

    this.users.push(newUser)
    this.clearCache()

    return newUser
  }

  async updateUser(id, userData) {
    const userIndex = this.users.findIndex(user => user.id === id)

    if (userIndex === -1) {
      throw new Error('用户不存在')
    }

    const response = await this.apiClient.put(\`/users/\${id}\`, userData)
    const updatedUser = response.data

    this.users[userIndex] = updatedUser
    this.clearCache()

    return updatedUser
  }

  findUsersByRole(role) {
    return this.users.filter(user => user.role === role)
  }

  clearCache() {
    this.cache.clear()
  }
}`,

      rightCode: `// TypeScript 用户管理类
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

interface UserFilters {
  role?: string
  status?: 'active' | 'inactive'
  search?: string
  page?: number
  limit?: number
}

interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

interface ApiClient {
  get<T>(url: string, config?: { params?: Record<string, any> }): Promise<ApiResponse<T>>
  post<T>(url: string, data: any): Promise<ApiResponse<T>>
  put<T>(url: string, data: any): Promise<ApiResponse<T>>
  delete(url: string): Promise<ApiResponse<void>>
}

export class UserManager {
  private users: User[] = []
  private cache = new Map<string, User[]>()

  constructor(private apiClient: ApiClient) {}

  async fetchUsers(filters: UserFilters = {}): Promise<User[]> {
    const cacheKey = JSON.stringify(filters)

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      const response = await this.apiClient.get<User[]>('/users', { params: filters })
      const users = response.data

      this.cache.set(cacheKey, users)
      this.users = users

      return users
    } catch (error) {
      console.error('获取用户失败:', error)
      throw new Error('用户数据加载失败')
    }
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    if (!userData.name || !userData.email) {
      throw new Error('用户名和邮箱是必需的')
    }

    const response = await this.apiClient.post<User>('/users', userData)
    const newUser = response.data

    this.users.push(newUser)
    this.clearCache()

    return newUser
  }

  async updateUser(id: number, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id)

    if (userIndex === -1) {
      throw new Error('用户不存在')
    }

    const response = await this.apiClient.put<User>(\`/users/\${id}\`, userData)
    const updatedUser = response.data

    this.users[userIndex] = updatedUser
    this.clearCache()

    return updatedUser
  }

  findUsersByRole(role: User['role']): User[] {
    return this.users.filter(user => user.role === role)
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id)
  }

  private clearCache(): void {
    this.cache.clear()
  }
}`
    }
  }

  const currentComparison = computed(() =>
    comparisons[selectedComparison.value] || comparisons['vue-options-composition']
  )

  const detailedDifferences = computed(() => {
    const key = selectedComparison.value

    const differences = {
      'vue-options-composition': [
        {
          title: '导入方式变化',
          description: 'Composition API 需要显式导入所需的函数，而 Options API 通过 this 访问。',
          example: `// Composition API
import { ref, computed, watch, onMounted } from 'vue'

// Options API
// 通过 this.xxx 直接访问`
        },
        {
          title: '数据定义方式',
          description: 'Composition API 使用 ref/reactive 创建响应式数据，Options API 在 data 函数中返回。',
          example: `// Composition API
const searchTerm = ref('')
const users = ref([])

// Options API
data() {
  return {
    searchTerm: '',
    users: []
  }
}`
        },
        {
          title: '逻辑组织方式',
          description: 'Composition API 可以将相关逻辑组织在一起，Options API 按照选项类型分组。',
          example: `// Composition API - 用户相关逻辑集中
const { users, loading, fetchUsers } = useUsers()

// Options API - 按选项类型分散
data() { /* 数据 */ },
methods: { /* 方法 */ },
computed: { /* 计算属性 */ }`
        }
      ],
      'js-ts': [
        {
          title: '类型定义',
          description: 'TypeScript 提供完整的类型定义，JavaScript 依赖运行时检查。',
          example: `// TypeScript
interface User {
  id: number
  name: string
  email: string
}

// JavaScript
// 无编译时类型检查`
        },
        {
          title: '函数参数类型',
          description: 'TypeScript 明确指定参数和返回值类型，JavaScript 需要文档或注释说明。',
          example: `// TypeScript
async createUser(userData: Omit<User, 'id'>): Promise<User>

// JavaScript
async createUser(userData) // 类型不明确`
        }
      ]
    }

    return differences[key] || []
  })

  const getDifferenceCount = () => {
    const leftLines = currentComparison.value.leftCode.split('\n').length
    const rightLines = currentComparison.value.rightCode.split('\n').length
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
    const temp = current.leftCode
    current.leftCode = current.rightCode
    current.rightCode = temp

    const tempTitle = current.leftTitle
    current.leftTitle = current.rightTitle
    current.rightTitle = tempTitle

    message.success('代码块已交换')
  }

  const copyDifferences = () => {
    const differences = detailedDifferences.value
      .map(diff => `${diff.title}: ${diff.description}`)
      .join('\n')

    navigator.clipboard.writeText(differences)
    message.success('差异详情已复制到剪贴板')
  }

  const handleCopy = (code) => {
    message.success('代码已复制到剪贴板')
  }
</script>

<style scoped>
  .code-comparison {
    padding: 24px;
  }

  .diff-content {
    padding: 12px 0;
  }

  .diff-description {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    margin-bottom: 12px;
  }

  .diff-example h5 {
    margin: 0 0 8px 0;
    font-size: 13px;
    color: #333;
    font-weight: 600;
  }
</style>
```

## 🛠️ 高级用法

### 动态语言加载

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
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
}

#[derive(Debug)]
struct UserManager {
    users: HashMap<u32, User>,
    next_id: u32,
}

impl UserManager {
    fn new() -> Self {
        UserManager {
            users: HashMap::new(),
            next_id: 1,
        }
    }
    
    fn create_user(&mut self, name: String, email: String) -> &User {
        let user = User {
            id: self.next_id,
            name,
            email,
        };
        
        self.users.insert(self.next_id, user);
        let created_user = self.users.get(&self.next_id).unwrap();
        self.next_id += 1;
        
        created_user
    }
    
    fn get_user(&self, id: u32) -> Option<&User> {
        self.users.get(&id)
    }
    
    fn list_users(&self) -> Vec<&User> {
        self.users.values().collect()
    }
}

fn main() {
    let mut manager = UserManager::new();
    
    let user1 = manager.create_user(
        "Alice".to_string(),
        "alice@example.com".to_string()
    );
    
    println!("Created user: {:?}", user1);
    
    let users = manager.list_users();
    println!("All users: {:?}", users);
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
    dynamicCode.value =
      codeExamples[selectedLanguage.value] || '// 暂无示例代码'
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

### 自定义主题和样式

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
      <n-button @click="applyCustomTheme"> 应用自定义主题 </n-button>
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
  --code-function: #dcdcaa;
  --border-radius: 8px;
  --header-bg: #2d2d30;
}

.c-code-wrapper {
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.c-code-header {
  background: var(--header-bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.c-code-content .n-code {
  background: var(--code-bg) !important;
  color: var(--code-text) !important;
}

/* 语法高亮颜色 */
.hljs-keyword { color: var(--code-keyword); }
.hljs-string { color: var(--code-string); }
.hljs-comment { color: var(--code-comment); }
.hljs-number { color: var(--code-number); }
.hljs-function { color: var(--code-function); }`

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
  message.success(
    `已应用 ${
      themeOptions.find((t) => t.value === selectedTheme.value)?.label
    } 主题`
  )
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

### 代码片段管理器

```vue
<template>
  <div class="snippet-manager">
    <n-card title="代码片段管理器" style="margin-bottom: 16px;">
      <n-space>
        <n-button @click="showAddModal = true" type="primary">
          添加片段
        </n-button>
        <n-button @click="importSnippets"> 导入片段 </n-button>
        <n-button @click="exportSnippets"> 导出片段 </n-button>
        <n-input
          v-model:value="searchTerm"
          placeholder="搜索代码片段..."
          style="width: 200px"
        >
          <template #prefix>
            <div class="i-mdi:magnify"></div>
          </template>
        </n-input>
      </n-space>
    </n-card>

    <n-grid cols="1 600:2 900:3" x-gap="16" y-gap="16">
      <n-grid-item v-for="snippet in filteredSnippets" :key="snippet.id">
        <n-card size="small">
          <template #header>
            <div class="snippet-header">
              <span class="snippet-title">{{ snippet.title }}</span>
              <div class="snippet-meta">
                <n-tag
                  size="small"
                  :color="{ color: getLanguageColor(snippet.language) }"
                >
                  {{ snippet.language }}
                </n-tag>
                <span class="snippet-date">{{
                  formatDate(snippet.createdAt)
                }}</span>
              </div>
            </div>
          </template>

          <template #header-extra>
            <n-dropdown
              :options="getSnippetMenuOptions(snippet)"
              @select="handleSnippetAction"
            >
              <n-button size="tiny" quaternary>
                <template #icon>
                  <div class="i-mdi:dots-vertical"></div>
                </template>
              </n-button>
            </n-dropdown>
          </template>

          <div class="snippet-content">
            <p class="snippet-description">{{ snippet.description }}</p>

            <C_Code
              :code="snippet.code"
              :language="snippet.language"
              :show-header="false"
              :max-height="200"
              @copy="() => handleSnippetCopy(snippet)"
            />

            <div class="snippet-tags" v-if="snippet.tags?.length">
              <n-tag
                v-for="tag in snippet.tags"
                :key="tag"
                size="small"
                style="margin-right: 4px;"
              >
                {{ tag }}
              </n-tag>
            </div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- 添加/编辑片段模态框 -->
    <n-modal v-model:show="showAddModal" preset="dialog" style="width: 800px;">
      <template #header>
        <span>{{ editingSnippet ? '编辑片段' : '添加片段' }}</span>
      </template>

      <div class="add-snippet-form">
        <n-form :model="snippetForm" label-placement="top">
          <n-grid cols="2" x-gap="16">
            <n-grid-item>
              <n-form-item label="标题" path="title">
                <n-input
                  v-model:value="snippetForm.title"
                  placeholder="片段标题"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="语言" path="language">
                <n-select
                  v-model:value="snippetForm.language"
                  :options="languageOptions"
                  placeholder="选择语言"
                />
              </n-form-item>
            </n-grid-item>
          </n-grid>

          <n-form-item label="描述" path="description">
            <n-input
              v-model:value="snippetForm.description"
              type="textarea"
              placeholder="片段描述"
              :rows="2"
            />
          </n-form-item>

          <n-form-item label="代码" path="code">
            <n-input
              v-model:value="snippetForm.code"
              type="textarea"
              placeholder="在这里输入代码..."
              :rows="10"
              style="font-family: 'Fira Code', 'Consolas', monospace;"
            />
          </n-form-item>

          <n-form-item label="标签" path="tags">
            <n-dynamic-tags v-model:value="snippetForm.tags" />
          </n-form-item>
        </n-form>

        <div class="form-actions">
          <n-space>
            <n-button @click="closeAddModal">取消</n-button>
            <n-button @click="saveSnippet" type="primary">
              {{ editingSnippet ? '更新' : '保存' }}
            </n-button>
          </n-space>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
const message = useMessage()
const dialog = useDialog()

const searchTerm = ref('')
const showAddModal = ref(false)
const editingSnippet = ref(null)

const snippetForm = reactive({
  title: '',
  language: 'javascript',
  description: '',
  code: '',
  tags: [],
})

const languageOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'SQL', value: 'sql' },
  { label: 'Bash', value: 'bash' },
]

const snippets = ref([
  {
    id: 1,
    title: 'Vue 3 响应式数据',
    description: 'Vue 3 Composition API 中创建响应式数据的基本模式',
    language: 'javascript',
    code: `import { ref, reactive, computed } from 'vue'

// 基本响应式数据
const count = ref(0)
const message = ref('Hello Vue 3!')

// 响应式对象
const state = reactive({
  user: null,
  loading: false,
  error: null
})

// 计算属性
const doubleCount = computed(() => count.value * 2)`,
    tags: ['vue', 'composition-api', 'reactive'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: 'JavaScript 防抖函数',
    description: '实现防抖功能的工具函数，用于优化高频事件处理',
    language: 'javascript',
    code: `function debounce(func, wait, immediate = false) {
  let timeout
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(this, args)
  }
}

// 使用示例
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query)
}, 300)`,
    tags: ['javascript', 'utility', 'performance'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: 'CSS Flexbox 居中',
    description: '使用 Flexbox 实现各种居中布局的常用模式',
    language: 'css',
    code: `/* 水平和垂直居中 */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 水平居中，垂直顶部对齐 */
.flex-center-top {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2rem;
}

/* 垂直居中，水平分散 */
.flex-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}`,
    tags: ['css', 'flexbox', 'layout'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
])

const filteredSnippets = computed(() => {
  if (!searchTerm.value) {
    return snippets.value
  }

  const term = searchTerm.value.toLowerCase()
  return snippets.value.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(term) ||
      snippet.description.toLowerCase().includes(term) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(term)) ||
      snippet.language.toLowerCase().includes(term)
  )
})

const getLanguageColor = (language) => {
  const colors = {
    javascript: '#f7df1e',
    typescript: '#3178c6',
    python: '#3776ab',
    java: '#ed8b00',
    go: '#00add8',
    rust: '#ce422b',
    html: '#e34f26',
    css: '#1572b6',
    sql: '#336791',
    bash: '#4eaa25',
  }
  return colors[language] || '#666666'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  })
}

const getSnippetMenuOptions = (snippet) => {
  return [
    { label: '编辑', key: 'edit', snippet },
    { label: '复制', key: 'copy', snippet },
    { label: '分享', key: 'share', snippet },
    { type: 'divider' },
    { label: '删除', key: 'delete', snippet },
  ]
}

const handleSnippetAction = (key, option) => {
  const snippet = option.snippet

  switch (key) {
    case 'edit':
      editSnippet(snippet)
      break
    case 'copy':
      handleSnippetCopy(snippet)
      break
    case 'share':
      shareSnippet(snippet)
      break
    case 'delete':
      deleteSnippet(snippet)
      break
  }
}

const handleSnippetCopy = (snippet) => {
  navigator.clipboard.writeText(snippet.code)
  message.success(`"${snippet.title}" 代码已复制`)
}

const editSnippet = (snippet) => {
  editingSnippet.value = snippet
  Object.assign(snippetForm, {
    title: snippet.title,
    language: snippet.language,
    description: snippet.description,
    code: snippet.code,
    tags: [...snippet.tags],
  })
  showAddModal.value = true
}

const shareSnippet = (snippet) => {
  const shareData = {
    title: snippet.title,
    text: snippet.description,
    url: `data:text/plain;charset=utf-8,${encodeURIComponent(snippet.code)}`,
  }

  if (navigator.share) {
    navigator.share(shareData)
  } else {
    navigator.clipboard.writeText(snippet.code)
    message.success('代码已复制到剪贴板')
  }
}

const deleteSnippet = (snippet) => {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除代码片段 "${snippet.title}" 吗？`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      const index = snippets.value.findIndex((s) => s.id === snippet.id)
      if (index > -1) {
        snippets.value.splice(index, 1)
        message.success('代码片段已删除')
      }
    },
  })
}

const saveSnippet = () => {
  if (!snippetForm.title || !snippetForm.code) {
    message.error('标题和代码不能为空')
    return
  }

  if (editingSnippet.value) {
    // 更新现有片段
    const index = snippets.value.findIndex(
      (s) => s.id === editingSnippet.value.id
    )
    if (index > -1) {
      snippets.value[index] = {
        ...editingSnippet.value,
        ...snippetForm,
        updatedAt: new Date(),
      }
      message.success('代码片段已更新')
    }
  } else {
    // 添加新片段
    const newSnippet = {
      id: Date.now(),
      ...snippetForm,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    snippets.value.push(newSnippet)
    message.success('代码片段已保存')
  }

  closeAddModal()
}

const closeAddModal = () => {
  showAddModal.value = false
  editingSnippet.value = null
  Object.assign(snippetForm, {
    title: '',
    language: 'javascript',
    description: '',
    code: '',
    tags: [],
  })
}

const exportSnippets = () => {
  const dataStr = JSON.stringify(snippets.value, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `code-snippets-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('代码片段已导出')
}

const importSnippets = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSnippets = JSON.parse(e.target.result)
        if (Array.isArray(importedSnippets)) {
          snippets.value.push(...importedSnippets)
          message.success(`成功导入 ${importedSnippets.length} 个代码片段`)
        } else {
          message.error('文件格式不正确')
        }
      } catch (error) {
        message.error('导入失败: ' + error.message)
      }
    }
    reader.readAsText(file)
  }
  input.click()
}
</script>

<style scoped>
.snippet-manager {
  padding: 24px;
}

.snippet-header {
  width: 100%;
}

.snippet-title {
  font-weight: 600;
  font-size: 14px;
}

.snippet-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.snippet-date {
  font-size: 12px;
  color: #999;
}

.snippet-content {
  padding: 12px 0;
}

.snippet-description {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 12px;
}

.snippet-tags {
  margin-top: 12px;
}

.add-snippet-form {
  padding: 20px 0;
}

.form-actions {
  text-align: right;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>
```

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
  // 移除潜在的恶意脚本标签
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
  :max-height="400"  <!-- 限制高度避免渲染过多内容 -->
/>

<!-- ❌ 不推荐：显示超大代码块而不限制高度 -->
<C_Code
  :code="veryLargeCode"  <!-- 可能导致性能问题 -->
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

### 常见问题

#### Q1: 语言高亮不生效？

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

#### Q2: 复制功能在某些浏览器不工作？

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

#### Q3: 代码块样式异常？

**A3:** 检查 CSS 冲突：

```scss
// 确保代码块样式不被全局样式覆盖
.c-code-wrapper {
  // 使用更高的特异性
  .n-code {
    font-family: 'Fira Code', 'Consolas', monospace !important;
    line-height: 1.5 !important;
  }
}
```

#### Q4: 全屏模式样式问题？

**A4:** 检查 z-index 层级：

```scss
// 确保全屏模态框在最顶层
.fullscreen-content {
  z-index: 9999;
  position: relative;
}
```

#### Q5: 长代码加载慢？

**A5:** 使用虚拟滚动优化：

```vue
<template>
  <!-- 对于超长代码，考虑分页或虚拟滚动 -->
  <C_Code
    :code="longCode"
    language="javascript"
    :max-height="500"  <!-- 限制可视区域 -->
  />
</template>
```

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

### 3. 无障碍访问支持

```vue
<template>
  <C_Code
    :code="code"
    language="javascript"
    role="region"
    aria-label="代码示例"
    aria-describedby="code-description"
  />

  <div id="code-description" class="sr-only">
    这是一个 JavaScript 代码示例，展示了函数的基本用法
  </div>
</template>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

### 4. 主题和样式定制

```scss
// 创建可复用的主题变量
:root {
  // 默认主题
  --code-bg: #ffffff;
  --code-text: #333333;
  --code-keyword: #0000ff;
  --code-string: #008000;
  --code-comment: #808080;
  --code-number: #ff6600;
}

[data-theme='dark'] {
  // 深色主题
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

  // 语法高亮样式
  .hljs-keyword {
    color: var(--code-keyword);
  }
  .hljs-string {
    color: var(--code-string);
  }
  .hljs-comment {
    color: var(--code-comment);
  }
  .hljs-number {
    color: var(--code-number);
  }
}
```

### 5. 错误处理和用户体验

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

    // 提供降级方案
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

    // 分析复制的代码
    analytics.track('code_copied', {
      language: codeState.language,
      lines: code.split('\n').length,
      characters: code.length,
    })
  } catch (error) {
    console.error('复制失败:', error)

    // 提供手动复制提示
    message.error('自动复制失败，请手动复制代码')

    // 尝试选中代码
    selectCodeText()
  }
}

const selectCodeText = () => {
  const codeElement = document.querySelector('.n-code pre')
  if (codeElement) {
    const range = document.createRange()
    range.selectNodeContents(codeElement)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
</script>
```

### 6. 代码片段版本管理

```javascript
// 代码片段版本控制系统
class SnippetVersionManager {
  constructor() {
    this.versions = new Map()
    this.maxVersions = 10
  }

  saveVersion(snippetId, code, comment = '') {
    if (!this.versions.has(snippetId)) {
      this.versions.set(snippetId, [])
    }

    const versions = this.versions.get(snippetId)
    const newVersion = {
      id: generateVersionId(),
      code,
      comment,
      timestamp: new Date(),
      hash: generateCodeHash(code),
    }

    versions.unshift(newVersion)

    // 限制版本数量
    if (versions.length > this.maxVersions) {
      versions.splice(this.maxVersions)
    }

    return newVersion
  }

  getVersions(snippetId) {
    return this.versions.get(snippetId) || []
  }

  restoreVersion(snippetId, versionId) {
    const versions = this.getVersions(snippetId)
    const version = versions.find((v) => v.id === versionId)

    if (version) {
      return version.code
    }

    throw new Error('版本不存在')
  }

  compareVersions(snippetId, version1Id, version2Id) {
    const versions = this.getVersions(snippetId)
    const v1 = versions.find((v) => v.id === version1Id)
    const v2 = versions.find((v) => v.id === version2Id)

    if (!v1 || !v2) {
      throw new Error('版本不存在')
    }

    return {
      version1: v1,
      version2: v2,
      differences: calculateDifferences(v1.code, v2.code),
    }
  }
}

// 使用示例
const versionManager = new SnippetVersionManager()

const saveSnippetVersion = (snippet, comment) => {
  const version = versionManager.saveVersion(snippet.id, snippet.code, comment)

  message.success(`版本 ${version.id} 已保存`)
  return version
}
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

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

Copyright (c) 2025 by ChenYu, All Rights Reserved.

---

**💡 提示**: 这个代码高亮组件基于强大的 highlight.js 库构建，提供了完整的代码展示和交互功能。支持多种编程语言、主题定制、一键复制等特性，适用于技术文档、代码教程、API 文档等各种代码展示场景。无论是简单的代码片段还是复杂的代码对比，都能提供专业级的代码高亮体验。结合 TypeScript 支持和高度可定制的配置，让代码展示既美观又实用。如果遇到问题请先查看文档，或者在团队群里讨论。让我们一起打造更优雅的代码展示体验！ 🎨
