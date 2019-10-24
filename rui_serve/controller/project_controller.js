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

  /**
   * 修改 Project 的信息
   */
  modifyProjectInfo: async (ctx, next) => {
    let body = ctx.request.body
    let pid = body._id
    delete body._id
    let update = body
    // 检查传入的参数
    let legalParameter = ["desc", "cover", "projectName"]
    for (let key in update) {
      if (legalParameter.indexOf(key) === -1) {
        ctx.status = 403
        ctx.body = { msg: `传入非法参数${key}，已拒绝修改请求` }
        return
      }
    }
    let result = await projectDb.Model
      .findOneAndUpdate(
        { _id: pid },
        update,
        { new: true, fields: { articles: 0 } })
      .populate("creator partners", { password: 0, tokens: 0, identity: 0 })
      .catch(err => {
        ctx.body = { msg: "数据库查询失败" }
        console.log(err);
      })
    ctx.body = {
      msg: "ok",
      data: result
    }
  },

  /**
   * 创建一个项目文章
   */
  addArticle: async (ctx, next) => {
    let uid = ctx.state.user.uid
    let { pid, title, md, html } = ctx.request.body
    let permission = projectDb.checkUserPermission(uid, pid)
    if (!permission) {
      ctx.body = { msg: "当前用户没有修改权限" }
      return
    }
    let projectDoc = await projectDb.Model.findById(pid)
    projectDoc.articles.push({ title, md, html })
    let articleDoc = projectDoc.articles.slice(-1)[0]
    await projectDoc.save().then(() => {
      ctx.body = {
        msg: "ok",
        data: articleDoc
      }
    }).catch(err => {
      console.log(err);
      ctx.body = { msg: "创建失败" }
    })
  }
}