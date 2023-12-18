<template>
  <div class="box">
    <div>
      <van-form>
        <van-field v-model="account" name="account" label="账号" placeholder="请输入注册手机号"
          :rules="[{ required: true, message: '请填写账号' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <div class="login-btn">
          <van-button round block type="primary" native-type="submit" @click="toMain">登录</van-button>
          <van-button style="margin-top: 2vh;" round block type="success" native-type="submit"
            @click="toZhuce">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showNotify } from 'vant';
import { getWxLoginData } from "@/api/wxLogin";
import { useMain } from '@/store/home'
// const userMain = useMain();
// tabStore.tabBarList = allRole["普通用户"];
let account = ref('')
let password = ref('')
import router from '@/routes';
const route = new (useRoute as any)
const toMain = () => {
  let params = {
    account: account.value,
    password: password.value
  }

  // //
  // localStorage.setItem("role", "管理员");
  // // localStorage.setItem("role", "司机");
  // // localStorage.setItem("role", "气站管理员");
  // localStorage.setItem('userInfo', JSON.stringify({
  //   name: 'oXoXo',
  //   account: "13231452021",
  //   // account: "17559551754",
  //   // account: "13292006060",
  //   role: "管理员",
  //   // role: "司机",
  //   // role: "气站管理员",
  //   roleCode: "2",
  //   _id: "6569b861a83a9f97f6ab9383",
  //   // _id: "65657d24e6dc927be4c8c4ec",
  //   // _id: "6565d6add0e32aa95f5bed7f",
  //   sex: "男",
  //   phone:"13231452021",
  //   // phone:'17559551754',
  //   // phone:'13292006060',
  //   AvatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIk3HLQtBOunuPalNia1LhdH9tqNU9ic0AK2mZD44iaTQvpVcodqg9wkepzMYSmoDr73HzYFsghhTfndCD9k5ogqn0Dg4m4eXvMia4Jn79HiacvP2w/132"
  // }))
  // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1NjczNzQzMjJiZDFmYzBmNTc2ZTQ1NCIsImFjY291bnQiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJDg5NDQ5SWhQNDEwQ2tUcFZickJocS5La2NCUksuSWtTaFVGL2FKay93WHJZLjdBc2lqenRXIiwibmFtZSI6ImFkbWluIiwiQXZhdGFyVXJsIjoiaHR0cHM6Ly90aGlyZHd4LnFsb2dvLmNuL21tb3Blbi92aV8zMi9zeFFvMHFrMVNXdlBBelR5UHRENEJaR3hDeGRPUzFzaWNXTWVkaDZpYThLWEtqckpEbHJUbzg0UlZ0ZnU2SjJLa3hHR0YzRlJRZmM1WFRxSEg3SXV0ZDdBLzEzMiIsInNleCI6IueUtyIsInBob25lIjoiMTIzNDU2Iiwic2FsdCI6IjQ0MDkwMTczNjUyMjMwMTM3MzAiLCJyb2xlSWQiOiI2NTUxZDVjMThkY2NmZDYwNjdmZjFhYjQiLCJvcGVuSWQiOiIiLCJzdGF0aW9uSWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJzdGF0aW9uTmFtZSI6IiIsImRlc2MiOiIiLCJ1bmlvbklkIjoiIiwic3RhdGUiOiIiLCJzdGF0aW9uIjoiIiwid3hOYW1lIjoiIn0sImlzcyI6InNkbCIsIm5iZiI6MTcwMTY4MzExMn0.2oLhT-jhwvgAB07spTIop60m0IMacybzCoX6ENmtSjE')
  // router.push('/dingdan')

  useMain().loginInfo = params
  let wxurl = getWeChatAuthUrl()
  window.location.href = wxurl;
};

// 获取微信授权链接
function getWeChatAuthUrl() {
  var appId = 'wx5b0874b7be225912';
  var redirectUri = encodeURIComponent('https://www.sdlhbgc.com/login');
  // var redirectUri = encodeURIComponent('https://www.sdlhbgc.com/callback');
  var scope = 'snsapi_base';
  var state = encodeURIComponent('params');
  var authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect';
  return authUrl;
}
const toZhuce = () => {
  router.push('/zhuce')
}
onMounted(() => {
  let code = route.query.code
  let yy = JSON.parse(JSON.stringify(useMain().loginInfo))
  if (code) {
    account.value = yy.account
    password.value = yy.password
    let params = {
      code: code,
      password: password.value,
      account: account.value
    }
    getWxLoginData(params).then((res) => {
      console.log(res, '登录');
      if (res.data.message == '账号错误') {
        showNotify({ type: 'danger', message: '账号不存在' });
      } else if (res.data.message == '密码错误') {
        showNotify({ type: 'danger', message: '密码错误' });
      } else if (res.data.message == '此用户的角色不存在') {
        showNotify({ type: 'danger', message: '账号不存在' });
      } else if (res.data.message == '不是此微信号用户') {
        showNotify({ type: 'danger', message: '您不是此微信号用户' });
      } else {
        showNotify({ type: 'success', message: '登录成功' });
        localStorage.setItem('userInfo', JSON.stringify(res.data.data))
        localStorage.setItem('role', res.data.data.role)
        localStorage.setItem('token', res.data.data.token)
        if (res.data.data.role == '游客') {
          router.push('/awaitGl')
        } else if (res.data.data.role == '管理员') {
          router.push('/zhandian')
        } else if (res.data.data.role == '气站管理员') {
          router.push('/shishi')
        } else if (res.data.data.role == '司机') {
          router.push('/dingdan')
        }
      }
    })
  }
})

onUnmounted(() => {
})
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
