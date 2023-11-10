/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2023-11-10 18:28:35
 * @FilePath: \my-agile-team-document\.vitepress\nav.ts
 * @Description: 右上侧导航
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '产品',
    activeMatch: '/po/',
    items: [
      { text: '产品文档', link: '/po/standard/introduction' },
    ]
  },
  {
    text: '设计',
    activeMatch: '/ui/',
    items: [
      { text: '设计文档', link: '/item-1' },
    ]
  },

  {
    text: '前端',
    activeMatch: '^/web[-]*',
    items: [
      { text: '前端文档', link: '/web/get-familiar-quickly/engineering'},
      { text: '前端组件',  link: '/web-component/preface'},
    
    ],
  },
  {
    text: '后端',
    activeMatch: '/java/',
    items: [
      { text: '后端文档', link: '/item-1' },
    ]
  },
  {
    text: '测试',
    activeMatch: '/test/',
    items: [
      { text: '测试文档', link: '/item-1' },
    ]
  },
  {
    text: '团队英雄墙',
    link: '/team',
  },
]


