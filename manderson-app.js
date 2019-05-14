/*****************
* 应用程序启动（入口）文件
* **************/
var express=require('express');
//加载模板处理模块
var swig=require('swig');
var mongoose =require('mongoose');
//加载body-parser,用来处理post提交过来的数据
var bodyParser=require('body-parser');
var Cookies=require('cookies');

//创建app应用 =>NodeJs Http.creatServer()
var manderson=express();
var User = require('./mongoDB/users');

manderson.engine('html',swig.renderFile);
manderson.set('views','./views');
manderson.set('view engine','html');

swig.setDefaults({cache:false});
//bodyParser setting
manderson.use(bodyParser.urlencoded({extended:true}));
//setting Cookies
manderson.use(function(req,res,next){
  req.cookies = new Cookies(req,res);
  req.userInfo={};
  if(req.cookies.get('userInfo')){
    try {
      var userInfoString = new Buffer(req.cookies.get('userInfo'),'base64').toString();
      req.userInfo = JSON.parse(userInfoString);

      User.findById(req.userInfo._id).then(function(userInfo){
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
        next();
      });
    } catch (e) {
      next();
    }
  }
  else {
    next();
  }
})
//module classesify
manderson.use('manderson-admin',require('./routers/haosen'));
manderson.use('/api',require('./routers/api'));
manderson.use('/',require('./routers/main'));
//connect
mongoose.connect('mongodb：//localhost：27017/haosen',function(err){
  if(err)
  {
    console.log("mongodb failed");
  }
  else {
    console.log("mongodb connected");
    manderson.listen(8081, (req, res) => {
      console.log("listening...");
    });
  }
});
