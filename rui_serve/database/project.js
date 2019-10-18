const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  md: { type: String, required: true },
  html: { type: String, required: true }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  creator: { type: ObjectId, ref: "user" },
  partners: [{ type: ObjectId, ref: "user", default: [] }],
  desc: { type: String, default: "" },
  cover: { type: String, default: "" },
  articles: [articleSchema]
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

const Model = mongoose.model("project", projectSchema)

/**
 * 由 Uid 找到该用户所创建的项目
 * @param {String} uid 
 */
async function findCreateProjectByUid(uid) {
  let projectLinkDoc = await Model.find({ creator: uid }, { articles: 0 })
    .populate("creator partners", { tokens: 0, password: 0, identity: 0 })
    .catch(err => {
      throw err
    })
  return projectLinkDoc
}

module.exports = {
  articleSchema,
  projectSchema,
  Model,
  findCreateProjectByUid
}