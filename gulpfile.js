var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var fs = require('fs');

var path = require('path');

var url = require('url');

gulp.task('server', ['sass'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8989,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    return false
                }

                if (pathname === '/api/book') {

                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});


//编译scss
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./src/scss'))
});

//监听
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['sass'])
});

gulp.task('dev', ['server', 'watch']);