const Router = require('koa-router');
const UserController = require('../controller/UserController');
const WechatController = require('../controller/WeChatController');
const api = new Router();

api.post('/login', UserController.Login);
api.post('/register', UserController.Register);
api.get('/wxtest', UserController.WxTest);
api.get('/wxauth', WechatController.wxAuth);
api.post('/wxlogin', WechatController.wxLogin);

module.exports = api;
