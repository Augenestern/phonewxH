<template>
    <div style="height: 100%;">
        <div style="height: 90%;">
            <router-view />
        </div>
        <div class="tab-bar">
            <div class="tab-bar-border"></div>
            <div v-for="(item, index) in tablist" :key="index" class="tab-bar-item" :data-id="index" @click="jump(item)">
                <img :src="getAssetsFile(item)" />
                <div :style="{ color: current == item.pagePath ? '#319ef8' : 'black' }"
                    style=" margin-top: 2px; font-size: 12px">
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
let current = route.path
console.log(current);

const getAssetsFile = (item: any) => {
    let url = current == item.pagePath ? item.selectedIconPath : item.iconPath
    return new URL(url, import.meta.url).href
}
const jump = (e: any) => {
    current = e.pagePath
    router.push(e.pagePath);
};
</script>

<style scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;
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
    width: 24px;
    height: 24px;
}

.tab-bar-item div {
    font-size: 10px;
}
</style>
