const projectDb = require('../database/project')
const userDb = require('../database/user')

module.exports = {
  test: async (ctx, next) => {

  },
  /**
   * 创建一个项目
   */
  createProject: async (ctx, next) => {
    const uid = ctx.state.user.uid
    const req = ctx.request.body
    const userDoc = await userDb.Model.findById(uid)
    let project = new projectDb.Model({
      // TODO: 添加上传封面
      projectName: req.projectName,
      creator: userDoc._id,
      desc: req.desc
    })
    let projectDoc = await project.save().catch((err) => {
      console.log(err);
      ctx.body = {
        msg: "创建项目失败"
      }
    });
    let projectLinkedDoc = await projectDb.Model
      .findById(projectDoc._id, { articles: 0 })
      .populate("creator partners", { name: 1 })
      .catch(err => {
        console.log(err);
        ctx.body = {
          msg: "读取项目信息失败，手动刷新界面"
        }
      })
    ctx.body = {
      msg: "ok",
      data: projectLinkedDoc
    }
  },
  /**
   * 查找某用户创建的项目
   */
  getProjectListByUid: async (ctx, next) => {
    const uid = ctx.state.user.uid
    let projectDocs = await projectDb.findCreateProjectByUid(uid)
      .catch(err => {
        console.log(err);
        ctx.body = { msg: "查找项目失败" }
      })
    ctx.body = {
      msg: "ok",
      data: projectDocs
    }
  },

  /**
   * 由id查找到相关的Project
   */
  getProjectByPid: async (ctx, next) => {
    let pid = ctx.query.pid
    let projectDoc = await projectDb.Model
      .findById(pid)
      .populate("creator partners", { password: 0, tokens: 0, identity: 0 })
      .catch(err => {
        ctx.status = 404
        ctx.body = {
          mgs: "当前词条无记录内容"
        }
      })
    ctx.body = {
      msg: "ok",
      data: projectDoc
    }
  },
}