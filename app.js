// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        const AV = require('./libs/av-core-min.js');
        const adapters = require('./libs/leancloud-adapters-weapp.js');

        AV.setAdapters(adapters);
        AV.init({
            appId: 'NdCkOyRxT5xXE7VA9GLyAXCf-gzGzoHsz',
            appKey: 'n55hgBBMiWT1iSSPcqiSAOOQ',
            // serverURLs: 'https://api.tech4good.org.cn',
            serverURLs: 'https://ndckoyrx.lc-cn-n1-shared.com'
        });
    },
    globalData: {
        userInfo: null
    }
})