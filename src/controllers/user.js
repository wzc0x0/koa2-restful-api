const fs = require("fs");
const path = require("path");
const save_path = path.resolve(__dirname, "../../static/upload/");
const http = require("axios");

class UserController {
    static async getUser(ctx) {
        ctx.success(ctx.query);
    }
    static async updateUser(ctx) {
        ctx.success(ctx.request.body);
    }
    static async upload(ctx) {
        try {
            let file = ctx.request.files["filename"],
                readStream = fs.createReadStream(file.path),
                writeStream = fs.createWriteStream(`${save_path}/${file.hash}`);
            readStream.pipe(writeStream);
            ctx.success({ hash: file.hash });
        } catch (error) {
            ctx.fail(1101, error);
        }
    }
    static async douban(cxt) {
        let sendData;
        if (!sendData) {
            let doubanData = await http.get(
                "https://douban.uieee.com/v2/movie/in_theaters"
            );
            let { data } = doubanData;
            let count = 5;
            while (count--) {
                data.subjects = data.subjects.concat(data.subjects);
            }
            sendData = data;
        }

        cxt.success(sendData);
    }
}

module.exports = UserController;
