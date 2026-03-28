---
outline: "deep"
---

# 认证与权限

> 🔐 Robot uniApp 内置完整的 RBAC 权限体系，支持路由守卫、细粒度权限指令和接口级权限控制。

## 🔑 认证流程

```
用户提交表单
    │
    ▼
userStore.login(credentials)
    │
    ▼
HTTP POST /auth/login
    │
    ▼
服务端返回 { token, userInfo, permissions, roles }
    │
    ├──→ token → Store（持久化）
    ├──→ userInfo → Store
    ├──→ permissions → Store（如 ['order:create', 'user:manage']）
    └──→ roles → Store（如 ['admin', 'operator']）
    │
    ▼
跳转到首页 / 上一页
```

## 🛂 路由权限守卫

`utils/router.ts` 封装了 UniApp 的页面跳转，并在跳转前进行权限检查：

```ts
// utils/router.ts

// 白名单：无需登录即可访问
export const routeConfig = {
  whiteList: [
    "/pages/login/index",
    "/pages/register/index",
    "/pages/index/index",
  ],
};

// 在 main.ts 初始化
export function initRouter() {
  // 拦截 uni.navigateTo / switchTab / reLaunch 等
  uni.addInterceptor("navigateTo", {
    invoke(args) {
      const path = args.url.split("?")[0];
      const { isLoggedIn } = getCurrentUserState();

      // 白名单放行
      if (routeConfig.whiteList.includes(path)) return true;

      // 未登录，重定向到登录页
      if (!isLoggedIn) {
        uni.redirectTo({
          url: `/pages/login/index?redirect=${encodeURIComponent(args.url)}`,
        });
        return false;
      }

      return true;
    },
  });
}
```

**初始化时机（避免循环依赖）：**

```ts
// main.ts
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);

  // Pinia 初始化后，再设置 Store 实例（路由守卫依赖它）
  import("./stores/modules/user").then(({ useUserStore }) => {
    const userStore = useUserStore();
    setUserStore(userStore); // 注入 router.ts
  });

  initRouter();
  return { app, pinia };
}
```

## 🎯 Login 页面完整示例

```vue
<!-- pages/login/index.vue -->
<template>
  <C_Layout :show-tabbar="false" :show-header="false">
    <C_Form ref="formRef" :model="form" :rules="rules">
      <C_Form.Item prop="username" label="账号">
        <wd-input v-model="form.username" placeholder="请输入账号" />
      </C_Form.Item>
      <C_Form.Item prop="password" label="密码">
        <wd-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        />
      </C_Form.Item>
    </C_Form>

    <wd-button :loading="loading" @click="handleLogin">登 录</wd-button>
  </C_Layout>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { loading, withLoading } = useLoading();

const form = reactive({ username: "", password: "" });
const rules = {
  username: [required("账号")],
  password: [required("密码"), minLength(6, "密码")],
};

const handleLogin = () =>
  withLoading(async () => {
    await userStore.login(form);
    // 登录成功，跳转首页
    uni.switchTab({ url: "/pages/index/index" });
  });
</script>
```

## 🛡️ 权限指令

`v-permission` 指令用于在模板层面控制元素的可见性：

```vue
<template>
  <!-- 有 order:create 权限才显示 -->
  <wd-button v-permission="'order:create'">创建订单</wd-button>

  <!-- 有 admin 角色才显示 -->
  <view v-role="'admin'">管理员专属内容</view>

  <!-- 同时满足多个权限（AND 逻辑） -->
  <wd-button v-permission="['order:create', 'order:audit']"
    >创建并审核</wd-button
  >
</template>
```

**指令实现：**

```ts
// directives/modules/permission.ts
export const permissionDirectives = {
  permission: {
    mounted(el, binding) {
      const userStore = useUserStore();
      const perm = binding.value;

      const hasAuth = Array.isArray(perm)
        ? perm.every((p) => userStore.hasPermission(p))
        : userStore.hasPermission(perm);

      if (!hasAuth) {
        el.parentNode?.removeChild(el);
      }
    },
  },

  role: {
    mounted(el, binding) {
      const userStore = useUserStore();
      if (!userStore.hasRole(binding.value)) {
        el.parentNode?.removeChild(el);
      }
    },
  },
};
```

**安装指令：**

```ts
// directives/install.ts
export function installDirectives(app) {
  Object.entries(permissionDirectives).forEach(([name, directive]) => {
    app.directive(name, directive);
  });
}
```

## 🔢 JS 层权限检查

在逻辑层进行权限判断：

```ts
import { useUserStore } from "@/stores";

const userStore = useUserStore();

// 检查权限
if (userStore.hasPermission("finance:report")) {
  await fetchFinanceReport();
}

// 检查角色
if (userStore.isAdmin) {
  showAdminPanel();
}

// 工具函数（utils/permission.ts）
export const permissionMixin = {
  methods: {
    $hasPermission: (perm) => useUserStore().hasPermission(perm),
    $hasRole: (role) => useUserStore().hasRole(role),
    $isLoggedIn: () => useUserStore().isLoggedIn,
  },
};
```

## 🔄 Token 自动刷新

HTTP 层处理 `401` 响应，自动触发重新登录流程：

```ts
// utils/http.ts
if (statusCode === 401) {
  // 清除本地认证信息
  const userStore = useUserStore();
  userStore.clearUserInfo();

  // 保存当前路径，登录后回跳
  const currentPage = getCurrentPages().pop();
  const redirect = currentPage?.route;

  uni.redirectTo({
    url: `/pages/login/index?redirect=${encodeURIComponent("/" + redirect)}`,
  });
}
```

## 📋 权限数据结构参考

```ts
// 服务端返回的权限格式
interface AuthResult {
  token: string;
  userInfo: {
    id: number;
    nickname: string;
    avatar: string;
  };
  // 细粒度权限（资源:动作 格式）
  permissions: string[]; // ['order:create', 'order:edit', 'user:view']
  // 角色标识
  roles: string[]; // ['admin', 'operator']
}
```
