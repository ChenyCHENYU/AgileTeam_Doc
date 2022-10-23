---
layout: Vue3ComponentWriting
title: Vue3 Component Writing Method
outline: 'deep'
---

<script setup>
// import Code from '_c/Code.vue'

</script>

# 初探 Vue3 编写组件的三种方式

## 选项式写法（丢弃）

> 在 Vue 3.0 的 .vue 组件里，遵循 SFC 规范要求（注：SFC，即 Single-File Component，.vue 单组件），标准的 <Code text="setup"/> 用法是，在 <Code text="setup"/> 里面定义的数据如果需要在 template 使用，都需要 <Code text="return"/> 出来

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

## 组合式写法（推荐）

> 语法糖 <Code text="<script-setup>"/> 推出是为了让熟悉 3.0 的用户可以更高效率的开发组件，减少一些心智负担，只需要给 <Code text="script"/> 标签添加一个 <Code text="setup"/> 属性，那么整个 <Code text="script"/> 就直接会变成 <Code text="setup"/> 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 <Code text="return"/> 了），代码量大幅度减少

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

## jsx 写法（扩展）

> JSX 使自定义 Vue 组件更容易导入和管理，灵活扩展性更强，可以使用 JSX 来单独维护数据交互层，比 <Code text="render"/> 更清晰直观

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

<!-- 评论 -->
<ClientOnly>
  <GitalkComment
    :issueId="163"
  />
</ClientOnly>
<!-- 评论 -->
