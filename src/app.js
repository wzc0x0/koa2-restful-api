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


app.use(async ctx => {
    if (ctx.url === '/index') {
        ctx.cookies.set(
            'cid',
            'hello world', {
                domain: 'localhost', // 写cookie所在的域名
                path: '/index', // 写cookie所在的路径
                maxAge: 10 * 60 * 1000, // cookie有效时长
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            }
        )
        ctx.body = 'cookie is ok'
    } else {
        ctx.body = 'hello world'
    }
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
        console.log(ctx.cookies.get('sid'))
    })
    .put('/user', (ctx, next) => {

    })

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('success')
})