import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({
      // 🔥 关键配置：禁用默认的样式重置
      preflight: false, // 禁用 Tailwind 的 preflight 样式重置
    }),
  ],
  content: {
    filesystem: ['docs/**/*.{md,vue}', '.vitepress/**/*.{vue,ts,mts,js}'],
  },

  // 🔥 自定义 preflight，只重置必要的样式，保留表格样式
  preflights: [
    {
      getCSS: () => `
        /* 只重置必要的样式，不影响 VitePress 表格 */
        *,
        ::before,
        ::after {
          box-sizing: border-box;
          border-width: 0;
          border-style: solid;
          border-color: theme('borderColor.DEFAULT', currentColor);
        }

        ::before,
        ::after {
          --un-content: '';
        }

        html {
          line-height: 1.5;
          -webkit-text-size-adjust: 100%;
          -moz-tab-size: 4;
          tab-size: 4;
          font-family: theme('fontFamily.sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
          font-feature-settings: theme('fontFamily.sans[1].fontFeatureSettings', normal);
          font-variation-settings: theme('fontFamily.sans[1].fontVariationSettings', normal);
        }

        body {
          margin: 0;
          line-height: inherit;
        }

        hr {
          height: 0;
          color: inherit;
          border-top-width: 1px;
        }

        abbr:where([title]) {
          text-decoration: underline dotted;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-size: inherit;
          font-weight: inherit;
        }

        a {
          color: inherit;
          text-decoration: inherit;
        }

        b,
        strong {
          font-weight: bolder;
        }

        code,
        kbd,
        samp,
        pre {
          font-family: theme('fontFamily.mono', ui-monospace, SFMono-Regular, "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace);
          font-size: 1em;
        }

        small {
          font-size: 80%;
        }

        sub,
        sup {
          font-size: 75%;
          line-height: 0;
          position: relative;
          vertical-align: baseline;
        }

        sub {
          bottom: -0.25em;
        }

        sup {
          top: -0.5em;
        }

        /* 🔥 关键：不重置表格样式，让 VitePress 自己处理 */
        /* table, thead, tbody, tfoot, tr, th, td 样式保持默认 */

        /* 重置表单元素 */
        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: inherit;
          font-feature-settings: inherit;
          font-variation-settings: inherit;
          font-size: 100%;
          font-weight: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
          padding: 0;
        }

        button,
        select {
          text-transform: none;
        }

        button,
        [type='button'],
        [type='reset'],
        [type='submit'] {
          -webkit-appearance: button;
          background-color: transparent;
          background-image: none;
        }

        :-moz-focusring {
          outline: auto;
        }

        :-moz-ui-invalid {
          box-shadow: none;
        }

        progress {
          vertical-align: baseline;
        }

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
          height: auto;
        }

        [type='search'] {
          -webkit-appearance: textfield;
          outline-offset: -2px;
        }

        ::-webkit-search-decoration {
          -webkit-appearance: none;
        }

        ::-webkit-file-upload-button {
          -webkit-appearance: button;
          font: inherit;
        }

        summary {
          display: list-item;
        }

        blockquote,
        dl,
        dd,
        figure,
        p,
        pre {
          margin: 0;
        }

        fieldset {
          margin: 0;
          padding: 0;
        }

        legend {
          padding: 0;
        }

        ol,
        ul,
        menu {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        dialog {
          padding: 0;
        }

        textarea {
          resize: vertical;
        }

        input::placeholder,
        textarea::placeholder {
          opacity: 1;
          color: theme('colors.gray.400', #9ca3af);
        }

        button,
        [role="button"] {
          cursor: pointer;
        }

        :disabled {
          cursor: default;
        }

        img,
        svg,
        video,
        canvas,
        audio,
        iframe,
        embed,
        object {
          display: block;
          vertical-align: middle;
        }

        img,
        video {
          max-width: 100%;
          height: auto;
        }

        [hidden] {
          display: none;
        }
      `,
    },
  ],

  // 🔥 确保不覆盖 VitePress 的关键类名
  safelist: ['vp-doc', 'vp-table', 'VPContent', 'content'],

  // 可选：添加一些自定义规则
  rules: [
    // 如果需要自定义规则可以在这里添加
  ],

  // 主题配置
  theme: {},
})
