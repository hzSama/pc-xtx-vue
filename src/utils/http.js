// 创建一个axios实例
import { useUserStore } from "@/stores/user"
import axios from "axios"
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from "vue-router"

const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
/* 拦截器携带token：token是用户标识，有些数据需要携带token才允许请求，所以需要在接口调用时携带token。
                   但为了统一控制采取请求拦截器携带的方案。 */
http.interceptors.request.use(config => {
  // 发送请求时若有token则将token放到请求头的Authorization属性中
  const useStore = useUserStore()
  const token = useStore.userData.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, e => Promise.reject(e))

// axios响应拦截器
/* token失效处理：用户一段时间不操作，token会失效。使用失效的token去发起请求，接口会报401错误，需要我们做相应处理。
                  在响应拦截器做统一的处理。 */
http.interceptors.response.use(res => res.data, e => {
  const useStore = useUserStore()
  const $router = useRouter()
  // 统一错误提示
  ElMessage({ type: 'warning', message: e.response.data.message })
  // 若是401token失效错误则做额外处理
  if (e.response.status === 401) {
    useStore.clearUserData()
    $router.push('/login')
  }
  return Promise.reject(e)
})

export default http