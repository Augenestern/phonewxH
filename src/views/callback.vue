<template>
    <div>
    </div>
</template>
<script setup lang="ts">
import { getWxLoginData } from '@/api/wxLogin';
import { useMain } from "../store/home";
const userMain = useMain();
const route = new (useRoute as any)
const router = new (useRouter as any)
let code1: any = ref('')
// let aaa = ref()
onMounted(() => {
    code1.value = route.query.code
    if (code1.value) {
        getWxLoginData({ code: code1.value }).then((res) => {
            if (res.data.data.roleId) {
                let xx = res.data.data
                userMain.userId = xx.openId
                userMain.userInfo = xx
                if (xx.roleId == "6562d30b2a47390c68b04e0c") {
                    router.push('/awaitGl')
                } else if (xx.roleId == "6551d5c18dccfd6067ff1ab4") {
                    localStorage.setItem("role", '管理员');
                    router.push("/zhandian");
                } else {
                    localStorage.setItem("role", "普通用户");
                    router.push("/shishi");
                }
            }
        })
    }
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped></style>