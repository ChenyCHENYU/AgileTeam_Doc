import type { Theme } from 'vitepress'
import { inBrowser, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

// 组件引入

import GiscusComment from './components/GiscusComment.vue'


// 插件引入
import { isInvalidRoute, redirect } from './plugins/redirect'
import { replaceSymbol, setSymbolStyle } from './plugins/symbol'

// 样式引入
import 'uno.css'
import 'element-plus/dist/index.css'
import './styles/vitepress.scss'
import './styles/custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => {
        const { page, frontmatter } = useData()

        if (frontmatter.value.comments === false) {
          return null
        }

        return h(GiscusComment, {
          key: page.value.relativePath,
        })
      },
    })
  },
  enhanceApp({ app, router }) {

    // 浏览器端初始化
    if (inBrowser) {
      if (isInvalidRoute()) {
        redirect()
        return
      }

      setSymbolStyle()
      setupPageChangeListeners(router)
      import('@vercel/analytics')
        .then(({ inject }) => {
          inject()
        })
        .catch(() => {})
    }
  },
}

const setupPageChangeListeners = (router: any) => {
  router.onAfterRouteChanged = () => {
    replaceSymbol()
  }
}

export default theme
