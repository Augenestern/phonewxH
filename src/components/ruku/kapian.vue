<template>
    <div class="wBox">
        <div style="position: sticky;top: 0; background-color: #fff;z-index: 10;"> <van-nav-bar title="订单" left-text="返回"
                left-arrow @click-left="onClickLeft" /></div>
        <van-cell-group inset class="jianxi" v-if="role != '气站管理员'">
            <div style="box-sizing: border-box;padding:1% 3%; display: flex;flex-direction: column;position: relative;">
                <div class="card-header" @click="(dingdanData.status == 0 || role == '管理员') ? toRuku() : ''">
                    <div style="margin-left: 1%;">JJ20231202071205</div>
                    <div class="card-header-right">已入库<van-icon v-if="role == '管理员' || dingdanData.status == 0" name="arrow" />
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-body-item">
                        <div class="card-body-item-left"><span
                                class="textColor">车牌号：</span>{{ dingdanData.orderData.carName }}</div>
                        <div class="card-body-item-right"><span class="textColor">挂车号：</span>{{
                            dingdanData.orderData.potName }}</div>
                    </div>
                    <div class="card-body-item">
                        <div class="card-body-item-left"><span
                                class="textColor">{{ dingdanData.orderData.cargoName }}：</span>{{
                                    dingdanData.orderData.totalGas }} Nm³</div>
                        <div class="card-body-item-right"></div>
                    </div>
                    <div class="card-body-item">
                        <div class="card-body-item-left"><span class="textColor">入库时间：</span>{{ dingdanData.startTime }}
                        </div>
                    </div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group inset class="jianxi" @click="toPaiChu" v-if="dingdanData.status == 0 && role == '管理员'">
            <div style="box-sizing: border-box;padding:1% 3%; display: flex;flex-direction: column;position: relative;">
                <div class="card-header" style="border: none;color: rgb(0, 179, 255);">
                    <div style="margin-left: 1%;">未派出</div>
                    <div class="card-header-right"><van-icon name="arrow" /></div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group inset class="jianxi" v-if="dingdanData.status == 2 || dingdanData.status == 1">
            <div style="box-sizing: border-box;padding:1% 3%; display: flex;flex-direction: column;position: relative;">
                <div class="card-header" @click="role == '管理员' ? toPaiChu() : ''">
                    <div style="margin-left: 1%;">{{ dingdanData.stationName }}</div>
                    <div class="card-header-right">已派出<van-icon v-if="role == '管理员'" name="arrow" /></div>
                </div>
                <div class="card-body">
                    <div class="card-body-item">
                        <div class="card-body-item-left"><span class="textColor">司机：</span>{{ dingdanData.driverName }}
                        </div>
                        <div class="card-body-item-right"><span class="textColor">电话：</span>{{ dingdanData.driverPhone }}
                        </div>
                    </div>
                    <div class="card-body-item" v-if="dingdanData.status == 1">
                        <div class="card-body-item-left"><span class="textColor">车辆位置：</span>- - - - - -</div>
                    </div>
                    <div class="card-body-item" style="height: auto;" v-else @click="toDetail()">
                        <div style="flex: 1;margin-top: 1vh;"><span style="color:rgb(66, 196, 252);">车辆位置：</span></div>
                        <div style="flex:3;margin-top: 1vh;">{{ dingdanData.address }}</div>
                    </div>
                    <div class="card-body-item">
                        <div class="card-body-item-left"><span class="textColor">派出时间：</span>{{ dingdanData.commitTime }}
                        </div>
                    </div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group inset class="jianxi" @click="toChuku" v-if="dingdanData.status == 2 && role == '管理员'">
            <div style="box-sizing: border-box;padding:1% 3%; display: flex;flex-direction: column;position: relative;">
                <div class="card-header" style="border: none;color: rgb(0, 179, 255);">
                    <div style="margin-left: 1%;">未出库</div>
                    <div class="card-header-right"><van-icon name="arrow" /></div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group inset class="jianxi" v-if="dingdanData.status == 1">
            <div style="box-sizing: border-box;padding:1% 3%; display: flex;flex-direction: column;position: relative;">
                <div class="card-header" @click="role == '管理员' ? toChuku() : ''">
                    <div style="margin-left: 1%;">{{ dingdanData.empPotName }}<span class="textColor">(拉回气罐牌号)</span></div>
                    <div class="card-header-right">已出库<van-icon name="arrow" v-if="role == '管理员'" /></div>
                </div>
                <div class="card-body">
                    <div class="card-body-item">
                        <div class="card-body-item-left"><span class="textColor">表计：</span>{{ dingdanData.tableData }} Nm³
                        </div>
                        <div v-if="role == '管理员'" class="card-body-item-right"><span class="textColor">用气量：</span>{{
                            dingdanData.gas }} Nm³</div>
                    </div>
                    <div class="card-body-item">
                        <div class="card-body-item-left"><span class="textColor">出库时间：</span>{{ dingdanData.endTime }}</div>
                    </div>
                </div>
            </div>
        </van-cell-group>
        <!-- <van-cell-group inset class="jianxi" @click="overOrder">
            <van-button type="primary" style="width: 100%;">完成订单</van-button>
        </van-cell-group> -->
        <div style="height: 10vh;"></div>
    </div>
</template>

<script setup lang="ts">
import router from '@/routes';
import { useMain } from "@/store/home";
// import { getOrderById } from "@/api/production/dingdan";
let role = ref(localStorage.getItem('role'))
const userMain: any = useMain();

let dingdanData: any = JSON.parse(JSON.stringify(userMain.orderInfo))
// const getOrderData = ()=>{
//     let params = {
//         orderId:userMain.orderInfo._id
//     }
//     getOrderById(params).then((res)=>{
//         userMain.orderInfo = res.data.data
//         dingdanData.value = JSON.parse(JSON.stringify(userMain.orderInfo))
//         console.log(res);
//     })
// }
const onClickLeft = () => {
    router.go(-1)
}

const toRuku = () => {
    console.log();
    router.push('/pairu')
}

const toPaiChu = () => {
    console.log();
    router.push('/paichu')
}
const toChuku = () => {
    console.log();
    router.push('/chuku')
}
// const overOrder = ()=>{
//     showConfirmDialog({
//     title: '确认完成订单吗',
//     // message:
//     //     '返回到登录页面？',-
//   })
//     .then(() => {
//       router.push('/dingdan')
//     })
//     .catch(() => {
//       // on cancel
//     });
// }
const toDetail = () => {
    router.push('/ddDetail')
}
onMounted(() => {
    userMain.orderInfoOrderpcData = {}
    // getOrderData()
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

.wBox {
    background-color: #F7F8FA;
    width: 100vw;
    min-height: 100vh;
}

.jianxi {
    margin-top: 3%;
}

.card-header {
    // background-color: red;
    height: 5vh;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;

    &-right {
        position: absolute;
        right: 3%;
    }
}

.card-body {
    // background-color: yellow;
    flex: auto;

    &-item {
        width: 100%;
        height: 5vh;
        // background-color: aqua;
        display: flex;

        &-left {
            flex: 1;
            line-height: 5vh;
            // background-color: red;
        }

        &-right {
            line-height: 5vh;
            flex: 1;
        }
    }
}

.textColor {
    color: #a4a4a4;
}</style>