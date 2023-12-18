// 普通用户
const adminList = [
    {
        pagePath: "/shishi",
        text: "气站",
        iconPath: "@/assets/dashuju.png",
        selectedIconPath: "@/assets/dashuju1.png",
        name: "index",
        index: '0'
    },
    // {
    //     pagePath: "/jiankong",
    //     text: "监控",
    //     iconPath: "@/assets/jiankong.png",
    //     selectedIconPath: "@/assets/jiankong1.png",
    //     name: "jiankong",
    //     index: '1'
    // },
    {
        pagePath: "/dingdan",
        text: "订单",
        iconPath: "@/assets/yuyuedingdan.png",
        selectedIconPath: "@/assets/yuyuedingdan1.png",
        name: "dingdan",
        index: '1'
    },
    {
        pagePath: "/my",
        text: "我的",
        iconPath: "@/assets/yonghu.png",
        selectedIconPath: "@/assets/yonghu1.png",
        name: "my",
        index: '2'
    }
]

//管理员
const userList = [
    {
        pagePath: "/zhandian",
        text: "气站",
        iconPath: "@/assets/dashuju.png",
        selectedIconPath: "@/assets/dashuju1.png",
        name: "index",
        index: '0'
    },
    // {
    //     pagePath: "/jiankong",
    //     text: "监控",
    //     iconPath: "@/assets/jiankong.png",
    //     selectedIconPath: "@/assets/jiankong1.png",
    //     name: "jiankong",
    //     index: '1'
    // },
    {
        pagePath: "/dingdan",
        text: "订单",
        iconPath: "@/assets/yuyuedingdan.png",
        selectedIconPath: "@/assets/yuyuedingdan1.png",
        name: "dingdan",
        index: '1'
    },
    {
        pagePath: "/my",
        text: "我的",
        iconPath: "@/assets/yonghu.png",
        selectedIconPath: "@/assets/yonghu1.png",
        name: "my",
        index: '2'
    }
]

//司机
const driverList = [
    {
        pagePath: "/dingdan",
        text: "订单",
        iconPath: "@/assets/yuyuedingdan.png",
        selectedIconPath: "@/assets/yuyuedingdan1.png",
        name: "dingdan",
        index: '1'
    },
    {
        pagePath: "/my",
        text: "我的",
        iconPath: "@/assets/yonghu.png",
        selectedIconPath: "@/assets/yonghu1.png",
        name: "my",
        index: '2'
    }
]

// 底部一级菜单
const allRole:any = {
    气站管理员: adminList,
    管理员: userList,
    司机:driverList
}
export { allRole }