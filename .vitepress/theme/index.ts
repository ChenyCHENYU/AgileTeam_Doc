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
import 'uno.css'
import './styles/vitepress.scss'
import './styles/custom.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    // 🔥 移除 Element Plus 全局注册
    // app.use(ElementPlus)

    // 注册 Vue 组件
    app.component('GitalkComment', GitalkComment)
    app.component('GoogleAdsense', GoogleAdsense)
    app.component('ImgWrap', ImgWrap)
    app.component('FontColor', FontColor)
    app.component('ElImg', ElImg)

    // 浏览器端初始化
    if (inBrowser) {
      if (isInvalidRoute()) {
        redirect()
        return
      }

      setSymbolStyle()
      inject()
      setupPageChangeListeners(router)
    }
  },
}

const setupPageChangeListeners = (router: any) => {
  router.onAfterRouteChanged = () => {
    replaceSymbol()
  }
}

export default theme
