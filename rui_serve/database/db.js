const config = require('../config')
const mongoose = require('mongoose')

class Db {
  constructor() {
    this.mongoose = mongoose
    this.client = null // 存放连接后的数据库实体
    this.userModel = null
    this.connect()
  }

  /**
   * 连接数据库
   */
  connect() {
    return new Promise((reslove, reject) => {
      if (!this.client) {
        this.db = mongoose.connect(config.dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }).then((client) => {
          this.client = client
          console.log(`mongodb已连接: ${config.dbUrl}`);
          reslove(client)
        }).catch(err => {
          reject(err)
        })
      } else {
        console.log("已连接mongodb，请勿重复连接");
        reslove()
      }
    })
  }
}

module.exports = new Db()