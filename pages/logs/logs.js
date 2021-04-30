const AV = require('../../libs/av-core-min.js');
const util = require('../../utils/util.js');
Page({
  data: {
    requirement:{},
    imgUrl:'',
    intro:'',
    serviceField:[],
    isActive: true,
    sub: true,
    startTime:'',
    endTime:''
  },
  onLoad:function(options) {
    console.log(options)
    this.setData({
      req_objId: JSON.parse(options.req_objId)
    })
    this.getRequirement()
  },
  //获取requirement
  getRequirement() {
    const query = new AV.Query('Requirement');
    query.get(this.data.req_objId).then((requirement) => {
      this.setData({
        requirement:requirement.toJSON()
      })
      this.getOrganization();
      //转换时间
      const stime=util.formatTime(this.data.requirement.work_length.startTime);
      const etime=util.formatTime(this.data.requirement.work_length.endTime);
      this.setData({
        startTime:stime,
        endTime:eTime
      })
    });
  
  },
  //获取organization
  getOrganization() {
    const query = new AV.Query('Organization');
    query.get(this.data.requirement.organization.objectId).then((organization) => {
      organization=organization.toJSON()
      this.setData({
        imgUrl:organization.logo.url,
        intro: organization.intro,
        serviceField: organization.service_fields
      })
    });
  },
  star:function(){
    //if (condition) {
      //如果没登陆，弹出登陆框
    //} else {
      var isActive;
      this.setData({
        isActive : ! this.data.isActive
      })
    //}
  },

  submit:function(){
    //if (condition) {
      //如果没登陆，弹出登陆框
    //} else {
      //sub的数据后期要改成上传简历后返回的值，这里是为了测试button是否可以成功变灰
      var sub;
      this.setData({
      sub : false
      }),
      wx.navigateTo({
        url: '/pages/logs/submit/submit',
      })
    //}
  }

})
