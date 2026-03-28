---
outline: "deep"
---

# 项目结构

> 📁 清晰的目录组织是企业级项目的基石，Robot uniApp 遵循 **功能聚合、关注点分离** 原则。

## 📂 完整目录树

```
Robot_uniApp/
│
├── 📁 src/                         # 源代码目录
│   │
│   ├── 📄 main.ts                  # 应用入口（createSSRApp）
│   ├── 📄 App.vue                  # 根组件（全局初始化）
│   ├── 📄 pages.json               # 页面路由配置（UniApp 规范）
│   ├── 📄 manifest.json            # App / H5 工程配置
│   ├── 📄 uni.scss                 # uni-app 全局 SCSS 变量
│   ├── 📄 env.d.ts                 # 环境变量类型声明
│   │
│   ├── 📁 pages/                   # ★ 页面目录（对应路由）
│   │   ├── index/                  # 首页 Dashboard
│   │   ├── login/                  # 登录页
│   │   ├── register/               # 注册页
│   │   ├── message/                # 消息中心
│   │   ├── profile/                # 个人中心
│   │   ├── settings/               # 设置页
│   │   ├── robot/                  # 组件库演示总页
│   │   ├── demo/                   # 33 个组件演示分页
│   │   ├── crud-list/              # CRUD 列表模板
│   │   ├── detail/                 # 详情页模板
│   │   ├── form-template/          # 表单页模板
│   │   ├── approval/               # 审批流模板
│   │   ├── dashboard/              # 数据看板模板
│   │   ├── search-result/          # 搜索结果页
│   │   ├── scan/                   # 扫码页
│   │   ├── webview/                # WebView 嵌入页
│   │   ├── guide/                  # 引导页
│   │   └── about/                  # 关于页
│   │
│   ├── 📁 components/              # 组件目录
│   │   └── global/                 # ★ 全局组件（33 个，easycom 自动注册）
│   │       ├── C_Layout/           # 页面布局
│   │       ├── C_Header/           # 导航头部
│   │       ├── C_Tabbar/           # 底部导航
│   │       ├── C_TabNav/           # 标签导航
│   │       ├── C_Card/             # 卡片
│   │       ├── C_Icon/             # 通用图标
│   │       ├── C_Form/             # 表单
│   │       ├── C_Modal/            # 弹窗
│   │       ├── C_Upload/           # 文件上传
│   │       └── ...（共 33 个）
│   │
│   ├── 📁 composables/             # ★ 组合式函数（Hooks）
│   │   ├── index.ts                # 统一导出
│   │   ├── useLoading.ts           # 加载态管理
│   │   ├── usePagination.ts        # 分页逻辑
│   │   ├── useUpload.ts            # 文件上传
│   │   ├── useWebSocket.ts         # WebSocket 管理
│   │   ├── useModal.ts             # 弹窗控制
│   │   ├── useCountdown.ts         # 倒计时
│   │   ├── useNetwork.ts           # 网络状态检测
│   │   ├── useShare.ts             # 分享功能
│   │   └── usePageSkeleton.ts      # 骨架屏管理
│   │
│   ├── 📁 stores/                  # ★ 状态管理（Pinia）
│   │   ├── index.ts                # Pinia 实例 + 持久化配置
│   │   └── modules/
│   │       ├── user.ts             # 用户信息 / 登录状态
│   │       ├── app.ts              # 全局应用状态（系统信息、网络）
│   │       ├── settings.ts         # 用户偏好设置
│   │       ├── message.ts          # 消息/通知状态
│   │       └── notification.ts     # 通知管理
│   │
│   ├── 📁 api/                     # ★ 接口层
│   │   ├── index.ts                # 统一导出
│   │   ├── factory.ts              # 接口工厂函数
│   │   └── modules/
│   │       ├── user.ts             # 用户相关接口
│   │       ├── dashboard.ts        # 看板数据接口
│   │       ├── crud.ts             # 通用 CRUD 接口
│   │       ├── approval.ts         # 审批流接口
│   │       └── message.ts          # 消息接口
│   │
│   ├── 📁 utils/                   # ★ 工具函数
│   │   ├── http.ts                 # HTTP 请求封装（去重/重试/取消）
│   │   ├── router.ts               # 路由封装 + 权限守卫
│   │   ├── permission.ts           # 权限检查工具
│   │   ├── error-handler.ts        # 全局错误处理
│   │   └── v_verify.ts             # 表单校验规则封装
│   │
│   ├── 📁 styles/                  # 样式目录
│   │   ├── index.scss              # 样式入口（全局导入）
│   │   ├── variables.scss          # CSS 变量（主题色等）
│   │   ├── mixins.scss             # SCSS 混入（全局可用）
│   │   ├── reset.scss              # 样式重置
│   │   └── transition.scss         # 过渡动画
│   │
│   ├── 📁 types/                   # TypeScript 类型定义
│   │   ├── index.ts                # 通用类型
│   │   ├── http.ts                 # HTTP 相关类型
│   │   ├── store.ts                # Store 状态类型
│   │   ├── websocket.ts            # WebSocket 类型
│   │   └── modules/                # 各组件类型定义（33 个）
│   │
│   ├── 📁 constants/               # 常量定义
│   │   ├── index.ts                # 统一导出
│   │   ├── app.ts                  # 应用常量
│   │   ├── business.ts             # 业务常量
│   │   ├── regex.ts                # 正则表达式
│   │   ├── storage.ts              # 存储键名
│   │   └── gradients.ts            # 渐变色配置
│   │
│   ├── 📁 directives/              # 自定义指令
│   │   ├── index.ts                # 指令汇总
│   │   ├── install.ts              # 指令安装器
│   │   └── modules/
│   │       └── permission.ts       # v-permission 权限指令
│   │
│   ├── 📁 config/                  # 运行时配置
│   │   └── env.ts                  # 环境变量读取
│   │
│   ├── 📁 data/                    # 静态数据
│   │   ├── pca-code.json           # 省市区编码数据
│   │   └── province.json           # 省份数据
│   │
│   ├── 📁 mock/                    # Mock 数据（dev 环境）
│   └── 📁 static/                  # 静态资源（图片等）
│
├── 📁 mock/                        # 根级 Mock（vite-plugin-mock-dev-server）
│   ├── user.mock.ts
│   ├── dashboard.mock.ts
│   ├── crud.mock.ts
│   ├── approval.mock.ts
│   └── message.mock.ts
│
├── 📁 env/                         # 环境变量配置
│   ├── .env                        # 通用环境变量
│   ├── .env.development            # 开发环境
│   ├── .env.test                   # 测试环境
│   ├── .env.staging                # 预发布环境
│   └── .env.production             # 生产环境
│
├── 📄 vite.config.js               # Vite 构建配置
├── 📄 uno.config.js                # UnoCSS 原子化 CSS 配置
├── 📄 tsconfig.json                # TypeScript 配置
├── 📄 eslint.config.ts             # ESLint 配置
└── 📄 package.json                 # 项目依赖与脚本
```

## 🗝️ 关键文件详解

### `pages.json` — 路由配置

UniApp 的路由通过 `pages.json` 统一管理（而非 Vue Router）：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^wd-(.*)": "wot-design-uni/components/wd-$1/wd-$1.vue",
      "^C_(.*)": "@/components/global/C_$1/index.vue"
    }
  },
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "主控台",
        "navigationStyle": "custom"
      }
    }
  ],
  "subPackages": [
    {
      "root": "pages/demo",
      "pages": [...]
    }
  ]
}
```

::: tip 分包加载
组件演示页放在 `subPackages` 中，减少主包体积，提升小程序首屏加载速度。
:::

### `main.ts` — 应用入口

```ts
import { createSSRApp } from "vue";
import pinia from "./stores";
import { initRouter, setUserStore } from "./utils/router";
import { installDirectives } from "./directives";
import { setupErrorHandler } from "./utils/error-handler";
import App from "./App.vue";
import "virtual:uno.css";

export function createApp() {
  const app = createSSRApp(App);

  setupErrorHandler(app); // 全局错误处理
  app.use(pinia); // 状态管理
  installDirectives(app); // 自定义指令
  initRouter(); // 初始化路由

  return { app, pinia };
}
```

### `stores/` — 状态管理

```
stores/
├── index.ts         # Pinia 实例（带持久化插件）
└── modules/
    ├── user.ts      # Token、用户信息、权限、角色
    ├── app.ts       # 系统信息、网络状态
    ├── settings.ts  # 主题、语言等偏好设置
    ├── message.ts   # 未读消息数
    └── notification.ts  # 通知管理
```

## 🎯 设计约定

| 约定                | 说明                                    |
| ------------------- | --------------------------------------- |
| **组件命名**        | `C_` 前缀 + PascalCase，如 `C_Layout`   |
| **页面路径**        | `pages/功能名/index.vue`                |
| **Store 命名**      | `use[Name]Store`，如 `useUserStore`     |
| **Composable 命名** | `use[Name]`，如 `useLoading`            |
| **类型文件**        | 与组件同名放在 `types/modules/`         |
| **API 模块**        | 按业务领域划分，放在 `api/modules/`     |
| **常量命名**        | 全大写下划线，如 `PAGINATION.PAGE_SIZE` |
