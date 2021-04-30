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
    onShow(){
        const AV = require('./libs/av-core-min.js');
        const adapters = require('./libs/leancloud-adapters-weapp.js');
        AV.setAdapters(adapters);
        AV.init({
            appId: '{{leancloudId}}',
            appKey: '{{leancloudKey}}',
            serverURLs: '{{leancloudURL}}',
        })
    },
    globalData: {
        userInfo: null,
        leancloudId: 'NdCkOyRxT5xXE7VA9GLyAXCf-gzGzoHsz',
        leancloudKey: 'n55hgBBMiWT1iSSPcqiSAOOQ',
        leancloudURL: 'https://ndckoyrx.lc-cn-n1-shared.com'
    }
})

// const AV = require('./libs/av-core-min.js');
// const adapters = require('./libs/leancloud-adapters-weapp.js');

// AV.setAdapters(adapters);
// AV.init({
//     appId: '{{appid}}',
//     appKey: '{{appkey}}',
//     serverURLs: "https://ndckoyrx.lc-cn-n1-shared.com",
// });