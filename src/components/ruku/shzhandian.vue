<template>
    <div>
        <div style="width: 100%;position: sticky;top: 0;z-index: 10;"> <van-nav-bar title="站点选择" left-text="返回" left-arrow
                @click-left="onClickLeft" /></div>
        <van-cell :title="item.name" v-for="item in userMain.zdName" @click="toleft(item)">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <van-icon style="color: rgb(22, 198, 22);" v-if="item.name==userMain.orderInfoOrderpcData.shzd" name="success" />
            </template>
        </van-cell>
    </div>
</template>

<script setup lang="ts">
import router from '@/routes';
import { useMain } from "@/store/home";
const userMain: any = useMain();
// const route = new (useRoute as any)

const onClickLeft = () => {
    router.go(-1)
}
const toleft = (item:any) => {
    userMain.orderInfoOrderpcData.shzd = item.name
    userMain.orderInfoOrderpcData.shzdId = item.id
    router.go(-1)
}
onMounted(() => {
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__text {
    font-size: 1.06rem;
}

/deep/.van-nav-bar__title {
    font-size: 1.25rem;
}
</style>