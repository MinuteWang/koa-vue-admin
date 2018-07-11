const Router = require('koa-router')
const api = new Router()

api.post('/login', (ctx, next) => {
  next()
})

module.exports = api
