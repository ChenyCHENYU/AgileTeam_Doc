---
layout: CodeingTool
title: 编码工具
outline: 'deep'
---

# 代码编辑器

**工欲善其事，必先利其器** :wrench:  
要问现在前端工程师用的最多的代码编辑器是哪个，肯定是 **Visual Studio Code** 了！

## 为什么用 vscode ？

> 微软背书，生态健壮，功能强大，性能优秀，大量实用的插件集，工具流，高弹性配置，规则定制化，轻巧便捷，Sync 绑定 Hub，团队协作开发配置统一化、规范化，满足前端主流开发，Vue、React、Angular 三大框架，小程序、混合开发、sass、stylus 预处理等等。

:::info 与其他的编辑器相比，它的优点如此突出：

- 背靠 Microsoft ，完全免费并且开源，开箱即用
- 可以通过简单的配置调整来满足之前在其他编辑器上的习惯（ e.g. Sublime Text ）
- 轻量级但功能强大，内置了对 JavaScript、TypeScript 和 Node.js 的支持，
- 丰富的插件生态，可以根据的需要，安装提高编码效率的功能支持，以及其他的语言扩展
- 智能的代码补全、类型推导、代码检查提示、批量编辑、引用跳转、比对文件等功能支持
- 登录的 GitHub 账号即可实现配置自动同步，在其他电脑上直接使用的最习惯配置和插件

  :::

当然，还有非常多优点，在使用中慢慢徜徉...ba！

## 安装 VSCode

点击下载：[Visual Studio Code](https://code.visualstudio.com/Download)

一般情况下开箱即用，无门槛，也可以阅读官方文档了解一些个性化的配置。

点击查看：[操作文档](https://code.visualstudio.com/docs)

## 团队初始化配置

1. 安装插件 Setting Sync [VsCode Plugin Setting Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)。

![vscode, Setting Sync](/assets/img/settingsync.png)  
2. Ctrl + Shift + P 输入 sync 后，按如下步骤进行操作。

![vscode, Sync Selct Options](/assets/img/sync-select-options.png)  
![vscode, Sync Download Option](/assets/img/sync-download-option.png)  
![vscode, Sync Gist Enter](/assets/img/sync-open-setting.png)  
![vscode, Sync Gist Enter](/assets/img/sync-gist.png)

3. 复制 Gist ID 到 Settings Sync 设置界面，View 输入后选择下载配置。

```txt
424f89d2da9867691769448e5b1bf657
```

- 在插件检索区域输入 @installed 查看安装的插件集。
- 进入项目，编写部分代码，进行格式化，测试一下效果。

:::tip
若同步插件集失败，请注意是否为科学上网，请耐心多次尝试哦。
:::

## 插件集掠影

![vscode, plugins](/assets/img/plugins.png)

## 简单介绍集成的插件

VSCode 本身是轻量级的，也就是只提供最基础的功能，更优秀的体验或者个性化体验，是需要通过插件来启用的。

这里介绍几个非常舒服的 VSCode 插件，可以通过插件中心安装，也可以通过官方应用市场下载，**如果团队使用，建议使用集成我配置好的插件集**，你只需要同步 [团队初始化配置](#团队初始化配置)。

### Chinese (Simplified)

VSCode 安装后默认是英文本，需要自己进行汉化配置， VSCode 的特色就是插件化处理各种功能，语言方面也一样。

安装该插件并启用，即可让 VSCode 显示为简体中文。

点击下载：[Chinese (Simplified)](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)

### Volar

Vue 官方推荐的 VSCode 扩展，用以代替 Vue 2 时代的 Vetur ，提供了 Vue 3 的语言支持、 TypeScript 支持、基于 [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) 的类型检查等功能。

点击下载：[Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Vue VSCode Snippets

从实际使用 Vue 的角度提供 Vue 代码片段的生成，可以通过简单的命令，在 .vue 文件里实现大篇幅的代码片段生成，最新版本已基于 Volar 构建。

e.g.

1. 输入 `ts` 可以快速创建一个包含了 `template` + `script` + `style` 的 Vue 模板（可选 2.x 、3.x 以及 class 风格的模板）

2. 也可以通过输入带有 `v3` 开头的指令来快速生成 Vue 3 的 API 。

下面是输入了 `ts` 两个字母之后，用箭头选择 `vbase-3-ts` 自动生成的一个模板片段，在开发过程中非常省事：

```vue
<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
```

点击下载：[Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

::: tip
为啥要推荐这个 `vue-vscode-snippets`，而不是 `Vue3snippets`，原因可以看之前记录的一段揪心的经历：

[解决 vscode 保存 vue 文件时 压缩 stylus 代码为一行以及无法注释 template 的问题](https://cheny.com/article/vue-vscode-snippets.html)
:::

### Auto Close Tag

可以快速帮完成 HTML 标签的闭合，除非熟悉 `jsx` / `tsx`，否则在写 `template` 的时候肯定用得上。

点击下载：[Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

### Auto Rename Tag

假如要把 `div` 修改为 `section`，不需要再把 `<div>` 然后找到代码尾部的 `</div>` 才能修改，只需要选中前面的半个标签，直接修改，插件会自动帮把闭合部分也同步修改，对于篇幅比较长的代码调整非常有帮助。

点击下载：[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)

### VSCode Prettier

这是 [Prettier](#prettier) 在 VSCode 的一个扩展，不论的项目有没有安装 Pretter 依赖，安装该扩展之后，单纯在 VSCode 也可以使用 Pretter 来进行代码格式化。

点击下载：[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

点击访问：[Prettier 官网](https://prettier.io/) 了解更多配置。

### VSCode ESLint

这是 [ESLint](#eslint) 在 VSCode 的一个扩展， TypeScript 项目基本都开了 ESLint ，编辑器也建议安装该扩展支持。

点击下载：[VSCode ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

点击访问：[ESLint 官网](https://eslint.org/) 了解更多配置。

### 其他插件

更多插件根据个性化需要，自行了解下载，等我后面有时间了更新下安装的插件集使用。
