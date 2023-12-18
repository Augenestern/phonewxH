<template>
    <div>
        <div style="width: 100%; position: sticky;top: 0px;z-index: 10;"> <van-nav-bar :title=userMain.zhandian left-text="返回" left-arrow
                @click-left="onClickLeft" /></div>
        <div
            style="position: sticky;display: flex;width: 100vw;height: 4.8vh;font-size: 1.0625rem; top:4.8vh; background-color: #fff;z-index: 20;">
            <div style="flex: 1;display: flex;justify-content: center;align-items: center; background-color: #fff;border-bottom: 1px solid #eeeeee;"
                 @click="onClickTab('数据')">
                <div style="width: 20vw;display: flex; align-items: center;justify-content: center;height:100%;" :style="title === '数据' ? { borderBottom: '2px solid #429efa' } : {}">数据</div>
            </div>
            <!-- <div style="flex: 1;display: flex;justify-content: center; align-items: center; background-color: #fff;"
                :style="title === '车辆' ? { borderBottom: '2px solid #429efa' } : {}" @click="onClickTab('车辆')">车辆</div> -->
            <div style="flex: 1;display: flex;justify-content: center;align-items: center; background-color: #fff;border-bottom: 1px solid #f5f5f5;"
                 @click="onClickTab('订单')">
                <div style="width: 20vw;display: flex;align-items: center;justify-content: center;height:100%;" :style="title === '订单' ? { borderBottom: '2px solid #429efa' } : {}">订单</div>
            </div>
        </div>
        <div style="width: 100vw;min-height: 84vh;">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from '@/routes';
const route = new (useRoute as any)
// import tabs1 from './tabs/tabs1.vue'
// import tabs2 from './tabs/tabs2.vue'
// import tabs3 from './tabs/tabs3.vue'
import { useMain } from '@/store/home'
const userMain = JSON.parse(JSON.stringify(useMain().nowZhandian))
let title = ref('数据')
const onClickLeft = () => {
    router.push('/zhandian')
};
const active = ref(0);
const onClickTab = (item: any) => {
    title.value = item
    if (title.value == '数据') {
        router.push('/first')
    } else if (title.value == '车辆') {
        router.push('/second')
    } else if (title.value == '订单') {
        router.push('/third')
    }
    console.log(active.value, title);
};
onMounted(() => {
    let xx = route.path
    if (xx == '/first') {
        title.value = '数据'
    } else if (xx == '/second') {
        title.value = '车辆'
    } else if (xx == '/third') {
        title.value = '订单'
    }
    console.log(122);
});
onUnmounted(() => { });
</script>
  
<style lang="less" scoped>
/deep/.van-nav-bar__text{
    font-size: 1.06rem;
}
/deep/.van-nav-bar__title{
    font-size: 1.25rem;
}
</style>
  