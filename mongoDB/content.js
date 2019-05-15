var mongoose = require('mongoose');

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
