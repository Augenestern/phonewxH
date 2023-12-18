<template>
    <div class="echBox">
        <div class="echTitle">&nbsp; &nbsp;&nbsp;温度</div>
        <div class="echarts" ref="leftEcharts">
        </div>
    </div>
</template>
    
<script setup lang="ts">
import * as echarts from 'echarts'
const props = defineProps(['echartsData'])
watch(()=>props.echartsData,()=>{
    myChart?.dispose()
    initEcharts()
},{deep:true})
onMounted(() => {
})
let colors: any = ["#319ef8", "rgba(48, 158, 248,0.5)", 'rgba(48, 158, 248,0.4)']
let initEcharts = () => {
    myChart = echarts.init(leftEcharts.value as any); 
    let state = reactive({
        option: {
            tooltip: {
                trigger: "axis",
                textStyle: {
                    fontSize: 12,
                },
                // formatter: function (params: any) {
                //     var relVal = params[0].name;
                //     for (var i = 0, l = params.length; i < l; i++) {
                //         relVal +=
                //             "<br/>" + params[i].marker + params[i].seriesName + '  ' + params[i].value.toFixed(3) + "H";
                //     }
                //     return relVal;
                // }
            },
            // legend: {
            //     show: true,
            //     // icon: "rect",
            //     right: 20,
            //     itemWidth: 10,
            //     itemHeight: 6,
            //     data: ["线1", '线2'],
            //     textStyle: {
            //         color: ["#19a3df", "#d5b00a", "#3fb594", "#db6c72", "#585eaa", "#d5b00a", "#3fb594", '#db6c72'],
            //         fontSize: 10
            //     }
            // },
            grid: {
                top: "12%",
                bottom: '18%',
                left: '12%',
                right: '6%'
            },
            xAxis: {
                data: props.echartsData.xData,
                type: "category",
                boundaryGap: false,
                axisTick: {
                    show: false,
                },
                axisLine:{
                    show:false
                },
                axisLabel: {
                    interval: "auto",
                    formatter: function (value: any) {
                        return value.slice(11,16)
                    },
                    fontSize: 9,
                    color: 'rgb(108, 109, 109)'
                },
            },
            yAxis: {
                type: 'value',
                boundaryGap: ['0%', '100%'],
                splitLine: {
                    show: true
                },
                axisLabel: {
                    fontSize: 9,
                    color: 'rgb(108, 109, 109)'
                },
            },
            series: [
                {
                    name: '温度',
                    data: props.echartsData.y1Data,
                    type: "line",
                    symbol: "circle",
                    symbolSize: 6,
                    showSymbol: false,
                    zlevel: 3,
                    itemStyle: {
                        //圆点颜色
                        color: colors[0],
                        // borderColor: "#a3c8d8",
                    },
                    lineStyle: {
                        normal: {
                            width: 2,
                            //线条颜色
                            color: colors[0],
                        },
                    },
                    smooth: true,

                    //区域颜色
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: colors[1],
                                    },
                                    {
                                        offset: 0.9,
                                        color: colors[2],
                                    },
                                ],
                                false
                            ),
                        },
                    },
                }
            ]
        }
    })
    state.option && myChart.setOption(state.option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
//echarts
let myChart: any = null
let leftEcharts: any = ref(null)

onUnmounted(() => {
    myChart?.dispose()
})
</script>
    
<style lang="less" scoped>
.echBox {
    width: 100%;
    height: 100%;
    position: relative;
    // color: rgb(48, 158, 248);
}

.echTitle {
    font-size:1.0625rem;
    font-weight: 600;
    width: 100%;
    height: 14%;
    // padding-left: 12px;
    display: flex;
    align-items: center;
}
.echarts{
    position: absolute;
    width: 100vw;
    height: 26vh;
    // background-color: aqua;
}
</style>