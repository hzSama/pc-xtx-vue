// createRouter创建路由实例
// createWebHistory创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'

// import Login from '@/views/Login/index.vue'
// import Layout from '@/views/Layout/index.vue'
// import Home from '@/views/Home/index.vue'
// import Category from '@/views/Category/index.vue'
// import SubCategory from '@/views/SubCategory/index.vue'
// import Detail from '@/views/Detail/index.vue'
// import CartList from '@/views/CartList/index.vue'
// import Checkout from '@/views/Checkout/index.vue'
// import Pay from '@/views/Pay/index.vue'
// import PayBack from '@/views/Pay/PayBack.vue'
// import Member from '@/views/Member/index.vue'
// import UserInfo from '@/views/Member/components/UserInfo.vue'
// import UserOrder from '@/views/Member/components/UserOrder.vue'

// 实现路由懒加载(动态导入路由)
const Layout = () => import('@/views/Layout/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Login = () => import('@/views/Login/index.vue')
const Category = () => import('@/views/Category/index.vue')
const SubCategory = () => import('@/views/SubCategory/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const CartList = () => import('@/views/CartList/index.vue')
const Checkout = () => import('@/views/Checkout/index.vue')
const Pay = () => import('@/views/Pay/index.vue')
const PayBack = () => import('@/views/Pay/PayBack.vue')
const Member = () => import('@/views/Member/index.vue')
const UserInfo = () => import('@/views/Member/components/UserInfo.vue')
const UserOrder = () => import('@/views/Member/components/UserOrder.vue')
import { useUserStore } from "@/stores/user"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: Layout, children: [
        { path: '', component: Home },
        { path: '/category/:id', component: Category },
        { path: '/category/sub/:id', component: SubCategory }, // 同属二级路由，因为同样是在Layout的router-view中显示
        { path: '/detail/:id', component: Detail },
        { path: '/cartlist', component: CartList, meta: { requirtAuth: true } },
        { path: '/checkout', component: Checkout, meta: { requirtAuth: true } },
        { path: '/pay', component: Pay, meta: { requirtAuth: true } },
        { path: '/paycallback', component: PayBack, meta: { requirtAuth: true } },
        {
          path: '/member', component: Member, redirect: '/member/user', meta: { requirtAuth: true },
          children: [
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

// 路由拦截(路由导航守卫)
router.beforeEach((to, from, next) => {
  const useStore = useUserStore()
  if (to.meta.requirtAuth) {
    if (useStore.userData.token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
