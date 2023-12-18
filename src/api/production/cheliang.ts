import request from "./request";

//获取所有车辆
export function getAllCar() {
    return request({
        url: "/GPSdevice/get",
        method: "get"
    });
}

//获取车辆位置
export function getCarLocation(params:any) {
    return request({
        url: "/GPS/get",
        method: "get",
        params:params
    });
}


