import gulp from 'gulp'
import nodemon from 'gulp-nodemon'

import {clientConfig, serverConfig} from './rollup.config.js'

let rollup = require('rollup');
let stylus = require('gulp-stylus');
let cleanCSS = require('gulp-clean-css');

let runRollup = function(config) {
    return rollup.rollup(config).then(function(bundle) {
        bundle.write({
            dest: config.dest,
            format: config.format || 'es'
        })
    }, (err) => console.log(err));
}

gulp.task('stylus:build', function () {
  return gulp.src('./stylus/index.styl')
    .pipe(stylus())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('stylus:watch', function() {
    gulp.watch('./stylus/**/*', ['stylus:build']);
})

gulp.task('js:build', function(done) {
    Promise.all([
        runRollup(clientConfig),
        runRollup(serverConfig)
    ]).then(() => done());
});

gulp.task('js:watch', function() {
    gulp.watch('src/**/*', ['js:build']);
})
gulp.task('nodemon', function() {
    nodemon({
        script: './server.js'
    })
})

gulp.task('dev', ['build', 'stylus:watch', 'js:watch', 'nodemon'])

gulp.task('build', ['stylus:build', 'js:build']);

gulp.task('default', ['js:build', 'js:watch'])
