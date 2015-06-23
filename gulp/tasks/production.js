var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('production', ['karma'], function(){

  // This runs only if the karma tests pass
  gulp.start([
      'markup',
      'images',
      // to generate a font from svg, uncomment and follow steps in src/icons/README.md
      //'iconFont',
      'fonts',
      'minifyCss',
      'jshint',
      'uglifyJs'
  ]);

});
