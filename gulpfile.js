'use strict';

var gulp = require('gulp-param')(require('gulp'), process.argv);
var imagemin = require('gulp-imagemin');
var resize = require('gulp-image-resize');
var rename = require('gulp-rename');

gulp.task('optimImage', function(src, dest, w, h, format) {

    var src = (src) ? src : 'upload/';
    var dest = (dest) ? dest : 'build/';
    
    return gulp.src(src + '*.{jpg,jpeg,png}')
        .pipe(resize({
            width: w,
            height: h,
            upscale: false,
            crop : true,
            format: 'jpg'
        }))
        .pipe(imagemin(
            [
                imagemin.jpegtran({progressive: true})
            ],
            {
                verbose: true,
            }
        ))
        .pipe(rename(function (path) {
            if (w || h) {
                path.basename += (w) ? '_' + w : '_auto';
                path.basename += (h) ? '_' + h : '_auto';
            }
        }))
        .pipe(gulp.dest(dest));
    
});