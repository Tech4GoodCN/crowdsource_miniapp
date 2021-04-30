const AV = require('../../libs/av-core-min.js');
const util = require('../../utils/util.js');
Page({
  data: {
    requirement:{},
    startTime: '',
    endTime: '',
    isActive: true,
    sub:true,
    req_objId: "_",
    demand_title: "生命生命画像馆生名周边产品设计",
    location:"上海/线下",
    time:"3月16日-3月20日 每天4小时",
    tag1:"教育升级",
    tag2:"文化保育",
    ngo_name:"益科技",
    tag3:"环境保护",
    tag4:"性别平等",
    position:"UX Design, Web Development",
    number_position:"10",
    people:"各地自闭症儿童治疗中心",
    background:"Viva la Vida 是一个全球艺术项目，鼓励全球的人们画一幅画来回答“你的生命是什么”。VIVA源自于在墨西哥的一次街头实验，后来演化成一个全球开源艺术项目，希望人们以艺术为介质去思考和探索生命的意义。收集上来的画作被称为「生命画像」，是个体对生命对表达，也让不同个体间产生奇妙的连接。自18年创立以来，VIVA在世界各地收集了成千上万幅生命画像。在肯尼亚的贫民窟里、在罗马尼亚的癌症儿童医院里、在北京的自闭症儿童治疗中心里，VIVA邀请人们拿起画笔，画下自己生命之中的精彩与脆弱。",
    responsibility:"对【自闭症关爱平台】相关组织进行二手调查或走访，建立所研究行业的公司和协会的通讯录，并进行采访或讨论进而形成成熟见解和初步数据。过程中与公益组织项目经理保持密切沟通，可能需要进行其他延伸内容的研究。",
    requirement1:"- 能够以专业态度跟相关组织/公司进行电话访问或探讨；可在短时间内建立行业知识",
    requirement2:"- 具备较强的分析和报告能力",
    requirement3:"- 有过市场研究相关经验者优先"
  },

  onLoad:function(options) {
    console.log(options)
    this.setData({
      req_objId: JSON.parse(options.req_objId)
    })
    this.getRequirement()
  },
  getRequirement() {
    const query = new AV.Query('Requirement');
    query.get(this.data.req_objId).then((requirement) => {
      this.setData({
        requirement:requirement.toJSON()
      })
    });
    const stime=util.formatTime(this.data.requirement.work_length.startTime);
    const etime=util.formatTime(this.data.requirement.work_length.endTime);
    this.setData({
      startTime:stime,
      endTime:eTime
    })
  },
  star:function(){
    //if (condition) {
      //如果没登陆，弹出登陆框
    //} else {
      var isActive;
      this.setData({
        isActive : ! this.data.isActive
      })
    //}
  },

  submit:function(){
    //if (condition) {
      //如果没登陆，弹出登陆框
    //} else {
      //sub的数据后期要改成上传简历后返回的值，这里是为了测试button是否可以成功变灰
      var sub;
      this.setData({
      sub : false
      }),
      wx.navigateTo({
        url: '/pages/logs/submit/submit',
      })
    //}
  }

})
