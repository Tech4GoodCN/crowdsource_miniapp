const app = getApp()
const AV = require('../../libs/av-core-min.js');
const util = require('../../utils/util.js');
Page({
  data: {
    TabCur: 0,
    sub: true,
    org_objId:'',
    organization:{}
  },
  onLoad:function(options) {
    console.log(options)
    this.setData({
      org_objId: JSON.parse(options.org_objId)
    })
    this.getOrganizations()
  },
  getOrganizations() {
    const query = new AV.Query('Organization');
    query.get(this.data.org_objId).then((organization) => {
      this.setData({
        organization:organization.toJSON()
      })
    });
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  detail() {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
})
