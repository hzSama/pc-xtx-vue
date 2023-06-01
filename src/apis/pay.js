import http from "@/utils/http"

// 支付获取订单详情
export const getOrderAPI = (id) => {
  return http({
    url: `/member/order/${id}`
  })
}