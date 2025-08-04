---
outline: "deep"
---

# Robot Admin 开发环境搭建指南

<div class="hero-banner">
  <h2>⚡ 8 分钟快速上手开发</h2>
  <p>无论您是新团队成员还是贡献者，这份文档都将帮助您快速上手，配备合适的工具和配置</p>
</div>

本指南将指导您设置 Robot Admin 项目的开发环境。通过 Bun 的毫秒级热重载和闪电般的依赖安装，您将体验到显著提升的开发速度。

## 📋 环境准备

在开始之前，请确保您的系统已安装以下软件：

| 工具        | 版本要求     | 说明                                       |
| ----------- | ------------ | ------------------------------------------ |
| **Git**     | 最新版本     | 用于克隆和版本控制                         |
| **Bun**     | ≥ 1.x        | 本项目首选的 JavaScript 运行时（强烈推荐） |
| **Node.js** | 备选方案     | 如果您因某些原因无法使用 Bun               |
| **IDE**     | VS Code 推荐 | 建议安装 Vue 和 TypeScript 扩展            |

::: tip 💡 为什么选择 Bun？
与 npm 相比，Bun 提供了显著更快的安装和开发体验，通过毫秒级的热重载和闪电般的依赖安装，大幅提升了开发速度。
:::

## 🚀 安装指南

### 步骤 1：安装 Bun（推荐）

```bash
# 使用npm安装
npm install -g bun

# 验证安装
bun --version
```

### 步骤 2：克隆仓库

```bash
# 克隆项目
git clone https://github.com/ChenyCHENYU/Robot_Admin.git

# 进入项目目录
cd Robot_Admin
```

### 步骤 3：安装依赖

::: code-group

```bash [使用 Bun（推荐 - 更快）]
bun install
```

```bash [备选使用 pnpm（较慢）]
pnpm install
```

:::

项目为 Bun 优化了配置，显著提升了开发体验，包括更快的安装时间和热重载。

## ⚙️ 环境配置

Robot Admin 使用了一个复杂的环境配置系统，能够自动处理不同的环境。

### 环境文件结构

项目通过 `envs/` 目录中的文件管理特定环境的配置：

```
envs/
├── .env.development    # 开发环境变量
├── .env.test          # 测试环境变量
├── .env.staging       # 预生产环境变量
├── .env.production    # 生产环境变量
└── .env               # 各环境共享的通用变量
```

这些文件在构建和开发过程中会自动合并。

### 环境文件工作原理

项目使用自定义脚本（`scripts/copy-env.mjs`）进行以下操作：

1. **合并配置** - 将通用 `.env` 文件与环境特定文件（如 `.env.development`）合并
2. **文件生成** - 将合并结果放置在项目根目录下作为 `.env`
3. **自动加载** - Vite 在构建或开发时加载这些环境变量

这在运行开发或构建命令时自动发生。

## 🛠️ 开发流程

### 启动开发服务器

要启用热重载并启动开发服务器：

```bash
bun dev
```

这将：

- 复制并合并适当的环境变量
- 启动 Vite 的开发服务器
- 启用热模块替换以实现即时更新

**性能表现：** 首次启动通常不到 2 秒，后续热更新时间少于 100 毫秒。

### 为不同环境构建

项目支持为不同环境进行构建：

```bash
# 生产环境构建
bun run build

# 测试环境构建
bun run build:test

# 预生产环境构建
bun run build:staging

# 本地预览构建
bun run preview
```

每个命令会自动选择适当的环境配置文件。

## 🔍 代码质量工具

Robot Admin 通过多种工具强制执行高代码质量标准：

### 类型检查

```bash
# 开发时使用观察模式进行类型检查
bun run type-watch

# 智能类型分析
bun run type:check

# 构建类型定义
bun run type-build
```

TypeScript 配置为严格类型检查，以便尽早捕获错误。

### 代码检查和格式化

```bash
# 运行ESLint检查和修复代码
bun run lint

# 使用Prettier格式化代码
bun run format
```

**工具栈：**

- **ESLint 9.x** - 包含 Vue 和 TypeScript 插件
- **Prettier 3.5.x** - 用于一致的代码格式化
- **Oxlint** - 由 Rust 驱动的检查器，实现超快代码检查

### 测试

```bash
# 运行单元测试
bun run test:unit
```

项目使用 Vitest 进行单元测试，提供出色的 Vue 组件测试支持。

## 📝 Git 工作流和提交

项目通过以下方式强制执行一致的 Git 提交：

```bash
# 使用commitizen进行提交
bun run commit
```

这使用 Commitizen 确保标准化提交信息。

## 🔧 项目配置

### Vite 配置

项目使用 Vite 并包含多个插件：

- **Vue 和 Vue JSX 支持**
- **UnoCSS** - 用于实用优先的 CSS
- **组件自动导入**
- **图标管理**
- **Vue DevTools 集成**

配置优化了捆绑拆分和开发性能。

### TypeScript 配置

TypeScript 配置为严格类型检查，并支持 Vue 类型。使用多个 tsconfig 文件用于不同目的：

| 配置文件                        | 用途              |
| ------------------------------- | ----------------- |
| `tsconfig.json`                 | 根配置            |
| `tsconfig/tsconfig.app.json`    | 应用特定配置      |
| `tsconfig/tsconfig.node.json`   | Node 特定代码配置 |
| `tsconfig/tsconfig.vitest.json` | 测试配置          |

## 💡 优化开发体验

### 推荐的 VS Code 扩展

仓库包含一个 `extensions.json` 文件，列出了推荐的 VS Code 扩展：

- **Vue (Official)** - 支持 Vue 3
- **ESLint 和 Prettier 扩展**
- **TypeScript 支持**
- **UnoCSS 扩展**

### 性能提示

1. **使用 Bun** - 显著快于 pnpm/yarn
2. **观察模式类型检查** - 在单独的终端运行 `bun run type-watch` 进行实时类型检查
3. **组件库** - 利用 `src/components/global` 中的现有组件保持一致性

## 🔧 故障排除

### 常见问题

**1. 环境变量未加载**

- 确保使用正确的命令（`bun dev`，而不是 `vite`）
- 检查 `envs/` 目录中是否存在环境文件

**2. 类型错误**

- 运行 `bun run type:check` 获取详细的类型错误信息，其实我更推荐使用检查插件，运行 `bun run check-types` 帮助你精确锁定类型错误
- 如果问题持续，检查 `tsconfig.json` 设置

**3. 构建错误**

- 使用 `bun clean` 清除缓存并重试
- 验证所有依赖是否正确安装

**4. 热重载不工作**

- 检查是否使用 Vite 的开发服务器（`bun dev`）
- 验证文件更改是否已保存

## 🎉 开发愉快！

现在您已具备开始开发 Robot Admin 所需的一切。项目优先考虑开发者体验，提供快速工具、全面的类型安全和可维护的代码实践。

如果您遇到本指南未涵盖的问题，请参考项目文档或联系团队寻求帮助。

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
