---
outline: "deep"
---

# 开发环境搭建

> 🛠️ 本章将帮助你从零搭建 Robot uniApp 的完整开发环境。

## 💻 系统要求

| 工具        | 最低版本 | 推荐版本 | 说明               |
| ----------- | -------- | -------- | ------------------ |
| **Node.js** | 18.0     | 22.x LTS | 运行时环境         |
| **pnpm**    | 8.0      | 9.x      | 推荐包管理器       |
| **Git**     | 2.x      | latest   | 版本控制           |
| **VS Code** | latest   | latest   | 代码编辑器（推荐） |

## 🔧 安装 Node.js

::: code-group

```bash [使用 nvm（推荐）]
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# 安装 Node.js LTS
nvm install --lts

# 切换到 LTS 版本
nvm use --lts

# 验证安装
node -v   # v22.x
npm -v    # 10.x
```

```bash [Windows（Winget）]
winget install OpenJS.NodeJS.LTS

# 验证安装
node -v
npm -v
```

```bash [直接下载]
# 访问 https://nodejs.org 下载 LTS 版本
node -v
npm -v
```

:::

## 📦 安装 pnpm

```bash
# 全局安装 pnpm
npm install -g pnpm

# 验证安装
pnpm -v   # 9.x
```

## 📥 克隆与安装项目

```bash
# 克隆仓库
git clone https://github.com/ChenyCHENYU/Robot_uniApp.git
cd Robot_uniApp

# 安装依赖
pnpm install

# 启动 H5 开发服务器
pnpm dev
```

浏览器打开 `http://localhost:1999`，即可看到项目运行在手机模拟器视图中。

## 🔌 VS Code 插件推荐

安装以下插件，获得最佳开发体验：

```json
// .vscode/extensions.json（建议提交到仓库）
{
  "recommendations": [
    "Vue.volar", // Vue 3 语法支持
    "antfu.unocss", // UnoCSS 智能提示
    "esbenp.prettier-vscode", // Prettier 格式化
    "dbaeumer.vscode-eslint", // ESLint 实时检查
    "lokalise.i18n-ally", // i18n 可视化
    "uni-helper.uni-app-snippets", // UniApp 代码片段
    "antfu.iconify" // Iconify 图标预览
  ]
}
```

## 🌍 环境变量配置

项目使用 `env/` 目录管理各环境配置：

```
env/
├── .env               # 所有环境共用
├── .env.development   # 开发环境（pnpm dev）
├── .env.test          # 测试环境（pnpm test）
├── .env.staging       # 预发布（pnpm staging）
└── .env.production    # 生产环境（pnpm build）
```

**`.env.development` 示例：**

```bash
VITE_ENV=development
VITE_APP_TITLE=Robot uniApp (Dev)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_VERSION=1.0.0
```

**在代码中使用：**

```ts
import config from "@/config/env";

// 读取 API 基础地址
console.log(config.API_BASE_URL);
```

## 📱 微信小程序开发环境

**Step 1**: 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

**Step 2**: 构建小程序代码

```bash
pnpm dev:wx
```

**Step 3**: 在微信开发者工具中导入：

- 目录：`dist/dev/mp-weixin`
- 填入你的 `AppID`（测试号也可）

::: warning 注意
首次运行微信开发者工具时，需要在设置 → 安全设置中开启**服务端口**。
:::

## 📲 App 开发环境

App 打包需要 **HBuilderX**（DCloud 官方 IDE）：

1. 下载安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 运行 `pnpm dev:app` 生成 App 源码
3. HBuilderX 打开项目，连接真机调试

## 🔑 Git 提交规范配置

项目预置了完整的 Git 提交规范，首次使用需安装 `husky`：

```bash
# 安装依赖后自动执行（pnpm install 会触发 prepare 钩子）
pnpm install

# 手动初始化（如果 hooks 未生效）
pnpm exec husky

# 使用交互式提交
pnpm cz
```

提交类型说明：

| 类型       | 说明                   |
| ---------- | ---------------------- |
| `feat`     | 新功能                 |
| `fix`      | 修复 bug               |
| `refactor` | 重构代码               |
| `style`    | 代码格式调整           |
| `docs`     | 文档更新               |
| `chore`    | 构建工具或辅助工具变动 |
| `perf`     | 性能优化               |

## ✅ 验证安装

运行以下命令，确认开发环境搭建成功：

```bash
# 检查代码规范
pnpm lint

# 格式化代码
pnpm format

# 启动开发服务器（H5）
pnpm dev
```

如果以上命令都无报错，恭喜你，开发环境搭建完成！ 🎉
