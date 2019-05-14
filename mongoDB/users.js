var mongoose = require('mongoose');

//user
var userSchema = new mongoose.Schema({
  username:String,
  password:String,
  isAdmin:{
    type:Boolean,
    default:false
  },
  sex:{
    type:String,
    default:"未设置"
  }
});
var userModel = mongoose.model('User',userSchema);

//category
var categorySchema = new mongoose.Schema({
  name:String
});
var categoryModel = mongoose.model('Category',categorySchema);

//content
var contentSchema = mongoose.Schema({
  category:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Category'
  },
  title:String,
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  addTime :{
    type : Date,
    default : new Date()
  },
  views:{
    type : Number,
    default : 0
  },
  descriotion : {
    type : String,
    default : '输入搜索关键字'
  },
  content : {
    type : String,
    default : ''
  },
  comments:{
    type:Array,
    default:[]
  }
});

module.exports = mongoose.model('Content',contentSchema);
