Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad() {
        // 查看是否授权
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

        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }

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
    getUserProfile(e) {
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
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})

// 获得当前登录用户
const user = AV.User.current();
// 调用小程序 API，得到用户信息
wx.getUserInfo({
    success: ({ userInfo }) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            this.globalData.user = user;
        }).catch(console.error);
    }
});