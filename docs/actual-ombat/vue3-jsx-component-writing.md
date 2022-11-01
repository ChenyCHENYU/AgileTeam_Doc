---
layout: Vue3JSXComponentWriting
title: Vue3 JSX Component Writing Method
outline: 'deep'
---

# JSX

> 按照 React 官方的解释，JSX 是一个 JavaScript 的语法扩展，类似于模板语法，或者说是一个类似于 XML 的 ECMAScript 语法扩展，并且具备 JavaScript 的全部功能。

<ElCard shadow="hover">

- 在 JS 中声明式语法更加直观，与 HTML 结构相同；
- JSX 是类型安全的，在编译过程中就能发现错误；
- 使用 JSX 编写模板更简单快速，扩展性更强，更灵活。

</ElCard>
  
:bell: 虽然 Vue 对 SFC 进行了炒鸡优化，但 JSX 语法依然是一种值得可选的拓展方式。

## Vue3 编写组件的几种方式

> 开始之前，先回顾和了解一下 Vue3 中几种组件编写方式。

### 选项式写法（丢弃）

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

### 组合式写法（推荐）

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

### JSX 写法（扩展）

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

## 在 Vue3 中使用 JSX 语法

> :bell: 着重介绍 JSX 使用方法和使用场景，下文 示离 JSX，TSX 一致，统称为 JSX。

下面主要通过对比 jsx 和 template 不同语法，来实现同样的功能。

### 普通内容

:::tip
普通内容常量，写法是一样的。
:::

```jsx
//jsx 写法
setup() {
  return ()=><p type="email">hello</p>
}

//tempalte 写法
<tempalte>
  <p type="email">hello</p>
</template>
```

### 动态变量

`{}` 是 `jsx` 的万能的用法，里面可以写 `js`的表达式，循环逻辑操作等等。

:::tip

- `jsx` 统一使用大括号包裹变量，没有引号，比如 `<div age={age}>{age}</div>`；
- `tempalte` 内容使用双大括号包裹，属性变量使用冒号开头 如 `<div :age="age">{{age}}</div>`。
  :::

```jsx
//jsx 写法
setup() {
  let age = 1
  // 没有" "包裹，统一都是 {}
  return ()=> <div age={age}>{age}</div>
}

//tempalte 写法
<tempalte>
  <div  :age="age" >{{age}}</div>
</template>
```

### 函数事件

:::tip 基本用法

- `jsx` 使用 `on` + `大驼峰形式(首字母大写)`，`template` 使用 `@` + `短横线形式`；
- `jsx` 方法名需要使用 `{}` 包裹起来，tempalte 使用 `" "` 包裹起来。

:::

```jsx

//jsx 写法
setup() {
  const age= ref(0)
  let inc = ()=> {
      age.value++
   }
  return ()=> <div onClick={inc}>{age.value}</div>
}

//tempalte 写法
<tempalte>
  <div @click="inc" >{{age}}</div>
</tempalte>

```

:::tip 参数进阶

- `jsx` 和 `tempalte` 都一样：无自定义参数的函数不需要带 () 调用结尾；
- `jsx` 在使用带参数的函数，则需要使用箭头函数包裹 ： `{()=>fn(args)}`；
- `jsx` 需要借助 `withModifiers`，实现 `.self` , `.stop` 等修饰符的效果。

:::

```jsx
//jsx 写法
import { withModifiers } from "vue"
...
setup() {
  const age = ref(0)
  let inc = ()=> {
      age.value++
  }
  return ()=> (
  // 根路径必须有节点，或者用<>代表fragment空节点
  <>
    // 无自定义参数，不需要 ()
    <div onClick={inc}>{age.value}</div>

    // 有参数，需要 ()=> 包裹
    <div onClick={()=>inc('test')}>{age.value}</div>
    <div onClick={withModifiers(inc, ["stop"])}>{age.value}</div>

    // withModifiers 包裹 vue 修饰符
    <input onKeyup =={(ev) => { //键盘事件enter事件
        //逻辑部分也可以写入js
        if (ev.key === 'Enter') {
           inc ()
        }
     }/>
  </>
 )
}

//tempalte 写法
<tempalte>
  <div @click="inc" >{{age}}</div>
  <div @click="inc('test')" >{{age}}</div>
  <div @click.stop="inc" >{{age}}</div>  //stop修饰符
  <input @keyup.enter="inc" >{{age}}</input>  //键盘事件enter事件
</template>
```

### ref 绑定

Vue3 中 有两种 `ref`, 一种是指的 `ref()` 定义的双向绑定变量，另外则是绑定在 DOM 标签的 `ref 引用`。

:::tip

- 对于 `ref()` 双向绑定变量，`jsx` 不会向 `template` 自动处理 `.value` 问题，需要手动加 `.value`;
- 对于 `DOM` 标签的 `ref` 引用，`jsx` 是直接用 `ref(null)` 变量，不需要加`.value`，`tempalte` 则是用同名字符串。

:::

```jsx
//jsx 写法
setup() {
  const divRef = ref(null)
  const age = ref(0)
  return ()=>
   (
     <div ref={divRef} > // DOM 标签的 ref 引用
        <span>{age.value}</span>   // ref() 双向绑定变量
     </div>
   )
}

//tempalte 写法
<tempalte>
  <div ref='divRef'>  // DOM 标签的 ref，使用同名字符串
    <span>{{age}}</span>   // ref() 双向绑定变量，不需要 .value
  </div>
</templalte>
```

### v-model 语法

在 `jsx` 中使用 `v-model` 或 `v-models` 代替 `template` 的 `v-model`。

:::tip

- 组件只有一个 `v-model` 时，使用 `v-model` 语法；
- 组件只有多个 `v-model` 时，可以使用 `v-model:xx` 语法。

:::

```jsx
//jsx 写法
setup() {
  const age = ref(0)
  const gender = ref('')
  return () =>
   (
     <input v-model={age} />
     // v-model 带修饰,推荐 (v-model:修饰符)
     <input v-model:foo={age} />

     // 多个v-model
     <input
     //推荐(v-model:修饰符)
       v-model:foo={age}
       v-model:bar={gender}
     />

     <input
      //使用v-models,传递二维数组 (新版不推荐)
       v-models={[
         [age, "foo"],
         [gender, "bar"],
         ]}
     />
   )
}

//tempalte 写法
  <tempalte>
    <input v-model="age" />
    <input v-model:foo="age" />  //v-model带修饰
    <input
      v-model:foo="age"     //多个v-model
      v-model:bar="gender"
    />
  </template>
```

### v-slots 语法

`jsx` 中使用 `v-slots` 代替 `v-slot（简写#）`。

```jsx
//jsx 写法

//方法一
const App = {
  setup() {
    const slots = {
      default: () => <div>A</div>,  // 默认插槽
      bar: () => <span>B</span>,    // 具名插槽
    }
    return () => <A v-slots={slots} />
  }
}

//方法二
const App = {
  setup() {
    return () => (
      <>
        <A>
          {{
            default: () => <div>A</div>
            bar: () => <span>B</span>  // 具名插槽
          }}
        </A>
      </>
    )
  }
}

//tempalte 写法
 <tempalte>
   <tempalte v-slot:bar>  // 具名插槽，也可以 #bar 简写
     <A />
   </template>
   <tempalte v-slot:default> // 默认插槽 也可以撒的不写
     <A />
   </template>
 </template>
```

### v-for 语法

`jsx` 中可使用 `js` 中的 `map` 循环来实现 `tempalte` 的 `v-for` 逻辑。

```jsx

//jsx 写法
setup() {
  const arr = ref([{label:'1'},{label:'2'},{label:'3'}])
  return () => (
     <>
     { arr.value.map( item => <span key={item.label}> {item.label} </span> )}
     </>
    )
}

//tempalte 写法
<tempalte>
  <span v-for="item in arr" :key="item.label">{{item.label}}</span>
</template>
```

### v-if 语法

`jsx` 中可使用 `js` 中的 `if` 逻辑，`三目运算，&&，||` 等来实现 `tempalte` 的 `v-if` 逻辑。

```jsx

//jsx 写法

// 场景一：
setup() {
  const show= ref(false)
  return ()=>(
     <>
     {show && <span>test vif</span>}      // 使用 && 运算
     {!show && <span>test velse</span>}
     </>
    )
}

// 场景二：
setup() {
  const show= ref(false)
  return ()=>(
     <>
      <span>{show.value ? 'test vif' : 'test velse'}</span>    //三目运算
     </>
    )
}

// 场景三：
setup() {
  const show= ref(false)
  const vif = () => {
     if(show) {
        return  <span>test vif</span>
     }
     return  <span>test velse</span>
  }
  return () => (
     <>
        vif()  // if条件函数
     </>
    )
}

//tempalte 写法
<tempalte>
  <span v-if="show">test vif</span>
  <span v-else>test velse</span>
</template>
```

### 指令用法

指令使用中划线，比如 `v-loading`，jsx 和 `template` 很相似。

```jsx

//jsx 写法
setup() {
  const isLoading= ref(true);
  return () => (
     <>
      <span v-loading-fullscreen-lock={isLoading}> loading </span>
     </>
    )
}

//tempalte 写法
<tempalte>
  <span v-loading-fullscreen-lock="isLoading"> loading </span>
</template>
```

### 类名绑定

比较简单，不做赘述，Vue 绑定方式如果不了解，参考 [动态绑定 CSS](../introduction/component.md) 内容板块。

```jsx
// 直接使用JS模板字符串
const element = (
  <div
    className={`devui-accordion-item-title ${disabled ? 'disabled' : ''}`}
  ></div>
)

// 使用数组
const element = (
  <div class={['devui-accordion-item-title', disabled && 'disabled']}>Item</div>
)
```

### style 样式绑定

比较简单，直接看栗子，Vue 绑定方式如果不了解，参考 [动态绑定 CSS](../introduction/component.md) 内容板块。

```jsx
const width = '100px'
const element = <button style={{ width, fontSize: '16px' }}></button>
```

## JSX 两个典型使用场景

### 组件方式使用

作为类同于 `.vue` 一样的组件，或者对于组件进行 `.jsx` 的二次封装，本质上依然是个组件。
下面我们看一个封装 `C_Menu` 组件拆出来柯厘化的 `.jsx` 组件，用来处理无限嵌套菜单。

```tsx
// 不做过多注释，根据 JSX 语法，自行阅读理解
import { t } from '@/utils/d_i18n'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { defineComponent } from 'vue'
import C_Icon from '_c/C_Icon/index.vue' // 这类别名后续会统一优化，无需过多关注
import { VUE_OPTIONS } from './options'
import { I_MenuItem } from './types' // 这类别名后续会统一优化，无需过多关注

// TODO: 处理要渲染的菜单
function useRenderMenuEffect(menuData: I_MenuItem[]) {
  return menuData.map((item: I_MenuItem) => {
    const { path, children, meta, name } = item
    //TODO: 处理submenu的插槽  插槽实现 #title层级的 DOM
    const slots = {
      title: () => {
        return (
          <>
            <C_Icon v-show={meta?.icon} iconName={meta?.icon} />
            <span>{name ? t(`route.${name}`) : meta.title}</span>
          </>
        )
      },
    }
    //TODO: 递归选择children
    if (children && children.length && !meta?.hidden) {
      return (
        <ElSubMenu index={path} v-slots={slots}>
          {useRenderMenuEffect(children)}
        </ElSubMenu>
      )
    }
    //TODO: 正常渲染普通的菜单
    if (!meta?.hidden) {
      return (
        <ElMenuItem index={path}>
          <C_Icon v-show={meta?.icon} iconName={meta?.icon} />
          <span>{name ? t(`route.${name}`) : meta.title}</span>
        </ElMenuItem>
      )
    }
  })
}

export default defineComponent({
  ...VUE_OPTIONS,
  setup(props) {
    return () => (
      <ElMenu defaultActive={props.defaultActive} router={props.router}>
        {useRenderMenuEffect(props.MENU_DATA!)}
      </ElMenu>
    )
  },
})
```

顺便附上关于 JSX 组件使用过程中关于 `props` 的处理，这里把它单独剥到一个文件了，重点关注的是关于 JSX 中对于 `props` 传值的语法。

```ts
// ./options.ts
import { PropType } from 'vue'
import { I_MenuItem } from './types'
export const VUE_OPTIONS = {
  props: {
    MENU_DATA: {
      type: Array as PropType<I_MenuItem[]>,
      required: true,
    },
    defaultActive: {
      type: String,
      default: '',
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
    // 键名 - 菜单标题的键名
    name: {
      type: String,
      default: 'name',
    },
    // 键名 - 菜单标识的键名
    index: {
      type: String,
      default: 'index',
    },
    // 键名 - 菜单图标的键名
    icon: {
      type: String,
      default: 'icon',
    },
    // 键名 - 菜单子菜单的键名
    children: {
      type: String,
      default: 'children',
    },
  },
}
```

### 数据交互方式使用

很多时候，我们希望把一些静态数据，或者涉及到视图层渲染的数据跟组件逻辑解耦，这里示栗一个 .jsx 文件处理 table 组件，相对复杂的演示。

:::tip :bell: 此示栗仅作为相对综合一些，用 jsx 数据交互方式，应用复杂场景的语法参考

- 模拟异步数据渲染 Tabel data；
- 列表项涉及较复杂的交互，行内及单元格编辑切换 Table columns；
- ui 组件的使用；
- 属性绑定，插槽，事件处理等较为综合的 JSX 语法应用。

:::

```jsx
import { I_RenderParams, I_TableColumns } from '@/components/C_Table/types'
import { ref } from 'vue'
import './index.scss'

// TODO: 模拟要渲染的数据源 tableData，从后台获取

const TABLE_DATA = ref()
export const exposeTableData = (callback: any) => {
  setTimeout(() => {
    TABLE_DATA.value = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    // 回调的时候为了强调格式，使异步数据源管理使用asnyc await, so 返回promise
    callback(Promise.resolve(TABLE_DATA.value))
  }, 1000)
}


// TODO: 要渲染的列表项
export const COLUMNS = (tableData: any): I_TableColumns[] => {
  console.log('tableData ==>', tableData)
  return [
    {
      type: 'index',
      label: '序号',
      width: 60,
    },
    {
      type: 'selection',
      label: '',
      width: 60,
    },
    {
      type: 'expand',
      label: '',
    },
    {
      //表头
      label: '日期',
      // 对齐方式
      // TODO: 这里需要注意，响应式数据，必须传递对应的row，不能是具体的值
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'date', tableData),
    },
    {
      //表头
      label: '姓名',
      // 字段名称
      render: ({ row }: any) => (
        <div>
          <el-popover
            v-slots={{ reference: () => <el-tag>{row.name}</el-tag> }}
            effect='light'
            trigger='hover'
            placement='top'
            width='auto'>
            <div>name: {row.name}</div>
            <div>address: {row.address}</div>
          </el-popover>
        </div>
      ),
    },
    {
      //表头
      label: '地址',
      // 字段名称
      // 对齐方式
      render: (params: I_RenderParams) =>
        HTML_LINE_EDIT(params, 'address', tableData),
    },
    {
      label: '操作',
      fixed: 'right',
      width: 160,
      render: ({ row, index }: any) => (
        <div>
          <div v-show={activeLineEdit.value !== index || !isEditLine.value}>
            <el-button
              size='small'
              type='warning'
              onClick={() => handleEditClick(row, index)}>
              <el-icon-edit />
            </el-button>
            <el-button size='small' type='danger'>
              <el-icon-delete />
            </el-button>
          </div>
          {/*  TODO: 点击了行内编辑按钮的话 */}
          <div v-show={activeLineEdit.value === index && isEditLine.value}>
            <el-button
              size='small'
              type='primary'
              onClick={() => clickConfirmOrCancel(tableData, row, index)}>
              确定
            </el-button>
            <el-button
              size='small'
              onClick={() => clickConfirmOrCancel(tableData, row, index)}>
              取消
            </el-button>
          </div>
        </div>
      ),
    },
  ]
}
const activeLineEdit = ref()
const isEditLine = ref(false)
const tempRowIndex = ref<number>()

const handleEditClick = (row: any, index: number) => {
  clickConfirmOrCancel(null, null, tempRowIndex.value)
  //整行编辑
  activeLineEdit.value = index
  isEditLine.value = true
  // TODO: 这个坑要注意，因为是个引用类型，必须要给它深拷贝下
  tempRow.value = JSON.parse(JSON.stringify(row))
  // 重置当前的交叉index值
  tempRowIndex.value = index
}

// TODO: 实时编辑相关的代码片段和对应逻辑
const HTML_LINE_EDIT = (
  params: I_RenderParams,
  attr: string,
  tableData: any
) => {
  const { index, column, row } = params
  return (
    <div class='html-line-edit'>
      <div
        v-show={index + column.id !== currentEdit.value && !isEditLine.value}>
        <span> {row[attr]}</span>
        <el-icon-edit
          v-pointer
          color='#e6a23c'
          onClick={() => clickTempEdit(params)}
        />
      </div>
      {/* <span v-show={active.value === index}> */}
      <span
        v-show={index + column.id === currentEdit.value && !isEditLine.value}>
        <el-input v-model={row[attr]} style='width:200px' size='small' />
        <span>
          <el-icon-check
            v-pointer
            color='#67c23a'
            onClick={() => clickConfirmOrCancel(tableData, row)}
          />
          <el-icon-close
            v-pointer
            color='#f56c6c'
            onClick={() => clickConfirmOrCancel(tableData, row, index)}
          />
        </span>
      </span>
      {/* 处理编辑行需要的元素 */}
      <span v-show={activeLineEdit.value === index && isEditLine.value}>
        <el-input v-model={row[attr]} style='width:200px' size='small' />
      </span>
      <span v-show={isEditLine.value && activeLineEdit.value !== index}>
        {row[attr]}
        <el-icon-edit
          v-pointer
          color='#e6a23c'
          onClick={() => clickTempEdit(params)}
        />
      </span>
    </div>
  )
}

// TODO: 当前点击的哪一行的哪一列
const tempRow = ref()
const currentEdit = ref('')

// 点击编辑按钮的时候，要对点击的数据进行临时存储，便于取消操作后恢复默认值
const clickTempEdit = (params: I_RenderParams) => {
  clickConfirmOrCancel(null, null, tempRowIndex.value)
  isEditLine.value = false
  const { row, index, column } = params
  currentEdit.value = index + column.id
  // TODO: 这个坑要注意，因为是个引用类型，必须要给它深拷贝下
  tempRow.value = JSON.parse(JSON.stringify(row))
  // 重置当前的交叉index值
  tempRowIndex.value = index
}

// 点击行内编辑保存或取消操作
const clickConfirmOrCancel = (tableData: any, row: any, index?: number) => {
  console.log(tableData, row, index)
  if (index || index === 0) {
    // FIXME: 这里后面换成传入的tableData
    TABLE_DATA.value[index] = tempRow.value
  } else {
    /* 将 rowid传递给后台即可 */
    console.log('row')
  }
  currentEdit.value = ''
  // 编辑行的也在这里复用处理
  isEditLine.value = false
}
```

更多深入的细节，参考组件板块或后台项目代码。

<!-- 评论 -->
<ClientOnly>
  <GitalkComment
    :issueId="163"
  />
</ClientOnly>

<!-- 评论 -->
