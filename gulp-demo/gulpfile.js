// 失败的话： 1.npm link gulp
//2.最后一个default把教的[]去掉改成gulp.series()

//引用gulp模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
//建立任务 gulp.task 
//1.任务的名称 2.任务的回调函数 
//执行first任务时 回调函数就可被执行
gulp.task('first', () => {
    console.log('First gulp in my life');
    //1.使用gulp.src获取要处理的文件 写上文件的路径和名字
    gulp.src('./src/css/base.css')
        //把它输出到另外一个文件上去
        .pipe(gulp.dest('dist/css'));
});

//html 任务
//1.html文件代码压缩操作
//2.抽取html的公共代码
gulp.task('htmlmin', () => {
    return gulp.src('./src/*.html')
        //把公共代码抽取出来
        .pipe(fileinclude())
        //压缩html文件中的代码
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))

})

//css任务：
//1.less语法转换
//2.css代码压缩
gulp.task('cssmin', () => {
    //选择css目录下的所有less文件以及css文件
    return gulp.src(['./src/css/*.less', './src/css/*.css'])
        //将less语法转换为css语法
        .pipe(less())
        //将css代码进行压缩
        .pipe(csso())
        //将处理的结果进行输出
        .pipe(gulp.dest('dist/css'))
})

//js任务 
//1.es6代码转换
//2.代码压缩
gulp.task('jsmin', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            //判断当前代码的运行环境 将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

//lib文件夹和images文件夹拷贝到dist里边
gulp.task('copy', () => {
    return gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'))
    return gulp.src('./src/lib/*')
        .pipe(gulp.dest('dist/lib'))
})

//构建任务  执行default任务时，要依次执行后边的任务
gulp.task('default', gulp.series('htmlmin', 'cssmin', 'jsmin', 'copy'));