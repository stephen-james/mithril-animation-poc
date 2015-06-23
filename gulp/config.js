var dest = './build';
var src = './src';

module.exports = {
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    sass: {
        src: src + '/sass/**/*.{sass,scss}',
        dest: dest,
        settings: {
            indentedSyntax: true, // Enable .sass syntax!
            imagePath: 'images' // Used by the image-url helper
        }
    },
    images: {
        src: src + '/images/*.{bmp,png,jpg,gif,webp,svg,ico}',
        dest: dest + '/images'
    },
    markup: {
        src: src + '/htdocs/**',
        dest: dest
    },
    fonts: {
        src: src + '/fonts/*.{eot,svg,ttf,woff}',
        dest: dest + '/fonts'
    },
    iconFonts: {
        name: 'Gulp Starter Icons',
        src: src + '/icons/*.svg',
        dest: dest + '/fonts',
        sassDest: src + '/sass',
        template: './gulp/tasks/iconFont/template.sass.swig',
        sassOutputName: '_icons.sass',
        fontPath: 'fonts',
        className: 'icon',
        options: {
            fontName: 'Post-Creator-Icons',
            appendCodepoints: true,
            normalize: false
        }
    },
    jshint: {
        src: src + '/**/*.js',
        settings: '.jshintrc'
    },
    browserify: {
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/javascript/vendor.js',
            dest: dest,
            outputName: 'vendor.js',
            // list of modules to make require-able externally
            require: ['underscore', 'mithril']
        }, {
            entries: src + '/javascript/app.js',
            dest: dest,
            outputName: 'app.js',
            // list of externally available modules to exclude from the bundle
            external: ['underscore']
        }]
    },
    production: {
        cssSrc: dest + '/*.css',
        jsSrc: dest + '/*.js',
        dest: dest
    }
};
