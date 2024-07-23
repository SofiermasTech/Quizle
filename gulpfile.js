const { src, dest, watch, parallel, series } = require('gulp');

const css = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const includeFiles = require('gulp-include');


function pages() {
   return src('src/pages/*.html')
      .pipe(
         includeFiles({
            includePaths: 'src/content',
         })
      )
      .pipe(dest('src'))
      .pipe(browserSync.stream())
}

function fonts() {
   return src('src/fonts/src/*.*')
      .pipe(fonter({
         formats: ['woff', 'ttf']
      }))
      .pipe(src('src/fonts/*.ttf'))
      .pipe(ttf2woff2())
      .pipe(dest('src/fonts'))
}

function images() {
   return src(['src/images/dist/*.*', '!src/images/*.svg'])

      .pipe(src('src/images/dist/*.*'))
      .pipe(newer('src/images'))
      .pipe(webp())

      .pipe(src('src/images/dist*.*'))
      .pipe(newer('src/images'))
      .pipe(imagemin())

      .pipe(dest('src/images'))
}

function watching() {
   browserSync.init({
      server: {
         baseDir: 'src/'
      }
   });
   watch(['src/scss/blocks/*.scss', 'src/scss/components/*.scss', 'src/scss/*.scss',], styles)
   watch(['src/images/dist'], images)
   watch(['src/js/main.js'], scripts)
   watch(['src/content/**/*.html', 'src/pages/*'], pages).on(
      'change',
      browserSync.reload
   )
   watch(['src/*.html']).on('change', browserSync.reload)
}

function scripts() {
   return src([
      'src/js/*.js',
      '!src/js/main.min.js'
   ])
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(dest('src/js'))
      .pipe(browserSync.stream())
}

function styles() {
   return src('src/scss/style.scss')
      .pipe(autoprefixer())
      .pipe(concat('style.min.css'))
      .pipe(css({ outputStyle: 'compressed' }))
      .pipe(dest('src/css'))
      .pipe(browserSync.stream())
}

function cleaning() {
   return src('dist')
      .pipe(clean())
}

function building() {
   return src([
      'src/css/style.min.css',
      'src/images/*.*',
      'src/fonts/*.*',
      'src/js/main.min.js',
      'src/**/*.html',
      'src/video/*.*',
   ], { base: 'src' })
      .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.pages = pages;
exports.images = images;
exports.fonts = fonts;
exports.watching = watching;
exports.build = series(cleaning, building);

exports.default = parallel(styles, images, scripts, pages, watching);