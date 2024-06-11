import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
    // alias is needed or Vite will not resolve the packages correctly with storybook
    alias: {
      '@ultraviolet/ui': resolve('packages/ui/src'),
      '@ultraviolet/themes': resolve('packages/themes/src'),
      '@ultraviolet/plus': resolve('packages/plus/src'),
      '@ultraviolet/illustrations/various': resolve(
        'packages/illustrations/src/assets/various',
      ),
      '@ultraviolet/illustrations/products': resolve(
        'packages/illustrations/src/assets/products',
      ),
      '@ultraviolet/illustrations': resolve('packages/illustrations/src/'),
      '@ultraviolet/icons': resolve('packages/icons/src'),
      '@ultraviolet/form': resolve('packages/form/src'),
    },
  },
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'build',
    reportCompressedSize: true,
  },
  optimizeDeps: {
    exclude: ['@ultraviolet/*'],
  },
  plugins: [
    svgr({ memo: true, svgo: false }),
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
})
