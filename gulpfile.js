let gulp = require('gulp'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver'),
    path = {
        views: 'app/views/**/*.pug',
        index: 'app/views/index.pug',
        scripts: 'app/assets/scripts/**/*.js',
        styles: 'app/assets/styles/**/*.less',
        resources: 'app/resources/**/*.*',
        jshintrc: '.jshintrc',
        public: 'public',
        dest: {
            scripts: '/assets/scripts',
            'styles': '/assets/styles',
            'resources': '/resources'
        }
    };

function compilePugsTask() {
    return gulp.src(path.views)
        .pipe(pug())
        .pipe(gulp.dest(path.public))
}

function compileLessTask() {
    return gulp.src(path.styles)
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(path.public + path.dest.styles))
}

function concatLocalJSTask() {
    return gulp.src(path.scripts)
        .pipe(jshint(path.jshintrc))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(path.public + path.dest.scripts))
}

function concatVendorJSTask() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-animate/angular-animate.min.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(path.public + path.dest.scripts));
}

function concactVendorCSSTask() {
    return gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/animate.css/animate.min.css'
    ])
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(path.public + path.dest.styles));
}

/* 
    Browsers like Safari will display a console error if it can not find the map files.
    Even though this application designed to run on mobile devices, it's better to ensure
    that it will run without problems in any kind of render.
*/
function copyVendorJSMapTask() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js.map',
        './bower_components/angular/angular.min.js.map',
        './bower_components/angular-animate/angular-animate.min.js.map'
        ])
        .pipe(gulp.dest(path.public + path.dest.scripts));
}

function copyVendorCSSMapTask() {
    return gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css.map'
    ])
    .pipe(gulp.dest(path.public + path.dest.styles));
}

function copyResourcesTask() {
    return gulp.src(path.resources)
        .pipe(gulp.dest(path.public + path.dest.resources))
}

function injectTask() { 
    let sources = gulp.src([
        path.public + '/assets/styles/vendor.min.css',
        path.public + '/assets/styles/main.min.css',
        path.public + '/assets/scripts/vendor.min.js',
        path.public + '/assets/scripts/app.js'
    ], {read: false })

    return gulp.src(path.index)
        .pipe(inject(sources, {addRootSlash: false, ignorePath: path.public}))
        .pipe(pug())
        .pipe(gulp.dest(path.public));
}

function webserverTask() {
    gulp.src(path.public)
        .pipe(webserver({
            livereload: true,
            host: '0.0.0.0'
        }));
}

// Optmize files watching
function watchTask() {
    gulp.watch([
        path.views, 
        path.styles, 
        path.scripts
        ],['inject']);
}

gulp.task('compilePugs', compilePugsTask);
gulp.task('concatLocalJS', concatLocalJSTask);
gulp.task('compileLess', compileLessTask);
gulp.task('copyVendorJSMap', copyVendorJSMapTask);
gulp.task('concatVendorJS', ['copyVendorJSMap'], concatVendorJSTask);
gulp.task('copyVendorCSSMap', copyVendorCSSMapTask);
gulp.task('concactVendorCSS', ['copyVendorCSSMap'], concactVendorCSSTask);
gulp.task('copyResources', copyResourcesTask);
gulp.task('inject', ['compilePugs', 'compileLess', 'concatLocalJS', 'concatVendorJS', 'concactVendorCSS', 'copyResources'], injectTask);
gulp.task('webserver', ['inject'], webserverTask);
gulp.task('watch', ['inject'], watchTask);
gulp.task('default', ['inject'], null);
