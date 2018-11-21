/**
 * @description wechat login
 */

const http = require('request')
const qs = require('querystring')

const appid = 'wxe6d05cf19dffff01'
const appsecret = 'e1871688ca090a468732802ee3b5fc30'
const auth_url = "https://open.weixin.qq.com/connect/oauth2/authorize?"
const token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?"
const userinfo_url = "https://api.weixin.qq.com/sns/userinfo?"
const redirect_url = "/wechatAccessToken"

class WechatController {
    static async login(ctx, next) {
        await getCode()
        return next()
    }

    static async getAccessToken(ctx, next) {
        let code = ctx.query.code
        await new Promise((reslove, reject) => {
            http(token_url, qs.stringify({
                appid,
                secret: appsecret,
                code,
                grant_type: 'authorization_code'
            }), (err, res, body) => {
                if (res.errcode === 40029) {
                    return reject()
                }
                reslove(res)
            })
        })
    }

}

const getCode = () => new Promise((reslove, reject) => {
    let params = {
        appid,
        redirect_url: encodeURIComponent(redirect_url),
        response_type: 'code',
        scope: 'snsapi_userinfo',
        state: '1'
    }
    http(auth_url + qs.stringif(params) + '#wechat_redirect', (err, res, body) => {
        console.log(res, body)
    })
})


module.exports = WechatController