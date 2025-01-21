import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ['fsevents'],
    },
  },
  server: {
    // Sends all requests to index.html if file not found
    fs: {
      allow: ['.'], // or paths as needed
    },
  },
})
