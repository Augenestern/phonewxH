<template>
    <div>
        <div class="topTitle">
            <div class="topTitle-name">气站</div>
            <img src="@/assets/数据统计.png" alt="">
        </div>
        <div
            style="background-color: #faf8f8; display: flex;align-items: center;flex-direction: column; width: 100%;min-height: 94vh;">
            <div style="height: 1px;"></div>
            <div v-for="item in qizhanData" class="qzCard" @click="toDetail(item)">
                <div class="qzCard-top">
                    <div style="position: absolute;top: 50%;transform: translateY(-50%); font-size: 14px;">{{ item.zhandian
                    }}</div>
                    <div style="position: absolute;top: 50%;transform: translateY(-50%); right: 4vw; color: #afafaf;">{{
                        item.Time }}</div>
                </div>
                <div class="qzCard-bottom">
                    <div
                        style="display: flex; flex-direction: column;align-items: center;justify-content: center; width: 22vw;">
                        <div style="font-size: 24px; font-weight: 700;">{{ Number(item.yongliang).toFixed(0) }}</div>
                        <div style="font-weight: 600;">今日用量</div>
                    </div>
                    <div style="display: flex; width: 60vw; margin-left: 8vw; align-items: center;">
                        <div style="flex: 1.1;">
                            <div><span style=" color:#afafaf">压力</span>&nbsp;&nbsp; {{ Number(item.yali).toFixed(2) }}</div>
                            <div style="margin-top: 1.4vh;"><span style=" color:#afafaf">温度</span>&nbsp;&nbsp; {{ Number(
                                item.wendu).toFixed(2)
                            }}</div>
                        </div>
                        <div style="flex: 1.5;">
                            <div><span style=" color:#afafaf">前端压力</span> {{ Number(item.qianduanyali).toFixed(2) }}</div>
                            <div style="margin-top: 1.4vh;"><span
                                    style=" color:#afafaf">流量</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                                        Number(item.liuliang
                                        ).toFixed(2)
                                    }}</div>
                        </div>
                    </div>
                </div>
                <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; bottom: 12.4vh;"></div>
                <div style="position: absolute;width: 1px;height: 48%;background-color: #e4e4e4; bottom: 1.4vh;left: 30vw;">
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
const userMain = useMain()
let qizhanData: any = ref([
])
const toDetail = (items: any) => {
    userMain.nowZhandian = items
    router.push('/sdqizhan')
}
const getData = () => {
    getStationData().then((res) => {
        let xx = res.data.data
        let zhandianName:any = []
        for (let i = 0; i < xx.length; i++) {
            // console.log(xx[i]);
            let lsshuju: any = {}
            zhandianName.push({name:xx[i].name})
            lsshuju.zhandian = xx[i].name
            lsshuju.yali = xx[i].data.DTUDataDetail[4].value
            lsshuju.yongliang = xx[i].todayYQL
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
    getData()
});
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
    padding-bottom: 2vh;

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

.qzCard {
    width: 94%;
    height: 18vh;
    margin-top: 6px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 4px 2px #eee;
    font-size: 12px;
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
  