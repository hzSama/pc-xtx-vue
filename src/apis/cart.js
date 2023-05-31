// 封装购物车相关接口

import http from "@/utils/http"

// 添加至购物车
export const insertCartAPI = ({ skuId, count }) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取购物车列表
export const getNewCartListAPI = () => {
  return http({
    url: '/member/cart'
  })
}

// 删除购物车商品
export const delCartAPI = (ids) => {
  return http({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 登录合并本地购物车数据到购物车接口数据
export const mergeCartAPI = (data) => {
  return http({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}