const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); //需npm安装
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static')
const { main, downloadshot } = require("./puppeteer")
// logger
const router = require('./router')

const staticPath = './static'

main()
app.use(static(
    path.join(__dirname, staticPath)
))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {



});

app.listen(3000);