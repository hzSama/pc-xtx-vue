import http from "@/utils/http"

/**
 * 
 * @param {*} params: {
 * orderState: 0
 * page: 1,
 * pageSize: 2
 * }
 * @returns 
 */
export const getUserOrder = (params) => {
  return http({
    url: '/member/order',
    method: 'GET',
    params
  })
}