import { resolve } from 'path'
import banner from 'vite-plugin-banner'
import { defineConfig } from 'vitepress'
import pkg from '../package.json'
import { head } from './head'
import { nav } from './nav'
import { sidebar } from './sidebar'
import { gitee, blog, robot } from './svg'
import UnoCSS from '@unocss/vite'

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
      { icon: 'github', link: 'https://github.com/ChenyCHENYU' },
      { icon: gitee, link: 'https://gitee.com/ycyplus163' },
      { icon: blog, link: 'https://yangchenyu.com' },
      { icon: robot, link: 'https://www.robotadmin.cn/' },
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
      fs: {
        allow: ['..']
      }
    },
    ssr: {
      noExternal: ['element-plus']
    },
    optimizeDeps: {
      exclude: ['vitepress']
    },
    plugins: [
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: resolve(__dirname, '../auto-imports.d.ts'),
      }),
      Components({
        dirs: [resolve(__dirname, './theme/components')],
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [ElementPlusResolver({ importStyle: false })],
        dts: resolve(__dirname, '../components.d.ts'),
      }),
      banner({
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
        outDir: resolve(__dirname, '../dist'),
        debug: false,
      }),
    ],
  },
})
