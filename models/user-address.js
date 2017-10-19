var mongoose = require('mongoose')
var db = require('../lib/mongo')
// 一个地址模型
var UserAddressSchema = new mongoose.Schema({
  userId: {type: String},
  detail: {type: String}
})
// 创建Model
var UserAddressModel = db.model('user-address', UserAddressSchema, 'user-address')
module.exports = UserAddressModel
