const userDb = require('../database/user')
const jwt = require('../utils/jwt')
const config = require('../config')
const pwdHash = require('../utils/pwdHash')

module.exports = {
  /**
   * 用户注册
   */
  register: async (ctx, next) => {
    const req = ctx.request.body
    let doc = await userDb.Model.find({ name: req.name })
    if (doc.length === 0) {
      try {
        // 1. 记录用户信息
        let userDoc = await userDb.createUser(req.name, req.password, "user")
        // 2. 为创建的用户加入一个新 Token 并返回给前端
        let token = await userDb.generateToken(userDoc._id)
        ctx.body = {
          msg: "ok",
          data: {
            token
          }
        }
      } catch (error) {
        ctx.body = {
          msg: "创建用户失败，请稍候重试"
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
    let doc = await userDb.Model.findOne({ name: req.name })
    if (doc) {
      let truePassword = (await userDb.Model.findById(doc._id)).password
      // 1. 对比密码
      if (pwdHash.compare(req.password, truePassword)) {
        try {
          // 2. 创建一个 Token
          token = await userDb.generateToken(doc._id)
          // 3. 返回 Token
          ctx.body = {
            msg: "ok",
            data: { token }
          }
        } catch (error) {
          ctx.body = {
            msg: "创建 Token 失败，请手动登录"
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
      try {
        let token = userDb.generateToken(uid)
        ctx.body = {
          msg: "ok",
          data: {
            updated: true,
            token
          }
        }
      } catch (error) {
        ctx.status = 403
        ctx.body = { msg: "更新Token失败，当前Token已失效" }
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
  /**
   * 获取用户信息
   */
  getUserInfo: async (ctx, next) => {
    let uid = ctx.state.user.uid
    let userDoc = await userDb.Model.findById(uid)
    ctx.body = {
      msg: "ok",
      data: userDoc
    }
  }
}