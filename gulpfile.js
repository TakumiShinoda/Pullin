const gulp = require('gulp');
const pug = require('gulp-pug');
const electron = require('electron-connect').server.create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const routes = require('./router.js').routes;
const webpackConfig = require('./webpack.config.js');
const {copyChain, jsChain} = require('./gulpChain.json');

gulp.task('make_bundle', () => {
  for(var i = 0; i < jsChain.length; i++){
    webpackStream(webpackConfig.config(jsChain[i]), webpack)
    .pipe(gulp.dest('./dist/bundles'));
  }
});

gulp.task('pug_compile', () => {
  return gulp.src(['./src/**/*.pug', '!./pug/**/_*.pug'])
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('asset_copy', () => {
  copyChain.forEach((v) => {
    gulp.src([v.src], {base: v.base})
    .pipe(gulp.dest(v.dest));
  });
});

gulp.task('build_dist', () => {
  gulp.run('asset_copy');
  gulp.run('pug_compile');
  gulp.run('make_bundle');
});

gulp.task('start', ['build_dist'], () =>{
  gulp.watch(['./src/**'], () =>{
    gulp.run('build_dist');
  });
  gulp.watch(['./main.js'], electron.restart);

  electron.start();
});
