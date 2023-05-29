
<!--产品列表无线加载功能：使用elementPlus提供的v-infinite-scroll指令监听是否满足触底条件，
                         满足条件则让参数页数+1后再次请求数据，并拼接到goodList中即可。-->

<!--定制路由行为：在切换路由的时候，可以自动滚动到页面顶部，而不是停留在原先的位置。
           方法：vue-router支持scrollBehavior配置项，可指定切换路由时滚动位置。-->

<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

const $route = useRoute()
// 获取二级面包屑数据
const categoryData = ref({})
const getCategoryData = async () => {
  const { result } = await getCategoryFilterAPI($route.params.id)
  categoryData.value = result
}
onMounted(() => getCategoryData())

// 获取基础列表数据
const goodList = ref([])
const reqData = ref({ // 请求数据的参数
  categoryId: $route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodList = async () => {
  const { result } = await getSubCategoryAPI(reqData.value)
  goodList.value = result.items // 新老数据拼接
}
onMounted(() => getGoodList())

// 切换tab执行回调
const tabChange = () => {
  reqData.value.page = 1
  getGoodList()
}

// 列表滚动到底部触加载
const disabled = ref(false)
const load = async () => {
  reqData.value.page++
  const { result } = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...result.items] // 新老数据拼接
  // 如果已无数据，则关闭加载
  if (result.items.length === 0) disabled.value = true
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!--双向绑定，点击哪个el-tab-pane，其name值自动提交给绑定的属性值-->
      <!--@tab-change：当v-model的值变化时，执行回调-->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!--v-infinite-scroll为监听是否已滚动到底部；
                                          :infinite-scroll-disabled为监听开关-->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :good="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

}
</style>