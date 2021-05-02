// const AV = require('../../libs/leancloud-adapters-weapp.js');

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
    endTime:'',
    req_objId:'',
  },
  onLoad:function(options) {
    console.log(options)
    this.setData({
      req_objId: JSON.parse(options.req_objId)
    })
    this.getRequirement();
    this.saved();
    this.applied();
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
  
  // if saved
  saved: function () {
    const currentUser = AV.User.current();
    const query = new AV.Query('_User');
    const require = AV.Object.createWithoutData('Requirement', this.data.req_objId);
    query.equalTo('objectId', currentUser.objectId);
    query.find().then((user) => {
      user.containedIn('favorites', require).then(()=> {
        this.setData({
          isActive : false
        })
      })
    });
  },

  // if applied
  applied: function () {
    const currentUser = AV.User.current();
    const query = new AV.Query('_User');
    const require = AV.Object.createWithoutData('Requirement', this.data.req_objId);
    query.equalTo('objectId', currentUser.objectId);
    query.find().then((user) => {
      user.containedIn('submissions', require).then(()=> {
        this.setData({
          sub : false,
        })
        console.log("Already applied");
      })
    });
  },

  // 收藏
  star:function(){
    // if (condition) {
    //   如果没登陆，弹出登陆框
    // } else {
      const currentUser = AV.User.current();
      const query = new AV.Query('_User');
      this.setData({
        isActive : !this.data.isActive
      });
      if (this.data.isActive == false) {
        // 成功保存之后，执行其他逻辑.
        query.equalTo('objectId', currentUser.objectId);
        query.find().then((user) => {
          user.add('favorites', require);
        }).then(()=> {
          console.log('Successfully saved');
        }, function(error) {
          // 异常处理
          console.error('Failed to create new object, with error message: ' + error.message);
        })
      } else {
        query.equalTo('objectId', currentUser.objectId);
        query.find().then((user) => {
          user.remove('favorites', require);
        }).then(()=> {
          console.log('Successfully removed');
        }, function(error) {
          // 异常处理
          console.error('Failed to create new object, with error message: ' + error.message);
        })
      }
      
    // }
  },

  submit:function(){
    //if (condition) {
      //如果没登陆，弹出登陆框
    //} else {
      //sub的数据后期要改成上传简历后返回的值，这里是为了测试button是否可以成功变灰
      var sub;
      this.setData({
        sub : !this.data.sub
      }),
      wx.navigateTo({
        url: '/pages/logs/submit/submit',
      })
    //}
  }

})
