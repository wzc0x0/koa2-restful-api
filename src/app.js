const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router
    .get('/', (ctx, next) => {
        ctx.body = '<h1>hello get</h1>'
    })
    .get('/404', (ctx, next) => {
        ctx.body = '<h1>404 Not Found</h1>'
    })
    .get('/:id/:userId', (ctx, next) => {
        ctx.body = `<code>${JSON.stringify(ctx.params)}</code>`
        ctx.body = ctx.params
    })
    .get('/home', (ctx, next) => {
        ctx.body = `<code>${JSON.stringify(ctx.query)}</code><br>
        <code>${JSON.stringify(ctx.querystring)}</code><br>`
    })
    .post('/user', (ctx, next) => {
        ctx.body = ctx.request.body
        console.log(ctx.request.body)
    })
    .put('/user', (ctx, next) => {

    })

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('success')
})