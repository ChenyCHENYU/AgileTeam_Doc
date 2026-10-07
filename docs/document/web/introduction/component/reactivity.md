# 响应式 API

---
title: "响应式 API"
outline: "deep"
description: "Vue3 响应式：ref、reactive、toRef 与 toRefs"
---

## 响应式数据的变化 ~new

响应式数据是 MVVM 数据驱动编程的特色，相信大部分人当初入坑 MVVM 框架，都是因为响应式数据编程比传统的操作 DOM 要来得方便，而选择 Vue ，则是方便中的方便。

### 设计上的变化

作为最重要的一个亮点， Vue 3 的响应式数据在设计上和 Vue 2 有着很大的不同。

#### 回顾 Vue 2

Vue 2 是使用了 `Object.defineProperty` 的 `getter/setter` 来实现数据的响应性，这个方法的具体用法可以参考 MDN 的文档： [Object.defineProperty - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 。

这里用这个方法来实现一个简单的双向绑定 demo ，亲自试一下可以有更多的理解：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DefineProperty Demo</title>
  </head>
  <body>
    <!-- 输入框和按钮 -->
    <div>
      <input type="text" id="input" />
      <button onclick="vm.text = 'Hello World'">设置为 Hello World</button>
    </div>
    <!-- 输入框和按钮 -->

    <!-- 文本展示 -->
    <div id="output"></div>
    <!-- 文本展示 -->

    <script>
      // 定义一个响应式数据
      const vm = {}
      Object.defineProperty(vm, 'text', {
        set(value) {
          document.querySelector('#input').value = value
          document.querySelector('#output').innerText = value
        },
      })

      // 处理输入行为
      document.querySelector('#input').oninput = function (e) {
        vm.text = e.target.value
      }
    </script>
  </body>
</html>
```

这个小 demo 实现了这两个功能：

1. 输入框的输入行为只修改 `vm.text` 的数据，但会同时更新 output 标签的文本内容
2. 点击按钮修改 `vm.text` 的数据，也会触发输入框和 output 文本的更新

当然 Vue 做了非常多的工作，而非只是简单的调用了 `Object.defineProperty` ，可以在 [深入 Vue 2 的响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html) 了解更多 Vue 2 的响应式原理。

#### 了解 Vue 3

Vue 3 是使用了 `Proxy` 的 `getter/setter` 来实现数据的响应性，这个方法的具体用法可以参考 MDN 的文档： [Proxy - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 。

同样的，也来实现一个简单的双向绑定 demo ，这次用 `Proxy` 来实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proxy Demo</title>
  </head>
  <body>
    <!-- 输入框和按钮 -->
    <div>
      <input type="text" id="input" />
      <button onclick="vm.text = 'Hello World'">设置为 Hello World</button>
    </div>
    <!-- 输入框和按钮 -->

    <!-- 文本展示 -->
    <div id="output"></div>
    <!-- 文本展示 -->

    <script>
      // 定义一个响应式数据
      const vm = new Proxy(
        {},
        {
          set(obj, key, value) {
            document.querySelector('#input').value = value
            document.querySelector('#output').innerText = value
          },
        }
      )

      // 处理输入行为
      document.querySelector('#input').oninput = function (e) {
        vm.text = e.target.value
      }
    </script>
  </body>
</html>
```

实现的功能和 `Object.defineProperty` 的 demo 是完全一样的，而且也都是基于 `setter` 行为来完成的实现，那么为什么 Vue 3 要舍弃 `Object.defineProperty` ，换成 `Proxy` 呢？

主要原因在于 `Object.defineProperty` 有以下的不足：

:::danger

1. 无法监听数组下标的变化，通过 `arr[i] = newValue` 这样的操作无法实时响应
2. 无法监听数组长度的变化，例如通过 `arr.length = 10` 去修改数组长度，无法响应
3. 只能监听对象的属性，对于整个对象需要遍历，特别是多级对象更是要通过嵌套来深度监听
4. 使用 `Object.assign()` 等方法给对象添加新属性时，也不会触发更新
5. 更多细节上的问题 …

:::

这也是为什么 Vue 2 要提供一个 [Vue.set API](https://v2.cn.vuejs.org/v2/api/#Vue-set) 的原因，可以在 [Vue 2 中检测变化的注意事项](https://v2.cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9) 了解更多说明。

而这些问题在 `Proxy` 都可以得到解决。

可以在 [深入 Vue 3 的响应式原理](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html) 了解更多这部分的内容。

### 用法上的变化

本指南只使用 Composition API 来编写组件，这是使用 Vue 3 的最大优势。

:::tip
虽然官方文档做了一定的举例，但实际用起来还是会有一定的坑，比如有些数据用着用着就失去了响应……

这些情况不是 bug ，*(:з)∠)*而是用的姿势不对……

相对来说官方文档并不会那么细致的去提及各种场景的用法，包括在 TypeScript 中的类型定义，所以这里主要通过踩坑心得的思路来复盘一下这些响应式数据的使用。
:::

相对于 Vue 2 在 `data` 里定义后即可通过 `this.xxx` 来调用响应式数据，Vue 3 的生命周期里取消了 Vue 实例的 `this`，要用到的比如 `ref` 、`reactive` 等响应式 API ，都必须通过导入才能使用，然后在 `setup` 里定义。

```ts
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref<string>('Hello World!')

    return {
      msg,
    }
  },
})
```

由于新的 API 非常多，但有些使用场景却不多，所以当前暂时只对常用的几个 API 做使用和踩坑说明，更多的 API 可以在官网查阅。

先放上官方文档：[响应性 API | Vue.js](https://cn.vuejs.org/api/reactivity-core.html) 。

## 响应式 API 之 ref ~new

`ref` 是最常用的一个响应式 API，它可以用来定义所有类型的数据，包括 Node 节点。

没错，在 Vue 2 常用的 `this.$refs.xxx` 来取代 `document.querySelector('.xxx')` 获取 Node 节点的方式，也是用这个 API 来取代。

### 类型声明

在开始使用 API 之前，要先了解一下在 TypeScript 中，`ref` 需要如何进行类型声明。

平时在定义变量的时候，都是这样给他们进行类型声明的：

```ts
// 单类型
const msg: string = 'Hello World!'

// 多类型
const phoneNumber: number | string = 13800138000
```

但是在使用 `ref` 时，不能这样子声明，会报错，正确的声明方式应该是使用 `<>` 来包裹类型定义，紧跟在 `ref` API 之后：

```ts
// 单类型
const msg = ref<string>('Hello World!')

// 多类型
const phoneNumber = ref<number | string>(13800138000)
```

### 变量的定义

了解了如何进行类型声明之后，对变量的定义就没什么问题了，它可以用来定义所有类型的数据，包括 Node 节点，但不同类型的值之间还是有少许差异和注意事项，具体可以参考如下。

#### 基本类型

对字符串、布尔值等基本类型的定义方式，比较简单：

```ts
// 字符串
const msg = ref<string>('Hello World!')

// 数值
const count = ref<number>(1)

// 布尔值
const isVip = ref<boolean>(false)
```

#### 引用类型

对于对象、数组等引用类型也适用，比如要定义一个对象：

```ts
// 声明对象的格式
interface Member {
  id: number
  name: string
}

// 定义一个成员对象
const userInfo = ref<Member>({
  id: 1,
  name: 'Tom',
})
```

定义一个普通数组：

```ts
// 数字数组
const uids = ref<number[]>([1, 2, 3])

// 字符串数组
const names = ref<string[]>(['Tom', 'Petter', 'Andy'])
```

定义一个对象数组：

```ts
// 声明对象的格式
interface Member {
  id: number
  name: string
}

// 定义一个成员组
const memberList = ref<Member[]>([
  {
    id: 1,
    name: 'Tom',
  },
  {
    id: 2,
    name: 'Petter',
  },
])
```

### DOM 元素与子组件

除了可以定义数据，`ref` 也有熟悉的用途，就是用来挂载节点，也可以挂在子组件上。

对于 Vue 2 常用的 `this.$refs.xxx` 来获取 DOM 元素信息，该 API 的使用方式也是同样：

模板部分依然是熟悉的用法，把 ref 挂到要引用的 DOM 上。

```vue
<template>
  <!-- 挂载DOM元素 -->
  <p ref="msg">留意该节点，有一个ref属性</p>
  <!-- 挂载DOM元素 -->

  <!-- 挂载子组件 -->
  <Child ref="child" />
  <!-- 挂载子组件 -->
</template>
```

`script` 部分有三个最基本的注意事项：

:::tip

1. 定义挂载节点后，也是必须通过 `xxx.value` 才能正确操作到挂载的 DOM 元素或组件（详见下方的[变量的读取与赋值](#变量的读取与赋值)）；

2. 请保证视图渲染完毕后再执行 DOM 或组件的相关操作（需要放到生命周期的 `onMounted` 或者 `nextTick` 函数里，这一点在 Vue 2 也是一样）；

3. 该变量必须 `return` 出去才可以给到 `template` 使用（这一点是 Vue 3 生命周期的硬性要求，子组件的数据和方法如果要给父组件操作，也要 `return` 出来才可以）。
   :::

配合上面的 `template` ，来看看 `script` 部分的具体例子：

```ts
import { defineComponent, onMounted, ref } from 'vue'
import Child from '@cp/Child.vue'

export default defineComponent({
  components: {
    Child,
  },
  setup() {
    // 定义挂载节点，声明的类型详见下方附表
    const msg = ref<HTMLElement | null>(null)
    const child = ref<typeof Child | null>(null)

    // 请保证视图渲染完毕后再执行节点操作 e.g. onMounted / nextTick
    onMounted(() => {
      // 比如获取DOM的文本
      console.log(msg.value.innerText)

      // 或者操作子组件里的数据
      child.value.isShowDialog = true
    })

    // 必须return出去才可以给到template使用
    return {
      msg,
      child,
    }
  },
})
```

关于 DOM 和子组件的 TS 类型声明，可参考以下规则：

| 节点类型 | 声明类型                     | 参考文档                                                                                                                          |
| :------- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| DOM 元素 | 使用 HTML 元素接口           | [HTML 元素接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model#html_%E5%85%83%E7%B4%A0%E6%8E%A5%E5%8F%A3) |
| 子组件   | 使用 typeof 获取子组件的类型 | [typeof 操作符](https://zhuanlan.zhihu.com/p/311150643)                                                                           |

另外，关于这一小节，有一个可能会引起 TS 编译报错的情况是，新版本的脚手架创建出来的项目会默认启用 `--strictNullChecks` 选项，会导致案例中的代码无法正常运行（报错 `TS2531: Object is possibly 'null'.` ）。

原因是：默认情况下 `null` 和 `undefined` 是所有类型的子类型，但开启了 `strictNullChecks` 选项之后，会使 `null` 和 `undefined` 只能赋值给 `void` 和它们各自，这虽然是个更为严谨的选项，但因此也会带来一些影响赶工期的额外操作。

**有以下几种解决方案可以参考：**

1. 在涉及到相关操作的时候，对节点变量增加一个判断：

```ts
if (child.value) {
  // 读取子组件的数据
  console.log(child.value.num)

  // 执行子组件的方法
  child.value.sayHi('use if in onMounted')
}
```

2. 通过 TS 的可选符 ? 来将目标设置为可选，避免出现错误（这个方式不能直接修改子组件数据的值）

```ts
// 读取子组件的数据
console.log(child.value?.num)

// 执行子组件的方法
child.value?.sayHi('use ? in onMounted')
```

3. 在项目根目录下的 `tsconfig.json` 文件里，显式的关闭 `strictNullChecks` 选项，关闭后，由自己来决定是否需要对 `null` 进行判断：

```json
{
  "compilerOptions": {
    // ...
    "strictNullChecks": false
  }
  // ...
}
```

4. 使用 any 类型来代替，但是写 TS 还是尽量不要使用 any ，满屏的 AnyScript 不如写回 JS 。

### 变量的读取与赋值

被 `ref` 包裹的变量会全部变成对象，不管定义的是什么类型的值，都会转化为一个 ref 对象，其中 ref 对象具有指向内部值的单个 property `.value`。

:::tip
读取任何 ref 对象的值都必须通过 `xxx.value` 才可以正确获取到。
:::

对于普通变量的值，读取的时候直接读变量名即可：

```ts
// 读取一个字符串
const msg: string = 'Hello World!'
console.log('msg的值', msg)

// 读取一个数组
const uids: number[] = [1, 2, 3]
console.log('第二个uid', uids[1])
```

**对 ref 对象的值的读取，切记！必须通过 value ！**

```ts
// 读取一个字符串
const msg = ref<string>('Hello World!')
console.log('msg的值', msg.value)

// 读取一个数组
const uids = ref<number[]>([1, 2, 3])
console.log('第二个uid', uids.value[1])
```

普通变量都必须使用 `let` 才可以修改值，由于 ref 对象是个引用类型，所以可以在 `const` 定义的时候，直接通过 `.value` 来修改。

```ts
// 定义一个字符串变量
const msg = ref<string>('Hi!')

// 1s后修改它的值
setTimeout(() => {
  msg.value = 'Hello!'
}, 1000)
```

因此在对接接口数据的时候，可以自由的使用 `forEach`、`map`、`filter` 等遍历函数来操作的 ref 数组，或者直接重置它。

```ts
const data = ref<string[]>([])

// 提取接口的数据
data.value = api.data.map((item: any) => item.text)

// 重置数组
data.value = []
```

为什么突然要说这个呢？因为涉及到下一部分的知识，关于 `reactive` 的。

## 响应式 API 之 reactive ~new

`reactive` 是继 `ref` 之后最常用的一个响应式 API 了，相对于 `ref`，它的局限性在于只适合对象、数组。

:::tip
使用 `reactive` 的好处就是写法跟平时的对象、数组几乎一模一样，但它也带来了一些特殊注意点，请留意赋值部分的特殊说明。
:::

### 类型声明与定义

`reactive` 的声明方式，以及定义方式，没有 `ref` 的变化那么大，就是和普通变量一样。

reactive 对象：

```ts
// 声明对象的格式
interface Member {
  id: number
  name: string
}

// 定义一个成员对象
const userInfo: Member = reactive({
  id: 1,
  name: 'Tom',
})
```

reactive 数组：

```ts
// 普通数组
const uids: number[] = [1, 2, 3]

// 对象数组
interface Member {
  id: number
  name: string
}

// 定义一个成员对象数组
const userList: Member[] = reactive([
  {
    id: 1,
    name: 'Tom',
  },
  {
    id: 2,
    name: 'Petter',
  },
  {
    id: 3,
    name: 'Andy',
  },
])
```

### 变量的读取与赋值

reactive 对象在读取字段的值，或者修改值的时候，与普通对象是一样的。

reactive 对象：

```ts
// 声明对象的格式
interface Member {
  id: number
  name: string
}

// 定义一个成员对象
const userInfo: Member = reactive({
  id: 1,
  name: 'Tom',
})

// 读取用户名
console.log(userInfo.name)

// 修改用户名
userInfo.name = 'Petter'
```

但是对于 reactive 数组，和普通数组会有一些区别。

先看看普通数组，重置，或者改变值，都是可以直接轻松的进行操作：

```ts
// 定义一个普通数组
let uids: number[] = [1, 2, 3]

// 从另外一个对象数组里提取数据过来
uids = api.data.map((item) => item.id)

// 合并另外一个数组
let newUids: number[] = [4, 5, 6]
uids = [...uids, ...newUids]

// 重置数组
uids = []
```

在 Vue 2 的时候，在操作数组时，完全可以和普通数组那样随意的处理数据的变化，依然能够保持响应性。

但在 Vue 3 ，如果使用 `reactive` 定义数组，则不能这么搞了，必须只使用那些不会改变引用地址的操作。

:::tip
按照原来的思维去使用 `reactive` 数组，会造成数据变了，但模板不会更新的 bug ，如果遇到类似的情况，可以从这里去入手排查问题所在。
:::

举个例子，比如要从接口读取翻页数据的时候，通常要先重置数组，再异步添加数据：

如果使用常规的重置，会导致这个变量失去响应性：

```ts
/**
 * 不推荐使用这种方式
 * 异步添加数据后，模板不会响应更新
 */
let uids: number[] = reactive([1, 2, 3])

// 丢失响应性的步骤
uids = []

// 异步获取数据后，模板依然是空数组
setTimeout(() => {
  uids.push(1)
}, 1000)
```

要让模板那边依然能够保持响应性，则必须在关键操作时，不破坏响应性 API 的存在。

```ts
/**
 * 不推荐使用这种方式
 * 异步添加数据后，模板不会响应更新
 */
let uids: number[] = reactive([1, 2, 3])

// 不会破坏响应性
uids.length = 0

// 异步获取数据后，模板可以正确的展示
setTimeout(() => {
  uids.push(1)
}, 1000)
```

### 特别注意

不要对通过 `reactive` 定义的对象进行解构，解构后得到的变量会失去响应性。

比如这些情况，在 2s 后都得不到新的 name 信息：

```ts
import { defineComponent, reactive } from 'vue'

interface Member {
  id: number
  name: string
}

export default defineComponent({
  setup() {
    // 定义一个带有响应性的成员对象
    const userInfo: Member = reactive({
      id: 1,
      name: 'Petter',
    })

    // 2s后更新userInfo
    setTimeout(() => {
      userInfo.name = 'Tom'
    }, 2000)

    // 这个变量在2s后不会同步更新
    const newUserInfo: Member = { ...userInfo }

    // 这个变量在2s后不会再同步更新
    const { name } = userInfo

    // 这样return出去给模板用，在2s后也不会同步更新
    return {
      ...userInfo,
    }
  },
})
```

## 响应式 API 之 toRef 与 toRefs ~new

看到这里之前，应该对 `ref` 和 `reactive` 都有所了解了，为了方便开发者，Vue 3 还推出了 2 个与之相关的 API ，用于 `reactive` 向 `ref` 转换。

### 各自的作用

两个 API 的拼写非常接近，顾名思义，一个是只转换一个字段，一个是转换所有字段。

| API    | 作用                                                                |
| :----- | :------------------------------------------------------------------ |
| toRef  | 创建一个新的 ref 变量，转换 reactive 对象的某个字段为 ref 变量      |
| toRefs | 创建一个新的对象，它的每个字段都是 reactive 对象各个字段的 ref 变量 |

先定义好一个 `reactive` 变量：

```ts
interface Member {
  id: number
  name: string
}

const userInfo: Member = reactive({
  id: 1,
  name: 'Petter',
})
```

然后来看看这 2 个 API 应该怎么使用。

### 使用 toRef

`toRef` 接收 2 个参数，第一个是 `reactive` 对象, 第二个是要转换的 `key` 。

在这里只想转换 `userInfo` 里的 `name` ，只需要这样操作：

```ts
const name: string = toRef(userInfo, 'name')
```

这样就成功创建了一个 `ref` 变量。

之后读取和赋值就使用 `name.value`，它会同时更新 `name` 和 `userInfo.name`。

:::tip
在 `toRef` 的过程中，如果使用了原对象上面不存在的 `key` ，那么定义出来的变量的 `value` 将会是 `undefined` 。

如果对这个不存在的 `key` 的 `ref` 变量，进行了 `value` 赋值，那么原来的对象也会同步增加这个 `key`，其值也会同步更新。
:::

### 使用 toRefs

`toRefs` 接收 1 个参数，是一个 `reactive` 对象。

```ts
const userInfoRefs: Member = toRefs(userInfo)
```

这个新的 `userInfoRefs` ，本身是个普通对象，但是它的每个字段，都是与原来关联的 `ref` 变量。

### 为什么要进行转换

关于为什么要出这么 2 个 API ，官方文档没有特别说明，不过经过自己的一些实际使用，以及上一节 `reactive` 的 [特别注意](#特别注意)，可能知道一些使用理由。

> `ref` 和 `reactive` 这两者的好处就不重复了，重点要注意各自都有各自不方便的地方：

:::tip

1. `ref` 虽然在 `template` 里使用起来方便，但比较烦的一点是在 `script` 里进行读取/赋值的时候，要一直记得加上 `.value` ，否则 bug 就来了

2. `reactive` 虽然在使用的时候，因为知道它本身是一个 `Object` 类型，所以不会忘记 `foo.bar` 这样的格式去操作，但是在 `template` 渲染的时候，又因此不得不每次都使用 `foo.bar` 的格式去渲染

:::

那有没有办法，既可以在写 `script` 的时候不容易出错，在写 `template` 的时候又比较简单呢？

于是， `toRef` 和 `toRefs` 因此诞生。

### 什么场景下比较适合使用它们

从便利性和可维护性来说，最好只在功能单一、代码量少的组件里使用，比如一个表单组件，通常表单的数据都放在一个对象里。

当然也可以更猛一点就是把所有的数据都定义到一个 `data` 里，然后再去 `data` 里面取…  
但是没有必要为了转换而转换。

### 在业务中的具体运用

这一块一直用 `userInfo` 来当案例，那就继续以一个用户信息表的小 demo 来做这个的演示吧。

**在 `script` 部分：**

1. 先用 `reactive` 定义一个源数据，所有的数据更新，都是修改这个对象对应的值，按照对象的写法去维护的数据

2. 再通过 `toRefs` 定义一个给 `template` 用的对象，它本身不具备响应性，但是它的字段全部是 `ref` 变量

3. 在 `return` 的时候，对 `toRefs` 对象进行解构，这样导出去就是各个字段对应的 `ref` 变量，而不是一整个对象

```ts
import { defineComponent, reactive, toRefs } from 'vue'

interface Member {
  id: number
  name: string
  age: number
  gender: string
}

export default defineComponent({
  setup() {
    // 定义一个reactive对象
    const userInfo = reactive({
      id: 1,
      name: 'Petter',
      age: 18,
      gender: 'male',
    })

    // 定义一个新的对象，它本身不具备响应性，但是它的字段全部是ref变量
    const userInfoRefs = toRefs(userInfo)

    // 2s后更新userInfo
    setTimeout(() => {
      userInfo.id = 2
      userInfo.name = 'Tom'
      userInfo.age = 20
    }, 2000)

    // 在这里结构toRefs对象才能继续保持响应式
    return {
      ...userInfoRefs,
    }
  },
})
```

**在 `template` 部分：**

由于 `return` 出来的都是 `ref` 变量，所以在模板里直接使用 `userInfo` 各个字段的 `key` 即可。

```vue
<template>
  <ul class="user-info">
    <li class="item">
      <span class="key">ID:</span>
      <span class="value">{{ id }}</span>
    </li>

    <li class="item">
      <span class="key">name:</span>
      <span class="value">{{ name }}</span>
    </li>

    <li class="item">
      <span class="key">age:</span>
      <span class="value">{{ age }}</span>
    </li>

    <li class="item">
      <span class="key">gender:</span>
      <span class="value">{{ gender }}</span>
    </li>
  </ul>
</template>
```

### 需要注意的问题

请注意是否有相同命名的变量存在，比如上面在 `return` 给 `template` 使用时，解构 `userInfoRefs` 的时候已经包含了一个 `name` 字段，此时如果还有一个单独的变量也叫 `name`。

:::tip
那么他们谁会生效，取决于谁排在后面。

因为 `return` 出去的其实是一个对象，在对象里，如果存在相同的 `key` ，则后面那个会覆盖前面的。
:::

这种情况下，会以单独定义的 `name` 为渲染数据。

```ts
return {
  ...userInfoRefs,
  name,
}
```

这种情况下，则是以 `userInfoRefs` 里的 `name` 为渲染数据。

```ts
return {
  name,
  ...userInfoRefs,
}
```

所以当决定使用 `toRef` 和 `toRefs` 的时候，请注意这个特殊情况！
