const fs = require('fs')
const path = require('path')
const save_path = path.resolve(__dirname, '../../static/upload/')

class UserController {
    static async getUser(ctx) {
        ctx.success(ctx.query)
    }
    static async updateUser(ctx) {
        ctx.success(ctx.request.body)
    }
    static async upload(ctx) {
        try {
            let file = ctx.request.files['filename'],
                ext = file.name.split('.').pop(),
                readStream = fs.createReadStream(file.path),
                writeStream = fs.createWriteStream(`${save_path}/${file.hash}.${ext}`);
            readStream.pipe(writeStream)
            ctx.success({ filename: `${file.hash}.${ext}` })
        } catch (error) {
            ctx.fail(1101, error)
        }
    }

}

module.exports = UserController