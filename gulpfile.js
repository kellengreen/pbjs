const gulp = require('gulp');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const include = require('gulp-include');

const version = '0.0.1';

function watchTask() {
    gulp.start('js');
    gulp.watch('./src/**/*.js', ['js']);
}

function jsTask() {
    gulp.src('src/bootstrap.js')

        .pipe(include())
            .on('error', console.log)
        
        .pipe(rename(function(path) {
            path.basename = `pb-${version}.min`;
        }))
        
        .pipe(gulp.dest('./bin'));
}

gulp.task('watch', watchTask);
gulp.task('js', jsTask);

