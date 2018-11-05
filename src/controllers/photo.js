/**
 * @author wzc0x0@gmail.com
 * @description handle assets
 */
const fs = require('fs')
const path = require('path')
const image_path = path.resolve(__dirname, '../../static/upload/')
const sharp = require('sharp')


class ImageViewController {
    static async handleImageBySharp(ctx, next) {
        let hex = ctx.params['hex']
        try {
            let { data, info } = await readerTransform(image_path + '/' + hex)
            ctx.body = data
            ctx.status = 200
            ctx.type = `image/${info.format} || png`
        } catch (error) {
            ctx.fail(500, error)
        }
    }
}

const readerTransform = path => new Promise((resolve, reject) => {
    fs.readFile(path, (err, buf) => {
        err && reject(err)
        sharp(buf).webp().toBuffer((err, data, info) => {
            err && reject(err)
            resolve({ data, info })
        })
    })
})


module.exports = ImageViewController