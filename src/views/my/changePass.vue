<template>
    <div class="container">
        <van-nav-bar  title="修改账号密码" left-text="返回" left-arrow @click-left="onClickLeft" />
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
let oldPass = ref('')
let newPass = ref('')
let newPass2 = ref('')
// let userInfo = ref()
const onClickLeft = ()=>{
    history.back()
}
const resetPass = ()=>{
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