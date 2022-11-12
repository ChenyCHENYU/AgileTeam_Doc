---
outline: 'deep'
---

# C_Icon

> 在 `ElementPlus` 基础上进行了拓展，下方提供了一些使用场景，但建议直接通过 `C_Icon` 进行图标的使用。

## Usage

`<C_Icon iconName="icon name"/>`

### Props

| 属性          | 类型     | 默认值 | 说明         |
| ------------- | -------- | ------ | ------------ |
| iconName      | `string` | ''     | 图标名称     |
| color         | `string` | black  | 图标颜色     |
| size          | `number` | 18     | 图标大小     |
| iconClassName | `string` | -      | 图标样式定义 |
| outside       | `string` | false  | 是否外部图标 |

### Interface

```ts
interface Props {
  iconName: string
  iconClassName?: string
  color?: string
  outside?: boolean
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  iconName: '',
  color: 'black',
  outside: false,
  size: 18,
})
```

## Scene

### UI 框架图标使用

这里以 [ElementPlus](http://element-plus.org/zh-CN/component/icon.html) 为栗。
常规使用方法参考官方说明文档即可，这里介绍一下项目中用法。

这里为了方便后续使用和扩展，将 `ElementPlus` 中的 `icon` 做了批量注册，这里不介绍封装和处理，只介绍使用，默认你已经在使用或了解了该框架。

**场景一：**
在 `.vue` 中使用

```vue{4,9}
<template>
  <ElTooltip content="搜索">
    <ElButton type="primary" @click="searchFn">
      <ElIconSearch />
    </ElButton>
  </ElTooltip>
  <ElTooltip content="重置">
    <ElButton @click="cleanFn()">
      <ElIconRefresh />
    </ElButton>
  </ElTooltip>
</template>
```

**场景二:**
在 `router` 中使用，需要配合 `menu` 一起使用

```ts{8}
// router.ts
path: '/demo',
    redirect: '/base-icon',
    name: 'demo',
    component: Container,
    meta: {
      title: t('route.demo'),
      icon: 'ElIconOpportunity',
    }
// 其他代码省略
```

```tsx{6}
// menu.tsx， 其他 .vue 文件也是一样
const slots = {
    title: () => {
    return (
        <>
        <C_Icon v-show={meta?.icon} iconName={meta?.icon} />
        {/* <C_Icon iconName="ElIconSearch" /> */} // 解析后相当于这样
        <span>{name ? t(`route.${name}`) : meta.title}</span>
        </>
    )
    },
}
```

:bell: 注意，这里`C_Icon` 封装的时候，考虑到 UI 组件的 ICON，以及外部 ICON，和本地 SVGICON 三种情况，这里使用的 `ElementPlus` 的图标集，也可以根据需要换成其他图标集。

### 本地 SVG 图标的使用

在 `vite3` 搭建的框架中，一个 `svg` 就可以成为一个组件，这些组件被维护在 `scr/components/icons` 中。

```vue
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1 24 24" color="#4a4a4a">
    <path
      fill="currentColor"
      d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
    />
  </svg>
</template>
```

:bell: 注意，组件名就是 `.vue` 单文件组件的名称，这里统一使用 `Icon` 开头，比如这个 `IconSearch`。

使用

```vue{3}
<template>
  <div>
    <IconSearch @click.stop="onShowClick" />
    <div class="header-search" :class="{ show: isShow }"></div>
  </div>
</template>
```

:::tip
下方的几个本地图标库可以直接复制其中的 `svg` 代码在 `src/compoents/icons` 组件中封装使用：

- [IconFont](https://www.iconfont.cn/) 阿里巴巴图标库
- [REMIX ICON](https://remixicon.com/) REMIX 图标库

:::

### 外部图标库的使用

对于外部图标库，因为做了相关的依赖配置，可以使用 `i-` 标签的方式，也可以使用 `C_Icon` 组件，两种方式都可以，但是更推荐后者。

```vue
<template>
  <i-mdi-account-reactivate style="font-size: 2em; color: red" />
  <i-wpf:airplane-takeoff style="font-size: 2em; color: red" />
  <C_Icon iconName="mdi:abugida-devanagari" outside />
</template>
```

:::tip
下方的几个外部图标库可以直接使用，直接复制需要图标对应的 `icon` 值即可。

- [iconify](https://icon-sets.iconify.design/)
- [Material Desgin icons](https://materialdesignicons.com/)
- [icones](https://icones.netlify.app/)

:::
