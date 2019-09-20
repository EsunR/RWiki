const TokenModel = require('../../database/TokenModel')
const jwt = require('../utils/jwt')
const config = require('../../config')

module.exports = {
  /**
   * 检查Token是否即将过期，过期就进行更新
   */
  updateToken: async (ctx, next) => {
    let tid = ctx.state.user.tid
    let uid = ctx.state.user.uid
    let time = config.jwtExpiresTime - (new Date().valueOf() - tid)
    if (time < 24 * 3600 * 1000) {
      // 如果 Token 剩余时间仅剩 24 小时就更新 Token
      let tokenDoc = await TokenModel.findOne({ uid })
      let tidArr = tokenDoc.tidArr
      let newTid = new Date().valueOf()
      tidArr.splice(tidArr.indexOf(tid), 1, newTid)
      tokenDoc.set({ tidArr })
      tokenDoc.save()
      ctx.body = {
        msg: "ok",
        data: {
          updated: true,
          loginToken: jwt.getToken({ uid, tid: newTid })
        }
      }
    } else {
      ctx.body = {
        msg: "ok",
        data: {
          updated: false
        }
      }
    }
  }




}