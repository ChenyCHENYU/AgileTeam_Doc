---
outline: "deep"
---

# Robot Admin 快速上手指南

<div class="hero-banner">
  <h2>🚀 几分钟内启动您的企业级管理后台</h2>
  <p>使用现代化技术栈，享受毫秒级热更新的极致开发体验</p>
</div>

## 📋 环境准备

在开始之前，请确保已安装以下工具：

<div class="requirements-grid">
  <div class="req-card">
    <div class="req-icon">🔧</div>
    <div class="req-title">Git</div>
    <div class="req-desc">版本控制工具</div>
  </div>
  
  <div class="req-card recommended">
    <div class="req-icon">🚀</div>
    <div class="req-title">Bun</div>
    <div class="req-desc">推荐包管理器</div>
    <div class="req-badge">推荐</div>
  </div>
  
  <div class="req-card">
    <div class="req-icon">📦</div>
    <div class="req-title">Node.js</div>
    <div class="req-desc">v20+ 运行时环境</div>
  </div>
</div>

::: tip 💡 性能提示
Bun 显著提升了安装和启动速度，因此强烈推荐用于此项目。相比传统包管理器，安装速度提升 **3-5 倍**！
:::

## 📦 快速安装

::: code-group

```bash [使用 Bun (推荐)]
# 1. 克隆仓库
git clone https://github.com/ChenyCHENYU/Robot_Admin.git

# 2. 进入项目目录
cd Robot_Admin

# 3. 安装依赖 (极速体验)
bun install

# 4. 启动开发服务器
bun dev
```

```bash [使用 pnpm]
# 1. 克隆仓库
git clone https://github.com/ChenyCHENYU/Robot_Admin.git

# 2. 进入项目目录
cd Robot_Admin

# 3. 安装依赖
pnpm install

# 4. 启动开发服务器
pnpm dev
```

```bash [使用 npm]
# 1. 克隆仓库
git clone https://github.com/ChenyCHENYU/Robot_Admin.git

# 2. 进入项目目录
cd Robot_Admin

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

:::

<div class="success-tip">
  <div class="tip-icon">🎉</div>
  <div class="tip-content">
    <div class="tip-title">启动成功！</div>
    <div class="tip-desc">开发服务器将在 <code>http://localhost:1988</code> 上运行</div>
    <div class="tip-highlight">首次启动 &lt;2秒，热更新 &lt;100毫秒</div>
  </div>
</div>

## ⚙️ 开发命令

### 核心开发命令

| 命令                | 描述              | 使用场景             |
| ------------------- | ----------------- | -------------------- |
| `bun dev`           | 🔥 启动开发服务器 | 日常开发，支持热重载 |
| `bun build`         | 📦 生产环境构建   | 部署到生产环境       |
| `bun build:test`    | 🧪 测试环境构建   | 部署到测试环境       |
| `bun build:staging` | 🚀 预发布环境构建 | 部署到预发布环境     |
| `bun preview`       | 👀 预览生产构建   | 本地验证生产版本     |

### 代码质量命令

| 命令             | 描述                   | 推荐频率   |
| ---------------- | ---------------------- | ---------- |
| `bun lint`       | ✨ ESLint 检查和修复   | 提交前必做 |
| `bun format`     | 🎨 Prettier 代码格式化 | 保存时自动 |
| `bun test:unit`  | 🧪 运行单元测试        | 开发完成后 |
| `bun type:check` | 🛡️ TypeScript 类型检查 | 构建前验证 |
| `bun type-watch` | 👀 类型检查监视模式    | 开发过程中 |

## 📁 项目结构

Robot Admin 采用清晰的模块化架构，便于维护和扩展：

::: details 📂 点击查看完整目录结构

```
src/
├── 📂 api/          # 按领域组织的API请求
├── 📂 assets/       # 静态资源（图片、全局CSS）
├── 📂 axios/        # Axios配置和请求处理
├── 📂 components/   # 可复用的Vue组件
│   ├── global/      # 全局组件（30+ 核心组件）
│   └── local/       # 局部组件
├── 📂 composables/  # Vue组合函数
├── 📂 config/       # 应用配置
├── 📂 hooks/        # 常用功能的自定义钩子
├── 📂 plugins/      # 插件设置和配置
├── 📂 router/       # Vue Router配置
├── 📂 stores/       # Pinia状态管理
├── 📂 styles/       # 全局样式和主题配置
├── 📂 types/        # TypeScript类型定义
├── 📂 utils/        # 实用函数
├── 📂 views/        # 页面组件
└── 📄 main.ts       # 应用程序入口
```

:::

<div class="architecture-highlights">
  <div class="highlight-item">
    <div class="highlight-icon">🏗️</div>
    <div class="highlight-title">关注点分离</div>
    <div class="highlight-desc">清晰的目录结构，易于导航和维护</div>
  </div>
  
  <div class="highlight-item">
    <div class="highlight-icon">🔧</div>
    <div class="highlight-title">模块化设计</div>
    <div class="highlight-desc">按功能域组织，便于团队协作</div>
  </div>
  
  <div class="highlight-item">
    <div class="highlight-icon">📈</div>
    <div class="highlight-title">可扩展性</div>
    <div class="highlight-desc">支持从单体到微前端的演进</div>
  </div>
</div>

## 🔧 应用程序引导

Robot Admin 采用结构化的初始化流程，确保所有依赖项在应用启动前正确加载：

::: code-group

```typescript [main.ts 启动流程]
async function bootstrap() {
  // 第一阶段：非Vue相关的初始化
  setupLoading();

  // 第二阶段：创建Vue实例，初始化Pinia
  const app = createApp(App);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);

  // 使用去除滚动警告的插件
  app.use(PassiveScrollPlugin);

  // 使用路由
  app.use(router);

  // 第三阶段：Vue相关插件
  setupStore(app);
  setupNaiveUI(app);
  setupDynamicComponents(app);
  setupHighlight(app);
  setupMarkdown(app);
  setupDirectives(app);
  setupAnalytics(app);

  // 第四阶段：异步插件
  await router.isReady();

  // 最终挂载
  app.mount("#app");
}

// 启动应用
bootstrap().catch((error) => console.error("应用启动失败:", error));
```

```vue [App.vue 根组件]
<template>
  <NConfigProvider
    :theme="themeStore.currentTheme"
    :theme-overrides="themeStore.themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="global-config-provider"
  >
    <NLoadingBarProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <RouterView />
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui/es"; // 中文语言包
import { useThemeStore } from "@/stores/theme";
import { onMounted } from "vue";

const themeStore = useThemeStore();

// 初始化主题
onMounted(() => {
  themeStore.init();
});
</script>
```

:::

这种结构化方法确保在应用程序启动前所有依赖项都已正确初始化。

## 🎯 开发指南

### 1. 🎨 探索演示页面

Robot Admin 包含 **30+ 精心制作的演示页面**，展示各种功能和组件：

<div class="demo-grid">
  <div class="demo-card">
    <div class="demo-icon">📋</div>
    <div class="demo-title">表单页面</div>
    <div class="demo-desc">动态表单、验证、布局</div>
  </div>
  
  <div class="demo-card">
    <div class="demo-icon">📊</div>
    <div class="demo-title">数据展示</div>
    <div class="demo-desc">表格、图表、统计面板</div>
  </div>
  
  <div class="demo-card">
    <div class="demo-icon">🎛️</div>
    <div class="demo-title">系统管理</div>
    <div class="demo-desc">用户、权限、配置</div>
  </div>
  
  <div class="demo-card">
    <div class="demo-icon">🔧</div>
    <div class="demo-title">工具页面</div>
    <div class="demo-desc">文件处理、导入导出</div>
  </div>
</div>

### 2. 🔐 权限系统

实现了完整的 **RBAC**（基于角色的访问控制）系统：

- **菜单级权限** - 控制页面访问
- **按钮级权限** - 控制操作权限
- **API 级权限** - 控制接口调用
- **动态路由** - 基于权限动态生成

### 3. 🌈 主题定制

支持多种主题模式：

::: code-group

```javascript [主题配置]
// 支持的主题模式
const themes = {
  light: "浅色模式", // 默认主题
  dark: "深色模式", // 深色主题
  auto: "跟随系统", // 自动切换
};
```

```vue [使用示例]
<template>
  <div class="theme-switcher">
    <n-switch v-model:value="isDark" @update:value="toggleTheme">
      <template #checked>🌙</template>
      <template #unchecked>☀️</template>
    </n-switch>
  </div>
</template>
```

:::

### 4. 🧩 内置组件

充分利用 **30+ 内置组件** 加速开发：

| 组件类型    | 数量 | 主要功能               |
| ----------- | ---- | ---------------------- |
| 📋 表单组件 | 8+   | 动态表单、验证、布局   |
| 📊 数据组件 | 6+   | 表格、图表、统计       |
| ✏️ 编辑器   | 4+   | 富文本、代码、Markdown |
| 🛠️ 工具组件 | 12+  | 文件处理、导入导出     |

## 🔧 故障排除

遇到问题时的解决步骤：

::: warning 🚨 常见问题
如果在设置过程中遇到任何问题，请按以下顺序排查：
:::

### 1. **更新工具版本**

```bash
# 更新 Bun 到最新版本
bun upgrade

# 检查 Node.js 版本
node --version  # 应该 >= 20.0.0
```

### 2. **清理依赖缓存**

```bash
# 清理并重新安装
rm -rf node_modules
rm -rf .vite
bun install
```

### 3. **检查端口占用**

```bash
# 如果1988端口被占用，指定其他端口
bun dev --port 8888
```

### 4. **查看详细错误**

```bash
# 启用详细日志
DEBUG=* bun dev
```

::: tip 💡 获取帮助
如果问题依然存在，请：

- 查看 [GitHub Issues](https://github.com/ChenyCHENYU/Robot_Admin/issues)
- 提交详细的错误报告
- 参考项目文档获取更多信息
  :::

## 🎉 开发愉快！

通过这份快速入门指南，您应该能够：

<div class="success-checklist">
  <div class="checklist-item">
    <div class="check-icon">✅</div>
    <div class="check-text">在几分钟内成功启动 Robot Admin</div>
  </div>
  
  <div class="checklist-item">
    <div class="check-icon">✅</div>
    <div class="check-text">了解项目结构和开发命令</div>
  </div>
  
  <div class="checklist-item">
    <div class="check-icon">✅</div>
    <div class="check-text">掌握基本的开发工作流程</div>
  </div>
  
  <div class="checklist-item">
    <div class="check-icon">✅</div>
    <div class="check-text">准备好构建强大的管理界面</div>
  </div>
</div>

---

<!-- 使用GitHub徽章组件 -->
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

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.req-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
}

.req-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
}

.req-card.recommended {
  border-color: var(--vp-c-brand);
  background: rgba(100, 108, 255, 0.05);
}

.req-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.req-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.req-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.req-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--vp-c-brand);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
}

.success-tip {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.tip-icon {
  font-size: 2rem;
}

.tip-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.tip-desc {
  margin-bottom: 0.5rem;
}

.tip-highlight {
  font-size: 0.9rem;
  opacity: 0.9;
}

.architecture-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.highlight-item {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.highlight-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.highlight-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.highlight-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.demo-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand);
}

.demo-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.demo-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.demo-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.success-checklist {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.checklist-item:last-child {
  margin-bottom: 0;
}

.check-icon {
  font-size: 1.2rem;
}

.check-text {
  font-weight: 500;
}

@media (max-width: 768px) {
  .requirements-grid,
  .architecture-highlights,
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .success-tip {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-banner h2 {
    font-size: 1.5rem;
  }
}
</style>
