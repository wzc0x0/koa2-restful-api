const router = require('koa-router')()
const controller = require('../controllers/photo')

router
    .get('/imageView/:hex', controller.handleImageBySharp)
    .allowedMethods()

module.exports = router