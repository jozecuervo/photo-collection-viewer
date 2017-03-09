/* globals require */
var gulp = require('gulp');
var sass = require('gulp-sass');
var closureCompiler = require('google-closure-compiler').gulp();
var htmlreplace = require('gulp-html-replace');

gulp.task('default', ['template','sass','js-compile'], function() {
  
});

gulp.task('template', function() {
  gulp.src('src/index.html')
    .pipe(htmlreplace({
      'css': 'style.css',
      'js': 'photo_collection_viewer.min.js'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('js-compile', function () {
  return gulp.src('./src/**/*.js', {base: './'})
  .pipe(closureCompiler({
    compilation_level: 'ADVANCED',
    warning_level: 'VERBOSE',
    language_in: 'ECMASCRIPT5_STRICT',
    language_out: 'ECMASCRIPT5_STRICT',
    output_wrapper: '(function(){\n%output%\n}).call(this)',
    js_output_file: 'photo_collection_viewer.min.js'
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
