# 单组件的编写

---
title: "单组件的编写"
outline: "deep"
description: "Vue3 单组件编写基础：setup 函数、生命周期与基本写法"
---

## 全新的 setup 函数 ~new

在开始编写组件之前，需要了解两个全新的前置知识点：`setup` 与 `defineComponent`。

### setup 的含义

Vue 3 的 Composition API 系列里，推出了一个全新的 `setup` 函数，它是一个组件选项，在创建组件之前执行，一旦 props 被解析，并作为组合式 API 的入口点。

:::tip
通俗一点，使用 Vue 3 的生命周期的情况下，整个组件相关的业务代码，都可以丢到 `setup` 里编写。

因为在 `setup` 之后，其他的生命周期才会被启用（点击了解：[组件的生命周期](./index.md#组件的生命周期-new)）。
:::

基本语法：

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, context) {
    // 业务代码写这里...

    return {
      // 需要给 template 用的数据、函数放这里 return 出去...
    }
  },
})
```

这里写了一个 `defineComponent`，也是本次的新东西，可以了解 [defineComponent 的作用](./index.md#definecomponent-的作用) 。

:::warning
使用 `setup` 的情况下，请牢记一点：不能再用 `this` 来获取 Vue 实例，也就是无法通过 `this.xxx` 、 `this.fn()` 这样来获取实例上的数据，或者执行实例上的方法。

全新的 Vue 3 组件编写，请继续往下看，会一步一步进行说明。
:::

### setup 的参数使用

`setup` 函数包含了两个入参：

| 参数    | 类型   | 含义                   | 是否必传 |
| :------ | :----- | :--------------------- | :------- |
| props   | object | 由父组件传递下来的数据 | 否       |
| context | object | 组件的执行上下文       | 否       |

**第一个参数 `props` ：**

它是响应式的（只要不解构它，或者使用 [toRef / toRefs](./reactivity.md#响应式-api-之-toref-与-torefs-new) 进行响应式数据转换），当传入新的 prop 时，它将被更新。

**第二个参数 `context` ：**

`context` 只是一个普通的对象，它暴露三个组件的 property：

| 属性  | 类型         | 作用                             |
| :---- | :----------- | :------------------------------- |
| attrs | 非响应式对象 | props 未定义的属性都将变成 attrs |
| slots | 非响应式对象 | 插槽                             |
| emit  | 方法         | 触发事件                         |

因为 `context` 只是一个普通对象，所以可以直接使用 ES6 解构。

平时使用可以通过直接传入 `{ emit }` ，即可用 `emit('xxx')` 来代替使用 `context.emit('xxx')`，另外两个功能也是如此。

但是 `attrs` 和 `slots` 请保持 `attrs.xxx`、`slots.xxx` 来使用他们数据，不要解构这两个属性，因为他们虽然不是响应式对象，但会随组件本身的更新而更新。

两个参数的具体使用，可以了解 [组件之间的通信](../communication) 内容板块。

### defineComponent 的作用

这是 Vue 3 推出的一个全新 API ，`defineComponent` 可以用于 TypeScript 的类型推导，它可以简化掉很多编写过程中的类型定义。

比如，原本需要这样才可以使用 `setup` 函数：

```ts
import { Slots } from 'vue'

// 声明 props 和 return 的数据类型
interface Data {
  [key: string]: unknown
}

// 声明 context 的类型
interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

// 使用的时候入参要加上声明， return 也要加上声明
export default {
  setup(props: Data, context: SetupContext): Data {
    // ...

    return {
      // ...
    }
  },
}
```

是不是很繁琐？（肯定是啊！不用否定……)

使用了 `defineComponent` 之后，就可以省略这些类型定义：

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, context) {
    // ...

    return {
      // ...
    }
  },
})
```

而且不只适用于 `setup`，只要是 Vue 本身的 API ，`defineComponent` 都可以自动推导。

在编写组件的过程中，只需要维护自己定义的数据类型就可以了，专注于业务。

## 组件的生命周期 ~new

在了解了两个前置知识点之后，也还不着急写组件，还需要先了解组件的生命周期，才能够灵活的把控好每一处代码的执行结果达到的预期。

### 升级变化

从 Vue 2 升级到 Vue 3 ，在保留对 Vue 2 的生命周期支持的同时，Vue 3 也带来了一定的调整。

:::tip
Vue 2 的生命周期写法名称是 Options API ， Vue 3 新的生命周期写法名称是 Composition API 。

Vue 3 本身也支持 Options API 风格， Vue 2 也可以通过安装 [@vue/composition-api](https://www.npmjs.com/package/@vue/composition-api) 插件来使用 Composition API 。

但是从使用习惯上来说，后文也会用 Vue 2 的生命周期来代指 Options API 写法，用 Vue 3 的生命周期来代指 Composition API 写法。
:::

生命周期的变化，可以直观的从下表了解：

| Vue 2 生命周期 | Vue 3 生命周期  |                执行时间说明                |
| :------------: | :-------------: | :----------------------------------------: |
|  beforeCreate  |      setup      |               组件创建前执行               |
|    created     |      setup      |               组件创建后执行               |
|  beforeMount   |  onBeforeMount  |          组件挂载到节点上之前执行          |
|    mounted     |    onMounted    |             组件挂载完成后执行             |
|  beforeUpdate  | onBeforeUpdate  |              组件更新之前执行              |
|    updated     |    onUpdated    |            组件更新完成之后执行            |
| beforeDestroy  | onBeforeUnmount |              组件卸载之前执行              |
|   destroyed    |   onUnmounted   |             组件卸载完成后执行             |
| errorCaptured  | onErrorCaptured | 当捕获一个来自子孙组件的异常时激活钩子函数 |

其中，在 Vue 3 ，`setup` 的执行时机比 Vue 2 的 `beforeCreate` 和 `created` 还早，可以完全代替原来的这 2 个钩子函数。

另外，被包含在 `<keep-alive>` 中的组件，会多出两个生命周期钩子函数：

| Vue 2 生命周期 | Vue 3 生命周期 |         执行时间说明         |
| :------------: | :------------: | :--------------------------: |
|   activated    |  onActivated   |         被激活时执行         |
|  deactivated   | onDeactivated  | 切换组件后，原组件消失前执行 |

:::warning
虽然 Vue 3 依然支持 Vue 2 的生命周期，但是不建议混搭使用，前期可以继续使用 Vue 2 的生命周期作为过度阶段慢慢适应，但还是**建议尽快熟悉并完全使用 3.x 的生命周期来编写的组件**。
:::

### 使用 3.x 的生命周期

在 Vue 3 的 Composition API 写法里，**每个生命周期函数都要先导入才可以使用**，并且所有生命周期函数统一放在 `setup` 里运行。

若要达到在 Vue 2 的 `beforeCreate` 和 `created` 目的的话，直接把函数执行在 `setup` 里即可。

比如：

```ts
import { defineComponent, onBeforeMount, onMounted } from 'vue'

export default defineComponent({
  setup() {
    console.log(1)

    onBeforeMount(() => {
      console.log(2)
    })

    onMounted(() => {
      console.log(3)
    })

    console.log(4)
  },
})
```

最终将按照生命周期的顺序输出：

```js
// 1
// 4
// 2
// 3
```

## 组件的基本写法

如果是从 Vue 2 就开始写 TypeScript 的话，应该知道在 Vue 2 的时候就已经有了 `Vue.extend` 和 [Class Component](https://class-component.vuejs.org/) 的基础写法；Vue 3 在保留 class 写法的同时，还推出了 `defineComponent` + Composition API 的新写法。

加上视图部分又有 Template 和 TSX 的写法、以及 3.x 对不同版本的生命周期兼容，累计下来，在 Vue 里写 TypeScript ，至少有 9 种不同的组合方式，堪比孔乙己的回字。

先来回顾一下这些写法组合分别是什么，了解一下 Vue 3 最好使用哪种写法：

### 回顾 Vue 2

在 Vue 2 ，为了更好的 TS 推导，用的最多的还是 Class Component 的写法。

| 适用版本 |    基本写法     | 视图写法 |
| :------: | :-------------: | :------: |
|  Vue 2   |   Vue.extend    | Template |
|  Vue 2   | Class Component | Template |
|  Vue 2   | Class Component |   TSX    |

### 了解 Vue 3 ~new

目前 Vue 3 从官方对版本升级的态度来看， `defineComponent` 就是为了解决之前 Vue 2 对 TypeScript 类型推导不完善等问题而推出的， Vue 官方也是更希望大家习惯 `defineComponent` 的使用。

| 适用版本 |    基本写法     | 视图写法 | 生命周期版本 |            官方是否推荐             |
| :------: | :-------------: | :------: | :----------: | :---------------------------------: |
|  Vue 3   | Class Component | Template |    Vue 2     |  <FontColor text="×" color="red"/>  |
|  Vue 3   | defineComponent | Template |    Vue 2     |  <FontColor text="×" color="red"/>  |
|  Vue 3   | defineComponent | Template |    Vue 3     | <FontColor text="√" color="green"/> |
|  Vue 3   | Class Component |   TSX    |    Vue 2     |  <FontColor text="×" color="red"/>  |
|  Vue 3   | defineComponent |   TSX    |    Vue 2     |  <FontColor text="×" color="red"/>  |
|  Vue 3   | defineComponent |   TSX    |    Vue 3     | <FontColor text="√" color="green"/> |

从接下来开始都会以 Composition API + `defineComponent` + `<template />` 的写法，并且按照 Vue 3 的生命周期来作为示范案例。

先来实现一个最简单的 `Hello World!` ，看看如何使用 Composition API 编写组件：

```vue
<template>
  <p class="msg">{{ msg }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const msg = 'Hello World!'

    return {
      msg,
    }
  },
})
</script>

<style scoped>
.msg {
  font-size: 14px;
}
</style>
```

和 Vue 2 一样，都是 `<template>` + `<script>` + `<style>` 三段式组合，上手非常简单。

:::tip
需要注意的是，在 Vue 3 的 `defineComponent` 写法里，只要的数据要在 `<template>` 中使用，就必须在 `setup` 里 `return` 出去。

当然，只在函数中调用到，而不需要渲染到模板里的，则无需 `return` 。
:::

Template 部分和 Vue 2 可以说是完全一样（会有一些不同，比如 `<router-link>` 标签移除了 `tag` 属性等等，后面会在相应的小节进行说明）。

Style 则是根据熟悉的预处理器或者原生 CSS 来写的，完全没有变化。

变化最大的就是 Script 部分了。


## 函数的定义和使用 ~new

在了解了响应式数据如何使用之后，接下来就要开始了解函数了。

在 Vue 2，函数都是放在 `methods` 对象里定义，然后再在 `mounted` 等生命周期或者模板里通过 `click` 使用。

但在 Vue 3 的生命周期里，和数据的定义一样，都是通过 `setup` 来完成。

:::tip

1. 可以在 `setup` 里定义任意类型的函数（普通函数、class 类、箭头函数、匿名函数等等）

2. 需要自动执行的函数，执行时机需要遵循生命周期

3. 需要暴露给模板去通过 `click`、`change` 等行为来触发的函数，需要把函数名在 `setup` 里进行 `return` 才可以在模板里使用
   :::

简单写一下例子：

```vue
<template>
  <p>{{ msg }}</p>

  <!-- 在这里点击执行return出来的方法 -->
  <button @click="changeMsg">修改MSG</button>
  <!-- 在这里点击执行return出来的方法 -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref<string>('Hello World!')

    // 这个要暴露给模板使用，必须return才可以使用
    function changeMsg() {
      msg.value = 'Hi World!'
    }

    // 这个要在页面载入时执行，无需return出去
    const init = () => {
      console.log('init')
    }

    // 在这里执行init
    onMounted(() => {
      init()
    })

    return {
      // 数据
      msg,

      // 方法
      changeMsg,
    }
  },
})
</script>
```
