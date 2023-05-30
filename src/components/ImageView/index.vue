
<!--封装的产品详情图片预览组件-->

<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// 接收父组件传递的图片预览的数据
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})

// 1.小图切换大图显示
const activeIndex = ref(0)
const enterSmall = (i) => {
  activeIndex.value = i
}

// 2.蒙层跟随鼠标移动
const middle = ref(null)
// 通过@vueuse/core包的此方法可以获取鼠标是否进入某元素及鼠标相对其位置
const { elementX, elementY, isOutside } = useMouseInElement(middle)
const left = ref(0)
const top = ref(0)
watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return
  // 横向逻辑
  if (elementX.value <= 100) {
    left.value = 0
  } else if (elementX.value >= 300) {
    left.value = 200
  } else { left.value = elementX.value - 100 }

  // 纵向逻辑
  if (elementY.value <= 100) {
    top.value = 0
  } else if (elementY.value >= 300) {
    top.value = 200
  } else { top.value = elementY.value - 100 }
})
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="middle">
      <!--大图的下标值与激活的小图一一对应-->
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-if="!isOutside"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <!--通过鼠标移入事件拿到当前激活的图片的下标值-->
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterSmall(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${-(left * 2)}px`,
        backgroundPositionY: `${-(top * 2)}px`,
      },
    ]" v-if="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>