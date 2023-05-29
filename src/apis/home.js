import http from '@/utils/http.js'

// 获取banner图数据
export function getBannerAPI(distributionSite = '1') {
  return http({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

// 获取新鲜好物数据
export function getNewAPI() {
  return http({
    url: '/home/new'
  })
}

// 获取人气推荐数据
export function getHotAPI() {
  return http({
    url: '/home/hot'
  })
}

// 获取产品列表数据
export function getProductAPI() {
  return http({
    url: '/home/goods'
  })
}