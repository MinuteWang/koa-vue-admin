const Router = require('koa-router')
const UserController = require('../controller/UserController')
const api = new Router()

api.post('/login', UserController.Login)

module.exports = api
