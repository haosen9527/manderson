var express = require('express');
var bodyParser = require('body-parser');
var Category = require('../mongoDB/category');
var Content = require('../mongoDB/content');
var User = require('../mongoDB/users')
const router = express.Router();
router.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
router.use(bodyParser.urlencoded({ extended: false }));
//全局响应
var responseData;
router.use(function(req,res,next){
    responseData={
        code:0,
        message:''
    }
    next();
});

/*
* 处理全局数据
* */
//home
router.get('/',function(req,res,next){
        //console.log(req);
        res.render('page/manderson-index');
});
//Login
router.get('/login',function(req,res,next){
  res.render('page/login');
});
//register
router.get('/register',function(req,res,next){
  res.render('page/register');
});
router.get('/blog',function(req,res,next){
  res.render('page/blog');
});
router.get('/404',function(req,res,next){
  res.render('page/admin-404');
});

router.post('/login', function(req, res){
    //console.log('checkbox :',req.body.checkbox==1);
    var username = req.body.email;
    var password =  req.body.password;
    if(req.body.email == '' || req.body.password == '')
    {
      responseData.code = 1;
      responseData.message = "please input username or password";
      res.json(responseData);
      return;
    }
    //console.log('login test : ',User.findOne({username:username}));
    User.findOne({
      username:username,
      password:password
    }).then(function(userInfo){
      //console.log('userInfo : ',userInfo);
      if(!userInfo){
        responseData.code = 2;
        responseData.message = 'username or password error!';
        // res.json(responseData);
        res.redirect('/404');
        return;
      }
      responseData.message = 'online';
      //跳转
      res.redirect(303,'/blog');
      responseData.userInfo ={
        _id:userInfo._id,
        username:userInfo.username
      }
      var userInfoBase64 = new Buffer(
        JSON.stringify({
          _id:userInfo.id,
          username:userInfo.username
        })
      ).toString('base64')
      req.cookies.set('userInfo',userInfoBase64);
      res.json(responseData);
      return;
    });
});
//register
router.post('/register',function(req,res,next){
    //console.log(req.body);
    var username=req.body.email;
    var password=req.body.password;
    var repassword=req.body.repassword;
    var sex=req.body.sex;
    //用户名是否为空
    if(username==''){
        responseData.code=1;
        responseData.message="用户名为空";
        res.json(responseData);
        return;
    }
    //密码是否为空
    if(password==''){
        responseData.code=2;
        responseData.message="密码为空";
        res.json(responseData);
        return;
    }
    //密码是否为空
    if(repassword==''){
        responseData.code=2;
        responseData.message="密码为空2";
        res.json(responseData);
        return;
    }
    //密码是否一致
    if(repassword!=password){
        responseData.code=3;
        responseData.message="密码输入不一致";
        res.json(responseData);
        return;
    }

  //  console.log('log : ',User.findOne({username:username}));

    //用户名是否注册
    User.findOne({
        username:username
    }).then(function(userInfo){
        //console.log("find"+userInfo);
        if(userInfo){
            responseData.code = 4;
            responseData.message="用户已注册";
            res.json(responseData);
            return;
        }
        //保存用户注册信息
        var user =new User({
            username:username,
            password:password,
            sex:sex
        });
        return user.save(function(err,doc){
          if(err)
          {
            console.log("error"+err);
          }
          else {
            console.log('doc:'+doc);
          }
        });
    }).then(function(newUserInfo){
        //console.log(newUserInfo);
        responseData.message="注册成功";
        res.json(responseData);
    });

});

module.exports = router;
