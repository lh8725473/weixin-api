var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var responseTime = require('response-time')
var jwt = require('jsonwebtoken')
var Promise = require('bluebird')

var index = require('./routes/index')
var users = require('./routes/users')
var userAddress = require('./routes/userAddress')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(responseTime())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/x-www-form-urlencoded')
  next()
})

app.use(function (req, res, next) {
  if (req.originalUrl === '/users/login') {
    next()
    return
  }
  // console.log('检查post的信息或者url查询参数或者头信息')
  // 检查post的信息或者url查询参数或者头信息
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  // 解析 token
  if (token) {
    // 确认token
    jwt.verify(token, 'secret', function (err, decoded) {
      if (err) {
        return res.send({
          status: 403,
          success: false,
          message: 'token信息错误.'
        })
      } else {
        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
        req.api_user = decoded
        next()
      }
    })
  } else {
    // 如果没有token，则返回错误
    return res.send({
      status: 403,
      success: false,
      message: '没有提供token'
    })
  }
})

app.use('/', index)
app.use('/users', users)
app.use('/user-address', userAddress)

app.get('/file/:directoryPath/:name', function (req, res, next) {
  var directoryPath = ''
  if (req.params.directoryPath) {
    console.log(req.params)
    directoryPath = req.params.directoryPath + '/'
  }

  var options = {
    root: __dirname + '/public/',
    dotfiles: 'allow',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = directoryPath + req.params.name
  console.log(fileName)
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    } else {
      console.log('Sent:', fileName)
    }
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app