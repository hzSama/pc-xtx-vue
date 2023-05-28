import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// useIntersectionObserver方法：当参数el的dom元素进入到视口区域，则执行第二个参数的回调
import { useIntersectionObserver } from '@vueuse/core'

// 测试接口
// import { getCategory } from '@/apis/testAPI.js'
// getCategory().then(res => {
//   console.log(res)
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局自定义指令实现图片懒加载
app.directive('img-lazy', {
  // el:指令绑定的dom元素；binding:指令传递的参数。
  mounted(el, binding) {
    // useIntersectionObserver方法：当参数el的dom元素进入到视口区域，则执行第二个参数的回调
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = binding.value // 若img标签进入视口，则将参数(图片地址)赋给img标签的src属性
      }
    })
  }
})
