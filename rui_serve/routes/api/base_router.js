/**
 * root: /api/base
 * 系统基础 API
 */

const Router = require('koa-router')
const router = new Router()
const controller = require('../../app/controller/base_controller')

router.get('/updateToken', controller.updateToken)

module.exports = router.routes()