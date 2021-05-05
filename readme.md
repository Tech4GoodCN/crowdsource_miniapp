# 众包平台开发项目 (Match Station)

## 数据库使用

[Leancloud数据存储入门教程 · JavaScript](https://leancloud.cn/docs/leanstorage-started-js.html)

### 支持的数据类型

String / Number / Boolean / Date / File / Array / Object / GeoPoint/ Pointer / Any

TIPS: \*是必填选项，没有\*的输入输出的值可能为None

### ***Table Name: Organization***

|name|location|intro|logo|contact_phone|contact_email|contact_name|achievements|website_or_id|goals|service_fields|photos|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
String|Object<province: String, city: String>|String|File|String|String|String|String|String|String|Array< String >| Array< File >|
|*组织名称|*所在城市+服务地区|*组织简介|*Logo|*联系电话|*联系邮箱|*联系人姓名|影响力（分点答,列举成就)|官网链接/公众号名称|公益目标/组织愿景|服务领域|以往活动照片|

[公益组织首次注册表单](https://jinshuju.net/f/FmZVco)

### ***Table Name: Requirement***

|organization_name|organization|requirement_cat|people_covered|project_name|project_intro|project_fields|task_intro|signup_reqs|work_method|location|w​ork_length|work_frequency|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|String|Pointer< Organization >|Object< large: String, small: String>|String|Object<isDaily: Boolean, name: String >|Object<isDaily: Boolean, intro: String>|Array< String >|String|String|Object <online:Boolean, offline:Boolean, both:Boolean>|Object<province: String, city: String>|Object<isDaily: Boolean, startTime: Date, endTime: Date>|Object<daysAWeek: Number, hoursADay: Number>|
|*组织名称（最好多选）|*组织指针(不是公益组织填写的，我们通过代码找到Organization对象后设置)|**需求类别*|*服务人群|*项目名称（日常的话不需项目名称）|*项目介绍（日常的话不需项目介绍）|*项目领域|*任务描述|*报名要求|*线上还是线下|工作城市|*工作周期|工作时长|

*需求类别*

|需求大类|需求小类|
|:-:|:-:|
|技术|前端开发 后端开发 其他技术工具|
|设计|活动周边物件设计 平面美术设计|
|宣传|翻译 公众号运营/宣传文案撰写 宣传方案策划|
|调研|市场调研 产品需求调研|
|教育|线上辅导 线下辅导|

[公益组织需求表单](https://jinshuju.net/f/osnDG7)

### ***Table Name: Submission***

|submitter|requirement|status|resume|
|:-:|:-:|:-:|:-:|
|Pointer< User >|Pointer< Requirement >|*Status Code*|File|

*Status Code*
- 0 = 已终止
- 1 = 已录用
- 2 = 已完成任务
- 420 = 已投递（不暴露给公益组织）

<!-- 简历邮件发过去，B端反馈流程：每封投递一个邮件机器人？
我们的机器人发的邮件带：投递人信息，投递objectID
回复需要按照格式回复，然后我们这儿解析后update投递的进度【填0123】 -->

### Table Name: User

|submissions|favorites|
|:-:|:-:|
|Array<Pointer< Submission >>|Array<Pointer< Requirement >>|
