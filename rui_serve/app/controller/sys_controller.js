const UserModel = require('../../database/UserModel')
const PasswordModel = require('../../database/PasswordModel')
const TokenModel = require('../../database/TokenModel')
const pwdHash = require('../utils/pwdHash')
const jwt = require('../utils/jwt')

module.exports = {
  sysStatus: async (ctx, next) => {
    let data = await UserModel.find({ identity: "admin" })
    if (data.length === 0) {
      ctx.body = {
        msg: "no admin info"
      }
    } else {
      ctx.body = {
        msg: "ok",
        data: {
          adminCount: data.length
        }
      }
    }
  },

  sysInit: async (ctx, next) => {
    // TODO: 校验指令发送者的身份
    const req = ctx.request.body
    let currentAdmin = await UserModel.find({ identity: "admin" })
    if (currentAdmin.length > 0) {
      ctx.body = {
        msg: "系统已初始化，请勿重复操作"
      }
    } else {
      // 创建管理员信息，记录uid
      let admin = new UserModel({ name: "admin", identity: "admin" })
      let adminInfo = await admin.save()
      // 存储密码
      let password = pwdHash.hashSync(req.password)
      let adminPwd = new PasswordModel({ uid: adminInfo._id, password })
      await adminPwd.save()
      // 签发和创建有效Token
      let time = new Date().valueOf()
      let adminToken = new TokenModel({ uid: adminInfo._id, tidArr: [time] })
      await adminToken.save()
      let token = jwt.getToken({ uid: adminInfo._id, tid: time })
      ctx.body = {
        msg: "ok",
        data: {
          userInfo: adminInfo,
          token
        }
      }
    }
  }
}