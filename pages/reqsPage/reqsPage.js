// index.js
// 获取应用实例
const app = getApp()
const AV = require('../../libs/av-core-min.js');
const getDataForRender = requirementList => requirementList.toJSON();

Page({
    data: {
        TabCur: 0,
        requirementList: [],
        category: ['宣传', '教育', '技术', '调研', '设计']
    },
    // 事件处理函数
    onLoad() {
        this.getRequirement()

    },
    getRequirement() {
        wx.showLoading({
            title: '加载中',
        })

        const query = new AV.Query('Requirement');
        query.equalTo('requirement_cat' + '.' + 'large', this.data.category[this.data.TabCur])
        query.find().then((requirementList) => {
            // TODO: get logo from org pointer
                this.setData({
                    requirementList: requirementList.map(getDataForRender)
                })
            })
            .catch(console.error)
        wx.hideLoading()
    },

    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
        })
        this.getRequirement()
    },
    showDetailPage: function(e) {
        var req_objId = e.currentTarget.dataset.req_objid; // need to be all lowercase; i.e. can't be dataset.req_objId
        console.log(req_objId)
        wx.navigateTo({
            url: '/pages/reqsDetails/reqsDetails?req_objId=' + JSON.stringify(req_objId)
        })
    }
})