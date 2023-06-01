// 结算页接口

import http from "@/utils/http"

// 获取下单信息接口
export const getCheckInfoAPI = () => {
  return http({
    url: '/member/order/pre'
  })
}
