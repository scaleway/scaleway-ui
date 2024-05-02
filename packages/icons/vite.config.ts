// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-relative-packages */
import svgr from '@svgr/rollup'
import { defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../../vite.config'

export default mergeConfig(defineConfig(defaultConfig), {
  plugins: [
    svgr({ memo: true, svgo: false }), // We disable svgo because we have custom configuration for it svgo.config.js
  ],
})
