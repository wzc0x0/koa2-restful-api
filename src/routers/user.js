const router = require('koa-router')()
const controller = require('../controllers/user')

router
    .get('/user', controller.getUser)
    .post('/user/update', controller.updateUser)
    .post('/upload', controller.upload)
    .allowedMethods()

module.exports = router