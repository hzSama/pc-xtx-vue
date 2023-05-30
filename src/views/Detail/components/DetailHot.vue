<script setup>
import { getHotGoodsAPI } from '@/apis/detail.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// 接收榜单类型，请求不同类型
const props = defineProps({
  hotType: {
    type: Number
  }
})

// 请求数据
const $route = useRoute()
const hotList = ref([])
const params = ref({
  id: $route.params.id,
  type: props.hotType,
  limit: 3
})
const getHotGoods = async () => {
  const { result } = await getHotGoodsAPI(params.value)
  hotList.value = result
}
onMounted(() => getHotGoods())
</script>

<template>
  <div class="goods-hot">
    <h3 v-if="props.hotType === 1">24小时热榜</h3>
    <h3 v-else-if="props.hotType === 2">一周热榜</h3>
    <!-- 商品区块 -->
    <RouterLink :to="`/detail/${item.id}`" class="goods-item" v-for="item in hotList" :key="item.id">
      <img v-img-lazy="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>