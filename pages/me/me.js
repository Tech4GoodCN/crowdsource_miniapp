// pages/me/me.js
const app = getApp()
const AV = require('../../libs/av-core-min.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        hasUserInfo: false,
        canIUseGetUserProfile: null
    },

    resume_cannot: function() {
        wx.showToast({
            title: '功能尚在开发中 敬请期待',
            icon: 'none',
            duration: 2000 //持续的时间
        })
    },

    myCollection: function() {
        wx.navigateTo({
            url: '../collection/collection',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        } else {
            this.setData({
                canIUseGetUserProfile: false
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.checkSession({
            success() {
                // session_key 未过期，并且在本生命周期一直有效
                AV.User.loginWithMiniApp().catch(console.error);
            },
            fail() {
                wx.login() //重新登录
                AV.User.loginWithMiniApp().catch(console.error);
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},

    getUserProfile: function(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,

                })
            }
        })
    },

    bindGetUserInfo: function(e) {
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
    upload_resume: function(e) {
        wx.chooseImage({
            count: 1,
            type: 'file',
            success: function(res) {
                var tempFilePath = res.tempFilePaths[0];
                // 使用本地临时文件的路径构造 AV.File
                new AV.File('file-name', {
                        blob: {
                            uri: tempFilePath,
                        },
                    })
                    .save()
                    .then(file => console.log(file.url()))
                    .catch(console.error);
            }
        });
    },
})