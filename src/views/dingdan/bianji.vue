<template>
    <div class="wBox">
        <div class="topBox">
            <span style="position: absolute; left: 4vw;top: 2vh;font-size: 1.0625rem;" @click="quxiao">返回</span>
        </div>
        <div class="bottomBox">
            <div class="bottomBox-item">
                <div style="flex: 3;">站点</div>
                <div style="flex: 6;">{{ zhandianName }}</div>
                <div style="flex: 1.5;"><img style="width: 28px;" src="@/assets/jishiben1.png" alt=""
                        @click="showXuanze = true"></div>
                <van-action-sheet v-model:show="showXuanze" :actions="userMain.zdName" @select="onSelect" />
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">站点位置</div>
                <div style="flex: 6;">邯郸市</div>
                <div style="flex: 1.5;"></div>
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">车辆</div>
                <div style="flex: 6;">{{ carName }}</div>
                <div style="flex: 1.5;">
                    <img style="width: 28px;" src="@/assets/cheliangdj.png" alt="" @click="showXuanzeChe = true">
                </div>
                <van-action-sheet v-model:show="showXuanzeChe" :actions="actionsCar" @select="onSelectCar" />
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">车辆位置</div>
                <div style="flex: 6;">{{ carPosi }}</div>
                <div style="flex: 1.5;">
                    <!-- <img style="width: 28px;" src="@/assets/车辆登记.png" alt="" @click="showXuanzeChe = true"> -->
                </div>
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">司机姓名</div>
                <div style="flex: 6;"><input v-model="driverName" style="border: none;" type="text"></div>
                <div style="flex: 1.5;">
                    <!-- <img style="width: 28px;" src="@/assets/车辆登记.png" alt="" @click="showXuanzeChe = true"> -->
                </div>
                <!-- <van-action-sheet v-model:show="showXuanzeChe" :actions="actionsCar" @select="onSelectCar" /> -->
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">司机电话</div>
                <div style="flex: 6;"><input v-model="driverPhone" style="border: none;" type="text"></div>
                <div style="flex: 1.5;">
                    <!-- <img style="width: 28px;" src="@/assets/车辆登记.png" alt="" @click="showXuanzeChe = true"> -->
                </div>
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">派送时间</div>
                <div style="flex: 6;">{{ selYdate }} {{ selYMindate }}</div>
                <div style="flex: 1.5;"> <img style="width: 18px; margin-left: 4px;" src="@/assets/rili.png"
                        @click="showXuanzeTime = true" alt=""></div>
                <van-popup v-model:show="showXuanzeTime" round position="bottom">
                    <van-date-picker v-model="currentDate" title="选择日期" :min-date="new Date()" :max-date="maxDate"
                        @confirm="saveYTime()" @cancel="cancelTime()" />
                </van-popup>
                <van-popup v-model:show="showXuanzeMinTime" round position="bottom">
                    <van-time-picker v-model="currentMinDate" title="选择时间" @confirm="saveYMinTime()"
                        @cancel="cancelMinTime()" />
                </van-popup>
            </div>
            <div style="margin-top: 6vh;">
                <van-button type="success" style="padding: 0px;width: 90px; height: 36px; font-size: 1rem;"
                    @click="wanchengForm">修改订单</van-button>
                <van-button type="primary" style="padding: 0px;width: 90px; height: 36px; font-size: 1rem;margin-left: 6vw;"
                    @click="jieshu">结束订单</van-button>
                <van-button type="danger" style="padding: 0px;width: 90px; height: 36px; font-size: 1rem;margin-left: 6vw;"
                    @click="shanchu">删除订单</van-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
let showXuanze = ref(false)
let showXuanzeChe = ref(false)
let showXuanzeTime = ref(false)
let showXuanzeMinTime = ref(false)
import { useMain } from '@/store/home'
import { getAllCar } from "@/api/production/cheliang";
import { updateOrder, finishOrder, deleteOrder } from '@/api/production/dingdan'
import { showNotify, showConfirmDialog } from 'vant';
import router from '@/routes';
const userMain: any = useMain()

// const actions = [
//     { name: '小城站' },
//     { name: '选项二' },
//     { name: '选项三' }
// ];
const actionsCar: any = ref([]);
let zhandianName = ref("")
let zhandianid = ref("")
let carName: any = ref("")
let carnameID: any = ref("")
let driverName: any = ref('')
let driverPhone: any = ref('')
let carPosi: any = ref('')
//日期和时间选择
let selYdate = ref(dayjs().format("YYYY-MM-DD"))
let selYMindate = ref(dayjs().format("HH:mm"))

const getCheData = () => {
    getAllCar().then((res) => {
        actionsCar.value = res.data.data.pageData
        // carName.value = actionsCar.value[0].name
        // carnameID.value = actionsCar.value[0]._id
    })
}

//删除订单
const shanchu = () => {
    showConfirmDialog({
        title: '确认删除订单吗?',
        // message:
        //     '返回到登录页面？',-
    })
        .then(() => {
            let params = {
                _id: id.value
            }
            deleteOrder(id.value, params).then((res) => {
                if (res.data.code == 200) {
                    showNotify({ type: 'danger', message: '订单已删除' });
                    router.go(-2)
                }
            })
        })
        .catch(() => {
            // on cancel
        });
}

//结束订单
const jieshu = () => {
    showConfirmDialog({
        title: '确认结束订单吗?',
        // message:
        //     '返回到登录页面？',-
    })
        .then(() => {
            let params = {
                _id: id.value
            }
            finishOrder(params).then((res) => {
                if (res.data.code == 200) {
                    showNotify({ type: 'primary', message: '订单已结束' });
                    router.go(-2)
                }
            })
        })
        .catch(() => {
            // on cancel
        });
}
let status: any = ref()
let id: any = ref()
onMounted(() => {
    let xx = JSON.parse(JSON.stringify(userMain.orderInfo))
    id.value = xx.id
    carName.value = xx.chepaiNum
    carnameID.value = xx.imei
    zhandianName.value = xx.zhandian
    zhandianid.value = xx.stationId
    driverName.value = xx.name
    driverPhone.value = xx.dianhua
    carPosi.value = xx.address

    selYdate.value = xx.paicheTime.split(' ')[0]
    selYMindate.value = xx.paicheTime.split(' ')[1]
    status.value = xx.status
    getCheData()

    console.log(xx, 'status');
})
onUnmounted(() => {
})
//取消
const quxiao = () => {
    history.back()
}
//修改
const wanchengForm = () => {
    let params = {
        _id: id.value,
        stationName: zhandianName.value,
        stationId: zhandianid.value,
        carId: carName.value,
        IMEI: carnameID.value,
        driverName: driverName.value,
        driverPhone: driverPhone.value,
        startTime: selYdate.value + " " + selYMindate.value,
    }
    console.log(params);

    if (params.carId != "" && params.driverName != "" && params.driverPhone) {
        var reg = /^1[3-9]\d{9}$/;
        if (reg.test(params.driverPhone)) {
            showConfirmDialog({
                title: '确认修改订单吗?',
                // message:
                //     '返回到登录页面？',-
            })
                .then(() => {
                    updateOrder(params).then((res) => {
                        console.log(res);
                        showNotify({ type: 'success', message: '修改成功' });
                        router.go(-2)
                    })
                })
                .catch(() => {
                    // on cancel
                });
        } else {
            showNotify({ type: 'danger', message: '请填写正确的手机号格式' });
        }
    } else {
        showNotify({ type: 'danger', message: '请填写必要信息' });
    }
}

//站点选择
const onSelect = (item: any) => {
    zhandianName.value = item.name
    zhandianid.value = item.id
    showXuanze.value = false;
}
//车辆选择
const onSelectCar = (item: any) => {
    carName.value = item.name
    carnameID.value = item.IMEI
    showXuanzeChe.value = false;
}

let currentDate: any = ref()
let currentMinDate: any = ref([dayjs().format('HH'), dayjs().format('mm')])

let newTime = new Date()
newTime.setFullYear(newTime.getFullYear() + 4);
let maxDate = newTime

const saveYTime = () => {
    selYdate.value = currentDate._rawValue.join("-")
    showXuanzeTime.value = false
    showXuanzeMinTime.value = true
}
const cancelTime = () => {
    showXuanzeTime.value = false
}

const saveYMinTime = () => {
    console.log(currentMinDate);
    selYMindate.value = currentMinDate._rawValue.join(":")
    showXuanzeMinTime.value = false
}
const cancelMinTime = () => {
    showXuanzeMinTime.value = false
}


</script>

<style lang="less" scoped>
.wBox {}

.topBox {
    // background-color: aqua;
    position: relative;
    height: 10vh;
}

.bottomBox {
    // background-color: aqua;
    // height: 50vh;
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;

    &-item {
        width: 90%;
        height: 9vh;
        // background-color: aliceblue;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
    }
}

.content {
    padding: 16px 16px 160px;
}
</style>