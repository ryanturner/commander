var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var gulp = require('gulp');
var Server = require('karma').Server;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var noop = function () {};
var validate = require('gulp-html-angular-validate');
var fail   = require('gulp-fail');
var gulpIf = require('gulp-if');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'lint', 'test']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/tests/unit-tests.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('lint', ['lint-html'], function() {
  var jscsFailed = false;
  return gulp.src('./www/js/*.js')
    .pipe(jshint())
    .pipe(jscs()).on('error', function() {}) // noop function 
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(gulpIf(function(file) {
      return (file.jscs.errorCount > 0);
    }, fail("JSCS exited with errors!", true)));
});

gulp.task('lint-html', function() {
  var options = {
    customattrs: ['*'],
    customtags: ['*'],
    relaxerror:['Bad value “Content-Security-Policy” for attribute “http-equiv” on element “meta”.'],
    tmplext: 'tmpl.html',
    emitError: true,
  };
  return gulp.src(['./www/templates/*.html', './www/index.html'])
    .pipe(validate(options))
});
