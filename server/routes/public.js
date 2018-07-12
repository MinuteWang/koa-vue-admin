const Router = require('koa-router')
const UserController = require('../controller/UserController')
const api = new Router()

api.post('/login', UserController.Login)
api.post('/register', UserController.Register)

module.exports = api
