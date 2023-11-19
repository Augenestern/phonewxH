import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/ddDetail",
    component: () => import("@/views/dingdan/detail.vue"),
  },
  {
    path: "/addDdan",
    component: () => import("@/views/dingdan/addDdan.vue"),
  },
  {
    path: "/sdqizhan",
    component: () => import("@/views/shihsi/sdqizhan.vue"),
  },
  {
    path:'/main',
    redirect: "/shishi",
    component: () => import("@/components/tabbar.vue"),
    children:[
      {
        path: "/shishi",
        component: () => import("@/views/shihsi/index.vue"),
      },
      {
        path: "/zhandian",
        component: () => import("@/views/sQizhan/zhandian.vue"),
      },
      {
        path: "/jiankong",
        component: () => import("@/views/jiankong/index.vue"),
      },
      {
        path: "/dingdan",
        component: () => import("@/views/dingdan/index.vue"),
      },
      {
        path: "/my",
        component: () => import("@/views/my/index.vue"),
      },
    ]
  }

];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next({ path: "/login" })
  } else {
    next()
  }
})
// 3导出路由   然后去 main.ts 注册 router.ts
export default router