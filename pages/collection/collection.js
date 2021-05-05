// index.js
// 获取应用实例
const app = getApp();
const AV = require('../../libs/av-core-min.js');
const getDataForRender = requirementList => requirementList.toJSON();

Page({
    requirementList: [],
    data: {
        TabCur: 0,
        demand_title: "VIVA生命画像馆——周边产品设计",
        tag1: "教育升级",
        tag2: "文化保育",
        imgurl: "/image/diary.png",
        ngo_name: "益科技",
        location: "上海/线下",
    },
    // 事件处理函数
    onLoad() {
        this.saved()
    },

    // if saved
    saved: function() {
        const currentUser = AV.User.current();
        const query = new AV.Query('_User');
        query.equalTo('objectId', currentUser.objectId);
        query.find().then((user) => this.setData({
                requirementList: user.favorites.map(getDataForRender)
            }))
            .catch(console.error)
        wx.hideLoading()
    },

    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
        })
    },
    showDetailPage: function(e) {
        var req_objId = e.currentTarget.dataset.req_objid; // need to be all lowercase; i.e. can't be dataset.req_objId
        console.log(req_objId)
        wx.navigateTo({
            url: '/pages/logs/logs?req_objId=' + JSON.stringify(req_objId)
                // url: '/pages/logs/logs?req_objId=' + req_objId
        })
    }

})