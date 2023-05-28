import http from '@/utils/http.js'

export function getCategoryAPI() {
  return http({
    url: '/home/category/head'
  })
}