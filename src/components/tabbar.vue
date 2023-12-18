<template>
    <div style="height: 100%;">
        <div style="height: 92%;">
            <router-view />
        </div>
        <div class="tab-bar">
            <div class="tab-bar-border"></div>
            <div v-for="(item, index) in tablist" :key="index" class="tab-bar-item" :data-id="index" @click="jump(item)">
                <div v-if="current == item.pagePath">
                    <img v-if="index == 0" src="@/assets/dashuju1.png" />
                    <!-- <img v-else-if="index == 1" src="@/assets/jiankong1.png" /> -->
                    <img v-else-if="index == 1" src="@/assets/yuyuedingdan1.png" />
                    <img v-else-if="index == 2" src="@/assets/yonghu1.png" />
                </div>
                <div v-else>
                    <img v-if="index == 0" src="@/assets/dashuju.png" />
                    <!-- <img v-else-if="index == 1" src="@/assets/jiankong.png" /> -->
                    <img v-else-if="index == 1" src="@/assets/yuyuedingdan.png" />
                    <img v-else-if="index == 2" src="@/assets/yonghu.png" />
                </div>
                <div :style="{ color: current == item.pagePath ? '#319ef8' : 'black' }"
                    style=" margin-top: 2px; font-size: 1rem">
                    {{ item.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { allRole } from "@/routes/role";
const router = new (useRouter as any)();
const route = new (useRoute as any)();
let role: any = localStorage.getItem("role");
let tablist: any = ref(allRole[role]);
let current = ref(route.path)
watch(() => route.path, () => {
    current.value = route.path
})
// const getAssetsFile = (item: any) => {
//     let url = current == item.pagePath ? item.selectedIconPath : item.iconPath
//     console.log(new URL(url, import.meta.url).href);
//     return new URL(url, import.meta.url).href
// }
onMounted(() => {
    // 禁用手机返回键的默认跳转行为
    window.history.pushState(null, '', window.location.href);
})

onUnmounted(() => {
    // 移除全局禁用的设置
    window.history.replaceState(null, '', window.location.href);
})
const jump = (e: any) => {
    current.value = e.pagePath
    router.push(e.pagePath);
};
</script>

<style scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 8vh;
    border-top: 1px solid #ccc;
    background: white;
    display: flex;
}

.tab-bar-border {
    background-color: white;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 2px solid rgba(187, 187, 187, 0.3);
    transform: scaleY(0.5);
}

.tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.tab-bar-item img {
    width: 28px;
    height: 28px;
}

/* .tab-bar-item div {
    font-size: 0.625rem;
} */
</style>
