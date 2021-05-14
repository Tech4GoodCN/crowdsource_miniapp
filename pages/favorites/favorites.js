// collections.js
// 获取应用实例
const app = getApp();
const AV = require('../../libs/av-core-min.js');
const getDataForRender = fetchedObjects => fetchedObjects.toJSON();
Page({
    data: {
        requirementList: [],
        organizations:[]
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
        //console.log("favs is: " + favs);
        if (favs != null) {
            var i;
            const query = new AV.Query('Requirement');
            query.include('organization')
            for (i in favs) {
                const favId = favs[i];
                query.get(favId).then((requirementLists) => {
                        const orga = requirementLists.get('organization');
                        this.setData({
                            requirementList: this.data.requirementList.concat(requirementLists.toJSON())
                        })
                    })
                    .catch(console.error)
            }
            wx.hideLoading();
        }
    },
    showDetailPage: function(e) {
        var req_objId = e.currentTarget.dataset.req_objid; // need to be all lowercase; i.e. can't be dataset.req_objId
        console.log(req_objId)
        wx.navigateTo({
            url: '/pages/reqsDetails/reqsDetails?req_objId=' + JSON.stringify(req_objId)
        })
    }
})