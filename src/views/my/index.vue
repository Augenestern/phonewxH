<template>
  <div>
    <!-- <div class="topTitle">
      <div class="topTitle-name">我的</div> -->
      <!-- <img src="@/assets/我的小.png" alt=""> -->
    <!-- </div> -->
    <div style="background-color: #faf8f8;; min-height: 92vh;">
      <div style="height: 10px;"></div>
      <div class="grCard">
        <div style="width: 80%; height: 50%; display: grid; grid-template-columns: 1fr 3fr;  gap: 10px;">
          <div style=";grid-row: span 2;">
            <img v-if="ls.AvatarUrl" :src="ls.AvatarUrl" alt="" style="width: 70px; border-radius: 50%;">
            <img v-else src="@/assets/111.png" alt="" style="width: 70px; border-radius: 50%;">
          </div>
          <div style="font-size: 1.0625rem; font-weight: 600; padding-top: 6px;">{{ ls.name }}</div>
          <div style="font-size: 1rem; color: #8a8989;">账号:{{ ls.account }}</div>
        </div>
      </div>
      <div style="margin-top: 4vh;">
        <van-cell style=" font-size:1rem;" title="手机号" :value="ls.phone" />
        <!-- <van-cell style=" font-size:0.75rem;" title="性别" :value="ls.sex" /> -->
        <van-cell style=" font-size:1rem;" title="修改密码" is-link to="/changePass" />
        <van-cell style=" font-size:1rem;" title="退出登录" is-link @click="quit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import { createPinia  } from 'pinia';
import { getRoleName } from '@/api/wxLogin';
const pinia:any = createPinia()
import { showDialog } from 'vant'
// import { useMain } from "@/store/home";
// const userMain: any = JSON.parse(JSON.stringify(useMain().userInfo));
// const userMain: any = useMain().userInfo;
const router = new (useRouter as any)
let ls: any = JSON.parse(localStorage.getItem('userInfo'))

const quit = () => {
  showConfirmDialog({
    title: '退出登录',
    // message:
    //     '返回到登录页面？',-
  })
    .then(() => {
      router.push('/login')
      localStorage.clear()
      pinia.reset()
      console.log(111);
    })
    .catch(() => {
      // on cancel
    });
}
const getRole = () => {
    let ls: any = JSON.parse(localStorage.getItem('userInfo'))
    console.log(ls);
    let params = {
        phone: ls.phone
    }
    getRoleName(params).then((res) => {
        if (res.data.data != localStorage.getItem('role')) {
            showDialog({
                message: '用户角色已改变，请重新登录',
            }).then(() => {
                router.push('/login')
                localStorage.clear()
                pinia.reset()

            });
        }
    })
}
onMounted(() => {
  getRole()
 });
onUnmounted(() => { });
</script>

<style lang="less" scoped>
.topTitle {
  position: sticky;
  top: 0;
  height: 6vh;
  // background-color: aqua;
  z-index: 10;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;

  &-name {
  }

  img {
    margin-left: 4px;
    width: 16px;
    margin-top: 1vh;
  }
}

.grCard {
  margin-top: 6px;
  width: 94%;
  margin-left: 3%;
  height: 20vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 4px #eee;
  font-size: 1rem;;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grList {
  width: 100%;
  height: 6vh;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
