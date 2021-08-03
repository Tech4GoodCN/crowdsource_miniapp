const app = getApp()
const AV = require('../../libs/av-core-min.js');
const util = require('../../utils/util.js');
const getDataForRender = requirementList => requirementList.toJSON();

Page({
  requirementList:[],
  data: {
    TabCur: 0,
    org_objId:'',
    organization:{},
    requirementList:[],
  },
  onLoad:function(options) {
    // console.log(options)
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
  getRequirement() {
    wx.showLoading({
      title: '加载中',
    })
    const query = new AV.Query('Requirement');
    query.equalTo('organization_name', this.data.organization.name);
    query.find().then(requirementList => this.setData({
      requirementList: requirementList.map(getDataForRender)
    }))
    .catch(console.error);
    wx.hideLoading();
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
    this.getRequirement()
  },
  showDetailPage: function(e){
    var req_objId = e.currentTarget.dataset.req_objid; // need to be all lowercase; i.e. can't be dataset.req_objId
    // console.log(req_objId)
    wx.navigateTo({
      url: '/pages/reqsDetails/reqsDetails?req_objId=' + JSON.stringify(req_objId)
      // url: '/pages/reqsDetails/reqsDetails?req_objId=' + req_objId
    })
  }
  
})
