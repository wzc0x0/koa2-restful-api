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
        let hex = ctx.params['hex'],
            url_query = ctx.query;
        try {
            let { data, info } = await readerTransform({ path: image_path + '/' + hex, params: url_query })
            ctx.body = data
            ctx.status = 200
            ctx.type = `image/${info.format || 'png'}`
            ctx.attachment() //let browser download
            await next()
        } catch (error) {
            console.log(error)
            ctx.fail(404, 'not found')
        }
    }
}

const readerTransform = image_params => new Promise((resolve, reject) => {
    fs.readFile(image_params.path, (err, buf) => {
        if (err) return reject(err)

        var image = sharp(buf),
            { format, quality, progress } = image_params.params,
            isProgress = progress ? true : false,
            pngCompress = Math.round((quality / 10) - 1),
            quality = quality - 0;

        if (/jpe?g/.test(format)) {
            image = image.jpeg({
                quality,
                progressive: isProgress,
                optimiseScans: isProgress,
                optimizeScans: isProgress
            })
        }

        if (format === 'png') {
            image = image.png({
                progressive: isProgress,
                compressionLevel: pngCompress
            })
        }

        if (format === 'webp') {
            image = image.webp({ quality, lossless: true })
        }


        image.toBuffer((err, data, info) => {
            if (err) return reject(err)
            resolve({ data, info })
        })
    })
})


module.exports = ImageViewController