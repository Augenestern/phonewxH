<template>
    <div>
        <div class="btnSty">
            <div class="btnSty-item">
                <div class="btnSty-item-one" :style="titleQf === '实时' ? { backgroundColor: '#429efa',color:'white'} : {}" @click="titleQf='实时'">实时 </div>
            </div>
            <div class="btnSty-item">
                <div class="btnSty-item-one" :style="titleQf === '24小时' ? { backgroundColor: '#429efa',color:'white'} : {}" @click="titleQf='24小时'">24小时</div>
            </div>
            <div class="btnSty-item">
                <div class="btnSty-item-one" :style="titleQf === '近七日' ? { backgroundColor: '#429efa',color:'white'} : {}" @click="titleQf='近七日'">近七日</div>
            </div>
        </div>
        <tabs1 v-if="titleQf === '实时'"></tabs1>
        <tabs2 v-if="titleQf === '24小时'"></tabs2>
        <tabs3 v-if="titleQf === '近七日'"></tabs3>
    </div>
</template>

<script setup lang="ts">
import tabs1 from './tabs/tabs1.vue'
import tabs2 from './tabs/tabs2.vue'
import tabs3 from './tabs/tabs3.vue'
let titleQf = ref('实时')
onMounted(() => {
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
.btnSty {
    width: 80vw;
    margin-left: 10vw;
    height: 6vh;
    // background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: center;

    &-item {
        flex: 1;
        display: flex;
        justify-content: center;
        font-size: 1rem;

        &-one {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70px;
            height: 26px;
            border-radius: 25px;
            background-color: #f6f5f5;
        }
    }
}
.btnColor{
    background-color: #429efa;
}
</style>