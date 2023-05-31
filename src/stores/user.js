
/* 持久化用户数据：1.用户数据中有一个关键的数据叫做Token(用于识别用户的登录状态),而Token持续一段时间才会过期。
                  2.Pinia的存储是基于内存的，刷新就会丢失，为了保持登录状态就要做到刷新不丢失，需要配合持久化存储。
            目的：保持token不丢失，保持登录状态。 
            效果：操作state时会自动把用户数据存储一份在本地的localStorage中，刷新时从本地中先读取。
            方法：使用 pinia-plugin-persistedstate 插件*/

// 管理用户相关数据

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user.js'
import { useCartStore } from './cart.js'
import { mergeCartAPI } from '@/apis/cart.js'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()

  const userData = ref({})

  const getUserData = async ({ account, password }) => {
    const { result } = await loginAPI({ account, password })
    userData.value = result
    // 登录同时合并购物车数据到后台接口
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateCartList()
  }

  const clearUserData = () => {
    userData.value = {}
    // 退出登录同时清空购物车本地数据
    cartStore.clearCartList()
  }
  return {
    userData,
    getUserData,
    clearUserData
  }
}, { persist: true })
// { persist: true }为数据持久化配置项