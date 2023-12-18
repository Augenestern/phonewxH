<template>
    <div>
        <div style="width: 100%; position: sticky;top: 0px;z-index: 10;"> <van-nav-bar title="历史用气量" left-text="返回"
                left-arrow @click-left="onClickLeft" /></div>
    </div>
    <div class="min-table" ref="cont">
        <table style="width: 100%;">
            <tr class="item" style="position: sticky;top: 0; z-index: 10;">
                <td style="background-color: #f6f6f6;font-weight: bold; text-align: left;padding-right: 0;padding-left: 3vh;width: 28vw;">
                    时间
                </td>
                <td style="background-color: #fdf1ea; color: rgb(178, 82, 31);width: 28vw">
                    站点
                </td>
                <td style="background-color: #e9f1fe">当日用气量</td>
            </tr>
            <tr v-for="item in tableData" :key="item._id">
                <td style="text-align: left;padding-left: 3vh;">{{ item.createtime.slice(0,11) }}</td>
                <td>{{ item.stationname }}</td>
                <td>{{ item.data.value }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { getStationHistoryData } from "@/api/production/station";
import { useMain } from '@/store/home'
const onClickLeft = () => {
    history.back()
};
let currPage1: any = ref(1)
let tableData: any = ref([])
const getData = () => {
    let params = {
        pageSize: 20,
        currPage: currPage1.value,
        // stationId: '6565e350431fc028daa716dd',
        stationId:useMain().nowZhandian.zdId,
    }
    getStationHistoryData(params).then((res) => {
        tableData.value = res.data.data[0]
    })
}

let cont: any = ref(null)
let fenyeSign = ref(true)
let scroll = async (e: any) => {
    let scrollTop = e.target.scrollTop; //滑入屏幕滚动条滚动时，距离顶部的距离
    let windowHeitht = e.target.clientHeight; //能看到的页面的高度
    let scrollHeight = e.target.scrollHeight; //监控的整个div的高度（包括现在看到的和上下隐藏起来看不到的）
    let total = scrollTop + windowHeitht
    if (total == scrollHeight) {
        if (fenyeSign.value) {
            fenyeSign.value = false
            console.log("到底了")
            //加载操作
            currPage1.value++
            // console.log(currPage1.value);
            let params = {
                pageSize: 20,
                currPage: currPage1.value,
                // stationId: '6565e350431fc028daa716dd',
                stationId:useMain().nowZhandian.zdId,
            }
            if (currPage1.value <= 50) {
                getStationHistoryData(params).then((res) => {
                    if (res.data.data[0] != null) {
                        console.log('hhhh');
                        let ls = res.data.data[0]
                        for (let j = 0; j < ls.length; j++) {
                            tableData.value.push(ls[j])
                        }
                        fenyeSign.value = true
                    }else{
                        fenyeSign.value = true
                        currPage1.value--
                    }
                })
            } else {
                console.log("没了");
            }
        }
    } else {
        console.log('meidao');
    }
}
onMounted(() => {
    getData()
    cont.value.addEventListener('scroll', scroll)
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__text {
    font-size: 1.06rem;
}

/deep/.van-nav-bar__title {
    font-size: 1.25rem;
}

.min-table {
    // background-color: #e83c3c;
    height: 90vh;
    overflow: scroll;
}

table {
    border-collapse: collapse;
}

tr td {
    padding: 10px;
    font-size: 1rem;
    text-align: center;
    border-bottom: 1px solid rgba(236, 236, 236, 0.5);
}
table th {
    white-space: nowrap;
}

table td {
    white-space: nowrap;
}
</style>