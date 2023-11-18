<template>
    <div>
        <div style="width: 100%;position: absolute;"> <van-nav-bar title="位置" left-text="返回" left-arrow
                @click-left="onClickLeft" /></div>
        <div class="detailMap">
            <div id="container"></div>
        </div>
        <van-floating-panel :content-draggable="false" v-model:height="height" :anchors="anchors">
            <div v-if="imgSign" class="btnmap" @click="toNowPosition"><img style="width: 25px;" src="@/assets/404定位 (1).png"
                    alt=""></div>
            <div v-else class="btnmap"><img style="width: 25px;" src="@/assets/404定位.png" alt=""></div>
            <div style="text-align: center; padding: 15px">
                <p>车辆位置详细信息</p>
            </div>
        </van-floating-panel>
    </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
const onClickLeft = () => history.back();

const anchors = [
    100,
    Math.round(0.4 * window.innerHeight),
    Math.round(0.7 * window.innerHeight),
];

const height = ref(anchors[1]);
let imgSign = ref(true)
let map: any = null;
const targetLatLng = [114.568, 36.394500]

const toNowPosition = () => {
    map.panTo(targetLatLng)
    imgSign.value = false
}
const initMap = async () => {
    AMapLoader.load({
        key: "0ea7e0b5d7a1c4657b75d1ee64e54b66",
        version: "2.0",       // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Driving'],
    }).then((AMap) => {
        map = new AMap.Map('container', {
            center: [114.568, 36.394500],
            zoom: 16,
            // showBuildingBlock: false,
            // showLabel: false,
        })
        map.on('click', () => {
            height.value = anchors[0]
        })
        map.on('dragging', () => {
            height.value = anchors[0]
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
        const roadNetLayer = new AMap.TileLayer.RoadNet();
        map.add(roadNetLayer);

    })
        .catch((e: any) => {
            console.log(e);
        });
}
onMounted(() => {
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
    width: 34px;
    height: 34px;
    background-color: white;
    position: absolute;
    top: -40px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
</style>