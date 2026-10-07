# 指令

---
title: "指令"
outline: "deep"
description: "Vue3 指令详解"
---

## 指令

指令是 Vue 模板语法里的特殊标记，在使用上和 HTML 的 [data-\*](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*) 属性十分相似，统一以 `v-` 开头（ e.g. `v-html` ）。

它以简单的方式实现了常用的 JavaScript 表达式功能，当表达式的值改变的时候，响应式地作用到 DOM 上。

### 内置指令

Vue 提供了一些内置指令可以直接使用，例如：

```vue
<template>
  <!-- 渲染一段文本 -->
  <span v-text="msg"></span>
  <!-- 渲染一段文本 -->

  <!-- 渲染一段 HTML -->
  <div v-html="html"></div>
  <!-- 渲染一段 HTML -->

  <!-- 循环创建一个列表 -->
  <ul v-if="items.length">
    <li v-for="(item, index) in items" :key="index">
      <span>{{ item }}</span>
    </li>
  </ul>
  <!-- 循环创建一个列表 -->

  <!-- 一些事件（ @ 等价于 v-on ） -->
  <button @click="hello">Hello</button>
  <!-- 一些事件（ @ 等价于 v-on ） -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref<string>('Hello World!')
    const html = ref<string>('<p>Hello World!</p>')
    const items = ref<string[]>(['a', 'b', 'c', 'd'])

    function hello() {
      console.log(msg.value)
    }

    return {
      msg,
      html,
      items,
      hello,
    }
  },
})
</script>
```

内置指令在使用上都非常的简单，可以在 [指令 - API 参考](https://cn.vuejs.org/api/built-in-directives.html) 查询完整的指令列表和用法，在模板上使用时，请了解 [指令的模板语法](https://cn.vuejs.org/guide/essentials/template-syntax.html#directives) 。

:::tip
其中有 2 个指令有别名：

- `v-on` 的别名是 `@` ，使用 `@click` 等价于 `v-on:click`
- `v-bind` 的别名是 `:` ，使用 `:src` 等价于 `v-bind:src`
  :::

### 自定义指令 ~new

如果 Vue 的内置指令不能满足业务需求，还可以开发自定义指令。

#### 相关的 TS 类型

在开始编写代码之前，先了解一下自定义指令相关的 TypeScript 类型。

自定义指令有两种实现形式，一种是作为一个对象，写法比较接近于 Vue 组件，除了 [getSSRProps](https://vuejs.org/guide/scaling-up/ssr.html#custom-directives) 和 [deep 选项](#deep-选项) 外，其他的每个属性都是个 [钩子函数](#钩子函数) ，下会介绍钩子函数的内容。

```ts
// 对象式写法的 TS 类型
// ...
export declare interface ObjectDirective<T = any, V = any> {
  created?: DirectiveHook<T, null, V>
  beforeMount?: DirectiveHook<T, null, V>
  mounted?: DirectiveHook<T, null, V>
  beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>
  updated?: DirectiveHook<T, VNode<any, T>, V>
  beforeUnmount?: DirectiveHook<T, null, V>
  unmounted?: DirectiveHook<T, null, V>
  getSSRProps?: SSRDirectiveHook
  deep?: boolean
}
// ...
```

另外一种是函数式写法，只需要定义成一个函数，但这种写法只在 `mounted` 和 `updated` 这两个钩子生效，并且触发一样的行为。

```ts
// 函数式写法的 TS 类型
// ...
export declare type FunctionDirective<T = any, V = any> = DirectiveHook<
  T,
  any,
  V
>
// ...
```

这是每个钩子函数对应的类型，它有 4 个入参：

```ts
// 钩子函数的 TS 类型
// ...
export declare type DirectiveHook<
  T = any,
  Prev = VNode<any, T> | null,
  V = any
> = (
  el: T,
  binding: DirectiveBinding<V>,
  vnode: VNode<any, T>,
  prevVNode: Prev
) => void
// ...
```

钩子函数第二个参数的类型：

```ts
// 钩子函数第二个参数的 TS 类型
// ...
export declare interface DirectiveBinding<V = any> {
  instance: ComponentPublicInstance | null
  value: V
  oldValue: V | null
  arg?: string
  modifiers: DirectiveModifiers
  dir: ObjectDirective<any, V>
}
// ...
```

可以看到自定义指令最核心的就是 “钩子函数” 了，接下来来了解这部分的知识点。

#### 钩子函数

和 [组件的生命周期](./index.md#组件的生命周期-new) 类似，自定义指令里的逻辑代码也有一些特殊的调用时机，称之为 **钩子函数**。

|   钩子函数    | 调用时机                                          |
| :-----------: | :------------------------------------------------ |
|    created    | 在绑定元素的 attribute 或事件监听器被应用之前调用 |
|  beforeMount  | 当指令第一次绑定到元素并且在挂载父组件之前调用    |
|    mounted    | 在绑定元素的父组件被挂载后调用                    |
| beforeUpdate  | 在更新包含组件的 VNode 之前调用                   |
|    updated    | 在包含组件的 VNode 及其子组件的 VNode 更新后调用  |
| beforeUnmount | 在卸载绑定元素的父组件之前调用                    |
|   unmounted   | 当指令与元素解除绑定且父组件已卸载时，只调用一次  |

:::tip
因为自定义指令的默认写法是一个对象，所以在代码风格上是遵循 Options API 的生命周期命名，而非 Vue 3 的 Composition API 风格。
:::

钩子函数在用法上就是这样子：

```ts
const myDirective = {
  created(el, binding, vnode, prevVnode) {
    // ...
  },
  mounted(el, binding, vnode, prevVnode) {
    // ...
  },
  // 其他钩子...
}
```

在 [相关的 TS 类型](#相关的-ts-类型) 已了解，每个钩子函数都有 4 个入参：

|   参数    | 作用                                                                 |
| :-------: | :------------------------------------------------------------------- |
|    el     | 指令绑定的 DOM 元素，可以直接操作它                                  |
|  binding  | 一个对象数据，见下方的单独说明                                       |
|   vnode   | el 对应在 Vue 里的虚拟节点信息                                       |
| prevVNode | Update 时的上一个虚拟节点信息，仅在 `beforeUpdate` 和 `updated` 可用 |

其中用的最多是 `el` 和 `binding` 了。

- `el` 的值就是通过 `document.querySelector` 拿到的那个 DOM 元素。

- `binding` 是一个对象，里面包含了以下属性：

|   属性    | 作用                                                                     |
| :-------: | :----------------------------------------------------------------------- |
|   value   | 传递给指令的值，例如 `v-foo="bar"` 里的 `bar` ，支持任意有效的 JS 表达式 |
| oldValue  | 指令的上一个值，仅对 `beforeUpdate` 和 `updated` 可用                    |
|    arg    | 传给指令的参数，例如 `v-foo:bar` 里的 `bar`                              |
| modifiers | 传给指令的修饰符，例如 `v-foo.bar` 里的 `bar`                            |
| instance  | 使用指令的组件实例                                                       |
|    dir    | 指令定义的对象（就是上面的 `const myDirective = { /* ... */ }` 这对象）  |

在了解了指令的写法和参数作用之后，来看看如何注册一个自定义指令。

#### 局部注册

自定义指令可以在单个组件内定义并使用，通过和 [setup 函数](./index.md#全新的-setup-函数-new) 同级别的 `directives` 选项进行定义，可以参考下面的例子和注释：

```vue{15-25}
<template>
  <!-- 这个使用默认值 unset -->
  <div v-highlight>{{ msg }}</div>
  <!-- 这个使用默认值 unset -->

  <!-- 这个使用传进去的黄色 -->
  <div v-highlight="`yellow`">{{ msg }}</div>
  <!-- 这个使用传进去的黄色 -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  // 自定义指令在这里编写，和 setup 同级别
  directives: {
    // directives 下的每个字段名就是指令名称
    highlight: {
      // 钩子函数
      mounted(el, binding) {
        el.style.backgroundColor =
          typeof binding.value === 'string' ? binding.value : 'unset'
      },
    },
  },
  setup() {
    const msg = ref<string>('Hello World!')

    return {
      msg,
    }
  },
})
</script>
```

上面是对象式的写法，也可以写成函数式：

```ts{3-6}
export default defineComponent({
  directives: {
    highlight(el, binding) {
      el.style.backgroundColor =
        typeof binding.value === 'string' ? binding.value : 'unset'
    },
  },
})
```

:::tip
局部注册的自定义指令，默认在子组件内生效，**子组件内无需重新注册即可使用父组件的自定义指令**。
:::

#### 全局注册

自定义指令也可以注册成全局，这样就无需在每个组件里定义了，只要在入口文件 `main.ts` 里启用它，任意组件里都可以使用自定义指令。

请查看 [开发本地 Vue 专属插件](../plugin.md#开发本地-vue-专属插件) 板块的内容了解如何注册一个全局的自定义指令插件。

#### deep 选项

除了 [钩子函数](#钩子函数) ，在 [相关的 TS 类型](#相关的-ts-类型) 里还可以看到有一个 deep 选项，它是一个布尔值，作用是：

:::tip

如果自定义指令用于一个有嵌套属性的对象，并且需要在嵌套属性更新的时候触发 `beforeUpdate` 和 `updated` 钩子，那么需要将这个选项设置为 `true` 才能够生效。

:::

```vue
<template>
  <div v-foo="foo"></div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  directives: {
    foo: {
      beforeUpdate(el, binding) {
        console.log('beforeUpdate', binding)
      },
      updated(el, binding) {
        console.log('updated', binding)
      },
      mounted(el, binding) {
        console.log('mounted', binding)
      },
      // 需要设置为 true ，如果是 false 则不会触发
      deep: true,
    },
  },
  setup() {
    // 定义一个有嵌套属性的对象
    const foo = reactive({
      bar: {
        baz: 1,
      },
    })

    // 2s 后修改其中一个值，会触发 beforeUpdate 和 updated
    setTimeout(() => {
      foo.bar.baz = 2
      console.log(foo)
    }, 2000)

    return {
      foo,
    }
  },
})
</script>
```
