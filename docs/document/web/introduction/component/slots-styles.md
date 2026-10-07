# 插槽与样式

---
title: "插槽与样式"
outline: "deep"
description: "Vue3 插槽与 CSS 样式、预处理器"
---

## 插槽

Vue 在使用子组件的时候，子组件在 template 里类似一个 HTML 标签，可以在这个子组件标签里传入任意模板代码以及 HTML 代码，这个功能就叫做 “插槽” 。

### 默认插槽

默认情况下，子组件使用 `<slot />` 标签即可渲染父组件传下来的插槽内容，例如：

在父组件这边：

```vue{4}
<template>
  <!-- 注意这里，子组件标签里面传入了 HTML 代码 -->
  <Child>
    <p>这是插槽内容</p>
  </Child>
  <!-- 注意这里，子组件标签里面传入了 HTML 代码 -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Child from '@cp/Child.vue'

export default defineComponent({
  components: {
    Child,
  },
})
</script>
```

在子组件这边：

```vue{2}
<template>
  <slot />
</template>
```

默认插槽非常简单，一个 `<slot />` 就可以了。

### 具名插槽

有时候可能需要指定多个插槽，例如一个子组件里有 “标题” 、 “作者”、 “内容” 等预留区域可以显示对应的内容，这时候就需要用到具名插槽来指定不同的插槽位。

子组件通过 `name` 属性来指定插槽名称：

```vue{4,10,16}
<template>
  <!-- 显示标题的插槽内容 -->
  <div class="title">
    <slot name="title" />
  </div>
  <!-- 显示标题的插槽内容 -->

  <!-- 显示作者的插槽内容 -->
  <div class="author">
    <slot name="author" />
  </div>
  <!-- 显示作者的插槽内容 -->

  <!-- 其他插槽内容放到这里 -->
  <div class="content">
    <slot />
  </div>
  <!-- 其他插槽内容放到这里 -->
</template>
```

父组件通过 `template` 标签绑定 `v-slot:name` 格式的属性，来指定传入哪个插槽里：

```vue{4,10}
<template>
  <Child>
    <!-- 传给标题插槽 -->
    <template v-slot:title>
      <h1>这是标题</h1>
    </template>
    <!-- 传给标题插槽 -->

    <!-- 传给作者插槽 -->
    <template v-slot:author>
      <h1>这是作者信息</h1>
    </template>
    <!-- 传给作者插槽 -->

    <!-- 传给默认插槽 -->
    <p>这是插槽内容</p>
    <!-- 传给默认插槽 -->
  </Child>
</template>
```

`v-slot:name` 有一个别名 `#name` 语法，上面父组件的代码也相当于：

```vue{4,10}
<template>
  <Child>
    <!-- 传给标题插槽 -->
    <template #title>
      <h1>这是标题</h1>
    </template>
    <!-- 传给标题插槽 -->

    <!-- 传给作者插槽 -->
    <template #author>
      <h1>这是作者信息</h1>
    </template>
    <!-- 传给作者插槽 -->

    <!-- 传给默认插槽 -->
    <p>这是插槽内容</p>
    <!-- 传给默认插槽 -->
  </Child>
</template>
```

:::tip
在使用具名插槽的时候，子组件如果不指定默认插槽，那么在具名插槽之外的内容将不会被渲染。
:::

### 默认内容

可以给 `slot` 标签添加内容，例如 `<slot>默认内容</slot>` ，当父组件没有传入插槽内容时，会使用默认内容来显示，默认插槽和具名插槽均支持该功能。

### 注意事项

有一条规则需要记住：

- 父组件里的所有内容都是在父级作用域中编译的
- 子组件里的所有内容都是在子作用域中编译的

## CSS 样式与预处理器

Vue 组件的 CSS 样式部分，Vue 3 保留着和 Vue 2 完全一样的写法。

### 编写组件样式表

最基础的写法，就是在 Vue 文件里创建一个 `style` 标签，即可在里面写 CSS 代码了。

```vue
<style>
.msg {
  width: 100%;
}
.msg p {
  color: #333;
  font-size: 14px;
}
</style>
```

### 动态绑定 CSS

动态绑定 CSS ，Vue 2 就在用了，在此之前常用的是 `:class` 和 `:style` ，现在在 Vue 3 ，还可以通过 `v-bind` 来动态修改了。

其实这一部分主要是想介绍一下 Vue 3 新增的 `<style> v-bind` 功能，不过既然写到这里，就把另外两个动态绑定方式也一起回归一下。

#### 使用 :class 动态修改样式名

它是绑定在 DOM 元素上面的一个属性，跟 `class` 同级别，它非常灵活！

:::tip
使用 `:class` 是用来动态修改样式名，也就意味着必须提前把样式名对应的样式表先写好！
:::

假设已经提前定义好了这几个变量：

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const activeClass = 'active-class'
    const activeClass1 = 'active-class1'
    const activeClass2 = 'active-class2'
    const isActive = true

    return {
      activeClass,
      activeClass1,
      activeClass2,
      isActive,
    }
  },
})
</script>
```

如果只想绑定一个单独的动态样式，可以传入一个字符串：

```vue
<template>
  <p :class="activeClass">Hello World!</p>
</template>
```

如果有多个动态样式，也可以传入一个数组：

```vue
<template>
  <p :class="[activeClass1, activeClass2]">Hello World!</p>
</template>
```

还可以对动态样式做一些判断，这个时候传入一个对象：

```vue
<template>
  <p :class="{ 'active-class': isActive }">Hello World!</p>
</template>
```

多个判断的情况下，记得也用数组套起来：

```vue
<template>
  <p :class="[{ activeClass1: isActive }, { activeClass2: !isActive }]">
    Hello World!
  </p>
</template>
```

那么什么情况下会用到 `:class` 呢？

最常见的场景，应该就是导航、选项卡了，比如要给一个当前选中的选项卡做一个突出高亮的状态，那么就可以使用 `:class` 来动态绑定一个样式。

```vue
<template>
  <ul class="list">
    <li
      class="item"
      :class="{ cur: index === curIndex }"
      v-for="(item, index) in 5"
      :key="index"
      @click="curIndex = index"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const curIndex = ref<number>(0)

    return {
      curIndex,
    }
  },
})
</script>

<style scoped>
.cur {
  color: red;
}
</style>
```

这样就简单实现了一个点击切换选项卡高亮的功能。

#### 使用 :style 动态修改内联样式

如果觉得使用 `:class` 需要提前先写样式，再去绑定样式名有点繁琐，有时候只想简简单单的修改几个样式，那么可以通过 `:style` 来处理。

默认的情况下，都是传入一个对象去绑定：

- `key` 是符合 CSS 属性名的 “小驼峰式” 写法，或者套上引号的短横线分隔写法（原写法），例如在 CSS 里，定义字号是 `font-size` ，那么需要写成 `fontSize` 或者 `'font-size'` 作为它的键。

- `value` 是 CSS 属性对应的 “合法值”，比如要修改字号大小，可以传入 `13px` 、`0.4rem` 这种带合法单位字符串值，但不可以是 `13` 这样的缺少单位的值，无效的 CSS 值会被过滤不渲染。

```vue
<template>
  <p
    :style="{
      fontSize: '13px',
      'line-height': 2,
      color: '#ff0000',
      textAlign: 'center',
    }"
  >
    Hello World!
  </p>
</template>
```

如果有些特殊场景需要绑定多套 `style`，需要在 `script` 先定义好各自的样式变量（也是符合上面说到的那几个要求的对象），然后通过数组来传入：

```vue
<template>
  <p :style="[style1, style2]">Hello World!</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const style1 = {
      fontSize: '13px',
      'line-height': 2,
    }
    const style2 = {
      color: '#ff0000',
      textAlign: 'center',
    }

    return {
      style1,
      style2,
    }
  },
})
</script>
```

#### 使用 v-bind 动态修改 style ~new

当然，以上两种形式都是关于 `<script />` 和 `<template />` 部分的相爱相杀，如果觉得会给的模板带来一定的维护成本的话，不妨考虑这个新方案，将变量绑定到 `<style />` 部分去。

:::tip
请注意这是一个在 `3.2.0` 版本之后才被归入正式队列的新功能！

如果需要使用它，请确保的 `vue` 和 `@vue/compiler-sfc` 版本号在 `3.2.0` 以上，最好是保持最新的 `@next` 版本。
:::

先来看看基本的用法：

```vue
<template>
  <p class="msg">Hello World!</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fontColor = ref<string>('#ff0000')

    return {
      fontColor,
    }
  },
})
</script>

<style scoped>
.msg {
  color: v-bind(fontColor);
}
</style>
```

如上面的代码，将渲染出一句红色文本的 `Hello World!`

这其实是利用了现代浏览器支持的 CSS 变量来实现的一个功能（所以如果打算用它的话，需要提前注意一下兼容性噢，点击查看：[CSS Variables 兼容情况](https://caniuse.com/css-variables)）

它渲染到 DOM 上，其实也是通过绑定 `style` 来实现，可以看到渲染出来的样式是：

```html
<p class="msg" data-v-7eb2bc79="" style="--7eb2bc79-fontColor:#ff0000;">
  Hello World!
</p>
```

对应的 CSS 变成了：

```css
.msg[data-v-7eb2bc79] {
  color: var(--7eb2bc79-fontColor);
}
```

理论上 `v-bind` 函数可以在 Vue 内部支持任意的 JS 表达式，但由于可能包含在 CSS 标识符中无效的字符，因此官方是建议在大多数情况下，用引号括起来，如：

```css
.text {
  font-size: v-bind('theme.font.size');
}
```

由于 CSS 变量的特性，因此对 CSS 响应式属性的更改不会触发模板的重新渲染（这也是和 `:class` 与 `:style` 的最大不同）。

:::tip
不管有没有开启 [\<style scoped\>](#style-scoped) ，使用 `v-bind` 渲染出来的 CSS 变量，都会带上 `scoped` 的随机 hash 前缀，避免样式污染（永远不会意外泄漏到子组件中），所以请放心使用！
:::

如果对 CSS 变量的使用还不是很了解的话，可以先阅读一下相关的基础知识点。

相关阅读：[使用 CSS 自定义属性（变量） - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

### 样式表的组件作用域

CSS 不像 JS ，是没有作用域的概念的，一旦写了某个样式，直接就是全局污染。所以 [BEM 命名法](https://www.bemcss.com/) 等规范才应运而生。

但在 Vue 组件里，有两种方案可以避免出现这种污染问题。

一个是 Vue 2 就有的 `<style scoped>` ，一个是 Vue 3 新推出的 `<style module>` 。

#### style scoped

Vue 组件在设计的时候，就想到了一个很优秀的解决方案，通过 `scoped` 来支持创建一个 CSS 作用域，使这部分代码只运行在这个组件渲染出来的虚拟 DOM 上。

使用方式很简单，只需要在 `style` 后面带上 `scoped` 属性。

```vue
<style scoped>
.msg {
  width: 100%;
}
.msg p {
  color: #333;
  font-size: 14px;
}
</style>
```

编译后，虚拟 DOM 都会带有一个 `data-v-xxxxx` 这样的属性，其中 `xxxxx` 是一个随机生成的 hash ，同一个组件的 hash 是相同并且唯一的：

```html
<div class="msg" data-v-7eb2bc79>
  <p data-v-7eb2bc79>Hello World!</p>
</div>
```

而 CSS 则也会带上与 HTML 相同的属性，从而达到样式作用域的目的。

```css
.msg[data-v-7eb2bc79] {
  width: 100%;
}
.msg p[data-v-7eb2bc79] {
  color: #333;
  font-size: 14px;
}
```

使用 `scoped` 可以有效的避免全局样式污染，可以在不同的组件里面都使用相同的 className，而不必担心会相互覆盖，不必再定义很长很长的样式名来防止冲突了。

:::tip
添加 `scoped` 生成的样式，只作用于当前组件中的元素，并且权重高于全局 CSS ，可以覆盖全局样式
:::

#### style module ~new

这是在 Vue 3 才推出的一个新方案，和 `<style scoped>` 不同，scoped 是通过给 DOM 元素添加自定义属性的方式来避免冲突，而 `<style module>` 则更为激进，将会编译成 [CSS Modules](https://github.com/css-modules/css-modules) 。

对于 CSS Modules 的处理方式，也可以通过一个小例子来更直观的了解它：

```css
/* 编译前 */
.title {
  color: red;
}

/* 编译后 */
._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```

可以看出，是通过比较 “暴力” 的方式，把编写的 “好看的” 样式名，直接改写成一个随机 hash 样式名，来避免样式互相污染。

> 上面的案例来自阮老师的博文 [CSS Modules 用法教程](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)

所以回到 Vue 这边，看看 `<style module>` 是怎么操作的。

```vue
<template>
  <p :class="$style.msg">Hello World!</p>
</template>

<style module>
.msg {
  color: #ff0000;
}
</style>
```

于是，将渲染出一句红色文本的 `Hello World!` 。

:::tip

1. 使用这个方案，需要了解如何 [使用 :class 动态修改样式名](#使用-class-动态修改样式名)

2. 如果单纯只使用 `<style module>` ，那么在绑定样式的时候，是默认使用 `$style` 对象来操作的

3. 必须显式的指定绑定到某个样式，比如 `$style.msg` ，才能生效

4. 如果单纯的绑定 `$style` ，并不能得到 “把全部样式名直接绑定” 的期望结果

5. 如果指定的 className 是短横杆命名，比如 `.user-name` ，那么需要通过 `$style['user-name']` 去绑定
   :::

也可以给 `module` 进行命名，然后就可以通过命名的 “变量名” 来操作：

```vue
<template>
  <p :class="classes.msg">Hello World!</p>
</template>

<style module="classes">
.msg {
  color: #ff0000;
}
</style>
```

:::tip
需要注意的一点是，一旦开启 `<style module>` ，那么在 `<style module>` 里所编写的样式，都必须手动绑定才能生效，没有被绑定的样式，会被编译，但不会主动生效到的 DOM 上。

原因是编译出来的样式名已经变化，而的 DOM 未指定对应的样式名，或者指定的是编译前的命名，所以并不能匹配到正确的样式。
:::

#### useCssModule ~new

这是一个全新的 API ，面向在 script 部分操作 CSS Modules 。

在上面的 [CSS Modules](#style-module-new) 部分可以知道，可以在 `style` 定义好样式，然后在 `template` 部分通过变量名来绑定样式。

那么如果有一天有个需求，需要通过 `v-html` 来渲染 HTML 代码，那这里的样式岂不是凉凉了？当然不会！

Vue 3 提供了一个 Composition API `useCssModule` 来帮助在 `setup` 函数里操作的 CSS Modules （对，只能在 [setup](./index.md#全新的-setup-函数-new) 或者 [script setup](../efficient.md#script-setup-new) 里使用）。

**基本用法：**

绑定多几个样式，再来操作：

```vue
<template>
  <p :class="$style.msg">
    <span :class="$style.text">Hello World!</span>
  </p>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  setup() {
    const style = useCssModule()
    console.log(style)
  },
})
</script>

<style module>
.msg {
  color: #ff0000;
}
.text {
  font-size: 14px;
}
</style>
```

可以看到打印出来的 `style` 是一个对象：

- `key` 是在 `<style modules>` 里定义的原始样式名

- `value` 则是编译后的新样式名

```js
{
  msg: 'home_msg_37Xmr',
  text: 'home_text_2woQJ'
}
```

所以来配合 [模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals) 的使用，刚刚介绍的，通过 `v-html` 渲染出来的内容应该如何绑定样式：

```vue
<template>
  <div v-html="content"></div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  setup() {
    // 获取样式
    const style = useCssModule()

    // 编写模板内容
    const content = `<p class="${style.msg}">
      <span class="${style.text}">Hello World! —— from v-html</span>
    </p>`

    return {
      content,
    }
  },
})
</script>

<style module>
.msg {
  color: #ff0000;
}
.text {
  font-size: 14px;
}
</style>
```

是不是也非常简单？可能刚开始不太习惯，但写多几次其实也蛮好玩的这个功能！

**另外，需要注意的是，如果是指定了 modules 的名称，那么必须传入对应的名称作为入参才可以正确拿到这些样式：**

比如指定了一个 classes 作为名称：

```vue
<style module="classes">
/* ... */
</style>
```

那么需要通过传入 classes 这个名称才能拿到样式，否则会是一个空对象：

```ts
const style = useCssModule('classes')
```

:::tip
在 `const style = useCssModule()` 的时候，命名是随意的，跟在 `<style module="classes">` 这里指定的命名没有关系。
:::

### 深度操作符 ~new

在 [样式表的组件作用域](#样式表的组件作用域) 部分了解到，使用 scoped 后，父组件的样式将不会渗透到子组件中，但也不能直接修改子组件的样式。

如果确实需要进行修改子组件的样式，必须通过 `::v-deep`（完整写法） 或者 `:deep`（快捷写法） 操作符来实现。

:::tip

1. 旧版的深度操作符是 `>>>` 、 `/deep/` 和 `::v-deep`，现在 `>>>` 和 `/deep/` 已进入弃用阶段（虽然暂时还没完全移除）

2. 同时需要注意的是，旧版 `::v-deep` 的写法是作为组合器的方式，写在样式或者元素前面，如：`::v-deep .class-name { /* ... */ }`，现在这种写法也废弃了。
   :::

现在不论是 `::v-deep` 还是 `:deep` ，使用方法非常统一，来假设 .b 是子组件的样式名：

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

编译后：

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
可以看到，新的 deep 写法是作为一个类似 JS “函数” 那样去使用，需要深度操作的样式或者元素名，作为 “入参” 去传入。
:::

同理，如果使用 Less 或者 Stylus 这种支持嵌套写法的预处理器，也是可以这样去深度操作的：

```less
.a {
  :deep(.b) {
    /* ... */
  }
}
```

另外，除了操作子组件的样式，那些通过 `v-html` 创建的 DOM 内容，也不受作用域内的样式影响，也可以通过深度操作符来实现样式修改。

### 使用 CSS 预处理器

在工程化的现在，可以说前端都几乎不写 CSS 了，都是通过 `sass`、`less`、`stylus` 等 CSS 预处理器来完成样式的编写。

为什么要用 CSS 预处理器？放一篇关于三大预处理器的点评，新开发者可以做个简单了解，具体的用法在对应的官网上有非常详细的说明。

可以查看了解：[浅谈 css 预处理器，Sass、Less 和 Stylus](https://zhuanlan.zhihu.com/p/23382462)

在 Vue 组件里使用预处理器非常简单，`Vue CLI`内置了 `stylus`，如果打算使用其他的预处理器，需要先安装。

这里以 `stylus` 为例，只需要通过 `lang="stylus"` 属性来指定使用哪个预处理器，即可直接编写对应的代码：

```vue
<style lang="stylus">
// 定义颜色变量
$color-black = #333
$color-red = #ff0000

// 编写样式
.msg
  width 100%
  p
    color $color-black
    font-size 14px
    span
      color $color-red
</style>
```

编译后的 css 代码：

```css
.msg {
  width: 100%;
}
.msg p {
  color: #333;
  font-size: 14px;
}
.msg p span {
  color: #ff0000;
}
```

预处理器也支持 `scoped`，用法请查阅 [样式表的组件作用域](#样式表的组件作用域) 部分。
