const config = require('../config')
const userDb = require('../database/user')

const tokenCheck = function () {
  return async function (ctx, next) {
    if (ctx.state.user) {
      // 如果携带有效 Token 就对 Token 进行检查（由 kow-jwt 检查 Token 有效性）
      // 1. 防止 Token 是一个旧版本 Token
      // 2. 防止多设备的 Token 泛滥，只保留数个有效 Token
      let result = true
      let tid = ctx.state.user.tid
      let uid = ctx.state.user.uid
      let userDoc = await userDb.Model.findById(uid)
      if (userDoc == null) {
        ctx.status = 403
        ctx.body = { msg: "未查到 Token 对应的用户" }
        return
      }
      if (userDoc.tokens.indexOf(tid) !== -1) {
        console.log("Token 检查已通过 √");
        result = true
      } else {
        console.error("tid 不存在 ×")
        result = false
      }

      if (result) {
        await next()
      } else {
        ctx.body = {
          msg: "登录 Token 检查未通过"
        }
      }
    } else {
      // 如果没有携带 Token 就跳过检查
      await next()
    }
  }
}

module.exports = tokenCheck