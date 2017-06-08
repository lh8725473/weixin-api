var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var db = mongoose.connect('mongodb://localhost:27017/weixin-api')
module.exports = db
