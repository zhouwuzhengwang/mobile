var gulp = require('gulp');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
console.log(gulp);
var paths = {
  stylus:['./dev/media/stylus/*.styl','./dev/em-rem/stylus/*.styl','./dev/event/stylus/*.styl','./dev/banner/stylus/*.styl'],
  script:['./dev/event/js/*.js','./dev/banner/js/*.js']
};

gulp.task('stylus-1', function() {
  return gulp.src(paths.stylus[0])
       .pipe(stylus({
      compress: 1
    }))
    .pipe(gulp.dest('./pro/media/css'));
});
gulp.task('stylus-2', function() {
  return gulp.src(paths.stylus[1])
       .pipe(stylus({
      compress: 1
    }))
    .pipe(gulp.dest('./pro/em-rem/css'));
});
gulp.task('stylus-3', function() {
  return gulp.src(paths.stylus[2])
       .pipe(stylus({
      compress: 1
    }))
    .pipe(gulp.dest('./pro/event/css'));
});
gulp.task('stylus-4', function() {
  return gulp.src(paths.stylus[3])
       .pipe(stylus({
      compress: 1
    }))
    .pipe(gulp.dest('./pro/banner/css'));
});
gulp.task('script-1',function(){
  return gulp.src(paths.script[0])
      .pipe(uglify())
      .pipe(gulp.dest('./pro/event/js'));
});
gulp.task('script-2',function(){
  return gulp.src(paths.script[1])
      .pipe(uglify())
      .pipe(gulp.dest('./pro/banner/js'));
});
gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus-1','stylus-2','stylus-3','stylus-4']);
  gulp.watch(paths.script, ['script-1','script-2']);
});
gulp.task('default', ['watch','stylus-1','stylus-2','stylus-3','stylus-4','script-1','script-2']);