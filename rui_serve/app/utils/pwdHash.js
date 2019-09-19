const bcryptjs = require('bcryptjs')
const config = require('../../config')

const hash = (pwd) => {
  const hash = bcryptjs.hashSync(pwd, config.saltTimes);
  return hash;
};

const compare = (pwd, hasPwd) => {
  const result = bcryptjs.compareSync(pwd, hashPwd)
  return result
}

module.exports = {
  hash,
  compare
}