// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    log:true
  },

  resume_cannot:function(){
    wx.showToast({
      title: '功能尚在开发中 敬请期待',
      icon: 'none',
      duration: 2000//持续的时间
    })
  },

  myCollection: function () {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (condition) {
      //判断如果已登陆，log值为true
    } else {
      //判断如果没登陆，log值为false
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

  }
})