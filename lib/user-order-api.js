var UserOrderModel = require('../models/userOrder')
module.exports = {
  /**
   * 添加数据
   * @param  {[type]} data 需要保存的数据对象
   */
  save (data) {
    return new Promise((resolve, reject) => {
      // model.create(保存的对象,callback)
      console.log(data)
      UserOrderModel.create(data, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  },
  find (data = {}, fields = null, options = {}) {
    return new Promise((resolve, reject) => {
      // model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
      UserOrderModel.find(data, fields, options, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  },
  findOne (data) {
    return new Promise((resolve, reject) => {
      // model.findOne(需要查找的对象,callback)
      UserOrderModel.findOne(data, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          if (doc) {
            resolve(doc)
          } else {
            reject({
              success: false,
              message: '没有此订单'
            })
          }
        }
      })
    })
  },
  findById (data) {
    return new Promise((resolve, reject) => {
      // model.findById(需要查找的id对象 ,callback)
      UserOrderModel.findById(data, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  },
  update (conditions, update) {
    return new Promise((resolve, reject) => {
      // model.update(查询条件,更新对象,callback)
      UserOrderModel.update(conditions, update, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  },
  remove (conditions) {
    return new Promise((resolve, reject) => {
      // model.update(查询条件,callback)
      UserOrderModel.remove(conditions, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  },
  count (conditions) {
    return new Promise((resolve, reject) => {
      // model.update(查询条件,callback)
      UserOrderModel.count(conditions, (error, doc) => {
        if (error) {
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  }
}
