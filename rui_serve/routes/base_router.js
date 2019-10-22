/**
 * root: /api/base
 * 系统基础 API
 */

const Router = require('koa-router')
const router = new Router()
const controller = require('../controller/base_controller')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/updateToken', controller.updateToken)
router.get('/getUserInfo', controller.getUserInfo)
router.get('/deleteToken', controller.deleteToken)

module.exports = router.routes()