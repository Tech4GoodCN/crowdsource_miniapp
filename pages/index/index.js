// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    TabCur: 0
  },
  // 事件处理函数
  
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
})
