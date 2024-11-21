/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2024-07-23 15:10:10
 * @FilePath: \my-agile-team-document\.vitepress\config.ts
 * @Description: 配置文件
 * Copyright (c) ${2022} by ChenYu/天智AgileTeam, All Rights Reserved.
 */
import { resolve } from 'path'
import banner from 'vite-plugin-banner'
import { defineConfig } from 'vitepress'
import pkg from '../package.json'
import { head } from './head'
import { nav } from './nav'
import { sidebar } from './sidebar'
import { gitee, blog, robot } from './svg'

export default defineConfig({
  srcDir: 'docs',
  outDir: 'dist',
  lang: 'zh-CN',
  title: '天智AgileTeam',
  description: '这是一个关于软件研发团队的综合性文档平台，为各角色进行交叉赋能',
  head,
  // ignoreDeadLinks: true,  // 忽略死链接
  markdown: {
    lineNumbers: false,
  },
  lastUpdated: true, // string | boolean  // 开启最后更新时间
  themeConfig: {
    // logo: '/logo.svg',
    nav,
    sidebar,
    outline: 3,
    outlineTitle: '本页导航',
    lastUpdatedText: '最后更新时间', // string
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ChenyCHENYU',
      },
      {
        icon: gitee,
        link: 'https://gitee.com/ycyplus163',
      },
      {
        icon: blog,
        link: 'https://yangchenyu.com',
      },
      {
        icon: robot,
        link: 'https://www.robotadmin.cn/',
      },
    ],

    docFooter: {
      prev: '上一章',
      next: '下一章',
    },
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2022 CHENY - 西安天智',
    },
    algolia: {
      appId: '7DC0L4NJ6E',
      apiKey: '35845c2d394000ae9f0bd56f5c274ca6',
      indexName: 'tzagileteam',
      placeholder: '请输入关键词',
    },
  },
  vite: {
    server: {
      port: 5188,
    },
    plugins: [
      banner({
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
        outDir: resolve(__dirname, '../dist'),
        debug: false,
      }),
    ],
  },
})
