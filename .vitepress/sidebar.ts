/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-10-25 23:13:21
 * @FilePath: \myAgileTeamVitepress\.vitepress\sidebar.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = [
  // {
  //   text: '作者的话',
  //   items: [{ text: '前言', link: '/' }],
  // },
  {
    text: '快速上手',
    items: [
      { text: '了解前端工程化', link: '/get-familiar-quickly/engineering' },
      { text: '工程化的前期准备', link: '/get-familiar-quickly/guide' },
      { text: '快速上手 TypeScript', link: '/get-familiar-quickly/typescript' },
    ],
  },
  {
    text: 'Vue3 基础指北',
    items: [
      { text: '脚手架的升级与配置', link: '/introduction/upgrade' },
      { text: '单组件的编写', link: '/introduction/component' },
      { text: '路由的使用', link: '/introduction/router' },
      { text: '插件的开发和使用', link: '/introduction/plugin' },
      { text: '组件之间的通信', link: '/introduction/communication' },
      { text: '全局状态的管理', link: '/introduction/pinia' },
      { text: '高效开发', link: '/introduction/efficient' },
    ],
  },
  {
    text: '编码风格及规范',
    items: [
      { text: '编码工具', link: '/coding-specification/codeing-tool' },
      { text: '编码规范', link: '/coding-specification/codeing-standard' },
      { text: 'ES6实践', link: '/coding-specification/es6-practice' },
    ],
  },
  {
    text: '聚焦 Vue3 实战',
    items: [
      { text: 'Composition API', link: '/actual-ombat/vue3-composition-api' },
      { text: '新语法细节', link: '/actual-ombat/vue3-new-grammar' },
      { text: '组件编写方式', link: '/actual-ombat/vue3-component-writing' },
      { text: '3.0到3.2渐进式实践', link: '/actual-ombat/vue3-practice' },
    ],
  },
  {
    text: '扩展阅读',
    items: [{ text: '常用文档', link: '/links' }],
  },
]
