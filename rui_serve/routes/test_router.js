const Router = require('koa-router')
const router = new Router()
const controller = require('../controller/test_controler')

router.get('/testRouter', controller.router)
router.get('/testUsers', controller.getUsers)
router.get('/insertUser', controller.insertUser)
router.get('/generateToken', controller.generateToken)


module.exports = router.routes()
