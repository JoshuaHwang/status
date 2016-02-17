var gulp    = require('gulp');
var sass    = require('gulp-sass');
var jade    = require('gulp-jade');
var nodemon = require('gulp-nodemon');

var app = 'app/app.js';

gulp.task('nodemon', function() {
  nodemon({
    script: app,
    }).on('start');
  });

gulp.task('jade', function() {
  console.log('Running jade templating..');
  gulp.src('./jade/**/*.jade')
   .pipe(jade())
   .pipe(gulp.dest('./app/public/views'))
  });

gulp.task('sass', function() {
  console.log('Running sass templating..');
  gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/public/css'))
  });

gulp.task('watch', function() {
  gulp.watch('./jade/**/*.jade', ['jade']);
  gulp.watch('./sass/**/*.scss', ['sass']);
  });

gulp.task('default', ['jade', 'sass', 'watch', 'nodemon']);