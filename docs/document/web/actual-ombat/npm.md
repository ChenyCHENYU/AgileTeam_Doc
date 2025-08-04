---
outline: 'deep'
---

<script>
  import { baseURL } from '../../team/baseURL.ts'
</script>

# Npm、Nvm、Yarn、Pnpm 的高效使用

对于包管理器的使用，掌握这些就够了。

## Npm

> npm 全称为 Node Package Manager，是一个基于 Node.js 的包管理器，也是 Node.js 社区最流行、支持的第三方模块最多的包管理器。它的初衷就是让开发人员更容易分享和重用代码。npm 提供了命令行工具，其主要功能是管理 Node.js 包，包括安装、更新、删除、查看、搜索、发布等。 ​

npm 最初只是 Node.js 的包管理器，但随着前端技术的不断发展，它的定位变成了广义的包管理器，可以实现 **JavaScript、React、Vue、Gulp** 移动开发等包管理，是目前最大、生态最为健全的包管理器。

`npm` 能解决 `Node.js` 在模块管理上的很多问题，其常见的应用场景如下：

<ElCard shadow="hover">

- 从 `npm` 镜像服务器下载第三方模块；
- 从 `npm` 镜像服务器下载并安装命令行程序到本地；
- 自己发布模块到 `npm` 镜像服务器供他人使用。

</ElCard>

:eyes: `npm` 不需要单独安装，在安装 `Node.js` 时，就会连带着一起安装 `npm` 了。

### 常用的 npm 命令

| 命令 <img width="248"/>          | 作用                                                                                                    |
| :------------------------------- | :------------------------------------------------------------------------------------------------------ |
| npm -v                           | 查看 npm 版本                                                                                           |
| npm init                         | 初始化后会出现一个 package.json 配置文件，可以在后面加上 -y 参数，快速跳过问答界面                      |
| npm install                      | 根据项目中的 package.json 文件自动下载项目所需的全部依赖                                                |
| npm install 包名 --save-dev      | --save-dev 可以简写为 -D，安装的包只用于开发环境，会会出现在 package.json 文件的 devDependencies 属性中 |
| npm install 包名 --save          | 安装的包需要发布到生产环境，会出现在 package.json 文件的 dependencies 属性中                            |
| npm list                         | 查看当前目录下已安装的 node 包                                                                          |
| npm list -g                      | 查看全局安装的 node 包 Undefined                                                                        |
| npm updated 包名                 | 更新指定的包                                                                                            |
| npm uninstall 包名               | 卸载指定的包                                                                                            |
| npm config list                  | 查看配置信息                                                                                            |
| npm info 指定包名                | 查看远程 npm 上指定包的所有版本信息                                                                     |
| npm config set registry 镜像地址 | 设置和修改包资源下载的镜像源                                                                            |
| npm root                         | 查看当前包的安装路径                                                                                    |
| npm root -g                      | 查看全局包的安装路径                                                                                    |
| npm ls 包名                      | 查看本地安装的指定包及版本信息，没有显示 empty                                                          |
| npm ls 包名 -g                   | 查看全局安装的指定包及版本信息，没有显示 empty                                                          |

**下面重点介绍几个命令**

当要使用一个包时，如果想要了解它是如何使用的，可以使用以下命令来打开这个包的主页，它会自动启动浏览器并打开这个页面，这里以 Vue 为例。

```bash
$ npm vue
```

查看这个包有哪些问题，现存的 issue，或者公开的 roadmap。

```bash
$ pm bugs vue
```

查看这个包的代码地址。

```bash
$ npm repo vue
```

查看包的描述信息。

```bash
$ npm info react description
```

#### npm install

使用 `npm install` 命令来安装需要的包，如果想把这个包自动添加到 `package.json` 中。

:::tip
`npm install` 等同于 `npm install vue --save`，等同于 `npm install vue -S`，推荐简写。  
`npm install vue@latest` 安装最新版本。  
`npm install vue@2.6.4` 安装指定版本。  
`npm install react@">=2.5.0 <2.6.4"` 安装指定区间版本。
:::

```bash
$ npm install vue
```

在执行 `npm install` 命令时，npm 5 之前只会下载，不会保存依赖信息。如果需要保存，就需要加上 `--save` 选项， **npm 5** 以后就可以省略 `--save` 选项了，它会自动保存，放心使用。

#### update 和 uninstall

用来更新或删依赖版本，想要更新全局安装的模块，需要添加参数 `-global`。

```bash
// 更新包
$ npm update [package name]
$ npm update --global [package name]

// 删除包
$ npm uninstall [package name]
$ npm uninstall [package name] -global
```

:bell: 从 `npm v2.6.1` 开始，`npm update` 只会更新顶层的模块，而不更新依赖的依赖模块，而之前的版本是递归更新的。如果想要这种效果，可以使用以下命令：

```bash
$ npm --depth 9999 update
```

#### npm v

检查 `npm` 包的最新版本。

```bash
// 展示包的信息
$ npm view <package-name>
$ npm v <package-name>

// 展示最新版本
$ npm v <package-name> version

// 展示所有版本
$ npm v <package-name> versions
```

#### npm run

`npm` 不仅可以用于管理模块，还可以用于执行脚本。 在 `package.json` 文件中有一个 `scripts` 字段，可以用于定义脚本命令，供 `npm` 使用。除了可以在 package.json 文件中查看有哪些命令，也可以使用 `npm run` 命令来查看所有脚本命令。

```bash
$ npm run
```

#### npm dedupe 和 npm ddp

可以通过运行 `npm dedupe` 命令来删除重复的依赖项。该命令通过删除重复包并在多个依赖包之间共享公共依赖项来简化整体的结构。它会产生一个扁平的、去重的树。

```bash
$ npm ddp // dedupe 的简写
```

### 镜像源设置

用来解决国内 NPM 安装依赖速度慢问题，这里使用的淘宝的镜像源。

#### 淘宝源

:::tip
NPM 淘宝镜像源地址已经切换至 https://registry.npmmirror.com/binary.html?path=npm/
:::

```bash
$ npm config set registry https://registry.npmmirror.com/
```

查看当前镜像源。

```bash
$ npm config get registry
```

如果需要发布自己的 npm 包，需要将源设置回来。

```bash
$ npm set registry http://registry.npmjs.org
```

:::tip
有时候会发现，安装依赖出现卡死情况，可能是用了无效代理的原因，记得清除。
:::

```bash
$ npm config rm proxy && npm config rm https-proxy
```

#### nrm 多源管理

如果需要管理多个镜像源，可以查看 [nrm](https://github.com/Pana/nrm) 使用，`nrm` 是一个 `npm` 源管理器，可以快速地在 `npm` 源间切换。

**安装 `nrm` 和它的常用命令**

```bash
$ npm install Pana/nrm -g    // 需要通过全局安装源码 nrm。
$ nrm ls   // 查看可选源，星号代表当前使用源，没有就 use 指定一下。
$ nrm current   // 查看当前源，未设置不显示信息。
$ nrm use <registry>   // 使用某个镜像源，比如 nrm use taobao。
$ nrm add <registry> <url>   // 添加源，源名，地址。
$ nrm del <registry>   // 删除源。
$ nrm test <registry>  // 测试源响应速度。
```

## Nvm

### nvm 的安装

这里以 Windows 为栗，Mac 自行百度。

[NVM 安装地址](https://github.com/coreybutler/nvm-windows/releases)

如果电脑上之前已经单独安装了 node，先卸载，然后下载 nvm-setup.zip 后直接安装，完成后查看版本号。

```bash
$ nvm -v
```

可以使用国内的淘宝镜像，下载更快速，可以用上面 `nrm` 的方式，如果没安装 `nrm` ，使用以下方式也可。

找到安装目录下 **settings.txt**文件，换行添加两行代码。

```txt
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

保存退出即可。

### nvm 的常用命令

```bash
$ nvm v                     /0/ 显示 nvm 版本
$ nvm ls                      // 显示所有安装的 node.js版本
$ nvm list available          // 查看源上支持可以安装的版本
$ nvm install <version>       // 安装指定版本的 node.js
$ nvm current                 // 显示当前版本
$ nvm use <version>           // 切换到使用指定的 node.js 版本
$ nvm uninstall <version>     // 卸载指定版本的 nodej.s，当安装失败时卸载使用
$ nvm alias <name> <version> ## // 给不同的版本号添加别名
$ nvm unalias <name>  ##      // 删除已定义的别名
$ nvm install stable          // 安装最新稳定版
$ nvm reinstall-packages <version> ## // 当前node版本下重新全局安装指定版本号的npm包
$ nvm on                      // 启用node.js版本管理
$ nvm off                     // 禁用node.js版本管理(不卸载任何东西)
$ nvm proxy                   // 查看设置与代理
$ nvm root [path]             // 设置和查看root路径
```

## Yarn

> Yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 . 是为了弥补 npm 的一些缺陷而出现的。

### yarn 常用命令

安装 `yarn`。

```bash
$ npm install -g yarn
```

下面列举一些常用的命令，更多了解 [Yarn](https://www.yarnpkg.cn/) 官网。

| 命令                      | 作用                                                 |
| :------------------------ | :--------------------------------------------------- |
| yarn v                    | 查看 yarn 版本                                       |
| yarn init                 | 初始化某个项目                                       |
| yarn install              | 安装项目依赖，精简命令 yarn                          |
| yarn add taco             | 安装某个依赖，并且默认保存到 package                 |
| yarn remove taco          | 移除某个依赖                                         |
| yarn add taco --dev       | 安装某个开发时依赖                                   |
| yarn up taco              | 更新某个依赖， 更新所有依赖 yarn upgrade-interactive |
| yarn global add taco      | 安装某个全局依赖，慎用                               |
| yarn publish/login/logout | 发布/登录/登出，一系列 NPM Registry 操作             |
| yarn run                  | 执行脚本                                             |
| yarn set version latest   | 更新 yarn 版本                                       |

了解和满足部分 yarn 依赖项目的使用即可，更多不再赘述，下面重点介绍下 `pnpm` 的使用。

## Pnpm ~new

> Pnpm 是 Node.js 的替代包管理器。它是 Npm 的直接替代品，但速度更快、效率更高。

<ElCard shadow="hover">

- 体验优良，依赖安装速度极快，占用磁盘空间小。

- 上手简单，大部分 npm / yarn 项目可以低成本完成迁移，官方也有较详尽的中文文档。

- pnpm 组织 node_modules 目录的方式兼容原生 Node，与打包工具配合良好，可以很放心的使用于生产环境。

- pnpm 依赖访问虽然严格，但是规则清晰，界限分明，不再如以前一样容易出现依赖冲突，反而降低了使用时的心智负担。

</ElCard>

更多可以参考 [pnpm 中文文档](https://www.pnpm.cn/motivation) 进行系统了解。

### pnpm 的优势

> Pnpm 拥有 Yarn 超过 Npm 的所有附加功能。

当安装软件包时，会将其保存在机器上的全局存储中，然后会从中创建一个硬链接，而不是进行复制。对于模块的每个版本，磁盘上只保留一个副本。例如，当使用 `npm` 或 `yarn` 时，如果您有 100 个使用 `lodash` 的包，则磁盘上将有 100 个 `lodash` 副本。

<ElCard shadow="hover">

- **安全：** 与 `yarn` 一样，`pnpm` 有一个包含所有已安装包校验和的特殊文件，用于在执行代码之前验证每个已安装包的完整性。
- **离线模式：** `pnpm` 将所有下载的包 `tarball` 保存在本地注册表镜像中。当包在本地可用时，它从不发出请求。使用该--offline 参数可以完全禁止 HTTP 请求。
- **速度：** `pnpm` 不仅比 `npm` 快，而且比 `yarn` 快。无论是冷缓存还是热缓存，它都比 `yarn` `快。yarn` 从缓存中复制文件，而 `pnpm` 只是从全局存储中链接它们。

</ElCard>

使用 NPM 配置的项目，磁盘总大小 **1260 MB**

<ImgPreview src="img/npm-config.png" title="npm 配置图"/>

使用 PNPM 配置的项目，磁盘总大小 **500 MB**

<ImgPreview src="img/pnpm-config.png" title="pnpm 配置图"/>

安装依赖的速度

<ImgPreview src="img/01.png" title="安装依赖速度"/>

### pnpm 的使用

**全局安装**

```bash
$ npm install pnpm -g
```

**初始化**

```bash
$ pnpm init
```

**设置源**

```bash
// 查看源
$ pnpm config get registry
// 切换淘宝源
$ pnpm config set registry https://registry.npmmirror.com/
```

**添加**

```bash
$ pnpm i 包名称  // 添加依赖包
$ pnpm add 包名称    // -S  默认写入dependencies
$ pnpm add -D    // -D devDependencies
$ pnpm add -g    // 全局添加依赖包
```

**移除**

```bash
$ pnpm remove 包名称  // 移除包
$ pnpm remove 包名称 --global  // 移除全局包
```

**更新**

```bash
$ pnpm up  // 更新所有依赖项
$ pnpm upgrade 包  // 更新指定包
$ pnpm upgrade 包 --global  // 更新全局包
```

**设置存储路径**

```bash
$ pnpm config set store-dir /path/to/.pnpm-store
```

**执行**

```bash
$ pnpm run
```

`pnpm` 比 `npm` 和 `yarn` 更快并且更有效地处理磁盘内存。在处理多个项目应用程序时，提供了大量的可用空间。将依赖项放在全局存储上并重用它会更有效，这是其他包管理器所忽略的。
