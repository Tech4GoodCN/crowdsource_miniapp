const app = getApp()
const AV = require('../../libs/av-core-min.js');
const getDataForRender = organizations => organizations.toJSON();
Page({
  data: {
    isActive: true,
    sub: true,
    organizations:[]
  },
  // 事件处理函数
  onLoad() {
    this.getOrganizations();
  },
  getOrganizations() {
    wx.showLoading({
      title: '加载中',
    })
    const query = new AV.Query('Organization');
    query.skip(this.data.organizations.length).limit(12);
    query.find().then((organizations)=>{
      organizations = organizations.map(getDataForRender)
      this.setData({
        organizations: this.data.organizations.concat(organizations)
      })
    })
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  orgDetail(e) {
    const org_objId = e.currentTarget.dataset.org_objid; 
    // console.log(org_objId)
    wx.navigateTo({
      url: '/pages/org-detail/org-detail?org_objId=' + JSON.stringify(org_objId),
    })
  },
  onPullDownRefresh: function () {
    this.getOrganizations()
  },
  onShareAppMessage: function () {},
})
