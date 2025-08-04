---
outline: 'deep'
---

<script setup>

</script>

# 渐进式 "编码规范"

> 编码规范在程序开发中是非常重要的，比如规范中的命名一块，一个不好的命名，可能会引起别人错误理解，对开发效率，项目的质量影响很大，从维护项目上，遵循一套严格的命名规范，无论是对自己还是接手的他人，都会大大降低代码的维护成本，为了大家聚焦参考，从命名开始，将以 Demo 项目逐层下钻的方式展开介绍。

## 前端开发标准化的意义 ？

<ElCard >

\- 坚持一致的风格指南；  
\- 有效注释，保持干燥，提升抽象复用，增强开发能力；  
\- 确保代码可读性，易用性，维护性；  
\- 避免重复造轮子；  
\- 有效的版本控制，有利于项目管理，代码质量把控；  
\- 对修改关闭，拓展开放，提高开发的生产力；  
\- 赋能交叉协同的沟通效率，相互合作，减少差错和误解；  
\- 相互驱动，奖励编码，OneTeam，一起玩的 Happy。

</ElCard>

## 命名规则

> 坚持制定好的代码规范，无论团队人数多少，代码应该同出一门。  
> 如果你觉得这个规范有不合理的地方。请提出你的建议来讨论。

### 项目命名

全部采用小写方式，以下划线分割。

```txt
栗：my_project_name
```

### 目录命名

全部采用小写方式，以中划线分割，有复数结构时，要采用复数命名法。

```txt
栗：scripts, styles, images, data-models
```

### JS 文件命名

参照目录命名，全部采用小写方式，以中划线分割。

```txt
栗：account-model.js
```

### CSS, SCSS 文件命名

参照目录命名，全部采用小写方式，以中划线分割。

```txt
栗：retina-sprites.scss
```

### Template 规则

- 嵌套的节点应该缩进 2 个空格；
- 在属性上，使用双引号，不要使用单引号；
- 属性名全小写，用中划线做分隔符。

```vue
<template>
  <h1 class="hello-world">Hello, world!</h1>
</template>
```

### 属性顺序

属性应该按照特定的顺序出现以保证易读性。

\- class；  
\- id；  
\- name；  
\- data-\*；  
\- src, for, type, href, value , max-length, max, min, pattern；  
\- placeholder, title, alt；  
\- aria-\*, role；  
\- required, readonly, disabled。

```vue
<template>
  <a class="..." id="..." data-modal="toggle" href="#">Example link</a>
</template>
```

### boolean 属性

boolean 属性不需要声明取值的属性，属性的存在表示取值为 true，不存在则表示取值为 false。

```vue
<template>
  <input type="checkbox" value="1" checked />
  <select>
    <option value="1" selected>1</option>
  </select>
</template>
```

### 减少标签数量

遵循一个设计原则，在编写 HTML 代码时，需要尽量避免多余的父节点，任何时候都要用尽量小的复杂度和尽量少的标签来解决问题。

```vue
<template>
  <!-- Not well -->
  <span class="avatar">
    <img src="..." />
  </span>

  <!-- Better -->
  <img class="avatar" src="..." />
</template>
```

### CSS,SCSS 定义命名

- 类名使用小写字母，以中划线分隔
- id 采用驼峰式命名
- scss 中的变量、函数、混合、placeholder 采用驼峰式命名

```scss
/* class */
.element-content {
    ...
}

/* id */
#myDialog {
    ...
}

/* 变量 */
$colorBlack: #000;

/* 函数 */
@function pxToRem($px) {
    ...
}

/* 混合 */
@mixin centerBlock {
    ...
}

/* placeholder */
%myDialog {
    ...
}
```

### 单行注释

- 双斜线后，必须跟一个空格；
- 缩进与下一行代码保持一致；
- 可位于一个代码行的末尾，与代码间隔一个空格。

```js
if (condition) {
  // if you made it here, then all security checks passed
  allowed()
}

let zhangsan = 'zhangsan' // one space after code
```

### 多行注释

最少三行, '\*'后跟一个空格，建议在以下情况下使用，具体参照下边的写法：

- 难于理解的代码段；
- 可能存在错误的代码段；
- 浏览器特殊的 HACK 代码；
- 业务逻辑强相关的代码。

```js
/*
 * one space after '*'
 */
let x = 1
```

### 文档注释

建议在以下情况下使用：

- 所有常量；
- 所有函数；
- 所有类。

```js
/**
 * @func foo
 * @desc 一个带参数的函数
 * @param {string} a - 参数a
 * @param {number} b=1 - 参数b默认值为1
 * @param {string} c=1 - 参数c有两种支持的取值</br>1—表示x</br>2—表示xx
 * @param {object} d - 参数d为一个对象
 * @param {string} d.e - 参数d的e属性
 * @param {string} d.f - 参数d的f属性
 * @param {object[]} g - 参数g为一个对象数组
 * @param {string} g.h - 参数g数组中一项的h属性
 * @param {string} g.i - 参数g数组中一项的i属性
 * @param {string} [j] - 参数j是一个可选参数
 */
function foo(a, b, c, d, g, k, j) {
    ...
}
```

### 变量命名

标准变量采用驼峰式命名（除了对象的属性外）；

- 'ID'在变量名中全大写
- 'URL'在变量名中全大写
- 常量全大写，用下划线连接

```js
let thisIsMyName = 'cheny'

let goodID = '88888888'

let reportURL = 'http://www.tzagileteam.com'

const MAX_COUNT = 10

const getData = () => {}
```

### 括号

下列关键字后必须有大括号（即使代码块的内容只有一行）：  
`if`, `else`, `for`, `while`, `do`, `switch,` `try`, `catch`, `finally`, `with`。

```js
// not good
if (condition) doSomething()

// good
if (condition) {
  doSomething()
}
```

### undefined

- 永远不要直接使用 undefined 进行变量判断；
- 使用 typeof 和字符串'undefined'对变量进行判断。

```js
// not good
if (person === undefined) {
    ...
}

// good
if (typeof person === 'undefined') {
    ...
}
```

更多其他的格式标准化，已配置在 vscode 和插件集了，无需关注，直接使用感受即可。

## 通用约定俗成

:::tip

- 不要拼写错误单词
- 不要中英文混用
- 不要 1-9 a-z 命名
- 不要混用命名 （不同文件相同组件内命名不一致）
- 单复数不分
- js 使用驼峰命名法：类名首字母必须大写 ，js 用单引号，不带结尾
- css 命名全部小写 html 对大小写不敏感 见名知义使用 - 隔开
- 针对特型命名，自定义命名，需见名知意，完全按照命名规范
- 合理分类解耦，HTML,CSS,JS 带代码结构上尽量做到互相隔离

:::

除了通用这些，其他感兴趣的话，参考 [Github 命名规范](https://github.com/ktaranov/naming-convention) 了解更多哦。

## 项目约定俗成

### 目录定义

<DocImage src="img/project-dir.png" title="vscode, Project Dirs"/>

### 命名定义

> :bell: 此定义面向的技术选型是前端框架 [Vue](https://cn.vuejs.org/) 生态，如全家桶，Pinia，TypeScript 以及 UI 框架，下文以 Vue3.2，UI 框架 [ElementPlus](https://element-plus.gitee.io/zh-CN/) 为栗，余者大同小异

<!-- TODO: api  -->

api 目录下 sys.ts 示栗：

::: tip :pushpin: 接口定义

- 带上接口请求函数描述
- method 大写，默认 GET 不用写入
- 入参使用对象简写方式

  :::

```ts
import request from '@/axios/request'

/**
 * @description: 登录接口
 */
export const login = (data: any) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}

/**
 * @description: 获取用户信息接口
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
  })
}
```

<!-- TODO: components  -->

components 目录下 C_Table.vue 示栗：

::: tip :pushpin: 头部注释

- 根据配置的插件自动生成
- 手动快捷键 `Ctrl + Window + I`
- 自动记录最新更改时间，最后编辑成员名称
- 更多使用和配置参考 [koroFileHeader](https://github.com/OBKoro1/koro1FileHeader/wiki/%E5%AE%89%E8%A3%85%E5%92%8C%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)
  :::

```vue
<!--
 * @Author: 杨晨誉
 * @Date: 2022-03-23 14:53:17
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-05-05 16:25:54
 * @FilePath: \v3-el-components\src\components\C_Table\index.vue
 * @Description: 表格组件
 * 
-->
/template /script setup /style ...
```

::: tip :pushpin: template 示栗

- 通过 TODO Highlight 插件进行关键信息高亮注释，参考 [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- 键入<span style="color:gold">**TODO:**</span> 或 <span style="color:#f06292">**FIXME:**</span> 进行关键的注释提示和注释警告
- 全局组件封装过程中，服务于全局组局的局部组件，参考 RenderSlot 组件命名方式 `AaBb`
  :::

<DocImage src="img/C_Table.png" title="components, C_Table"/>

::: tip :pushpin: script setup 示栗

- 全局组件名以 `C_` 为前缀，组件首字母大写，比如 `C_Table`，驼峰规则
- 全局组件的类型约束建议单独剥离文件 `./types` 中进行定义
- .vue 文件中 `props` 类型单独定义，抽至外部文件会导致异常报错
- .vue 文件中 处理 `props` 有默认值使用 `withDefaults` 否则直接使用 `defineProps`
- .vue 文件中 `emits` 定义传递的方法 `e_` 为前缀，驼峰规则
- UI 框架 API 方法，以 `handle` 前缀开头，驼峰规则
  :::

<DocImage src="img/C_Table-detail.png" title="components, C_Table-detail"/>

<DocImage src="img/computed.png" title="components, C_Table-computed"/>

<!-- TODO: constant  -->

constant 目录下：
::: tip :pushpin: index.ts 示栗

- 服务于全局的常量，维护在这里
- 常量全部大写，以下划线隔开
- 全局常量导出使用 `export` 按需导出方式

:::

<DocImage src="img/const.png" title="const"/>

<!-- TODO: hooks  -->

hooks 目录下：
::: tip :pushpin: useCopy / index.ts 示栗
注意函数注释规范，选中函数名字，快捷键 `Ctrl + Win + T`
:::

<DocImage src="img/useCopy.png" title="useCopy"/>

<!-- TODO: router  -->

router 目录下：
::: tip :pushpin: demo / index.ts 示栗

- router 跟 views 命名规则一致
- 都是以文件夹形式，命名中划线隔开
- 路由信息 `path`，`name`，`component` 中值名称需一致

:::

<DocImage src="img/router.png" title="router-demo"/>

<!-- TODO: store  -->

store 目录下：
::: tip :pushpin: app / index.ts 示栗

- 定义 store 以 `s_` 前缀开头，驼峰命名规则
- 唯一 id 如 'app'， 单词较长以中划线分割

:::

<DocImage src="img/store.png" title="store，app"/>

<!-- TODO: styles  -->

styles 目录下：

::: tip :pushpin: index.scss 示栗

- Scss 使用，参考 [Sass](https://www.sass.hk/) 官方文档
- 其他参考上面介绍的关于 CSS,SCSS 命名规则即可
  :::

<DocImage src="img/styles.png" title="styles"/>

<!-- TODO: utils  -->

utils 目录下：
::: tip :pushpin: index.ts | d\*tools.ts 示栗

- 处理函数文件命名以 `d_` 前缀开头，驼峰规则
- 验证函数文件命名以 `v_` 前缀开头，驼峰规则
- 文件内部函数跟随文件命名规则，以 `d_` 或 `v_` 前缀
- 文件内部函数必须生成函数注释，清晰描述
- 无需导出服务于内部的私有函数，以 `_` 前缀，驼峰规则
- 导出方式使用 `export` 按需导出

:::

<DocImage src="img/utils.png" title="utils"/>

<DocImage src="img/d_tools.png" title="d_tools"/>

<!-- TODO: views  -->

views 目录下：
::: tip :pushpin: table / index.vue 示栗

- 文件夹命名使用小写中划线，内部文件命名同理
- .vue 文件中编写组件实例
- .scss 文件用来剥离对应 .vue 文件的样式处理
- .types 文件用来剥离对应 .vue 文件的类型约束
- data.ts 处理静态数据，无需动态变动的数据，以全大写常量定义传递
- data.tsx 处理需要交互和操作虚拟 DOM 的数据源
- 传递组件的数据不需修改，建议使用常量传递
- 监听子组件传递的方法建议同名，方便区分，`e_` 前缀，驼峰规则
- `import` 引入顺序按照第三方 > 内部 > 常量名 > 变量名的顺序
- 尽量使用 `ref` 代替 `reacitve` 处理响应式数据，性能更优
- 异步方法使用 `async await`，不建议在 setup 头部使用 async

:bell: **已做集成配置，在 .vue 中，无需引入 Vue 的 API、全局和 UI 组件、VueRouter、Pinia 可直接使用**

:::

<DocImage src="img/views-table.png" title="views-table"/>

其他规则在使用中，结合实践集思广益，陆续定义完善......

