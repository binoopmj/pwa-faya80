//gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//style paths
var sassFiles = 'styles/sass/**/*.scss',
    cssDest = 'styles/';

gulp.task('styles', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});



gulp.task('watch',function() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(sassFiles,['styles']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});