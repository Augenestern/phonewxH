<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import router from "@/routes";
import { useMain } from "../store/home";
import { getUserData } from "@/api/wxLogin";
const userMain = useMain();

// 获取微信授权链接
function getWeChatAuthUrl() {
  var appId = 'wx5b0874b7be225912';
  var redirectUri = encodeURIComponent('https://www.sdlhbgc.com/callback');
  // var redirectUri = encodeURIComponent('https://www.sdlhbgc.com/callback');
  var scope = 'snsapi_userinfo';
  var state = encodeURIComponent('your_state_parameter');
  var authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect';
  return authUrl;
}
console.log('微信授权链接: ', getWeChatAuthUrl());
// let aaa = ref()
// let bbb = ref("0")
onMounted(() => {
  if (userMain.userId == '' || userMain.userId == null || userMain.userId == undefined) {
    let wxurl = getWeChatAuthUrl()
    // bbb.value = wxurl
    window.location.href = wxurl;
  }
  else {
    let params = {
      openid: userMain.userId
      // openid: 'okdDs6WyxWW6BF1euGINmlUO7xhU'
    }
    getUserData(params).then((res) => {
      // aaa.value = res
      // console.log(res.data.data);
      if (res.data.code == 200) {
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
});
onUnmounted(() => {
})
</script>
<style lang="less" scoped></style>