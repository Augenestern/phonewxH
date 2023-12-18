import request from "./res";

//获取所有站点
export function getStation() {   
    return request({
        url: "/getStation",
        method: "get"
    });
}
