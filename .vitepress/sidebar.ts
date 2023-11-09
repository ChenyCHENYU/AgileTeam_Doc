/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2023-11-09 14:18:52
 * @FilePath: \my-agile-team-document\.vitepress\sidebar.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { DefaultTheme } from 'vitepress'

const WEB = '/web'
const COMPONENT = '/web-component'


const WEB_SIDEBAR =   [
  {
    text: '快速上手',
    items: [
      {
        text: '了解前端工程化',
        link: `${WEB}/get-familiar-quickly/engineering`,
      },
      {
        text: '工程化的前期准备',
        link: `${WEB}/get-familiar-quickly/guide`,
      },
      {
        text: '快速上手 TypeScript',
        link: `${WEB}/get-familiar-quickly/typescript`,
      },
    ],
  },
  {
    text: 'Vue3 基础指北',
    items: [
      {
        text: '脚手架的升级与配置',
        link: `${WEB}/introduction/upgrade`,
      },
      {
        text: '单组件的编写',
        link: `${WEB}/introduction/component`,
      },
      {
        text: '路由的使用',
        link: `${WEB}/introduction/router`,
      },
      {
        text: '插件的开发和使用',
        link: `${WEB}/introduction/plugin`,
      },
      {
        text: '组件之间的通信',
        link: `${WEB}/introduction/communication`,
      },
      {
        text: '全局状态的管理',
        link: `${WEB}/introduction/pinia`,
      },
      {
        text: 'Vue3.2 语法糖',
        link: `${WEB}/introduction/efficient`,
      },
    ],
  },
  {
    text: '编码风格及规范',
    items: [
      {
        text: '编码工具',
        link: `${WEB}/coding-specification/codeing-tool`,
      },
      {
        text: '编码规范',
        link: `${WEB}/coding-specification/codeing-standard`,
      },
      {
        text: 'ES6实践',
        link: `${WEB}/coding-specification/es6-practice`,
      },
    ],
  },
  {
    text: '聚焦 Vue3 实战',
    items: [
      {
        text: 'Composition API',
        link: `${WEB}/actual-ombat/vue3-composition-api`,
      },
      {
        text: '更多新语法细节',
        link: `${WEB}/actual-ombat/vue3-new-grammar`,
      },
      {
        text: '掌握 JSX 语法场景',
        link: `${WEB}/actual-ombat/vue3-jsx-component-writing`,
      },
      {
        text: 'Git 的使用',
        link: `${WEB}/actual-ombat/git`,
      },
      {
        text: 'Npm、Nvm、Yarn、Pnpm 使用',
        link: `${WEB}/actual-ombat/npm`,
      },
    ],
  },
  {
    text: '扩展阅读',
    items: [
      {
        text: '常用文档',
        link: `${WEB}/links`,
      },
    ],
  },
]


export const sidebar: DefaultTheme.Sidebar = {
  '/web/':   WEB_SIDEBAR,
  '/web-component/': [
    {
      text: '组件',
      items: [
        {
          text: '前言',
          link: `${COMPONENT}/preface`,
        },
      ],
    },
    {
      text: '常用组件',
      items: [
        {
          text: 'Icon 图标',
          link: `${COMPONENT}/icon`,
        },
        {
          text: 'Cascade 级联选择器',
          link: `${COMPONENT}/cascade`,
        },
        {
          text: 'Notice 通知',
          link: `${COMPONENT}/notice`,
        },
        {
          text: 'Menu 菜单',
          link: `${COMPONENT}/menu`,
        },
        {
          text: 'Progress 进度条',
          link: `${COMPONENT}/progress`,
        },
        {
          text: 'Time 时间选择器',
          link: `${COMPONENT}/time`,
        },
        {
          text: 'Date 日期选择器',
          link: `${COMPONENT}/date`,
        },
        {
          text: 'City 城市选择器',
          link: `${COMPONENT}/city`,
        },
        {
          text: 'Form 表单',
          link: `${COMPONENT}/form`,
        },
        {
          text: 'FormSearch 表单搜索',
          link: `${COMPONENT}/form-search`,
        },
        {
          text: 'Table 表格',
          link: `${COMPONENT}/table`,
        },
        {
          text: 'Calendar 日历',
          link: `${COMPONENT}/calendar`,
        },
      ],
    },
  ],
}
