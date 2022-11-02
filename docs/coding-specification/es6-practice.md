---
layout: ES6CodeingPractice
title: ES6实践
outline: 'deep'
---

<script setup>
 

</script>

# 紧随 ES6+ "最佳实践"

> :fire: ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等 ，更多参考 [ES6 入门指南](https://es6.ruanyifeng.com/) - 阮一峰

## 使用 let / const 替代 var

::: tip :sparkles: let / const
\- 不同于 var ，let 和 const 是块级作用域语句，不会造成声明提升，let 声明变量，const 声明常量  
\- 注意：在语句块以外引用这些变量时，会造成引用错误 **[暂时性死区]** ReferenceError :bulb:  
:::

<ElTag type="danger">Bad</ElTag>

```js
// FIXME: 一个var的栗子：
var snack = 'Meow Mix'
function getFood(food) {
  if (food) {
    var snack = 'Friskies'
    return snack
  }
  return snack
}
getFood(false) // undefined
```

<ElTag type="success">Good</ElTag>

```js
// TODO: 使用 let 替换了 var 后的表现：
const SNACK = 'Friskies'
let snack = 'Meow Mix'
function getFood(food) {
  if (food) {
    let snack = 'Friskies'
    return snack
  }
  return snack
}
getFood(false) // 'Meow Mix'
```

## 尽可能多的使用箭头函数

::: tip :sparkles: () => {}
更精简，可读性更高的写法，扁平的解决 this 问题
:::

<ElTag type="danger">Bad</ElTag>

```js
// FIXME: 传统函数解决 this 方式
function Person(name) {
  this.name = name
}
// it's one =~> 保存this
Person.prototype.prefixName = function (arr) {
  var that = this
  return arr.map(function (character) {
    return that.name + character
  })
}
// it.s two =~> this 属性传递
Person.prototype.prefixName = function (arr) {
  return arr.map(function (character) {
    return this.name + character
  }, this)
}
// it's three =~> bind
Person.prototype.prefixName = function (arr) {
  return arr.map(
    function (character) {
      return this.name + character
    }.bind(this)
  )
}

// FIXME: 返回表达式的简单函数
var squares = arr.map(function (x) {
  return x * x
}) // Function Expression
```

<ElTag type="success">Good</ElTag>

```js
// TODO: 箭头函数解决 this 方式
Person.prototype.prefixName = (arr) =>
  arr.map((character) => this.name + character)

// TODO: 返回表达式的简单函数
const squares = arr.map((x) => x * x)
```

## 字符串方法 includes 和模板字符串

### .includes()

::: tip :sparkles: String.includes() 替代 String.indexOf()
.indexOf() 方法通过判断得到 0 或 -1 不够直观，而.includes() 方法会极简地返回一个布尔值结果
:::

<ElTag type="danger">Bad</ElTag>

```js
var string = 'food',
  substring = 'foo'
console.log(string.indexOf(substring) > -1)
```

<ElTag type="success">Good</ElTag>

```js
const string = 'food',
  substring = 'foo'
console.log(string.includes(substring)) // true
```

### 模板字符串

::: tip 模板字符串字面量 ``
\- 使用字符串模板字面量，可以在字符串中直接使用特殊字符，而不用转义  
\- 直接插入变量，可以实现字符串与变量的直接连接输出、识别换行符、内部使用表达式
:::

<ElTag type="danger">Bad</ElTag>

```js
// FIXME: it's one =~> 转义符
var text = 'This string contains "double quotes" which are escaped.'

// FIXME: it's two =~> 变量
var name = 'Tiger',
  age = 13
console.log('My cat is named ' + name + ' and is ' + age + ' years old.')

// FIXME: it's three =~> 换行
var text = 'cat\n' + 'dog\n' + 'nickelodeon'
```

<ElTag type="success">Good</ElTag>

```js
// TODO: it's one =~> 转义符
let text = `This string contains "double quotes" which don't need to be escaped.`
// TODO: it's two =~> 变量
const name = 'Tiger',
  age = 13

console.log(`My cat is named ${name} and is ${age} years old.`)
// TODO: it's three =~> 换行
let text = `cat
dog
nickelodeon`

// TODO: 甚至可以在内部使用表达式
let text = `The time and date is ${new Date().toLocaleString()}`
```

## 解构赋值，数组，对象的 "服务者"

::: tip array , object
解构使用非常便捷的语法，直接将数组或者对象中的值直接分别导出到多个变量中，精准获取数据
:::

<ElTag type="danger">Bad</ElTag>

```js
// FIXME: array
var arr = [1, 2, 3, 4]
var a = arr[0],
  b = arr[1],
  c = arr[2]

// FIXME: object
var luke = { occupation: 'jedi', father: 'anakin' }
var occupation = luke.occupation,
  father = luke.father
```

<ElTag type="success">Good</ElTag>

```js
// TODO: array
let [a, b, c, d] = [1, 2, 3, 4]
console.log(a, b) // 1, 2

// TODO: object
let luke = { occupation: 'jedi', father: 'anakin' }
let { occupation, father } = luke
console.log(father) // 'anakin'
```

## 模块导入导出 import / export

::: tip import , export
\- 单独引入，命名引入，重命名引入，命名空间引入  
\- 命名导出，整体导出  
\- 它让模块的入口和出口更清晰明了，节省了阅读整个模块的时间  
\- 注意：被导出的值是被绑定的，而不是引用，避免改变它的值，会影响其他引用本模块的代码 :bulb:
:::

```js
// TODO: 单独引入，注意这种方式会执行该文件内的最上层代码
import 'underscore'

// TODO: 命名引入
import { sumTwo, sumThree } from 'math/addition'

// TODO: 重命名引入
import { sumTwo as addTwoNum, sumThree as sumThreeNum } from 'math/addition'

// TODO: 命名空间引入
import * as util from 'math/addition'
```

```js
// TODO: 默认导出， 命名导出， 重命名导出
export { foo as default, foo1 as fooOne, foo2}

// TODO: 整体导出
export default
```

## 函数[默认 / 数量 / 命名 / 可选] 参数的处理

::: tip default | indefinite | named | optional paramas
ES5 中，许多种方法来处理函数的  
参数默认值（default values），参数数量（indefinite arguments），参数命名（named paramas）
ES6 中，可以使用非常简洁的语法来处理上面提到的集中情况
:::

<ElTag type="danger">Bad</ElTag>

```js
// FIXME: 默认参数
function addTwoNumbers(x, y) {
  x = x || 0
  y = y || 0
  return x + y
}

// FIXME: 参数数量，在遇到参数个数不确定的时候，往常如此处理
function logArguments() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
  }
}

// FIXME: 命名参数，要处理多个命名参数时，往常会传入一个 选项对象的方式
function initializeCanvas(options) {
  var height = options.height || 600
  var width = options.width || 400
  var lineStroke = options.lineStroke || 'black'
}
```

<ElTag type="success">Good</ElTag>

```js
// TODO: 默认参数
function addTwoNumbers(x = 0, y = 0) {
  return x + y
}

// TODO: 参数数量，在 ES6 如此处理
function logArguments(...args) {
  for (let arg of args) {
    console.log(arg)
  }
}

// TODO: 命名参数，要处理多个命名参数时，在 ES6 如此处理
function initializeCanvas({ height = 600, width = 400, lineStroke = 'black' }) {
  // ...
}

// 如需参数可选
function initializeCanvas({
  height = 600,
  width = 400,
  lineStroke = 'black',
} = {}) {
  // ...
}
```

## 异步终结者 async await 语法糖

> ECMAScript 异步经历了 4 个阶段，Callback，Promise，Generator，asnyc await

### 即将搁置的 Promise

::: tip Promise
使用 Promises，可以通过清晰的路径将错误事件让上传递，避免了大量嵌套错误处理回调函数使代码变得难以阅读理解，并且可以适当地处理它们，此外，Promise 处理后的值，无论是解决（resolved）还是拒绝（rejected）的结果值，都是不可改变的
:::

<ElTag type="danger">Bad</ElTag>

```js
// FIXME: 可怕的回调地域
func1(function (value1) {
  func2(value1, function (value2) {
    func3(value2, function (value3) {
      func4(value3, function (value4) {
        func5(value4, function (value5) {
          // Do something with value 5
        })
      })
    })
  })
})
```

<Tag text="Primary" type="primary"/>

```js
// TODO: Promise 规避回调地域
func1(value1)
  .then(func2)
  .then(func3)
  .then(func4)
  .then(func5, (value5) => {
    // Do something with value 5
  })
```

### 过渡的 Generators (不推荐)

::: danger Generators
就像用 Promises 来避免回调地狱一样，Generators 也可以使代码扁平化，像开发同步代码一样的感觉来写异步代码，Generators 实际上是支持暂停运行，随后根据上一步的返回值再继续运行的一种函数
:::

```js
// 伪代码：在这不过度介绍，感兴趣参考 ES6 入门指南
function* getData() {
  var entry1 = yield request('http://some_api/item1')
  var data1 = JSON.parse(entry1)
  var entry2 = yield request('http://some_api/item2')
  var data2 = JSON.parse(entry2)
}
```

### 拥抱甜甜圈语法糖 async await

::: tip :thumbsup: async await  
随着 ES2016 版本的发布，它提供了一种更轻松的、更简单，更直观，更漂亮的可以替代的实现上面 Generators 配合 Promises 组合代码的一种语法糖编码方式
:::

<ElTag type="danger">Bad</ElTag>

```js
// FIXME: 请求接口，获取异步数据
var request = require('request')
function getJSON(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      resolve(body)
    })
  })
}
```

<ElTag type="success">Good</ElTag>

```js
// TODO: 请求接口，获取异步数据
import request from 'axios'
async function main() {
  const data = await getJSON()
  console.log(data)
}
```

<!-- 评论 -->
<ClientOnly>
  <GitalkComment
    :issueId="13"
  />
</ClientOnly>
<!-- 评论 -->
