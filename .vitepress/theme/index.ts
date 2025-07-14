/*
 * @Author: ChenYu ycyplus@gmail.com
 * @Date: 2025-07-12 19:57:20
 * @LastEditors: ChenYu ycyplus@gmail.com
 * @LastEditTime: 2025-07-14 23:47:01
 * @FilePath: \AgileTeam_Doc\.vitepress\theme\index.ts
 * @Description:
 * Copyright (c) 2025 by CHENY, All Rights Reserved 😎.
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { Theme } from 'vitepress'
import { inBrowser } from 'vitepress'
import { inject } from '@vercel/analytics'
import DefaultTheme from 'vitepress/theme'

// 组件引入
import FontColor from './components/FontColor.vue'
import ElImg from './components/ElImg.vue'
import GitalkComment from './components/GitalkComment.vue'
import GoogleAdsense from './components/GoogleAdsense.vue'
import ImgWrap from './components/ImgWrap.vue'

// 插件引入
import { isInvalidRoute, redirect } from './plugins/redirect'
import { replaceSymbol, setSymbolStyle } from './plugins/symbol'

// 样式引入
import './styles/vitepress.scss'
import './styles/custom.css'
import 'uno.css' // UnoCSS 放最后，确保优先级

/**
 * 设置页面变化监听
 */
const setupPageChangeListeners = (router: any) => {
  // 监听路由变化
  router.onAfterRouteChanged = () => {
    replaceSymbol()
  }
}

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 注册 Vue 组件
    app.use(ElementPlus)
    app.component('GitalkComment', GitalkComment)
    app.component('GoogleAdsense', GoogleAdsense)
    app.component('ImgWrap', ImgWrap)
    app.component('FontColor', FontColor)
    app.component('ElImg', ElImg)

    // 浏览器端初始化
    if (inBrowser) {
      // 处理无效路由重定向
      if (isInvalidRoute()) {
        redirect()
        return // 如果需要重定向，提前返回
      }

      // 设置基础样式
      setSymbolStyle()

      // 初始化 Vercel Analytics
      inject()

      // 设置页面变化监听
      setupPageChangeListeners(router)
    }
  },
}

export default theme
