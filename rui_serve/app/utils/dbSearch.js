const UserModel = require('../../database/UserModel')

/**
 * 获取用户的相关信息
 * @param {String} uid 
 */
async function getUserInfo(uid) {
  return await UserModel.findById(uid)
}

module.exports = {
  getUserInfo
}