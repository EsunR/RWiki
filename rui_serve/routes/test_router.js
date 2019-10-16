const Router = require('koa-router')
const router = new Router()
const controller = require('../app/controller/test_controler')

router.get('/testRouter', controller.testRouter)
router.get('/testUsers', controller.testUsers)


module.exports = router.routes()
