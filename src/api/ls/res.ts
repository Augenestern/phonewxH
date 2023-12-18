import axios from "axios";
// import { ElMessage } from "element-plus";
// import router from "@/routes";
// import { showNotify } from 'vant';
// import { createPinia } from 'pinia';
// const pinia: any = createPinia()
// 创建axios实例
const request = axios.create({
  baseURL: 'https://www.sdlhbgc.com/api/',
  // baseURL: "/api", // timeout: 80000, // 请求超时时间(毫秒) // withCredentials: true,// 异步请求携带cookie // headers: { // 设置后端需要的传参类型 // 'Content-Type': 'application/json', // 'token': x-auth-token',//一开始就要token // 'X-Requested-With': 'XMLHttpRequest', // },
});
// request拦截器
request.interceptors.request.use(
  (config) => {
    // 如果你要去localStor获取token,(如果你有)
    // const token = localStorage.getItem("token") || ""; // 添加请求头
    // config.headers["token"] = token;
    // config.headers["token"] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1M2I0OTBhOTc4YjRiOWYyNWViNzZlOCIsImFjY291bnQiOiJzZGxhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJHBadkYyMXIyY2JvTG5ielNOMzZ0enUya3pqRzZQaG1oVDlLY0JiSzRpVXNJbnBLS1lLellXIiwibmFtZSI6InJvb3QiLCJBdmF0YXJVcmwiOiJodHRwczovL2ltZy1zLW1zbi1jb20uYWthbWFpemVkLm5ldC90ZW5hbnQvYW1wL2VudGl0eWlkL0FBMWJ3TUFOLmltZz93PTE5MjBcdTAwMjZoPTEwODBcdTAwMjZxPTYwXHUwMDI2bT0yXHUwMDI2Zj1qcGciLCJzZXgiOiLnlLciLCJwaG9uZSI6IjEyMzQ1NiIsInNhbHQiOiIzOTQzNjc0NzY5OTg3Mzg4MTAiLCJyb2xlSWQiOiI2NTQzMDliMGQ3NWEyOTUyZjg5ZmFkZTMiLCJvcGVuSWQiOiIifSwiaXNzIjoic2RsIiwibmJmIjoxNjk4OTkxNzM3fQ.f57K8HYdhLfJabM8iLWTd4Ebi2BX6mGifjk1yxTciTY';
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// response 拦截器
request.interceptors.response.use(
  (response) => {
    // token失效，重新登录
    // if (response.data.code === 401) {
    //   //  重新登录
    //   showNotify({ type: 'warning', message: 'token失效' });
    //   //   ElMessage.error("token失效");
    //   router.push("/login");
    //   localStorage.clear();
    //   pinia.reset()
    //   //   location.href = "/";
    // } // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default request;