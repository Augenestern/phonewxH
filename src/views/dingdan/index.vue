<template>
  <div>
    <div class="topTitle">
      <div class="topTitle-name">订单</div>
      <img src="@/assets/订单.png" alt="">
    </div>
    <div style="position: sticky;top: 6vh; z-index: 10; background-color: #fff;">
      <div style="width: 100vw;height: 4vh;font-size: 13px;font-weight: 600;position: relative;">
        <div style="position: absolute; left: 6vw; " :class="botBoo == '全部' ? 'bordbottom' : ''" @click="botBoo = '全部'">全部
        </div>
        <div style="position: absolute; right: 24vw;" :class="botBoo == '进行中' ? 'bordbottom' : ''"
          @click="botBoo = '进行中'">
          进行中
        </div>
        <div style="position: absolute; right: 4vw;" :class="botBoo == '已完成' ? 'bordbottom' : ''" @click="botBoo = '已完成'">
          已完成
        </div>
      </div>
    </div>
    <div
      style="background-color: #faf8f8; display: flex;align-items: center;flex-direction: column; width: 100%;min-height: 90vh;">
      <div style="height: 1px;"></div>
      <div v-if="role == '管理员'" class="tianjianCard" @click="addDdan">添加订单</div>
      <div v-for="item in dingdanData">
        <div v-if="item.status && (botBoo == '全部' || botBoo == '已完成')" class="ddCard"
          @click="!item.status ? toDetail(item) : noToDetail()">
          <div class="ddCard-one">{{ item.paicheTime }} | {{ item.zhandian }}</div>
          <div class="ddCard-two"><img style="width: 18px;" src="@/assets/icon38 (1).png" alt=""> {{
            item.chepaiNum }}，{{ item.name }}，{{ item.dianhua }}</div>
          <div class="ddCard-three">
            <div v-if="!item.status"><span style="color:#319ef8;font-weight: 600;">进行中</span> <span> | <img
                  style="width: 14px;position: relative; top: 2px;" src="@/assets/jiaotongxinxi.png" alt=""> {{
                    item.gpsPosition }}</span></div>
            <div v-else>已完成 <span> | {{ item.endTime }}</span></div>
          </div>
          <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; top: 12.4vh;"></div>
        </div>
        <div v-if="!item.status && (botBoo == '全部' || botBoo == '进行中')" class="ddCard"
          @click="!item.status ? toDetail(item) : noToDetail()">
          <div class="ddCard-one">{{ item.paicheTime }} | {{ item.zhandian }}</div>
          <div class="ddCard-two"><img style="width: 18px;" src="@/assets/icon38 (1).png" alt=""> {{ item.chepaiNum
          }}，{{ item.name }}，{{ item.dianhua }}</div>
          <div class="ddCard-three">
            <div v-if="!item.status"><span style="color:#319ef8;font-weight: 600;">进行中</span> <span> | <img
                  style="width: 14px;position: relative; top: 2px;" src="@/assets/jiaotongxinxi.png" alt=""> {{
                    item.gpsPosition }}</span></div>
            <div v-else>已完成 <span> | {{ item.endTime }}</span></div>
          </div>
          <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; top: 12.4vh;"></div>
        </div>
      </div>
      <div style="height: 14vh; font-size: 12px;padding-top: 10px;color: #a9a8a8;">到底了~</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/routes';
import { getOrderData } from '@/api/production/dingdan'
import { useMain } from "@/store/home";
const userMain: any = useMain();
let dingdanData: any = ref([
  // {
  //   zhandian: "小城站",
  //   paicheTime: "11-09 23:00",
  //   endTime: "11-10 23:00",
  //   chepaiNum: "冀D-232",
  //   gpsPosition: "邯郸",
  //   name: '张三丰',
  //   dianhua: '13828834657',
  //   status: 0
  // }
])
let botBoo = ref('全部')
let role = ref(localStorage.getItem('role'))
const toDetail = (item:any) => {
  console.log(item);
  userMain.orderInfo = item
  router.push('/ddDetail')
}
const addDdan = () => {
  router.push('/addDdan')
}
const noToDetail = () => {
}
const getdata = () => {
  let params = {
    pageSize: 1000,
    currPage: 1
  }
  getOrderData(params).then((res) => {
    let xx = res.data.data.pageData
    for (let i = 0; i < xx.length; i++) {
      let yy: any = {}
      yy.zhandian = xx[i].stationName
      yy.paicheTime = xx[i].startTime.slice(0,16)
      yy.endTime = xx[i].endTime.slice(0,16)
      yy.chepaiNum = xx[i].carId
      // yy.gpsPosition = xx[i].
      yy.name = xx[i].driverName
      yy.dianhua = xx[i].driverPhone
      yy.status = xx[i].status
      // console.log(yy);
      dingdanData.value.push(yy)
    }
  })
}
onMounted(() => {
  getdata()
});
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
    margin-left: 5vw;
    margin-top: 1vh;
  }

  img {
    margin-left: 4px;
    width: 16px;
    margin-top: 1vh;
  }
}

.tianjianCard {
  width: 94%;
  height: 8vh;
  margin-top: 6px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 2px #eee;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ddCard {
  width: 94vw;
  height: 18vh;
  margin-top: 6px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 2px #eee;
  font-size: 12px;
  position: relative;
  padding-left: 4vw;
  box-sizing: border-box;

  &-one {
    position: absolute;
    top: 2vh;
    color: #afafaf;
  }

  &-two {
    position: absolute;
    top: 6.5vh;
  }

  &-three {
    position: absolute;
    bottom: 1.8vh;
    color: #afafaf;
  }
}

.popo {
  margin-top: 10px;
  color: #a4a3a3;
}

.bordbottom {
  border-bottom: 3px solid #319ef8;
  padding-bottom: 2px;
}
</style>
