var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var cleanCSS = require('gulp-clean-css');

gulp.task('salam', async function() {
    console.log("HELLO")
});



gulp.task('connectJS', function() {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(concat("all.min.js"))
        // Minifies only if it's a JavaScript file
        .pipe(gulp.dest('app/js/main'))
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('connectlibJS', function() {
    return gulp.src('app/libs/**/*.js')
        .pipe(uglify())
        .pipe(concat("lib.min.js"))
        // Minifies only if it's a JavaScript file
        .pipe(gulp.dest('app/minifyLibs'))
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task("concectlibCSS", async() => {
    gulp.src('app/libs/**/*.css')
        .pipe(cleanCSS({
            inline: ['none']
        }))
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest('app/minifyLibs'))
        .pipe(browserSync.reload({ stream: true }))
})



gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('sass', function() {
    return gulp.src('app/style/scss/main.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(cleanCSS({
            inline: ['none']
        }))
        .pipe(gulp.dest('app/style/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('watch', function() {
    gulp.watch('app/style/scss/main.scss', gulp.parallel('sass'));
    gulp.watch('app/libs/**/*.css', gulp.parallel('concectlibCSS'));
    gulp.watch('app/js/*.js', gulp.parallel('connectJS'));
    gulp.watch('app/libs/**/*.js', gulp.parallel('connectlibJS'));
});

gulp.task('default', gulp.parallel('sass', 'browserSync', 'concectlibCSS','connectlibJS', 'connectJS', 'watch'));