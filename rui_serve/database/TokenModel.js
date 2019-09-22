const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  tidArr: { type: Array, default: [] }
})

module.exports = mongoose.model("token", tokenSchema)