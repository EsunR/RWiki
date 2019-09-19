const userModel = require('../../database/user_model')

module.exports = {
  testRouter: async (ctx, next) => {
    ctx.body = {
      msg: "ok"
    }
  },
  testUsers: async (ctx, next) => {
    let data = await userModel.find({})
    console.log(data);
    ctx.status = 200;
    ctx.body = {
      msg: "ok",
      data
    }
  },
}