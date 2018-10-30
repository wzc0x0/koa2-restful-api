/**
 * @author wzc0x0@gmail.com
 * @description unify response format by middleware
 */

const success = (ctx, data = null) => {
    ctx.body = {
        code: 200,
        data,
        msg: 'success'
    }
}

const fail = (ctx, code = 500, msg = 'fail') => {
    ctx.body = {
        code,
        data: null,
        msg
    }
}

module.exports = async(ctx, next) => {
    ctx.success = success.bind(null, ctx)
    ctx.fail = fail.bind(null, ctx)
    await next();
}