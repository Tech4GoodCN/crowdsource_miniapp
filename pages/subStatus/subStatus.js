// pages/subStatus/subStatus.js
const app = getApp()
const AV = require('../../libs/av-core-min.js');
const getDataForRender = submissions => submissions.toJSON();
const getDataForRend = requirements => requirements.toJSON();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasSubmission: false,
        subStatus: 0,
        submissions: [],
        names: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        //this.hasSubmissions();
        // console.log("running getSubmissions")
        this.getSubmissions();
    },

    hasSubmissions() {
        // console.log("Submissions found")
        this.setData({
            hasSubmission: true
        })
    },

    getSubmissions() {
        // console.log("DEBUG: RUNNING GETSUBMISSIONS...");
        wx.showLoading({
            title: '加载中',
        })
        const query = new AV.Query('Submission');
        query.equalTo('submitter', AV.User.current());
        query.include('requirement');
        // console.log("DEBUG: RUNNING QUERY...");
        //query.skip(this.data.submissions.length).limit(12);
        query.find().then((submits) => {
            // console.log("SUBMISSIONS: " + submits);
            //submits = submits.get(submits.objectId);
            submits = submits.map(getDataForRender);
            this.setData({
                submissions: this.data.submissions.concat(submits)
            });

            // console.log("setting data retrieved");
            // console.log("SUBMISSIONS LENGTH: " + this.data.submissions.length);
            if (this.data.submissions.length > 0) {
                this.hasSubmissions();
            }
        })
        wx.hideLoading()
    },

    /*subDetails(e) {
      const sub_objId = e.currentTarget.dataset.org_objid; 
      console.log(org_objId)
      wx.navigateTo({
        url: '/pages/org-detail/org-detail?org_objId=' + JSON.stringify(org_objId),
      })
    },*/
    onPullDownRefresh: function() {
        this.getSubmissions()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // console.log("SUBMISSIONS LENGTH: " + this.data.submissions.length);
        if (this.data.submissions.length > 0) {
            // console.log("submissions found");
            this.hasSubmissions();
        }
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
    onShareAppMessage: function() {

    }
})