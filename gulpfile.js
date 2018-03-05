//gulpfile.js

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    newer = require('gulp-newer'), 
    notify  = require('gulp-notify'),
    imagemin = require('gulp-imagemin');
    merge = require('gulp-merge-json');


//style paths
var sassFiles = 'styles/sass/**/*.scss',
    cssDest = 'styles/';

/**
 * Styles
*/
gulp.task('styles', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

/**
 * Images
*/
gulp.task('images', function() {

// Add the newer pipe to pass through newer images only
    return  gulp.src(['location/*/*.{png,jpg,gif}'])
                .pipe(newer('location/*/'))
                .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
                .pipe(gulp.dest('location/'))
                .pipe( notify( { message: 'Images task complete', onLast: true } ) );
});
gulp.task('merge', function(){
    gulp.src('location/*/*.json')
    .pipe(merge({
        fileName: 'events.json',
        concatArrays: true
    }))
    .pipe(gulp.dest('./location/all'));

});
gulp.task('watch',function() {
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('location/*/*/*.jpg', ['images']).on('change', browserSync.reload);
    gulp.watch(sassFiles,['styles']).on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});