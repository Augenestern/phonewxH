<template>
  <div>
    <div class="topTitle">
      <div class="topTitle-name">我的</div>
      <img src="@/assets/我的小.png" alt="">
    </div>
    <div style="background-color: #faf8f8;; min-height: 92vh;">
      <div style="height: 10px;"></div>
      <div class="grCard">
        <div style="width: 80%; height: 50%; display: grid; grid-template-columns: 1fr 3fr;  gap: 10px;">
          <div style=";grid-row: span 2;"><img src="@/assets/111.png" alt="" style="width: 60px; border-radius: 50%;"></div>
          <div style="font-size: 14px; font-weight: 600; padding-top: 6px;">ADCS</div>
          <div style="font-size: 12px; color: #8a8989;">账号:1111123</div>
        </div>
      </div>
      <div class="grList" style="margin-top: 20px;">2</div>
      <div class="grList">3</div>
      <div class="grList">1</div>
      <div class="grList">4</div>
    </div>
  </div>
</template>

<script setup lang="ts">

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
    margin-left: 5vw;
    margin-top: 1vh;
  }

  img {
    margin-left: 4px;
    width: 16px;
    margin-top: 1vh;
  }
}

.grCard {
  margin-top: 6px;
  width: 94%;
  margin-left: 3%;
  height: 20vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 4px #eee;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grList{
  width: 100%;
  height: 6vh;
  background-color: #fff;
  border-bottom:1px solid #eee;
}
</style>
