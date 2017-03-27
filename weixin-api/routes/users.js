var express = require('express')
var router = express.Router()
var api = require('../lib/user-api')
var jwt = require('jsonwebtoken')

router.get('/login_test', function (req, res, next) {
  res.json({'status': -1, 'msg': 'Password Error'})
})

router.post('/login', function (req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password
  }

  api.findOne(user)
    .then(result => {
      // 创建token
      console.log(user)
      var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: user
      }, 'secret')
      console.log(token)
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      })
    })
})
router.post('/sign-up', function (req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }

  console.log(req.session.id)
  console.log(req.sessionID)
  api.save(user)
    .then(result => {
      res.json(result)
    })
})
router.get('/user-list', function (req, res, next) {
  var query = {}
  var options = {}

  if (req.query.keyword) {
    query['username'] = new RegExp(req.query.keyword)// 模糊查询参数
  }

  options.limit = parseInt(req.query.limit)
  options.skip = parseInt(req.query.limit) * (parseInt(req.query.page) - 1)
  console.log(req.query)

  // 返回所有用户
  // api.find({})
  //   .then(result => {
  //     res.json(result)
  //   })
  // // 返回只包含一个键值name、age的所有记录
  // api.find({}, {name: 1, age: 1, _id: 0})
  //   .then(result => {
  //     console.log(result)
  //     res.json(result)
  //   })
  // // 返回所有age大于18的数据
  // api.find({'age': {'$gt': 18}})
  //   .then(result => {
  //     console.log(result)
  //   })
  // 返回20条数据
  var resObj = {
    userList: [],
    total: 0
  }
  api.find(query, null, options)
    .then(result => {
      console.log(result)
      resObj.userList = result
      api.count(query)
        .then(count => {
          console.log(count)
          resObj.total = count
          res.json(resObj)
        })
    })
  // // 查询所有数据，并按照age降序顺序返回数据
  // api.find({}, null, {sort: {age: -1}}) // 1是升序，-1是降序
  //   .then(result => {
  //     console.log(result)
  //   })
})

module.exports = router
