<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cart.js'

// 调用pinia封装好的请求导航数据方法
const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getCategory()
  if (cartStore.isLogin) { cartStore.updateCartList() }
})

const cartStore = useCartStore()

</script>

<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!--二级路由出口-->
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>
