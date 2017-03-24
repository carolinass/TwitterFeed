"use strict";

// Loading Gulp and its plugins
var del = require( 'del' ),
    gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    mkdirp = require( 'mkdirp' );

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
