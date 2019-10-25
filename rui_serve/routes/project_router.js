/**
 * root: /api/project
 * Project相关 API
 */

const Router = require('koa-router')
const router = new Router()
const controller = require('../controller/project_controller')

router.get('/test', controller.test)
router.post('/createProject', controller.createProject)
router.get('/getProjectListByUid', controller.getProjectListByUid)
router.get('/getProjectByPid', controller.getProjectByPid)
router.post('/modifyProjectInfo', controller.modifyProjectInfo)
router.post('/addArticle', controller.addArticle)
router.delete('/article', controller.deleteArticleByAid)
router.post('/modifyArticle', controller.modifyArticle)
router.get('/checkPermission', controller.checkPermission)

module.exports = router.routes()