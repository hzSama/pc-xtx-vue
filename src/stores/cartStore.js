// 封装购物车模块数据

/* 购物车功能拆解：
   购物车操作：是否登录？
           否：本地购物车操作(所有操作不走接口直接操作Pinia中的本地购物车列表数据)；
           是：接口购物车操作(所有操作直接走接口，操作完毕获取购物车列表更新本地购物车)。 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  // 添加到购物车操作
  const addCart = (goods) => {
    // 在已有数据中寻找是否存在新添加的商品id，若有商品已存在购物车则添加数量，反之push整条新商品数据。
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
  }

  return {
    cartList,
    addCart
  }
}, { persist: true })