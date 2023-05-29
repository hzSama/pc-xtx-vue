
<!--路由缓存问题：使用带有参数的路由时，当用户从 /category/id1 导航到 /category/id2 时，
                 相同的组件实例将被重复使用，因为两个路由都渲染同个组件，比起销毁再创建，
                 复用组件实例会更加高效。不过，这意味着组件的生命周期函数不会被调用(组件数据不会被更新)。-->

<!--解决问题方法：
  1.让组件实例不被复用，强制销毁重建：给路由入口router-view标签绑定一个key，值为当前路由的完整路径。
                                    可以破坏组件实例的复用机制，强制销毁重建。
                                    <router-view :key="$route.fullPath" />
                              问题：整个页面都会重建(重新请求数据)，一些不需要改变的数据就会导致资源浪费。

  2.监听路由变化，变化后执行数据更新操作：使用beforeRouteUpdate导航钩子，可以在每次路由更新之前执行，
                                        在回调中执行需要数据的更新业务逻辑。-->

<script setup>
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
// 导入封装好的业务模块
import { useCategory } from './composables/useCategory.js'
import { useBanner } from './composables/useBanner.js'

// 使用封装好的两个业务模块
const { topCategory } = useCategory()
const { bannerList } = useBanner()

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
            <RouterLink :to="`/category/sub/${i.id}`">
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