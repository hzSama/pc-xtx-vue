// 创建一个axios实例
import { useUserStore } from "@/stores/user"
import axios from "axios"
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

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
http.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({ type: 'warning', message: e.response.data.message })
  return Promise.reject(e)
})

export default http