'use strict';

var gulp        = require('gulp');
var compass     = require('gulp-compass');
var livereload  = require('gulp-livereload');
var webserver = require('gulp-webserver');
var pug  = require('gulp-pug');

var SCSS_FILE   = './sass/**/*.scss';
var PUG_FILE   = './pug/**/*.pug';

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      port: 8888,
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

/*
 * Compass
 */
gulp.task('compass',function(){
  gulp
  .src([SCSS_FILE])
  .pipe(compass({
      config_file : 'config.rb',
      comments : false,
      css : 'css/',
      sass: 'sass/'
  }))
  .pipe(livereload());
});

/*
 * PUG
 */
gulp.task('pug', function(){
  gulp
    .src(['./pug/**/*.pug', '!./pug/**/_*.pug'])
    .pipe(pug({
      pretty: true //圧縮なし
    }))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

/*
 * Watch
 */
gulp.task('watch',function(){
  gulp.watch(SCSS_FILE, ['compass']);
  gulp.watch(PUG_FILE, ['pug']);
    // gulp.watch(SCSS_FILE, function(event){
    //     gulp.run('compass');
    // });
});

gulp.task('default', ['watch','webserver']);
