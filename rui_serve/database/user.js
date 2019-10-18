const mongoose = require('mongoose')
const config = require('../config')
const jwt = require('../utils/jwt')
const pwd = require('../utils/pwdHash')

const userSchema = new mongoose.Schema({
  name: { type: String },
  identity: { type: String, default: "user" },
  password: { type: String },
  tokens: { type: Array, default: [] },
  avatar: { type: String, default: config.defaultUserAvatar },
  time: { type: Date, default: Date.now }
})
/** 
 * @typedef {Object} User
 * @property {String} _id
 * @property {String} name
 * @property {String} identity
 * @property {String} password
 * @property {Array} tokens  
*/
const Model = mongoose.model("user", userSchema)


/**
 * 创建一个用户
 * @param {String} name 
 * @param {String} password 
 * @param {String} identity 
 * @returns {User} 插入的用户对象
 */
async function createUser(name, password, identity) {
  let userModel = new Model({ name, password: pwd.hashSync(password), identity })
  return await userModel.save().catch(err => {
    console.log(err)
    throw new Error("插入失败")
  })
}


/**
 * 为对应用户生成一个Token
 * @param {String} uid 
 * @returns {String} token string
 */
async function generateToken(uid) {
  // 查找到该用户的 Doc
  /** @type {User} */
  let userDoc = await Model.findOne({ _id: uid }).catch(err => {
    console.log(err);
    throw new Error("无法找到当前用户")
  })

  // 更新迭代 Token
  if (userDoc.tokens.length >= config.maxDevices) {
    userDoc.tokens.shift()
  }
  // 为了存储和查找效率，数据库不会存放 Token，而是存放有效 Token 的 tid
  let tid = new Date().valueOf()
  userDoc.tokens.push(tid)
  userDoc = await userDoc.save().catch(err => {
    console.log(err);
    throw new Error("Token 插入失败")
  })
  let tokenStr = jwt.getToken({ tid, uid })
  return tokenStr
}


module.exports = {
  userSchema,
  Model,
  createUser,
  generateToken
}