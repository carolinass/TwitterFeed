"use strict";

// Loading Gulp and its plugins
var del = require( 'del' ),
    gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    connect = require('gulp-connect'),
    mkdirp = require( 'mkdirp' ),
    karmaServer = require('karma').Server;

// Control variables
var paths = {
    devCompiledCssPath: './src/styles/compiled/',
    destFontsFolder: 'styles/fonts/',
    styles: [
        './src/styles/sass/*.scss',
        './src/styles/sass/**/*.scss'
    ]
};

gulp.task( 'sass-styles', function ( ) {
    mkdirp( paths.devCompiledCssPath );

    del( [
        paths.devCompiledCssPath + '/*'
    ] );

    return gulp
        .src( paths.styles )
        .pipe( sass( )
            .on( 'error', sass.logError ) )
        .pipe( gulp.dest( paths.devCompiledCssPath ) );
} );

gulp.task( 'sass-styles:watch', function ( ) {
    gulp.start( 'sass-styles' );
    gulp.watch(
        paths.styles, [ 'sass-styles' ]
    );
} );

gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('webserver', function() {
  connect.server({
    port: 8000
  });
});
 
gulp.task('run', ['sass-styles', 'webserver']);
