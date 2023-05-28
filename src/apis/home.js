import http from '@/utils/http.js'

// 获取banner图数据
export function getBannerAPI() {
  return http({
    url: '/home/banner'
  })
}