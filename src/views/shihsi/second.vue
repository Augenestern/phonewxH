<template>
    <div>
        <div style="margin-top: 4vh;">
        <van-cell style=" font-size:1rem;" :title="paihao" :value="posi" />
        <van-cell style=" font-size:1rem;" :title="paihao" :value="posi" />
      </div>
    </div>
</template>

<script setup lang="ts">
let paihao = ref('冀D12313')
let posi = ref('邯郸市')
onMounted(() => {

})
onUnmounted(() => {
})
</script>

<style lang="less" scoped></style>