---
outline: "deep"
description: "Robot Admin 项目采用结构化方法实现 API 集成，使用 Axios 实现与后端服务的无缝通信。本文档将详细介绍 API 调用的组织方式、如何与端点交互以及扩展 API "
---

# Robot Admin API 集成详解

<div class="hero-banner">
  <h2>🔗 基于 Axios 的 API 集成系统</h2>
  <p>结构化的 API 调用架构，实现与后端服务的无缝通信和统一的错误处理</p>
</div>

Robot Admin 项目采用结构化方法实现 API 集成，使用 Axios 实现与后端服务的无缝通信。本文档将详细介绍 API 调用的组织方式、如何与端点交互以及扩展 API 层的最佳实践。

## 🎯 API 架构设计

Robot Admin 中的 API 集成遵循模块化架构，分离关注点并提高可维护性。系统基于定制的 Axios 实例构建，包含请求/响应拦截器，用于处理常见的任务，如认证和错误管理。

<ImgPreview src="robot/guide/15.png" title="api 集成图" width="60%"/>

### 架构优势

| 优势             | 说明                        | 价值             |
| ---------------- | --------------------------- | ---------------- |
| **关注点分离**   | API 调用按领域/功能分组     | 提高代码可维护性 |
| **可重用性**     | 通用请求配置集中处理        | 减少重复代码     |
| **统一错误处理** | 所有 API 调用的集中错误管理 | 一致的用户体验   |
| **自动认证**     | 受保护端点的自动令牌管理    | 简化开发流程     |

::: tip 💡 架构特点
系统通过请求/响应拦截器自动处理认证、错误处理和数据格式化，让开发者专注于业务逻辑的实现。
:::

## 🔧 HTTP 客户端配置

项目使用在 `request.ts` 中定义的自定义 Axios 配置，作为所有 API 调用的基础：

::: code-group

```typescript [request.ts - 基础配置]
import axios from "axios";
import { s_userStore } from "@/stores/user";

// 创建 Axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default service;
```

```typescript [环境配置]
# .env.development
VITE_API_BASE=http://localhost:3000/api

# .env.production
VITE_API_BASE=https://api.robotadmin.com
```

:::

## 🔐 认证处理机制

Axios 请求拦截器自动将认证令牌注入 API 请求中，简化了认证请求的处理过程：

::: code-group

```typescript [request.ts - 请求拦截器]
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { token, logout } = s_userStore();

    if (token) {
      // 检查令牌是否过期
      if (d_isCheckTimeout()) {
        logout();
        return Promise.reject(new Error("令牌已过期，请重新登录"));
      }

      // 添加 Bearer 令牌到请求头
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
```

```typescript [令牌过期检查]
// 令牌过期检查函数
export const d_isCheckTimeout = (): boolean => {
  const loginTime = getItem("loginTime");
  const tokenExpiry = getItem("tokenExpiry");

  if (!loginTime || !tokenExpiry) return false;

  const currentTime = Date.now();
  return currentTime > tokenExpiry;
};
```

:::

拦截器的处理流程：

1. 从用户存储中检索认证令牌
2. 检查令牌是否过期
3. 如果有效，将令牌作为 Bearer 令牌添加到 Authorization 头部
4. 如果过期，登出用户并拒绝请求

## ❌ 统一错误处理

API 错误通过响应拦截器集中管理，处理常见的错误场景并提供一致的用户体验：

::: code-group

```typescript [request.ts - 响应拦截器]
import { message } from "@/utils/message";

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 成功响应处理
    if (response.status === 200) {
      return response;
    }

    message.error("接口调用失败");
    return Promise.reject(new Error(response.statusText || "接口请求失败"));
  },
  (error) => {
    const { logout } = s_userStore();

    // 处理不同的错误状态码
    if (error?.response?.status === 401) {
      logout();
      message.error("登录已过期，请重新登录");
    } else if (error?.response?.status === 403) {
      message.error("权限不足，无法访问该资源");
    } else if (error?.response?.status === 500) {
      message.error("服务器内部错误，请稍后重试");
    } else {
      message.error(error.message || "响应拦截请求失败");
    }

    return Promise.reject(error);
  }
);
```

:::

统一错误处理的优势：

- **自动显示**用户友好的错误信息
- **自动处理**认证过期情况
- **标准化**应用中的错误处理流程

## 📁 API 模块组织

API 调用按业务领域组织到 `src/api` 目录中的特定模块：

```
src/api/
├── 👤 user.ts           # 用户认证相关
├── 🔐 permission.ts     # 权限管理
├── 👥 role.ts           # 角色管理
├── 🛠️ user-manage.ts    # 用户管理
└── 📊 dashboard.ts      # 仪表板数据
```

| 模块               | 描述     | 示例端点                                        |
| ------------------ | -------- | ----------------------------------------------- |
| **user.ts**        | 用户认证 | `login()`, `getUserInfo()`, `logout()`          |
| **permission.ts**  | 权限管理 | `getPermissionList()`, `updatePermission()`     |
| **role.ts**        | 角色管理 | `getRoleList()`, `assignPermissions()`          |
| **user-manage.ts** | 用户管理 | `getUserList()`, `deleteUser()`, `updateUser()` |

## 🚀 API 调用实现

### 基本 GET 请求

最简单的 API 调用形式是无参数的 GET 请求：

::: code-group

```typescript [permission.ts - 基础GET请求]
import request from "@/utils/request";

/**
 * 获取权限列表
 */
export const getPermissionList = () => {
  return request({
    url: "/permission/list",
    method: "GET",
  });
};
```

:::

### 带查询参数的 GET 请求

对于需要查询参数的端点：

::: code-group

```typescript [user-manage.ts - 带参数GET请求]
/**
 * 获取用户管理列表
 * @param params 查询参数
 */
export const getUserManageList = (params: {
  page?: number;
  limit?: number;
  keyword?: string;
}) => {
  return request({
    url: "/user-manage/list",
    method: "GET",
    params,
  });
};

// 使用示例
const fetchUsers = async () => {
  const response = await getUserManageList({
    page: 1,
    limit: 10,
    keyword: "搜索关键词",
  });
};
```

:::

### 带路径参数的 GET 请求

对于包含路径参数的端点：

::: code-group

```typescript [user-manage.ts - 路径参数请求]
/**
 * 获取用户详情
 * @param id 用户ID
 */
export const getUserDetail = (id: string) => {
  return request({
    url: `/user-manage/detail/${id}`,
    method: "GET",
  });
};

// 使用示例
const fetchUserDetail = async (userId: string) => {
  const response = await getUserDetail(userId);
  return response.data;
};
```

:::

### 带数据负载的 POST 请求

对于需要发送请求体数据的端点：

::: code-group

```typescript [user-manage.ts - POST请求]
/**
 * 更新用户角色
 * @param id 用户ID
 * @param roles 角色数据
 */
export const updateUserRole = (id: string, roles: string[]) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: "POST",
    data: {
      roles,
    },
  });
};

/**
 * 创建新用户
 * @param userData 用户数据
 */
export const createUser = (userData: {
  name: string;
  email: string;
  password: string;
  roles: string[];
}) => {
  return request({
    url: "/user-manage/create",
    method: "POST",
    data: userData,
  });
};
```

:::

## 🎨 组件中使用 API

在 Vue 组件中使用 API 调用的标准模式：

::: code-group

```vue [UserList.vue - 组件使用示例]
<template>
  <div>
    <n-data-table :data="userList" :loading="loading" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserManageList, deleteUser } from "@/api/user-manage";
import type { User } from "@/types/user";

// 响应式数据
const userList = ref<User[]>([]);
const loading = ref(false);

// 获取用户列表
const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await getUserManageList({ page: 1, limit: 10 });
    userList.value = response.data.list;
  } catch (error) {
    // 错误已由拦截器处理
    console.error("获取用户列表失败:", error);
  } finally {
    loading.value = false;
  }
};

// 删除用户
const handleDeleteUser = async (id: string) => {
  try {
    await deleteUser(id);
    // 成功后更新本地状态
    userList.value = userList.value.filter((user) => user.id !== id);
  } catch (error) {
    console.error("删除用户失败:", error);
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchUsers();
});
</script>
```

:::

### 在 Pinia Store 中使用 API

::: code-group

```typescript [stores/user.ts - Store中使用API]
import { defineStore } from "pinia";
import { getUserInfo, login } from "@/api/user";
import type { LoginData, UserInfo } from "@/types/user";

export const s_userStore = defineStore("user", {
  state: () => ({
    token: "",
    userInfo: {} as UserInfo,
  }),

  actions: {
    // 登录操作
    async login(loginData: LoginData) {
      try {
        const response = await login(loginData);
        this.token = response.data.token;

        // 获取用户信息
        await this.getUserInfo();

        return response;
      } catch (error) {
        throw error;
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        const response = await getUserInfo();
        this.userInfo = response.data;
        return response.data;
      } catch (error) {
        // 获取用户信息失败，清除登录状态
        this.logout();
        throw error;
      }
    },
  },
});
```

:::

## 📋 扩展 API 层的最佳实践

### 开发建议

| 实践           | 说明                              | 重要性  |
| -------------- | --------------------------------- | ------- |
| **分组管理**   | 将相关 API 函数放在同一模块文件中 | 🟡 重要 |
| **描述性命名** | 函数名称应清晰表明其用途          | 🔴 关键 |
| **类型定义**   | 使用 TypeScript 类型定义参数      | 🟡 重要 |
| **错误处理**   | 为特殊情况实现自定义错误处理      | 🔴 关键 |

### 添加新 API 函数示例

::: code-group

```typescript [best-practices.ts]
/**
 * ✅ 推荐的 API 函数定义方式
 */

// 1. 添加完整的 JSDoc 注释
/**
 * 创建新用户
 * @param userData 用户数据
 * @returns Promise<ApiResponse<User>>
 */
export const createUser = (userData: CreateUserData) => {
  return request<ApiResponse<User>>({
    url: "/user-manage/create",
    method: "POST",
    data: userData,
  });
};

// 2. 使用 TypeScript 类型
interface CreateUserData {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

// 3. 统一的响应类型
interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

// ❌ 避免的做法
export const createUser = (data) => {
  // 缺少类型定义
  return request({
    // 缺少注释
    url: "/create", // URL不够具体
    method: "POST",
    data,
  });
};
```

:::

### 自定义错误处理

虽然全局拦截器处理常见错误，但特定情况可能需要自定义处理：

::: code-group

```typescript [custom-error-handling.ts]
import { deleteUser } from "@/api/user-manage";
import { message } from "@/utils/message";

const handleDeleteUser = async (id: string) => {
  try {
    await deleteUser(id);

    // 成功处理
    userList.value = userList.value.filter((user) => user.id !== id);
    message.success("用户删除成功");
  } catch (error: any) {
    // 自定义错误处理
    if (error.response?.status === 403) {
      message.error("您没有权限删除该用户");
    } else if (error.response?.status === 409) {
      message.error("该用户正在使用中，无法删除");
    }
    // 其他错误由全局拦截器处理
  }
};
```

:::

::: tip 🎯 开发建议
Robot Admin 的 API 集成系统为与后端服务的通信提供了坚实的基础。通过遵循模块化组织和统一的调用模式，可以高效地添加新功能，同时保持代码的整洁和可维护性。认证系统会自动处理令牌管理，确保与受保护端点的无缝交互。
:::

请记住，认证系统自动处理令牌管理，因此只要用户正确认证，大多数API调用将无需额外配置即可与受保护端点工作。

---

<!-- GitHub徽章组件 -->
<GitHubBadges />

<style>
.hero-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  color: white;
  margin: 2rem 0;
}

.hero-banner h2 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.hero-banner p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-banner h2 {
    font-size: 1.5rem;
  }
}
</style>
