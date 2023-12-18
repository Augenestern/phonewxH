<template>
    <div class="wBox">
        <div class="topBox">
            <span style="position: absolute; left: 6vw;top: 2vh;font-size: 1rem;" @click="quxiao">取消</span>
        </div>
        <div class="bottomBox">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <!-- 输入任意文本 -->
                    <van-field v-model="formData.shzd" label="收货站点:" required placeholder="请输入收货站点" readonly
                        :rules="[{ required: true, message: '请填写收货站点' }]">
                        <template #button>
                            <img style="width: 28px;position: absolute;right: -4px;top:0" src="@/assets/jishiben1.png"
                                alt="" @click="toShouhuo">
                        </template>
                    </van-field>
                    <van-action-sheet v-model:show="showXuanze" :actions="sjName" @select="onSelect"
                        :style="{ minHeight:'10%',maxHeight: '30%' }" />
                    <van-field v-model="formData.sj" label="司机:" required placeholder="请输入司机姓名" readonly
                        :rules="[{ required: true, message: '请填写司机' }]">
                        <template #button>
                            <img style="width: 20px;position: absolute;right: 0px;top:0" src="@/assets/siji.png" alt=""
                                @click="showXuanze = true">
                        </template>
                    </van-field>
                    <van-field v-model="formData.sjdh" label="司机电话:" required placeholder="请输入司机电话"
                        :rules="[{ required: true, message: '请填写司机电话' }, { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确手机号' }]" />
                    <van-field v-model="formData.pcsj" label="时间:" required placeholder="请输入派出时间"
                        :rules="[{ required: true, message: '请填写时间' }]" readonly>
                        <template #button>
                            <img style="width: 18px;" src="@/assets/rili.png" alt="" @click="showXuanzeTime = true">
                        </template>
                    </van-field>
                    <van-popup v-model:show="showXuanzeTime" round position="bottom">
                        <van-date-picker v-model="currentDate" title="选择日期" @confirm="saveYTime()" @cancel="cancelTime()" />
                    </van-popup>
                    <van-popup v-model:show="showXuanzeMinTime" round position="bottom">
                        <van-time-picker v-model="currentMinDate" title="选择时间" @confirm="saveYMinTime()"
                            @cancel="cancelMinTime()" />
                    </van-popup>
                    <van-field v-model="formData.bz" rows="2" autosize label="备注" type="textarea" placeholder="请输入备注"
                        style="border-bottom: 1px solid #f3f2f2;" />
                </van-cell-group>
                <van-button type="primary"
                    v-if="(userMain.orderInfo.status == 0 || userMain.orderInfo.status == 2) && role == '管理员'"
                    style="height: 4vh; width: 88vw; padding: 0px; margin-left: 6vw; margin-top: 5vh;font-size: 1rem"
                    native-type="submit">
                    提交
                </van-button>
                <!-- <van-button type="primary" v-else disabled 
                    style="height: 4vh; width: 88vw; padding: 0px; margin-left: 6vw; margin-top: 5vh;font-size: 1rem">
                    <van-icon name="warning-o" /> 提交
                </van-button> -->
                <div style="height: 10vh;"></div>
            </van-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import router from '@/routes';
import dayjs from 'dayjs'
import { updateOrder, getDriver } from "@/api/production/dingdan";
import { showNotify } from "vant";
import { useMain } from "@/store/home";
let role = ref(localStorage.getItem('role'))
const userMain: any = useMain();
let formData: any = reactive({
    shzd: "",
    shzdId: "",
    sj: '',
    sjdh: '',
    pcsj: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    bz: '',
})
let showXuanze = ref(false)
let sjName: any = ref([])
const quxiao = () => {
    router.go(-1)
}
const toShouhuo = () => {
    userMain.orderInfoOrderpcData = formData
    router.push('/shzhandian')
}
//时间
let showXuanzeTime = ref(false)
let showXuanzeMinTime = ref(false)
let currentDate: any = ref([dayjs().format('YYYY'), dayjs().format('MM'), dayjs().format('DD')])
let currentMinDate: any = ref([dayjs().format('HH'), dayjs().format('mm')])
let selYdate = ref(dayjs().format("YYYY-MM-DD"))
let selYMindate = ref(dayjs().format("HH:mm"))
let newTime = new Date()
newTime.setFullYear(newTime.getFullYear() + 4);
// let maxDate = newTime

const saveYTime = () => {
    selYdate.value = currentDate._rawValue.join("-")
    showXuanzeTime.value = false
    formData.pcsj = selYdate.value + " " + selYMindate.value
    showXuanzeMinTime.value = true
}
const cancelTime = () => {
    showXuanzeTime.value = false
}

const saveYMinTime = () => {
    console.log(currentMinDate);
    selYMindate.value = currentMinDate._rawValue.join(":")
    formData.pcsj = selYdate.value + " " + selYMindate.value
    showXuanzeMinTime.value = false
}
const cancelMinTime = () => {
    showXuanzeMinTime.value = false
}
const onSubmit = () => {
    let orderDatas = JSON.parse(JSON.stringify(userMain.orderInfo))
    let params = {
        _id: orderDatas._id,
        stationName: formData.shzd,
        stationId: formData.shzdId,
        IMEI: orderDatas.IMEI,
        orderData: {
            checkID: orderDatas.orderData.checkID,
            carName: orderDatas.orderData.carName,
            potName: orderDatas.orderData.potName,
            totalGas: orderDatas.orderData.totalGas,
            type: orderDatas.orderData.type,
            receive: orderDatas.orderData.receive,
            send: orderDatas.orderData.send,
            cargoName: orderDatas.orderData.cargoName,
            frontPress: orderDatas.orderData.frontPress,
            backPress: orderDatas.orderData.backPress,
            countTime: orderDatas.orderData.countTime,
            startDesc: orderDatas.orderData.startDesc
        },
        driverPhone: formData.sjdh,
        driverName: formData.sj,
        startTime: orderDatas.startTime,
        commitTime: formData.pcsj,
        endTime: orderDatas.endTime,
        status: 2,
        isValid: true,
        gaoLng: orderDatas.gaoLng || 0,
        gaoLat: orderDatas.gaoLat || 0,
        address: orderDatas.address,
        empPotName: orderDatas.empPotName,
        empPotId: orderDatas.empPotId,
        gas: orderDatas.gas,
        tableData: orderDatas.tableData,
        outPictureURL: orderDatas.outPictureURL,
        tableDataURL: orderDatas.tableDataURL,
        commitDesc: formData.bz,
        endDesc: orderDatas.endDesc
    }
    updateOrder(params).then((res) => {
        if (res.data.code == 200) {
            showNotify({ type: 'success', message: '提交成功' });
            router.push('/dingdan')
        }
    })
}

//站点选择
const onSelect = (item: any) => {
    formData.sj = item.name
    formData.sjdh = item.id
    showXuanze.value = false;
}

function isEmpty(obj: any) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
const getDriName = () => {
    let ls = JSON.parse(JSON.stringify(userMain.orderInfo))
    console.log(ls);
    let params = {
        carName: ls.orderData.carName
    }
    getDriver(params).then((res) => {
        console.log(res.data.data);
        let xx = res.data.data
        if (res.data.code == 500) {
            sjName.value.push({ name: '当前车辆暂无司机' })
        } else {
            for (let i = 0; i < xx.length; i++) {
                sjName.value.push({ name: xx[i].name, id: xx[i].phone })
            }
        }
    })
}
// const route = new (useRoute as any)
onMounted(() => {
    let xxx = JSON.parse(JSON.stringify(userMain.orderInfoOrderpcData))
    if (!isEmpty(xxx)) {
        console.log(xxx);
        formData.shzd = xxx.shzd
        formData.shzdId = xxx.shzdId
        formData.sj = xxx.sj
        formData.sjdh = xxx.sjdh
        formData.pcsj = xxx.pcsj
        formData.bz = xxx.bz
    } else {
        let ls = JSON.parse(JSON.stringify(userMain.orderInfo))
        formData.shzd = ls.stationName
        formData.shzdId = ls.stationId
        formData.sj = ls.driverName
        formData.sjdh = ls.driverPhone
        formData.pcsj = ls.commitTime
        formData.bz = ls.commitDesc
    }
    getDriName()
})
</script>

<style lang="less" scoped>
.topBox {
    position: relative;
    height: 8vh;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
}

.bottomBox {
    // background-color: rgb(239, 239, 239);
    box-sizing: border-box;
    padding-top: 6vh;
    // max-height: 86vh;
}

.xuanze {
    // background-color: aqua;
    width: 100%;
    margin-top: 6%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f1f1f1;
}

//
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 100;
}

.loader {
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
}

.loader:before {
    content: '';
    width: 48px;
    height: 5px;
    background: #578bbf;
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
}

.loader:after {
    content: '';
    width: 100%;
    height: 100%;
    background: #1989FA;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
}

@keyframes jump7456 {
    15% {
        border-bottom-right-radius: 3px;
    }

    25% {
        transform: translateY(9px) rotate(22.5deg);
    }

    50% {
        transform: translateY(18px) scale(1, .9) rotate(45deg);
        border-bottom-right-radius: 40px;
    }

    75% {
        transform: translateY(9px) rotate(67.5deg);
    }

    100% {
        transform: translateY(0) rotate(90deg);
    }
}

@keyframes shadow324 {

    0%,
    100% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1);
    }
}
</style>