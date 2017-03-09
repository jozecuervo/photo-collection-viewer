/* globals require */
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
});

var closureCompiler = require('google-closure-compiler').gulp();

/* http://anas.pk/2015/09/02/solution-no-java-runtime-present-mac-yosemite/ */
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
