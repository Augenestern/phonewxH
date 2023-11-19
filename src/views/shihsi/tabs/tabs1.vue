<template>
    <div>
        <div style="background-color: #eee;">
            <div style="height: 0.1px;"></div>
            <div class="echCard cardOne">
                <div class="cardOne-hang" style="border-bottom:1px solid #a5d1f5;">
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
                        <div class="cardone-texFont">用气量</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
                        <div class="cardone-texFont">总量</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
                        <div class="cardone-texFont">温度</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
                        <div class="cardone-texFont">压力</div>
                    </div>
                </div>
                <div class="cardOne-hang">
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
                        <div class="cardone-texFont">流量</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
                        <div class="cardone-texFont">前端压力</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
                        <div class="cardone-texFont">泄露</div>
                        <div class="cardLine"></div>
                    </div>
                    <div class="cardOne-hang-lie">
                        <div class="cardone-numFont">0000</div>
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
import liuliang from '../echarts/liuliang.vue'
import yongqiliang from '../echarts/yongqiliang.vue'
import yali from '../echarts/yali.vue'
import qianduanyali from '../echarts/qianduanyali.vue'
import wendu from '../echarts/wendu.vue'

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
setTimeout(() => {
    yongqiliangData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
    yongqiliangData.y1Data = [6, 4, 3, 4, 4, 4, 6, 3, 6, 2, 3, 5, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 3]
    yaliData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
    yaliData.y1Data = [4, 4, 6, 3, 6, 2, 3, 5, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 6, 4, 3, 4, 3]
    qianduanyaliData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
    qianduanyaliData.y1Data = [6, 6, 3, 6, 2, 3, 5, 4, 4, 6, 4, 3, 4, 4, 4, 3, 6, 2, 3, 4, 4, 4, 6, 3]
    liuliangData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
    liuliangData.y1Data = [6, 4, 3, 4, 4, 4, 6, 3, 6, 2, 3, 5, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 3]
    wenduData.xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
    wenduData.y1Data = [6, 6, 2, 3, 5, 4, 4, 6, 3, 4, 3, 4, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 3]
}, 1000);
onMounted(() => {
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
    font-size: 12px;
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
    height: 25vh;
    display: flex;
    flex-direction: column;
    font-size: 12px;

    &-hang {
        flex: 1;
        display: flex;
        flex-direction: row;

        &-lie {
            flex: 1;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>