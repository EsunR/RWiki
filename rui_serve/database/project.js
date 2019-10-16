const mongoose = require('mongoose')

const contributorsSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true }
})

const infoSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  creator: {
    uid: { type: String, required: true },
    name: { type: String, require: true }
  },
  desc: { type: String, default: "" },
  contributors: [contributorsSchema],
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  cover: { type: String, default: "" }
})

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  md: { type: String, required: true },
  html: { type: String, required: true }
})

const projectSchema = new mongoose.Schema({
  projectInfo: infoSchema,
  article: [articleSchema]
})

const Model = mongoose.model("project", projectSchema)

module.exports = {
  Model
}