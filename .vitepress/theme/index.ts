/*
 * @Description: vitepress 执行入库文件
 * @Author: ChenYu ycyplus@163.com
 * @Date: 2022-10-24 18:01:30
 * @LastEditors: ChenYu ycyplus@163.com
 * @LastEditTime: 2022-11-28 18:11:28
 * @FilePath: \my-agile-team-document\.vitepress\theme\index.ts
 * Copyright (c) 2022 西安天智 AgileTeam by ChenYu email: ycyplus@163.com, All Rights Reserved.
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { Theme } from 'vitepress'
import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import FontColor from './components/FontColor.vue'
import GitalkComment from './components/GitalkComment.vue'
import GoogleAdsense from './components/GoogleAdsense.vue'
import ImgWrap from './components/ImgWrap.vue'
import { registerAnalytics, siteIds, trackPageview } from './plugins/analytics'
import { isInvalidRoute, redirect } from './plugins/redirect'
import { replaceSymbol, setSymbolStyle } from './plugins/symbol'
import './styles/custom.css'
import './styles/vitepress.scss'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    app.use(ElementPlus)
    app.component('GitalkComment', GitalkComment)
    app.component('GoogleAdsense', GoogleAdsense)
    app.component('ImgWrap', ImgWrap)
    app.component('FontColor', FontColor)

    if (inBrowser) {
      if (isInvalidRoute()) {
        redirect()
      }

      setSymbolStyle()
      siteIds.forEach((id) => registerAnalytics(id))

      window.addEventListener('hashchange', () => {
        const { href: url } = window.location
        siteIds.forEach((id) => trackPageview(id, url))
      })

      router.onAfterRouteChanged = (to) => {
        replaceSymbol()
        siteIds.forEach((id) => trackPageview(id, to))
      }
    }
  },
}

export default theme
