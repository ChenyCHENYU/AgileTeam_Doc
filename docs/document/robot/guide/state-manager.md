---
outline: "deep"
description: "状态管理是 Robot Admin 应用程序的关键组成部分，使用 Pinia（Vue 推荐的状态管理库）创建了一个模块化的状态管理系统。本文档将详细介绍状态管理的架构设计和使用方式"
---

# Robot Admin 状态管理详解

<div class="hero-banner">
  <h2>🗃️ 基于 Pinia 的状态管理系统</h2>
  <p>构建可维护且类型安全的状态管理架构，实现应用数据的集中化处理</p>
</div>

状态管理是 Robot Admin 应用程序的关键组成部分，使用 Pinia（Vue 推荐的状态管理库）创建了一个模块化的状态管理系统。本文档将详细介绍状态管理的架构设计和使用方式。

## 🎯 状态管理架构

应用程序将状态组织成模块化的存储库，每个存储库负责特定的业务领域：

| 存储库         | 目的             | 关键特性                     |
| -------------- | ---------------- | ---------------------------- |
| **app**        | 应用程序 UI 状态 | 标签导航，活动路由跟踪       |
| **user**       | 认证与用户数据   | 令牌管理，用户资料，登录流程 |
| **permission** | 授权管理         | 菜单权限，按钮访问权限       |
| **theme**      | UI 偏好设置      | 明/暗模式，主题定制          |

::: tip 💡 架构优势
模块化设计确保各个存储库职责清晰，便于维护和扩展，同时支持类型安全和响应式数据更新。
:::

## 🏗️ 存储库设置

### 初始化配置

存储库系统通过专用插件在应用程序中初始化：

::: code-group

```typescript [store.ts - 存储库设置]
import { createPinia } from "pinia";
import type { App } from "vue";

export function setupStore(app: App) {
  const pinia = createPinia();
  app.use(pinia);
}
```

```typescript [main.ts - 应用初始化]
import { createApp } from "vue";
import { setupStore } from "@/stores";
import App from "./App.vue";

const app = createApp(App);

// 初始化状态管理
setupStore(app);

app.mount("#app");
```

:::

## 📊 存储库实现模式

项目使用两种不同的风格来定义存储库：

### 选项 API 风格

大多数存储库使用传统的选项 API 模式：

::: code-group

```typescript [user/index.ts - 选项API风格]
export const s_userStore = defineStore("user", {
  state: () => ({
    token: getItem<string>(TOKEN) ?? "",
    userInfo: {} as UserInfo,
  }),

  getters: {
    hasUserInfo: (state) => Object.keys(state.userInfo).length > 0,
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      setItem(TOKEN, token);
    },

    async getUserInfo() {
      try {
        const { data } = await getUserInfoApi();
        this.userInfo = data;
        return data;
      } catch (error) {
        console.error("获取用户信息失败:", error);
        throw error;
      }
    },

    async logout() {
      this.token = "";
      this.userInfo = {};
      removeAllItem();
      router.replace("/login");
    },
  },
});
```

:::

### 组合 API 风格

主题存储库使用组合 API 风格：

::: code-group

```typescript [theme/index.ts - 组合API风格]
export const useThemeStore = defineStore("theme", () => {
  // 状态定义
  const mode = ref<ThemeMode>(savedMode || "system");
  const systemIsDark = ref(mediaQuery.matches);

  // 计算属性
  const isDark = computed(() => {
    return (
      mode.value === "dark" || (mode.value === "system" && systemIsDark.value)
    );
  });

  // 方法定义
  const setMode = async (newMode: ThemeMode) => {
    mode.value = newMode;
    localStorage.setItem("theme-mode", newMode);
    await applyTheme();
  };

  const updateThemeOverrides = (overrides: GlobalThemeOverrides) => {
    // 更新主题配置
  };

  return {
    mode,
    isDark,
    setMode,
    updateThemeOverrides,
  };
});
```

:::

## 🔑 核心存储库详解

### 应用程序存储库

管理 UI 相关的状态，特别是标签导航系统：

::: code-group

```typescript [app/index.ts - 应用存储库]
export const s_appStore = defineStore("app", {
  state: () => ({
    tabs: [] as TabItem[],
    activeTabIndex: 0,
    isCollapsed: false,
  }),

  getters: {
    activeTab: (state) => state.tabs[state.activeTabIndex],
    tabsCount: (state) => state.tabs.length,
  },

  actions: {
    // 添加标签页
    addTab(tab: TabItem) {
      const existingIndex = this.tabs.findIndex((t) => t.path === tab.path);

      if (existingIndex === -1) {
        this.tabs.push(tab);
        this.activeTabIndex = this.tabs.length - 1;
      } else {
        this.activeTabIndex = existingIndex;
      }
    },

    // 移除标签页
    removeTab(index: number) {
      if (this.tabs.length <= 1) return;

      this.tabs.splice(index, 1);

      if (this.activeTabIndex >= this.tabs.length) {
        this.activeTabIndex = this.tabs.length - 1;
      }
    },

    // 设置侧边栏折叠状态
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
});
```

```typescript [使用示例]
// 在组件中使用
import { s_appStore } from "@/stores/app";

const appStore = s_appStore();

// 添加新标签
appStore.addTab({
  path: "/dashboard",
  title: "仪表盘",
  icon: "dashboard",
  meta: { affix: false },
});

// 移除标签
appStore.removeTab(1);

// 切换侧边栏
appStore.toggleSidebar();
```

:::

### 用户存储库

处理认证状态和用户资料数据：

::: code-group

```typescript [user/index.ts - 用户存储库]
export const s_userStore = defineStore("user", {
  state: () => ({
    token: getItem<string>(TOKEN) ?? "",
    userInfo: {} as UserInfo,
  }),

  getters: {
    hasUserInfo: (state) => Object.keys(state.userInfo).length > 0,
    isLoggedIn: (state) => !!state.token,
    userName: (state) => state.userInfo.name || "未知用户",
  },

  actions: {
    // 处理登录成功
    handleLoginSuccess(token: string) {
      this.setToken(token);
      this.getUserInfo();
    },

    // 设置令牌
    setToken(token: string) {
      this.token = token;
      setItem(TOKEN, token);
    },

    // 获取用户信息
    async getUserInfo() {
      if (!this.token) return null;

      try {
        const { data } = await getUserInfoApi();
        this.userInfo = data;
        return data;
      } catch (error) {
        console.error("获取用户信息失败:", error);
        await this.logout();
        throw error;
      }
    },

    // 退出登录
    async logout() {
      this.token = "";
      this.userInfo = {};

      // 清理相关数据
      removeAllItem();
      s_appStore().$reset();

      // 导航到登录页
      router.replace("/login");
    },
  },
});
```

```typescript [使用示例]
// 在组件中使用
import { s_userStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = s_userStore();

// 响应式解构
const { token, userInfo, isLoggedIn } = storeToRefs(userStore);

// 处理登录
const handleLogin = async (loginData) => {
  const { token } = await loginApi(loginData);
  userStore.handleLoginSuccess(token);
};

// 处理退出
const handleLogout = () => userStore.logout();
```

:::

### 权限存储库

管理授权和访问控制：

::: code-group

```typescript [permission/index.ts - 权限存储库]
export const s_permissionStore = defineStore("permission", {
  state: () => ({
    authMenuList: [] as Menu[],
    permissions: [] as string[],
  }),

  getters: {
    // 显示菜单列表
    showMenuListGet: (state) => {
      return state.authMenuList.filter((menu) => !menu.meta?.hidden);
    },

    // 需要缓存的路由
    keepAliveRouterGet: (state) => {
      const keepAliveRoutes: string[] = [];

      const extractKeepAlive = (menus: Menu[]) => {
        menus.forEach((menu) => {
          if (menu.meta?.keepAlive && menu.name) {
            keepAliveRoutes.push(menu.name as string);
          }
          if (menu.children) {
            extractKeepAlive(menu.children);
          }
        });
      };

      extractKeepAlive(state.authMenuList);
      return keepAliveRoutes;
    },
  },

  actions: {
    // 获取授权菜单列表
    async getAuthMenuList() {
      try {
        const { data } = await getAuthMenuListApi();
        this.authMenuList = data;
        this.extractPermissions(data);
        return { code: "0", data, msg: "success" };
      } catch (error) {
        console.error("获取菜单列表失败:", error);
        return { code: "1", data: [], msg: "failed" };
      }
    },

    // 提取权限列表
    extractPermissions(menus: Menu[]) {
      const permissions: string[] = [];

      const extract = (items: Menu[]) => {
        items.forEach((item) => {
          if (item.meta?.permissions) {
            permissions.push(...item.meta.permissions);
          }
          if (item.children) {
            extract(item.children);
          }
        });
      };

      extract(menus);
      this.permissions = [...new Set(permissions)];
    },
  },
});
```

```typescript [使用示例]
// 在组件中使用
import { s_permissionStore } from "@/stores/permission";

const permStore = s_permissionStore();

// 获取菜单数据
await permStore.getAuthMenuList();

// 渲染菜单
const menuList = computed(() => permStore.showMenuListGet);

// 检查权限
const hasPermission = (permission: string) => {
  return permStore.permissions.includes(permission);
};
```

:::

### 主题存储库

使用组合 API 风格管理 UI 主题偏好：

::: code-group

```typescript [theme/index.ts - 主题存储库]
export const useThemeStore = defineStore("theme", () => {
  const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // 状态
  const mode = ref<ThemeMode>(savedMode || "system");
  const systemIsDark = ref(mediaQuery.matches);
  const customOverrides = ref<GlobalThemeOverrides>({});

  // 计算属性
  const isDark = computed(() => {
    return (
      mode.value === "dark" || (mode.value === "system" && systemIsDark.value)
    );
  });

  const themeOverrides = computed(() => {
    return {
      ...getDefaultTheme(isDark.value),
      ...customOverrides.value,
    };
  });

  // 方法
  const setMode = async (newMode: ThemeMode) => {
    mode.value = newMode;
    localStorage.setItem("theme-mode", newMode);
    await nextTick();
    updateBodyClass();
  };

  const updateThemeOverrides = (overrides: GlobalThemeOverrides) => {
    customOverrides.value = { ...customOverrides.value, ...overrides };
    localStorage.setItem(
      "theme-overrides",
      JSON.stringify(customOverrides.value)
    );
  };

  const updateBodyClass = () => {
    if (isDark.value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // 监听系统主题变化
  mediaQuery.addEventListener("change", (e) => {
    systemIsDark.value = e.matches;
  });

  return {
    mode,
    isDark,
    themeOverrides,
    setMode,
    updateThemeOverrides,
  };
});
```

```typescript [使用示例]
// 在组件中使用
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

// 切换主题
const toggleTheme = () => {
  const newMode = themeStore.isDark ? "light" : "dark";
  themeStore.setMode(newMode);
};

// 自定义主题色
const updatePrimaryColor = (color: string) => {
  themeStore.updateThemeOverrides({
    common: {
      primaryColor: color,
    },
  });
};
```

:::

## 💾 数据持久化

项目为关键数据实现了持久化策略：

::: code-group

```typescript [persistence-utils.ts - 持久化工具]
// 本地存储工具
export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("存储数据失败:", error);
  }
};

export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("读取数据失败:", error);
    return null;
  }
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const removeAllItem = (): void => {
  localStorage.clear();
};
```

```typescript [持久化应用示例]
// 在存储库中使用持久化
actions: {
  setToken(token: string) {
    this.token = token
    setItem(TOKEN, token) // 持久化令牌
  },

  updateTheme(theme: ThemeConfig) {
    this.theme = theme
    setItem('theme-config', theme) // 持久化主题配置
  }
}
```

:::

## 🔄 存储库集成

### 组件中使用存储库

::: code-group

```vue [Component.vue - 组件使用示例]
<template>
  <div>
    <h1>{{ userInfo.name }}</h1>
    <n-button @click="handleLogout">退出登录</n-button>
  </div>
</template>

<script setup lang="ts">
import { s_userStore } from "@/stores/user";
import { s_permissionStore } from "@/stores/permission";
import { storeToRefs } from "pinia";

// 获取存储库实例
const userStore = s_userStore();
const permStore = s_permissionStore();

// 响应式解构 - 保持响应性
const { token, userInfo } = storeToRefs(userStore);
const { showMenuListGet } = storeToRefs(permStore);

// 直接使用方法
const handleLogout = () => userStore.logout();

// 计算属性
const isAuthenticated = computed(() => !!token.value);
</script>
```

:::

### 路由守卫中的存储库使用

::: code-group

````typescript [router-guards.ts - 路由守卫集成]
import { s_userStore } from "@/stores/user";
import { s_permissionStore } from "@/stores/permission";

router.beforeEach(async (to, from, next) => {
  const userStore = s_userStore();
  const permissionStore = s_permissionStore();

  // 检查登录状态
  if (!userStore.token) {
    if (to.path !== "/login") {
      return next("/login");
    }
    return next();
  }

  // 初始化用户权限
  if (!permissionStore.authMenuList.length) {
    await permissionStore.getAuthMenuList();
  }

  next();
});

:::

## 状态管理流程

<ImgPreview src="robot/guide/14.png" title="状态管理流程" width="60%"/>


## 📋 最佳实践

### 开发建议

| 建议           | 说明                        | 重要性  |
| -------------- | --------------------------- | ------- |
| **响应式解构** | 使用 storeToRefs 保持响应性 | 🔴 关键 |
| **模块化设计** | 按业务领域拆分存储库        | 🟡 重要 |
| **类型安全**   | 为状态和方法定义明确的类型  | 🟡 重要 |
| **错误处理**   | 在异步操作中实现错误处理    | 🔴 关键 |

### 代码规范

::: code-group

```typescript [best-practices.ts]
// ✅ 推荐的存储库使用方式
import { s_userStore } from "@/stores/user";
import { storeToRefs } from "pinia";

// 正确的响应式解构
const userStore = s_userStore();
const { userInfo, isLoggedIn } = storeToRefs(userStore);

// 直接使用方法
const logout = () => userStore.logout();

// ❌ 避免的做法
const { userInfo, logout } = userStore; // 丢失响应性
const userInfo = userStore.userInfo; // 丢失响应性
````

:::

::: tip 🎯 开发建议
通过合理使用 Pinia 的存储库系统，可以构建出维护性强、类型安全的状态管理架构。记住始终使用 storeToRefs 来保持状态的响应性，并为异步操作实现适当的错误处理。
:::

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
