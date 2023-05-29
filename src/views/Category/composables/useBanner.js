// 封装请求banner数据相关业务代码

import { getBannerAPI } from "@/apis/home.js"
import { onMounted, ref } from 'vue'

export const useBanner = () => {
  // 获取banner图数据
  const bannerList = ref([])
  const getBanner = async () => {
    const { result } = await getBannerAPI('2')
    bannerList.value = result
  }
  onMounted(() => getBanner())

  return {
    bannerList
  }
}