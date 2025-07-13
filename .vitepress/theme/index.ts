import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { Theme } from 'vitepress'
import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

// 组件引入
import FontColor from './components/FontColor.vue'
import ElImg from './components/ElImg.vue'
import GitalkComment from './components/GitalkComment.vue'
import GoogleAdsense from './components/GoogleAdsense.vue'
import ImgWrap from './components/ImgWrap.vue'

// 插件引入
import { registerAnalytics, siteIds, trackPageview } from './plugins/analytics'
import { isInvalidRoute, redirect } from './plugins/redirect'
import { replaceSymbol, setSymbolStyle } from './plugins/symbol'

// 样式引入
import './styles/vitepress.scss'
import './styles/custom.css'
import 'uno.css' // UnoCSS 放最后，确保优先级

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    app.use(ElementPlus)
    app.component('GitalkComment', GitalkComment)
    app.component('GoogleAdsense', GoogleAdsense)
    app.component('ImgWrap', ImgWrap)
    app.component('FontColor', FontColor)
    app.component('ElImg', ElImg)

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
