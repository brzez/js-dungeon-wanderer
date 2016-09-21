import gulp from 'gulp'
import nodemon from 'gulp-nodemon'

import {clientConfig, serverConfig} from './rollup.config.js'

let rollup = require('rollup');

let runRollup = function(config) {
    return rollup.rollup(config).then(function(bundle) {
        bundle.write({
            dest: config.dest,
            format: config.format || 'es'
        })
    }, (err) => console.log(err));
}

gulp.task('build', function(done) {
    Promise.all([
        runRollup(clientConfig),
        runRollup(serverConfig)
    ]).then(() => done());
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['build']);
})
gulp.task('nodemon', function() {
    nodemon({
        script: './server.js'
    })
})

gulp.task('dev', ['build', 'watch', 'nodemon'])

gulp.task('default', ['build', 'watch'])
