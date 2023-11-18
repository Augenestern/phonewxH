<template>
  <div>
    <div class="topTitle">
      <div class="topTitle-name">订单</div>
      <img src="@/assets/订单.png" alt="">
    </div>
    <div
      style="background-color: #faf8f8; display: flex;align-items: center;flex-direction: column; width: 100%;min-height: 94vh;">
      <div style="height: 1px;"></div>
      <div v-for="item in dingdanData" class="ddCard" @click="!item.status?toDetail():noToDetail()">
        <div class="ddCard-top">
          <div class="ddCard-top-left">站点:{{ item.zhandian }}</div>
          <div v-if="!item.status" class="ddCard-top-right">正在进行中&nbsp;&nbsp;
            <div style="width: 10px;height: 10px;background-color: rgb(111, 241, 111); border-radius: 50%;"></div>
          </div>
          <div v-else class="ddCard-top-right">已完成&nbsp;&nbsp;
            <div style="width: 10px;height: 10px;background-color: rgb(188, 188, 188); border-radius: 50%;"></div>
          </div>
        </div>
        <div class="ddCard-bottom">
          <div class="ddCard-bottom-left">
            <div>{{ item.chepaiNum }}</div>
            <div class="popo">车牌号</div>
          </div>
          <div class="ddCard-bottom-mid">
            <div>{{ item.paicheTime }}</div>
            <div class="popo">派车时间</div>
          </div>
          <div v-if="!item.status" class="ddCard-bottom-right">
            <div>{{ item.gpsPosition }}</div>
            <div class="popo">当前位置</div>
          </div>
          <div v-else class="ddCard-bottom-right">
            <div>{{ item.endTime }}</div>
            <div class="popo">结束时间</div>
          </div>
        </div>
      </div>
      <div style="height: 10px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/routes';

let dingdanData = ref([
  {
    zhandian: "1112",
    paicheTime: "11-09 23:00",
    endTime: "11-10 23:00",
    chepaiNum: "冀D-232",
    gpsPosition: "邯郸",
    status: 0
  },
  {
    zhandian: "1332",
    paicheTime: "11-09 23:00",
    endTime: "11-10 23:00",
    chepaiNum: "冀D-442",
    gpsPosition: "石家庄",
    status: 0
  },
  {
    zhandian: "1222",
    paicheTime: "11-09 23:00",
    endTime: "11-10 23:00",
    chepaiNum: "冀D-332",
    gpsPosition: "邯郸",
    status: 1
  }
])
const toDetail = ()=>{
  router.push('/ddDetail')
}
const noToDetail = ()=>{
}
onMounted(() => { });
onUnmounted(() => { });
</script>

<style lang="less" scoped>
.topTitle {
  position: sticky;
  top: 0;
  height: 4vh;
  // background-color: aqua;
  z-index: 10;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding-bottom: 2vh;

  &-name {
    margin-left: 10px;
    margin-top: 1vh;
  }

  img {
    margin-left: 4px;
    width: 16px;
    margin-top: 1vh;
  }
}

.ddCard {
  width: 94%;
  height: 15vh;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 4px #eee;
  font-size: 12px;

  &-top {
    height: 5vh;
    width: 100%;
    // background-color: aqua;
    border-bottom: 1px solid #eee;
    position: relative;

    &-left {
      position: absolute;
      left: 16px;
      top: 1vh;
      font-weight: 600;
      font-size: 14px;
    }

    &-right {
      position: absolute;
      right: 10px;
      top: 1vh;
      display: flex;
      align-items: center;
      font-size: 10px;
    }
  }

  &-bottom {
    height: 10vh;
    // background-color: #e95757;
    display: flex;
    &-left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    &-mid {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    &-right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
.popo{
  margin-top: 10px;
  color: #a4a3a3;
}
</style>
