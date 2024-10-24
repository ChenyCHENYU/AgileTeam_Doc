<!--
 * @Author: ChenYu
 * @Date: 2022-10-18 20:29:51
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2024-10-11 15:44:39
 * @FilePath: \my-agile-team-document\.vitepress\theme\components\FontColor.vue
 * @Description: FontColor组件 处理字体颜色
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->
<template>
  <span shadow="always" :style="{ color }">{{ props.text }}</span>
</template>

<script lang="ts" setup>
interface Props {
  color: string
  text: string
  fontWeight: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'skyblue',
  fontWeight: '',
})
</script>
