const projectDb = require('../database/project')
const UserModel = require('../database/user')

module.exports = {
  test: async (ctx, next) => {
    let project = new projectDb.Model({
      projectInfo: {
        projectName: "测试项目",
        creatorUid: "123",
      }
    })
    project.article.push({
      title: "测试文章",
      md: "# hello",
      html: "<h1>hello</h1>"
    })
    await project.save().then((result) => {
      ctx.body = {
        msg: "ok",
        data: result
      }
    }).catch((err) => {
      ctx.body = {
        msg: "新建项目失败",
        error: err
      }
    });
  },
  /**
   * 创建一个项目
   */
  createProject: async (ctx, next) => {
    const uid = ctx.state.user.uid
    const req = ctx.request.body
    const userDoc = await UserModel.findById(uid)
    let project = new projectDb.Model({
      projectInfo: {
        projectName: req.projectName,
        creator: {
          uid: userDoc._id,
          name: userDoc.name
        },
        contributors: [],
        desc: req.desc
      }
    })
    await project.save().then((doc) => {
      ctx.body = {
        msg: "ok",
        data: doc
      }
    }).catch((err) => {
      console.log(err);
      ctx.body = {
        msg: "创建项目失败"
      }
    });
  },
  /**
   * 查找某用户创建的项目
   */
  getProjectListByUid: async (ctx, next) => {
    const uid = ctx.state.user.uid
    const project = await projectDb.Model.find({ "projectInfo.creator.uid": uid }, "projectInfo")
    ctx.body = {
      msg: "ok",
      data: project
    }
  }
}