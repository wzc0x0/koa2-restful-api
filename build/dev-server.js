const path = require('path')
const cp = require('child_process')
const chokidar = require('chokidar')
const resolve = dir => path.join(__dirname, '..', dir)
const watcher = chokidar.watch(resolve('src'))
const entryPath = resolve('src/app.js')

let app = cp.fork(entryPath),
    reload = app => {
        app.kill('SIGINT')
        return cp.fork(entryPath)
    },
    callback = ({ e, path }) => {
        console.log(`File ${path} has been ${e}`)
        app = reload(app)
    },
    event = ['change', 'add', 'unlink']

process.on('SIGINT', () => {
    process.exit(0)
})

watcher.on('ready', () => {
    event.forEach(e => {
        watcher.on(e, path => callback({ e, path }))
    });
})