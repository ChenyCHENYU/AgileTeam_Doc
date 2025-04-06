---
outline: 'deep'
---

# 关于 git 提交规范

> PS：详细的 `git 约定式提交` 可点击[这里](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 查看

## 安装相关依赖和增加相关配置 ~new

下面我使用的命令，都是基于`bun`包管理器来执行的，`npm|pnpm|yarn` 都是类似一样的。

::: code-group

```bash [npm]
$ npm install
```

```bash [yarn]
$ yarn add
```

```bash [pnpm]
$ pnpm add
```

```bash [bun]
$ bun add
```

:::

1、 全局安装 commitizen

```bash
bun add commitizen@4.2.4 -g
```

2、项目安装 cz-customizable

```bash
bun add cz-customizable@6.3.0 -D
```

3、 添加以下配置到 package.json 中

```json
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  },
```

4、项目根目录下创建`.cz-config.js` 自定义提示文件

```js
module.exports = {
  scopes: [],
  allowEmptyScopes: false,
  allowCustomScopes: true,

  //MARK: 可选类型
  types: [
    { value: 'wip', name: 'wip:      开发中' },
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      bug修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式|样式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' },
  ],

  //MARK: 消息步骤
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(必填，格式如：父模块/子模块):\n',
    subject: '请简要描述提交(必填，中文表述):',
    body: '请输入修改范围(必填，格式如：一级模块名称/二级模块名称):\n',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: 'CodeMaster要做检查，确认使用以上信息提交？(y/n/e/h)',
  },

  //MARK: 跳过问题
  skipQuestions: ['body', 'footer'],

  //MARK: subject文字长度默认是72
  subjectLimit: 72,
}
```

👉 这里有个注意点，要使用 git cz 验证的时候，需要剔除 `package.json` 文件中的 "type": "module"，否则找不到模块，因为库是基于 CJS 规范编写的。

## 关于 git hooks ~new

> PS：详细的 `HOOKS介绍` 可点击[这里](https://git-scm.com/docs/githooks)查看

| Git Hook       | 调用时机                                                                                                                                           | 说明                               |
| :------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **pre-commit** | `git commit`执行前<br />它不接受任何参数，并且在获取提交日志消息并进行提交之前被调用。脚本`git commit`以非零状态退出会导致命令在创建提交之前中止。 | 可以用`git commit --no-verify`绕过 |
| **commit-msg** | `git commit`执行前<br />可用于将消息规范化为某种项目标准格式。<br />还可用于在检查消息文件后拒绝提交。                                             | 可以用`git commit --no-verify`绕过 |

:::tip

`commit-msg`：可以用来规范化标准格式，并且可以按需指定是否要拒绝本次提交  
`pre-commit`：会在提交前被调用，并且可以按需指定是否要拒绝本次提交

:::

而我们接下来要做的关键，就在这两个钩子上面。

## 使用 husky + commitlint ~new

检查提交描述是否符合规范要求，要完成这么个目标，那么我们需要使用两个工具：

1、[commitlint](https://github.com/conventional-changelog/commitlint)：用于检查提交信息

2、 [husky](https://github.com/typicode/husky)：是`git hooks`工具

:::tip

注意：**`npm` 需要在 7.x 以上版本！！！！！**
:::

### commitlint

1. 安装依赖：

   ```bash
   bun add  --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
   ```

2. 创建 `commitlint.config.js` 文件

   ```bash
   echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
   ```

3. 打开 `commitlint.config.js` ， 增加配置项（ [config-conventional 默认配置点击可查看](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js) ）：

```js
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'wip', //开发中
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
      ],
    ],
    // subject 大小写不做校验
    'subject-case': [0],
  },
}
```

:::tip
**注意：确保保存为 `UTF-8` 的编码格式**，否则可能会出现错误；并且注意上面的数组中的配置要跟 `.cz-config.js` 中的配置一致。

:::

### husky

1、安装依赖：

```
bun add husky@7.0.1 --save-dev
```

2、启动 `hooks` ， 根目录下生成 `.husky` 文件夹

```
bunx husky install
```

3、在 `package.json` 中生成 `prepare` 指令（ **需要 npm > 7.0 版本** ）

```
bun set-script prepare "husky install"
```

或者手动添加如下命令：

```json

# package.json
"scripts":{
  // 增加如下代码...
  "prepare": "husky install"   +
}

```

4、执行 `prepare` 指令验证

```bash
bun prepare
```

5、添加 `commitlint` 的 `hook` 到 `husky`中，并指令在 `commit-msg` 的 `hooks` 下执行 `npx husky add .husky/commit-msg 'bunx --no-install commitlint --edit "$1"'` 指令

```bash [npx]
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

至此， 不符合规范的 commit 将不再可提交：

```
PS F:\xxxxxxxxxxxxxxxxxxxxx\imooc-admin> git commit -m "测试"
⧗   input: 测试
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

现在我们还缺少一个 **规范化的处理** ，那就是 **代码格式提交规范处理！**

### 通过 pre-commit 检测提交时代码规范

在 **`ESLint` 与 `Prettier` 配合解决代码格式问题**，但是这样的一个格式处理问题，他只能够在本地进行处理，并且我们还需要 **手动在 `VSCode` 中配置自动保存** 才可以。那么这样就会存在一个问题，要是有人忘记配置这个东西了怎么办呢？他把代码写的乱七八糟的直接就提交了怎么办呢？

那么想要规避这么一个风险操作就需要使用 `husky` 配合 `eslint` 才可以实现。

:::tip :eyes:

我们期望通过 **`husky` 监测 `pre-commit` 钩子，在该钩子下执行 `bunx eslint --ext .js,.vue,.ts,.tsx src`** 指令来去进行相关检测：
:::

1、执行 `npx husky add .husky/pre-commit "bunx eslint --ext .js,.vue,.ts,.tsx src"` 添加 `commit` 时的 `hook` （`bunx eslint --ext .js,.vue,.ts,.tsx src` 会在执行到该 hook 时运行）

```bash [npx]
npx husky add .husky/pre-commit "bunx eslint --ext .js,.vue,.ts,.tsx src"
```

:::tip `pre-commit`推荐配置：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 第一阶段：快速检查（100ms 级别）
bunx oxlint --max-warnings 0

# 第二阶段：深度检查（秒级）
bunx eslint --ext .js,.vue,.ts,.tsx src
```

:::

然后根据配置的约束规范，执行测试效果。

```bash
PS F:\xxxxxxxxxxxxxxxxxxx\imooc-admin> git commit -m 'test'

F:\xxxxxxxxxxxxxxxx\imooc-admin\src\views\Home.vue
13:9  error  Strings must use singlequote  quotes

✖ 1 problem (1 error, 0 warnings)
1 error and 0 warnings potentially fixable with the `--fix` option.

husky - pre-commit hook exited with code 1 (error)
```

### lint-staged 自动修复格式错误

`pre-commit` 处理了检测代码提交规范问题，当进行代码提交时，会检测所有的代码格式规范。

**但是这样会存在两个问题：**

:::warning
\- 只修改了个别的文件，没有必要检测所有的文件代码格式；  
\- 它只能给提示出对应的错误，还需要手动的进行代码修改。
:::

那么想要处理这两个问题，就需要使用另外一个插件 [lint-staged](https://github.com/okonet/lint-staged) ！

安装，`lint-staged` 是一个 `git hooks` 工具，它可以在 `git commit` 之前，对代码进行格式化和检查。

```bash
bun add -D lint-staged
```

1、 修改 `package.json` 配置

```js
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,vue}": [
      "eslint --fix",
      "git add"
    ]
  }
```

2、如上配置，每次它只会在本地 `commit` 之前，校验提交的内容是否符合本地配置的 `eslint`规则（这个见文档 [ESLint](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/eslint.html) )，校验会出现两种结果：

:::warning

1、如果符合规则：则会提交成功；  
2、如果不符合规则：它会自动执行 `eslint --fix` 尝试自动修复，如果修复成功则会把修复好的代码提交，如果失败，则会提示错误，需手动修好这个错误之后才能允许提交代码。

:::

3、修改 `.husky/pre-commit` 文件

```bash
 #!/bin/sh
 . "$(dirname "$0")/_/husky.sh"

 bunx lint-staged

```

## 目录规范

#### `vue` 项目组件结构设置

:::info 目录结构

src/  
├── components/  
│ ├── global/ # 全局组件 (自动注册)  
│ │ └── C_Button.vue  
│ └── local/ # 本地组件 (手动导入)  
│ └── c_Table.vue  
└── plugins/  
└── components.ts # 自动注册配置

:::
