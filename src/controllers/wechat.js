/**
 * @description wechat login
 */

const request = require("request");
const qs = require("querystring");

const appid = "wxa0d289e77d610d21";
const appsecret = "5c6fb693420dcfd74a428eb031a040a2";
const auth_url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
const token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?";
const userinfo_url = "https://api.weixin.qq.com/sns/userinfo?";
const redirect_uri = "http://1656o752y9.51mypc.cn/wechatAccessToken";

let db = new Object();

const http = (url, data) =>
    new Promise((resovle, reject) => {
        request(url, (err, resp, body) => {
            if (err) return reject(err);
            resovle({ resp, body });
        });
    });

class WechatController {
    static async login(ctx, next) {
        // 前端页面跳转地址
        let { returnUrl } = ctx.query;
        let params = {
            appid,
            redirect_uri,
            response_type: "code",
            scope: "snsapi_userinfo",
            state: returnUrl
        };
        await http(auth_url + qs.stringify(params) + "#wechat_redirect").then(
            ({ resp }) => {
                // 后端重定向微信
                ctx.redirect(resp.request.uri.href);
                next();
            }
        );
    }

    static async getAccessToken(ctx, next) {
        let { code, state } = ctx.query;
        let params = {
            appid,
            secret: appsecret,
            code,
            grant_type: "authorization_code"
        };
        await http(token_url + qs.stringify(params)).then(({ body }) => {
            console.log(body);
            let result = JSON.parse(body);
            db[result.openid] = result.access_token;
            // 重定向到前端
            ctx.redirect(state);
            ctx.cookies.set("user_session", result.openid, {
                maxAge: 1000 * 60 * 60 * 24
            });
            next();
        });
    }

    static async getUserInfo(ctx) {
        let openid = ctx.cookies.get("user_session");
        if (openid) {
            let { body } = await http(
                userinfo_url +
                qs.stringify({
                    access_token: db[openid],
                    openid,
                    lang: "zh_CN"
                })
            );
            ctx.success(JSON.parse(body));
        } else {
            ctx.fail(401, "未登录");
        }
    }

    static async checkWechatSign(ctx) {
        // 微信服务器交互验证
        ctx.body = ctx.query.echostr;
    }

    static async sendMsg(ctx) {
        //发送微信模板
        let openid = ctx.cookies.get("user_session");
        if (openid) {
            let options = {
                url: "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" +
                    db[openid],
                method: "POST",
                json: true,
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    touser: openid,
                    template_id: "ImkxMFWtJAdrfvlnSpldbwKoHdCVWFVaopwstZblBh0",
                    data: {}
                }
            };
            let { body } = await http(options);
            console.log(body);
            ctx.success(body);
        } else {
            ctx.fail(401, "未登录");
        }
    }
}

module.exports = WechatController;
