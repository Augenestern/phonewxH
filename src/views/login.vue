<template>
  <div class="box">
    <div>
      <van-form>
        <van-field v-model="account" name="account" label="用户名" placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <div class="login-btn">
          <van-button round block type="primary" native-type="submit" @click="toMain">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLoginData } from "@/api/production/login";
import { useMain } from "../store/home";
const userMain = useMain();
// tabStore.tabBarList = allRole["普通用户"];
let account = ref('')
let password = ref('')
const router = new (useRouter as any)();

const toMain = () => {
  let params = {
    account: account.value,
    password: password.value
  }
  getLoginData(params).then((res) => {
    if (res.data.code == 200) {
      let xx = res.data.data
      userMain.userInfo = xx
      localStorage.setItem("role", xx.role);
      if (localStorage.getItem('role') == "管理员") {
        router.push("/zhandian");
      } else {
        router.push("/shishi");
      }
    }
  })
  // localStorage.setItem("role", "管理员");
  // if (localStorage.getItem('role') == "管理员") {
  //   router.push("/zhandian");
  // } else {
  //   router.push("/shishi");
  // }
};
onMounted(() => {

});
</script>
<style scoped>
.box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn {
  margin-top: 140px;
}

.checkbox {
  padding: 16px;
  margin-top: 10px;
}
</style>
