import request from "./request";

export function getStationData(params: any) {
    return request({
        url: "/DTUdata/getStationData",
        method: "get",
        params: params
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

//获取站点历史用气量
export function getStationHistoryData(params: any) {
    return request({
        url: "/DTUdata/getTotalGas",
        method: "get",
        params: params
    });
}