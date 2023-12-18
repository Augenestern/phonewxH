<template>
    <div
        style="width: 100vw;height: 100vh;display: flex;align-items: center;justify-content: center;flex-direction: column;">
        <img style="width: 30vw;" src="@/assets/gantanhao.png" alt="">
        <div style="margin-top: 10vh;">等待管理员授权</div>
    </div>
</template>

<script setup lang="ts">
import { getRoleName } from '@/api/wxLogin';
import router from '@/routes';
import { createPinia } from 'pinia';
const pinia: any = createPinia()
import { showDialog } from 'vant'
const getRole = () => {
    let ls: any = JSON.parse(localStorage.getItem('userInfo'))
    console.log(ls);
    let params = {
        phone: ls.phone
    }
    getRoleName(params).then((res) => {
        if (res.data.data !== localStorage.getItem('role')) {
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
onMounted(() => {
    getRole()
})
</script>

<style lang="less" scoped></style>