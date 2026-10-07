---
outline: "deep"
description: "Robot CLI 脚手架 — 60 秒创建项目，智能模板分类、搜索筛选、自动检测 bun/pnpm"
reviewAfter: "2027-04-07"
---

# Robot CLI

> 让项目搭建从此告别复制粘贴 ✨

我写这个脚手架工具，为解决项目初始化时那些重复劳动的问题。每次新项目都要手动配置 `vite`、`webpack`、`eslint`、路由等等？复制老项目又担心带入历史包袱？这个工具就是为了这些烦恼而生的。

## 🎯 为什么要做这个？

现代项目开发中经常遇到的痛点：

- 😤 **搭建项目费时费力**：配置各种工具链，一个新项目要折腾大半天
- 🤦‍♂️ **模板过时难维护**：网上找的模板要么太老，要么不符合团队规范
- 😮‍💨 **团队标准不统一**：每个人搭的项目结构都不一样，维护成本高

特别是在团队协作中，项目初始化的标准化变得越来越重要，就想着能不能有个工具，一条命令创建出符合团队规范的完整项目，保持工程化结构和标准化规范的统一。

## ✨ 现在的效果

### 🚀 一键创建完整项目

`robot create` 一条命令，60 秒内搭建好包含完整配置的项目。

### 📦 丰富的模板生态

涵盖前端、后端、移动端、桌面端等各种技术栈。

### 🌐 总是最新版本

每次创建都下载最新模板，确保依赖和配置都是最新的。

### 🎨 现代化交互体验

清晰的进度提示和友好的用户界面，操作体验很舒服。

## ✨ 工具特性

简单说就是做了这几件事：

- 🎯 **智能模板分类** - 推荐模板、分类浏览、关键词搜索
- ⚡ **极速项目创建** - 一条命令创建完整项目架构
- 📦 **现代包管理器** - 优先推荐 bun/pnpm，智能检测最佳选择
- 🌐 **总是最新版本** - 每次创建都下载最新模板，无缓存困扰
- 🎨 **友好用户界面** - 现代化终端交互，清晰进度提示

## 🚀 快速体验

### 安装个包

```bash
npm install -g @agile-team/robot-cli
```

### 试试看

```bash
# 交互式创建（推荐）
robot create

# 快速创建指定模板
robot create my-vue-admin --template robot-admin

# 查看所有模板
robot list
```

## 🎭 使用演示

### 交互式创建流程

```bash
$ robot create

   ██████  ██████  ██████   ██████  ████████
   ██   ██ ██    ██ ██   ██ ██    ██    ██
   ██████  ██    ██ ██████  ██    ██    ██
   ██   ██ ██    ██ ██   ██ ██    ██    ██
   ██   ██  ██████  ██████   ██████     ██

🤖 Robot CLI - 现代化项目脚手架工具

? 项目名称: my-awesome-project
? 选择模板类型: 🎨 前端项目
? 选择技术栈: Vue.js
? 选择架构模式: 单体应用
? 选择具体模板: robot-admin (后台管理系统完整版)
? 包管理器: bun (推荐)

🚀 开始创建项目...
✅ 下载模板 (2.3s)
✅ 处理文件 (0.5s)
✅ 安装依赖 (15.2s)
✅ 初始化 Git (0.3s)

🎉 项目创建成功！

📁 项目路径: ./my-awesome-project
🚀 启动命令: cd my-awesome-project && bun run dev
📖 项目文档: README.md
```

### 快速创建指定模板

```bash
$ robot create my-blog --template robot-admin-base

🤖 正在创建项目 my-blog...
📦 使用模板: robot-admin-base
⚡ 包管理器: bun (自动检测)

✅ 项目创建完成！ (18.5s)
```

## 📋 完整模板列表

当然，模板在陆续补充中，欢迎参与共建。

### 🎨 前端项目

#### Vue.js 生态

| 模板名称           | 描述               | 特性                                            | 适用场景       |
| ------------------ | ------------------ | ----------------------------------------------- | -------------- |
| `robot-admin`      | 后台管理系统完整版 | Vue3 + TypeScript + Element Plus + 完整权限系统 | 企业级后台管理 |
| `robot-admin-base` | 后台管理系统精简版 | Vue3 + TypeScript + Element Plus + 基础功能     | 快速原型开发   |
| `robot-micro`      | 微前端架构         | MicroApp + Vue3 + 子应用示例                    | 大型项目拆分   |

#### React.js 生态

| 模板名称      | 描述             | 特性                                               | 适用场景         |
| ------------- | ---------------- | -------------------------------------------------- | ---------------- |
| `robot-react` | React 后台完整版 | React 18 + TypeScript + Ant Design + Redux Toolkit | React 技术栈后台 |

### 📱 移动端项目

| 模板名称       | 描述     | 特性                            | 适用场景             |
| -------------- | -------- | ------------------------------- | -------------------- |
| `robot-uniapp` | 多端应用 | uni-app + TypeScript + uView UI | 小程序/H5/App 一体化 |

### 🚀 后端项目

| 模板名称     | 描述           | 特性                                | 适用场景        |
| ------------ | -------------- | ----------------------------------- | --------------- |
| `robot-nest` | 企业级 Node.js | NestJS + TypeScript + JWT + Swagger | 企业级 API 服务 |
| `robot-koa3` | 轻量级 Node.js | Koa3 + TypeScript + 简洁架构        | 快速 API 开发   |

### 💻 桌面端项目

| 模板名称         | 描述                   | 特性                         | 适用场景       |
| ---------------- | ---------------------- | ---------------------------- | -------------- |
| `robot-electron` | 跨平台桌面应用         | Electron + Vue3 + TypeScript | 桌面端工具应用 |
| `robot-tauri`    | 轻量级桌面应用（备选） | Tauri + Vue3 + Rust 后端     | 高性能桌面应用 |

## 🎨 使用场景展示

### 场景 1：新项目快速启动

```bash
# 项目经理：我们要做个新的后台管理系统
robot create admin-v2 --template robot-admin

# 15分钟后...
cd admin-v2 && bun run dev
# 项目已经跑起来，包含完整的用户管理、权限控制、主题切换
```

### 场景 2：技术预研

```bash
# 我想试试微前端架构
robot create micro-demo --template robot-micro

# 几分钟后就有一个完整的微前端示例项目
```

### 场景 3：团队规范统一

```bash
# 新同事入职，让他按标准搭个项目
robot create my-first-project
# 选择 robot-admin-base

# 生成的项目自动包含团队的代码规范、提交规范、目录结构
```

## 🛠️ 详细使用指南

### 创建项目的多种方式

#### 1. 交互式创建（推荐新手）

```bash
robot create
# 会引导你选择模板类型、技术栈、具体模板等
```

#### 2. 指定模板创建（推荐熟练用户）

```bash
robot create my-project --template robot-admin
robot create my-api --template robot-nest
robot create my-app --template robot-uniapp
```

#### 3. 跳过依赖安装

```bash
robot create my-project --template robot-admin --skip-install
# 只创建项目结构，不安装依赖
```

### 模板管理命令

#### 查看所有模板

```bash
robot list
# 显示分类的完整模板列表
```

#### 查看推荐模板

```bash
robot list --recommended
# 只显示最常用的推荐模板
```

#### 搜索模板

```bash
robot search vue          # 搜索包含 vue 的模板
robot search admin         # 搜索管理系统相关模板
robot search typescript    # 搜索 TypeScript 相关模板
```

### 包管理器智能选择

Robot CLI 会按以下优先级自动选择包管理器：

```bash
1. bun    🥇 # 极速安装，现代化 （推荐）
2. pnpm   🥈 # 快速安装，节省空间
3. yarn   ⚖️ # 兼容现有项目
4. npm    ⚖️ # Node.js 默认
```

也可以手动指定：

```bash
robot create my-project --pm npm      # 使用 npm
robot create my-project --pm yarn     # 使用 yarn
robot create my-project --pm pnpm     # 使用 pnpm
robot create my-project --pm bun      # 使用 bun
```

## 🎨 设计细节

### 为什么选择"总是最新"策略

Robot CLI 不使用本地缓存，每次创建项目都会下载最新版本的模板：

**优势：**

- ✅ **确保最新**: 总是获得最新的代码和依赖
- ✅ **避免冲突**: 无需担心缓存过期或版本不一致
- ✅ **简化维护**: 用户无需管理缓存，开发者无需考虑缓存策略
- ✅ **减少错误**: 避免因缓存损坏导致的创建失败

**权衡：**

- 需要网络连接
- 首次下载稍慢（但模板都经过优化，通常很快）

### 模板命名规范

- **CLI 命令名**: `robot-xxx` (如：robot-admin)
- **GitHub 仓库名**: `Robot_Xxx` (如：Robot_Admin)
- **精简版后缀**: `-base` (如：robot-admin-base)

### 文件处理规则

模板下载后会自动处理：

- `_gitignore` → `.gitignore`
- `_env.example` → `.env.example`
- 替换 package.json 中的项目名称
- 自动初始化 Git 仓库

## 🔧 高级用法

### 企业内部定制

#### 1. 基于 Robot CLI 二次开发

```bash
# 1. Fork 并克隆项目
git clone https://github.com/YOUR_USERNAME/robot-cli.git
cd robot-cli && npm install

# 2. 修改配置
# 编辑 package.json 中的包名和命令名
# 编辑 lib/templates.js 替换为你的模板仓库

# 3. 发布自己的 CLI
npm version 1.0.0
npm publish --access public
```

#### 2. 自定义模板源

```javascript
// lib/templates.js
export const TEMPLATE_CATEGORIES = {
  frontend: {
    name: "🎨 前端项目",
    stacks: {
      vue: {
        name: "Vue.js",
        patterns: {
          monolith: {
            name: "单体应用",
            templates: {
              "your-admin": {
                name: "你的后台模板",
                repoUrl: "https://github.com/YOUR_ORG/Your_Admin_Template",
                // ...
              },
            },
          },
        },
      },
    },
  },
};
```

#### 3. 添加自定义命令

```javascript
// lib/plugins/deploy.js
export function addDeployCommand(program) {
  program
    .command("deploy")
    .description("部署项目到服务器")
    .action(async () => {
      // 你的部署逻辑
    });
}
```

### 配置文件支持

#### 项目级配置

```json
// robot.config.json
{
  "defaultTemplate": "robot-admin",
  "packageManager": "bun",
  "gitInit": true,
  "skipInstall": false
}
```

#### 全局配置

```json
// ~/.robot-cli/config.json
{
  "defaultOrg": "YourOrg",
  "alwaysLatest": true,
  "preferredPM": "bun"
}
```

### CI/CD 集成

```yaml
# GitHub Actions
name: Create Project
on:
  workflow_dispatch:
    inputs:
      project_name:
        description: "Project name"
        required: true
      template:
        description: "Template to use"
        required: true

jobs:
  create:
    runs-on: ubuntu-latest
    steps:
      - name: Create project
        run: |
          npm install -g @agile-team/robot-cli
          robot create ${{ github.event.inputs.project_name }} \
            --template ${{ github.event.inputs.template }} \
            --skip-install
```

## 📚 模板开发指南

### 创建新模板

#### 1. 模板仓库结构

```
Robot_Your_Template/
├── package.json          # 必需，定义项目信息
├── README.md             # 必需，模板说明文档
├── _gitignore            # 会被重命名为 .gitignore
├── _env.example          # 会被重命名为 .env.example
├── src/                  # 源代码目录
├── public/               # 静态资源目录
└── ...                   # 其他项目文件
```

#### 2. package.json 规范

```json
{
  "name": "robot-your-template",
  "version": "1.0.0",
  "description": "模板描述",
  "keywords": ["vue", "admin", "template"],
  "author": "Your Name",
  "license": "MIT",
  "scripts": {
    "dev": "...",
    "build": "...",
    "lint": "..."
  }
}
```

#### 3. 添加到 CLI 配置

```javascript
// lib/templates.js
'robot-your-template': {
  name: '你的模板名称',
  description: '详细的模板描述',
  repoUrl: 'https://github.com/ChenyCHENYU/Robot_Your_Template',
  features: ['Vue3', 'TypeScript', '特色功能'],
  version: 'full',
  recommended: true  // 是否为推荐模板
}
```

### 模板最佳实践

#### 必须包含的文件

- ✅ `package.json` - 项目配置
- ✅ `README.md` - 使用说明
- ✅ `_gitignore` - Git 忽略规则
- ✅ TypeScript 配置（如适用）
- ✅ 代码规范配置（ESLint、Prettier）

#### 推荐的目录结构

```
src/
├── components/      # 公共组件
├── views/          # 页面组件
├── router/         # 路由配置
├── store/          # 状态管理
├── api/            # API 接口
├── utils/          # 工具函数
├── styles/         # 样式文件
└── types/          # 类型定义
```

#### 代码规范

- 使用 TypeScript（强烈推荐）
- 统一的代码格式化配置
- 详细的注释说明
- 完整的错误处理
- 响应式设计支持

## 🔧 技术实现

### 核心技术栈

- **Node.js** - 运行环境
- **Commander.js** - 命令行框架
- **Inquirer.js** - 交互式提示
- **Download-git-repo** - Git 仓库下载
- **Ora** - 加载动画
- **Chalk** - 终端颜色

### 主要模块

```
robot-cli/
├── bin/index.js          # CLI 入口文件
├── lib/
│   ├── templates.js      # 模板配置管理
│   ├── create.js         # 项目创建核心逻辑
│   ├── download.js       # 模板下载处理
│   ├── install.js        # 依赖安装管理
│   └── utils.js          # 通用工具函数
└── test/
    └── local-test.js     # 本地测试脚本
```

### 创建流程

1. **参数解析** - 解析命令行参数和选项
2. **模板选择** - 交互式或直接指定模板
3. **目录创建** - 创建项目目录
4. **模板下载** - 从 GitHub 下载最新模板
5. **文件处理** - 重命名和替换模板文件
6. **依赖安装** - 使用最佳包管理器安装依赖
7. **Git 初始化** - 初始化 Git 仓库
8. **完成反馈** - 显示项目信息和启动命令

## 🤔 常见问题

### 安装和使用问题

**Q: 提示 "command not found: robot"？**  
A: 需要全局安装 CLI：`npm install -g @agile-team/robot-cli`

**Q: 下载模板失败？**  
A: 检查网络连接，确保能访问 GitHub。可以尝试使用代理或换个网络环境。

**Q: 依赖安装失败？**  
A: 可以使用 `--skip-install` 跳过自动安装，进入项目目录后手动安装：

```bash
robot create my-project --skip-install
cd my-project && npm install
```

### 模板相关问题

**Q: 如何添加自定义模板？**  
A:

1. 创建符合规范的模板仓库
2. 在 `lib/templates.js` 中添加配置
3. 测试模板功能

**Q: 支持私有仓库吗？**  
A: 目前仅支持公开的 GitHub 仓库，私有仓库支持在计划中。

**Q: 模板版本如何管理？**  
A: 每次创建都下载最新版本，建议模板仓库使用语义化版本标签。

### 定制化问题

**Q: 能否修改默认包管理器？**  
A: 可以通过 `--pm` 参数指定，或在配置文件中设置默认值。

**Q: 如何基于 Robot CLI 做企业定制？**  
A: Fork 项目后修改模板配置和品牌信息，详见"高级用法"章节。

**Q: 支持插件系统吗？**  
A: 当前版本暂不支持，但在后续版本的规划中。

## 🎉 一起完善

这个脚手架还在持续演进中，如果你：

- 🐛 遇到使用问题或发现 bug
- 💡 有新的模板需求或建议
- 🔧 想贡献代码或添加新功能
- 📋 想贡献新的项目模板

都很欢迎在 GitHub 上参与讨论！特别欢迎贡献高质量的项目模板。

### 贡献模板

如果你有优秀的项目模板想要分享：

1. 按照模板开发指南创建仓库
2. 提交 Issue 说明模板特色
3. 经过 Review 后会加入 `Robot` 模板库

---

## 📎 相关链接

[![npm version](https://img.shields.io/npm/v/@agile-team/robot-cli.svg)](https://www.npmjs.com/package/@agile-team/robot-cli)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/robot-cli?style=social)](https://github.com/ChenyCHENYU/robot-cli)

如果这个脚手架让你的项目搭建变得更高效，给个 star 支持一下吧 ⭐

[GitHub 仓库](https://github.com/ChenyCHENYU/robot-cli) • [NPM 包](https://www.npmjs.com/package/@agile-team/robot-cli) • [问题反馈](https://github.com/ChenyCHENYU/robot-cli/issues)

---

:::tip **一条命令，开启你的下一个项目！** 🚀

```bash
npm install -g @agile-team/robot-cli
robot create my-awesome-project
```
:::