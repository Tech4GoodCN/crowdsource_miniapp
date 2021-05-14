// index.js
// 获取应用实例
const app = getApp()
//const { post } = require('superagent');
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
        var page = this;
        wx.checkSession({
            success() {
                // session_key 未过期，并且在本生命周期一直有效
                AV.User.loginWithMiniApp().catch(console.error);
                page.getRequirement(true)
            },
            fail() {
                wx.login() //重新登录
                AV.User.loginWithMiniApp().catch(console.error);
                page.getRequirement(true)
            }
        })
    },
    onShow() {

    },
    getRequirement(shouldLazyLoad) {
        wx.showLoading({
            title: '加载中',
        })
        const query = new AV.Query('Requirement');
        query.include('organization')
        if(shouldLazyLoad== false) {
            query.skip(this.data.requirementList.length).limit(12)
        }
        query.equalTo('requirement_cat' + '.' + 'large', this.data.category[this.data.TabCur])
        query.find().then((requirementLists) => {
            requirementLists.forEach((requirementList) => {
               const orga = requirementList.get('organization');
             });
             if (shouldLazyLoad == true) {
                this.setData({
                    requirementList: requirementLists.map(getDataForRender)
                })
            } else {
                this.setData({
                    requirementList: this.data.requirementList.concat(requirementLists.map(getDataForRender))
                })
            }
        })
        .catch(console.error)
        wx.hideLoading()
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
        })
        this.getRequirement(true)
    },
    onPullDownRefresh: function () {
        this.getRequirement(false)
    },
    showDetailPage: function(e) {
        var req_objId = e.currentTarget.dataset.req_objid; // need to be all lowercase; i.e. can't be dataset.req_objId
        console.log(req_objId)
        wx.navigateTo({
            url: '/pages/reqsDetails/reqsDetails?req_objId=' + JSON.stringify(req_objId)
        })
    }
})