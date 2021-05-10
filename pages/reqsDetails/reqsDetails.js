// const AV = require('../../libs/leancloud-adapters-weapp.js');

const AV = require('../../libs/av-core-min.js');
const util = require('../../utils/util.js');

Page({
    data: {
        requirement: {},
        didFavorite: false,
        didSubmitForThisReq: false,
        startTime: '',
        endTime: '',
        req_objId: '',
        intro:'123'
    },
    onLoad: function(options) {
        console.log(options)
        this.setData({
            req_objId: JSON.parse(options.req_objId)
        })
        this.getRequirement();
        this.updateFavoriteStatus();
    },
    onShow: function() {
        this.updateApplyStatus();
    },
    //获取requirement
    getRequirement() {
        const query = new AV.Query('Requirement');
        query.include('organization')
        query.get(this.data.req_objId).then((requirement) => {
            const orga = requirement.get('organization'); //获取organization  
            this.setData({
                requirement: requirement.toJSON()
            })
            //转换时间
            const stime = util.formatTime(this.data.requirement.work_length.startTime);
            const etime = util.formatTime(this.data.requirement.work_length.endTime);
            this.setData({
                startTime: stime,
                endTime: eTime
            })
        });

    },

    updateFavoriteStatus: function() {
        const currentUser = AV.User.current();
        const favs = currentUser.get('favorites');

        console.log("curr user favs is: " + favs);

        this.setData({
            didFavorite: favs != null && favs.includes(this.data.req_objId)
        })
    },

    // if applied
    updateApplyStatus: function() {
        const currentUser = AV.User.current();
        const submissions = currentUser.get('submissions');

        console.log("curr user submissions is: " + submissions);

        this.setData({
            didSubmitForThisReq: submissions != null && submissions.includes(this.data.req_objId)
        })
    },

    // 收藏
    star: function() {
        if (!AV.User.current()) {
            wx.showToast({
                title: '请登陆',
                icon: 'none',
                duration: 2000 //持续的时间
            })
            return;
        }

        const currentUser = AV.User.current();

        // Append/remove req from user's favorites
        if (this.data.didFavorite == false) {
            currentUser.add('favorites', this.data.req_objId);
        } else {
            currentUser.remove('favorites', this.data.req_objId);
        }

        // Update star status
        this.setData({
            didFavorite: !this.data.didFavorite
        });

        // Try to save to leancloud.
        currentUser.save().then((todo) => {
            console.log("收藏保存成功");
        }, (error) => {
            wx.showToast({
                title: '收藏失败',
                icon: 'none',
                duration: 2000 //持续的时间
            })
        });
    },

    submit: function() {
        if (this.data.didSubmitForThisReq) {
            wx.showToast({
                title: '请勿重复投递',
                icon: 'none',
                duration: 2000 //持续的时间
            })
            return;
        }
        wx.navigateTo({
            url: '/pages/reqsDetails/submit/submit?objectID=' + this.data.req_objId,
        })
    }

})