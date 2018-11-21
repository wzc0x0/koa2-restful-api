const router = require('koa-router')()
const controller = require('../controllers/wechat')

router
    .get('/login', controller.login)
    .get('/wechatAccessToken', controller.getAccessToken)