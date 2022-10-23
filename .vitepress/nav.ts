/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-10-23 20:30:11
 * @FilePath: \learning-vue3-main\.vitepress\nav.ts
 * @Description: 右上侧导航
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '文档',
    activeMatch: '/docs/',
    link: '/get-familiar-quickly/engineering',
  },
]
