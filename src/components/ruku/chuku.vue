<template>
    <div class="wBox">
        <div class="topBox">
            <span style="position: absolute; left: 6vw;top: 2vh;font-size: 1rem;" @click="quxiao">取消</span>
        </div>
        <div class="bottomBox">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <!-- 输入任意文本 -->
                    <van-action-sheet v-model:show="showXuanze" :actions="gcName" @select="onSelect"
                        :style="{ minHeight:'10%',maxHeight: '30%' }" />
                    <van-field v-model="formData.kgc" label="空挂车:" required placeholder="请输入空挂车牌号"
                        :rules="[{ required: true, message: '请填写空挂车牌号' }]" > 
                        <template #button>
                            <img style="width: 28px;position: absolute;right: -4px;top:0" src="@/assets/cheliangdj.png"
                                alt="" @click="showXuanze = true">
                        </template>
                    </van-field>
                    <van-field v-model="formData.bj" label="表计:" required placeholder="请输入表计"
                        :rules="[{ required: true, message: '请填写表计' }]" />
                    <van-field v-model="formData.yql" label="用气量:" required placeholder="用气量" readonly
                        :rules="[{ required: true, message: '请填写用气量' }]" />
                    <van-field v-model="formData.cksj" label="时间:" required placeholder="请输入出库时间"
                        :rules="[{ required: true, message: '请填写时间' }]" readonly>
                        <template #button>
                            <img style="width: 18px;" src="@/assets/rili.png" alt="" @click="showXuanzeTime = true">
                        </template>
                    </van-field>
                    <div style="width: 100%; display: flex; box-sizing: border-box;padding: 4%;">
                        <div style="flex: 1;">
                            <div class="formFont"><span style="color: red;">*</span>出库单</div>
                            <van-uploader preview-size="40vw" v-model="fileList" max-count="1" multiple
                                :after-read="afterRead1">
                            </van-uploader>
                        </div>
                        <div style="flex: 1;">
                            <div class="formFont"><span style="color: red;">*</span>计量表</div>
                            <van-uploader preview-size="40vw" v-model="fileList1" multiple max-count="1"
                                :after-read="afterRead2" />
                        </div>
                        <!-- <div style="flex: 1;"><img src="@/assets/234.jpg" style="max-width: 100%;max-height: 100%;" alt=""></div>
                        <div style="flex: 1;"><img src="@/assets/234.jpg" style="max-width: 100%;max-height: 100%;" alt=""></div> -->
                    </div>
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
                <van-button type="primary" v-if="userMain.orderInfo.status == 2 && role == '管理员'"
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
import { showNotify } from 'vant';
import dayjs from 'dayjs'
import { updateOrder,getPotEmpty } from "@/api/production/dingdan";
import { getLoginData } from "@/api/production/tuchuang";
import { useMain } from "@/store/home";
import { getOrderData } from '@/api/production/dingdan'
let role = ref(localStorage.getItem('role'))
const userMain: any = useMain();
let showXuanze = ref(false)
let gcName: any = ref([])
let formData: any = reactive({
    kgc: '',
    yql: '',
    bj: '',
    cksj: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    bz: '',
})
let qianTableData: any = ref("")
watch(() => formData.bj, () => {
    let timeOut: any = null
    if (timeOut) clearTimeout(timeOut)
    timeOut = setTimeout(() => {
        formData.yql = formData.bj - qianTableData.value
    }, 1400);
})

const quxiao = () => {
    history.back()
}
//挂车选择
const onSelect = (item: any) => {
    formData.kgc = item.name
    showXuanze.value = false;
}
const fileList: any = ref([]);
const fileList1: any = ref([]);
let url1: any
let url2: any

const afterRead1 = async () => {
    let file1 = fileList.value[0].file
    fileList.value[0].status = 'uploading'
    fileList.value[0].message = '上传中...';
    console.log(file1.size / 1024);
    let imgFile1 = null;
    if (file1.size / 1024 > 500) {
        imgFile1 = await blobToBase64(file1, file1.name);
    } else {
        imgFile1 = file1;
    }
    console.log(imgFile1.size / 1024);
    const formData1 = new FormData();
    formData1.append("file", imgFile1)
    getLoginData(formData1).then((res) => {
        url1 = res.data.data
        fileList.value[0].status = ''
    })
}
const afterRead2 = async () => {
    let file2 = fileList1.value[0].file
    fileList1.value[0].status = 'uploading'
    fileList1.value[0].message = '上传中...';
    console.log(file2.size / 1024);
    let imgFile2 = null;
    if (file2.size / 1024 > 500) {
        imgFile2 = await blobToBase64(file2, file2.name);
    } else {
        imgFile2 = file2;
    }
    console.log(imgFile2.size / 1024);
    const formData2 = new FormData();
    formData2.append("file", imgFile2)
    getLoginData(formData2).then((res) => {
        url2 = res.data.data
        fileList1.value[0].status = ''
    })
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

const saveYTime = () => {
    selYdate.value = currentDate._rawValue.join("-")
    showXuanzeTime.value = false
    formData.cksj = selYdate.value + " " + selYMindate.value
    showXuanzeMinTime.value = true
}
const cancelTime = () => {
    showXuanzeTime.value = false
}

const saveYMinTime = () => {
    console.log(currentMinDate);
    selYMindate.value = currentMinDate._rawValue.join(":")
    formData.cksj = selYdate.value + " " + selYMindate.value
    showXuanzeMinTime.value = false
}
const cancelMinTime = () => {
    showXuanzeMinTime.value = false
}
const onSubmit = async () => {
    console.log(formData);
    // console.log(fileList.value[0].file);
    // console.log(fileList1.value[0].file);

    if (fileList.value[0] == null) {
        showNotify({ type: 'danger', message: '请上传出库单' });
    } else if (fileList1.value[0] == null) {
        showNotify({ type: 'danger', message: '请上传计量表照片' });
    } else {
        if(url1&&url2){
            funUpdateOrder(url1, url2)
        }else{
            showNotify({type:'danger',message:'请等待图片上传'})
        }
    }
}

const blobToBase64 = async (blob: any, fileName: any) => {
    const reader = await new FileReader(); // 实例化一个reader文件
    await reader.readAsDataURL(blob); // 添加二进制文件
    return new Promise((resolve, reject) => {
        reader.onload = async (event: any) => {
            const base64 = await event.target.result; // 获取到它的base64文件
            const scale = 0.6; // 设置缩放比例 （0-1）
            let file = await compressImg(base64, scale, fileName);
            resolve(file);
        };
    });
};
// 压缩大小
const compressImg = (base64: any, scale: any, fileName: any) => {
    // 处理缩放，转换格式
    // 用canvas来压缩
    const img = new Image();
    img.src = base64;
    return new Promise((resolve, reject) => {
        img.onload = async () => {
            const canvas: any = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.setAttribute('width', img.width * scale);
            canvas.setAttribute('height', img.height * scale);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 转成base64 文件
            base64 = canvas.toDataURL('image/jpeg', 0.8); //0到1之间的取值，主要用来选定图片的质量，默认值是0.92，超出范围也会选择默认值
            const arr = base64.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bytes = atob(arr[1]);
            const bytesLength = bytes.length;
            const u8arr = new Uint8Array(bytesLength);
            for (let i = 0; i < bytes.length; i++) {
                u8arr[i] = bytes.charCodeAt(i);
            }
            const file = await new File([u8arr], fileName, { type: mime });
            resolve(file);
        };
    });
};

const funUpdateOrder = (url1: any, url2: any) => {
    console.log(url1, url2);

    let orderDatas = JSON.parse(JSON.stringify(userMain.orderInfo))
    let params = {
        _id: orderDatas._id,
        stationName: orderDatas.stationName,
        stationId: orderDatas.stationId,
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
        driverPhone: orderDatas.driverPhone,
        driverName: orderDatas.driverName,
        startTime: orderDatas.startTime,
        commitTime: orderDatas.commitTime,
        endTime: formData.cksj,
        status: 1,
        isValid: true,
        gaoLng: orderDatas.gaoLng || 0,
        gaoLat: orderDatas.gaoLat || 0,
        address: orderDatas.address,
        empPotName: formData.kgc,
        empPotId: orderDatas.empPotId,
        gas: formData.yql,
        tableData: formData.bj,
        outPictureURL: url1,
        tableDataURL: url2,
        commitDesc: orderDatas.commitDesc,
        endDesc: formData.bz
    }
    updateOrder(params).then((res) => {
        if (res.data.code == 200) {
            showNotify({ type: 'success', message: '提交成功' });
            router.push('/dingdan')
        }else{
            showNotify({type:'danger',message:'订单提交失败'})
        }
    })
}
const getEndOrder = () => {
    let params = {
        pageSize: 30,
        currPage: 1,
        stationId: userMain.orderInfo.stationId,
        status: 1,
    }
    getOrderData(params).then((res) => {
        if (res.data.data.pageData != null) {
            qianTableData.value = res.data.data.pageData[0].tableData
        }
    })
}

const getEmpGc = ()=>{
    getPotEmpty().then((res)=>{
        console.log(res.data.data);
        for(let i=0;i<res.data.data.length;i++){
            let xx = res.data.data[i].pageData
            for(let j=0;j<xx.length;j++){
                gcName.value.push({name:xx[j].name})
            }
        }
    })
    // gcName.value.push
}
onMounted(() => {
    getEmpGc()
    getEndOrder()
    let ls = JSON.parse(JSON.stringify(userMain.orderInfo))
    formData.kgc = ls.empPotName
    formData.yql = ls.gas
    formData.bj = ls.tableData
    formData.cksj = ls.endTime
    formData.bz = ls.endDesc
    if (ls.outPictureURL != "" && ls.tableDataURL != "") {
        fileList.value.push({ url: ls.outPictureURL })
        fileList1.value.push({ url: ls.tableDataURL })
    }
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

.formFont {
    // background-color: #b24e4e;
    padding: 3%;
    font-size: 0.85rem;
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