---
outline: "deep"
---

# 状态管理

> 🗄️ Robot uniApp 使用 **Pinia** 进行状态管理，结合 `pinia-plugin-persistedstate` 实现数据持久化。

## 📦 初始化配置

```ts
// stores/index.ts
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export * from "./modules/user";
export * from "./modules/app";
export * from "./modules/settings";
export * from "./modules/message";
export * from "./modules/notification";

export default pinia;
```

## 🗂️ Store 模块总览

| 模块             | 文件                      | 职责                                |
| ---------------- | ------------------------- | ----------------------------------- |
| **User**         | `modules/user.ts`         | 登录态、Token、用户信息、权限、角色 |
| **App**          | `modules/app.ts`          | 系统信息、网络状态、全局 loading    |
| **Settings**     | `modules/settings.ts`     | 主题、语言等用户偏好                |
| **Message**      | `modules/message.ts`      | 未读消息数、消息列表                |
| **Notification** | `modules/notification.ts` | 通知管理                            |

## 👤 User Store

最核心的 Store，管理用户认证状态：

```ts
// stores/modules/user.ts
export const useUserStore = defineStore("user", {
  state: () => ({
    token: "" as string,
    userInfo: null as UserInfo | null,
    permissions: [] as string[],
    roles: [] as string[],
    loginTime: null as string | null,
  }),

  getters: {
    // 头像（自动回退到默认头像）
    avatar: (state) => state.userInfo?.avatar || "/static/robot-avatar.png",
    // 昵称
    nickname: (state) => state.userInfo?.nickname || "未设置昵称",
    // 登录状态
    isLoggedIn: (state) => !!state.token,
    // 是否管理员
    isAdmin: (state) => state.roles.includes("admin"),
    // 权限检查（函数式 getter）
    hasPermission: (state) => (perm: string) =>
      state.permissions.includes(perm),
    // 角色检查
    hasRole: (state) => (role: string) => state.roles.includes(role),
  },

  actions: {
    // 登录
    async login(credentials) {
      const result = await loginApi(credentials);
      this.token = result.token;
      this.userInfo = result.userInfo;
      this.permissions = result.permissions || [];
      this.roles = result.roles || [];
      this.loginTime = new Date().toISOString();
      return result;
    },

    // 获取用户信息
    async fetchUserInfo() {
      const info = await getUserInfoApi();
      this.userInfo = info;
      this.permissions = info.permissions || [];
      this.roles = info.roles || [];
    },

    // 登出
    async logout() {
      await logoutApi();
      this.clearUserInfo();
      uni.reLaunch({ url: "/pages/login/index" });
    },

    // 清除用户信息
    clearUserInfo() {
      this.token = "";
      this.userInfo = null;
      this.permissions = [];
      this.roles = [];
    },
  },

  // 持久化（Token 等关键数据）
  persist: true,
});
```

**在组件中使用：**

```vue
<script setup lang="ts">
import { useUserStore } from "@/stores";

const userStore = useUserStore();

// 响应式访问
console.log(userStore.isLoggedIn); // true
console.log(userStore.nickname); // 'Robot 用户'

// 检查权限
if (userStore.hasPermission("order:create")) {
  // 展示创建订单按钮
}

// 登录
await userStore.login({ username: "admin", password: "123456" });
</script>
```

## 📱 App Store

管理全局应用状态：

```ts
// stores/modules/app.ts
export const useAppStore = defineStore("app", {
  state: () => ({
    systemInfo: null as UniApp.GetSystemInfoResult | null,
    networkType: "unknown" as string,
    statusBarHeight: 0,
    globalLoading: false,
  }),

  getters: {
    isDev: () => process.env.NODE_ENV === "development",
    // 安全区域（适配刘海屏和底部 Home Bar）
    safeArea: (state) => ({
      top: state.systemInfo?.safeAreaInsets?.top || state.statusBarHeight,
      bottom: state.systemInfo?.safeAreaInsets?.bottom || 0,
    }),
  },

  actions: {
    // 初始化（在 App.vue onLaunch 中调用）
    async initSystemInfo() {
      const systemInfo = uni.getSystemInfoSync();
      this.systemInfo = systemInfo;
      this.statusBarHeight = systemInfo.statusBarHeight || 0;
      this.getNetworkType();
    },

    // 获取网络类型
    getNetworkType() {
      uni.getNetworkType({
        success: (res) => {
          this.networkType = res.networkType;
        },
      });
    },
  },
});
```

**常见用法：**

```vue
<script setup lang="ts">
import { useAppStore } from "@/stores";

const appStore = useAppStore();

// 获取状态栏高度（用于自定义导航栏）
const statusBarHeight = computed(() => appStore.statusBarHeight);

// 检查网络
if (appStore.networkType === "none") {
  uni.showToast({ title: "当前无网络", icon: "none" });
}
</script>
```

## ⚙️ Settings Store

管理用户偏好设置：

```ts
// stores/modules/settings.ts
export const useSettingsStore = defineStore("settings", {
  state: () => ({
    theme: "light" as "light" | "dark" | "system",
    language: "zh-CN" as string,
    fontSize: "normal" as "small" | "normal" | "large",
    notifications: true,
    autoLogin: false,
  }),
  persist: true, // 偏好设置持久化
});
```

## 💬 Message Store

管理消息未读数，被 `C_Layout` 自动消费以展示角标：

```ts
// stores/modules/message.ts
export const useMessageStore = defineStore("message", {
  state: () => ({
    totalUnread: 0,
    systemUnread: 0,
    businessUnread: 0,
  }),

  actions: {
    async fetchUnreadCount() {
      const { total, system, business } = await getMessageCountApi();
      this.totalUnread = total;
      this.systemUnread = system;
      this.businessUnread = business;
    },
  },
});
```

## 🔒 持久化说明

项目使用 `pinia-plugin-persistedstate` 实现跨会话数据保存：

```ts
// 完整配置示例
export const useUserStore = defineStore("user", {
  // ...

  // 方式1：全量持久化（persist: true）
  persist: true,

  // 方式2：指定持久化字段
  persist: {
    key: "robot-user", // localStorage key
    storage: localStorage, // 存储方式（H5）
    pick: ["token", "userInfo"], // 仅持久化这些字段
  },
});
```

::: warning 小程序持久化
在微信小程序端，`localStorage` 不可用，需使用 `uni.setStorageSync`。可配置自定义存储适配器：

```ts
persist: {
  storage: {
    getItem: (key) => uni.getStorageSync(key),
    setItem: (key, val) => uni.setStorageSync(key, val),
  }
}
```

:::

## 🧩 在组件中使用 Store

由于配置了 `unplugin-auto-import` 的 `dirs: ['src/stores/modules']`，Store 模块中的 `use*Store` 函数**自动导入**，无需手动 `import`：

```vue
<script setup lang="ts">
// ✅ 无需 import，直接使用
const userStore = useUserStore();
const appStore = useAppStore();
const msgStore = useMessageStore();
</script>
```
