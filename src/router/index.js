// createRouter创建路由实例
// createWebHistory创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: Layout, children: [
        { path: '', component: Home },
        { path: '/category/:id', component: Category },
        { path: '/category/sub/:id', component: SubCategory }, // 同属二级路由，因为同样是在Layout的router-view中显示
        { path: '/detail/:id', component: Detail },
        { path: '/cartlist', component: CartList },
        { path: '/checkout', component: Checkout },
        { path: '/pay', component: Pay },
        { path: '/paycallback', component: PayBack },
        {
          path: '/member', component: Member, redirect: '/member/user', children: [
            { path: 'user', component: UserInfo },
            { path: 'order', component: UserOrder }
          ]
        }
      ]
    },
    { path: '/login', component: Login }
  ],
  // 路由滚动行为配置项
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
