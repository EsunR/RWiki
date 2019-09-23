const userModel = require('../../database/UserModel')

module.exports = {
  testRouter: async (ctx, next) => {
    ctx.body = {
      msg: "ok"
    }
  },
  testUsers: async (ctx, next) => {
    await userModel.find({}).then(doc => {
      ctx.status = 200;
      ctx.body = {
        msg: "ok",
        data: doc
      }
    })
  },
}