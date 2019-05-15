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
module.exports = mongoose.model('User',userSchema);
