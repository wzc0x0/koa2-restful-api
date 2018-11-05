const Koa = require('koa')
const KoaBody = require('koa-body')
const staticServe = require('koa-static')
const app = new Koa()
const path = require('path')


const response = require('./middleware/response')
const routerError = require('./middleware/routerError')
const cors = require('./middleware/cors')

app.use(cors)
    // app.use(staticServe(path.resolve(__dirname, '../static/upload/'), {
    //     defer: true
    // }))
app.use(KoaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2048 * 1024 * 1024,
        hash: 'md5'
    }
}))
app.use(response)
app.use(require('./routers/user').routes())
app.use(require('./routers/photo').routes())
app.use(routerError)

app.listen(3000, () => {
    console.log('ok!');
})