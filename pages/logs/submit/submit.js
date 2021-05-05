// const { constants } = require('buffer');
// pages/logs/submit/submit.js
const AV = require('../../../libs/av-core-min.js');

Page({
    data: {
        objId: '',
    },

    onLoad: function(options) {
        this.setData({
            objId: options.objectID
        })
    },

    uploadCV: function() {
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const objId = currentPage.data.objId;

        wx.chooseMessageFile({
            type: 'all',
            count: 1,
            success(res) {
                const tempFile = res.tempFiles[0];
                const currentUser = AV.User.current();
                const Submission = AV.Object.extend('Submission');
                const submission = new Submission();

                submission.set('submitter', currentUser);
                const requirement = AV.Object.createWithoutData('Requirement', objId);
                submission.set('requirement', requirement);
                
                const avFile = new AV.File(tempFile['name'], {
                        blob: {
                            uri: tempFile['path'],
                        },
                    })
                submission.set('resume', avFile);
                submission.set('status', 420)
                submission.save().then(function(res) {
                    const currentUser = AV.User.current();
                    currentUser.add('submissions', objId);
                    currentUser.save().then((todo) => {
                        console.log('Successfully submitted');
                        wx.showToast({
                            title: '上传成功！',
                            icon: 'success',
                            duration: 2000
                        })
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1,
                            })
                        }, 2000); 
                    }, (error) => {
                        wx.showToast({
                            title: '上传失败，请重新上传',
                            icon: 'none',
                            duration: 2000 //持续的时间
                        })
                    });          

                }, function(error){
                    console.error('Failed to create new object, with error message: ' + error.message);
                });
            },
            fail() {
                console.log('choose file error')
            }
        })
    }
})