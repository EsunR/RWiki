/**
 * root: /api/sys
 * 系统初始化使用的 API 路由
 */

const Router = require('koa-router')
const router = new Router()
const controller = require('../../app/controller/sys_controller')

router.get('/sysStatus', controller.sysStatus)
router.post('/sysInit', controller.sysInit)

module.exports = router.routes()