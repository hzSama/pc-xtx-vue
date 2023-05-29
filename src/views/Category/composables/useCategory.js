// 封装请求category数据相关业务代码

import { onMounted, ref } from 'vue'
import { getTopCategoryAPI } from '@/apis/category.js'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export const useCategory = () => {
  // 获取路由的参数实例对象，参数对象中.params.id可以获得id
  const $route = useRoute()
  // 获取面包屑数据
  const topCategory = ref({})
  const getTopCategory = async (id = $route.params.id) => {
    const { result } = await getTopCategoryAPI(id)
    topCategory.value = result
  }
  onMounted(() => getTopCategory())

  // 解决路由缓存问题：使用beforeRouteUpdate监听路由变化，在路由更新前，发起需要的数据请求
  onBeforeRouteUpdate((to) => {
    getTopCategory(to.params.id) // to是将要访问的路由对象信息，可拿到最新的id
  })

  return {
    topCategory
  }
}