// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        userInfo: null
    }
})

const AV = require('./libs/av-core-min.js');
const adapters = require('./libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
AV.init({
    appId: '{{appid}}',
    appKey: '{{appkey}}',
    // 请将 xxx.example.com 替换为你的应用绑定的自定义 API 域名 （暂时还没有配置）
    serverURLs: "https://xxx.example.com",
});