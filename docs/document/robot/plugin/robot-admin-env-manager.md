# @robot-admin/env-manager

> 让环境变量管理不再是噩梦 ✨

专门解决多环境开发中那些让人抓狂的配置问题。每次切换环境都要手动改 `.env` 文件？测试配置误推到生产？这个工具就是为了这些烦恼而生的。

## 🎯 为什么要做这个？

多环境开发中经常遇到的痛点：

- 😤 **环境配置混乱**：dev、test、prod 的 `.env` 文件到处都是，经常搞混
- 🤦‍♂️ **切换环境麻烦**：每次手动改配置文件，容易出错还费时间
- 😮‍💨 **团队协作困难**：每个人的环境配置都不一样，新人入职配置半天

就想着能不能有个工具，一键切换环境，让配置管理变得简单一些。

## ✨ 现在的效果

### 🔧 一键环境切换

`env-manager dev` 一行命令，开发环境配置立即生效。

### 🎨 精美的命令行界面

统一的输出格式，操作进度一目了然。

### 🛡️ 智能配置合并

自动合并通用配置和环境特定配置，避免重复定义。

### 📁 规范的目录结构

所有环境配置集中管理，清晰有序。

## ✨ 工具特性

简单说就是做了这几件事：

- 🎨 **精美界面** - 现代化的命令行输出，操作状态清晰展示
- 🔧 **智能合并** - 自动合并通用配置和环境特定配置
- ⚡ **一键切换** - 秒速切换开发、测试、生产环境
- 🛡️ **安全可靠** - 智能验证，防止配置错误和误操作
- 📁 **规范管理** - 统一的环境文件目录结构
- 🚀 **零学习成本** - 看一眼就会用，团队推广无障碍

## 🚀 快速体验

### 安装个包

```bash
npm install -g @robot-admin/env-manager
```

### 试试看

```bash
# 初始化项目
env-manager --init

# 切换到开发环境
env-manager dev

# 切换到生产环境
env-manager prod

# 看看有哪些环境
env-manager --scan
```

## 🎭 效果展示

### 初始化项目

```bash
────────────────────────────────────────────────────────────
▲ Robot Admin — 环境配置管理工具

⚙ 初始化项目
✓ .env 创建成功
✓ .env.development 创建成功
✓ .env.test 创建成功
✓ .env.staging 创建成功
✓ .env.production 创建成功

快速开始
   env-manager dev     切换到开发环境
   env-manager prod    切换到生产环境
   env-manager --scan  扫描环境文件
────────────────────────────────────────────────────────────
```

### 环境切换

```bash
────────────────────────────────────────────────────────────
▲ Robot Admin — 环境配置管理工具

⚙ 开始处理 production 环境
✓ 通用配置 读取成功
✓ 环境配置 读取成功
⚙ 合并配置 已完成
⚙ 写入文件 已完成

● 环境切换 成功
   环境: PRODUCTION
   变量: 12 个
   状态: 已生效
────────────────────────────────────────────────────────────
```

## 🎨 设计细节

### 目录结构

创建后会是这样的结构：

```
your-project/
├── envs/
│   ├── .env                    # 通用配置
│   ├── .env.development        # 开发环境
│   ├── .env.test              # 测试环境
│   ├── .env.staging           # 预发布环境
│   └── .env.production        # 生产环境
└── .env                       # 当前激活的环境配置
```

### 配置合并逻辑

- 环境特定配置 > 通用配置
- 自动添加注释说明变量来源
- 生成的 `.env` 文件有清晰的分区

### 界面设计

- 统一的分隔线边框
- 彩色状态显示（成功绿色、处理黄色、错误红色）
- 操作进度实时展示

## 🛠️ 使用方式

### 基本命令

```bash
# 切换环境
env-manager dev          # 开发环境
env-manager test         # 测试环境
env-manager staging      # 预发布环境
env-manager prod         # 生产环境

# 管理命令
env-manager --init       # 初始化项目
env-manager --scan       # 扫描环境文件
env-manager --help       # 帮助信息
```

### 项目集成

**Package.json 脚本**

```json
{
  "scripts": {
    "env:dev": "env-manager dev",
    "env:prod": "env-manager prod",
    "dev": "env-manager dev && npm run start",
    "build:prod": "env-manager prod && npm run build"
  }
}
```

**GitHub Actions**

```yaml
- name: Setup Environment
  run: |
    npm install -g @robot-admin/env-manager
    env-manager production
    npm run build
```

### 配置示例

**envs/.env（通用配置）**

```bash
APP_NAME=我的项目
APP_VERSION=1.0.0
DATABASE_TIMEOUT=30000
```

**envs/.env.development（开发环境）**

```bash
NODE_ENV=development
API_URL=http://localhost:3000
DEBUG=true
```

**envs/.env.production（生产环境）**

```bash
NODE_ENV=production
API_URL=https://api.myapp.com
DEBUG=false
```

## 🔧 技术实现

主要技术点：

**文件操作**

- 基于 Node.js 内置模块，零外部依赖
- 智能文件权限检查
- 安全的文件读写操作

**配置合并**

- 解析 `.env` 文件格式
- 按优先级合并配置项
- 自动生成注释和分区

**界面渲染**

- ANSI 颜色码支持
- 统一的输出块格式
- 跨平台兼容性

## 🤔 一些说明

**Q: 支持哪些环境？**  
A: dev、test、staging、prod，还支持别名。

**Q: 会覆盖我现有的 .env 吗？**  
A: 会的，所以建议先备份或用 Git 管理。

**Q: 可以自定义环境文件目录吗？**  
A: 支持，通过编程式 API 可以指定。

**Q: 团队怎么共享配置？**  
A: 把 `envs/` 目录提交到 Git，`.env` 文件加到 `.gitignore`。

**Q: 出错了怎么办？**  
A: 工具有完善的错误提示，按提示操作即可。

## 🎉 一起完善

这个工具还在持续优化中，如果你：

- 🐛 遇到问题或发现 bug
- 💡 有好的功能建议
- 🔧 想贡献代码改进

都很欢迎在 GitHub 上参与讨论！

---

## 📎 相关链接

[![npm version](https://badge.fury.io/js/robot-admin-env-manager.svg)](https://www.npmjs.com/package/robot-admin-env-manager)
[![GitHub stars](https://img.shields.io/github/stars/ChenyCHENYU/robot-admin-env-manager?style=social)](https://github.com/ChenyCHENYU/robot-admin-env-manager)

如果这个工具解决了你的环境配置烦恼，给个 star 支持一下吧 ⭐

[GitHub 仓库](https://github.com/ChenyCHENYU/robot-admin-env-manager) • [NPM 包](https://www.npmjs.com/package/robot-admin-env-manager) • [问题反馈](https://github.com/ChenyCHENYU/robot-admin-env-manager/issues)
