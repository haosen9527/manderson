var express = require('express');
var bodyParser=require('body-parser');
var Category=require('../mongoDB/category');
var Content=require('../mongoDB/content');
const router = express.Router();
router.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
router.use(bodyParser.urlencoded({ extended: false }));
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
router.get('/blogPage',function(req,res,next){
  res.render('page/blog');
})

router.post('/login', function(req, res){
    console.log('checkbox :',req.body.checkbox==1);
    console.log('Email (from visible form field): ' + req.body.email);
    console.log('password (from visible form field): ' + req.body.password);
    res.redirect(303,'/blogPage');
});

module.exports = router;
