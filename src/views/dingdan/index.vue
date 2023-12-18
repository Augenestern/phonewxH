<template>
  <div>
    <div style="position: sticky;top: 0vh; z-index: 10; background-color: #fff;">
      <div style="width: 100vw;height: 6vh;font-size: 1.0625rem;position: relative; color: #a9a8a8;">
        <div style="position: absolute; left: 6vw; top: 2vh;" :class="botBoo == '全部' ? 'bordbottom' : ''"
          @click="botBoo = '全部'">全部
        </div>
        <div v-if="role == '管理员' || role == '司机'" style="position: absolute; right: 44vw;top: 2vh;"
          :class="botBoo == '已入库' ? 'bordbottom' : ''" @click="botBoo = '已入库'">
          已入库
        </div>
        <div style="position: absolute; right: 24vw;top: 2vh;" :class="botBoo == '派送中' ? 'bordbottom' : ''"
          @click="botBoo = '派送中'">
          派送中
        </div>
        <div style="position: absolute; right: 4vw;top: 2vh;" :class="botBoo == '已完成' ? 'bordbottom' : ''"
          @click="botBoo = '已完成'">
          已完成
        </div>
      </div>
    </div>
    <!-- <div v-if="role == '管理员'" class="tianjianCard" @click="addDdan">添加订单</div> -->
    <van-floating-bubble v-if="role == '管理员' || role == '司机'" axis="xy" icon="plus" magnetic="x" @click="toRuku"
      v-model:offset="offset" />
    <div
      style="background-color: #faf8f8; display: flex;align-items: center;flex-direction: column; width: 100%;min-height: 90vh;">
      <div style="height: 1px;"></div>
      <div v-if="(role == '管理员' || role == '司机') && (botBoo == '全部' || botBoo == '已入库')">
        <div v-for="item in dingdanData0">
          <div class="ddCard" @click="toDetail(item)">
            <div class="ddCard-one">{{ item.orderData.checkID }} | <span  style="color: #4ad556;font-weight: 600;font-size: 0.97rem;">已入库</span></div>
            <!-- <div v-if="role == '管理员'"
            style="position: relative; left: 78vw; width: 40px;color:#a9a8a8; font-size: 20px;font-weight: 600; height: 40px;display: flex;align-items: center;justify-content: center;"
            @click.stop="jinxingClick(item)">
            <img style="width: 20px;" src="@/assets/编辑 (1).png" alt="">
          </div> -->
            <div class="ddCard-two"><img style="width: 18px;" src="@/assets/icon38.png" alt=""> {{
              item.chepaiNum }}&nbsp;&nbsp;{{ item.orderData.carName }}&nbsp;&nbsp;{{ item.orderData.potName }}</div>
            <div class="ddCard-three">
              <div><span style="color: #4ad556;font-weight: 600;font-size: 0.97rem;"></span> <span>  {{
                item.startTime.slice(0, 16) }}</span></div>
            </div>
            <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; top: 12.4vh;"></div>
          </div>
        </div>
      </div>
      <div v-if="botBoo == '全部' || botBoo == '派送中'">
        <div v-for="item in dingdanData2">
          <div class="ddCard" @click="toDetail(item)">
            <div class="ddCard-one">{{ item.orderData.checkID }} | <span style="color:#319ef8;font-weight: 600;font-size: 0.97rem;">派送中</span></div>
            <!-- <div style="color:#319ef8;font-weight: 600;position: absolute; top: 6vh; right: 4vw;">派送中&nbsp;</div> -->
            <!-- <div v-if="role == '管理员'"
            style="position: relative; left: 78vw; width: 40px;color:#a9a8a8; font-size: 20px;font-weight: 600; height: 40px;display: flex;align-items: center;justify-content: center;"
            @click.stop="jinxingClick(item)">
            <img style="width: 20px;" src="@/assets/编辑 (1).png" alt="">
          </div> -->
            <div class="ddCard-two"><img style="width: 18px;" src="@/assets/icon38.png" alt=""> {{
              item.chepaiNum }}&nbsp;&nbsp;{{ item.orderData.carName }}&nbsp;&nbsp;{{ item.orderData.potName }}</div>
            <div class="ddCard-three" style="bottom: 1.45vh;">
              <div style="width: 85vw;">
                <!-- <span style="color:#319ef8;font-weight: 600;font-size: 0.97rem;">派送中&nbsp; </span> -->
                <img style="width: 14px;position: relative; top: 2px;" src="@/assets/jiaotongxinxi.png" alt="">
                {{ item.address }}
              </div>
            </div>
            <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; top: 10.4vh;"></div>
          </div>
          <!-- <div v-if="!item.status && (botBoo == '全部' || botBoo == '派送中')" class="ddCard"
          @click="!item.status ? toDetail(item) : noToDetail()">
          <div class="ddCard-one">{{ item.paicheTime }} | {{ item.zhandian }}
          </div>
          <div style="color:#319ef8;font-weight: 600;position: absolute; top: 2vh; right: 4vw;">进行中&nbsp;</div>
          <div class="ddCard-two"><img style="width: 18px;" src="@/assets/icon38.png" alt=""> {{ item.chepaiNum
          }}&nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;{{ item.dianhua }}</div>
          <div class="ddCard-three">
            <div style="width: 85vw;margin-top: 10px;">
              <img style="width: 14px;position: relative; top: 2px;" src="@/assets/jiaotongxinxi.png" alt="">
              {{ item.address }}
            </div>
          </div>
          <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; top: 10.4vh;"></div>
        </div> -->
        </div>
      </div>
      <div v-if="botBoo == '全部' || botBoo == '已完成'">
        <div v-for="item in dingdanData1">
          <div class="ddCard" @click="toDetail(item)">
            <div class="ddCard-one">{{ item.orderData.checkID }} | 已完成</div>
            <!-- <div style="color:#319ef8;font-weight: 600;position: absolute; top: 2vh; right: 4vw;">派送中&nbsp;</div> -->
            <!-- <div v-if="role == '管理员'"
            style="position: relative; left: 78vw; width: 40px;color:#a9a8a8; font-size: 20px;font-weight: 600; height: 40px;display: flex;align-items: center;justify-content: center;"
            @click.stop="jinxingClick(item)">
            <img style="width: 20px;" src="@/assets/编辑 (1).png" alt="">
          </div> -->
            <div class="ddCard-two"><img style="width: 18px;" src="@/assets/icon38.png" alt=""> {{
              item.chepaiNum }}&nbsp;&nbsp;{{ item.orderData.carName }}&nbsp;&nbsp;{{ item.orderData.potName }}</div>
            <div class="ddCard-three">
              <div><span>{{ item.endTime }}</span></div>
            </div>
            <div style="position: absolute;width: 92%;height: 1px;background-color: #e4e4e4; top: 12.4vh;"></div>
          </div>
        </div>
      </div>
      <div style="height: 20vh; font-size: 1rem;padding-top: 10px;color: #a9a8a8;">到底了~</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/routes';
import { getOrderData, getOrderData0,getDriverOrderData } from '@/api/production/dingdan'
import { useMain } from "@/store/home";
import { getRoleName } from '@/api/wxLogin';
import { showDialog } from 'vant'
import { createPinia } from 'pinia';
const pinia: any = createPinia()
const userMain: any = useMain();

let dingdanData0: any = ref([])
let dingdanData1: any = ref([])
let dingdanData2: any = ref([])

const offset: any = ref({ x: 320, y: 630 });
let botBoo = ref('全部')
let role = ref(localStorage.getItem('role'))
const toDetail = (item: any) => {
  userMain.orderInfo = item
  // userMain.orderInfoOrderData = item.orderData
  console.log(JSON.parse(JSON.stringify(userMain.orderInfo)), '123');
  router.push('/kapian')
}
const getRole = () => {
    let ls: any = JSON.parse(localStorage.getItem('userInfo'))
    console.log(ls);
    let params = {
        phone: ls.phone
    }
    getRoleName(params).then((res) => {
        if (res.data.data != localStorage.getItem('role')) {
            showDialog({
                message: '用户角色已改变，请重新登录',
            }).then(() => {
                router.push('/login')
                localStorage.clear()
                pinia.reset()

            });
        }
    })
}
const toRuku = () => {
  router.push('/pairu?xg=true')
}
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
const getdata = () => {
  let params1 = {
    pageSize: 30,
    currPage: 1,
    userId: userInfo._id,
    status: 1,
  }
  let params2 = {
    pageSize: 1000,
    currPage: 1,
    userId: userInfo._id,
    status: 2,
  }
  // console.log(params);
  getOrderData(params1).then((res) => {
    dingdanData1.value = res.data.data.pageData
    console.log(dingdanData1.value, '1');
  })
  getOrderData(params2).then((res) => {
    dingdanData2.value = res.data.data.pageData
    console.log(dingdanData2.value, '2');
  })
  getOrderData0().then((res) => {
    dingdanData0.value = res.data.data.pageData
    console.log(dingdanData0.value, '0');
  })
}
const getsjData = () => {
  let params0 = {
    pageSize: 1000,
    currPage: 1,
    userId: userInfo._id,
    status: 0,
  }
  let params1 = {
    pageSize: 30,
    currPage: 1,
    userId: userInfo._id,
    status: 1,
  }
  let params2 = {
    pageSize: 1000,
    currPage: 1,
    userId: userInfo._id,
    status: 2,
  }
  // console.log(params);
  getDriverOrderData(params1).then((res) => {
    dingdanData1.value = res.data.data
    console.log(dingdanData1.value, '1');
  })
  getDriverOrderData(params2).then((res) => {
    dingdanData2.value = res.data.data
    console.log(dingdanData2.value, '2');
  })
  getDriverOrderData(params0).then((res) => {
    dingdanData0.value = res.data.data
    console.log(dingdanData0.value, '0');
  })
}

onMounted(() => {
  getRole()
  if (role.value == "司机") {
    getsjData()
  } else {
    getdata()
  }
});
onUnmounted(() => { });
</script>

<style lang="less" scoped>
.topTitle {
  position: sticky;
  top: 0;
  height: 6vh;
  // background-color: aqua;
  z-index: 10;
  background-color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding-bottom: 2vh;

  &-name {}

  img {
    margin-left: 4px;
    width: 16px;
    margin-top: 1vh;
  }
}

.tianjianCard {
  width: 94%;
  height: 8vh;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 2px #eee;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  margin-left: 3%;
  z-index: 30;
  bottom: 10vh;
}

.ddCard {
  width: 94vw;
  height: 18vh;
  margin-top: 6px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px 2px #eee;
  font-size: 1rem;
  ;
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
  color: black;
  font-weight: 600;
}
</style>
