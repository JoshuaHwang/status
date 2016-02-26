var gulp    = require('gulp');
var sass    = require('gulp-sass');
var jade    = require('gulp-jade');
var nodemon = require('gulp-nodemon');
var concat  = require('gulp-concat');

var app = 'app/app.js';

gulp.task('nodemon', function() {
  nodemon({
    script: app,
    }).on('start');
  });

gulp.task('jade', function() {
  console.log('Running jade templating..');
  gulp.src('./template/jade/**/*.jade')
   .pipe(jade())
   .pipe(gulp.dest('./app/public/views'))
  });

gulp.task('sass', function() {
  console.log('Running sass templating..');
  gulp.src('./template/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/public/css'))
  });

gulp.task('angular', function() {
  console.log('Concat angular files..');
  gulp.src([
    './app/public/js/angular/**/module.js',
    './app/public/js/controllers/angular/**/*.js',
    './app/public/js/services/angular/**/*.js'
    ]).pipe(concat('default.js'))
      .pipe(gulp.dest('./app/public/js/angular'));
  });

gulp.task('watch', function() {
  gulp.watch('./template/jade/**/*.jade', ['jade']);
  gulp.watch('./template/sass/**/*.scss', ['sass']);
  gulp.watch('./app/public/js/')
  });

gulp.task('default', ['jade', 'sass', 'angular', 'watch', 'nodemon']);