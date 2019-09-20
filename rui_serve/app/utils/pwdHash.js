const bcryptjs = require('bcryptjs')
const config = require('../../config')

const hashSync = (password) => {
  return bcryptjs.hashSync(password, config.saltTimes);;
};

module.exports = {
  hashSync
}