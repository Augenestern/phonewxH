// 普通用户
const adminList = [
    {
        pagePath: "/shishi",
        text: "气站",
        iconPath: "../assets/大数据.png",
        selectedIconPath: "../assets/大数据 (1).png",
        name: "index",
        index: '0'
    },
    {
        pagePath: "/jiankong",
        text: "监控",
        iconPath: "../assets/监控设备.png",
        selectedIconPath: "../assets/监控设备(1).png",
        name: "jiankong",
        index: '1'
    },
    {
        pagePath: "/dingdan",
        text: "订单",
        iconPath: "../assets/_预约订单.png",
        selectedIconPath: "../assets/_预约订单(1).png",
        name: "dingdan",
        index: '2'
    },
    {
        pagePath: "/my",
        text: "我的",
        iconPath: "../assets/用户.png",
        selectedIconPath: "../assets/用户(1).png",
        name: "my",
        index: '3'
    }
]

const tourist = [
    {
        pagePath: "/my",
        text: "我的",
        iconPath: "../assets/用户.png",
        selectedIconPath: "../assets/用户 (1).png",
        name: "my",
        index: '3'
    }
]

// 底部一级菜单
const allRole:any = {
    普通用户: adminList,
    游客: tourist,
}
export { allRole }