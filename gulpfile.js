const gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require("gulp-watch"),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    browsersync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    minimist = require('minimist'),
    htmlmin = require("gulp-htmlmin"),
    GulpSSH = require('gulp-ssh'),
    del = require('del'),
    renderFun = require('./bin/render.js'),
    server = require('./src/conf/server.config.js');

const path = {
    cssfolder: './src/static/css/',
    cssout: './dist/front/static/css',
    css: './src/static/css/**/*.css',
    less: './src/static/less/**/*.less',
    htmlout: './dist/front/views',
    html: './src/views/html/**/*.html',
    jsout: './dist/front/static/js',
    js: './src/static/js/**/*.js',
    datout: './dist/front/data',  /*mock数据*/
    dat: './src/data/**/*.js',   
    imageout: './dist/front/static/images',
    image: './src/static/images/**/*',
    publicout: './dist/front/public',
    public: './src/public/**/*',
    confout: './dist/front/conf',
    conf: './src/conf/**/*',
    dist: './dist/front/views/index.html'
};

// NODE_ENV 跨平台的设置及使用环境变量 
// const env = process.env.NODE_ENV || 'development'
// const condition = env === 'production'

//获取通过命令行传进来的值
const knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
  // default: { env: process.env.NODE_ENV || 'production' }
};

const options = minimist(process.argv.slice(2), knownOptions);
const env = options.env;
const condition = env === 'production'

//载入配置文件
const config = require(`./src/conf/ssh.config.js`);
const sshConfig = config.ssh;
//打开ssh通道
const gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: sshConfig
});

// console.log(sshConfig);

//组件和模板地址
const widgetPath = {
    dist: ['./dist/front/views/**/*']
}

// const widgetPath = {
//     src: ['./src/views/widget/**/*', './src/views/layout/**/*']
// }

const showError = function(err) {
    console.log('\n错误文件:', err.file, '\n错误行数:', err.line, '\n错误信息:', err.message);
}

//运行将
gulp.task('render', () => {
    renderFun();
    gulp.watch([widgetPath.dist]).on('change', function() {
        renderFun();
    })
})

//将html从src转到dist
var htmlOut = (htmlPath, htmlOutPath) => {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    return gulp.src(htmlPath)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(htmlOutPath))
}
gulp.task('html', function() {
    htmlOut(path.html, path.htmlout)
});


/*监听less文件，编译输出src/css目录*/
var lessCompile = (lessPath, cssFolder) => {
    return gulp.src(lessPath)
        .pipe(sourcemaps.init())
        .pipe(less(
        )).on('error', function(err) {
            showError(err)
        })
        .pipe(autoprefixer([
            'ie >= 9',
            'edge >= 20',
            'ff >= 44',
            'chrome >= 48',
            'safari >= 8',
            'opera >= 35',
            'ios >= 8'
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssFolder))
}
/* 转换less成css */
gulp.task('less', () => {
    lessCompile(path.less, path.cssfolder);
})

/*output dist/css*/
var cssOut = (cssPath, cssOutPath) =>
    gulp.src(cssPath)
    .pipe(cleancss({
        compatibility: 'ie8'
    }))
    .pipe(gulp.dest(cssOutPath))

/* 转移src下的css到dist，并压缩 */
gulp.task('css', ['less'], () => {
    cssOut(path.css, path.cssout)
})

/*output dist/script*/
var scriptOut = (jsPath, jsOutPath) => 
    gulp.src(jsPath)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(jsOutPath))

/* 转移src下的script到dist，并压缩 */
gulp.task('script', () => {
    scriptOut(path.js, path.jsout)
})

/* 转移src下的模拟接口数据到dist，并压缩 */
gulp.task('mockData', () => {
    scriptOut(path.dat, path.datout)
})

/* output images*/
var imagesOut = (imagePath, imageOutPath) => 
        gulp.src(imagePath)
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,         
        }))
        .pipe(gulp.dest(imageOutPath))

/* 转移src下的image到dist，并压缩 */
gulp.task('images', () => {
    imagesOut(path.image, path.imageout);
})

var publicOut = (publicPath, publicOutPath) => 
     gulp.src(publicPath)
        .pipe(gulp.dest(publicOutPath))

/* 转移src下的public到dist */
gulp.task('public', () => {
    publicOut(path.public, path.publicout)
})
/* 转移src下的conf到dist */
gulp.task('conf', () => {
    publicOut(path.conf, path.confout)
})

/* 上传文件 */ 
gulp.task('deployFile', ['execSSH'],() => {
    console.log('5s后开始上传文件...');
    setTimeout(function(){
        return gulp
            .src(['./**'])
            .pipe(gulpSSH.dest(config.remoteDir));
    },5000);
    
});

/* 执行命令 */ 
gulp.task('execSSH', () => {
    console.log('删除服务器上现有文件...');
    return gulpSSH.shell(config.commands, {filePath: 'commands.log'})
        .pipe(gulp.dest('logs'));
});

// ,'deployFile','execSSH'
gulp.task('output', ['html', 'css', 'script','mockData', 'images', 'public', 'conf'])
//最终产出
gulp.task('dist', ['output'])

/* 起服务，并监听各个资源，一旦有改动，就自动刷新页面 */
gulp.task('live', ['less', 'render'], function() {
    browsersync.init(server)
})
//启动服务
gulp.task('default', ['live']);
