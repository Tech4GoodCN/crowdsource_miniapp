// pages/logs/submit/submit.js
const AV = require('../../../libs/leancloud-adapters-weapp.js');

Page({
  uploadCV: function () {
    wx.chooseMessageFile({
      type : 'file',
      success (res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://lc-ndckoyrx.cn-n1.lcfile.com', 
          success (res){
            console.log('success');
            wx.showToast({
              title: '上传成功！',
              icon: 'success',
              duration: 2000
            })
            
            new AV.File('resume.pdf', {                       
              blob: {
                uri: tempFilePaths[0],
              },
            }).save().then(
              file => console.log(file.url())
            ).catch(console.error);

            const Todo = AV.Object.extend('Todo');
            const todo = new Todo();
            todo.set('project', 'project name');
            todo.set('user', openid);
            todo.add('attachments', file);
            todo.save();
          }
        })
      }
    })
  }
})