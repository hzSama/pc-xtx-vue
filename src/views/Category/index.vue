<script setup>
import { getTopCategoryAPI } from '@/apis/category.js'
import { getBannerAPI } from "@/apis/home.js"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

// 获取路由的参数实例对象，参数对象中.params.id可以获得id
const $route = useRoute()
// 获取面包屑数据
const topCategory = ref({})

const getTopCategory = async () => {
  const { result } = await getTopCategoryAPI($route.params.id)
  topCategory.value = result
}
onMounted(() => getTopCategory())

// 获取banner图数据
const bannerList = ref([])

const getBanner = async () => {
  const { result } = await getBannerAPI('2')
  bannerList.value = result
}
onMounted(() => getBanner())
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑导航 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ topCategory.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--轮播图-->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--分类列表-->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in topCategory.children" :key="i.id">
            <RouterLink to="/">
              <img v-img-lazy="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in topCategory.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <!--复用GoodsItem组件-->
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }


  .home-banner {
    width: 1240px;
    height: 500px;

    img {
      width: 100%;
      height: 500px;
    }
  }
}
</style>