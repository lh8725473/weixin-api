var express = require('express')
var router = express.Router()
var userOrderApi = require('../lib/user-order-api')
var Promise = require('bluebird')

router.post('/add', function (req, res, next) {
  var userId = req.api_user.data._id
  var username = req.api_user.data.username
  var userOrder = {
    userId: userId,
    username: username,
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

router.get('/list', function (req, res, next) {
  var query = {}
  var options = {}

  var userId = req.api_user.data._id
  if (req.query.keyword) {
    query.userId = userId
  }

  if(req.query.limit) {
    options.limit = parseInt(req.query.limit)
  }
  if(req.query.page) {
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
