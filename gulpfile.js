const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  replace = require('gulp-replace'),
  server = require('gulp-server-livereload');

sass.compiler = require('node-sass');

let imgPath = "../img/";

gulp.task('sass', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(replace('url("../../img/', 'url("' + imgPath))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
});

gulp.task('livereload', () => {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/*.scss', gulp.series('sass'));
});

gulp.task('build', gulp.series('sass'));
gulp.task('watch', gulp.series('sass:watch'));
gulp.task('liveserver', gulp.parallel('livereload', 'sass:watch'));