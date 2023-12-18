<template>
    <div>
        <div style="background-color: #eee;">
            <div class="echCard cardOne" @click="toHisyql">
                <div class="cardOne-title"
                    style="height: 5vh; font-size: 1.0625rem;font-weight: 600; width: 100%;display: flex;align-items: center;">
                    &nbsp; &nbsp;&nbsp;数据概况 | {{ useMain().nowZhandian.zhandian }}</div>
                <div class="cardOne-hang" style="border-bottom:1px solid #ebebeb;">
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.yongliang).toFixed(2) }}</div>
                        <div class="cardone-texFont">今日用气量</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.zongliang).toFixed(2) }}</div>
                        <div class="cardone-texFont">总量</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.wendu).toFixed(2) }}</div>
                        <div class="cardone-texFont">温度</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.yali).toFixed(2) }}</div>
                        <div class="cardone-texFont">压力</div>
                    </div>
                </div>
                <div class="cardOne-hang">
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.liuliang).toFixed(2) }}</div>
                        <div class="cardone-texFont">流量</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.qianduanyali).toFixed(2) }}</div>
                        <div class="cardone-texFont">前端压力</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.xielong).toFixed(2) }}</div>
                        <div class="cardone-texFont">泄露</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">{{ Number(useMain().nowZhandian.dianchi).toFixed(2) }}</div>
                        <div class="cardone-texFont">电池</div>
                    </div>
                </div>
            </div>
            <div class="echCard">
                <yongqiliang :echartsData=yongqiliangData></yongqiliang>
            </div>
            <div class="echCard">
                <yali :echartsData=yaliData></yali>
            </div>
            <div class="echCard">
                <qianduanyali :echartsData=qianduanyaliData></qianduanyali>
            </div>
            <div class="echCard">
                <liuliang :echartsData=liuliangData></liuliang>
            </div>
            <div class="echCard">
                <wendu :echartsData=wenduData></wendu>
            </div>
            <div style="height:9vh"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import liuliang from '../echarts/liuliang.vue'
import yongqiliang from '../echarts/yongqiliang.vue'
import yali from '../echarts/yali.vue'
import qianduanyali from '../echarts/qianduanyali.vue'
import wendu from '../echarts/wendu.vue'
import {getStationEchaData} from '@/api/production/station'
import { getStationData } from '@/api/production/station'
import { useMain } from '@/store/home'
import router from '@/routes'
let yongqiliangData = reactive({
    xData: [] as any,
    y1Data: [] as any
})
let yaliData = reactive({
    xData: [] as any,
    y1Data: [] as any
})
let qianduanyaliData = reactive({
    xData: [] as any,
    y1Data: [] as any
})
let liuliangData = reactive({
    xData: [] as any,
    y1Data: [] as any
})
let wenduData = reactive({
    xData: [] as any,
    y1Data: [] as any
})
// setTimeout(() => {
//     yongqiliangData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
//     yongqiliangData.y1Data = [6, 4, 3, 4, 4, 4, 6, 3, 6, 2, 3, 5, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 3]
//     yaliData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
//     yaliData.y1Data = [4, 4, 6, 3, 6, 2, 3, 5, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 6, 4, 3, 4, 3]
//     qianduanyaliData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
//     qianduanyaliData.y1Data = [6, 6, 3, 6, 2, 3, 5, 4, 4, 6, 4, 3, 4, 4, 4, 3, 6, 2, 3, 4, 4, 4, 6, 3]
//     liuliangData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
//     liuliangData.y1Data = [6, 4, 3, 4, 4, 4, 6, 3, 6, 2, 3, 5, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 3]
//     wenduData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
//     wenduData.y1Data = [6, 6, 2, 3, 5, 4, 4, 6, 3, 4, 3, 4, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 3]
// }, 1000);
const getData = ()=>{
    var currentDate = new Date().getTime();
    let eTime1 = dayjs(currentDate).format('YYYY-MM-DD HH:mm:ss')
    var previousDate = currentDate - 7*( 24 * 60 * 60 * 1000);
    let sTime1 = dayjs(previousDate).format('YYYY-MM-DD HH:mm:ss')
    
    let params = {
        stationId: useMain().nowZhandian.zdId,
        userId: userInfo._id,
        interval:'Hour',
        startTime:sTime1,
        endTime:eTime1
    }
    // console.log(params);
    getStationEchaData(params).then((res)=>{
        let xx = res.data.data.data
        // console.log(res)
        for(let i=xx.length-1;i>=0;i--){
            let yy = xx[i][3].Value
            yaliData.xData.push(xx[i][4].Value)
            yongqiliangData.xData.push(xx[i][4].Value)
            qianduanyaliData.xData.push(xx[i][4].Value)
            liuliangData.xData.push(xx[i][4].Value)
            wenduData.xData.push(xx[i][4].Value)
            for(let j=0;j<yy.length;j++){
                if(yy[j][0].Value=='k'){
                    yaliData.y1Data.push(yy[j][1].Value)
                }
                else if(yy[j][0].Value=='u3'){
                    qianduanyaliData.y1Data.push(yy[j][1].Value)
                }
                else if(yy[j][0].Value=='z3'){
                    yongqiliangData.y1Data.push(yy[j][1].Value)
                }
                else if(yy[j][0].Value=='l'){
                    liuliangData.y1Data.push(yy[j][1].Value)
                }
                else if(yy[j][0].Value=='t'){
                    wenduData.y1Data.push(yy[j][1].Value)
                }
            }
        }
    })
}

const toHisyql = ()=>{
    router.push('/ssdetail')
}
let userInfo:any = JSON.parse(localStorage.getItem('userInfo'))
let qizhanData: any = ref([])
const getGkuanData = () => {
    let params = {
        userId: userInfo._id
    }
    getStationData(params).then((res) => {
        let xx = res.data.data
        console.log(res);
        for (let i = 0; i < xx.length; i++) {
            // console.log(xx[i]);
            let lsshuju: any = {}
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
        useMain().nowZhandian = qizhanData.value[0]
    })
}
onMounted(() => {
    if(Object.keys(useMain().nowZhandian).length===0){
        console.log(11);
        getGkuanData()
    }
    getData()
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
.cardone-numFont {
    // color: rgb(36, 128, 204);
    color: #319ef8;
}

.cardone-texFont {
    margin-top: 8px;
    font-size: 1rem;
    color: #6c6d6d;
}

.cardLine {
    position: absolute;
    background-color: #a5d1f5;
    width: 1px;
    height: 70%;
    top: 50%;
    transform: translateY(-50%);
    right: 0px;
}

.echCard {
    width: 100vw;
    height: 30vh;
    margin-top: 6px;
    background-color: #fff;
}
.cardOne {
    height: 30vh;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    margin-top: 0px;
    border-top: 1px solid #ebebeb;
    &-title{
        flex: 1.7;
        // background-color: #319ef8;
    }
    &-hang {
        flex: 4;
        display: flex;
        flex-direction: row;

        &-lie {
            flex: 4;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>