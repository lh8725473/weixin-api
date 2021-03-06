var mongoose = require('mongoose')
var db = require('../lib/mongo')
// 一个地址模型
var userOrderSchema = new mongoose.Schema({
  userId: {type: String},
  username: {type: String}
  // sendId: {type: String},
  // sendName: {type: String},
  // status: {type: Number},
  // orderDetail: {type: String},
  // createTime: {type: Date, default: Date.now},
  // sendTime: {type: Date, default: Date.now},
  // finishTime: {type: Date, default: Date.now}
})
// 创建Model
var userOrder = db.model('user-order', userOrderSchema, 'user-order')
module.exports = userOrder
