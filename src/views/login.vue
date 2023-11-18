<template>
  <div>
    <van-button type="success" @click="toMain()">成功按钮</van-button>
  </div>
</template>

<script setup lang="ts">
// import { useMain } from "../store/home";
// const tabStore = useMain();
// tabStore.tabBarList = allRole["普通用户"];

const router = new (useRouter as any)();

const toMain = () => {
  localStorage.setItem("role","普通用户");
  router.push("/shishi");
};
onMounted(() => {
});
</script>
