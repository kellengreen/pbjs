const gulp = require('gulp');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const include = require('gulp-include');

const version = '0.0.1';

function watchTask() {
    gulp.start('build');
    gulp.watch('./src/**/*.js', ['build']);
}

function buildTask() {
    gulp.src('src/bootstrap.js')

        .pipe(include())
            .on('error', console.log)
        
        .pipe(rename(path => {
            path.basename = 'pb';
        }))
        
        .pipe(gulp.dest('./bin'));
}

gulp.task('watch', watchTask);
gulp.task('build', buildTask);

