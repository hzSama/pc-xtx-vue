import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 导入element-ui组件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置element-ui
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 指定使用sass作为样式配色系统
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  resolve: {
    // 实际的路径转化
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `@use "@/styles/element/index.scss" as *;
                         @use "@/styles/var.scss" as *;`,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'group-layout': [
            '@/views/Layout/index.vue',
            '@/views/Home/index.vue',
            '@/views/CartList/index.vue'
          ],
          'group-login': [
            '@/views/Login/index.vue'
          ],
          'group-member': [
            '@/views/Member/index.vue',
            '@/views/Member/components/UserInfo.vue',
            '@/views/Member/components/UserOrder.vue',
          ],
          'group-category': [
            '@/views/Category/index.vue',
            '@/views/SubCategory/index.vue'
          ],
          'group-detail': [
            '@/views/Detail/index.vue',
            '@/views/Checkout/index.vue'
          ],
          'group-pay': [
            '@/views/Pay/index.vue',
            '@/views/Pay/PayBack.vue'
          ]
        }
      }
    }
  }
})
