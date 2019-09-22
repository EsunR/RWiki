const config = require('./config')
const Koa = require('koa')
const Router = require('koa-router')
const bodyPaser = require('koa-bodyparser')
const resFormat = require('./app/middleware/resFormat')
const db = require('./database/db')
const koaJwt = require('koa-jwt')
const tokenCheck = require('./app/middleware/tokenCheck')
const cors = require('@koa/cors');

// 实例化
const app = new Koa()
const router = new Router()

// 连接数据库
db.connect()

/** 请求预处理 */
app.use(resFormat)

/** 处理跨域 */
app.use(cors())


/** 解析 body */
app.use(bodyPaser())

/** 过滤需要 Token 却没有携带 Token 的请求 */
app.use(koaJwt({ secret: config.jwtSecret }).unless({
  path: [
    /^\/api\/base\/login/,
    /^\/api\/base\/register/,
    /^\/api\/sys\/sysInit/,
    /^\/api\/test\/testRouter/,
    /^\/api\/test/
  ]
}))

/** 对比数据库检查当前 Token 有效性 */
app.use(tokenCheck())

/** 路由处理 */
const test_router = require('./routes/api/test_router');
const sysInit_router = require('./routes/api/sys_router')
const base_router = require('./routes/api/base_router')
router.use('/api/test', test_router)
router.use('/api/sys', sysInit_router)
router.use('/api/base', base_router)
app.use(router.routes()).use(router.middleware())


/** 开启服务 */
app.listen(config.port)
console.log(`serve running on: http://localhost:${config.port}`)