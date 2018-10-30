const Koa = require('koa')
const KoaBody = require('koa-body')
const app = new Koa()
const path = require('path')

const response = require('./middleware/response')
const routerError = require('./middleware/routerError')
const cors = require('./middleware/cors')

app.use(cors)
app.use(KoaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2048 * 1024 * 1024,
        hash: 'md5'
    }
}))
app.use(response)
app.use(require('./routers/user').routes())
app.use(routerError)

app.listen(3000, () => {
    console.log('ok!');
})