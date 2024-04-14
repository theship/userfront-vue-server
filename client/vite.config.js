import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Consolidate all custom tags into one array and check if the tag belongs to this array
          isCustomElement: (tag) => ['login-form', 'signup-form', 'password-reset-form'].includes(tag)
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/admin-endpoint': 'http://localhost:3000'
    }
  }

})
