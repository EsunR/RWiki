const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  identity: { type: String, default: "user" },
  time: { type: Date, default: Date.now },
  password: { type: String },
  tokens: { type: Array, default: [] }
})

module.exports = mongoose.model("user", userSchema)