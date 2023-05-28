import http from '@/utils/http.js'

// 获取banner图数据
export function getBannerAPI() {
  return http({
    url: '/home/banner'
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