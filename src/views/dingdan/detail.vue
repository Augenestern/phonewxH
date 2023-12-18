<template>
    <div>
        <div style="width: 100%;position: absolute;"> <van-nav-bar title="位置" left-text="返回" left-arrow
                @click-left="onClickLeft" /></div>
        <div class="detailMap">
            <div id="container"></div>
        </div>
        <van-floating-panel :content-draggable="false" v-model:height="height" :anchors="anchors">
            <div v-if="imgSign" class="btnmap" @click="toNowPosition"><img style="width: 25px;" src="@/assets/dingwei1.png"
                    alt=""></div>
            <div v-else class="btnmap"><img style="width: 25px;" src="@/assets/dingwei.png" alt=""></div>
            <div style="display: flex;flex-direction: row; padding-left: 10vw;font-size: 0.8rem;padding-right: 10vw;">
                <div style="width: 28vw;margin-top: 0vh">
                    <div style="height: 5vh;">站点:</div>
                    <div style="height: 6vh;">车辆位置:</div>
                    <div style="height: 6vh;">派车时间:</div>
                    <div style="height: 5vh;">司机姓名:</div>
                    <div style="height: 5vh;">司机电话:</div>
                    <div style="height: 5vh;">车牌号:</div>
                </div>
                <div style=" margin-left: 3vw;">
                    <div style="height: 5vh; margin-top: 0.2vh;">{{ userMain.stationName }}</div>
                    <div style="height: 6vh;margin-top: 0vh;">{{ userMain.address }}</div>
                    <div style="height: 6vh; margin-top: 0.3vh;">{{ userMain.commitTime }}</div>
                    <div style="height: 5vh; margin-top: -0.3vh;">{{ userMain.driverName }}</div>
                    <div style="height: 5vh;">{{ userMain.driverPhone }}</div>
                    <div style="height: 5vh;">{{ userMain.orderData.carName }}</div>
                </div>
            </div>
        </van-floating-panel>
    </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { useMain } from "@/store/home";
import simple from '@/assets/simple.png'
const userMain: any = JSON.parse(JSON.stringify(useMain().orderInfo));

const onClickLeft = () => history.back();

const anchors = [
    // 100,
    Math.round(0.4 * window.innerHeight),
    // Math.round(0.7 * window.innerHeight),
];

const height = ref(anchors[0]);
let imgSign = ref(true)
let map: any = null;
// let lsBiaoji = [
//     [114.596797, 36.64964], [114.590757, 36.649345], [114.587753, 36.652719], [114.587838, 36.660121], [114.577367, 36.660465], [114.538529, 36.646556], [114.522393, 36.628787], [114.521363, 36.616387], [114.523834, 36.611102]
// ]
// let index = 0

const toNowPosition = () => {
    map.panTo([userMain.gaoLng,userMain.gaoLat])
    imgSign.value = false
}
const initMap = async () => {
    AMapLoader.load({
        key: "0ea7e0b5d7a1c4657b75d1ee64e54b66",
        version: "2.0",       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Driving'],
    }).then((AMap) => {
        map = new AMap.Map('container', {
            center: [userMain.gaoLng,userMain.gaoLat],
            zoom: 16,
            // showBuildingBlock: false,
            // showLabel: false,
        })
        // map.on('click', () => {
        //     height.value = anchors[0]
        // })
        map.on('dragging', () => {
            // height.value = anchors[0]
            imgSign.value = true
        })

        //交通图层
        const traffic = new AMap.TileLayer.Traffic({
            autoRefresh: true,     //是否自动刷新，默认为false
            interval: 180,         //刷新间隔，默认180s
            zIndex: 10,
            zooms: [7, 22],
        });
        map.add(traffic)

        const marker = new AMap.Marker({
            position: [userMain.gaoLng,userMain.gaoLat],
            offset: new AMap.Pixel(-10, -10),
            icon: simple, // 添加 Icon 图标 URL
            title: "当前位置"
        });
        
        map.add(marker);

        //路线轨迹
        // AMap.plugin('AMap.Driving', function () {
        //     var driving = new AMap.Driving({
        //         // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        //         map: map,
        //         hideMarkers: true,
        //         policy: AMap.DrivingPolicy.LEAST_TIME
        //     })

        //     // let startLngLat = [114.538529, 36.646556]
        //     // let endLngLat = [114.522393, 36.628787]
        //     // driving.search(startLngLat, endLngLat, function (status: any, result: any) {
        //     //     console.log(result);
        //     // })

        //     let gpsData: any = []
        //     let pointPath: any = [lsBiaoji[0]]
        //     // setInterval(() => {
        //     gpsData.push(lsBiaoji[index])
        //     index++
        //     // nowPoint = lsBiaoji[index]
        //     if (gpsData.length > 1) {
        //         let startLngLat = gpsData[gpsData.length - 2]
        //         let endLngLat = gpsData[gpsData.length - 1]
        //         driving.search(startLngLat, endLngLat, function (status: any, result: any) {
        //             console.log(result);

        //             if (status === 'complete') {
        //                 var distance = result.routes[0].distance;  // 获取路程距离
        //                 let steps = result.routes[0].steps
        //                 for (let i = 0; i < steps.length; i++) {
        //                     let xx = steps[i].path
        //                     //  pointPath.push([steps[i].end_location.lng, steps[i].end_location.lat])
        //                     for (let j = 0; j < xx.length; j++) {
        //                         pointPath.push([xx[j].lng, xx[j].lat])
        //                     }
        //                 }
        //                 console.log(distance, pointPath);

        //                 // var path = parseRouteTo
        //                 // 在地图上绘制轨迹线
        //                 var polyline = new AMap.Polyline({
        //                     path: pointPath,
        //                     strokeColor: '#FF0000',  // 设置轨迹线颜色
        //                     strokeWeight: 4,  // 设置轨迹线宽度
        //                     zIndex: 20,
        //                 });
        //                 map.add(polyline);
        //             }
        //         })
        //     }
        //     // }, 4000);
        // })
        // const roadNetLayer = new AMap.TileLayer.RoadNet();
        // map.add(roadNetLayer);

    })
        .catch((e: any) => {
            console.log(e);
        });
}
onMounted(() => {
    window._AMapSecurityConfig = {
        securityJsCode: '801ce0f5f1df5e633dd661f9f8a064a7',
    }
    initMap()
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
.detailMap {
    width: 100vw;
    height: 100vh;
}

#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
}

.btnmap {
    width: 36px;
    height: 36px;
    background-color: white;
    position: absolute;
    top: -40px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
/deep/.van-nav-bar__text{
    font-size: 1.06rem;
}
/deep/.van-nav-bar__title{
    font-size: 1.25rem;
}
</style>