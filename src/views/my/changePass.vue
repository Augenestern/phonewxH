<template>
    <div class="container">
        <van-nav-bar title="修改账号密码" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="pass">
            <van-field type="password" v-model="oldPass" required label="原密码" placeholder="请输入原密码" />
            <van-field type="password" v-model="newPass" required label="新密码" placeholder="请输入新密码" />
            <van-field type="password" v-model="newPass2" required label="确认新密码" placeholder="再次输入新密码" />
        </div>
        <div class="btn">
            <van-button type="primary" block @click="resetPass">确定</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showNotify } from 'vant';
import { changeRolePasswd } from "@/api/production/login";
import router from '@/routes';
let oldPass = ref('')
let newPass = ref('')
let newPass2 = ref('')
// let userInfo = ref()
const onClickLeft = () => {
    history.back()
}
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
const resetPass = () => {
    if (oldPass.value !== "" && newPass.value !== "") {
        if (newPass.value !== newPass2.value) {
            showNotify({ type: 'danger', message: '两次新密码不一致' });
        } else {
            let params = {
                account:userInfo.account,
                oldPass:oldPass.value,
                newPass:newPass.value,
            }
            changeRolePasswd(params).then((res) => {
                if(res.data.message=="密码错误"){
                    showNotify({ type: 'danger', message: '原密码错误,修改失败' });
                }else if(res.data.code==200){
                    showNotify({ type: 'success', message: '密码修改成功' });
                    router.push('/my')
                }
            })
        }
    }else{
        showNotify({ type: 'danger', message: '修改失败' });
    }
}
onMounted(() => {
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
.pass {
    margin-top: 30px;
}

.btn {
    margin-top: 100px;
}
</style>