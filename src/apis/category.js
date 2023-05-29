import http from '@/utils/http.js'

/** 获取面包屑数据
 * @description: 获取分类数据
 * @param {*} id 分类id 
 * @return {*}
 */
export const getTopCategoryAPI = (id) => {
  return http({
    url: '/category',
    params: { id }
  })
}