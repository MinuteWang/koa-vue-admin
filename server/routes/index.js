const Router = require('koa-router');
const publics = require('./public');
const user = require('./user');

const router = new Router();

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
  async (ctx, next) => {
    const token = ctx.request.headers.authorization;
    try {
      await require('./utils/jwtHelper').verify(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        ctx.memory.delete(token);
      }
      ctx.throw(401, '您未登录');
    }
    next();
  },
  user.routes(),
  user.allowedMethods()
);

module.exports = router;
