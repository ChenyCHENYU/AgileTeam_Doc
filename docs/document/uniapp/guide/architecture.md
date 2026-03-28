---
outline: "deep"
---

# 应用架构

> 🏗️ 深入理解 Robot uniApp 的技术架构与设计决策，帮助你编写出与项目风格一致的代码。

## 📐 整体架构图

```
┌────────────────────────────────────────────────────┐
│                   多端运行层                         │
│      H5 / 微信小程序 / App（Android + iOS）          │
└─────────────────────┬──────────────────────────────┘
                      │ UniApp 跨端编译
┌─────────────────────▼──────────────────────────────┐
│                   视图层（Vue 3）                    │
│  pages/  →  components/global/  →  wot-design-uni  │
└─────────────────────┬──────────────────────────────┘
                      │
┌─────────────────────▼──────────────────────────────┐
│                   逻辑层                             │
│  composables/  │  stores/  │  directives/           │
└──────┬──────────────┬───────────────┬───────────────┘
       │              │               │
┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│  API 层     │ │  状态层     │ │  工具层     │
│  api/       │ │  Pinia     │ │  utils/    │
│  http.ts    │ │  持久化     │ │  v_verify  │
└──────┬──────┘ └────────────┘ └────────────┘
       │
┌──────▼──────────────────────────────────────────────┐
│                   网络层                             │
│  HTTP (uni.request) + WebSocket (uni.connectSocket)  │
└─────────────────────────────────────────────────────┘
```

## 🧱 核心技术选型分析

### Vue 3 + Composition API

项目全面使用 Vue 3 组合式 API，放弃 Options API：

**选择原因：**

- 更好的逻辑复用（Composables 替代 Mixins）
- 更清晰的代码组织（相关逻辑聚合）
- 完整的 TypeScript 支持
- 更好的 Tree-shaking

```vue
<script setup lang="ts">
// 典型的页面组件写法
import { ref, computed, onMounted } from "vue";

const { loading, withLoading } = useLoading();
const { list, loadMore, finished } = usePagination(fetchList);

const pageTitle = computed(() => `共 ${list.value.length} 条`);

onMounted(() => loadMore());
</script>
```

### UniApp 跨端策略

UniApp 是架构核心，提供以下能力：

| 能力     | UniApp API                      | 说明         |
| -------- | ------------------------------- | ------------ |
| 导航     | `uni.navigateTo / redirectTo`   | 页面跳转     |
| 网络     | `uni.request / uploadFile`      | HTTP 请求    |
| 存储     | `uni.setStorageSync`            | 本地持久化   |
| 媒体     | `uni.chooseImage / getLocation` | 系统能力     |
| 条件编译 | `#ifdef H5 / MP-WEIXIN`         | 平台差异处理 |

**平台差异处理示例：**

```vue
<template>
  <!-- #ifdef H5 -->
  <button @click="handleH5Login">H5 登录</button>
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <button open-type="getUserProfile" @getuserprofile="handleWxLogin">
    微信一键登录
  </button>
  <!-- #endif -->
</template>
```

### 组件系统设计

```
组件层级
├── wot-design-uni（基础 UI 组件，wd- 前缀）
│     └── 提供：按钮、输入框、弹层、图标等基础组件
└── Robot uniApp 组件（业务组件，C_ 前缀）
      └── 在 wot-design-uni 基础上封装，解决业务场景
          每个组件包含：
          ├── index.vue      # 组件主体
          ├── data.ts        # Props 默认值 / 数据逻辑
          └── index.scss     # 组件作用域样式
```

**easycom 自动注册机制：**

```json
// pages.json
{
  "easycom": {
    "custom": {
      "^wd-(.*)": "wot-design-uni/components/wd-$1/wd-$1.vue",
      "^C_(.*)": "@/components/global/C_$1/index.vue"
    }
  }
}
```

无需任何 `import`，直接在模板中使用：

```vue
<C_Layout>
  <C_Card title="示例">
    <wd-button type="primary">按钮</wd-button>
  </C_Card>
</C_Layout>
```

## 🔄 数据流设计

```
用户操作 (Template)
    │
    ▼
组合式函数 (Composables)
    │
    ├──→ Store (Pinia) ──→ 持久化 (localStorage)
    │
    └──→ API 层 (api/)
           │
           ▼
         HTTP 工具 (utils/http.ts)
           │
           ├── 请求去重 (pendingMap)
           ├── 失败重试 (指数退避)
           ├── 登录校验 (401 重定向)
           └── 页面级取消 (pageTasksMap)
```

### Store 设计原则

```ts
// stores/modules/user.ts
export const useUserStore = defineStore("user", {
  state: () => ({
    token: "" as string,
    userInfo: null as UserInfo | null,
    permissions: [] as string[],
    roles: [] as string[],
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.roles.includes("admin"),
    hasPermission: (state) => (perm: string) =>
      state.permissions.includes(perm),
  },

  actions: {
    async login(credentials) {
      const result = await login(credentials);
      this.token = result.token;
      this.permissions = result.permissions;
      this.roles = result.roles;
    },
  },

  // 持久化到 localStorage
  persist: true,
});
```

## 🔌 插件系统

`main.ts` 按职责分层初始化各模块：

```ts
export function createApp() {
  const app = createSSRApp(App);

  // 1. 全局错误处理（最先注册，捕获所有后续错误）
  setupErrorHandler(app);

  // 2. 初始化 Pinia（其他模块依赖 Store）
  app.use(pinia);

  // 3. 安装自定义指令（依赖 Store）
  installDirectives(app);

  // 4. 初始化路由（依赖 Store）
  initRouter();

  return { app, pinia };
}
```

## 🛡️ 安全架构

| 层级       | 安全措施                                  |
| ---------- | ----------------------------------------- |
| **认证层** | JWT Token 存储于 Store，请求头自动注入    |
| **路由层** | 白名单过滤 + 登录态检查                   |
| **权限层** | RBAC 角色校验 + `v-permission` 细粒度指令 |
| **请求层** | Token 自动续期 + 401 自动跳登录           |
| **数据层** | 请求去重防止重复提交                      |

## 📦 构建产物

`pnpm build` 根据不同平台生成对应产物：

| 平台        | 输出目录                  | 说明                      |
| ----------- | ------------------------- | ------------------------- |
| H5          | `dist/build/h5/`          | 静态文件，可直接部署      |
| 微信小程序  | `dist/build/mp-weixin/`   | 导入微信开发者工具发布    |
| App Android | `dist/build/app-android/` | 需 HBuilderX 打包签名     |
| App iOS     | `dist/build/app-ios/`     | 需 HBuilderX + Apple 证书 |
