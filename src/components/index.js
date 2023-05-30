// 把components中的所有组件都通过插件方式进行全局注册

import ImageView from './ImageView/index.vue'
import XtxSku from './XtxSku/index.vue'

export const componentsPlugin = {
  install(app) {
    app.component('ImageView', ImageView)
    app.component('XtxSku', XtxSku)
  }
}