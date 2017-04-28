let gulp = require('gulp'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    path = {
        views: 'app/views/**/*.pug',
        index: 'app/views/index.pug',
        scripts: 'app/assets/scripts/**/*.js',
        public: 'public',
        dest: {
            scripts: '/assets/scripts',
            'styles': '/assets/styles'
        }
    };

function compilePugsTask() {
    return gulp.src(path.views)
        .pipe(pug())
        .pipe(gulp.dest(path.public))
}

function concatVendorJSTask() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/angular/angular.min.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(path.public + path.dest.scripts));
}

function concactVendorCSSTask() {
    return gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(path.public + path.dest.styles));
}

function concatJSTask() {
    return gulp.src(path.scripts)
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(path.public + path.dest.scripts))
}

function injectTask() { 
    let sources = gulp.src([
        path.public + '/assets/styles/vendor.min.css',
        path.public + '/assets/scripts/vendor.min.js',
        path.public + '/assets/scripts/app.js'
    ], {read: false })

    return gulp.src(path.index)
        .pipe(inject(sources, {addRootSlash: false, ignorePath: path.public}))
        .pipe(pug())
        .pipe(gulp.dest(path.public));
}

gulp.task('compilePugs', compilePugsTask);
gulp.task('concatJS', concatJSTask);
gulp.task('concatVendorJS', concatVendorJSTask);
gulp.task('concactVendorCSS', concactVendorCSSTask);
gulp.task('inject', ['compilePugs', 'concatJS', 'concatVendorJS', 'concactVendorCSS'], injectTask);

gulp.task('default', ['inject'], null);
