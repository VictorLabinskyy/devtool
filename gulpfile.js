const gulp           = require('gulp');
const pug            = require('gulp-pug');
const postCss        = require('gulp-postcss');
const plumber        = require('gulp-plumber');
const rename         = require("gulp-rename");
const imagemin       = require('gulp-imagemin');
const babel          = require('gulp-babel');
const uglify         = require('gulp-uglify');
const concat         = require('gulp-concat');
const gulpif         = require('gulp-if');
const preCss         = require('precss');
const cssNano        = require('cssnano');
const postcssImport  = require("postcss-import");
const autoprefixer   = require('autoprefixer');
const sugarss        = require('sugarss');
const browserSync    = require('browser-sync').create();
const args           = require('yargs').argv;

//Configs
const path = require('./app/config/path.js');

//Environment
const isProd = !!args.production;

const pluginsDev = [
    postcssImport(),
    preCss(),
	autoprefixer({browsers: ['last 2 versions']})
];

const pluginsProd = pluginsDev.concat([
    cssNano()
]);

gulp.task('pug', () =>
	gulp.src(path.src.views)
		.pipe(plumber())
		.pipe(pug())
		.pipe(gulp.dest(path.dist.views))
		.pipe(browserSync.stream())
);


gulp.task('css', () =>
	gulp.src(path.src.css)
		.pipe(plumber())
		.pipe(postCss(isProd ? pluginsProd : pluginsDev, { parser: sugarss }))
		.pipe(rename((path) => path.extname = ".css"))
        .pipe(concat('main.css'))
		.pipe(gulp.dest(path.dist.css))
		.pipe(browserSync.stream())
);

gulp.task('js', () =>
	gulp.src(path.src.js)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulpif(isProd, uglify()))
		.pipe(gulp.dest(path.dist.js))
);


gulp.task('imagemin', () =>
	gulp.src(path.src.images)
		.pipe(imagemin())
		.pipe(gulp.dest(path.dist.images))
);


gulp.task('browser-sync', () =>
	browserSync.init({
		server: {
			baseDir: path.webroot
		},
		open: false
	})
);

gulp.task('watch:pug', () =>
	gulp.watch(path.watch.views, ['pug'])
);

gulp.task('watch:css', () =>
	gulp.watch(path.watch.css, ['css'])
);

gulp.task('watch:js', () =>
	gulp.watch(path.watch.js, ['js'])
);

gulp.task('watch:images', () =>
    gulp.watch(path.watch.images, ['imagemin'])
);

gulp.task('build', ['css', 'pug', 'js', 'imagemin']);

gulp.task('serve', ['build', 'watch:css', 'watch:pug', 'watch:js', 'watch:images', 'browser-sync']);