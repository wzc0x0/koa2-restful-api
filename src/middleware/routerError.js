/**
 * @author wzc0x0@gmail.com
 * @description custom error page
 */

const fs = require('fs')
const path = require('path')
const error_html = path.resolve(__dirname, '../views/error.html')

module.exports = (ctx, next) => {
    let httpStatus = ctx.status
    if (httpStatus !== 200) {
        let html_text = fs.readFileSync(error_html, 'utf8').toString()
        html_text = html_text.replace(/{{error}}/g, httpStatus + "&nbsp;" + ctx.message)
        ctx.body = html_text
        ctx.status = httpStatus
    }
    next()
}