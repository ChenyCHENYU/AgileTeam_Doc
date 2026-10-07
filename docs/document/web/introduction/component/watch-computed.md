# 数据的监听与计算

---
title: "数据的监听与计算"
outline: "deep"
description: "Vue3 数据的监听与计算"
---

## 数据的监听 ~new

监听数据变化也是组件里的一项重要工作，比如监听路由变化、监听参数变化等等。

Vue 3 在保留原来的 `watch` 功能之外，还新增了一个 `watchEffect` 帮助更简单的进行监听。

### watch

在 Vue 3 ，新版的 `watch` 和 Vue 2 的旧版写法对比，在使用方式上变化非常大！

#### 回顾 Vue 2

在 Vue 2 是这样用的，和 `data` 、 `methods` 都在同级配置：

```ts
export default {
  data() {
    return {
      // ...
    }
  },
  // 注意这里，放在 data 、 methods 同个级别
  watch: {
    // ...
  },
  methods: {
    // ...
  },
}
```

并且类型繁多，选项式 API 的类型如下：

```ts
watch: { [key: string]: string | Function | Object | Array}
```

联合类型过多，意味着用法复杂，下面是个很好的例子，虽然出自 [官网](https://cn.vuejs.org/api/options-state.html#watch) 的用法介绍，但也反映出来对初学者不太友好，初次接触可能会觉得一头雾水：

```ts
export default {
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        d: 4,
      },
      e: 5,
      f: 6,
    }
  },
  watch: {
    // 侦听顶级 property
    a(val, oldVal) {
      console.log(`new: ${val}, old: ${oldVal}`)
    },
    // 字符串方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler(val, oldVal) {
        console.log('c changed')
      },
      deep: true,
    },
    // 侦听单个嵌套 property
    'c.d': function (val, oldVal) {
      // do something
    },
    // 该回调将会在侦听开始之后被立即调用
    e: {
      handler(val, oldVal) {
        console.log('e changed')
      },
      immediate: true,
    },
    // 可以传入回调数组，它们会被逐一调用
    f: [
      'handle1',
      function handle2(val, oldVal) {
        console.log('handle2 triggered')
      },
      {
        handler: function handle3(val, oldVal) {
          console.log('handle3 triggered')
        },
        /* ... */
      },
    ],
  },
  methods: {
    someMethod() {
      console.log('b changed')
    },
    handle1() {
      console.log('handle 1 triggered')
    },
  },
}
```

当然肯定也会有人觉得这样选择多是个好事，选择适合自己的就好，但还是认为这种写法对于初学者来说不是那么友好，有些过于复杂化，如果一个用法可以适应各种各样的场景，岂不是更妙？

:::tip
另外需要注意的是，不能使用箭头函数来定义 Watcher 函数 (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)` )。

因为箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向组件实例， `this.updateAutocomplete` 将是 `undefined` 。
:::

Vue 2 也可以通过 `this.$watch()` 这个 API 的用法来实现对某个数据的监听，它接受三个参数： `source` 、 `callback` 和 `options` 。

```ts
export default {
  data() {
    return {
      a: 1,
    }
  },
  // 生命周期钩子
  mounted() {
    this.$watch('a', (newVal, oldVal) => {
      // ...
    })
  },
}
```

由于 `this.$watch` 的用法和 Vue 3 比较接近，所以不做过多回顾，请直接看 [了解 Vue 3](#了解-vue-3-1) 部分。

#### 了解 Vue 3

在 Vue 3 的组合式 API 写法， `watch` 是一个可以接受 3 个参数的函数（保留了 Vue 2 的 `this.$watch` 这种用法），在使用层面上简单了好多。

```ts
import { watch } from 'vue'

// 一个用法走天下
watch(
  source, // 必传，要监听的数据源
  callback // 必传，监听到变化后要执行的回调函数
  // options // 可选，一些监听选项
)
```

下面的内容都基于 Vue 3 的组合式 API 用法展开介绍。

#### API 的 TS 类型

在了解用法之前，先对它的 TS 类型定义做一个简单的了解， watch 作为组合式 API ，根据使用方式有两种类型定义：

1. 基础用法的 TS 类型，详见 [基础用法](#基础用法) 部分

```ts
// watch 部分的 TS 类型
// ...
export declare function watch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): WatchStopHandle
// ...
```

2. 批量监听的 TS 类型，详见 [批量监听](#批量监听) 部分

```ts
// watch 部分的 TS 类型
// ...
export declare function watch<
  T extends MultiWatchSources,
  Immediate extends Readonly<boolean> = false
>(
  sources: [...T],
  cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): WatchStopHandle

// MultiWatchSources 是一个数组
declare type MultiWatchSources = (WatchSource<unknown> | object)[]
// ...
```

但是不管是基础用法还是批量监听，可以看到这个 API 都是接受 3 个入参：

|   参数   | 是否可选 | 含义                                                                        |
| :------: | :------: | :-------------------------------------------------------------------------- |
|  source  |   必传   | 数据源（详见：[要监听的数据源](#要监听的数据源)）                           |
| callback |   必传   | 监听到变化后要执行的回调函数（详见：[监听后的回调函数](#监听后的回调函数)） |
| options  |   可选   | 一些监听选项（详见：[监听的选项](#监听的选项)）                             |

并返回一个可以用来停止监听的函数（详见：[停止监听](#停止监听)）。

#### 要监听的数据源

在上面 [API 的 TS 类型](#api-的-ts-类型) 已经对 watch API 的组成有一定的了解了，这里先对数据源的类型和使用限制做下说明。

:::tip
如果不提前了解，在使用的过程中可能会遇到 “监听了但没有反应” 的情况出现。

另外，这部分内容会先围绕基础用法展开说明，批量监听会在 [批量监听](#批量监听) 部分单独说明。
:::

watch API 的第 1 个参数 `source` 是要监听的数据源，它的 TS 类型如下：

```ts
// watch 第 1 个入参的 TS 类型
// ...
export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T)
// ...
```

可以看到能够用于监听的数据，是通过 [响应式 API](./reactivity.md#响应式数据的变化-new) 定义的变量（ `Ref<T>` ），或者是一个 [计算数据](#数据的计算-new) （ `ComputedRef<T>` ），或者是一个 [getter 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get) （ `() => T` ）。

所以要想定义的 watch 能够做出预期的行为，数据源必须具备响应性或者是一个 getter ，如果只是通过 `let` 定义一个普通变量，然后去改变这个变量的值，这样是无法监听的。

:::tip
如果要监听响应式对象里面的某个值（**这种情况下对象本身是响应式，但它的 property 不是**），需要写成 getter 函数，简单的说就是需要写成有返回值的函数，这个函数 return 要监听的数据， e.g. `() => foo.bar` ，可以结合下方 [基础用法](#基础用法) 的例子一起理解。
:::

#### 监听后的回调函数

在上面 [API 的 TS 类型](#api-的-ts-类型) 介绍了 watch API 的组成，和数据源一样，先了解一下回调函数的定义。

:::tip
和数据源部分一样，回调函数内容也是会先围绕基础用法展开说明，批量监听在 [批量监听](#批量监听) 部分单独说明。
:::

watch API 的第 2 个参数 `callback` 是监听到数据变化时要做出的行为，它的 TS 类型如下：

```ts
// watch 第 2 个入参的 TS 类型
// ...
export declare type WatchCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV,
  onCleanup: OnCleanup
) => any
// ...
```

乍一看它有三个参数，但实际上这些参数不是自己定义的，而是 watch API 传给的，所以不管用或者不用，它们都在那里：

| 参数      | 作用                                                      |
| :-------- | :-------------------------------------------------------- |
| value     | 变化后的新值，类型和数据源保持一致                        |
| oldValue  | 变化前的旧值，类型和数据源保持一致                        |
| onCleanup | 注册一个清理函数，详见 [监听效果清理](#监听效果清理) 部分 |

**注意：第一个参数是新值，第二个才是原来的旧值！**

如同其他 JS 函数，在使用 watch 的回调函数时，可以对这三个参数任意命名，比如把 `value` 命名为觉得更容易理解的 `newValue` 。

:::tip
如果监听的数据源是一个 [引用类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%AF%B9%E8%B1%A1) 时（ e.g. `Object` 、 `Array` 、 `Date` … ）， `value` 和 `oldValue` 是完全相同的，因为指向同一个对象。
:::

另外，默认情况下，`watch` 是惰性的，也就是只有当被监听的数据源发生变化时才执行回调。

#### 基础用法

来到这里，对 2 个必传的参数都有一定的了解了，先看看基础的用法，也就是日常最常编写的方案，只需要先关注前 2 个必传的参数。

```ts
// 不要忘了导入要用的 API
import { defineComponent, reactive, watch } from 'vue'

export default defineComponent({
  setup() {
    // 定义一个响应式数据
    const userInfo = reactive({
      name: 'Petter',
      age: 18,
    })

    // 2s后改变数据
    setTimeout(() => {
      userInfo.name = 'Tom'
    }, 2000)

    /**
     * 可以直接监听这个响应式对象
     * callback 的参数如果不用可以不写
     */
    watch(userInfo, () => {
      console.log('监听整个 userInfo ', userInfo.name)
    })

    /**
     * 也可以监听对象里面的某个值
     * 此时数据源需要写成 getter 函数
     */
    watch(
      // 数据源，getter 形式
      () => userInfo.name,
      // 回调函数 callback
      (newValue, oldValue) => {
        console.log('只监听 name 的变化 ', userInfo.name)
        console.log('打印变化前后的值', { oldValue, newValue })
      }
    )
  },
})
```

一般的业务场景，基础用法足以面对。

如果有多个数据源要监听，并且监听到变化后要执行的行为一样，那么可以使用 [批量监听](#批量监听) 。

特殊的情况下，可以搭配 [监听的选项](#监听的选项) 做一些特殊的用法，详见下面部分的内容。

#### 批量监听

如果有多个数据源要监听，并且监听到变化后要执行的行为一样，第一反应可能是这样来写：

1. 抽离相同的处理行为为公共函数
2. 然后定义多个监听操作，传入这个公共函数

```ts{15-25}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const message = ref<string>('')
    const index = ref<number>(0)

    // 2s后改变数据
    setTimeout(() => {
      // 来到这里才会触发 watch 的回调
      message.value = 'Hello World!'
      index.value++
    }, 2000)

    // 抽离相同的处理行为为公共函数
    const handleWatch = (
      newValue: string | number,
      oldValue: string | number
    ): void => {
      console.log({ newValue, oldValue })
    }

    // 然后定义多个监听操作，传入这个公共函数
    watch(message, handleWatch)
    watch(index, handleWatch)
  },
})
```

这样写其实没什么问题，不过除了抽离公共代码的写法之外， watch API 还提供了一个批量监听的用法，和 [基础用法](#基础用法) 的区别在于，数据源和回调参数都变成了数组的形式。

数据源：以数组的形式传入，里面每一项都是一个响应式数据。

回调参数：原来的 `value` 和 `newValue` 也都变成了数组，每个数组里面的顺序和数据源数组排序一致。

可以看下面的这个例子更为直观：

```ts{17,19}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 定义多个数据源
    const message = ref<string>('')
    const index = ref<number>(0)

    // 2s后改变数据
    setTimeout(() => {
      message.value = 'Hello World!'
      index.value++
    }, 2000)

    watch(
      // 数据源改成了数组
      [message, index],
      // 回调的入参也变成了数组，每个数组里面的顺序和数据源数组排序一致
      ([newMessage, newIndex], [oldMessage, oldIndex]) => {
        console.log('message 的变化', { newMessage, oldMessage })
        console.log('index 的变化', { newIndex, oldIndex })
      }
    )
  },
})
```

什么情况下可能会用到批量监听呢？比如一个子组件有多个 props ，当有任意一个 prop 发生变化时，都需要执行初始化函数重置组件的状态，那么这个时候就可以用上这个功能啦！

:::tip
在适当的业务场景，也可以使用 watchEffect 来完成批量监听，但请留意 [功能区别](#和-watch-的区别) 部分的说明。
:::

#### 监听的选项

在 [API 的 TS 类型](#api-的-ts-类型) 里提到， watch API 还接受第 3 个参数 `options` ，可选的一些监听选项。

它的 TS 类型如下：

```ts
// watch 第 3 个入参的 TS 类型
// ...
export declare interface WatchOptions<Immediate = boolean>
  extends WatchOptionsBase {
  immediate?: Immediate
  deep?: boolean
}
// ...

// 继承的 base 类型
export declare interface WatchOptionsBase extends DebuggerOptions {
  flush?: 'pre' | 'post' | 'sync'
}
// ...

// 继承的 debugger 选项类型
export declare interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
// ...
```

`options` 是一个对象的形式传入，有以下几个选项：

|   选项    |    类型     | 默认值 |          可选值           | 作用                   |
| :-------: | :---------: | :----: | :-----------------------: | :--------------------- |
|   deep    |   boolean   | false  |       true \| false       | 是否进行深度监听       |
| immediate |   boolean   | false  |       true \| false       | 是否立即执行监听回调   |
|   flush   |   string    | 'pre'  | 'pre' \| 'post' \| 'sync' | 控制监听回调的调用时机 |
|  onTrack  | (e) => void |        |                           | 在数据源被追踪时调用   |
| onTrigger | (e) => void |        |                           | 在监听回调被触发时调用 |

其中 `onTrack` 和 `onTrigger` 的 `e` 是 debugger 事件，建议在回调内放置一个 [debugger 语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/debugger) 以调试依赖，这两个选项仅在开发模式下生效。

:::tip
deep 默认是 `false` ，但是在监听 reactive 对象或数组时，会默认为 `true` ，详见 [监听选项之 deep](#监听选项之-deep)。
:::

#### 监听选项之 deep

`deep` 选项接受一个布尔值，可以设置为 `true` 开启深度监听，或者是 `false` 关闭深度监听，默认情况下这个选项是 `false` 关闭深度监听的，但也存在特例。

设置为 `false` 的情况下，如果直接监听一个响应式的 [引用类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%AF%B9%E8%B1%A1) 数据（e.g. `Object` 、 `Array` … ），虽然它的属性的值有变化，但对其本身来说是不变的，所以不会触发 watch 的 callback 。

下面是一个关闭了深度监听的例子：

```ts{23-26}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 定义一个响应式数据，注意用的是 ref 来定义
    const nums = ref<number[]>([])

    // 2s后给这个数组添加项目
    setTimeout(() => {
      nums.value.push(1)

      // 可以打印一下，确保数据确实变化了
      console.log('修改后', nums.value)
    }, 2000)

    // 但是这个 watch 不会按预期执行
    watch(
      nums,
      // 这里的 callback 不会被触发
      () => {
        console.log('触发监听', nums.value)
      },
      // 因为关闭了 deep
      {
        deep: false,
      }
    )
  },
})
```

类似这种情况，需要把 `deep` 设置为 `true` 才可以触发监听。

可以看到上面的例子特地用了 [ref API](./reactivity.md#响应式-api-之-ref-new) ，这是因为通过 [reactive API](./reactivity.md#响应式-api-之-reactive-new) 定义的对象无法将 `deep` 成功设置为 `false` （这一点在目前的官网文档未找到说明，最终是在 [watch API 的源码](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiWatch.ts#L212) 上找到了答案）。

```ts{4}
// ...
if (isReactive(source)) {
  getter = () => source
  deep = true // 被强制开启了
}
// ...
```

这情况就是上面所说的 “特例” ，可以通过 `isReactive` API 来判断是否需要手动开启深度监听。

```ts
// 导入 isReactive API
import { defineComponent, isReactive, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    // 监听这个数据时，会默认开启深度监听
    const foo = reactive({
      name: 'Petter',
      age: 18,
    })
    console.log(isReactive(foo)) // true

    // 监听这个数据时，不会默认开启深度监听
    const bar = ref({
      name: 'Petter',
      age: 18,
    })
    console.log(isReactive(bar)) // false
  },
})
```

#### 监听选项之 immediate

在 [监听后的回调函数](#监听后的回调函数) 部分有了解过， watch 默认是惰性的，也就是只有当被监听的数据源发生变化时才执行回调。

这句话是什么意思呢？来看一下这段代码，为了减少 [deep](#监听选项之-deep) 选项的干扰，换一个类型，换成 `string` 数据来演示，请留意注释：

```ts
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 这个时候不会触发 watch 的回调
    const message = ref<string>('')

    // 2s后改变数据
    setTimeout(() => {
      // 来到这里才会触发 watch 的回调
      message.value = 'Hello World!'
    }, 2000)

    watch(message, () => {
      console.log('触发监听', message.value)
    })
  },
})
```

可以看到，数据在初始化的时候并不会触发监听回调，如果有需要的话，通过 `immediate` 选项来让它直接触发。

`immediate` 选项接受一个布尔值，默认是 `false` ，可以设置为 `true` 让回调立即执行。

改成这样，请留意高亮的代码部分和新的注释：

```ts{5-6,19-22}
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // 这一次在这里可以会触发 watch 的回调了
    const message = ref<string>('')

    // 2s后改变数据
    setTimeout(() => {
      // 这一次，这里是第二次触发 watch 的回调，不再是第一次
      message.value = 'Hello World!'
    }, 2000)

    watch(
      message,
      () => {
        console.log('触发监听', message.value)
      },
      // 设置 immediate 选项
      {
        immediate: true,
      }
    )
  },
})
```

注意，在带有 immediate 选项时，不能在第一次回调时取消该数据源的监听，详见 [停止监听](#停止监听) 。

#### 监听选项之 flush

`flush` 选项是用来控制 [监听回调](#监听后的回调函数) 的调用时机，接受指定的字符串，可选值如下，默认是 `'pre'` 。

| 可选值 | 回调的调用时机       | 使用场景                                                                                                     |
| :----: | :------------------- | :----------------------------------------------------------------------------------------------------------- |
| 'pre'  | 将在渲染前被调用     | 允许回调在模板运行前更新了其他值                                                                             |
| 'sync' | 在渲染时被同步调用   | 目前来说没什么好处，可以了解但不建议用…                                                                      |
| 'post' | 被推迟到渲染之后调用 | 如果要通过 ref 操作 [DOM 元素与子组件](./reactivity.md#dom-元素与子组件) ，需要使用这个值来启用该选项，以达到预期的执行效果 |

对于 `'pre'` 和 `'post'` ，回调使用队列进行缓冲。回调只被添加到队列中一次。

即使观察值变化了多次，值的中间变化将被跳过，不会传递给回调，这样做不仅可以提高性能，还有助于保证数据的一致性。

更多关于 flush 的信息，请参阅 [回调的触发时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing) 。

#### 停止监听

如果在 [setup](./index.md#全新的-setup-函数-new) 或者 [script-setup](../efficient.md#script-setup-new) 里使用 watch 的话， [组件被卸载](./index.md#组件的生命周期-new) 的时候也会一起被停止，一般情况下不太需要关心如何停止监听。

不过有时候可能想要手动取消， Vue 3 也提供了方法。

:::tip
随着组件被卸载一起停止的前提：侦听器必须是 [同步语句](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing#%E5%90%8C%E6%AD%A5javascript) 创建的，这种情况侦听器会绑定在当前组件上。

如果放在 `setTimeout` 等 [异步函数](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing#%E5%BC%82%E6%AD%A5javascript) 里面创建，则不会绑定到当前组件，因此组件卸载的时候不会一起停止该侦听器，这种时候就需要手动停止监听。
:::

在 [API 的 TS 类型](#api-的-ts-类型) 有提到，当定义一个 watch 行为的时候，它会返回一个用来停止监听的函数。

这个函数的 TS 类型如下：

```ts
export declare type WatchStopHandle = () => void
```

用法很简单，做一下简单了解即可：

```ts
// 定义一个取消观察的变量，它是一个函数
const unwatch = watch(message, () => {
  // ...
})

// 在合适的时期调用它，可以取消这个监听
unwatch()
```

有一点需要注意的是，如果启用了 [immediate 选项](#监听选项之-immediate) ，不能在第一次触发监听回调时执行它。

```ts
// 注意：这是一段错误的代码，运行会报错
const unwatch = watch(
  message,
  // 监听的回调
  () => {
    // ...
    // 在这里调用会有问题 ❌
    unwatch()
  },
  // 启用 immediate 选项
  {
    immediate: true,
  }
)
```

会收获一段报错，告诉 `unwatch` 这个变量在初始化前无法被访问：

```bash
Uncaught ReferenceError: Cannot access 'unwatch' before initialization
```

目前有两种方案可以让实现这个操作：

方案一：使用 `var` 并判断变量类型，利用 [var 的变量提升](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var#%E6%8F%8F%E8%BF%B0) 来实现目的。

```ts{2,7-9}
// 这里改成 var ，不要用 const 或 let
var unwatch = watch(
  message,
  // 监听回调
  () => {
    // 这里加一个判断，是函数才执行它
    if (typeof unwatch === 'function') {
      unwatch()
    }
  },
  // 监听选项
  {
    immediate: true,
  }
)
```

不过 `var` 已经属于过时的语句了，建议用方案二的 `let` 。

方案二：使用 `let` 并判断变量类型。

```ts{5-6,11-13}
// 如果不想用 any ，可以导入 TS 类型
import type { WatchStopHandle } from 'vue'

// 这里改成 let ，但是要另起一行，先定义，再赋值
let unwatch: WatchStopHandle
unwatch = watch(
  message,
  // 监听回调
  () => {
    // 这里加一个判断，是函数才执行它
    if (typeof unwatch === 'function') {
      unwatch()
    }
  },
  // 监听选项
  {
    immediate: true,
  }
)
```

#### 监听效果清理

在 [监听后的回调函数](#监听后的回调函数) 部分提及到一个参数 `onCleanup` ，它可以帮注册一个清理函数。

有时 watch 的回调会执行异步操作，当 watch 到数据变更的时候，需要取消这些操作，这个函数的作用就用于此，会在以下情况调用这个清理函数：

- watcher 即将重新运行的时候
- watcher 被停止（组件被卸载或者被手动 [停止监听](#停止监听) ）

TS 类型：

```ts
declare type OnCleanup = (cleanupFn: () => void) => void
```

用法方面比较简单，传入一个回调函数运行即可，不过需要注意的是，需要在停止监听之前注册好清理行为，否则不会生效。

在 [停止监听](#停止监听) 里的最后一个 immediate 例子的基础上继续添加代码，请注意注册的时机：

```ts{6-9}
let unwatch: WatchStopHandle
unwatch = watch(
  message,
  (newValue, oldValue, onCleanup) => {
    // 需要在停止监听之前注册好清理行为
    onCleanup(() => {
      console.log('监听清理ing')
      // 根据实际的业务情况定义一些清理操作 ...
    })
    // 然后再停止监听
    if (typeof unwatch === 'function') {
      unwatch()
    }
  },
  {
    immediate: true,
  }
)
```

### watchEffect

如果一个函数里包含了多个需要监听的数据，一个一个数据去监听太麻烦了，在 Vue 3 ，可以直接使用 watchEffect API 来简化的操作。

#### API 的 TS 类型

这个 API 的类型如下，使用的时候需要传入一个副作用函数（相当于 watch 的 [监听后的回调函数](#监听后的回调函数) ），也可以根据的实际情况传入一些可选的 [监听选项](#监听的选项) 。

和 watch API 一样，它也会返回一个用于 [停止监听](#停止监听) 的函数。

```ts
// watchEffect 部分的 TS 类型
// ...
export declare type WatchEffect = (onCleanup: OnCleanup) => void

export declare function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle
// ...
```

副作用函数也会传入一个清理回调作为参数，和 watch 的 [监听效果清理](#监听效果清理) 一样的用法。

可以理解为它是一个简化版的 watch ，具体简化在哪里呢？请看下面的用法示例。

#### 用法示例

它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```ts
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  setup() {
    // 单独定义两个数据，后面用来分开改变数值
    const name = ref<string>('Petter')
    const age = ref<number>(18)

    // 定义一个调用这两个数据的函数
    const getUserInfo = (): void => {
      console.log({
        name: name.value,
        age: age.value,
      })
    }

    // 2s后改变第一个数据
    setTimeout(() => {
      name.value = 'Tom'
    }, 2000)

    // 4s后改变第二个数据
    setTimeout(() => {
      age.value = 20
    }, 4000)

    // 直接监听调用函数，在每个数据产生变化的时候，它都会自动执行
    watchEffect(getUserInfo)
  },
})
```

#### 和 watch 的区别

虽然理论上 `watchEffect` 是 `watch` 的一个简化操作，可以用来代替 [批量监听](#批量监听) ，但它们也有一定的区别：

1. `watch` 可以访问侦听状态变化前后的值，而 `watchEffect` 没有。

2. `watch` 是在属性改变的时候才执行，而 `watchEffect` 则默认会执行一次，然后在属性改变的时候也会执行。

第二点的意思，看下面这段代码可以有更直观的理解：

使用 watch ：

```ts{13-17}
export default defineComponent({
  setup() {
    const foo = ref<string>('')

    setTimeout(() => {
      foo.value = 'Hello World!'
    }, 2000)

    function bar() {
      console.log(foo.value)
    }

    // 使用 watch 需要先手动执行一次
    bar()

    // 然后当 foo 有变动时，才会通过 watch 来执行 bar()
    watch(foo, bar)
  },
})
```

使用 watchEffect ：

```ts{13-14}
export default defineComponent({
  setup() {
    const foo = ref<string>('')

    setTimeout(() => {
      foo.value = 'Hello World!'
    }, 2000)

    function bar() {
      console.log(foo.value)
    }

    // 可以通过 watchEffect 实现 bar() + watch(foo, bar) 的效果
    watchEffect(bar)
  },
})
```

#### 可用的监听选项

虽然用法和 watch 类似，但也简化了一些选项，它的监听选项 TS 类型如下：

```ts
// 只支持 base 类型
export declare interface WatchOptionsBase extends DebuggerOptions {
  flush?: 'pre' | 'post' | 'sync'
}
// ...

// 继承的 debugger 选项类型
export declare interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
// ...
```

对比 watch API ，它不支持 [deep](#监听选项之-deep) 和 [immediate](#监听选项之-immediate) ，请记住这一点，其他的用法是一样的。

`flush` 选项的使用详见 [监听选项之 flush](#监听选项之-flush) ，`onTrack` 和 `onTrigger` 详见 [监听的选项](#监听的选项) 部分内容。

### watchPostEffect

watchEffect API 使用 `flush: 'post'` 选项时的别名，具体区别详见 [监听选项之 flush](#监听选项之-flush) 部分。

:::tip
Vue v3.2.0 及以上版本才支持该 API 。
:::

### watchSyncEffect

watchEffect API 使用 `flush: 'sync'` 选项时的别名，具体区别详见 [监听选项之 flush](#监听选项之-flush) 部分。

:::tip
Vue v3.2.0 及以上版本才支持该 API 。
:::

## 数据的计算 ~new

和 Vue 2.0 一样，数据的计算也是使用 `computed` API ，它可以通过现有的响应式数据，去通过计算得到新的响应式变量，用过 Vue 2.0 的开发者应该不会太陌生，但是在 Vue 3.0 ，在使用方式上也是变化非常大！

:::tip
这里的响应式数据，可以简单理解为通过 [ref](./reactivity.md#响应式-api-之-ref-new) API 、 [reactive](./reactivity.md#响应式-api-之-reactive-new) API 定义出来的数据，当然 Vuex 、Vue Router 等 Vue 数据也都具备响应式，可以戳 [响应式数据的变化](./reactivity.md#响应式数据的变化-new) 了解。
:::

### 用法变化

先从一个简单的用例来看看在 Vue 新旧版本的用法区别：

假设定义了两个分开的数据 `firstName` 名字和 `lastName` 姓氏，但是在 template 展示时，需要展示完整的姓名，那么就可以通过 `computed` 来计算一个新的数据：

#### 回顾 Vue 2

在 Vue 2.0 ，`computed` 和 `data` 在同级配置，并且不可以和 `data` 里的数据同名重复定义：

```ts
// 在 Vue 2 的写法：
export default {
  data() {
    return {
      firstName: 'Bill',
      lastName: 'Gates',
    }
  },
  // 注意这里定义的变量，都要通过函数的形式来返回它的值
  computed: {
    // 普通函数可以直接通过熟悉的 this 来拿到 data 里的数据
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    // 箭头函数则需要通过参数来拿到实例上的数据
    fullName2: (vm) => `${vm.firstName} ${vm.lastName}`,
  },
}
```

这样在需要用到全名的地方，只需要通过 `this.fullName` 就可以得到 `Bill Gates` 。

#### 了解 Vue 3

在 Vue 3.0 ，跟其他 API 的用法一样，需要先导入 `computed` 才能使用：

```ts
// 在 Vue 3 的写法：
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    // 定义基本的数据
    const firstName = ref<string>('Bill')
    const lastName = ref<string>('Gates')

    // 定义需要计算拼接结果的数据
    const fullName = computed(() => `${firstName.value} ${lastName.value}`)

    // 2s 后改变某个数据的值
    setTimeout(() => {
      firstName.value = 'Petter'
    }, 2000)

    // template 那边在 2s 后也会显示为 Petter Gates
    return {
      fullName,
    }
  },
})
```

把这个用法简单的理解为，传入一个回调函数，并 `return` 一个值，它需要有明确的返回值。

:::tip
需要注意的是：

1. 定义出来的 `computed` 变量，和 `ref` 变量的用法一样，也是需要通过 `.value` 才能拿到它的值

2. 但是区别在于， `computed` 的 `value` 是只读的

原因详见下方的 [类型定义](#类型定义) 。
:::

### 类型定义

之前说过，在 defineComponent 里，会自动帮推导 Vue API 的类型，所以一般情况下，是不需要显式的去定义 `computed` 出来的变量类型的。

在确实需要手动指定的情况下，也可以导入它的类型然后定义：

```ts
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

// 注意这里添加了类型定义
const fullName: ComputedRef<string> = computed(
  () => `${firstName.value} ${lastName.value}`
)
```

要返回一个字符串，就写 `ComputedRef<string>` ；返回布尔值，就写 `ComputedRef<boolean>` ；返回一些复杂对象信息，可以先定义好的类型，再诸如 `ComputedRef<UserInfo>` 去写。

```ts
// 这是 ComputedRef 的类型定义：
export declare interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T
  [ComoutedRefSymbol]: true
}
```

### 优势对比和注意事项

先来了解一下这个 API 的一些优势和注意事项（如果在 Vue 2 已经有接触过的话，可以跳过这一段，因为优势和需要注意的东西比较一致）。

#### 优势对比

看到这里，相信刚接触的开发者可能会有疑问，既然 `computed` 也是通过一个函数来返回值，那么和普通的 `function` 有什么区别，或者说优势？

1. 性能优势

这一点在 [官网文档](https://cn.vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods) 其实是有提到的：

> 数据的计算是基于它们的响应依赖关系缓存的，只在相关响应式依赖发生改变时它们才会重新求值。

也就是说，只要原始数据没有发生改变，多次访问 `computed` ，都会立即返回之前的计算结果，而不是再次执行函数；而普通的 `function` 调用多少次就执行多少次，每调用一次就计算一次。

至于为何要如此设计，官网文档也给出了原因：

> 为什么需要缓存？假设有一个性能开销比较大的计算数据 list，它需要遍历一个巨大的数组并做大量的计算。然后可能有其他的计算数据依赖于 list。如果没有缓存，将不可避免的多次执行 list 的 getter！如果不希望有缓存，请用 function 来替代。

:::tip
在这部分内容里，将官方文档的一些用词做了更换，比如把 method 都替换成了 function ，也把 “计算属性” 都换成了 “计算数据”，原因在于官网很多地方是基于 Options API 的写法去描述，而这里是基于 Composition API 。

点击了解： [如何理解 JavaScript 中方法（method）和函数（function）的区别？](https://stackoverflow.com/questions/14088842/in-javascript-syntax-difference-between-function-method-definition-within-a-c)
:::

2. 书写统一

假定 foo1 是 `ref` 变量， foo2 是 `computed` 变量， foo3 是普通函数返回值

看到这里的开发者应该都已经清楚 Vue 3 的 `ref` 变量是通过 `foo1.value` 来拿到值的，而 `computed` 也是通过 `foo2.value` ，并且在 template 里都可以省略 `.value` ，在读取方面，他们是有一致的风格和简洁性。

而 foo3 不管是在 script 还是 template ，都需要通过 `foo3()` 才能拿到结果，相对来说会有那么一丢丢别扭。

当然，关于这一点，如果涉及到的数据不是响应式数据，那么还是老老实实的用函数返回值吧，原因请见下面的 [注意事项](#注意事项) 。

#### 注意事项

有优势当然也就有一定的 “劣势” ，当然这也是 Vue 框架的有意为之，所以在使用上也需要注意一些问题：

<ElTag type="danger">1. 只会更新响应式数据的计算</ElTag>

假设要获取当前的时间信息，因为不是响应式数据，所以这种情况下就需要用普通的函数去获取返回值，才能拿到最新的时间。

```ts
const nowTime = computed(() => new Date())
console.log(nowTime.value)
// 输出 Sun Nov 14 2021 21:07:00 GMT+0800 (GMT+08:00)

// 2s 后依然是跟上面一样的结果
setTimeout(() => {
  console.log(nowTime.value)
  // 还是输出 Sun Nov 14 2021 21:07:00 GMT+0800 (GMT+08:00)
}, 2000)
```

<ElTag type="danger">2. 数据是只读的</ElTag>

通过 computed 定义的数据，它是只读的，这一点在 [类型定义](#类型定义) 已经有所了解。

如果直接赋值，不仅无法变更数据，而且会收获一个报错。

```bash
TS2540: Cannot assign to 'value' because it is a read-only property.
```

虽然无法直接赋值，但是在必要的情况下，依然可以通过 `computed` 的 `setter` 来更新数据。

点击了解：[computed 的 setter 用法](#setter-的使用)

### setter 的使用

通过 computed 定义的变量默认都是只读的形式（只有一个 getter ），但是在必要的情况下，也可以使用其 setter 属性来更新数据。

#### 基本格式

当需要用到 setter 的时候， `computed` 就不再是一个传入 callback 的形式了，而是传入一个带有 2 个方法的对象。

```ts
// 注意这里computed接收的入参已经不再是函数
const foo = computed({
  // 这里需要明确的返回一个值
  get() {
    // ...
  },
  // 这里接收一个参数，代表修改 foo 时，赋值下来的新值
  set(newValue) {
    // ...
  },
})
```

这里的 `get` 就是 `computed` 的 getter ，跟原来传入 callback 的形式一样，是用于 `foo.value` 的读取，所以这里必须有明确的返回值。

这里的 `set` 就是 `computed` 的 setter ，它会接收一个参数，代表新的值，当通过 `foo.value = xxx` 赋值的时候，赋入的这个值，就会通过这个入参来传递进来，可以根据的业务需要，把这个值，赋给相关的数据源。

:::tip
请注意，要求必须使用 `get` 和 `set` 这 2 个方法名，也只接受这 2 个方法。
:::

在了解了基本格式后，可以查看下面的例子来了解具体的用法。

#### 使用示范

官网的 [例子](https://cn.vuejs.org/guide/essentials/computed.html#writable-computed) 是一个 Options API 的案例，这里改成 Composition API 的写法来演示：

```ts
// 还是这2个数据源
const firstName = ref<string>('Bill')
const lastName = ref<string>('Gates')

// 这里配合setter的需要，改成了另外一种写法
const fullName = computed({
  // getter还是返回一个拼接起来的全名
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  // setter这里改成只更新firstName，注意参数也定义TS类型
  set(newFirstName: string) {
    firstName.value = newFirstName
  },
})
console.log(fullName.value) // 输出 Bill Gates

// 2s后更新一下数据
setTimeout(() => {
  // 对fullName的赋值，其实更新的是firstName
  fullName.value = 'Petter'

  // 此时firstName已经得到了更新
  console.log(firstName.value) // 会输出 Petter

  // 当然，由于firstName变化了，所以fullName的getter也会得到更新
  console.log(fullName.value) // 会输出 Petter Gates
}, 2000)
```

### 应用场景

计算 API 的作用，官网文档只举了一个非常简单的例子，那么在实际项目中，什么情况下用它会让更方便呢？

简单举几个比较常见的例子吧，加深一下对 `computed` 的理解。

#### 数据的拼接和计算

如上面的案例，与其每个用到的地方都要用到 `firstName + ' ' + lastName` 这样的多变量拼接，不如用一个 `fullName` 来的简单。

当然，不止是字符串拼接，数据的求和等操作更是合适，比如说做一个购物车，购物车里有商品列表，同时还要显示购物车内的商品总金额，这种情况就非常适合用计算数据。

#### 复用组件的动态数据

在一个项目里，很多时候组件会涉及到复用，比如说：“首页的文章列表 vs 列表页的文章列表 vs 作者详情页的文章列表” ，特别常见于新闻网站等内容资讯站点，这种情况下，往往并不需要每次都重新写 UI 、数据渲染等代码，仅仅是接口 URL 的区别。

这种情况就可以通过路由名称来动态获取要调用哪个列表接口：

```ts
const route = useRoute()

// 定义一个根据路由名称来获取接口URL的计算数据
const apiUrl = computed(() => {
  switch (route.name) {
    // 首页
    case 'home':
      return '/api/list1'
    // 列表页
    case 'list':
      return '/api/list2'
    // 作者页
    case 'author':
      return '/api/list3'
    // 默认是随机列表
    default:
      return '/api/random'
  }
})

// 请求列表
const getArticleList = async (): Promise<void> => {
  // ...
  articleList.value = await axios({
    method: 'get',
    url: apiUrl.value,
    // ...
  })
  // ...
}
```

当然，这种情况也可以在父组件通过 `props` 传递接口 URL ，如果已经看了 [组件通讯](../communication) 一章的话。

#### 获取多级对象的值

应该很经常的遇到要在 template 显示一些多级对象的字段，但是有时候又可能存在某些字段不一定有，需要做一些判断的情况，虽然有 `v-if` ，但是嵌套层级一多，的模板会难以维护。

若把这些工作量转移给计算数据，结合 `try / catch` ，就无需在 template 里处理很多判断了。

```ts
// 例子比较极端，但在 Vuex 这种大型数据树上，也不是完全不可能存在
const foo = computed(() => {
  // 正常情况下返回需要的数据
  try {
    return store.state.foo3.foo2.foo1.foo
  } catch (e) {
    // 处理失败则返回一个默认值
    return ''
  }
})
```

这样在 template 里要拿到 foo 的值，完全不需要关心中间一级又一级的字段是否存在，只需要区分是不是默认值。

#### 不同类型的数据转换

有时候会遇到一些需求类似于，让用户在输入框里，按一定的格式填写文本，比如用英文逗号 `,` 隔开每个词，然后保存的时候，是用数组的格式提交给接口。

这个时候 `computed` 的 setter 就可以妙用了，只需要一个简单的 `computed` ，就可以代替 `input` 的 `change` 事件或者 `watch` 监听，可以减少很多业务代码的编写。

```vue
<template>
  <input
    type="text"
    v-model="tagsStr"
    placeholder="请输入标签，多个标签用英文逗号隔开"
  />
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  setup() {
    // 这个是最终要用到的数组
    const tags = ref<string[]>([])

    // 因为input必须绑定一个字符串
    const tagsStr = computed({
      // 所以通过getter来转成字符串
      get() {
        return tags.value.join(',')
      },
      // 然后在用户输入的时候，切割字符串转换回数组
      set(newValue: string) {
        tags.value = newValue.split(',')
      },
    })

    return {
      tagsStr,
    }
  },
})
</script>
```
