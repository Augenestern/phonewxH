import request from "./request";

//获取订单1,2
export function getOrderData(params: any) {
    return request({
        url: "/order/get",
        method: "get",
        params: params
    });
}
//获取订单0
export function getOrderData0() {
    return request({
        url: "/order/get0",
        method: "get"
    });
}
//获取司机订单
export function getDriverOrderData(params: any) {
    return request({
        url: "/order/getDriverOrder",
        method: "get",
        params: params
    });
}

//获取某个订单
export function getOrderById(params: any) {
    return request({
        url: "/order/getById",
        method: "get",
        params: params
    });
}

//创建订单
export function createOrder(params: any) {
    return request({
        url: "/order/create",
        method: "post",
        data: params
    });
}

//获取车空置
export function getCarEmpty() {
    return request({
        url: "/car/get0",
        method: "get"
    });
}
//获取车司机
export function getDriver(params:any) {
    return request({
        url: "/car/getDriver",
        method: "get",
        params:params
    });
}

//获取挂车空置
export function getPotEmpty() {
    return request({
        url: "/pot/get0",
        method: "get"
    });
}

// 删除订单
export function deleteOrder(_id:any,params:any) {
    return request({
        url: "/order/delete?_id="+_id,
        method: "delete",
        data:params
    });
}

//修改订单
export function updateOrder(params: any) {
    return request({
        url: "/order/update",
        method: "put",
        data: params
    });
}

// 结束订单
export function finishOrder(params:any) {
    return request({
        url: "/order/end",
        method: "put",
        data:params
    });
}

// 百度ocr
export function getOcrtext(params:any) {
    return request({
        url: "/baiduOCR",
        method: "post",
        data:params
    });
}

// //获取车辆位置
// export function getCarLocation(params:any) {
//     return request({
//         url: "/GPS/get",
//         method: "get",
//         params:params
//     });
// }


