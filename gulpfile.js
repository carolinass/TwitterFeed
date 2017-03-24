"use strict";

// Loading Gulp and its plugins
var del = require( 'del' ),
    gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    connect = require('gulp-connect'),
    mkdirp = require( 'mkdirp' ),
    karmaServer = require('karma').Server,
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    jsdoc = require('gulp-jsdoc3');

// Control variables
var paths = {
    jsFilesSrc: 'src/js/**/*js',
    devCompiledCssPath: './src/styles/compiled/',
    destFontsFolder: 'styles/fonts/',
    distJsFolder: './dist/js',
    styles: [
        './src/styles/sass/*.scss',
        './src/styles/sass/**/*.scss'
    ]
};

gulp.task('js-uglify', function(){
    return gulp.src(paths.jsFilesSrc)
        .pipe(gp_concat('app.concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_rename('app.uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest(paths.distJsFolder));
});

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

gulp.task('js-doc', function (cb) {
    gulp.src(paths.jsFilesSrc)
      .pipe(jsdoc(cb))
});

gulp.task('webserver', function() {
  connect.server({
    port: 8000
  });
});
 
gulp.task('run', ['sass-styles', 'webserver']);
