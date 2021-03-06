/*****************
* 应用程序启动（入口）文件
* **************/
const path = require('path')
var express=require('express');
//加载模板处理模块
var swig=require('swig');
var mongoose =require('mongoose');
//加载body-parser,用来处理post提交过来的数据
var bodyParser=require('body-parser');
var Cookies=require('cookies');
const port = 8080;

//创建app应用 =>NodeJs Http.creatServer()
var manderson=express();
manderson.use('/public',express.static(__dirname+'/public'));
var User = require('./mongoDB/users');

manderson.engine('html',swig.renderFile);
manderson.set('views','./public');
manderson.set('view engine','html');

swig.setDefaults({cache:false});
//bodyParser setting
// manderson.use(bodyParser.urlencoded({extended:true}));
manderson.use(bodyParser());
//setting Cookies
//module classesify
manderson.use('/',require('./routers/haosen'));
manderson.use('/login',require('./routers/haosen'));
//connect
mongoose.connect('mongodb://localhost:27017/haosen',function(err){
  if(err)
  {
    console.log("mongodb failed");
  }
  else {
    console.log("mongodb connected");
    manderson.listen(port, (req, res) => {
      console.log("listening : "+"http://localhost:"+port);
    });
  }
});
