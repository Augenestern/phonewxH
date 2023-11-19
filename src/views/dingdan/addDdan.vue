<template>
    <div class="wBox">
        <div class="topBox">
            <span style="position: absolute; left: 4vw;top: 2vh;font-size: 14px;" @click="quxiao">取消</span>
            <van-button
                style="height: 28px; width: 42px;font-size: 13px;position: absolute;right: 4vw;top: 2vh;padding: 0px;"
                type="success">完成</van-button>
        </div>
        <div class="bottomBox">
            <div class="bottomBox-item">
                <div style="flex: 3;">站点</div>
                <div style="flex: 6;">{{ zhandianName }}</div>
                <div style="flex: 1.5;"><img style="width: 28px;" src="@/assets/记事本 (1).png" alt=""
                        @click="showXuanze = true"></div>
                <van-action-sheet v-model:show="showXuanze" :actions="actions" @select="onSelect" />
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">位置</div>
                <div style="flex: 6;">邯郸市</div>
                <div style="flex: 1.5;"></div>
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">车辆</div>
                <div style="flex: 6;">冀H12334</div>
                <div style="flex: 1.5;">
                    <img style="width: 28px;" src="@/assets/车辆登记.png" alt="" @click="showXuanze = true">
                </div>
            </div>
            <div class="bottomBox-item">
                <div style="flex: 3;">派送时间</div>
                <div style="flex: 6;">{{ selYdate }} {{ selYMindate }}</div>
                <div style="flex: 1.5;"> <img style="width: 18px; margin-left: 4px;" src="@/assets/日历.png"
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
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
let showXuanze = ref(false)
let showXuanzeTime = ref(false)
let showXuanzeMinTime = ref(false)
const actions = [
    { name: '小城站' },
    { name: '选项二' },
    { name: '选项三' }
];
let zhandianName = ref(actions[0].name)
onMounted(() => {
})
onUnmounted(() => {
})
//取消
const quxiao = () => {
    history.back()
}

//站点选择
const onSelect = (item: any) => {
    zhandianName.value = item.name
    showXuanze.value = false;
}

//日期和时间选择
let selYdate = ref(dayjs().format("YYYY-MM-DD"))
let selYMindate = ref(dayjs().format("HH:mm"))

let currentDate: any = ref()
let currentMinDate: any = ref([dayjs().format('HH'), dayjs().format('mm')])

let newTime = new Date()
newTime.setFullYear(newTime.getFullYear() + 4);
let maxDate = newTime

const saveYTime = () => {
    selYdate = currentDate._rawValue.join("-")
    showXuanzeTime.value = false
    showXuanzeMinTime.value = true
}
const cancelTime = () => {
    showXuanzeTime.value = false
}

const saveYMinTime = () => {
    console.log(currentMinDate);
    selYMindate = currentMinDate._rawValue.join(":")
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
    margin-top: 16vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

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