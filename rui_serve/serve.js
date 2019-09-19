const config = require('./config')
const Koa = require('koa')
const Router = require('koa-router')
const bodyPaser = require('koa-bodyparser')
const resFormat = require('./app/middleware/resFormat')

// 实例化
const app = new Koa()
const router = new Router()

// 连接数据库
require('./database/db')

// 处理router
router.all('*', async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  ctx.set("X-Powered-By", ' 3.2.1')
  ctx.set("Content-Type", "application/json;charset=utf-8")
  await next()
})
const test_router = require('./routes/api/test_router');
const sysInit_router = require('./routes/api/sys_router')


router.use('/api/test', test_router)
router.use('/api/sys', sysInit_router)


app.use(resFormat)
app.use(bodyPaser())
app.use(router.routes()).use(router.middleware())

// 开启服务
app.listen(config.port)
console.log(`serve running on: http://localhost:${config.port}`)