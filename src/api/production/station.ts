import request from "./request";

export function getStationData() {
    return request({
        url: "/DTUdata/getStationData",
        method: "get",
    });
}

//echarts数据
export function getStationEchaData(params: any) {
    return request({
        url: "/DTUdata/getEcharts",
        method: "get",
        params: params
    });
}