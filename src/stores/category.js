import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout.js'

export const useCategoryStore = defineStore('category', () => {
  // 一级导航列表数据
  const categoryList = ref([])
  // 请求导航数据的方法
  const getCategory = async () => {
    const { result } = await getCategoryAPI()
    categoryList.value = result
  }

  return { categoryList, getCategory }
})
