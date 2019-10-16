const UserModel = require('../../database/user')

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