var express = require('express');
var router = express.Router();
var Category=require('../mongoDB/category');
var Content=require('../mongoDB/content');
var data;

/*
* 处理全局数据
* */
router.get('/',function(req,res,next){
        console.log(req.route);
        res.render('page/manderson-index');
});
module.exports = router;
