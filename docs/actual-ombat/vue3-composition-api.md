---
layout: Vue3CompositionApi
title: Vue3 Composition API
outline: 'deep'
---

<script setup> 

</script>

# setup 组合 API 详解

> Vue.js 3.0 “One Piece” 正式版在 2020 年 9 月份发布  
> Vue.js 3.2 "Quintessential Quintuplets" 2021 年 8 月份发布  
> [Vue.js](https://cn.vuejs.org/) - 尤雨溪

Composition API(组合式 api) 本质上就是 vue 抽离了一系列方法可以自由引入组合使用, 在不改变 Vue 模板语法的情况下, 提供了一个新的函数 `setup()` ,setup 函数组合目的是为了解决 Vue2 中 “数据和业务逻辑不分离” 的问题

:key: **Vue3 中使用 setup 是如何解决这一问题的呢？**  
<ElCard >
● 第 1 步：用 setup 组合 API 替换 vue2 中 <FontColor text="data / computed / watch / methods"/> 等选项  
● 第 2 步：用 setup 中相关联的功能封装成一个个可独立可维护的 hooks
</ElCard>

## ref 及延伸方法

下文都以 vue3.2 版 **\<script setup>** 示栗介绍组合 API
::: tip :eyes: ref
作用：一般用于定义基本数据类型数据，比如 <FontColor text="String / Boolean / Number"/> 等  
背后：ref 的背后是使用 reactive 来实现的响应式  
语法：<Code text="const x = ref(100)"/>  
访问：在 setup 中使用 .value 来访问  
:::

```vue
<template>
  <h1 v-text="num"></h1>
  <!-- 在视图模板中，无须.value来访问 -->
  <button @click="num--">自减</button>
  <button @click="add">自增</button>
</template>

<script setup>
import { ref } from 'vue'
const num = ref(100)
const add = () => num.value++ // 在setup中，要使用.value来访问
</script>
```

::: tip :eyes: isRef
作用：判断一个变量是否为一个 ref 对象  
背后：ref 的背后是使用 reactive 来实现的响应式  
语法：<Code text="const bol = isRef(x)"/>  
:::

```vue
<template>
  <h1 v-text="isRef"></h1>
</template>

<script setup>
import { ref, isRef, reactive } from 'vue'
const hello = ref('Hello')
const world = reactive('World')
console.log(isRef(hello)) // true
console.log(isRef(world)) // false
</script>
```

::: tip :eyes: unRef
作用：用于返回一个值，如果访问的是 ref 变量，就返回其 .value 值；如果不是 ref 变量，就直接返回  
背后：ref 的背后是使用 reactive 来实现的响应式  
语法：<Code text="const x = unref(y)"/>  
:::

```vue
<template>
  <h1 v-text="isRef"></h1>
</template>

<template>
  <h1 v-text="unRef"></h1>
</template>

<script setup>
import { ref, unref } from 'vue'
const hello = ref('Hello')
const world = 'World'
console.log(unref(hello)) // 'Hello'
console.log(unref(world)) // 'World'
</script>
```

::: tip :eyes: toRef
作用：把一个 reactive 对象中的某个属性变成 ref 变量  
背后：ref 的背后是使用 reactive 来实现的响应式  
语法：<Code text="const x = toRef(reactive(obj), 'key')"/>
:::

```vue
<template>
  <h1 v-text="age"></h1>
</template>

<script setup>
import { toRef, reactive, isRef } from 'vue'
let user = { name: '张三', age: 10 }

let age = toRef(reactive(user), 'age')
console.log(isRef(age)) // true
</script>
```

::: tip :eyes: toRefs
作用：把一个 reactive 响应式对象变成 ref 变量  
背后：ref 的背后是使用 reactive 来实现的响应式  
语法：<Code text="const obj1 = toRefs(reactive(obj))"/>  
应用：在子组件中接收父组件传递过来的 props 时，使用 toRefs 把它变成响应式的
:::

```vue
<template>
  <h1 v-text="info.age"></h1>
</template>

<script setup>
import { toRefs, reactive, isRef } from 'vue'
let user = { name: '张三', age: 10 }
let info = toRefs(reactive(user))

console.log(isRef(info.age)) // true
console.log(isRef(info.name)) // true
console.log(isRef(info)) // true
</script>
```

::: tip :eyes: shallowRef
作用：对复杂层级的对象，只将其第一层变成 ref 响应(性能优化)  
背后：ref 的背后是使用 reactive 来实现的响应式  
语法：<Code text="const x = shallowRef({a:{b:{c:1}}, d:2})"/>  
应用：在子组件中接收父组件传递过来的 props 时，使用 toRefs 把它变成响应式的  
注意：如此 a、b、c、d 变化都不会自动更新，需要借助 triggerRef 来强制更新 :bulb:
:::

::: tip :eyes: triggerRef
作用：强制更新一个 shallowRef 对象的渲染  
语法：<Code text="triggerRef(shallowRef对象)"/>  
参考代码：同见下栗 :mag:
:::

```vue
<template>
  <h1 v-text="info.a.b.c"></h1>
  <button @click="changeC">更新[c]属性</button>

  <h1 v-text="info.d"></h1>
  <button @click="changeD">更新[d]属性</button>
</template>

<script setup>
import { shallowRef, triggerRef, isRef } from 'vue'

let info = shallowRef({ a: { b: { c: 1 } }, d: 2 })

console.log(isRef(info.value.a.b.c)) // false
console.log(isRef(info)) // true
console.log(isRef(info.a)) // false
console.log(isRef(info.d)) // false

const changeC = () => {
  info.value.a.b.c++
  triggerRef(info) // 强制渲染更新
}

const changeD = () => {
  info.value.d++
  triggerRef(info) // 强制渲染更新
}
</script>
```

## reactive 及延伸方法

::: tip :eyes: reactive
作用：定义响应式变量，一般用于定义引用数据类型。如果是基本数据类型  
语法：<Code text="const info = reactive([] | {})"/>  
注意：建议使用 ref 来定义，vue3.2 最佳实践推荐使用 ref 替代 reactive 定义响应式数据 :bulb:  
:::

```vue
<template>
  <div v-for="(item, idx) in list">
    <span v-text="idx"></span> - <span v-text="item.id"></span> -
    <span v-text="item.label"></span> -
    <span v-text="item.tab"></span>
  </div>
  <button @click="addRow">添加一行</button>
</template>

<script setup>
import { reactive } from 'vue'
const list = reactive([
  { id: 1, tab: 'good', label: '精华' },
  { id: 2, tab: 'ask', label: '问答' },
  { id: 3, tab: 'job', label: '招聘' },
  { id: 4, tab: 'share', label: '分享' },
])
const addRow = () => {
  list.push({ id: Date.now(), tab: 'test', label: '测试' })
}
</script>
```

::: tip :eyes: readonly
作用：修饰符，把一个对象，变成只读的  
语法：<Code text="const rs = readonly(ref对象 | reactive对象 | 普通对象)"/>  
:::

```vue
<template>
  <h1 v-text="info.foo"></h1>
  <button @click="change">改变</button>
</template>

<script setup>
import { reactive, readonly } from 'vue'
const info = readonly(reactive({ bar: 1, foo: 2 }))
const change = () => {
  info.foo++ // target is readonly
}
</script>
```

::: tip :eyes: isReadonly
作用：判断一个变量是不是只读的  
语法：<Code text="const bol = isReadonly(变量)"/>  
:::

```vue
<script setup>
import { reactive, readonly, isReadonly } from 'vue'

const info = readonly(reactive({ bar: 1, foo: 2 }))
console.log(isReadonly(info)) // true

const user = ref({ name: '张三', age: 10 })
console.log(isReadonly(user)) // false
</script>
```

::: tip :eyes: isReactive
作用：判断一个变量是不是 reactive 的  
注意：被 readonly 代理过的 reactive 变量，调用 isReactive 也是返回 true 的 :bulb:  
:::

```vue
<script setup>
import { reactive, readonly, isReactive } from 'vue'

const user = reactive({ name: '张三', age: 10 })
const info = readonly(reactive({ bar: 1, foo: 2 }))

console.log(isReactive(info)) // true
console.log(isReactive(user)) // true
</script>
```

::: tip :eyes: isProxy
作用：判断一个变量是不是 readonly 或 reactive 的  
注意：也就是说，只有 readonly 或 reactive 的才是一个 Proxy 代理对象 :bulb:
:::

```vue
<script setup>
import { reactive, readonly, ref, isProxy } from 'vue'

const user = readonly({ name: '张三', age: 10 })
const info = reactive({ bar: 1, foo: 2 })
const num = ref(100)

console.log(isProxy(info)) // true
console.log(isProxy(user)) // true
console.log(isProxy(num)) // false
</script>
```

::: tip :eyes: toRaw
作用：得到返回 reactive 变量或 readonly 变量的 "原始对象"  
语法：<Code text="const raw = toRaw(reactive变量或readonly变量)"/>  
注意：reactive(obj)、readonly(obj) 和 obj 之间是一种代理关系，并且它们之间是一种浅拷贝的关系。obj 变化，会导致 reactive(obj) 同步变化，反之一样 :bulb:
:::

```vue
<script setup>
import { reactive, readonly, toRaw } from 'vue'

const uu = { name: '张三', age: 10 }
const user = readonly(uu)
console.log(uu === user) // false
console.log(uu === toRaw(user)) // true

const ii = { bar: 1, foo: 2 }
const info = reactive(ii)
console.log(ii === info) // false
console.log(ii === toRaw(info)) // true
</script>
```

::: tip :eyes: markRaw
作用：把一个普通对象标记成 "永久原始"，从此将无法再变成 proxy 了  
语法：<Code text="const raw = markRaw({a,b})"/>  
:::

```vue
<script setup>
import { reactive, readonly, markRaw, isProxy } from 'vue'

const user = markRaw({ name: '张三', age: 10 })
const u1 = readonly(user) // 无法再代理了
const u2 = reactive(user) // 无法再代理了

console.log(isProxy(u1)) // false
console.log(isProxy(u2)) // false
</script>
```

::: tip :eyes: shallowReactive
作用：定义一个 reactive 变量，只对它的第一层进行 Proxy,，所以只有第一层变化时视图才更新  
语法：<Code text="const obj = shallowReactive({a: { b:9 } })"/>  
:::

```vue
<template>
  <h1 v-text="info.a.b.c"></h1>
  <h1 v-text="info.d"></h1>
  <button @click="change">改变</button>
</template>

<script setup>
import { shallowReactive, isProxy } from 'vue'
const info = shallowReactive({ a: { b: { c: 1 } }, d: 2 })

const change = () => {
  info.d++ // 只改变d，视图自动更新
  info.a.b.c++ // 只改变c，视图不会更新
  // 同时改变c和d，二者都更新，有一个更新了关联的也会跟着触发更新
}

console.log(isProxy(info)) // true
console.log(isProxy(info.d)) // false
</script>
```

::: tip :eyes: shallowReadonly
作用：定义一个 reactive 变量，只有第一层是只读的  
语法：<Code text="const obj = shallowReadonly({a: { b:9 } })"/>  
:::

```vue
<template>
  <h1 v-text="info.a.b.c"></h1>
  <h1 v-text="info.d"></h1>
  <button @click="change">改变</button>
</template>

<script setup>
import { reactive, shallowReadonly, isReadonly } from 'vue'
const info = shallowReadonly(reactive({ a: { b: { c: 1 } }, d: 2 }))

const change = () => {
  info.d++ // d是读的，改不了
  info.a.b.c++ // 可以正常修改，视图自动更新
}
console.log(isReadonly(info)) // true
console.log(isReadonly(info.d)) // false
</script>
```

## computed

::: tip :eyes: computed
作用：对响应式变量进行缓存计算  
语法：<Code text="const c = computed(fn / { get,set })"/>  
:::

```vue
<template>
  <div class="page">
    <span
      v-for="p in pageArr"
      v-text="p"
      @click="page = p"
      :class="{ on: p === page }"
    >
    </span>
  </div>

  <!-- 在v-model上使用computed计算属性 -->
  <input v-model.trim="text" /><br />
  你的名字是：<span v-text="name"></span>
</template>

<script setup>
import { ref, computed } from 'vue'
const page = ref(1)
const pageArr = computed(() => {
  const p = page.value
  return p > 3 ? [p - 2, p - 1, p, p + 1, p + 2] : [1, 2, 3, 4, 5]
})

const name = ref('')
const text = computed({
  get() {
    return name.value.split('-').join('')
  },
  // 支持计算属性的setter功能
  set(val) {
    name.value = val.split('').join('-')
  },
})
</script>
```

## watch，watchEffect

::: tip :eyes: watch
作用：用于监听响应式变量的变化，组件初始化时，它不执行  
语法：<Code text="const stop = watch(x, (new,old)=>{})"/>  
语法：<Code text="const stop = watch([x,y], ([newX,newY],[oldX,oldY])=>{})"/>  
注意：调用 stop()可以停止监听 :bulb:
:::

```vue
<template>
  <h1 v-text="num"></h1>
  <h1 v-text="usr.age"></h1>
  <button @click="change">改变</button>
  <button @click="stopAll">停止监听</button>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'

// watch监听ref变量、reactive变量的变化
const num = ref(1)
const usr = reactive({ name: '张三', age: 1 })
const change = () => {
  num.value++
  usr.age++
}
const stop1 = watch([num, usr], ([newNum, newUsr], [oldNum, oldUsr]) => {
  // 对ref变量，newNum是新值，oldNum是旧值
  console.log('num', newNum === oldNum) // false
  // 对reactive变量，newUsr和oldUsr相等，都是新值
  console.log('usr', newUsr === oldUsr) // true
})

// watch还可以监听计算属性的变化
const total = computed(() => num.value * 100)
const stop2 = watch(total, (newTotal, oldTotal) => {
  console.log('total', newTotal === oldTotal) // false
})

// 停止watch监听
const stopAll = () => {
  stop1()
  stop2()
}
</script>
```

::: tip :eyes: watchEffect
作用：不指定监听属性，相当于是 react 中的 useEffect()，用于执行各种副作用  
语法：<Code text="const stop = watchEffect(fn)，默认其 flush:'pre'"/> 前置执行的副作用  
● watchPostEffect，等价于 watchEffect(fn, {flush:'post'})，后置执行的副作用  
● watchSyncEffect，等价于 watchEffect(fn, {flush:'sync'})，同步执行的副作用  
注意：watchEffect 会自动收集其内部响应式依赖，当响应式依赖发变化时，这个 watchEffect 将再次执行，直到你手动 stop() 掉它 :bulb:
:::

```vue
<template>
  <h1 v-text="num"></h1>
  <button @click="stopAll">停止掉所有的副作用</button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
let num = ref(0)

// 等价于 watchPostEffect
const stop1 = watchEffect(
  () => {
    // 在这里你用到了 num.value
    // 那么当num变化时，当前副作用将再次执行
    // 直到stop1()被调用后，当前副作用才死掉
    console.log('---effect post', num.value)
  },
  { flush: 'post' }
)

// 等价于 watchSyncEffect
const stop2 = watchEffect(
  () => {
    // 在这里你用到了 num.value
    // 那么当num变化时，当前副作用将再次执行
    // 直到stop2()被调用后，当前副作用才死掉
    console.log('---effect sync', num.value)
  },
  { flush: 'sync' }
)

const stop3 = watchEffect(() => {
  // 如果在这里用到了 num.value
  // 你必须在定时器中stop3()，否则定时器会越跑越快！
  // console.log('---effect pre', num.value)
  setInterval(() => {
    num.value++
    // stop3()
  }, 1000)
})

const stopAll = () => {
  stop1()
  stop2()
  stop3()
}
</script>
```

## 生命周期钩子

::: tip :eyes: 生命周期钩子
\- 选项式的 beforeCreate、created，被 setup 替代了  
\- setup 表示组件被创建之前，props 被解析之后执行，它是组合式 API 的入口  
\- 选项式的 beforeDestroy、destroyed 被更名为 beforeUnmount、unMounted  
\- 新增了两个选项式的生命周期 renderTracked、renderTriggered，它们只在开发环境有用，常用于调试  
\- 在使用 setup 组合时，不建议使用选项式的生命周期，应该使用 on\* 系列 hooks 生命周期
:::

```vue
<template>
  <h1 v-text="num"></h1>
  <button @click="num++">自增</button>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from 'vue'

console.log('---setup')
const num = ref(100)
// 挂载阶段
onBeforeMount(() => console.log('---开始挂载'))
onRenderTracked(() => console.log('---跟踪'))
onMounted(() => console.log('---挂载完成'))

// 更新阶段
onRenderTriggered(() => console.log('---触发'))
onBeforeUpdate(() => console.log('---开始更新'))
onUpdated(() => console.log('---更新完成'))

// 销毁阶段
onBeforeUnmount(() => console.log('---开始销毁'))
onUnmounted(() => console.log('---销毁完成'))

// 与动态组件有关
onActivated(() => console.log('---激活'))
onDeactivated(() => console.log('---休眠'))

// 异常捕获
onErrorCaptured(() => console.log('---错误捕获'))
</script>
```

## provide / inject

::: tip :eyes: provide / inject
作用：在组件树中自上而下地传递数据  
语法：<Code text="provide('key', value)"/>  
语法：<Code text="const value = inject('key', '默认值')"/>  
:::

```vue
# App.vue
<script setup>
import { ref, provide } from 'vue'
const msg = ref('Hello World')
// 向组件树中注入数据
provide('msg', msg)
</script>

# Home.vue
<template>
  <h1 v-text="msg"></h1>
</template>
<script setup>
import { inject } from 'vue'
// 消费组件树中的数据，第二参数为默认值
const msg = inject('msg', 'Hello Vue')
</script>
```

## getCurrentInstance

::: tip :eyes: getCurrentInstance
作用：用于访问内部组件实例  
语法：<Code text="const app = getCurrentInstance()"/>  
场景：常用于访问 app.config.globalProperties 上的全局数据  
注意：请不要把它当作在组合式 API 中获取 this 的替代方案来使用，切记 :bulb:
:::

```vue
<script setup>
import { getCurrentInstance } from 'vue'
const app = getCurrentInstance()
// 全局数据，是不具备响应式的。
const global = app.appContext.config.globalProperties
console.log('app', app)
console.log('全局数据', global)
</script>
```

<!-- 评论 -->
<ClientOnly>
  <GitalkComment
    :issueId="163"
  />
</ClientOnly>
<!-- 评论 -->
