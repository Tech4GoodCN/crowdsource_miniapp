// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    TabCur: 0,
    demand_title: "VIVA生命画像馆——周边产品设计",
    tag1:"教育升级",
    tag2:"文化保育",
    imgurl:"/image/diary.png",
    ngo_name:"益科技",
    location:"上海/线下"
  },
  // 事件处理函数
  
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  detail(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  onShareAppMessage: function () {
  },
})
