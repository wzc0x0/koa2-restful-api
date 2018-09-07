const gulp = require('gulp')
const browserSync = require("browser-sync").create()

gulp.task('default', () => {
    browserSync.init({
        port: 2018,
        server: { baseDir: "./" }
    })
    gulp.watch("./**/**", ['dev'])
    gulp.watch("../src/**", ['dev'])
})

gulp.task('dev', () => browserSync.reload())