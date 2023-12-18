<script setup lang="ts">
import router from './routes';
// var time:any = '' // 用来存上一次按键时间；
setTimeout(() => {
  // 监听返回按钮
  document.addEventListener('plusready', function () {
    plus.key.addEventListener('backbutton', function (_evt:any) {
      var webview = plus.webview.currentWebview();
      var url = location.hash.split('/')[1];
      console.log("url",url);
      if (url === 'login' || url==='shishi'|| url==='zhandian'|| url==='jiankong'|| url==='dingdan'|| url==='my') { // 处于首页时,实现退出app操作
        // vant.Toast('提示');
        webview.close();
        return;
      }else if(url==='first'||url==='second'||url==="third"){
        router.push('/zhandian')
      } else {
        history.go(-1); // 不满足退出操作，，返回上一页
      }
    }, false);
  })
}, 10)
</script>

<template>
  <div><router-view></router-view></div>
</template>

<style scoped>
</style>
