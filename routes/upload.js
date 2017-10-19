var express = require('express')
var router = express.Router()
var multer = require('multer')
var CONFIG = require('../config')
var userApi = require('../lib/user-api')

// var storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, req.api_user.data + '-' + Date.now() + file.originalname)
//   }
// })
console.log(CONFIG.USER_LOGO_PATH)
var upload = multer({
  dest: CONFIG.USER_LOGO_PATH
  // storage: storage
})

router.post('/userLogo', upload.single('file'), function (req, res, next) {
  console.log('upload')
  console.log(req.file)
  console.log(req.body)
  console.log(req.api_user)
  console.log(req.api_user.data)
  async function updateUserLogo (user) {
    let result
    try {
      result = await userApi.update({_id: req.api_user.data}, {avatar: req.file.path})
      console.log(result)
    } catch (e) {
      console.error(e.message)
    }
    if (result) {
      return res.send({
        status: 200,
        success: false,
        message: '上传请求成功'
      })
    }
  }
  updateUserLogo()
})

module.exports = router
