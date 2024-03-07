import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      Pages({
        routeStyle: 'nuxt',
        dirs: ['src/views'],
        exclude: ['**/components', '**/*.ts'],
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [NaiveUiResolver()],
        dts: '.typings/auto-import.d.ts',
        eslintrc: {
          enabled: true,
          filepath: '.typings/.eslintrc-auto-import.json',
        },
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: '.typings/components.d.ts',
        globs: [
          'src/components/*.{vue,tsx}',
          'src/components/*/index.{vue,tsx}',
        ], // 只把 components/xxx.vue components/floder/index.vue 作为全局组件
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  }
})
