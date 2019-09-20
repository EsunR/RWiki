const config = require('./config')
const Koa = require('koa')
const Router = require('koa-router')
const bodyPaser = require('koa-bodyparser')
const resFormat = require('./app/middleware/resFormat')
const db = require('./database/db')
const koaJwt = require('koa-jwt')
const tokenCheck = require('./app/middleware/tokenCheck')

// 实例化
const app = new Koa()
const router = new Router()

// 连接数据库
db.connect()

// 预先中间件
app.use(resFormat)
app.use(bodyPaser())
app.use(koaJwt({ secret: config.jwtSecret }).unless({
  path: [
    /^\/api\/base\/login/,
    /^\/api\/base\/register/,
    /^\/api\/sys\/sysInit/,
    /^\/api\/test\/testRouter/,
    /^\/api\/test/
  ]
}))
app.use(tokenCheck())



/**路由处理 */
// CROS
router.all('*', async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  ctx.set("X-Powered-By", ' 3.2.1')
  ctx.set("Content-Type", "application/json;charset=utf-8")
  await next()
})
// 路由分层
const test_router = require('./routes/api/test_router');
const sysInit_router = require('./routes/api/sys_router')
const base_router = require('./routes/api/base_router')
router.use('/api/test', test_router)
router.use('/api/sys', sysInit_router)
router.use('/api/base', base_router)
app.use(router.routes()).use(router.middleware())

// 开启服务
app.listen(config.port)
console.log(`serve running on: http://localhost:${config.port}`)