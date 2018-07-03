const Router = require('koa-router')
const user = new Router()

user.post('/test', (ctx, next) => {
  next()
})

module.exports = user
