// pages/logs/submit/submit.js
// const AV = require('../../../libs/leancloud-adapters-weapp.js');
const AV = require('../../../libs/av-core-min.js');

Page({
  uploadCV: function () {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];  //上一个页面
    const req_objId = prevPage.req_objId;

    wx.chooseMessageFile({
      type : 'file',
      success (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://upload.qiniup.com', 
          success (res){
            const currentUser = AV.User.current();
            const Submission = AV.Object.extend('Submission');
            const submission = new Submission();
            const avFile = new AV.File('resume.pdf', {                       
              blob: {
                uri: tempFilePaths[0],
              },
            })
            
            submission.set('submitter', currentUser);
            const requirement = AV.Object.createWithoutData('Requirement', req_objId);
            submission.set('requirement', requirement);
            submission.set('resume', avFile);

            submission.save().then(function() {
              // 成功保存之后，执行其他逻辑.
              console.log('Successfully submitted');
              wx.showToast({
                title: '上传成功！',
                icon: 'success',
                duration: 2000
              })
            }, function(error) {
              // 异常处理
              console.error('Failed to create new object, with error message: ' + error.message);
            });
          }
        })
      }
    })
  }
})