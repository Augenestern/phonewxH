import request from "./request";

//获取所有订单
export function getOrderData(params:any) {
    return request({
        url: "/order/get",
        method: "get",
        params:params
    });
}

//


