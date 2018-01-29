//gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

//style paths
var sassFiles = 'styles/sass/**/*.scss',
    cssDest = 'styles/';

gulp.task('styles', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});
gulp.task('images', () =>
    gulp.src('location/*/*/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('./location/'))
);


gulp.task('watch',function() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(sassFiles,['styles']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});