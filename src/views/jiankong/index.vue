<template>
  <div>
    <!-- <div class="topTitle">
      <div class="topTitle-name">监控</div> -->
      <!-- <img src="@/assets/监控3.png" alt=""> -->
     
    <!-- </div> -->
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

  &-name {
  }

  img {
    margin-left: 4px;
    width: 24px;
    margin-top: 1vh;
  }
}
</style>
