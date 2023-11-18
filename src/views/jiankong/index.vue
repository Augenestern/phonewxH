<template>
  <div>
    <div class="topTitle">
      <div class="topTitle-name">监控</div>
      <img src="@/assets/监控3.png" alt="">
     
    </div>
    <div style="background-color: #eee;">my</div>
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
    margin-left: 10px;
    margin-top: 1vh;
  }

  img {
    margin-left: 4px;
    width: 24px;
    margin-top: 1vh;
  }
}
</style>
