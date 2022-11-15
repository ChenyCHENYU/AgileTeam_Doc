---
outline: 'deep'
---

# C_City

> 在某些业务场景中，需要对城市进行选择，按照城市，按照省份，甚至按照区域等，这里对城市和省份做了简单封装。

## Usage

`<C_City />`

### Events

| 事件名        | 说明               | 回调参数   |
| ------------- | ------------------ | ---------- |
| e_getCityName | 获取选择的城市名称 | `cityNmae` |

## Scene

需要按照城市、省份来筛选对应的城市名称的场景可以使用。

### 示栗

```vue
<template>
  <C_City @e_getCityName="e_getCityName" />
</template>
<script setup lang="ts">
const e_getCityName = (cityNmae: string) => console.log(cityNmae)
</script>
```

:bell: `C_City` 组件是一个闭环性的封装，针对性比较单一，只是为了满足城市的选择，个性化样式方面可以扩展一些 `Props`，但在这里暂无扩展，如果的话后续根据需要补充。
