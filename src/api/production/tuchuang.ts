import request from "./tcRequest";

//上传图片
export function getLoginData(params:any) {
    return request({
        url: "/minio/upload?bucketName=public",
        method: "post",
        data:params
    });
}

