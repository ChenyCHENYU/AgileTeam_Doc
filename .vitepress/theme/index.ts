import { inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GitalkComment from './components/GitalkComment.vue'
import GoogleAdsense from './components/GoogleAdsense.vue'
import ImgWrap from './components/ImgWrap.vue'
import FontColor from './components/FontColor.vue'
import Tag from './components/Tag.vue'
import Code from './components/Code.vue'
import { setSymbolStyle, replaceSymbol } from './plugins/symbol'
import { siteIds, registerAnalytics, trackPageview } from './plugins/analytics'
import { isInvalidRoute, redirect } from './plugins/redirect'
import './styles/custom.css'
import type { Theme } from 'vitepress'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    app.use(ElementPlus)
    app.component('GitalkComment', GitalkComment)
    app.component('GoogleAdsense', GoogleAdsense)
    app.component('ImgWrap', ImgWrap)
    app.component('FontColor', FontColor)
    app.component('Tag', Tag)
    app.component('Code', Code)

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
