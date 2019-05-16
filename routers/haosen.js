var express = require('express');
var Category=require('../mongoDB/category');
var Content=require('../mongoDB/content');
const router = express.Router();
/*
* 处理全局数据
* */
//home
router.get('/',function(req,res,next){
        console.log(req);
        res.render('page/manderson-index');
});
//Login
router.get('/login',function(req,res,next){
  res.render('page/login');
})




module.exports = router;
