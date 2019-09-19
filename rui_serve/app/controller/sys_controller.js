const userModel = require('../../database/user_model')
const passwordModel = require('../../database/password_model')
const pwdHash = require('../utils/pwdHash')

module.exports = {
  sysStatus: async (ctx, next) => {
    let data = await userModel.find({ identity: "admin" })
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
    let currentAdmin = await userModel.find({ identity: "admin" })
    let adminInfo = {}
    if (currentAdmin.length > 0) {
      adminInfo = currentAdmin[0]
    } else {
      // 创建管理员信息，记录uid
      let admin = new userModel({
        name: "admin",
        identity: "admin"
      })
      adminInfo = await admin.save()
    }
    let password = await pwdHash.hash(req.password)
    let adminPwd = await new passwordModel({
      uid: adminInfo._id,
      password
    })
    await adminPwd.save().then((doc) => {
      ctx.body = {
        msg: "ok",
        data: {
          uid: doc.uid
        }
      }
    }).catch(err => {
      console.log(err)
      return
    })
  }
}