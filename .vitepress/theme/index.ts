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
import { isInvalidRoute, redirect } from './plugins/redirect'
import { replaceSymbol, setSymbolStyle } from './plugins/symbol'

// 样式引入
import 'uno.css'
// 🔥 添加Element Plus样式
import 'element-plus/dist/index.css'
import './styles/vitepress.scss'
import './styles/custom.css'

// 🔥 条件导入Vercel Analytics避免类型错误
let inject: any
if (inBrowser) {
  import('@vercel/analytics')
    .then((module) => {
      inject = module.inject
      inject()
    })
    .catch(() => {
      // Vercel Analytics导入失败时的fallback
      console.log('Vercel Analytics not available')
    })
}

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
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