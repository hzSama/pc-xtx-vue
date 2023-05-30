import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 导入懒加载指令插件
import { lazyPlugin } from '@/directives/imgLazy.js'
// 导入全局组件插件
import { componentsPlugin } from './components/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin) // 注册懒加载插件
app.use(componentsPlugin) // 注册全局组件插件

app.mount('#app')