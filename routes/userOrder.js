var express = require('express')
var router = express.Router()
var userOrderApi = require('../lib/user-order-api')
var Promise = require('bluebird')

// 增加
router.post('/add', function (req, res, next) {
  var userId = req.api_user.data._id
  var username = req.api_user.data.username
  var userOrder = {
    userId: userId,
    username: username,
    status: 1,
    orderDetail: req.body.orderDetail,
    createTime: new Date(req.body.createTime)
  }
  // Promise.resolve(api.findOne(user))
  Promise.bind()
    .then(function () {
      return userOrderApi.save(userOrder)
    })
    .then(function (result) {
      res.send({
        success: true,
        message: '增加订单成功',
        data: result
      })
    })
    .catch(function (error) {
      res.send(error)
    })
})

// 更新
router.post('/update', function (req, res, next) {
  var conditions = {
    _id: req.body._id
  }

  var status = req.body.status
  var sendTime = new Date(req.body.sendTime)
  var updateUserOrder = {
    status: status,
    sendTime: sendTime
  }
  // Promise.resolve(api.findOne(user))
  Promise.bind()
    .then(function () {
      return userOrderApi.update(conditions, updateUserOrder)
    })
    .then(function (result) {
      res.send({
        success: true,
        message: '更新订单成功',
        data: result
      })
    })
    .catch(function (error) {
      res.send(error)
    })
})

// 查找单个
router.get('/:id', function (req, res, next) {
  var _id = req.params.id
  var query = {
    _id: _id
  }
  Promise.bind()
    .then(function () {
      return userOrderApi.findOne(query)
    })
    .then(function (result) {
      res.send({
        success: true,
        message: '查找订单成功',
        data: result
      })
    })
    .catch(function (error) {
      res.send(error)
    })
})

router.get('/list', function (req, res, next) {
  var query = {}
  var options = {}

  var userId = req.api_user.data._id
  if (req.query.keyword) {
    query.keyword = keyword
  }

  if (req.query.limit) {
    options.limit = parseInt(req.query.limit)
  }
  if (req.query.page) {
    options.skip = parseInt(req.query.limit) * (parseInt(req.query.page) - 1)
  }

  Promise
    .all([userOrderApi.find(query, null, options), userOrderApi.count(query)])
    .then(function (rep) {
      var resObj = {
        data: rep[0],
        total: rep[1],
        success: true
      }
      res.send(200, resObj)
        // res.json(resObj)
    })
    .catch(function (e) {
      res.json(e)
    })
})

module.exports = router
