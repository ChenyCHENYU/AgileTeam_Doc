---
outline: 'deep'
---

# 脚手架的升级与配置

有[了解前端工程化](../get-familiar-quickly/engineering.md#vue-js-与工程化) 内容板块的开发者，接下来关于 Vue 3 的介绍都将基于前端工程化展开，介绍如何配置 Vue 3 的开发环境，并创建基于前端工程化的 Vue 3 项目。

:::tip
如果还不熟悉 Node.js 、 npm 依赖管理等前端工程化工具链的使用，请先阅读 [工程化的前期准备](../get-familiar-quickly/guide.md) 一章。
:::

## 全新的 Vue 版本 ~new

> 在 2022 年 2 月 7 日， Vue 3 代替了 Vue 2 成为 Vue 的默认版本，有一些注意事项需要留意

### 使用 Vue 3

在 npm 的 [vue 版本主页](https://www.npmjs.com/package/vue?activeTab=versions) 上面，会看到当前已使用 `3.2.30` 作为默认 `latest` 版本（也就是运行 `npm i vue` 默认会安装 Vue 3 了，无需再通过指定 `next` 版本）。

包括 `vue-router` 、 `vuex` 、`vue-loader` 和 `@vue/test-utils` 等相关的生态，同样不需要指定 next 版本了，都配合 Vue 3 指定了新的 latest 默认版本。

所有文档和官方站点将默认切换到 Vue 3 版本，请查看 [官方文档](../links.md#官方文档) 板块了解最新的官方资源站点。

### 使用 Vue 2

如果还要用 Vue 2 ，需要手动指定 `legacy` 版本，通过 `npm i vue@legacy` 才能安装到 Vue 2 。

Vue 2 相关的生态目前没有打 `legacy` 的 Tag，所以需要显式的指定版本号才可以安装到配套的程序，比如通过 `npm i vue-router@3.5.3` 才能安装到 Vue 2 配套的 Router 版本。

如果之前使用了 `latest` 标签或 `*` 从 npm 安装 Vue 或其他官方库，请确保项目的 `package.json` 能够明确使用兼容 Vue 2 的版本。

```diff
{
  "dependencies": {
-   "vue": "latest",
+   "vue": "^2.6.14",
-   "vue-router": "latest",
+   "vue-router": "^3.5.3",
-   "vuex": "latest"
+   "vuex": "^3.6.2"
  },
  "devDependencies": {
-   "vue-loader": "latest",
+   "vue-loader": "^15.9.8",
-   "@vue/test-utils": "latest"
+   "@vue/test-utils": "^1.3.0"
  }
}
```

## Hello Vue3

如果想早点开始 Vue 3 的世界，可以通过以下命令直接创建一个启动项目：

```bash
# 全局安装脚手架
npm install -g create-preset

# 使用 `vue3-ts-vite` 模板创建一个名为 `hello-vue3` 的项目
preset init hello-vue3 --template vue3-ts-vite
```

这是一个基于 Vite + TypeScript + Vue 3 + Pinia 的项目启动模板，可以使用这个项目来练习后面的案例代码，创建完毕后可以直接跳到 [安装 VSCode](#安装-vscode) 和 [添加 VSCode 插件](#添加-vscode-插件) 进行了解。

建议还是希望可以把 [使用 Vite 创建项目](#使用-vite-创建项目-new) 和 [使用 @vue/cli 创建项目](#使用-vue-cli-创建项目) 这两部分也熟悉一下，后续构建的实战项目和组件，将围绕 **Vite** 构建的项目展开介绍。

:::tip
如果网络问题下载失败，可以先执行 `preset proxy on` 开启加速镜像代理下载。
:::

## 使用 Vite 创建项目 ~new

Vite 从 2021 年 1 月份发布 2.0 版本以来，发展非常快，公司业务也在 2021 年底开始用 Vite 来跑新项目，整体情况非常稳定和乐观，是非常推荐升级技术栈的。

在这里推荐以下这几种创建 Vite 项目的方式：[Create Vite](#create-vite) 、 [Create Vue](#create-vue) 和 [Create Preset](#create-preset) 。

### Create Vite

[create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) 是 Vite 官方推荐的一个脚手架工具，可以创建基于 Vite 的不同技术栈基础模板。

```bash
npm create vite
```

然后按照命令行的提示操作（选择 `vue` 技术栈进入），即可创建一个基于 Vite 的基础空项目。

:::tip
不过这里的项目非常基础，啥也没有，如果要用到 Router 、 Vuex 、 ESLint 等程序，都需要再自己安装和配置，所以推荐使用 [Create Preset](#create-preset) 。
:::

### Create Vue

[create-vue](https://github.com/vuejs/create-vue) 是 Vue 官方推出的一个新脚手架，可以创建基于 Vite 的 Vue 基础模板。

```bash
npm init vue@3
```

然后根据命令行的提示操作。

### Create Preset

[create-preset](https://github.com/awesome-starter/create-preset) 是 Awesome Starter 的 CLI 脚手架，提供快速创建预设项目的能力，可以创建一些有趣实用的项目启动模板，也可以用来管理的常用项目配置。

#### 简单使用

也可以通过包管理器来直接创建配置：

```bash
npm create preset
```

然后按照命令行的提示操作，即可创建开箱即用的模板项目。

在这里选择 `vue` 技术栈进入，选择 [vue3-ts-vite](https://github.com/awesome-starter/vue3-ts-vite-starter) 创建一个基于 Vite + Vue 3 + TypeScript 的项目启动模板。

:::tip
如果下载失败，可以通过 `npm create preset proxy on` 开启加速镜像代理下载。

点击查看：[代理选项 - Create Preset](https://preset.js.org/zh/docs.html#%E5%BC%80%E5%90%AF%E4%BB%A3%E7%90%86)
:::

#### 全局安装

也可以像使用 @vue/cli 一样，全局安装到本地，通过 `preset init` 命令来创建项目。

推荐全局安装它，用起来更方便，请先全局安装：

```bash
npm install -g create-preset
```

可以通过下面这个命令来检查安装是否成功，如果成功，将会得到一个版本号：

```bash
preset -v
```

然后可以通过 `--template` 选项直接指定一个模板创建项目，在这里使用 `vue3-ts-vite` 模板创建一个名为 `hello-vue3` 的项目：

```bash
preset init hello-vue3 --template vue3-ts-vite
```

常用的项目模板也可以绑定为本地配置，点击 [Create Preset 官方文档](https://preset.js.org/zh/) 查看完整使用教程。

### 管理项目配置

不论使用上面的那种方式创建项目，都会有一个名为 `vite.config.js` 或 `vite.config.ts` 的项目配置文件（扩展名由项目使用 JavaScript 还是 TypeScript 决定）。

里面会有一些预设好的配置，可以在 [Vite 官网的配置文档](https://cn.vitejs.dev/config/) 查阅更多的可配置选项。

### 注意事项

虽然 Vite 和 Webpack 在开发体验上差不多，但本质存在很大的差异，特别是依赖包只能使用 ESM 版本，开发期间请多参考 [Vite 官网](https://cn.vitejs.dev/) 的资料。

## 使用 @vue/cli 创建项目

如果不习惯 Vite ，依然可以使用 Vue CLI 作为开发脚手架。

### 和 Vite 的区别

Vue CLI 使用的构建工具是基于 Webpack ，可以在 [了解构建工具](../get-familiar-quickly/guide.md#了解构建工具) 板块了解 Webpack 和 Vite 这两个构建工具的区别。

### 更新 CLI 脚手架

还是全局安装，把脚手架更新到最新版本（最低版本要求在 `4.5.6` 以上才能支持 Vue 3.0 ）。

```js
npm install -g @vue/cli
```

### 使用 CLI 创建 3.x 项目 ~new

还是熟悉的 `create` 命令。

```js
vue create hello-vue3
```

由于要使用 TS ，所以需要选择最后一个选项来进行自定义搭配。

```js
Vue CLI v5.0.4
? Please pick a preset:
  Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
> Manually select features
```

然后按空格选中需要的依赖，总共选择了下面这些：

```js
Vue CLI v5.0.4
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select,
<a> to toggle all, <i> to invert selection, and <enter> to proceed)
 (*) Babel
 (*) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
>(*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

选择 Vue 版本，要用 Vue 3 所以需要选择 3.x 。

```js
? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
> 3.x
  2.x
```

是否选择 class 语法的模板，虽然这个选项是针对 TypeScript 的，在 Vue 2 版本为了更好的写 TS ，通常需要使用 class 语法，但是因为 Vue 3 有了对 TypeScript 支持度更高的 Composition API ，所以选择 `n` ，也就是 “否” 。

```js
? Use class-style component syntax? (y/N) n
```

Babel 可以把一些现代版本的代码转换为兼容性更好的 JS 版本，所以选 `y` 确认。

```js
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills,
 transpiling JSX)? (Y/n) y
```

路由模式（ Hash 还是 History ），这个根据自己项目情况选择，可以先选 `y` 确认，回头遇到部署的问题可以在 “路由” 内容板块 [部署问题与服务端配置](router.html#部署问题与服务端配置) 查看怎么处理。

```js
? Use history mode for router? (Requires proper server setup for index fallback
 in production) (Y/n) y
```

选择一个 CSS 预处理器，可以根据自己的喜好选择，虽然目前开源社区组件常用的都是 [Less](https://github.com/less/less.js) ，但是建议先选 [Sass](https://www.sass.hk/) 作为预处理器的入门。

```js
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported
 by default):
  Sass/SCSS (with dart-sass)
> Less
  Stylus
```

Lint 规则，用来代码检查，写 TypeScript 离不开 Lint ，可以根据自己喜好选择，也可以先选择默认，后面在 [初探编码规范](#初探编码规范) 一节也有说明如何配置规则，这里先默认第一个。

```js
? Pick a linter / formatter config: (Use arrow keys)
> ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
```

Lint 的校验时机，一个是在保存时校验，一个是在提交 commit 的时候才校验，这里也选默认。

```js
? Pick additional lint features: (Press <space> to select,
 <a> to toggle all, <i> to invert selection, and <enter> to proceed)
>(*) Lint on save
 ( ) Lint and fix on commit
```

项目配置文件，建议使用独立文件。

```js
? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
> In dedicated config files
  In package.json
```

是否保存为未来的项目配置，存起来方便以后快速创建。

```js
? Save this as a preset for future projects? Yes
? Save preset as: vue-3-ts-config
```

至此，项目创建完成！

然后就可以跟原来一样，通过 `npm run serve` 开启热更进行开发调试，通过 `npm run build` 构建打包上线。

### 管理项目配置

用脚手架最重要的一个配置文件就是 `vue.config.js` 了，可以拷贝之前项目下的这个文件使用。

如果之前没有用过脚手架，可以参考官网的说明文档调整各个选项配置：[配置参考 - Vue CLI](https://cli.vuejs.org/zh/config/)

## 调整 TS Config ~new

如果在 `vite.config.ts` 或者 `vue.config.js` 设置 alias 的话，因为 TypeScript 不认识里面配置的 alias 别名，所以需要再对 `tsconfig.json` 做一点调整，增加对应的 path ，否则 TS 不认识。

```txt
比如引入 `@cp/HelloWorld.vue` 的时候
TypeScript 不知道等价于 `src/components/HelloWorld.vue`，从而会报错找不到该模块。
```

假设在 `vite.config.ts` 里配置了这些 alias ：

```ts
export default defineConfig({
  // ...
  resolve: {
    alias: {
      '@': resolve('src'), // 源码根目录
      '@img': resolve('src/assets/img'), // 图片
      '@less': resolve('src/assets/less'), // 预处理器
      '@libs': resolve('src/libs'), // 本地库
      '@plugins': resolve('src/plugins'), // 本地插件
      '@cp': resolve('src/components'), // 公共组件
      '@views': resolve('src/views'), // 路由组件
    },
  },
  // ...
})
```

那么在的 tsconfig.json 就需要相应的加上这些 paths ：

```json{4-12}
{
  "compilerOptions": {
    // ...
    "paths": {
      "@/*": ["src/*"],
      "@img/*": ["src/assets/img/*"],
      "@less/*": ["src/assets/less/*"],
      "@libs/*": ["src/libs/*"],
      "@plugins/*": ["src/plugins/*"],
      "@cp/*": ["src/components/*"],
      "@views/*": ["src/views/*"]
    },
    // ...
  },
  // ...
}
```

:::tip
注意全部要以 `/*` 结尾。
:::

## 初探编码规范

> 考虑到后续的团队协作，最好是能够统一编码风格，先了解下编码约束工具  
> 在 **编码风格及规范** 板块 [编码工具](../coding-specification/codeing-tool.md#为什么用vscode？) 已通过 VsCode 插件集和配置文件完成了预设  
> 在 **编码风格及规范** 板块 [编码规范](../coding-specification/codeing-standard.md#前端开发标准化的意义) 较体系的梳理了编码协作规范的内容

### Prettier

[Prettier](https://github.com/prettier/prettier) 是目前最流行的代码格式化工具，可以约束的代码风格不会乱七八糟，目前所知道的知名项目（如 Vue 、 Vite 、 React 等）和大厂团队（谷歌、微软、阿里、腾讯等）都在使用 Prettier 来格式化代码。

通过脚手架创建的项目很多都内置了 Prettier 功能集成（例如 [Create Preset](#create-preset) ，参考了主流的格式化规范，比如 2 个空格的缩进、无需写分号结尾、数组 / 对象每一项都带有尾逗号等等）。

如果需要手动增加功能支持，请在项目根目录下创建一个 `.prettierrc` 文件，写入以下内容：

```json
{
  "semi": false,
  "singleQuote": true
}
```

这代表 JavaScript / TypeScript 代码一般情况下不需要加 `;` 分号结尾，然后使用 `''` 单引号来定义字符串等变量。

这里只需要写入与默认配置不同的选项即可，如果和默认配置一致，可以省略，完整的配置选项以及默认值可以在 Prettier 官网的 [Options Docs](https://prettier.io/docs/en/options.html) 查看。

配合 VSCode 的 [VSCode Prettier](#vscode-prettier) 扩展，可以在编辑器里使用这个规则来格式化文件。

如果开启了 ESLint ，配合 ESLint 的代码提示，可以更方便的体验格式化，详见 [ESLint](#eslint) 的说明。

:::tip
配合 [VSCode Prettier 扩展](#vscode-prettier) ，这份配置直接在 VSCode 里生效，如果配合 ESLint 使用，需要安装 [prettier](https://www.npmjs.com/package/prettier) 依赖。
:::

### ESLint

[ESLint](https://github.com/eslint/eslint) 是一个查找 JS / TS 代码问题并提供修复建议的工具，换句话说就是可以约束的代码不会写出一堆 BUG ，它是代码强健性的重要保障。

虽然大部分前端开发者都不愿意接受这些约束，但说实话，经过 ESLint 检查过的代码质量真的高了很多，如果不愿意总是做一个游兵散勇，建议努力让自己习惯被 ESLint 检查，大厂和大项目都是有 ESLint 检查的。

特别是写 TypeScript ，配合 ESLint 的检查实在太爽了（字面意思，真的很舒服）。

通过脚手架创建的项目通常都会帮配置好 ESLint 规则，如果有一些项目是一开始没有，后面想增加，也可以手动配置。

这里以一个 Vite + TypeScript + [Prettier](#prettier) 的 Vue 3 项目为例，在项目根目录下创建一个 `.eslintrc.js` 文件，写入以下内容：

```js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
```

安装对应的依赖（记得添加 `-D` 参数添加到 `devDependencies` ，因为都是开发环境下使用的）：

- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
- [prettier](https://www.npmjs.com/package/prettier)

就可以在项目中生效了，一旦代码有问题， ESLint 就会帮检查出来并反馈具体的报错原因，久而久之的代码就会越写越规范。

更多的选项可以在 ESLint 官网的 [Configuring ESLint](https://eslint.org/docs/user-guide/configuring/) 查阅。

如果有一些文件需要排除检查，可以再创建一个 `.eslintignore` 文件在项目根目录下，里面添加要排除的文件或者文件夹名称：

```txt
dist/*
```

更多的排除规则可以在 ESLint 官网的 [The .eslintignore File](https://eslint.org/docs/user-guide/configuring/ignoring-code#the-eslintignore-file) 一文查阅。

## 项目初始化

至此，脚手架已经帮搭好了一个可直接运行的基础项目，已经可以正常的 `dev` 和 `build` 了（取决于的项目 [脚本命令的配置](../get-familiar-quickly/guide.md#脚本命令的配置) ），项目配置和编辑器也都弄好了，是不是可以开始写代码了？

不急，还需要了解一点东西，就是如何初始化一个 Vue 3 项目。

因为在实际开发过程中，还会用到各种 npm 包，像 UI 框架、插件引入都要在初始化阶段处理。

甚至有时候还要脱离脚手架，采用 CDN 引入的方式来开发，所以开始写组件之前，还需要了解一下在 Vue 3 项目中，初始化阶段的一些变化。

### 入口文件

项目的初始化都是在入口文件集中处理，Vue 3 的目录结构对比 Vue 2 没变化，入口文件依然还是 `main.ts`

但 Vue 3 在初始化的时候，做了不少的调整，可以说是面目全非，但是这次改动是更好的，统一了使用方式，不再跟 Vue 2 那样很杂。

### 回顾 Vue 2

Vue 2 在导入各种依赖之后，通过 `new Vue` 来执行 Vue 的初始化；相关的 Vue 生态和插件，有的使用 `Vue.use` 来进行初始化，有的是作为 `new Vue` 的入参。

```ts
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import xxx from 'xxx'

Vue.use(xxx)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
```

### 了解 Vue 3 ~new

在 3.x ，是通过 `createApp` 来执行 Vue 的初始化，另外不管是 Vue 生态里的东西，还是外部插件、 UI 框架，统一都是由 `use` 来激活初始化，非常统一和简洁。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import xxx from 'xxx'

createApp(App).use(store).use(router).use(xxx).mount('#app')
```

## Vue Devtools

Vue Devtools 是一个浏览器扩展，支持 Chrome 、 Firefox 等浏览器，需要先 [安装 Vue Devtools](https://devtools.vuejs.org/guide/installation.html) 扩展才能使用。

当在 Vue 项目通过 `npm run dev` 等命令启动开发环境服务后，访问本地页面（如： `http://localhost:3000/` ），在页面上按 F12 唤起浏览器的控制台，会发现多了一个 `vue` 面板。

面板上有两个主要的 Tabs ：

- Inspector 是以结构化的方式显示调试信息，例如检查组件，可以选择组件并检查它们的状态：

<ClientOnly>
  <ImgWrap
    src="/assets/img/vue-devtools-inspector.jpg"
    alt="Vue Devtools 的 Inspector 界面"
  />
</ClientOnly>

- Timeline 是以时间线的方式追踪不同类型的数据，例如事件

<ClientOnly>
  <ImgWrap
    src="/assets/img/vue-devtools-timeline.jpg"
    alt="Vue Devtools 的 Timeline 界面"
  />
</ClientOnly>

更多的用法可以在 [Vue Devtools 官网](https://devtools.vuejs.org/) 了解。

<!-- 谷歌广告 -->
<ClientOnly>
  <GoogleAdsense />
</ClientOnly>
<!-- 谷歌广告 -->

<!-- 评论 -->
<ClientOnly>
  <GitalkComment
    :issueId="45"
  />
</ClientOnly>
<!-- 评论 -->
