<template>
    <div class="wBox">
        <div class="topBox">
            <span style="position: absolute; left: 6vw;top: 2vh;font-size: 1rem;" @click="quxiao">取消</span>
            <div style="position: absolute;right: 4vw;top: 2vh;">
                <van-uploader :after-read="pairuForm" class="xuanze" style="margin-top: 0%;border: none;"
                    v-if="userMain.orderInfo == '' || userMain.orderInfo.status == 0">
                    <van-button style="height: 4vh; width: 24vw;font-size: 1rem;padding: 0px;" type="primary" @click="showXuanze = true">拍入库单</van-button>
                </van-uploader>
                <!-- <van-popup v-model:show="showXuanze" closeable close-icon="close" round position="bottom"
                    :style="{ height: '22%', padding: '30px' }">
                    <div @click="startCamera" class="xuanze">
                        拍照
                    </div>
                        从相册里选择
                </van-popup> -->
            </div>
        </div>
        <div class="bottomBox">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <!-- 输入任意文本 -->
                    <van-field v-model="formData.jjdh" label="检斤单号:" required placeholder="请输入检斤单号"
                        :rules="[{ required: true, message: '请填写检斤单号' }]" />
                    <van-field v-model="formData.cph" label="车牌号:" required placeholder="请输入车牌号" readonly
                        :rules="[{ required: true, message: '请填写车牌号' }]">
                        <template #button>
                            <img style="width: 28px;position: absolute;right: -4px;top:0" src="@/assets/cheliangdj.png"
                                alt="" @click="showXuanzeCar = true">
                        </template>
                    </van-field>
                    <van-action-sheet v-model:show="showXuanzeCar" :actions="emptyCarArray" @select="onSelectCar"
                        :style="{minHeight:'10%', maxHeight: '30%' }" />
                    <van-field v-model="formData.gc" label="挂车:" required placeholder="请输入挂车牌号" readonly
                        :rules="[{ required: true, message: '请填写挂车' }]">
                        <template #button>
                            <img style="width: 28px;position: absolute;right: -4px;top:0" src="@/assets/cheliangdj.png"
                                alt="" @click="showXuanzePot = true">
                        </template>
                    </van-field>
                    <van-action-sheet v-model:show="showXuanzePot" :actions="emptyPotArray" @select="onSelectPot"
                        :style="{ minHeight:'10%',maxHeight: '30%' }" />
                    <van-field v-model="formData.jjql" label="交接气量(Nm³):" required label-width="8rem" placeholder="请输入交接气量"
                        :rules="[{ required: true, message: '请填写交接气量' }]" />
                    <van-field v-model="formData.lx" label="类型:" required :rules="[{ required: true, message: '请填写类型' }]"
                        placeholder="请输入类型" />
                    <van-field v-model="formData.shdw" label="收货单位:" required placeholder="请输入收货单位"
                        :rules="[{ required: true, message: '请填写收货单位' }]" />
                    <van-field v-model="formData.phdw" label="发货单位:" required placeholder="请输入发货单位"
                        :rules="[{ required: true, message: '请填写发货单位' }]" />
                    <van-field v-model="formData.hwmc" label="货物名称:" required placeholder="请输入货物名称"
                        :rules="[{ required: true, message: '请填写货物名称' }]" />
                    <van-field v-model="formData.qy" label="前压(Mpa):" required placeholder="请输入前压"
                        :rules="[{ required: true, message: '请填写前压' }]" />
                    <van-field v-model="formData.hy" label="后压(Mpa):" required placeholder="请输入后压"
                        :rules="[{ required: true, message: '请填写后压' }]" />
                    <van-field v-model="formData.jlsj" label="计量时间:" required placeholder="请输入计量时间"
                        :rules="[{ required: true, message: '请填写计量时间' }]">
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
                    <!-- <van-field v-model="formData.bz" label="备注:" style="border-bottom: 1px solid #f3f2f2;" /> -->
                </van-cell-group>
                <van-button type="primary" v-if="userMain.orderInfo == '' || userMain.orderInfo.status == 0"
                    style="height: 4vh; width: 88vw; padding: 0px; margin-left: 6vw; margin-top: 5vh;font-size: 1rem"
                    native-type="submit">
                    提交
                </van-button>
                <!-- <van-button type="primary" v-else disabled
                    style="height: 4vh; width: 88vw; padding: 0px; margin-left: 6vw; margin-top: 5vh;font-size: 1rem">
                    <van-icon name="warning-o" /> 提交
                </van-button> -->
                <!-- <input ref="fileInput" type="file" accept="image/*" capture="environment" style="display: none"
                    @change="uploadPhoto"> -->
                <van-overlay :show="awaitData">
                    <div class="wrapper">
                        <div class="loader"></div>
                    </div>
                </van-overlay>
                <div style="height: 10vh;"></div>
            </van-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
// import Tesseract from "tesseract.js";
import { createOrder, updateOrder, getCarEmpty, getPotEmpty, getOcrtext } from "@/api/production/dingdan";
import { showNotify } from "vant";
// import axios from "axios";
const route = new (useRoute as any)
import { useMain } from "@/store/home";
import router from '@/routes';
const userMain: any = useMain();
let showXuanzeCar = ref(false)
let showXuanzePot = ref(false)
let emptyCarArray: any = ref([])
let emptyPotArray: any = ref([])
let formData: any = reactive({
    jjdh: '',
    cph: '',
    gc: '',
    jjql: '',
    lx: '',
    shdw: '',
    phdw: '',
    hwmc: '',
    qy: '',
    hy: '',
    jlsj: '',
    bz: '',
})
let showXuanze = ref(false)
let awaitData = ref(false)
const quxiao = () => {
    history.back()
}

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
    formData.jlsj = selYdate.value + " " + selYMindate.value
    showXuanzeMinTime.value = true
}
const cancelTime = () => {
    showXuanzeTime.value = false
}

const saveYMinTime = () => {
    console.log(currentMinDate);
    selYMindate.value = currentMinDate._rawValue.join(":")
    formData.jlsj = selYdate.value + " " + selYMindate.value
    showXuanzeMinTime.value = false
}
const cancelMinTime = () => {
    showXuanzeMinTime.value = false
}
const onSelectCar = (item: any) => {
    formData.cph = item.name
    showXuanzeCar.value = false;
}
const onSelectPot = (item: any) => {
    formData.gc = item.name
    showXuanzePot.value = false;
}
//图片上传前
// const beforeRead = async (file:any) => {
//     console.log(file, '原本上传的文件--');
//     // 压缩图片,大于500kb就压缩
//     let imgFile = null;
//     if (file.size / 1024 > 500) {
//         imgFile = await blobToBase64(file, file.name);
//     } else {
//         imgFile = file;
//     }
//     console.log(imgFile, '压缩后的图片文件获取');
//     let formData = new FormData();
//     formData.append('files', imgFile);
//     let res = await fileUpload(formData, config);
//     if (res && res.code == 0) {
//         let datas = res.list[0];
//         props.saveFileArr.push(datas);
//     } else {
//         allData.fileList = [];
//         let param = {
//             id: imgFile.fileNo,
//             name: imgFile.name,
//             status: 'error',
//         };
//         allData.fileList.push(param);
//     }
//     pinias.hideLoading();
// };
const blobToBase64 = async (blob:any, fileName:any) => {
    const reader = await new FileReader(); // 实例化一个reader文件
    await reader.readAsDataURL(blob); // 添加二进制文件
    return new Promise((resolve, reject) => {
        reader.onload = async (event:any) => {
            const base64 = await event.target.result; // 获取到它的base64文件
            const scale = 0.6; // 设置缩放比例 （0-1）
            let file = await compressImg(base64, scale, fileName);
            resolve(file);
        };
    });
};
// 压缩大小
const compressImg = (base64:any, scale:any, fileName:any) => {
    // 处理缩放，转换格式
    // 用canvas来压缩
    const img = new Image();
    img.src = base64;
    return new Promise((resolve, reject) => {
        img.onload = async () => {
            const canvas:any = document.createElement('canvas');
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


const onSubmit = () => {
    let orderDatas = JSON.parse(JSON.stringify(userMain.orderInfo))
    console.log(orderDatas);
    let params
    if (orderDatas != "") {
        params = {
            _id: orderDatas._id || "",
            stationName: orderDatas.stationName || "",
            stationId: orderDatas.stationId || "",
            IMEI: orderDatas.IMEI || "",
            orderData: {
                checkID: formData.jjdh,
                carName: formData.cph,
                potName: formData.gc,
                totalGas: formData.jjql,
                type: formData.lx,
                receive: formData.shdw,
                send: formData.phdw,
                cargoName: formData.hwmc,
                frontPress: formData.qy,
                backPress: formData.hy,
                countTime: formData.jlsj,
                startDesc: formData.bz
            },
            driverPhone: orderDatas.driverPhone || "",
            driverName: orderDatas.driverName || "",
            startTime: orderDatas.startTime || "",
            commitTime: orderDatas.commitTime || "",
            endTime: orderDatas.endTime || "",
            status: 0,
            isValid: true,
            gaoLng: orderDatas.gaoLng || 0,
            gaoLat: orderDatas.gaoLat || 0,
            address: orderDatas.address || "",
            empPotName: orderDatas.empPotName || "",
            empPotId: orderDatas.empPotId || "",
            gas: orderDatas.gas || "",
            tableData: orderDatas.tableData || "",
            outPictureURL: orderDatas.outPictureURL || "",
            tableDataURL: orderDatas.tableDataURL || "",
            commitDesc: orderDatas.commitDesc || "",
            endDesc: orderDatas.endDesc || ""
        }
        updateOrder(params).then((res) => {
            if (res.data.code == 200) {
                showNotify({ type: 'success', message: '修改成功' });
                router.push('/dingdan')
            }
        })
    } else {
        params = {
            stationName: orderDatas.stationName || "",
            stationId: orderDatas.stationId || "",
            IMEI: orderDatas.IMEI || "",
            orderData: {
                checkID: formData.jjdh,
                carName: formData.cph,
                potName: formData.gc,
                totalGas: formData.jjql,
                type: formData.lx,
                receive: formData.shdw,
                send: formData.phdw,
                cargoName: formData.hwmc,
                frontPress: formData.qy,
                backPress: formData.hy,
                countTime: formData.jlsj,
                startDesc: formData.bz
            },
            driverPhone: orderDatas.driverPhone || "",
            driverName: orderDatas.driverName || "",
            startTime: orderDatas.startTime || "",
            commitTime: orderDatas.commitTime || "",
            endTime: orderDatas.endTime || "",
            status: 0,
            isValid: true,
            gaoLng: orderDatas.gaoLng || 0,
            gaoLat: orderDatas.gaoLat || 0,
            address: orderDatas.address || "",
            empPotName: orderDatas.empPotName || "",
            empPotId: orderDatas.empPotId || "",
            gas: orderDatas.gas || "",
            tableData: orderDatas.tableData || "",
            outPictureURL: orderDatas.outPictureURL || "",
            tableDataURL: orderDatas.tableDataURL || "",
            commitDesc: orderDatas.commitDesc || "",
            endDesc: orderDatas.endDesc || ""
        }
        createOrder(params).then((res) => {
            console.log(res);
            if (res.data.message == "查找车辆iD出错") {
                showNotify({ type: 'danger', message: '车牌使用中或无此车牌号' });
            } else if (res.data.message == "无此气罐") {
                showNotify({ type: 'danger', message: '无此气罐' });
            } else if (res.data.code == 200) {
                showNotify({ type: 'success', message: '入库成功' });
                router.push('/dingdan')
            }
        })
    }
}
const pairuForm =async (file: any) => {
    var f = file.file
    console.log(f.size/ 1024);
    let imgFile = null;
    if (f.size / 1024 > 500) {
        imgFile = await blobToBase64(f, f.name);
    } else {
        imgFile = f;
    }
    console.log(imgFile.size/ 1024);
    let reader = new FileReader()
    reader.readAsDataURL(imgFile)
    reader.onload = (e: any) => {
        // console.log(e.target.result)
        getToken(e.target.result)
    }
    showXuanze.value = false
}


const getToken = (image: any) => {
    // let params = {
    //     grant_type: 'client_credentials',
    //     client_id: 'K1G5AnvHgptwGkYeEfy28YQs',
    //     client_secret: 'rrUIuteatBecePmfqPk4OHDH8dWb8EGT'
    // }
    // getOcrToken(params).then((res) => {
    //     console.log(res);
    // })
    let params = {
        image: image
    }
    awaitData.value = true
    getOcrtext(params).then((res) => {
        console.log(JSON.parse(res.data.data).words_result);
        let ziTi = JSON.parse(res.data.data).words_result
        parseZiTi(ziTi)
    })

    // axios.get("/abc/oauth/2.0/token?grant_type=client_credentials&client_id=K1G5AnvHgptwGkYeEfy28YQs&client_secret=rrUIuteatBecePmfqPk4OHDH8dWb8EGT",
    //     {
    //         headers: {
    //             dataType: 'json'
    //         }
    //     }).then((res) => {
    //         // console.log(res.data.access_token);
    //         getDanTest(res.data.access_token, image)
    //     })
}

// const getDanTest = (token: any, image: any) => {
//     var params = new FormData();
//     params.append('image', image);
//     params.append("access_token", token);
//     console.log(11111);
//     console.log(image);
//     console.log(11111);

//     axios.post('/abc/rest/2.0/ocr/v1/accurate_basic?access_token', params,
//         {
//             headers: {
//                 'content-type': 'application/x-www-form-urlencoded'
//             }
//         }).then((res) => {
//             let ziTi = res.data.words_result
//             console.log(res);
//             parseZiTi(ziTi);
//         })
// }

const parseZiTi = (ziTi: any) => {
    // let ziTi: any = [
    //     {
    //         "words": "裕泰集团燃气车辆检斤单"
    //     },
    //     {
    //         "words": "检斤单号：JJ20231202071205"
    //     },
    //     {
    //         "words": "检斤类型"
    //     },
    //     {
    //         "words": "销售出货检斤"
    //     },
    //     {
    //         "words": "收货单位"
    //     },
    //     {
    //         "words": "内蒙古讯科商贸有限公司"
    //     },
    //     {
    //         "words": "发货单位"
    //     },
    //     {
    //         "words": "邯郸市隆汇天然气有限公司"
    //     },
    //     {
    //         "words": "货物名称"
    //     },
    //     {
    //         "words": "CNG"
    //     },
    //     {
    //         "words": "车号"
    //     },
    //     {
    //         "words": "冀DS8225"
    //     },
    //     {
    //         "words": "挂车号"
    //     },
    //     {
    //         "words": "豫J3Q17挂"
    //     },
    //     {
    //         "words": "交接气量(Nm3)"
    //     },
    //     {
    //         "words": "4277.95"
    //     },
    //     {
    //         "words": "前压(Mpa)"
    //     },
    //     {
    //         "words": "0.53"
    //     },
    //     {
    //         "words": "后压(Mpa)"
    //     },
    //     {
    //         "words": "19.48"
    //     },
    //     {
    //         "words": "计量时间"
    //     },
    //     {
    //         "words": "2023/12/27:12:05"
    //     },
    //     {
    //         "words": "备注"
    //     },
    //     {
    //         "words": "违规举报"
    //     },
    //     {
    //         "words": "举报"
    //     },
    //     {
    //         "words": "0310-2368903"
    //     },
    //     {
    //         "words": "电话"
    //     },
    //     {
    //         "words": "15175008555"
    //     },
    //     {
    //         "words": "打印时间："
    //     }
    // ]
    // 清空 formData 对象属性值
    Object.keys(formData).forEach(key => {
        formData[key] = ''
    });
    for (let index = 0; index < ziTi.length; index++) {
        // console.log(ziTi[index].words);
        if (/检斤单号|检斤号|检单号/.test(ziTi[index].words)) {
            formData.jjdh = ziTi[index].words.match(/[a-zA-Z].*/)[0]
        } else if (ziTi[index].words == '车号') {
            formData.cph = ziTi[index + 1].words
        } else if (ziTi[index].words == '挂车号') {
            formData.gc = ziTi[index + 1].words
        } else if (/交接气量|Nm3|Nm|交接|接气量/.test(ziTi[index].words)) {
            formData.jjql = ziTi[index + 1].words
        } else if (/检斤类型|类型|检斤类/.test(ziTi[index].words)) {
            formData.lx = ziTi[index + 1].words
        } else if (/收货单位|收货/.test(ziTi[index].words)) {
            formData.shdw = ziTi[index + 1].words
        } else if (/发货单位|发货/.test(ziTi[index].words)) {
            formData.phdw = ziTi[index + 1].words
        } else if (/货物名称|货物名|名称/.test(ziTi[index].words)) {
            formData.hwmc = ziTi[index + 1].words
        } else if (/前压/.test(ziTi[index].words)) {
            formData.qy = ziTi[index + 1].words
        } else if (/后压/.test(ziTi[index].words)) {
            formData.hy = ziTi[index + 1].words
        } else if (/计量时间|计量|量时间/.test(ziTi[index].words)) {
            formData.jlsj = ziTi[index + 1].words
        }
    }
    awaitData.value = false
}

const getCarPotData = () => {
    getCarEmpty().then((res) => {
        emptyCarArray.value = res.data.data.pageData || [{ name: "暂无空置车辆" }]
    })
    getPotEmpty().then((res) => {
        emptyPotArray.value = res.data.data.pageData || [{ name: "暂无气罐" }]
    })
}

onMounted(() => {
    getCarPotData()
    console.log(route.query.xg, 'xg');
    if (route.query.xg == "true") {
        userMain.orderInfo = ""
    } else {
        let ls = JSON.parse(JSON.stringify(userMain.orderInfo))
        formData.jjdh = ls.orderData.checkID
        formData.cph = ls.orderData.carName
        formData.gc = ls.orderData.potName
        formData.jjql = ls.orderData.totalGas
        formData.lx = ls.orderData.type
        formData.shdw = ls.orderData.receive
        formData.phdw = ls.orderData.send
        formData.hwmc = ls.orderData.cargoName
        formData.qy = ls.orderData.frontPress
        formData.hy = ls.orderData.backPress
        formData.jlsj = ls.orderData.countTime
        formData.bz = ls.orderData.startDesc
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