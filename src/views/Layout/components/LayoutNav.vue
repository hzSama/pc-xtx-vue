<script setup>
import { useRouter } from 'vue-router'
// 导入用户数据Pinia
import { useUserStore } from '@/stores/user.js'
const userStore = useUserStore()

// 退出登录
const $router = useRouter()
const logout = () => {
  userStore.clearUserData()   // 清除用户信息
  $router.push('/login') // 跳转到登录页
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!--适配思路：登录时显示第一块(有token)，非登录时显示第二块(无Token)。-->
        <template v-if="userStore.userData.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userData.account }}</a></li>
          <li>
            <!--element-plus组件内置事件@confirm-->
            <el-popconfirm @confirm="logout" title="确认退出吗？" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
          <li><a href="javascript:;" @click="$router.push('/member/user')">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>