// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    log:true
  },

  resume_cannot:function(){
    wx.chooseImage({
      count: 1,
      type: ['file'],
      success: function(res) {
        var tempFilePath = res.tempFilePaths[0];
        // 使用本地临时文件的路径构造 AV.File
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        })
          // 上传
          .save()
          // 上传成功
          .then(file => console.log(file.url()))
          // 上传发生异常
          .catch(console.error);
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (condition) {
    //   //判断如果已登陆，log值为true
    // } else {
    //   //判断如果没登陆，log值为false
    // }
    if (wx.getUserProfile) {
      this.setData({
          canIUseGetUserProfile: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.checkSession({
        success() {
            // session_key 未过期，并且在本生命周期一直有效
            AV.User.loginWithMiniApp().then(user => {
                this.globalData.user = user;
            }).catch(console.error);
        },
        fail() {
            wx.login() //重新登录
            AV.User.loginWithMiniApp().then(user => {
                this.globalData.user = user;
            }).catch(console.error);
        }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  getUserProfile: function (e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
        }
    })
  },
  getUserInfo: function (e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
      })
  },
  
  bindGetUserInfo: function(e){
    wx.getSetting({
      success(res) {
          if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                  success: function(res) {
                      console.log(res.userInfo)
                  }
              })
          }
      }
    })
  },


})