/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2025-08-01 23:32:16
 * @FilePath: \AgileTeam_Doc\.vitepress\nav.ts
 * @Description: 右上侧导航
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Robot Admin',
    activeMatch: '^/robot/',
    items: [
      { text: '深度指南', link: '/robot/guide/overview' },
      { text: '组件文档', link: '/robot/components/preface' },
    ],
  },
  {
    text: '产品',
    activeMatch: '/po/',
    items: [{ text: '产品文档', link: '/po/standard/introduction' }],
  },
  {
    text: '设计',
    activeMatch: '/ui/',
    items: [{ text: '设计文档', link: '/ui/standard/introduction' }],
  },

  {
    text: '前端',
    activeMatch: '^/web/',
    items: [
      { text: '前端文档', link: '/web/get-familiar-quickly/engineering' },
    ],
  },
  {
    text: '后端',
    activeMatch: '^/rear-end/',
    items: [{ text: '后端文档', link: '/rear-end/standard/norm' }],
  },
  {
    text: '测试',
    activeMatch: '^/qc/',
    items: [{ text: '测试文档', link: '/qc/standard/norm' }],
  },
  {
    text: '运维',
    activeMatch: '^/op/',
    items: [{ text: '运维文档', link: '/op/standard/norm' }],
  },
  {
    text: '管理',
    activeMatch: '^/manage/',
    items: [{ text: '岗位职责', link: '/manage/job-responsibility/pm' }],
  },
  {
    text: '团队英雄墙',
    activeMatch: '/team/',
    items: [
      { text: '产品伙伴', link: '/team/po' },
      { text: '设计伙伴', link: '/team/ui' },
      { text: '前端伙伴', link: '/team/front-end' },
      { text: '后端伙伴', link: '/team/rear-end' },
      { text: '测试伙伴', link: '/team/qc' },
      { text: '运维伙伴', link: '/team/op' },
      { text: '虚拟小组', link: '/team/manage' },
    ],
  },
]
