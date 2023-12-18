import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/zhuce",
    component: () => import("@/views/zhuce.vue"),
  },
  {
    path: "/pairu",
    component: () => import("@/components/ruku/pairu.vue"),
  },
  {
    path: "/paichu",
    component: () => import("@/components/ruku/paichu.vue"),
  },
  {
    path: "/chuku",
    component: () => import("@/components/ruku/chuku.vue"),
  },
  {
    path: "/shzhandian",
    component: () => import("@/components/ruku/shzhandian.vue"),
  },
  {
    path: "/kapian",
    component: () => import("@/components/ruku/kapian.vue"),
  },
  {
    path: "/changePass",
    component: () => import("@/views/my/changePass.vue"),
  },
  {
    path: "/ddDetail",
    component: () => import("@/views/dingdan/detail.vue"),
  },
  {
    path: "/ssdetail",
    component: () => import("@/views/shihsi/tabs/ssdetail.vue"),
  },
  {
    path: "/bianji",
    component: () => import("@/views/dingdan/bianji.vue"),
  },
  {
    path: "/callback",
    component: () => import("@/views/callback.vue"),
  },
  // {
  //   path: "/shouquan",
  //   component: () => import("@/views/shouquan.vue"),
  // },
  {
    path: "/addDdan",
    component: () => import("@/views/dingdan/addDdan.vue"),
  },
  {
    path: "/awaitGl",
    component: () => import("@/views/awaitGl/awaitGl.vue"),
  },
  {
    path: "/sdqizhan",
    redirect: "/first",
    name: 'sdqizhan',
    component: () => import("@/views/shihsi/sdqizhan.vue"),
    children: [
      {
        path: "/first",
        component: () => import("@/views/shihsi/first.vue"),
      },
      {
        path: "/second",
        component: () => import("@/views/shihsi/second.vue"),
      },
      {
        path: "/third",
        component: () => import("@/views/shihsi/third.vue"),
      }
    ]
  },
  {
    path: '/main',
    redirect: "/shishi",
    component: () => import("@/components/tabbar.vue"),
    children: [
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
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  if (token && role) {
    if (to.path === "/login" || to.path == '/') {
      if (role == '管理员') {
        next({ path: "/zhandian" })
      } else if (role == '气站管理员') {
        next({ path: "/shishi" })
      } else if (role == '司机') {
        next({ path: "/dingdan" })
      } else if (role == '游客') {
        next({ path: "/awaitGl" })
      }
    } else {
      next()
    }
  } else {
    if (to.path !== "/login") {
      if (to.path == "/zhuce" || to.path == '/awaitGl') {
        next()
      } else {
        next({ path: "/login" })
      }
    } else {
      next()
    }
  }
})
// 3导出路由   然后去 main.ts 注册 router.ts
export default router