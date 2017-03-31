var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost:27017/weixin-api')
module.exports = db
