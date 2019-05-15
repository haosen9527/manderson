var mongoose = require('mongoose');
//category
var categorySchema = new mongoose.Schema({
  name:String
});
module.exports = mongoose.model('Category',categorySchema);
