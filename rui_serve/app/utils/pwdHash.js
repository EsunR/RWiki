const bcryptjs = require('bcryptjs')
const config = require('../../config')

const hashSync = (password) => {
  return bcryptjs.hashSync(password, config.saltTimes);;
};

const compare = (pwd, hasPwd) => {
  const result = bcryptjs.compareSync(pwd, hashPwd)
  return result
}

module.exports = {
  hashSync
}