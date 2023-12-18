import request from "./request";

//登录
export function getLoginData(params:any) {
    return request({
        url: "/login",
        method: "post",
        data:params
    });
}


export function changeRolePasswd(payload: any) {
    return request({
      url: "/user/changePassword",
      method: "post",
      data: payload,
    });
  }

