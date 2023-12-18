<template>
  <div>
    <!-- <div class="topTitle">
      <div class="topTitle-name">气站</div> -->
    <!-- <img src="@/assets/数据统计.png" alt=""> -->
    <!-- </div> -->
    <van-tabs v-model:active="active" @click-tab="onClickTab" line-width="20vw" line-height="2px" sticky animated
      swipeable offset-top="0vh">
      <van-tab title="实时">
        <tabs1></tabs1>
      </van-tab>
      <van-tab title="24小时">
        <tabs2></tabs2>
      </van-tab>
      <van-tab title="近7日">
        <tabs3></tabs3>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import tabs1 from './tabs/tabs1.vue'
import tabs2 from './tabs/tabs2.vue'
import tabs3 from './tabs/tabs3.vue'
import { getRoleName } from '@/api/wxLogin';
import router from '@/routes';
import { createPinia } from 'pinia';
const pinia: any = createPinia()
import { showDialog } from 'vant'
const active = ref(0);
const onClickTab = ({ title }) => {
  // console.log(active.value, title);
};

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
  // console.log(111);
  // let data = {
  //   _id:'6551d5e58dccfd6067ff1ab5',
  //   account:'qwer',
  //   name:'nic',
  //   phone:'sss',
  //   role:"管理员",
  // }
  // localStorage.setItem('userInfo',JSON.stringify(data))
  // localStorage.setItem('role','管理员')
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
  background-color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &-name {}

  img {
    margin-left: 4px;
    width: 18px;
    margin-top: 1vh;
  }
}
</style>
