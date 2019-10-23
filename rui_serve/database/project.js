const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
mongoose.set('useFindAndModify', false)

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  md: { type: String, required: true },
  html: { type: String, required: true }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  creator: { type: ObjectId, ref: "user" },
  partners: [{ type: ObjectId, ref: "user" }],
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

/**
 * 检查用户是否拥有修改项目的权限
 * @param {String} uid 
 * @param {String} pid 
 */
async function checkUserPermission(uid, pid) {
  let projectDoc = await Model.findById(pid).catch(err => {
    console.log(err);
    return false
  })
  let permissionList = projectDoc.partners.slice()
  permissionList.push(projectDoc.creator)
  if (permissionList.indexOf(uid) !== -1) {
    return true;
  } else {
    return false
  }
}

module.exports = {
  articleSchema,
  projectSchema,
  Model,
  findCreateProjectByUid,
  checkUserPermission
}