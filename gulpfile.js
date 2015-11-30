var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var version = '0.0.0';

function concatTask() {
    gulp.src(['src/core.js', 'src/elements/*.js'])
        .pipe(concat('pb.' + version + '.js'))
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
    gulp.watch('./src/**/*.js', ['concat']);
}


gulp.task('watch', watchTask);
gulp.task('compress', compressTask);
gulp.task('concat', concatTask);

