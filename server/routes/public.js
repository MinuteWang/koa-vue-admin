const Router = require('koa-router')
const api = new Router()

api.post('/login', (ctx, next) => {
  ctx.body = '11'
  next()
})

module.exports = api
