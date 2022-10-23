<!--
 * @Author: ChenYu
 * @Date: 2022-10-20 22:36:47
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-10-21 00:20:08
 * @FilePath: \vitepress-cheny\docs\src\components\Code.vue
 * @Description: 背景编码组件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved. 
-->

<template>
  <span class="span">{{ props.text }}</span>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

interface Props {
  text: string
}

const props = defineProps<Props>()
</script>
<style lang="scss" scoped>
.span {
  padding: 2px 6px;
  font-size: 14px;
  color: #476582;
  background-color: #f1f1f1;
  border-radius: 4px;
}
</style>
