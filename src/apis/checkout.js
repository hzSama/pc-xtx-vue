// 结算页接口

import http from "@/utils/http"

// 获取下单信息接口
export const getCheckInfoAPI = () => {
  return http({
    url: '/member/order/pre'
  })
}

// 创建订单接口
export const createOrderAPI = (data) => {
  return http({
    url: '/member/order',
    method: 'POST',
    data
  })
}