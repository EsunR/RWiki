const jwt = require('jsonwebtoken')
const config = require('../../config')

const getToken = function (payload) {
  return config.tokePrefix + " " + jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresTime })
}

module.exports = {
  jwt,
  getToken
}