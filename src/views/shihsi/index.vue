<template>
  <div>
    <div class="topTitle">
      <div class="topTitle-name">气站</div>
      <img src="@/assets/数据统计.png" alt="">
    </div>
    <van-tabs v-model:active="active" @click-tab="onClickTab" line-width="33vw" line-height="1px" sticky animated
      swipeable offset-top="4vh">
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

const active = ref(0);
const onClickTab = ({ title }) => {
  // console.log(active.value, title);
};
onMounted(() => { });
onUnmounted(() => { });
</script>

<style lang="less" scoped>
.topTitle {
  position: sticky;
  top: 0;
  height: 4vh;
  // background-color: aqua;
  z-index: 10;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;

  &-name {
    margin-left: 5vw;
    margin-top: 1vh;
  }

  img {
    margin-left: 4px;
    width: 18px;
    margin-top: 1vh;
  }
}
</style>
