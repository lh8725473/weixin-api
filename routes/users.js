var express = require('express')
var router = express.Router()
var api = require('../lib/user-api')
var jwt = require('jsonwebtoken')
var Promise = require('bluebird')

router.get('/login_test', function (req, res, next) {
  res.json({status: -1, msg: 'Password Error'})
})

router.post('/login', function (req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password
  }
  // Promise.resolve(api.findOne(user))
  Promise.bind()
    .then(function () {
      return api.findOne(user)
    })
    .then(function (result) {
      console.log(result._id)
      var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: result
      }, 'secret')
      res.send({
        success: true,
        message: '登录成功',
        token: token
      })
    })
    .catch(function (error) {
      console.log(error)
      res.send(error)
    })
  // api.findOne(user)
  //   .then(function (result) {
  //     var token = jwt.sign({
  //       exp: Math.floor(Date.now() / 1000) + (60 * 60),
  //       data: user
  //     }, 'secret')
  //     res.json({
  //       success: true,
  //       message: 'Enjoy your token!',
  //       token: token
  //     })
  //   })
  //   .catch(function (e) {
  //     console.log('-------')
  //     console.log(e)
  //     res.json(e)
  //     console.log('-------' + e)
  //   })
  // api.findOne(user)
  //   .then(result => {
  //     // 创建token
  //     var token = jwt.sign({
  //       exp: Math.floor(Date.now() / 1000) + (60 * 60),
  //       data: user
  //     }, 'secret')
  //     res.json({
  //       success: true,
  //       message: 'Enjoy your token!',
  //       token: token
  //     })
  //   })
})
router.post('/sign-up', function (req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }

  api.save(user)
    .then(result => {
      res.json(result)
    })
})
router.get('/user-list', function (req, res, next) {
  console.log(req.api_user.data)
  var query = {}
  var options = {}

  if (req.query.keyword) {
    query.username = new RegExp(req.query.keyword)// 模糊查询参数
  }

  if(req.query.limit) {
    options.limit = parseInt(req.query.limit)
  }
  if(req.query.page) {
    options.skip = parseInt(req.query.limit) * (parseInt(req.query.page) - 1)
  }

  // 返回20条数据
  Promise
    .all([api.find(query, null, options), api.count(query)])
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
      console.log('-------' + e)
    })
  // // 查询所有数据，并按照age降序顺序返回数据
  // api.find({}, null, {sort: {age: -1}}) // 1是升序，-1是降序
  //   .then(result => {
  //     console.log(result)
  //   })
})

module.exports = router
