<template>
    <div>
        <div style="width: 100%; position: sticky;top: 0px;z-index: 10;"> <van-nav-bar title="站点" left-text="返回" left-arrow @click-left="onClickLeft" /></div>
        <van-tabs v-model:active="active" @click-tab="onClickTab" line-width="33vw" line-height="1px" sticky animated
            swipeable offset-top="7vh">
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
const onClickLeft = () => history.back();

const active = ref(0);
const onClickTab = ({ title }) => {
    console.log(active.value, title);
};
onMounted(() => { });
onUnmounted(() => { });
</script>
  
<style lang="less" scoped></style>
  