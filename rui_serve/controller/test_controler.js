const userDb = require('../database/user')

module.exports = {
  router: async (ctx, next) => {
    ctx.body = {
      msg: "ok"
    }
  },

  getUsers: async (ctx, next) => {
    await userModel.find({}).then(doc => {
      ctx.status = 200;
      ctx.body = {
        msg: "ok",
        data: doc
      }
    })
  },

  insertUser: async (ctx, next) => {
    try {
      let user = await userDb.createUser("huahua", "123", "user")
      ctx.body = {
        msg: "ok",
        data: user
      }
    } catch {
      ctx.body = {
        msg: "测试用户插入失败"
      }
    }
  },

  generateToken: async (ctx, next) => {
    try {
      let user = await userDb.createUser("pipi", "123", "user")
      let token = await userDb.generateToken(user._id)
      ctx.body = {
        msg: "ok",
        data: token
      }
    } catch (error) {
      ctx.body = { msg: error }
    }
  }

}