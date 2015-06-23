/* browserify task
 ---------------
 Bundle javascripty things with browserify!

 This task is set up to generate multiple separate bundles, from
 different sources, and to use Watchify when run from the default task.

 See browserify.bundleConfigs in gulp/config.js
 */

var browserify = require('browserify');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var mergeStream = require('merge-stream');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var config = require('../config').browserify;
var _ = require('lodash');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var browserifyTask = function (devMode) {

    var browserifyThis = function (bundleConfig) {

        if (devMode) {
            // Add watchify args and debug (sourcemaps) option
            _.extend(bundleConfig, watchify.args, {debug: true});
        }

        var b = browserify(bundleConfig);

        var bundle = function () {
            var outputName = bundleConfig.outputName;
            var minifiedName;

            if (outputName.substring(outputName.length - 3) === '.js') {
                minifiedName = outputName.substring(0, outputName.length - 3) + '.min.js';
            } else {
                minifiedName = outputName + '.min.js';
            }

            // Log when bundling starts
            bundleLogger.start(bundleConfig.outputName);

            return b
                .bundle()
                // Report compile errors
                .on('error', handleErrors)
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specify the
                // desired output filename here.
                .pipe(source(outputName))
                .pipe(gulp.dest(bundleConfig.dest))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .on('error', gulpUtil.log)
                .pipe(sourcemaps.write('./'))
                .pipe(rename(minifiedName))
                .pipe(gulp.dest(bundleConfig.dest))
                .pipe(browserSync.reload({
                    stream: true
                }));
        };

        if (devMode) {
            // Wrap with watchify and rebundle on changes
            b = watchify(b);
            // Rebundle on update
            b.on('update', bundle);
            bundleLogger.watch(bundleConfig.outputName);
        }

        // Sort out shared dependencies.
        // b.require exposes modules externally
        if (bundleConfig.require) {
            b.require(bundleConfig.require);
        }
        // b.external excludes modules from the bundle, and expects
        // they'll be available externally
        if (bundleConfig.external) {
            b.external(bundleConfig.external);
        }

        return bundle();
    };

    // Start bundling with Browserify for each bundleConfig specified
    return mergeStream.apply(gulp, _.map(config.bundleConfigs, browserifyThis));

};

gulp.task('browserify', function () {
    return browserifyTask()
});

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask;
