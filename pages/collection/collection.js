// collections.js
// 获取应用实例
const app = getApp();
const AV = require('../../libs/av-core-min.js');
const getDataForRender = fetchedObjects => fetchedObjects.toJSON();
Page({
    data: {
        demand_title: "",
        tag1: "",
        tag2: "",
        imgurl: "",
        requirementList: [],
        ngo_name: "",
        location: "",
    },
    // 事件处理函数
    onLoad() {
        this.saved()
    },
    // if saved
    saved: function() {
        const currentUser = AV.User.current();
        wx.showLoading({
            title: '加载中',
        })
        const favs = currentUser.get('favorites');
        // console.log("favs is: " + favs);

        if (favs != null) {
            var favObjs = []
            var i;
            for (i in favs) {
                var favId = favs[i];
                favObjs.push(AV.Object.createWithoutData('Requirement', favId));
            }
            AV.Object.fetchAll(favObjs).then((fetchedObjects) => {
                console.log(fetchedObjects.map(getDataForRender))
                this.setData({
                    requirementList: fetchedObjects.map(getDataForRender)
                })
            })
            wx.hideLoading();
        }
    },
    showDetailPage: function(e) {
        var req_objId = e.currentTarget.dataset.req_objid; // need to be all lowercase; i.e. can't be dataset.req_objId
        console.log(req_objId)
        wx.navigateTo({
            url: '/pages/logs/logs?req_objId=' + JSON.stringify(req_objId)
        })
    }
})