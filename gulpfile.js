const gulp = require('gulp');
const pug = require('gulp-pug');
const electron = require('electron-connect').server.create();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./dev/webpack.config.js');
const {copyChain, routes} = require('./dev/gulpChain.json');

gulp.task('make_bundle', () => {
  routes.forEach((r) => {
    webpackStream(webpackConfig.config(r), webpack)
      .pipe(gulp.dest('./dist/bundles'));
  });
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

gulp.task('build_dist', ['asset_copy', 'pug_compile', 'make_bundle']);

gulp.task('start', ['build_dist'], () =>{
  gulp.watch(['./src/**'], ['build_dist']);
  gulp.watch(['./src/main.js'], electron.restart);

  electron.start();
});
