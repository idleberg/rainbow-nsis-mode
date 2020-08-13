// Dependencies
const concat = require('gulp-concat');
const debug  = require('gulp-debug');
const gulp   = require('gulp');
const uglify = require('gulp-uglify');

// File definitions
const jsFiles = [
    './node_modules/rainbow-code/dist/rainbow.js',
    './src/nsis.js'
];

const options = {
    mangle: false,
    nameCache: null,
    output: {
        comments: /^!/
    }
};

// Build custom Rainbow version with NSIS
gulp.task('build:pack', (done) => {
    gulp.src(jsFiles, {allowEmpty: true})
        .pipe(concat('rainbow.pack.js'))
        .pipe(uglify(options))
        .pipe(gulp.dest('dist'));
    done();
});

// Build uglified NSIS mode
gulp.task('build:mode', (done) => {
    gulp.src('./src/nsis.js')
        .pipe(concat('nsis.min.js'))
        .pipe(uglify(options))
        .pipe(gulp.dest('dist'));
    done();
});

// Available tasks
gulp.task('build', gulp.parallel('build:mode', 'build:pack', (done) => {
  done();
}));
