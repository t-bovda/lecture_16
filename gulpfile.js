'use strict'; 

let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename"),
    browserSync = require("browser-sync").create();;

gulp.task("sass", function () {
    return gulp
        .src("./scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task(
    'serve',
    gulp.series('sass', function () {
        browserSync.init({
            server: './'
        });

        gulp.watch("./scss/**/*.scss", gulp.parallel("sass"));
    })
);

gulp.task('clean', function () {
    return gulp.src('./css', {
        allowEmpty: true
    }).pipe(clean())
})

gulp.task('default', gulp.series('serve'));