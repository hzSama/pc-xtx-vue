// 封装的倒计时函数
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  // 响应式数据
  const time = ref(0)

  // 倒计时方法
  let timer = null
  const start = (totalSce) => {
    time.value = totalSce
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }

  // 计算属性实现时间格式化
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  // 组件销毁时清除定时器
  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}