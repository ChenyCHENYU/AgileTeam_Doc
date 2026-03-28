---
outline: "deep"
---

# API 集成

> 🌐 Robot uniApp 的 HTTP 层基于 `uni.request` 封装，提供企业级的请求管理能力。

## 📐 整体结构

```
api/
├── index.ts          # 统一导出（直接 from '@/api' 使用）
├── factory.ts        # 接口工厂函数（快速生成 CRUD 接口）
└── modules/
    ├── user.ts       # 用户相关接口
    ├── dashboard.ts  # 看板数据接口
    ├── crud.ts       # 通用 CRUD 接口
    ├── approval.ts   # 审批流接口
    └── message.ts    # 消息接口
```

## 🔧 HTTP 工具类

核心能力来自 `utils/http.ts`，封装了以下高级特性：

### 请求去重

相同的接口同时发起多次请求时，自动合并为一次：

```ts
// 用 method + url + data 生成唯一 key
function genRequestKey(method, url, data) {
  return `${method}:${url}:${JSON.stringify(data || {})}`;
}

// 若已有相同请求在进行中，直接返回该 Promise
const pending = this.getPending(key);
if (pending) return pending;
```

### 失败重试

网络抖动时，自动以指数退避策略重试：

```ts
// 默认重试 2 次，间隔按 1s, 2s, 4s... 递增
const result = await this.request({
  url: "/api/user",
  method: "GET",
  retry: 3, // 重试次数
  retryDelay: 1000, // 初始延迟(ms)
});
```

### 登录重定向

收到 `401` 响应时，自动保存当前页面路径，跳转到登录页：

```ts
if (statusCode === 401) {
  const currentRoute = getCurrentPages().pop()?.route;
  uni.navigateTo({
    url: `/pages/login/index?redirect=${currentRoute}`,
  });
}
```

### 页面级取消

页面销毁时，自动取消该页面发起的所有未完成请求，防止内存泄漏：

```ts
// utils/http.ts — 内部机制
// 每次请求会注册到当前页面的任务集合
// onUnload 时自动 abort 所有该页面任务
```

## 📋 接口定义规范

### 基础接口

```ts
// api/modules/user.ts
import http from "@/utils/http";

// 登录
export const login = (data: LoginParams) =>
  http.post<LoginResult>("/auth/login", data);

// 获取用户信息
export const getUserInfo = () => http.get<UserInfo>("/user/info");

// 修改密码
export const changePassword = (data: ChangePasswordParams) =>
  http.put("/user/password", data);

// 登出
export const logout = () => http.post("/auth/logout");
```

### 工厂函数生成 CRUD

使用 `factory.ts` 快速生成标准 CRUD 接口：

```ts
// api/factory.ts
export function createCRUD<T>(resource: string) {
  return {
    list: (params?) => http.get<PageResult<T>>(`/${resource}`, params),
    detail: (id: number) => http.get<T>(`/${resource}/${id}`),
    create: (data: Partial<T>) => http.post<T>(`/${resource}`, data),
    update: (id: number, data: Partial<T>) =>
      http.put<T>(`/${resource}/${id}`, data),
    remove: (id: number) => http.delete(`/${resource}/${id}`),
  };
}

// 使用示例
export const orderApi = createCRUD<Order>("orders");
// 等价于手写了 list / detail / create / update / remove 五个接口
```

## 🚀 在组件中使用

### 直接调用

```vue
<script setup lang="ts">
import { getUserInfo } from "@/api";

const userInfo = ref(null);

onMounted(async () => {
  try {
    userInfo.value = await getUserInfo();
  } catch (error) {
    uni.showToast({ title: "获取用户信息失败", icon: "none" });
  }
});
</script>
```

### 配合 useLoading

```vue
<script setup lang="ts">
import { getOrderList } from "@/api";

const { loading, withLoading } = useLoading();
const list = ref([]);

const fetchData = () =>
  withLoading(async () => {
    list.value = await getOrderList();
  });

onMounted(fetchData);
</script>

<template>
  <wd-loading v-if="loading" />
  <C_List v-else :data="list" />
</template>
```

### 配合 usePagination

```vue
<script setup lang="ts">
import { getCrudList } from "@/api";

const { list, loading, finished, loadMore, refresh } = usePagination(
  getCrudList,
  { pageSize: 20, immediate: true },
);
</script>

<template>
  <wd-infinite-scroll :loading="loading" :finished="finished" @load="loadMore">
    <C_List :data="list" />
  </wd-infinite-scroll>
</template>
```

## 🌍 Mock 数据

开发环境自动启用 Mock（`vite-plugin-mock-dev-server`）：

```ts
// mock/user.mock.ts
export default [
  {
    url: "/api/auth/login",
    method: "POST",
    response: (req) => {
      const { username, password } = req.body;
      if (username === "admin" && password === "123456") {
        return {
          code: 0,
          data: {
            token: "mock-token-xxx",
            userInfo: { nickname: "Robot Admin", avatar: "" },
            permissions: ["order:create", "order:delete"],
            roles: ["admin"],
          },
        };
      }
      return { code: 401, message: "用户名或密码错误" };
    },
  },
];
```

Mock 在生产构建时会自动剔除（`isDev ? mockPlugin() : null`）。

## ⚙️ 全局 HTTP 配置

```ts
// config/env.ts
export default {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  REQUEST_TIMEOUT: 15000,
};
```

```ts
// utils/http.ts （Http 类初始化）
constructor() {
  this.baseURL = config.API_BASE_URL
  this.timeout = 15000

  this.pendingMap  = new Map()   // 去重 Map
  this.pageTasksMap = new Map()  // 页面级取消 Map
}
```
