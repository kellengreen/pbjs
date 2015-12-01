var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var include = require('gulp-include');

var version = '0.0.0';

function buildTask() {
    gulp.src('src/pb.js')
        .pipe(include())
        .pipe(gulp.dest('bin'));
}

function compressTask() {
    gulp.src('src/pb.' + version + '.js')
        .pipe(rename(function(path) {
            path.extname = '.min.js';
        }))
        .pipe(uglify())
        .pipe(gulp.dest('bin'));
}

function watchTask() {
    gulp.watch('./src/**/*.js', ['build']);
}

gulp.task('watch', watchTask);
gulp.task('compress', compressTask);
gulp.task('build', buildTask);

