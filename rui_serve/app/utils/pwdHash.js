const bcryptjs = require('bcryptjs')
const config = require('../../config')

const hash = async (password) => {
  const hash = await bcryptjs.hash(password, config.saltTimes);
  return hash;
};

module.exports = {
  hash
}