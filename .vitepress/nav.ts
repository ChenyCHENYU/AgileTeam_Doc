/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2023-11-08 12:28:46
 * @FilePath: \my-agile-team-document\.vitepress\nav.ts
 * @Description: 右上侧导航
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '产研测体系文档',
    activeMatch: '/basis/',
    items: [
      { text: '产品文档', link: '/item-1' },
      { text: '设计文档', link: '/item-2' },
      { text: '前端文档', link: '/basis/get-familiar-quickly/engineering' },
      { text: '后端文档', link: '/item-3' },
      { text: '测试文档', link: '/item-4' },
      { text: '运维文档', link: '/item-5' },
    ]
  },
  {
    text: '组件',
    activeMatch: '/component/',
    items: [
      { text: '前端组件',  link: '/component/preface'},
    
    ]
  },
  {
    text: '伟大的贡献者',

    link: '/team',
  },
]
