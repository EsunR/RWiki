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

module.exports = router.routes()