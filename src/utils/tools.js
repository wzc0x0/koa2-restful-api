/**
 * some utils tools
 */
const fs = require('fs')
const crypto = require('crypto')


exports.readFileMD5 = url => {
    return new Promise(resolve => {
        let md5sum = crypto.createHash('md5'),
            stream = fs.createReadStream(url);
        stream.on('data', chunk => {
            md5sum.update(chunk)
        })
        stream.on('end', () => {
            resolve({ reader: stream, md5: md5sum.digest('hex') })
        })
    })
}