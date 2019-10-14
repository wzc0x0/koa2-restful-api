const router = require("koa-router")();
const controller = require("../controllers/wechat");

router
    .get("/wechatLogin", controller.login)
    .get("/wechatAccessToken", controller.getAccessToken)
    .get("/wechatUserInfo", controller.getUserInfo)
    .get("/wechatTestSign", controller.checkWechatSign)
    .get("/wechatSendMsg", controller.sendMsg)
    .allowedMethods();

module.exports = router;
