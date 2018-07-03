const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const crypto = require('crypto')
const serve = require('koa-static')
const path = require('path')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const publics = require('./routes/public')
const user = require('./routes/user')
const app = new Koa()
const router = new Router()

const userList = [{userid: 1, accout: '123', password: '250cf8b51c773f3f8dc8b4be867a9a02'}, {userid: 2, account: '567', password: '9fe8593a8a330607d76796b35c64c600'}]

// 静态资源目录
const staticPath = './dist'
app.use(serve(
  path.join(__dirname, staticPath)
))

router.use('/public', publics.routes(), publics.allowedMethods())

router.use('/user', (ctx, next) => {
  try {
    jwt.verify(ctx.request.headers.authorization, 'adfaf')
  } catch (err) {
    ctx.throw(401, '您未登录')
  }
  next()
}, user.routes(), user.allowedMethods())

router.post('/login', (ctx, next) => {
  const md5 = crypto.createHash('md5')
  const password = ctx.request.body.password
  const secretPw = md5.update(password).digest('hex')
  const users = userList.find(val => {
    return val.accout === ctx.request.body.accout && val.password === secretPw
  })
  ctx.assert(users, 400, 'accout wrong')
  ctx.body = jwt.sign({uid: users.userid}, 'adfaf')
  next()
})

router.post('/auth/cinema', (ctx, next) => {
  ctx.body = jwt.verify(ctx.request.body.token, 'adfaf')
})

// 注册中间件
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8090, () => {
  console.log('running in 8090')
})
