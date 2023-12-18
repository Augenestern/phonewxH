<template>
    <div>
        <!-- <div class="topTitle">
            <div class="topTitle-name">气站</div> -->
        <!-- <img src="@/assets/数据统计.png" alt=""> -->
        <!-- </div> -->
        <div
            style="background-color: #faf8f8; display: flex;align-items: center;flex-direction: column; width: 100%;min-height: 94vh;">
            <div style="height: 1px;"></div>
            <div v-for="item in qizhanData" class="qzCard" @click="toDetail(item)">
                <div class="qzCard-top">
                    <div style="position: absolute;top: 50%;transform: translateY(-50%); font-size: 1.25rem;left: 2.5%;">{{
                        item.zhandian
                    }}</div>
                    <!-- <div style="position: absolute;top: 50%;transform: translateY(-50%); right: 6vw; color: #afafaf;">{{
                        item.Time }}</div> -->
                </div>
                <div class="qzCard-bottom">
                    <div
                        style="display: flex; flex-direction: column;align-items: center;justify-content: center; width: 20vw;">
                        <div style="font-size: 1.75rem;">{{ item.yongliang ? Number(item.yongliang).toFixed(0) : '--' }}
                        </div>
                        <div style="font-size: 1rem; color: #afafaf;">今日用量</div>
                    </div>
                    <div style="display: flex; width: 60vw; margin-left: 8vw; align-items: center;">
                        <div style="flex: 1.1;margin-left: 10px;">
                            <div><span style=" color:#afafaf">压力</span>&nbsp;&nbsp; {{ Number(item.yali).toFixed(2) }}</div>
                            <div style="margin-top: 1.4vh;"><span style=" color:#afafaf">温度</span>&nbsp;&nbsp; {{ Number(
                                item.wendu).toFixed(2)
                            }}</div>
                        </div>
                        <div style="flex: 1.3;">
                            <div style="position: relative;">
                                <span style=" color:#afafaf">前端压力</span>
                                <span style="position: absolute;right: 4vw;">{{ Number(item.qianduanyali).toFixed(2) }}</span>
                            </div>
                            <div style="margin-top: 1.4vh;position: relative;">
                                <span style=" color:#afafaf ">流量</span>
                                <span style="position: absolute;right: 4vw;"> {{ Number(item.liuliang).toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; bottom: 12.4vh;"></div>
                <div style="position: absolute;width: 1px;height: 48%;background-color: #e4e4e4; bottom: 1.4vh;left: 28vw;">
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import router from '@/routes';
import dayjs from 'dayjs';
import { getStationData } from '@/api/production/station'
import { useMain } from '@/store/home'

import { getRoleName } from '@/api/wxLogin';
import { createPinia } from 'pinia';
const pinia: any = createPinia()
import { showDialog } from 'vant'
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
const userMain = useMain()
let qizhanData: any = ref([
    // { zhandian: 'test' ,Time:'2021-03-03 23:03:00',yongliang:842}
])
const toDetail = (items: any) => {
    //当前站点数据
    userMain.nowZhandian = items
    router.push('/sdqizhan')
}
const getData = () => {
    let userInfo: any = JSON.parse(localStorage.getItem('userInfo'))
    let params = {
        // stationId:'6559f2b892753a5dcdc583bc',
        userId: userInfo._id
        // userId: '65657b4ce6dc927be4c8c4aa'
    }
    getStationData(params).then((res) => {
        let xx = res.data.data
        console.log(res);
        let zhandianName: any = []
        for (let i = 0; i < xx.length; i++) {
            // console.log(xx[i]);
            let lsshuju: any = {}
            zhandianName.push({ name: xx[i].name, id: xx[i]._id })
            lsshuju.zhandian = xx[i].name
            lsshuju.yali = xx[i].data.DTUDataDetail[4].value
            lsshuju.yongliang = xx[i].todayYQL
            lsshuju.zdId = xx[i]._id
            lsshuju.wendu = xx[i].data.DTUDataDetail[5].value
            lsshuju.qianduanyali = xx[i].data.DTUDataDetail[11].value
            lsshuju.liuliang = xx[i].data.DTUDataDetail[3].value
            lsshuju.zongliang = xx[i].data.DTUDataDetail[2].value
            lsshuju.xielong = xx[i].data.DTUDataDetail[8].value
            lsshuju.dianchi = xx[i].data.DTUDataDetail[7].value
            lsshuju.Time = dayjs().format('YYYY-MM-DD HH:mm')
            qizhanData.value.push(lsshuju)
        }
        userMain.zdName = zhandianName
    })
}
onMounted(() => {
    getRole()
    getData()
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
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;

    &-name {}

    img {
        margin-left: 4px;
        width: 18px;
        margin-top: 1vh;
    }
}

.qzCard {
    width: 94%;
    height: 18vh;
    margin-top: 6px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 4px 2px #eee;
    font-size: 1rem;
    position: relative;
    padding-left: 4vw;
    box-sizing: border-box;

    &-bottom {
        display: flex;
        height: 12.4vh;
    }

    &-top {
        position: relative;
        height: 5.6vh;
    }
}
</style>
  