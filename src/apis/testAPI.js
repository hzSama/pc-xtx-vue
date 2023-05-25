import http from '@/utils/http.js'

export function getCategory() {
  return http({
    url: 'home/category/head'
  })
}