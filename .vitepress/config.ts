/*
 * @Author: ChenYu
 * @Date: 2022-10-22 17:14:01
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-05 20:15:50
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

export default defineConfig({
  srcDir: 'docs',
  outDir: 'dist',
  lang: 'zh-CN',
  title: '天智AgileTeam',
  description:
    '这是一个关于 Vue 3 + TypeScript 的团队引导文档，适合前端Vue技术栈，在官方文档的基础上融入自己的一些实践经验。',
  head,
  // ignoreDeadLinks: true,  // 忽略死链接
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    // logo: '/logo.svg',
    nav,
    sidebar,
    outline: 3,
    outlineTitle: '本页导航',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ycyplus',
      },
    ],
    // editLink: {
    //   pattern:
    //     'https://github.com/cheny/cangku/edit/main/docs/:path',
    //   text: '在 GitHub 上编辑本章内容',
    // },
    docFooter: {
      prev: '上一章',
      next: '下一章',
    },
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2022 Cheny - 西安天智',
    },
    algolia: {
      appId: 'RD79285UB5',
      apiKey: 'c7927cdb74ae7fae0d50bd9703cd0d6c',
      indexName: 'cheny_index',
      placeholder: '请输入关键词',
      buttonText: '搜索',
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
