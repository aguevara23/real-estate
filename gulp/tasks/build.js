var gulp        = require('gulp'),
    del         = require('del'),
    rev         = require('gulp-rev'),
    uglify      = require('gulp-uglify'),
    usemin      = require('gulp-usemin'),
    cssnano     = require('gulp-cssnano'),
    imagemin    = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    imageminJpegRecompress = require('imagemin-jpeg-recompress');


gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs" // This could also be "dist"
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], function() {
  return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**/*',
    '!./app/assets/styles/**/*',
    '!./app/assets/scripts/**/*',
    '!./app/temp',
    '!./app/temp/**/*'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src(['./app/assets/images/**/*'])
    .pipe(imagemin([
      imagemin.gifsicle(),
      imageminJpegRecompress({
        loops:6,
        min: 35,
        max: 70,
        quality:'medium'
      }),
      imagemin.optipng(),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start("usemin");
});

gulp.task('usemin', ['styles', 'scripts'], function(){
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
