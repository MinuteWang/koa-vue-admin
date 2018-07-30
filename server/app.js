const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');
const logger = require('koa-logger');
const router = require('./routes');
const app = new Koa();

app.context.memory = require('./utils/memoryData');

// 注册中间件
app.use(
  serve(path.resolve(__dirname, '../dist'), {
    maxage: 3650000
  })
);
app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('running in 3000');
});
