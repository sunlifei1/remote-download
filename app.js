const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); //需npm安装
const Koa = require('koa');
const app = new Koa();
const { main, downloadshot } = require("./puppeteer")
// logger
const router = require('./router')

main()

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
    downloadshot()
    let filePath = path.join(__dirname, ctx.url); //图片地址
    let file = null;
    try {
        file = fs.readFileSync(filePath); //读取文件
    } catch (error) {
        //如果服务器不存在请求的图片，返回默认图片
        filePath = path.join(__dirname, '/downloadPage.png'); //默认图片地址
        file = fs.readFileSync(filePath); //读取文件	    
    }

    let mimeType = mime.lookup(filePath); //读取图片文件类型
    ctx.set('content-type', mimeType); //设置返回类型
    ctx.body = file; //返回图片


});

app.listen(3000);