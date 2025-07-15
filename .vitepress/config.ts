/*
 * @Author: ChenYu ycyplus@gmail.com
 * @Date: 2025-07-15 09:02:07
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2025-07-15 10:22:18
 * @FilePath: \AgileTeam_Doc\.vitepress\config.ts
 * @Description:
 * Copyright (c) 2025 by CHENY, All Rights Reserved 😎.
 */
import { resolve } from 'path'
import banner from 'vite-plugin-banner'
import { defineConfig } from 'vitepress'
import pkg from '../package.json'
import { head } from './head'
import { nav } from './nav'
import { sidebar } from './sidebar'
import { gitee, blog, robot } from './svg'
import UnoCSS from '@unocss/vite'

// 🔥 导入按需导入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  srcDir: 'docs',
  outDir: 'dist',
  lang: 'zh-CN',
  title: 'AGILE TEAM',
  description: '这是一个关于软件研发团队的综合性文档平台，为各角色进行交叉赋能',
  head,
  markdown: {
    lineNumbers: false,
  },
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar,
    outline: 3,
    outlineTitle: '本页导航',
    lastUpdatedText: '最后更新时间',
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
    ssr: {
      noExternal: ['element-plus'],
    },
    plugins: [
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: false, // 🔥 关键：禁用自动样式导入
          }),
        ],
      }),
      banner({
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
        outDir: resolve(__dirname, '../dist'),
        debug: false,
      }),
    ],
  },
})
