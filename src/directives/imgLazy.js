/* 图片懒加载核心原理：图片进入视口才发送图片请求。
   实现思路与步骤：
   1.定义一个全局自定义指令 v-img-lazy；
   2.在自定义指令的钩子函数里判断img元素是否进入视口；
   3.如果元素进入视口，则发送图片资源请求(img.src = url)；
*/

// 定义懒加载插件

// 按需导入包中的方法
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    // 定义全局自定义指令实现图片懒加载
    app.directive('img-lazy', {
      // el:指令绑定的dom元素；binding:指令传递的参数。
      mounted(el, binding) {
        // useIntersectionObserver方法：监听元素，当参数el的dom元素进入到视口区域，则触发第二个参数的回调
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 若img标签进入视口，则将参数(图片地址)赋给img标签的src属性
            el.src = binding.value
            // 加载完毕后停止监听重复图片资源请求，避免资源浪费。
            stop()
          }
        })
      }
    })
  }
}