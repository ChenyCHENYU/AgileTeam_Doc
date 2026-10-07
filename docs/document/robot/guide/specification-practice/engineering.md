# 构建 · Git · 性能规范

---
title: "构建 · Git · 性能规范"
outline: "deep"
description: "构建与配置、Git 工作流、性能优化规范"
---

## 🏗️ 构建与配置

### Vite 配置模块化

::: code-group

```typescript [config/vite/index.ts - 配置入口]
// config/vite/index.ts
export { default as viteConsolePlugin } from './viteConsolePluginConfig'
export { default as viteAutoImportPlugin } from './viteAutoImportConfig'
export { default as viteComponentsPlugin } from './viteComponentsConfig'
export { default as resolveConfig } from './viteResolveConfig'
export { default as serverConfig } from './viteServerConfig'
export { default as buildConfig } from './viteBuildConfig'
```

```typescript [vite.config.ts - 主配置文件]
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import {
  viteConsolePlugin,
  viteAutoImportPlugin,
  viteComponentsPlugin,
  resolveConfig,
  serverConfig,
  buildConfig,
} from './config/vite'

export default defineConfig({
  plugins: [
    vue(),
    viteConsolePlugin,
    viteAutoImportPlugin,
    viteComponentsPlugin,
  ],
  resolve: resolveConfig,
  server: serverConfig,
  build: buildConfig,
})
```

```typescript [config/vite/viteAutoImportConfig.ts - 自动导入配置]
// config/vite/viteAutoImportConfig.ts
import AutoImport from 'unplugin-auto-import/vite'

export default AutoImport({
  // 自动导入的库
  imports: [
    'vue',
    'vue-router',
    'pinia',
    {
      '@vueuse/core': [
        'useLocalStorage',
        'useClipboard',
        'useDebounceFn',
        'useThrottleFn',
        'useWindowSize',
        'useDark',
        'useToggle',
      ],
    },
    {
      'naive-ui': [
        'useDialog',
        'useMessage',
        'useNotification',
        'useLoadingBar',
        'useModal',
        'useDrawer',
      ],
    },
  ],

  // 生成类型声明文件
  dts: 'src/types/auto-imports.d.ts',

  // 自动导入的目录
  dirs: ['src/stores', 'src/composables', 'src/hooks'],

  // 在 Vue 模板中启用自动导入
  vueTemplate: true,

  // 解析器
  resolvers: [],

  // 忽略的文件
  ignore: [
    'dist',
    'node_modules',
    'src/types',
  ],

  // 全局变量
  globalImports: [
    {
      'window.$message': 'import { useMessage } from "naive-ui"',
      'window.$dialog': 'import { useDialog } from "naive-ui"',
      'window.$notification': 'import { useNotification } from "naive-ui"',
      'window.$loadingBar': 'import { useLoadingBar } from "naive-ui"',
    },
  ],

  // 自定义导入转换
  customImportTransform: (vite, id, path) => {
    // 自定义转换逻辑
    return null
  },

  // ESLint
  eslintrc: {
    enabled: true,
    filepath: './.eslintrc-auto-import.json',
    globalsPropValue: true,
  },
})
```

```typescript [config/vite/viteComponentsConfig.ts - 组件自动注册配置]
// config/vite/viteComponentsConfig.ts
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default Components({
  // 生成类型声明文件
  dts: 'src/types/components.d.ts',

  // 组件目录
  dirs: ['src/components/global', 'src/components/local'],

  // 组件文件扩展名
  extensions: ['vue'],

  // Vue 版本
  version: 3,

  // 解析器
  resolvers: [
    NaiveUiResolver(),
    
    // C_ 前缀组件解析
    (componentName) => {
      if (componentName.startsWith('C_')) {
        const name = componentName.slice(2)
        return {
          name,
          from: `./src/components/global/${componentName}/index.vue`,
        }
      }
      return null
    },
    
    // c_ 前缀组件解析
    (componentName) => {
      if (componentName.startsWith('c_')) {
        const name = componentName.slice(2)
        return {
          name,
          from: `./src/components/local/${componentName}/index.vue`,
        }
      }
      return null
    },
    
    // 图标解析
    IconsResolver({
      prefix: 'i',
    }),
  ],

  // 组件名称大小写
  caseSensitive: true,

  // 自动导入的组件
  include: [/\.vue$/, /\.vue\?vue/],

  // 排除的组件
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

  // 深度查找
  deep: true,

  // 允许覆盖
  allowOverrides: true,

  // 转换
  transformer: 'vue3',

  // 类型声明文件生成器
  dts: {
    tsConfigPath: './tsconfig.json',
  },
})
```

```typescript [config/vite/viteBuildConfig.ts - 构建优化配置]
// config/vite/viteBuildConfig.ts
import type { BuildOptions } from 'vite'

const buildConfig: BuildOptions = {
  // 目标浏览器
  target: 'es2015',

  // 输出目录
  outDir: 'dist',

  // 静态资源目录
  assetsDir: 'assets',

  // 压缩代码
  minify: 'terser',
  
  // 压缩选项
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },

  // 生成 source map
  sourcemap: false,

  // 构建报告
  reportCompressedSize: false,

  // 分块大小警告限制
  chunkSizeWarningLimit: 800,

  // Rollup 配置
  rollupOptions: {
    // 输入配置
    input: {
      main: resolve(__dirname, 'index.html'),
    },

    // 输出配置
    output: {
      // 手动分包配置
      manualChunks: {
        'vue-vendor': ['vue', 'vue-router', 'pinia'],
        'ui-vendor': ['naive-ui'],
        'editor-vendor': ['@kangc/v-md-editor', 'wangeditor'],
        'office-vendor': ['xlsx', 'mammoth', 'file-saver', 'jszip'],
        'chart-vendor': ['echarts', 'vue-echarts'],
        'icon-vendor': ['@iconify/vue'],
        'utils-vendor': ['lodash-es', 'dayjs', 'axios'],
      },

      // 文件命名
      chunkFileNames: 'js/[name]-[hash].js',
      entryFileNames: 'js/[name]-[hash].js',
      assetFileNames: (assetInfo) => {
        const name = assetInfo.name || ''

        // 图片文件
        if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
          return 'images/[name]-[hash].[ext]'
        }

        // 字体文件
        if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
          return 'fonts/[name]-[hash].[ext]'
        }

        // CSS 文件
        if (/\.css$/i.test(name)) {
          return 'css/[name]-[hash].[ext]'
        }

        // 其他资源
        return 'assets/[name]-[hash].[ext]'
      },

      // 动态导入命名
      dynamicImportFunction: 'import',
    },

    // 外部依赖
    external: [],

    // 插件
    plugins: [],
  },

  // 库模式
  lib: {
    entry: '',
    name: '',
    formats: ['es', 'umd'],
    fileName: (format) => `index.${format}.js`,
  },

  // CSS 代码分割
  cssCodeSplit: true,

  // SSR 构建
  ssr: false,

  // 实验性功能
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` }
      } else {
        return { relative: true }
      }
    },
  },
}

export default buildConfig
```

```typescript [config/vite/viteServerConfig.ts - 开发服务器配置]
// config/vite/viteServerConfig.ts
import type { ServerOptions } from 'vite'
import { HEAVY_PAGE_ROUTES } from './heavyPages'

const serverConfig: ServerOptions = {
  // 服务器主机名
  host: true,

  // 服务器端口
  port: 3000,

  // 自动打开浏览器
  open: true,

  // CORS 配置
  cors: true,

  // 代理配置
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
    '/upload': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },

  // 预热文件
  warmup: {
    clientFiles: [
      './src/App.vue',
      './src/router/index.ts',
      // 预热重量级页面
      ...HEAVY_PAGE_ROUTES.map(route => `./src/views${route}/index.vue`),
    ],
  },

  // HMR 配置
  hmr: {
    overlay: true,
  },

  // 监听文件
  watch: {
    usePolling: false,
    ignored: ['!**/node_modules/**', '!**/dist/**'],
  },

  // 头部配置
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
}

export default serverConfig
```

```typescript [config/vite/heavyPages.ts - 重量级页面配置]
// config/vite/heavyPages.ts
export const HEAVY_PAGE_ROUTES = [
  '/demo/13-calendar', // 日历组件（FullCalendar，体积大）
  '/demo/16-text-editor', // 富文本编辑器（WangEditor，体积大）
  '/demo/29-antv-x6-editor', // 流程图编辑器（AntV X6，体积大）
  '/demo/30-excel-all', // Excel 处理（xlsx，体积大）
  '/demo/33-v-table-gantt', // 甘特图（v-table-gantt，体积大）
]
```

:::

### 构建优化配置

::: code-group

```typescript [代码分割优化]
// config/vite/codeSplitting.ts
export const codeSplittingConfig = {
  // 手动分包策略
  manualChunks: {
    // 核心框架
    'vue-core': ['vue', 'vue-router', 'pinia'],
    
    // UI 框架
    'ui-framework': ['naive-ui'],
    
    // 工具库
    'utils': ['lodash-es', 'dayjs', 'axios', 'js-cookie'],
    
    // 图标库
    'icons': ['@iconify/vue'],
    
    // 编辑器
    'editors': ['@kangc/v-md-editor', 'wangeditor'],
    
    // 图表库
    'charts': ['echarts', 'vue-echarts'],
    
    // 办公文档处理
    'office': ['xlsx', 'mammoth', 'file-saver', 'jszip'],
    
    // 流程图
    'diagram': ['@antv/x6'],
    
    // 甘特图
    'gantt': ['v-table-gantt'],
    
    // 日历
    'calendar': ['@fullcalendar/vue3', '@fullcalendar/core', '@fullcalendar/interaction'],
  },

  // 分包策略
  chunkSizeWarningLimit: 1000,
  
  // 压缩配置
  minify: 'terser',
  
  // 压缩选项
  terserOptions: {
    compress: {
      // 移除 console
      drop_console: true,
      // 移除 debugger
      drop_debugger: true,
      // 移除无用代码
      pure_funcs: ['console.log', 'console.info', 'console.debug'],
    },
    mangle: {
      // 保留类名
      keep_classnames: process.env.NODE_ENV === 'development',
      // 保留函数名
      keep_fnames: process.env.NODE_ENV === 'development',
    },
  },
}
```

```typescript [资源优化配置]
// config/vite/assetsOptimization.ts
export const assetsOptimizationConfig = {
  // 资源文件命名
  assetFileNames: (assetInfo: any) => {
    const name = assetInfo.name || ''
    
    // 图片文件
    if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
      return 'images/[name]-[hash].[ext]'
    }
    
    // 字体文件
    if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
      return 'fonts/[name]-[hash].[ext]'
    }
    
    // CSS 文件
    if (/\.css$/i.test(name)) {
      return 'css/[name]-[hash].[ext]'
    }
    
    // JS 文件
    if (/\.(js|mjs)$/i.test(name)) {
      return 'js/[name]-[hash].[ext]'
    }
    
    // 其他资源
    return 'assets/[name]-[hash].[ext]'
  },

  // 图片压缩
  imagemin: {
    // JPEG 压缩
    jpeg: {
      quality: 80,
    },
    // PNG 压缩
    png: {
      quality: [0.6, 0.8],
    },
    // SVG 压缩
    svg: {
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
        {
          name: 'removeEmptyAttrs',
          active: true,
        },
      ],
    },
  },

  // 字体优化
  fontOptimization: {
    // 字体子集化
    subsets: ['latin', 'latin-ext'],
    // 字体显示策略
    display: 'swap',
    // 预加载关键字体
    preload: ['Inter-Regular.woff2', 'Inter-Medium.woff2'],
  },

  // 预加载关键资源
  preload: [
    // 关键 CSS
    { href: '/css/main.css', as: 'style' },
    // 关键 JS
    { href: '/js/main.js', as: 'script' },
    // 关键字体
    { href: '/fonts/Inter-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
  ],

  // 预连接到外部域名
  preconnect: [
    { href: 'https://fonts.googleapis.com' },
    { href: 'https://fonts.gstatic.com' },
    { href: 'https://api.example.com' },
  ],

  // DNS 预解析
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
}
```

```typescript [性能优化配置]
// config/vite/performanceOptimization.ts
export const performanceOptimizationConfig = {
  // 启用压缩
  compression: true,
  
  // 启用 Brotli 压缩
  brotliCompress: true,
  
  // 启用 Gzip 压缩
  gzipCompress: true,
  
  // 缓存策略
  cache: {
    // 静态资源缓存时间
    maxAge: 31536000, // 1 年
    // HTML 文件缓存时间
    htmlMaxAge: 3600, // 1 小时
    // 服务工作者缓存
    swCache: true,
  },
  
  // 代码分割
  codeSplitting: {
    // 路由级别分割
    routeLevelSplitting: true,
    // 组件级别分割
    componentLevelSplitting: true,
    // 第三方库分割
    vendorSplitting: true,
  },
  
  // 懒加载
  lazyLoading: {
    // 图片懒加载
    images: true,
    // 路由懒加载
    routes: true,
    // 组件懒加载
    components: true,
  },
  
  // 预加载
  preloading: {
    // 关键路由预加载
    criticalRoutes: ['/dashboard', '/user-management'],
    // 关键组件预加载
    criticalComponents: ['C_Table', 'C_Form'],
    // 关键资源预加载
    criticalAssets: ['/css/main.css', '/js/main.js'],
  },
  
  // 网络优化
  networkOptimization: {
    // 启用 HTTP/2
    http2: true,
    // 启用 HTTP/3
    http3: false,
    // 启用服务推送
    serverPush: false,
    // 启用早期提示
    earlyHints: true,
  },
  
  // 运行时优化
  runtimeOptimization: {
    // 启用虚拟滚动
    virtualScrolling: true,
    // 启用无限滚动
    infiniteScroll: true,
    // 启用防抖和节流
    debounceThrottle: true,
    // 启用内存优化
    memoryOptimization: true,
  },
}
```

:::

## 🔄 Git 工作流

### 完整的 Git 提交体系

#### 1. Commitizen 配置

项目使用 **cz-customizable** 进行交互式提交：

::: code-group

```javascript [.cz-config.js - 提交配置]
// .cz-config.js
module.exports = {
  // 提交类型配置
  types: [
    { value: 'wip', name: 'wip:      🚧 开发中' },
    { value: 'feat', name: 'feat:     🎯 新功能' },
    { value: 'fix', name: 'fix:      🐛 Bug 修复（会触发 patch）' },
    { value: 'perf', name: 'perf:     ⚡️ 性能优化（会触发 patch）' },
    { value: 'deps', name: 'deps:     📦 依赖更新（会触发 patch）' },
    { value: 'refactor', name: 'refactor: ♻️  重构（不改变行为）' },
    { value: 'docs', name: 'docs:     📚 文档变更' },
    { value: 'test', name: 'test:     🔎 测试相关' },
    { value: 'style', name: 'style:    💄 代码样式（空格、分号等）' },
    { value: 'build', name: 'build:    🧳 构建/打包' },
    { value: 'chore', name: 'chore:    🔧 其他杂项' },
    { value: 'revert', name: 'revert:   🔙 回退' },
  ],

  // 交互式配置
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(必填，格式如：模块/子模块):',
    subject: '请简要描述提交(必填，不加句号):',
    body: '请输入更详细的说明(可选):\n',
    footer: 'Footer(可选): 例如 "Closes #123" 或 "Release-As: 1.3.1"\n',
    confirmCommit: '确认提交以上内容？(y/n/e/h)',
  },

  // 跳过问题，保持简洁
  skipQuestions: ['body'],

  // 允许破坏性变更
  allowBreakingChanges: ['feat', 'fix', 'refactor'],
  breakingPrefix: 'BREAKING CHANGE:',

  // 主题长度限制
  subjectLimit: 88,

  // 默认值
  defaultScope: '',
  defaultSubject: '',
  defaultBody: '',
  defaultFooter: '',

  // 自定义问题
  customQuestions: [
    {
      type: 'input',
      name: 'issue',
      message: '关联的 Issue 编号 (可选):',
    },
  ],
}
```

```json [package.json - 脚本配置]
{
  "scripts": {
    "commit": "git-cz",
    "commit:retry": "git-cz --retry",
    "commit:all": "git add . && git-cz"
  },
  "devDependencies": {
    "commitizen": "^4.3.0",
    "cz-customizable": "^7.0.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "./.cz-config.js"
    }
  }
}
```

:::

#### 2. 提交命令

```bash
# 使用 Commitizen 交互式提交
bun run commit
# 等同于
bunx cz

# 重试上次提交
bun run commit:retry

# 添加所有文件并提交
bun run commit:all

# 手动提交（不推荐，但需要了解）
git commit -m "type(scope): description"
```

#### 3. 提交信息格式

```bash
# 标准格式
<type>(<scope>): <subject>

<body>

<footer>

# 示例
feat(user): 添加用户管理功能

实现了用户的增删改查功能，包括：
- 用户列表展示
- 用户信息编辑
- 用户权限管理

Closes #123
Release-As: 1.2.0
```

### 代码质量保障体系

#### 1. 双重 Lint 检查

::: code-group

```bash [package.json 脚本]
{
  "scripts": {
    "lint": "oxlint . --fix -D correctness --ignore-path .gitignore && eslint . --fix",
    "lint:oxlint": "oxlint . --fix -D correctness --ignore-path .gitignore",
    "lint:eslint": "eslint . --fix",
    "lint:check": "oxlint . -D correctness --ignore-path .gitignore && eslint ."
  }
}

# 检查流程：
# 1. Oxlint - 高性能 JavaScript/TypeScript 检查
#    - 速度快（比 ESLint 快 50-100 倍）
#    - 专注正确性检查 (-D correctness)
#    - 自动修复 (--fix)
#    - 忽略 .gitignore 文件

# 2. ESLint - Vue/TypeScript 专用检查
#    - Vue 组件规范检查
#    - TypeScript 类型检查
#    - 代码风格检查
#    - 自动修复 (--fix)
```

```typescript [eslint.config.ts - ESLint 配置]
// eslint.config.ts
import { defineConfigWithVueTs } from '@eslint/configs'
import * as oxlint from 'eslint-plugin-oxlint'
import pluginVue from 'eslint-plugin-vue'
import vueTsConfigs from 'eslint-plugin-vue-tsconfigs'

export default defineConfigWithVueTs(
  // Oxlint 高性能检查
  ...oxlint.configs['flat/recommended'],

  // Vue 专用规则
  pluginVue.configs['flat/essential'],

  // TypeScript 专用规则
  vueTsConfigs.recommended,

  // 自定义规则
  {
    rules: {
      // JSDoc 注释要求
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          contexts: [
            'MethodDefinition:not([accessibility="private"])',
            'MethodDefinition[kind="constructor"]',
          ],
        },
      ],

      // 引号规范
      '@typescript-eslint/quotes': ['error', 'single'],
      'vue/html-quotes': ['error', 'double'],

      // 组件命名
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: ['router-view', 'router-link', '/^icon-/', '/^C_/', '/^c_/'],
        },
      ],

      // 复杂度控制
      'max-depth': ['error', 4],
      'complexity': ['warn', 10],
      'max-params': ['warn', 6],

      // 其他规则
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  }
)
```

:::

#### 2. Pre-commit Hooks

::: code-group

```bash [.husky/pre-commit - 提交前钩子]
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 1. Oxlint 检查所有暂存文件，不允许任何警告
bunx oxlint --max-warnings 0

# 2. lint-staged 对暂存文件执行格式化和修复
npx lint-staged

# 3. 类型检查
bun run type-check

# 4. 单元测试
bun run test:unit
```

```json [package.json - lint-staged 配置]
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,vue}": [
      "oxlint --max-warnings 0 --deny-warnings",
      "eslint --fix --no-cache",
      "prettier --write"
    ],
    "src/**/*.{scss,less,css}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}

# 处理流程：
# 1. 对暂存文件进行 Oxlint 检查（零警告策略）
# 2. ESLint 自动修复问题
# 3. Prettier 格式化代码
# 4. Stylelint 修复样式问题
# 5. Prettier 格式化其他文件
```

```bash [.husky/commit-msg - 提交信息钩子]
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 检查提交信息格式
bunx --no-install commitlint --edit "$1"

# 检查提交信息长度
if [ ${#1} -gt 88 ]; then
  echo "❌ 提交信息过长，请控制在 88 字符以内"
  exit 1
fi

# 检查提交信息格式
if ! echo "$1" | grep -qE "^(wip|feat|fix|perf|deps|refactor|docs|test|style|build|chore|revert)\(.*\): .+"; then
  echo "❌ 提交信息格式不正确，请使用 type(scope): description 格式"
  exit 1
fi
```

```javascript [commitlint.config.js - 提交信息检查配置]
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'wip', 'feat', 'fix', 'docs', 'style', 'refactor',
        'perf', 'test', 'chore', 'revert', 'build', 'deps'
      ]
    ],
    'subject-case': [0], // 允许任意大小写
    'subject-max-length': [2, 'always', 88], // 主题最大长度
    'body-max-line-length': [2, 'always', 88], // 正文最大长度
    'footer-max-line-length': [2, 'always', 88], // 脚注最大长度
  }
}
```

:::

#### 3. 完整的开发工作流

::: code-group

```bash [开发提交流程]
# 1. 创建功能分支
git checkout -b feature/user-management

# 2. 开发功能
# ... 编写代码 ...

# 3. 添加文件到暂存区
git add .

# 4. 交互式提交（推荐）
bun run commit

# 5. 提交流程：
#    - 选择提交类型 (feat/fix/docs 等)
#    - 输入影响范围 (user/login/api 等)
#    - 输入提交描述 (简洁明了)
#    - 可选：详细说明
#    - 可选：关联 Issue 或版本号

# 6. 自动执行检查：
#    - Oxlint 代码检查
#    - ESLint 代码修复
#    - Prettier 代码格式化
#    - Commitlint 消息格式验证
#    - TypeScript 类型检查
#    - 单元测试

# 7. 推送分支
git push origin feature/user-management

# 8. 创建 Pull Request
#    - 填写 PR 描述
#    - 关联相关 Issue
#    - 请求代码审查

# 9. 代码审查通过后合并
#    - 使用 squash merge 合并 PR
#    - 自动删除功能分支
```

```bash [分支管理规范]
# 分支命名
feature/功能名称
bugfix/问题描述
hotfix/紧急修复
release/版本号

# 示例
feature/user-management
bugfix/login-validation-error
hotfix/security-patch
release/v1.2.0

# 主分支
main      # 生产环境代码
develop   # 开发环境代码

# 辅助分支
feature/*  # 功能开发分支
bugfix/*   # Bug 修复分支
hotfix/*   # 紧急修复分支
release/*  # 发布准备分支
```

```bash [版本发布流程]
# 1. 创建发布分支
git checkout -b release/v1.2.0 develop

# 2. 更新版本号
# 更新 package.json 中的版本号
# 更新 CHANGELOG.md

# 3. 提交版本更新
git add .
bun run commit

# 4. 合并到主分支
git checkout main
git merge --no-ff release/v1.2.0

# 5. 创建标签
git tag -a v1.2.0 -m "Release version 1.2.0"

# 6. 合并回开发分支
git checkout develop
git merge --no-ff release/v1.2.0

# 7. 删除发布分支
git branch -d release/v1.2.0

# 8. 推送所有分支和标签
git push origin main develop
git push origin --tags

# 9. 自动化流程
#    - CI/CD 流水线自动构建
#    - 自动部署到测试环境
#    - 自动生成发布说明
```

:::

## ⚡ 性能优化规范

### 组件懒加载

::: code-group

```typescript [路由懒加载]
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: () => import('@/views/user-management/index.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true,
      preload: true, // 预加载
    },
  },
  {
    path: '/demo/:id',
    name: 'Demo',
    component: () => import('@/views/demo/[id]/index.vue'),
    props: true,
  },
  // 重量级页面
  {
    path: '/demo/13-calendar',
    name: 'CalendarDemo',
    component: () => import('@/views/demo/13-calendar/index.vue'),
    meta: {
      heavy: true, // 标记为重量级页面
    },
  },
  {
    path: '/demo/16-text-editor',
    name: 'TextEditorDemo',
    component: () => import('@/views/demo/16-text-editor/index.vue'),
    meta: {
      heavy: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 预加载关键路由
router.beforeEach(async (to, from, next) => {
  if (to.meta.preload && to.meta.preload !== from.meta.preload) {
    // 预加载组件
    const component = await to.matched[0].components?.default
  }
  next()
})

export default router
```

```typescript [组件懒加载]
// components/HeavyComponent/index.vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// 基础懒加载
const HeavyComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)

// 带加载状态的懒加载
const HeavyComponentWithLoading = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: () => import('./LoadingComponent.vue'),
  errorComponent: () => import('./ErrorComponent.vue'),
  delay: 200,
  timeout: 3000,
})

// 工厂函数懒加载
const createLazyComponent = (componentPath: string) => {
  return defineAsyncComponent({
    loader: () => import(/* @vite-ignore */ componentPath),
    loadingComponent: () => import('./LoadingComponent.vue'),
    errorComponent: () => import('./ErrorComponent.vue'),
    delay: 200,
    timeout: 5000,
  })
}

// 使用示例
const LazyChart = createLazyComponent('./ChartComponent.vue')
const LazyTable = createLazyComponent('./TableComponent.vue')
const LazyForm = createLazyComponent('./FormComponent.vue')
</script>

<template>
  <div>
    <!-- 基础懒加载 -->
    <HeavyComponent />
    
    <!-- 带加载状态的懒加载 -->
    <HeavyComponentWithLoading />
    
    <!-- 条件懒加载 -->
    <LazyChart v-if="showChart" />
    <LazyTable v-if="showTable" />
    <LazyForm v-if="showForm" />
  </div>
</template>
```

```typescript [动态导入优化]
// utils/dynamicImports.ts
// 预加载关键组件
export const preloadComponents = async () => {
  const components = [
    () => import('@/components/global/C_Table/index.vue'),
    () => import('@/components/global/C_Form/index.vue'),
    () => import('@/components/global/C_Modal/index.vue'),
  ]
  
  // 并行预加载
  await Promise.all(components.map(comp => comp()))
}

// 按需加载组件
export const loadComponent = async (componentName: string) => {
  try {
    const component = await import(`@/components/${componentName}.vue`)
    return component.default
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error)
    return null
  }
}

// 条件加载
export const conditionalLoad = async (condition: boolean, componentPath: string) => {
  if (!condition) return null
  
  try {
    const component = await import(componentPath)
    return component.default
  } catch (error) {
    console.error(`Failed to conditionally load component: ${componentPath}`, error)
    return null
  }
}

// 使用示例
// preloadComponents() // 在应用启动时预加载
// const MyComponent = await loadComponent('MyComponent')
// const ConditionalComponent = await conditionalLoad(user.isAdmin, './AdminPanel.vue')
```

:::

### 资源预加载配置

::: code-group

```typescript [config/vite/heavyPages.ts - 重量级页面配置]
// config/vite/heavyPages.ts
export const HEAVY_PAGE_ROUTES = [
  '/demo/13-calendar', // 日历组件（FullCalendar，体积大）
  '/demo/16-text-editor', // 富文本编辑器（WangEditor，体积大）
  '/demo/29-antv-x6-editor', // 流程图编辑器（AntV X6，体积大）
  '/demo/30-excel-all', // Excel 处理（xlsx，体积大）
  '/demo/33-v-table-gantt', // 甘特图（v-table-gantt，体积大）
]

export const PRELOAD_ROUTES = [
  '/dashboard', // 仪表板
  '/user-management', // 用户管理
  '/system-settings', // 系统设置
]

export const PREFETCH_RESOURCES = [
  '/fonts/Inter-Regular.woff2',
  '/fonts/Inter-Medium.woff2',
  '/css/main.css',
  '/js/main.js',
]
```

```typescript [config/vite/viteServerConfig.ts - 预加载配置]
// config/vite/viteServerConfig.ts
import { HEAVY_PAGE_ROUTES, PRELOAD_ROUTES } from './heavyPages'

export default {
  // 预热文件
  warmup: {
    clientFiles: [
      './src/App.vue',
      './src/router/index.ts',
      // 预热重量级页面
      ...HEAVY_PAGE_ROUTES.map(route => `./src/views${route}/index.vue`),
      // 预热关键路由
      ...PRELOAD_ROUTES.map(route => `./src/views${route}/index.vue`),
    ],
  },

  // 预加载配置
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'naive-ui',
      // 预构建重量级依赖
      '@fullcalendar/vue3',
      '@fullcalendar/core',
      '@fullcalendar/interaction',
      'wangeditor',
      '@antv/x6',
      'xlsx',
      'v-table-gantt',
    ],
  },
}
```

```typescript [utils/resourcePreloading.ts - 资源预加载工具]
// utils/resourcePreloading.ts
export const preloadResource = (url: string, as: string = 'script'): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = as
    
    if (as === 'font') {
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
    }
    
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to preload: ${url}`))
    
    document.head.appendChild(link)
  })
}

export const prefetchResource = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to prefetch: ${url}`))
    
    document.head.appendChild(link)
  })
}

export const preloadCriticalResources = async () => {
  const criticalResources = [
    { url: '/fonts/Inter-Regular.woff2', as: 'font' },
    { url: '/fonts/Inter-Medium.woff2', as: 'font' },
    { url: '/css/main.css', as: 'style' },
    { url: '/js/main.js', as: 'script' },
  ]
  
  try {
    await Promise.all(
      criticalResources.map(resource => 
        preloadResource(resource.url, resource.as)
      )
    )
    console.log('Critical resources preloaded successfully')
  } catch (error) {
    console.error('Failed to preload critical resources:', error)
  }
}

export const preloadRouteComponents = async (routes: string[]) => {
  try {
    await Promise.all(
      routes.map(route => {
        const componentName = route.split('/').pop()
        return import(`@/views${route}/index.vue`)
      })
    )
    console.log('Route components preloaded successfully')
  } catch (error) {
    console.error('Failed to preload route components:', error)
  }
}

// 在应用启动时预加载关键资源
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    preloadCriticalResources()
  })
}
```

```typescript [hooks/usePreload.ts - 预加载 Hook]
// hooks/usePreload.ts
import { onMounted, onUnmounted } from 'vue'
import { preloadResource, prefetchResource, preloadRouteComponents } from '@/utils/resourcePreloading'

export const usePreload = () => {
  let idleCallback: number | null = null
  
  const preloadWhenIdle = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      idleCallback = requestIdleCallback(callback)
    } else {
      setTimeout(callback, 100)
    }
  }
  
  const preloadComponent = (componentPath: string) => {
    preloadWhenIdle(() => {
      import(/* @vite-ignore */ componentPath)
    })
  }
  
  const preloadRoute = (routePath: string) => {
    preloadWhenIdle(() => {
      const componentName = routePath.split('/').pop()
      import(`@/views${routePath}/index.vue`)
    })
  }
  
  const prefetchRoute = (routePath: string) => {
    prefetchResource(routePath)
  }
  
  onMounted(() => {
    // 在浏览器空闲时预加载
    preloadRoute('/dashboard')
    preloadRoute('/user-management')
    preloadComponent('@/components/global/C_Table/index.vue')
    preloadComponent('@/components/global/C_Form/index.vue')
  })
  
  onUnmounted(() => {
    if (idleCallback && 'cancelIdleCallback' in window) {
      cancelIdleCallback(idleCallback)
    }
  })
  
  return {
    preloadComponent,
    preloadRoute,
    prefetchRoute,
  }
}
```

:::

### 请求优化

::: code-group

```typescript [utils/requestOptimization.ts - 请求优化工具]
// utils/requestOptimization.ts
import { getData, postData } from '@/axios/request'

// 带缓存的请求
export const getCachedData = async <T = any>(
  url: string,
  options: {
    ttl?: number // 缓存时间（毫秒）
    key?: string // 缓存键
  } = {}
): Promise<T> => {
  const { ttl = 60000, key = url } = options
  
  // 检查缓存
  const cached = localStorage.getItem(`cache:${key}`)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < ttl) {
      return data
    }
  }
  
  // 发起请求
  const response = await getData(url)
  
  // 缓存结果
  localStorage.setItem(`cache:${key}`, JSON.stringify({
    data: response.data,
    timestamp: Date.now(),
  }))
  
  return response.data
}

// 防抖请求
export const debounceRequest = <T = any>(
  requestFn: (...args: any[]) => Promise<T>,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: any[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = setTimeout(async () => {
        try {
          const result = await requestFn(...args)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, delay)
    })
  }
}

// 节流请求
export const throttleRequest = <T = any>(
  requestFn: (...args: any[]) => Promise<T>,
  interval: number = 1000
) => {
  let lastRequestTime = 0
  
  return (...args: any[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      const now = Date.now()
      
      if (now - lastRequestTime >= interval) {
        lastRequestTime = now
        
        requestFn(...args)
          .then(resolve)
          .catch(reject)
      } else {
        // 如果在节流期间内，则忽略请求
        reject(new Error('Request throttled'))
      }
    })
  }
}

// 重试请求
export const retryRequest = async <T = any>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')
      
      if (i === maxRetries) {
        throw lastError
      }
      
      // 指数退避
      const retryDelay = delay * Math.pow(2, i)
      await new Promise(resolve => setTimeout(resolve, retryDelay))
    }
  }
  
  throw lastError!
}

// 并发请求控制
export class RequestQueue {
  private queue: Array<() => Promise<any>> = []
  private running = 0
  private maxConcurrent: number
  
  constructor(maxConcurrent: number = 5) {
    this.maxConcurrent = maxConcurrent
  }
  
  add<T = any>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await requestFn()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
      
      this.process()
    })
  }
  
  private async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return
    }
    
    this.running++
    const requestFn = this.queue.shift()!
    
    try {
      await requestFn()
    } finally {
      this.running--
      this.process()
    }
  }
}

// 使用示例
const requestQueue = new RequestQueue(3) // 最多并发 3 个请求
```

```typescript [hooks/useRequestOptimization.ts - 请求优化 Hook]
// hooks/useRequestOptimization.ts
import { ref, computed } from 'vue'
import { getCachedData, debounceRequest, retryRequest } from '@/utils/requestOptimization'

export const useRequestOptimization = () => {
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  // 带缓存的请求
  const useCachedRequest = <T = any>(
    url: string,
    options: { ttl?: number; key?: string } = {}
  ) => {
    const data = ref<T | null>(null)
    const refreshing = ref(false)
    
    const execute = async (refresh = false) => {
      if (refresh) {
        refreshing.value = true
      } else {
        loading.value = true
      }
      
      error.value = null
      
      try {
        const result = await getCachedData<T>(url, {
          ...options,
          key: refresh ? undefined : options.key, // 刷新时不使用缓存
        })
        
        data.value = result
      } catch (err) {
        error.value = err instanceof Error ? err : new Error('Request failed')
      } finally {
        loading.value = false
        refreshing.value = false
      }
    }
    
    return {
      data,
      loading,
      refreshing,
      error,
      execute,
      refresh: () => execute(true),
    }
  }
  
  // 防抖请求
  const useDebouncedRequest = <T = any>(
    requestFn: (...args: any[]) => Promise<T>,
    delay: number = 300
  ) => {
    const debouncedFn = debounceRequest(requestFn, delay)
    
    const execute = async (...args: any[]) => {
      loading.value = true
      error.value = null
      
      try {
        return await debouncedFn(...args)
      } catch (err) {
        error.value = err instanceof Error ? err : new Error('Request failed')
        throw err
      } finally {
        loading.value = false
      }
    }
    
    return { execute, loading, error }
  }
  
  // 重试请求
  const useRetryRequest = <T = any>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ) => {
    const execute = async () => {
      loading.value = true
      error.value = null
      
      try {
        return await retryRequest(requestFn, maxRetries, delay)
      } catch (err) {
        error.value = err instanceof Error ? err : new Error('Request failed')
        throw err
      } finally {
        loading.value = false
      }
    }
    
    return { execute, loading, error }
  }
  
  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    useCachedRequest,
    useDebouncedRequest,
    useRetryRequest,
  }
}
```

```typescript [api/optimizedApi.ts - 优化的 API 示例]
// api/optimizedApi.ts
import { getData, postData } from '@/axios/request'
import { useRequestOptimization } from '@/hooks/useRequestOptimization'

const { useCachedRequest, useDebouncedRequest, useRetryRequest } = useRequestOptimization()

// 用户列表 API（带缓存）
export const useUserList = () => {
  return useCachedRequest('/api/users', {
    ttl: 60000, // 缓存 1 分钟
    key: 'user-list',
  })
}

// 搜索 API（防抖）
export const useSearchUsers = () => {
  return useDebouncedRequest(
    (keyword: string) => getData('/api/users/search', { params: { keyword } }),
    500 // 500ms 防抖
  )
}

// 上传 API（重试）
export const useUploadFile = () => {
  return useRetryRequest(
    (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      return postData('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    3, // 最多重试 3 次
    1000 // 1 秒延迟
  )
}

// 使用示例
// const { data: users, loading, error, refresh } = useUserList()
// const { execute: searchUsers } = useSearchUsers()
// const { execute: uploadFile } = useUploadFile()
```

:::

---
