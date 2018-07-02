const Koa = require('koa')

const app = new Koa()

app.listen(8090,() => {
    console.log('running in 8090')
})