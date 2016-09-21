import gulp from 'gulp'

import {clientConfig, serverConfig} from './rollup.config.js'

let rollup = require('rollup');

let runRollup = function(config) {
    return rollup.rollup(config).then(function(bundle) {
        bundle.write({
            dest: config.dest
        })
    });
}

gulp.task('build', function() {
    runRollup(clientConfig);
    runRollup(serverConfig);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['build']);
})

gulp.task('default', ['build', 'watch'])
