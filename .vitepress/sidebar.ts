/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu
 * @LastEditTime: 2022-11-15 23:19:07
 * @FilePath: \my-agile-team-document\.vitepress\sidebar.ts
 * @Description:
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import type { DefaultTheme } from 'vitepress'

const BASEIS = '/basis'
const COMPONENT = 'component'

export const sidebar: DefaultTheme.Sidebar = {
  '/basis/': [
    {
      text: '快速上手',
      items: [
        {
          text: '了解前端工程化',
          link: `${BASEIS}/get-familiar-quickly/engineering`,
        },
        {
          text: '工程化的前期准备',
          link: `${BASEIS}/get-familiar-quickly/guide`,
        },
        {
          text: '快速上手 TypeScript',
          link: `${BASEIS}/get-familiar-quickly/typescript`,
        },
      ],
    },
    {
      text: 'Vue3 基础指北',
      items: [
        {
          text: '脚手架的升级与配置',
          link: `${BASEIS}/introduction/upgrade`,
        },
        {
          text: '单组件的编写',
          link: `${BASEIS}/introduction/component`,
        },
        {
          text: '路由的使用',
          link: `${BASEIS}/introduction/router`,
        },
        {
          text: '插件的开发和使用',
          link: `${BASEIS}/introduction/plugin`,
        },
        {
          text: '组件之间的通信',
          link: `${BASEIS}/introduction/communication`,
        },
        {
          text: '全局状态的管理',
          link: `${BASEIS}/introduction/pinia`,
        },
        {
          text: 'Vue3.2 语法糖',
          link: `${BASEIS}/introduction/efficient`,
        },
      ],
    },
    {
      text: '编码风格及规范',
      items: [
        {
          text: '编码工具',
          link: `${BASEIS}/coding-specification/codeing-tool`,
        },
        {
          text: '编码规范',
          link: `${BASEIS}/coding-specification/codeing-standard`,
        },
        {
          text: 'ES6实践',
          link: `${BASEIS}/coding-specification/es6-practice`,
        },
      ],
    },
    {
      text: '聚焦 Vue3 实战',
      items: [
        {
          text: 'Composition API',
          link: `${BASEIS}/actual-ombat/vue3-composition-api`,
        },
        {
          text: '更多新语法细节',
          link: `${BASEIS}/actual-ombat/vue3-new-grammar`,
        },
        {
          text: '掌握 JSX 语法场景',
          link: `${BASEIS}/actual-ombat/vue3-jsx-component-writing`,
        },
        {
          text: 'Git 的使用',
          link: `${BASEIS}/actual-ombat/git`,
        },
        {
          text: 'Npm、Nvm、Yarn、Pnpm 使用',
          link: `${BASEIS}/actual-ombat/npm`,
        },
      ],
    },
    {
      text: '扩展阅读',
      items: [
        {
          text: '常用文档',
          link: `${BASEIS}/links`,
        },
      ],
    },
  ],
  '/component/': [
    {
      text: '组件',
      items: [
        {
          text: '前言',
          link: `${COMPONENT}/index`,
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
      ],
    },
    // {
    //   text: '其他',
    //   items: [
    //     {
    //       text: '几种 icon 的使用方式',
    //       link: `${COMPONENT}/icon`,
    //     },
    //   ],
    // },
  ],
}
