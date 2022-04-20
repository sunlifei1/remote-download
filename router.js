const fs = require('fs')
const Router = require('koa-router')

const router = new Router()

router.get('/generate', function (ctx) {
    const path = `${__dirname}/test.txt`
    ctx.body = fs.createReadStream(path)
    ctx.set('Content-disposition', 'attachment; filename= test.txt')
})

module.exports = router