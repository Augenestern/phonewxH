import request from "./wxres";

//wx注册
export function getWxRegisterData(params:any) {
    return request({
        url: "/wxFunction/register",
        method: "post",
        params:params
    });
}
//wx登录
export function getWxLoginData(params:any) {
    return request({
        url: "/wxFunction/login",
        method: "post",
        params:params
    });
}

//获取角色名称
export function getRoleName(params:any) {
    return request({
        url: "/wxFunction/getRole",
        method: "post",
        params:params
    });
}

// //wx二次登录
// export function getUserData(params:any) {
//     return request({
//         url: "/wxFunction/login0",
//         method: "get",
//         params:params
//     });
// }
