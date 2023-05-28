<script setup>
import { ref, onMounted } from 'vue'
import HomePanel from './HomePanel.vue'
import { getHotAPI } from '@/apis/home'

const hotList = ref([])
const getHotList = async () => {
  const { result } = await getHotAPI()
  hotList.value = result
}
onMounted(() => { getHotList() })

</script>

<template>
  <!-- 下面是插槽主体内容模版-->
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #default>
      <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
          <RouterLink to="/">
            <!--使用自定义指令实现图片懒加载-->
            <img v-img-lazy="item.picture">
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>