<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/layoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!--二级路由出口-->
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>
