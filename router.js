const fs = require('fs')
const Router = require('koa-router')
const { main, downloadshot, newDownload } = require("./puppeteer")
const router = new Router()
const path = require('path');
const mime = require('mime-types'); //需npm安装
router.get('/download', function (ctx) {
    downloadshot()
    const dir = path.join(__dirname, '/downloadPage.png') // 这里的 ../ 需要判断，如果当前这个js文件在项目根目录下，就不需要../
    const readStream = fs.readFileSync(dir)  // 文件流
    const base64 = readStream.toString('base64') // 转 base64
    ctx.body = {
        code: 200,
        data: base64
    }
})
router.get('/index', function (ctx) {

    let filePath = path.join(__dirname, ctx.url); //图片地址
    let file = null;
    try {
        file = fs.readFileSync(filePath); //读取文件
    } catch (error) {
        //如果服务器不存在请求的图片，返回默认图片
        filePath = path.join(__dirname, '/index.html'); //默认图片地址
        file = fs.readFileSync(filePath); //读取文件	    
    }

    let mimeType = mime.lookup(filePath); //读取图片文件类型
    ctx.set('content-type', mimeType); //设置返回类型
    ctx.body = file; //返回图片
})
router.post('/downloadUrl', function (ctx) {

    console.log(ctx.request.body)
    newDownload(ctx.request.body.username)
    ctx.body = {
        code: 200,
        message: "提交成功"
    }; //返回图片

})

module.exports = router