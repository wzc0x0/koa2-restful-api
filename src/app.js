const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

app.use(bodyParser())

app.use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
        ctx.set('Access-Control-Allow-Origin', '*')
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
})

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
    .get('/get-cookie', (ctx, next) => {
        ctx.cookies.set('sid', 'hello world', {
            domain: 'localhost',
            path: '/',
            maxAge: 3600,
            expires: new Date(),
            httpOnly: false
        })
        ctx.body = 'cookie is ok'
    })

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('success')
})