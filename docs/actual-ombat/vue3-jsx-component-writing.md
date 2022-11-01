---
layout: Vue3JSXComponentWriting
title: Vue3 JSX Component Writing Method
outline: 'deep'
---

<script setup>
// import Code from '_c/Code.vue'

</script>

# 初探 Vue3 JSX 编写组件的场景

> 开始之前，先回顾一下 Vue3 中几种组件编写方式。  
> 侧重点则着重介绍 JSX 使用场景和使用方法，下文 示离 JSX，TSX 一致，统称为 JSX。

## 选项式写法（丢弃）

在 Vue 3.0 的 .vue 组件里，遵循 SFC 规范要求（注：SFC，即 **Single-File Component**，.vue 单组件），标准的 <Code text="setup"/> 用法是，在 `setup` 里面定义的数据如果需要在 `template` 使用，都需要 `return` 出来。

```vue
<template>
  <h1>页面组件</h1>
  <h1 v-text="num"></h1>
  <button @click="add">自增</button>
  <button @click="sub">自减</button>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {}, // 接收自定义属性
  setup(props, context) {
    console.log('----setup', props)
    console.log('----setup', context)
    const num = ref(1)
    const add = () => {
      num.value++
    }
    return { num, add }
  },
  methods: {
    sub() {
      this.num--
    },
  },
  mounted() {
    console.log('---mounted')
  },
}
</script>
```

:eyes: 详细使用请回顾 [单组件的编写](../introduction/component#md) 内容板块。

## 组合式写法（推荐）

Vue 3.2 语法糖 `<script-setup>` 推出是为了让熟悉 3.0 的用户可以更高效率的开发组件，减少一些心智负担，只需要给 `script` 标签添加一个 `setup` 属性，那么整个 `script` 就直接会变成 `setup` 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 `return` 了），代码量大幅度减少。

```vue
<script setup>
import { ref } from 'vue'
const num = ref(1)
const add = () => {
  num.value++
}
</script>

<template>
  <h1>页面组件</h1>
  <h1 v-text="num"></h1>
  <button @click="add">自增</button>
</template>
```

:eyes: 详细使用请回顾 [Vue3.2 语法糖](../introduction/efficient#md) 内容板块。

## JSX 写法（扩展）

> JSX 使自定义 Vue 组件更容易导入和管理，灵活扩展性更强，可以使用 JSX 来单独维护数据交互层，比 <Code text="render"/> 更清晰直观。

先看个简单栗子：

```jsx
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent((props) => {
  const num = ref(1)
  const add = () => {
    num.value++
  }

  // 监听器
  watch(num, () => {
    console.log('---num changed', num.value)
  })

  // 计算属性
  const total = computed(() => num.value * 1000)

  return () => (
    <div>
      <h1>页面组件</h1>
      <h1>{num.value}</h1>
      <h1>{total.value}</h1>
      <button onClick={add}>自增</button>
    </div>
  )
})
```

... 给我点时间，我慢慢写好伐 ...

<!-- 评论 -->
<ClientOnly>
  <GitalkComment
    :issueId="163"
  />
</ClientOnly>
<!-- 评论 -->
