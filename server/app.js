const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const logger = require('koa-logger');
const publics = require('./routes/public');
const user = require('./routes/user');
const app = new Koa();
const router = new Router();

// 静态资源目录
const staticPath = '../dist';
app.use(serve(path.resolve(__dirname, staticPath)));

router.use('/', async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: '请求成功！'
  };
  await next();
});
router.use('/public', publics.routes(), publics.allowedMethods());

router.use(
  '/user',
  (ctx, next) => {
    try {
      jwt.verify(
        ctx.request.headers.authorization,
        require('./config').token_cert
      );
    } catch (err) {
      ctx.throw(401, '您未登录');
    }
    next();
  },
  user.routes(),
  user.allowedMethods()
);

// 注册中间件
app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('running in 3000');
});
