var gulp = require('gulp')
  ,imagemin = require('gulp-imagemin')
  ,clean = require('gulp-clean')
  ,concat = require('gulp-concat')
  ,htmlReplace = require('gulp-html-replace')
  ,uglify = require('gulp-uglify')
  ,usemin = require('gulp-usemin')
  ,cssmin = require('gulp-cssmin')
  ,browserSync = require('browser-sync').create()
  ,jshint = require('gulp-jshint')
  ,jshintStylish = require('jshint-stylish')
  ,csslint = require('gulp-csslint')
  ,autoprefixer = require('gulp-autoprefixer')
  ,cssnano= require('gulp-cssnano')
  ,htmlmin = require('gulp-htmlmin')
  ,gulpif = require('gulp-if')
  ,useref = require('gulp-useref')
  ,inlineSource = require('gulp-inline-source')
  ,sass = require('gulp-sass'),
  babel  = require('gulp-babel'),
  tinypng = require('gulp-tinypng');



gulp.task('default', ['useref','copyPHP', 'copyFonts'], function() {
  gulp.start('build-img');
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('copyPHP', function() {
    return gulp.src('src/php/*')
        .pipe(gulp.dest('dist/php'));
});

gulp.task('copyFonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build-img', function() {

  return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        // .pipe(tinypng('2fTBYUG9ROnvcw5jclwjWsXP8n2SF_-Z'))
        .pipe(gulp.dest('dist/img'));
});


// minificação
gulp.task('minify-js', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat("all.js"))
    .pipe(uglify({ compress: true }).on('error', function(e){
         console.log(e);
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css', function() {
  return gulp.src('src/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

/* Concatenação */
gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.html', inlineSource()))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulpif('*.js',babel({
            compact: false,
            presets: [['es2015', {modules: false}]]
        })))
        .pipe(gulpif('*.js', uglify({ compress: false })))
        .pipe(gulpif('*.css', cssnano({safe: true})))
        .pipe(gulp.dest('dist'));
});


//server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);

    gulp.watch('src/js/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint({esversion: 6}))
            .pipe(jshint.reporter(jshintStylish));
    });

    gulp.watch('src/css/**/*.css').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(csslint());


    });

    gulp.watch('src/img/**/*').on('change', function(event) {
        gulp.src(event.path)
            // .pipe(tinypng('2fTBYUG9ROnvcw5jclwjWsXP8n2SF_-Z'))
            .pipe(gulp.dest('src/img'));
    })

    gulp.watch('src/sass/*.scss').on('change', function(event) {
       // var stream = gulp.src('src/sass/*.scss')
       console.log(event.path);
       var stream = gulp.src('src/sass/*.scss')
            .pipe(sass().on('error', function(erro) {
              console.log('Sass, erro compilação: ' + erro.filename);
              console.log(erro.message);
            }))
            .pipe(gulp.dest('src/css'));
    });
});
