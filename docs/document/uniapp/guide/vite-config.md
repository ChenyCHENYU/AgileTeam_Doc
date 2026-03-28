---
outline: "deep"
---

# Vite 配置

> ⚡ Robot uniApp 使用 Vite 5 作为构建工具，通过 `@dcloudio/vite-plugin-uni` 提供 UniApp 多端编译能力。

## 📄 配置文件概览

```js
// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(async ({ mode }) => {
  const { default: UnoCSS }     = await import('unocss/vite')
  const { default: AutoImport } = await import('unplugin-auto-import/vite')

  const isDev = mode === 'development'
  const mockPlugin = isDev
    ? (await import('vite-plugin-mock-dev-server')).default
    : null

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      UnoCSS(),
      mockPlugin && mockPlugin(),   // 仅开发环境启用 Mock
      AutoImport({ /* ... */ }),
      uni(),                        // UniApp 编译插件（最后添加）
    ],
    // ...
  }
})
```

::: warning 插件顺序
`uni()` 必须放在最后，否则可能与其他插件产生冲突。
:::

## 🔌 核心插件配置

### `unplugin-auto-import` 自动导入

```js
AutoImport({
  // 自动导入的预设
  imports: [
    'vue',  // ref, reactive, computed, watch...
    'pinia',
    {
      '@dcloudio/uni-app': [
        // UniApp 生命周期钩子（全量导入）
        'onLaunch', 'onShow', 'onHide',
        'onLoad', 'onReady', 'onUnload',
        'onPullDownRefresh', 'onReachBottom',
        'onShareAppMessage', 'onShareTimeline',
        'onPageScroll', 'onTabItemTap',
      ],
    },
  ],
  // 自动扫描目录中的导出（composables 和 stores）
  dirs: ['src/composables', 'src/stores/modules'],
  dts: false,         // uni-app 项目不需要 .d.ts 文件
  vueTemplate: true,  // 支持在 template 中使用自动导入的变量
})
```

得益于此配置，以下内容**无需手动 import**：

```vue
<script setup lang="ts">
// ✅ 无需导入：ref, computed, watch...（来自 vue）
// ✅ 无需导入：onLoad, onShow...（来自 @dcloudio/uni-app）
// ✅ 无需导入：useUserStore, useAppStore...（来自 stores/modules）
// ✅ 无需导入：useLoading, usePagination...（来自 composables）

const count = ref(0)
const userStore = useUserStore()

onLoad(() => {
  console.log('页面加载')
})
</script>
```

### SCSS 全局注入

每个 Vue SFC 的 `<style>` 块自动注入全局 mixins：

```js
css: {
  preprocessorOptions: {
    scss: {
      // 全局注入 mixins，每个 SFC 都可直接使用 @include / 变量
      additionalData: `@use "@/styles/mixins.scss" as *;\n`,
      // 抑制 Sass 废弃警告
      silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
      quietDeps: true,
    },
  },
},
```

这意味着在任意组件的 `<style lang="scss">` 中，可以直接使用 `mixins.scss` 中的所有 mixin：

```scss
<style lang="scss" scoped>
.c-card {
  @include flex-center;  // 直接使用，无需 @import
}
</style>
```

### 环境变量注入

```js
define: {
  __ENV__:     JSON.stringify(env.VITE_ENV || mode),
  __VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
},
```

### 开发服务器

```js
server: {
  port: 1999,     // H5 端口
  open: true,     // 自动打开浏览器
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
},
```

## 🏗️ 构建优化

### 代码分割

UniApp 项目通过 `subPackages` 配置实现原生分包，Vite 会自动为每个分包生成独立的 chunk：

```json
// pages.json
{
  "subPackages": [
    {
      "root": "pages/demo",
      "pages": [...]
    }
  ]
}
```

### 多平台构建

同一份配置，通过 `-p` 参数指定构建目标：

```bash
# 对应 package.json 中的 scripts
"build:h5":           "uni build --mode production -p h5",
"build:wx":           "uni build --mode production -p mp-weixin",
"build:app":          "uni build --mode production -p app",
"build:app-android":  "uni build --mode production -p app-android",
"build:app-ios":      "uni build --mode production -p app-ios",
```

## 📦 Mock 插件配置

开发环境使用 `vite-plugin-mock-dev-server`：

```js
// vite.config.js — 仅 dev 加载
const mockPlugin = isDev
  ? (await import('vite-plugin-mock-dev-server')).default
  : null

plugins: [
  mockPlugin && mockPlugin(),  // 非 dev 时为 null，自动忽略
]
```

Mock 文件约定放在根目录 `mock/` 下，以 `.mock.ts` 结尾：

```ts
// mock/user.mock.ts
export default [
  {
    url: '/api/user/info',
    method: 'GET',
    response: () => ({
      code: 0,
      data: {
        id: 1,
        nickname: 'Robot 用户',
        avatar: 'https://example.com/avatar.png',
      },
    }),
  },
]
```

## 🔍 路径别名

```js
// vite.config.js — resolve.alias（由 UniApp 插件默认配置）
resolve: {
  alias: {
    '@': '/src',
  },
},
```

在代码中统一使用 `@/` 别名：

```ts
import { useUserStore } from '@/stores'
import config from '@/config/env'
import http from '@/utils/http'
```
