const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model("password", passwordSchema)