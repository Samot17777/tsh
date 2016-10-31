"use strict";

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	minify = require('gulp-minify'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer');;

gulp.task('sass',function(){
	return 	gulp.src('./src/scss/main.scss')
			.pipe(maps.init())
			.pipe(plumber())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
			browsers: ['last 40 version','> 0.1%', 'IE 9'],
			cascade: false
			}))
			.pipe(maps.write('./'))
			.pipe(gulp.dest('./public/css'));

});

gulp.task('uglify',['jshint'],function(){
	return 	gulp.src([
		'src/js/app.js',
		'src/js/filters/*.js',
		'src/js/services/*.js',
		'src/js/directives/*.js',
		'src/js/controllers/*.js'])
			.pipe(concat('all.js'))
			// .pipe(minify()) UNCOMMENT TO MINIFY
			.pipe(gulp.dest('./public/js'))
			.pipe(notify({ message: 'Uglify and jshint Finished',onLast: true}));
});

gulp.task('jshint',function(){
	return 	gulp.src(['src/js/filters/*.js','src/js/controllers/*.js','src/js/directives/*.js','src/js/services/*.js','src/js/appRoutes.js','src/js/app.js'])
				.pipe(plumber())
			  .pipe(jshint('.jshintrc'))
			  .pipe(jshint.reporter('jshint-stylish'))
			  .pipe(jshint.reporter('fail'))
			  .on('error', notify.onError({ message: 'JS hint fail'}));
	
});
gulp.task('libjs',function(){
	return 	gulp.src(['node_modules/angular/angular.js'])
			.pipe(concat('libs.js'))
			// .pipe(minify()) UNCOMMENT TO MINIFY
			.pipe(gulp.dest('./public/js'));
});

gulp.task("default",['libjs','uglify','sass'], function(){
		gulp.watch('src/scss/**/*scss',["sass"]);
		gulp.watch(['src/js/filters/*.js','src/js/controllers/*.js','src/js/directives/*.js','src/js/services/*.js','src/js/appRoutes.js','src/js/app.js'],["uglify"]);
});

