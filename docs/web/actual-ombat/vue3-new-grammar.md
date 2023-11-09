---
layout: Vue3NewGrammar
title: Vue3 新语法细节
outline: 'deep'
---

<script setup> 
  // import FontColor from '_c/FontColor.vue'
  // import Code from '_c/Code.vue'

</script>

# Vue3 新语法细节，其他高级功能，及废弃 API

## ref 获取实例对象

::: tip :eyes: ref =~> 收集 $refs 对象
在 Vue2 中，v-for 和 `ref` 同时使用，这会自动收集 `$refs`，当存在嵌套的 `v-for` 时，这种行为会变得不明确且效率低下，在 Vue3 中，`v-for`和`ref`同时使用，这不再自动收集`$refs`，可以手动封装收集 `ref`对象的方法，将其绑定在`ref` 属性上
:::

```vue
<template>
  <div class="grid" v-for="i in 5" :ref="setRef">
    <span v-for="j in 5" v-text="(i - 1) * 5 + j" :ref="setRef"> </span>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// 用于收集ref对象的数组
const refs = []
// 定义手动收集ref的方法
const setRef = (el) => {
  if (el) refs.push(el)
}
onMounted(() => console.log('refs', refs))
</script>
```

## defineAsyncComponent 异步加载

::: tip :eyes: defineAsyncComponent =~> 异步加载组件
在 Vue3 中，使用 `defineAsyncComponent` 可以异步地加载组件，但是需要注意的是，这种异步组件是不能用在 <FontColor text="Vue-Router"/> 的路由懒加载中
:::

```vue
<script setup>
import { defineAsyncComponent } from 'vue'
// 异步加载组件
const AsyncChild = defineAsyncComponent({
  loader: () => import('./components/Child.vue'),
  delay: 200,
  timeout: 3000,
})
</script>
```

## attrs 获取组件所有属性

::: tip :eyes: attrs =~> 处理 $attrs 
Vue3 中的  `$attrs`，包含了父组件传递过来的所有属性，包括`class`和`style` 在 Vue2 中，`$attrs` 是接到不到 `class` 和 `style` 的  
在 `setup` 组件中，使用 `useAttrs()` 访问  
在非 `setup` 组件中，使用 `this.$attrs / setupCtx.attrs` 来访问

:::

```vue
<script setup>
// 在非setup组件中，使用this.$attrs/setupCtx.attrs
import { useAttrs } from 'vue'
const attrs = useAttrs()
// 能够成功访问到class和style
console.log('attrs', attrs)
</script>
```

## directive 指令的变化

::: tip :eyes: directive =~> 指令
Vue3 中，使用 `app.directive()` 来定义全局指令，并且定义指令时的钩子函数们也发生了若干变化
:::

```js
app.directive('highlight', {
  // v3 中新增的
  created() {},
  // 相当于 v2 中的 bind()
  beforeMount(el, binding, vnode, prevVnode) {
    el.style.background = binding.value
  },
  // 相当于 v2 中的 inserted()
  mounted() {},
  // v3 中新增的
  beforeUpdate() {},
  // 相当于 v2 中的 update()+componentUpdated()
  updated() {},
  // v3 中新增的
  beforeUnmount() {},
  // 相当于v2 中的 unbind()
  unmounted() {},
})
```

## emits 组件通信的变化

::: tip :eyes: emits =~> 触发事件
**非** `<script setup>` 写法中  
\- 使用 `emits` 选项接收父组件传递过来的自定义事件  
\- 使用 `ctx.emit()` 或 `this.$emit()` 来触发事件  
**在** `<script setup>` 写法中  
\- 使用 `defineEmits` 来接收自定义事件，使用 `defineProps` 来接收自定义属性
:::

```vue
<template>
  <h1 v-text="count" @click="emit('update:count', count + 1)"></h1>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
// 接收父组件传递过来的自定义属性
const props = defineProps({
  count: { type: Number, default: 100 },
})
// 接收父组件传递过来的自定义事件
// emit 相当于 vue2中的 this.$emit()
const emit = defineEmits(['change', 'update:count'])
</script>
```

## 其他高级功能

### Fragment

::: warning :zap: 无需 Fragment 根节点
Vue3 现在正式支持了多根节点的组件，也就是片段，类似 `React` 中的 <FontColor text="Fragment"/> 使用片段的好处是，当我们要在 `template` 中添加多个节点时，没必要在外层套一个 `div` 了，套一层 `div` 这会导致多了一层 **DOM** 结构可见，片段可以减少没有必要的 **DOM** 嵌套
:::

```vue
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

### JSX / TSX

::: warning :zap: .j / tsx 函数式组件
\- 在 Vue 2 中，要使用 `functional` 选项来支持函数式组件的封装  
\- 在 Vue 3 中，函数式组件可以直接用普通函数进行创建如果你在 vite 环境中安装了 <FontColor text="`@vitejs/plugin-vue-jsx`" color="gray"/> 插件来支持 JSX 语法，那么定义函数式组件就更加方便了
:::

```tsx
# Counter.tsx

export default (props, ctx) => {
  // props是父组件传递过来的属性
  // ctx 中有 attrs, emit, slots
  const { value, onChange } = props

  return (
    <>
      <h1>函数式组件</h1>
      <h1 onClick={()=>onChange(value+1)}>
        { value }
      </h1>
    </>
  )
}
```

### Vue 实例方法 app.use()

::: warning :zap: Vue 实例方法代替静态方法、属性
Vue2 中的 Vue 构造函数，在 Vue3 中已经不能再使用了所以 Vue 构造函数上的静态方法、静态属性，比如 <FontColor text="Vue.use / Vue.mixin  / Vue.prototype" color="pink"/> 等都不能使用了，在 Vue3 中新增了一套实例方法来代替，比如 `app.use()` 等
:::

```js
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

const app = createApp(App)

// 相当于 v2中的 Vue.prototype
app.config.globalProperties.$http = ''
// 等价于 v2中的 Vue.use
app.use(router) // 注册路由系统
app.use(store) // 注册状态管理
```

### getCurrentInstance

::: warning :zap: getCurrentInstance 访问内部组件实例
在 Vue3 中，使用 `getCurrentInstance` 访问内部组件实例，进而可以获取到 app.config 上的全局数据，比如 `$route`、`$router`、`$store` 和自定义数据等，这个 API 只能在 `setup` 或 生命周期中调用
:::

```vue
# .js
<script>
// 把使用全局数据的功能封装成 Hooks
import { getCurrentInstance } from 'vue'
function useGlobal(key) {
  return getCurrentInstance().appContext.config.globalProperties[key]
}
</script>

# .vue
<script setup>
import { getCurrentInstance } from 'vue'
const global = getCurrentInstance().appContext.config.globalProperties
// 得到 $route、$router、$store、$http ...

使用自定义Hooks方法访问全局数据
const $store = useGlobal('$store')
console.log('store', $store)
</script>
```

### provide，inject 其他使用方式

::: warning :zap: provide，inject 其他使用方式
使用 `provide` 和 `inject` 这两个组合 API 可以组件树中传递数据  
除此之外，还可以应用级别的 `app.provide()` 来注入全局数据，那么在编写插件，还有类库的时如果使用 `app.provide()` 尤其有用，可以替代 <FontColor text="app.config.globalProperties" color="pink"/>
:::

```vue
# main.ts const app = createApp(App) app.provide('global', { msg: 'Hello World',
foo: [1,2,3,4] }) # 在组件中使用
<script setup>
import { inject } from 'vue'
const global = inject('global')
</script>
```

### nextTick 的改进

::: warning :zap: nextTick 的改进
在 Vue2 中，<FontColor text="Vue.nextTick()"/> 或 <FontColor text="this.$nextTick"/> 不能支持 Webpack 的 `Tree-Shaking` 功能  
在 Vue3 中的 `nextTick` ，考虑到了对 `Tree-Shaking` 的支持  
:::

```vue
<template>
  <div v-html="content"></div>
</template>

<script setup>
import { ref, watchPostEffect, nextTick } from 'vue'
const content = ref('')
watchPostEffect(() => {
  content.value = `<div id='box'>动态HTML字符串</div>`
  // 在nextTick中访问并操作DOM
  nextTick(() => {
    const box = document.getElementById('box')
    box.style.color = 'red'
    box.style.textAlign = 'center'
  })
})
</script>
```

### 无需手动添加 key 的优化

::: warning :zap: 无需手动添加 key 的优化
Vue3 中，对于 <FontColor text="v-if/v-else/v-else-if"/> 的各分支项，无须再手动绑定 <FontColor text="key"/> 了， Vue3 会自动生成唯一的 `key` 因此，在使用过渡动画 `<transition>` 对多个节点进行显示隐藏时，也无须手动加 `key` 了
:::

```vue
<template>
  <!-- 使用<teleport>组件，把animate.css样式插入到head标签中去 -->
  <teleport to="head">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.css"
    />
  </teleport>
  <!-- 使用<transition>过渡动画，无须加key了 -->
  <transition
    enter-active-class="animate__animated animate__zoomIn"
    leave-active-class="animate__animated animate__zoomOutUp"
    mode="out-in"
  >
    <h1 v-if="bol">不负当下</h1>
    <h1 v-else>不畏未来</h1>
  </transition>
  <button @click="bol = !bol">Toggle</button>
</template>

<script setup>
import { ref } from 'vue'
const bol = ref(true)
</script>
```

### createApp 的变化

::: warning :zap: createApp 的变化
在 Vue2 中，使用 <FontColor text="propsData" color="pink"/> 选项，可以实现在 <FontColor text="new Vue()"/> 时向根组件传递 <FontColor text="props"/> 数据  
在 Vue3 中，<FontColor text="propsData" color="pink"/> 选项 被淘汰了  
替代方案是：使用 `createApp` 的第二个参数，在 <FontColor text="app"/> 实例创建时向根组件传入 `props` 数据
:::

```vue
# main.ts import { createApp } from 'vue' import App from './App.vue' //
使用第二参数，向App传递自定义属性 const app = createApp(App, { name:'vue3' })
app.mount('#app') // 挂载 # App.vue
<script setup>
import { defineProps } from 'vue'
// 接收 createApp() 传递过来的自定义属性
const props = defineProps({
  name: { type: String, default: '' },
})
console.log('app props', props)
</script>
```

::: warning :zap: render 函数的变化
在 Vue2 中，组件有一个 <FontColor text="render"/> 选项（它本质上是一个渲染函数，这个渲染函数的形参是 h 函数），`h` 函数相当于 React 中的 <FontColor text="createElement()"/> , 在 Vue3 `render` 函数选项发生了变化：它的形参不再是 `h` 函数了 ，变成了一个 **全局 API**，须导入后才能使用
:::

```ts
import { createApp, h } from 'vue'
import App from './App.vue'

const app = createApp(
  {
    render() {
      return h(App)
    },
  },
  { name: 'vue3' }
)
app.$mount('#app')
```

### \<suspense> 异步组件加载

::: warning :zap: \<suspense> 异步组件加载
Vue3 中新增了内置组件 `<suspense>`，它类似 <FontColor text="React.Suspense"/> 一样，用于给异步组件加载时，指定 Loading 指示器需要注意的是，这个新特征尚未正式发布，其 API 可能随时会发生变动
:::

```vue
<template>
  <suspense>
    <!-- 用name='default'默认插槽加载异步组件 -->
    <AsyncChild />
    <!-- 异步加载成功前的loading 交互效果 -->
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const AsyncChild = defineAsyncComponent({
  loader: () => import('./components/Child.vue'),
  delay: 200,
  timeout: 3000,
})
</script>
```

### \<transition> 的变化

::: warning :zap: \<transition> 的变化
Vue3 中，过渡动画 `<transition>` 发生了一系列变化  
之前的 <FontColor text="v-enter" color="pink"/> 变成了现在的 `v-enter-from` ， 之前的 <FontColor text="v-leave" color="pink"/> 变成了现在的 `v-leave-from`  
另一个变化是：当使用 `<transition>` 作为根结点的组件，从外部被切换时将不再触发过渡效果
:::

```vue
<template>
  <transition name="fade">
    <h1 v-if="bol">但使龙城飞将在，不教胡马度阴山！</h1>
  </transition>
  <button @click="bol = !bol">切换</button>
</template>

<script setup>
import { ref } from 'vue'
const bol = ref(true)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  color: red;
}
.fade-enter-active {
  transition: all 1s ease;
}
.fade-enter-to {
  opacity: 1;
  color: black;
}

.fade-leave-from {
  opacity: 1;
  color: black;
}
.fade-leave-active {
  transition: all 1.5s ease;
}
.fade-leave-to {
  opacity: 0;
  color: blue;
}
</style>
```

### : 或 v-bind 属性绑定的变化

::: warning :zap: : 或 v-bind 属性绑定的变化
在 Vue2 中，静态属性和动态属性同时使用时，不确定最终哪个起作用  
在 Vue3 中，这是可以确定的 :bulb:  
\- 当动态属性使用 `:title` 方式绑定时，谁在前面谁起作用  
\- 当动态属性使用 `v-bind='object'` 方式绑定时，谁在后面谁起作用  
:::

```vue
<template>
  <!-- 这种写法，同时绑定静态和动态属性时，谁在前面谁生效！ -->
  <div id="red" :id="'blue'">不负当下</div>
  <div :title="'hello'" title="world">不畏未来</div>
  <hr />
  <!-- 这种写法，同时绑定静态和动态属性时，谁在后面谁生效！ -->
  <div id="red" v-bind="{ id: 'blue' }">不负当下</div>
  <div v-bind="{ title: 'hello' }" title="world">不畏未来</div>
</template>
```

### watch 常用配置参数

::: warning :zap: watch 常用的配置参数 deep
当使用 `watch` 选项侦听数组时，只有在数组被替换时才会触发回调，换句话说，在数组被改变时侦听回调将不再被触发，要想在数组被改变时触发侦听回调，必须指定 `deep` 选项
:::

```vue
<template>
  <div v-for="t in list" v-text="t.task"></div>
  <button @click.once="addTask">添加任务</button>
</template>

<script setup>
import { reactive, watch } from 'vue'
const list = reactive([
  { id: 1, task: '读书', value: 'book' },
  { id: 2, task: '跑步', value: 'running' },
])
const addTask = () => {
  list.push({ id: 3, task: '学习', value: 'study' })
}
// 当无法监听一个引用类型的变量时
// 添加第三个选项参数 { deep:true }
watch(
  list,
  () => {
    console.log('list changed', list)
  },
  { deep: true }
)
</script>
```

### props 的变化和 inject 的亲近

::: warning :zap: props 的变化和 inject 的亲近
在 Vue2 中接收 <FontColor text="props"/> 时，如果 prop 的默认值是工厂函数，那么在这个工厂函数里是有 <FontColor text="this"/> 的  
在 Vue3 中生成 `props` 时 ，prop 默认值的工厂函数不再能访问 <FontColor text="this"/> 了，但是却意外可以访问 `inject`
:::

```vue
<template>
  <!-- v-for循环一个对象 -->
  <div v-for="(v, k, i) in info">
    <span v-text="i"></span> - <span v-text="k"></span> -
    <span v-text="v"></span>
  </div>

  <!-- v-for循环一个数组 -->
  <div v-for="n in list" v-text="n"></div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
// 为该 prop 指定一个 default 默认值时，
// 如果是对象或数组类型，默认值必须从一个工厂函数返回。
const props = defineProps({
  info: {
    type: Object,
    default() {
      // 在Vue3中，这里是没有this的，但可以访问inject
      console.log('this', this) // null
      return inject('info', { name: '张三', age: 10 })
    },
  },
  list: {
    type: Array,
    default() {
      return inject('list', [1, 2, 3, 4])
    },
  },
})
</script>
```

### \<teleport> 组件

::: warning :zap: \<teleport> 组件
Vue3 中，新增了 `<teleport>` 组件，这相当于 <FontColor text="ReactDOM.createPortal()"/>，它的作用是把指定的元素或组件渲染到任意父级作用域的其它 DOM 节点上，`<teleport>` 还常用于封装 Modal 弹框组件，如下栗
:::

```vue
# Modal.vue

<template>
  <!-- 当Modal弹框显示时，将其插入到<body>标签中去 -->
  <teleport to="body">
    <div class="layer" v-if="visibled" @click.self="cancel">
      <div class="modal">
        <header></header>
        <main><slot></slot></main>
        <footer></footer>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits, toRefs } from 'vue'
const props = defineProps({
  visibled: { type: Boolean, default: false },
})
const emit = defineEmits(['cancel'])
const cancel = () => emit('cancel')
</script>

<style lang="scss">
.layer {
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal {
    width: 520px;
    position: absolute;
    top: 100px;
    left: 50%;
    margin-left: -260px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 3px;
    background-color: white;
  }
}
</style>
```

## v-model 和 v-if，v-for 组合的变化

::: danger :key: v-model 指令的变化和使用

- 在 Vue2 中，<FontColor text="v-model"/> 等价于 <FontColor text=":value + @input"/>
- 在 Vue3 中，移除了 <FontColor text="model" color="pink"/> 选项，移除了 v-bind 指令的 <FontColor text=".sync" color="pink"/> 修饰符
- 在 Vue3 中，`v-model` 等价于 `:modelValue + @update:modelValue`
- 在 Vue3 中，同一个组件上可以同时使用多个 `v-model`
- 在 Vue3 中，还可以自定义 `v-model` 的修饰符
  :::

封装带有多个 v-model 的自定义组件：

```vue
# GoodFilter.vue

<template>
  <span>请选择商家（多选）：</span>
  <span v-for="s in shopArr">
    <input
      type="checkbox"
      :value="s.value"
      :checked="shop.includes(s.value)"
      @change="shopChange"
    />
    <span v-text="s.label"></span> </span
  ><br />

  <span>请选择价格（单选）：</span>
  <span v-for="p in priceArr">
    <input
      type="radio"
      :value="p.value"
      :checked="p.value === price"
      @change="priceChange"
    />
    <span v-text="p.label"></span>
  </span>
</template>

<script setup>
import { reactive, defineProps, defineEmits, toRefs } from 'vue'

const props = defineProps({
  shop: { type: Array, default: [] },
  // 接收v-model:shop的自定义修饰符
  shopModifiers: { default: () => ({}) },
  price: { type: Number, default: 500 },
  // 接收v-model:price的自定义修饰符
  priceModifiers: { default: () => ({}) },
})
const { shop, price } = toRefs(props)
// 接收v-model的自定义事件
const emit = defineEmits(['update:shop', 'update:price'])

const shopArr = reactive([
  { id: 1, label: '华为', value: 'huawei' },
  { id: 2, label: '小米', value: 'mi' },
  { id: 3, label: '魅族', value: 'meizu' },
  { id: 4, label: '三星', value: 'samsung' },
])
const priceArr = reactive([
  { id: 1, label: '1000以下', value: 500 },
  { id: 2, label: '1000~2000', value: 1500 },
  { id: 3, label: '2000~3000', value: 2500 },
  { id: 4, label: '3000以上', value: 3500 },
])

// 多选框
const shopChange = (ev) => {
  const { checked, value } = ev.target
  // 使用v-model:shop的自定义修饰符
  const { sort } = props.shopModifiers
  let newShop = checked
    ? [...shop.value, value]
    : shop.value.filter((e) => e !== value)
  if (sort) newShop = newShop.sort()
  emit('update:shop', newShop)
}
// 单选框
const priceChange = (ev) => {
  emit('update:price', Number(ev.target.value))
}
</script>

<style lang="scss" scoped>
.nav {
  & > span {
    display: inline-block;
    padding: 5px 15px;
  }
  & > span.on {
    color: red;
  }
}
</style>
```

使用带有多个 v-model 的自定义组件：

```vue
<template>
  <GoodFilter v-model:shop.sort="shop" v-model:price="price" />
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import GoodFilter from './components/GoodFilter.vue'
const shop = ref([])
const price = ref(500)

watch([shop, price], () => {
  console.log('changed', shop.value, price.value)
})
</script>
```

::: danger :rocket: v-for，v-if 组合使用

> <ElCard shadow="hover">同一节点上使用 v-for 和 v-if ，在 Vue2 中不推荐这么用，且 v-for 优先级更高。在 Vue3 中，这种写法是允许的，但 v-if 的优秀级更高。</ElCard>

:::

## 废弃的 API

:x: <FontColor text="$children (已移除)" color="pink"/>
<ElCard shadow="never">
<span style="color:#e2dfe0">Vue3 中，移除了 $children 属性，要想访问子组件只能使用 ref 来实现了在 Vue2 中，我们使用 $children 可以方便地访问到子组件，在组件树中 “肆意” 穿梭</span>
</ElCard>

:x: <FontColor text="$on / $off / $once (都已移除)" color="pink"/>
<ElCard shadow="never">
<span style="color:#e2dfe0">Vue3 中 移除了 $on / $off / $once 这三个事件 API，只保留了 $emit</span>
</ElCard>

:x: <FontColor text="Vue.filter (已移除)" color="pink"/>
<ElCard shadow="never">
<span style="color:#e2dfe0">移除了全局过滤器（Vue.filter）、移除了局部过滤器 filters 选项取而代之，你可以封装自定义函数或使用 computed 计算属性来处理数据</span>
</ElCard>

:x: <FontColor text="Vue.config.keyCodes(已移除)" color="pink"/>
<ElCard shadow="never">
<span style="color:#e2dfe0">在 Vue2 中，使用 Vue.config.keyCodes 可以修改键盘码，这在 Vue3 中已经淘汰了</span>
</ElCard>

:x: <FontColor text="$listeners(已移除)" color="pink"/>
<ElCard shadow="never">
<span style="color:#e2dfe0">Vue3 中，$listeners 被移除了因此我们无法再使用 $listeners 来访问、调用父组件给的自定义事件了</span>
</ElCard>

:x: <FontColor text=".native(已移除)" color="pink"/>
<ElCard shadow="never">
<span style="color:#e2dfe0">Vue3 中，v-on 的.native 修饰符已被移除</span>
</ElCard>

<ElDivider></ElDivider>

<!-- 评论 -->
<ClientOnly>
  <GitalkComment
    :issueId="15"
  />
</ClientOnly>
<!-- 评论 -->
