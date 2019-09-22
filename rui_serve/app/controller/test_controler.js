const userModel = require('../../database/UserModel')

module.exports = {
  testRouter: async (ctx, next) => {
    ctx.body = {
      msg: "ok"
    }
  },
  testUsers: async (ctx, next) => {
    let data = await userModel.find({})
    ctx.status = 200;
    ctx.body = {
      msg: "ok",
      data
    }
  },
}