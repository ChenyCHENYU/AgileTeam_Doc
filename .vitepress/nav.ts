/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-05 17:12:51
 * @FilePath: \my-agile-team-document\.vitepress\nav.ts
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
  {
    text: '组件',
    activeMatch: '/docs/',
    link: '/get-familiar-quickly/component',
  },
  {
    text: '伟大的贡献者',
    activeMatch: '/docs/',
    link: '/team',
  },
]
