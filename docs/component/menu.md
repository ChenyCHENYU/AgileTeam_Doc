---
outline: 'deep'
---

# C_Menu

> 在 `ElementPlus` 基础上进行了简单封装，满足常规的 3 级嵌套，更多层级参考 `menu.tsx`。

## Usage

`<C_Menu :MENU_DATA="MENU_DATA"/>`

### Props

| 属性          | 类型      | 默认值     | 说明                       |
| ------------- | --------- | ---------- | -------------------------- |
| MENU_DATA     | `any[]`   | -          | 菜单数据源                 |
| defaultActive | `string`  | '1'        | 默认选中的主菜单           |
| router        | `boolean` | false      | 是否是路由模式             |
| name          | `string`  | 'name'     | 要修改的自定义别名         |
| index         | `string`  | '1'        | 要修改的自定义索引下标别名 |
| icon          | `string`  | 'icon'     | 要修改的自定义图标别名     |
| children      | `string`  | 'children' | 要修改的自定义子级别名     |

### Interface

```ts
interface Props {
  MENU_DATA: any[]
  defaultActive: string
  router?: boolean
  name?: string
  index?: string
  icon?: string
  children?: string
}
withDefaults(defineProps<Props>(), {
  defaultActive: '1',
  router: false,
  name: 'name',
  index: '1',
  icon: 'icon',
  children: 'children',
})
```

## Scene

作为内部菜单组件，常用的一般 3 级，可以根据数据需要进行自定义属性别名配置。

### 用栗

```vue{3,8}
<template>
  <div style="width: 200px">
    <C_Menu :MENU_DATA="MENU_DATA" name="a" index="b" icon="c" children="d" />
  </div>
</template>

<script lang="ts" setup>
import { MENU_DATA } from './data'
</script>
```

```ts
// 模拟数据
export const MENU_DATA = [
  {
    a: '导航1',
    b: '1',
    c: 'ElIconDocument',
  },
  {
    a: '导航2',
    b: '2',
    c: 'ElIconDocument',
  },
  {
    a: '导航3',
    b: '3',
    c: 'ElIconDocument',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
        c: 'ElIconDocument',
        d: [
          {
            a: '导航3-1-1',
            b: '3-1-1',
            c: 'ElIconDocument',
          },
        ],
      },
    ],
  },
]
```

其他更多交互形式以及使用场景可以参考 `ElementPlus` 菜单组件：[ElMenu](http://element-plus.org/zh-CN/component/menu.html#%E4%BE%A7%E6%A0%8F)，更多属性传递可通过原组件的 `attrs` 进行使用。
