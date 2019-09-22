const UserModel = require('../../database/UserModel')
const PasswordModel = require('../../database/PasswordModel')
const TokenModel = require('../../database/TokenModel')
const jwt = require('../utils/jwt')
const config = require('../../config')
const pwdHash = require('../utils/pwdHash')

module.exports = {
  /**
   * 用户注册
   */
  register: async (ctx, next) => {
    const req = ctx.request.body
    let doc = await UserModel.find({ name: req.name })
    if (doc.length === 0) {
      // 1. 记录用户信息
      let user = new UserModel({ name: req.name, identity: "user" })
      let userInfo = await user.save()
      // 2. 记录用户密码
      let password = new PasswordModel({ uid: userInfo._id, password: pwdHash.hashSync(req.password) })
      await password.save()
      // 3. 返回并记录用户的有效 Token
      let time = new Date().valueOf()
      let userToken = new TokenModel({ uid: userInfo._id, tidArr: [time] })
      await userToken.save()
      let token = jwt.getToken({ uid: userInfo._id, tid: time })
      ctx.body = {
        msg: "ok",
        data: {
          token
        }
      }
    } else {
      ctx.body = {
        msg: "用户名被占用"
      }
    }
  },
  /**
   * 用户登录
   */
  login: async (ctx, next) => {
    const req = ctx.request.body
    let doc = await UserModel.findOne({ name: req.name })
    if (doc) {
      let truePassword = (await PasswordModel.findOne({ uid: doc._id })).password
      // 1. 对比密码
      if (pwdHash.compare(req.password, truePassword)) {
        // 2. 将新 Token 在数据库中进行登记
        let time = new Date().valueOf()
        let tokenDoc = await TokenModel.findOne({ uid: doc._id })
        if (tokenDoc.tidArr.length >= config.maxDevices) {
          tokenDoc.tidArr.shift()
        }
        tokenDoc.tidArr.push(time)
        tokenDoc.set({ tidArr: tokenDoc.tidArr })
        tokenDoc.save()
        // 3. 返回 Token
        ctx.body = {
          msg: "ok",
          data: {
            token: jwt.getToken({ uid: doc._id, tid: time })
          }
        }
      } else {
        ctx.body = {
          msg: "密码错误"
        }
      }
    } else {
      ctx.body = {
        msg: "用户不存在"
      }
    }
  },
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
  },

}