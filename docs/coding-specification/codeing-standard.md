---
layout: CodeingStandard
title: 编码规范
outline: 'deep'
---

<script setup>

</script>

# 渐进式 "编码规范"

> 编码规范在程序开发中是非常重要的，比如规范中的命名一块，一个不好的命名，可能会引起别人错误理解，对开发效率，项目的质量影响很大，从维护项目上，遵循一套严格的命名规范，无论是对自己还是接手的他人，都会大大降低代码的维护成本，为了大家聚焦参考，从命名开始，将以 Demo 项目逐层下钻的方式展开介绍

## 前端开发标准化的意义 ？

● 坚持一致的风格指南  
● 有效注释，保持干燥，提升抽象复用，增强开发能力  
● 确保代码可读性，易用性，维护性  
● 不重复发明轮子  
● 避免硬编码，避免疲惫时编码，保持简单  
● 有效的版本控制,有利于项目管理，代码质量把控  
● 对修改关闭，拓展开放，提高开发的生产力  
● 赋能交叉协同的沟通效率，相互合作，减少差错和误解  
● 奖励编码，OneTeam，一起玩的 Happy

## 通用约定俗成

:pill: [[github 社区命名规范参考](https://cn.vuejs.org/)]

1. 不要拼写错误单词
2. 不要中英文混用
3. 不要 1-9 a-z 命名
4. 不要混用命名 （不同文件相同组件内命名不一致）
5. 单复数不分
6. js 使用驼峰命名法：类名首字母必须大写 ，js 用单引号，不带结尾
7. css 命名全部小写 html 对大小写不敏感 见名知义使用 - 隔开
8. 针对特型命名，自定义命名，需见名知意，完全按照命名规范
9. 合理分类解耦，HTML,CSS,JS 带代码结构上尽量做到互相隔离

## 项目约定俗成

### 目录定义

![vscode, Project Dirs](/assets/img/project-dir.png)

### 命名定义

> :bell: 此定义面向的技术选型是前端框架 [Vue](https://cn.vuejs.org/) 生态，如全家桶，Pinia，TypeScript 以及 UI 框架，下文以 Vue3.2，UI 框架 [ElementPlus](https://element-plus.gitee.io/zh-CN/) 为栗，余者大同小异

<!-- TODO: api  -->

<ElCard style="text-align:center">api 目录下 sys.ts 示栗</ElCard>

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

<ElCard style="text-align:center">components 目录下 C_Table.vue 示栗</ElCard>

::: tip :pushpin: 头部注释
\- 根据配置的插件自动生成  
\- 手动快捷键 <Code text="ctrl + window + i "/>  
\- 自动记录最新更改时间，最后编辑成员名称  
\- 更多使用和配置参考 [koroFileHeader](https://github.com/OBKoro1/koro1FileHeader/wiki/%E5%AE%89%E8%A3%85%E5%92%8C%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B)
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
\- 通过 TODO Highlight 插件进行关键信息高亮注释，参考 [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)  
\- 键入<span style="color:gold">**TODO:**</span> 或 <span style="color:#f06292">**FIXME:**</span> 进行关键的注释提示和注释警告  
:mag_right: 全局组件封装过程中，服务于全局组局的局部组件，参考 RenderSlot 组件命名方式<Code text="AaBb"/>
:::

![components, C_Table](/assets/img/C_Table.png)

::: tip :pushpin: script setup 示栗
\- 全局组件名以 <Code text="C_"/> 为前缀，组件首字母大写，比如 <Code text="C_Table"/>  
\- 全局组件的类型约束建议单独剥离文件 <Code text="./types"/> 中进行定义  
\- .vue 文件中 <Code text="props"/> 类型单独定义，抽至外部文件会导致异常报错  
\- .vue 文件中 处理 <Code text="props"/> 有默认值使用 <Code text="withDefaults"/> 否则直接使用 <Code text="defineProps"/>  
\- .vue 文件中 <Code text="emits"/> 定义传递的方法 <Code text="e_"/> 为前缀，UI 框架 API 方法，以 <Code text="handle"/> 前缀开头，驼峰命名  
\- .vue 文件中 <Code text="computed"/> 计算属性建议 <Code text="c_"/> 为前缀，驼峰规则
:::

![components, C_Table-detail](/assets/img/C_Table-detail.png)
![components, C_Table-computed](/assets/img/computed.png)

<!-- TODO: constant  -->

<ElCard style="text-align:center">constant 目录下</ElCard>

::: tip :pushpin: index.ts 示栗
\- 服务于全局的常量，维护在此
:::

![const, const](/assets/img/const.png)

<!-- TODO: hooks  -->

<ElCard style="text-align:center">hooks 目录下</ElCard>

::: tip :pushpin: useCopy / index.ts 示栗
\- 注意函数注释规范  
\- 处理副作用的交互辅助函数，建议放在 <Code text="hooks"/> 文件中，单独统一维护
:::

![const, const](/assets/img/useCopy.png)

<!-- TODO: router  -->

<ElCard style="text-align:center">router 目录下</ElCard>

::: tip :pushpin: demo / index.ts 示栗
\- 后端动态路由配置也以此命名为准  
\- 路由元信息中 <Code text="icon"/> 以 <Code text="ElIcon"/> 为前缀，参考 [ElementPlus](http://element-plus.org/zh-CN/component/icon) 图标库，后续拓展配置其他图标库  
\- 路由属性 <Code text="path，name，"/> 以及 <Code text="component"/> 中的 views 目录下组件命名，格式一致以 <span style="color:green">**aa[-aa]**</span> 形式
:::

![router, demo](/assets/img/router.png)

<!-- TODO: store  -->

<ElCard style="text-align:center">store 目录下</ElCard>

::: tip :pushpin: app / index.ts 示栗
\- 此处使用 <FontColor text="Pinia"/> 非 Vuex ，参考 [Pinia](https://pinia.vuejs.org/) 官方文档  
\- 此处 <Code text="localStorage"/> 缓存使用了 hooks 函数 <Code text="useStor"/>  
\- 定义 <Code text="store"/> 容器方法命名以 <Code text="s_"/> 为前缀，驼峰规则  
:::

![store, app](/assets/img/store.png)

<!-- TODO: styles  -->

<ElCard style="text-align:center">styles 目录下</ElCard>

::: tip :pushpin: index.scss 示栗
\- Scss 使用，参考 [Sass](https://www.sass.hk/) 官方文档  
:::

![styles](/assets/img/styles.png)

<!-- TODO: utils  -->

<ElCard style="text-align:center">utils 目录下</ElCard>

::: tip :pushpin: index.ts | d*tools.ts 示栗
\- 工具函数分类文件以 <Code text="d*"/> 进行驼峰命名  
\- 文件内部工具函数以 <Code text="d_"/> 前缀进行驼峰命名, 遵守函数注释规范  
\- 内部函数无需导出，以 <Code text="_"/> 前缀进行驼峰命名  
\_ 全局验证工具函数, 文件名及其中函数 以 <Code text="v_"/> 前缀进行驼峰命名
:::

![utils](/assets/img/utils.png)
![utils, d_tools](/assets/img/d_tools.png)

<!-- TODO: views  -->

<ElCard style="text-align:center">views 目录下</ElCard>

::: tip :pushpin: table / index.vue 示栗
\- .vue 文件中，<Code text="<script setup>"/> 标签内无需引入 <FontColor text="Vue，Pinia，VueRouter"/> API，可直接使用  
\- .vue 文件中，无需引入和注册全局组件，可直接使用  
\- .vue 文件中，<Code text="import"/> 先引外部，再引内部常量，最后内部变量  
\- .vue 文件中，<FontColor text="template + script"/>，将 <FontColor text="style"/> 剥离成单独 <Code text="[name].scss"/> 文件  
\- .vue 文件中，<FontColor text="Typescript"/> 类型约束单独剥离至 <Code text="./types"/>  
\- .vue 文件中，将数据驱动的渲染数据，单独剥离到 <Code text="./data.ts | ./data.tsx"/> 文件

:::

![views, table](/assets/img/views-table.png)

<ElCard style="text-align:center">函数命名定义部分扩展</ElCard>

> :mega:  
> 常用逻辑方法 - 驼峰命名 <Code text="disposeString"/>  
> UI 组件方法 - handle 驼峰命名 <Code text="hanleOnChange"/>  
> 工具函数方法 - d*驼峰命名 <Code text="d_indexFileExportAllModule"/>  
> emiets 方法 - e*驼峰命名 <Code text="e_setUserInfo"/>  
> 私有方法 - _驼峰命名 <Code text="\_toFileSwitch_"/>  
> 异步方法 - async await 驼峰命名 async await <Code text="getDataFn"/>  
> ......

```vue
<script setup>
const disposeString = () => {...}
const handleOnChange = () => {...}
const d_indexFileExportAllModule = () => {...}  // import
const e_setUserInfo = () => {...} // components emits
const _toFileSwitch = () => {...} // private method
const getDataFn = async() => {await...}
...
</script>
```
