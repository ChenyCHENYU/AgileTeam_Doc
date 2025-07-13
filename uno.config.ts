import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  content: {
    filesystem: ['docs/**/*.{md,vue}', '.vitepress/**/*.{vue,ts,mts,js}'],
  },
})
