//引入gulp
var gulp = require("gulp");
//引入压缩html文件插件
var htmlClean = require("gulp-htmlclean");
//引入压缩图片文件插件
var imageMin = require("gulp-imagemin");
//引入压缩js文件插件
var uglify = require("gulp-uglify");
//引入去掉js里面调试语句插件
var stripDebug = require("gulp-strip-debug");
//引入链接js文件的插件
var concat = require("gulp-concat");
//引入less转换css的插件
var less = require("gulp-less");
//引入解决css动画兼容问题的插件
var postcss = require("gulp-postcss");
//引入压缩css代码的插件
var autoprefixer = require("autoprefixer");
//引入压缩css代码的插件
var cssnano = require("cssnano");
//引入启动本地服务器的插件
var connect = require("gulp-connect");
console.log(process.env.NODE_ENV == "development")

var devMode = process.env.NODE_ENV == "development";
var watch = require('gulp-watch');


//判断当前是开发环境还是生产环境 输出为true是开发环境，输出为false为生产环境


// gulp.src()//读文件
// gulp.dest()//写文件
// gulp.task()//创建任务
// gulp.watch()


//配置路径
var folder = {
    src: "src/", //开发目录文件夹
    dist: "dist/" //压缩打包后目录文件夹
}


//创建压缩html文件任务
gulp.task("html", function() {
    //取文件
    var page = gulp.src(folder.src + "html/*")
        //html文件改变时浏览器热刷新
    page.pipe(connect.reload())
        //判断是否为开发环境，如果是，则不压缩代码
    if (!devMode) {
        //压缩html文件
        page.pipe(htmlClean())
    }
    //写入文件
    page.pipe(gulp.dest(folder.dist + "html/"))
})

////创建压缩图片任务
gulp.task("images", function() {
        //取图片
        gulp.src(folder.src + "images/*")
            //images文件改变时浏览器热刷新
            .pipe(connect.reload())
            //压缩图片
            .pipe(imageMin())
            //写入文件
            .pipe(gulp.dest(folder.dist + "images/"))
    })
    //创建压缩js文件任务
gulp.task("js", function() {
        //取js文件
        var page = gulp.src(folder.src + "js/*")
            //js文件改变时浏览器热刷新
        page.pipe(connect.reload());
        //判断是否为开发环境，如果是，则不压缩代码
        if (!devMode) {
            //压缩之前去掉调试语句
            page.pipe(stripDebug())
                // //拼接js文件concat("合并之后的文件名")
                // page.pipe(concat('main.js'))
                //压缩js文件
            page.pipe(uglify())
        }
        //写入文件
        page.pipe(gulp.dest(folder.dist + "js/"))
    })
    //创建压缩转义css文件任务
gulp.task("css", function() {
    var css = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less());

    var options = [autoprefixer()];
    if (!devMode) {
        options.push(cssnano())
    }

    css.pipe(postcss(options))
        .pipe(gulp.dest(folder.dist + "css/"))
        //把加前缀和压缩代码的操作放到一个options数组里方便一起执行
        //var options = [autoprefixer(), cssnano()];
        //取css文件
        //var page = gulp.src(folder.src + "css/*");
        //less转换成css文件
        //page.pipe(less());
        //css文件改变时浏览器热刷新
        //page.pipe(connect.reload());
        //判断是否为开发环境，如果是，则不压缩代码
        // console.log(devMode);
        // if (!devMode) {
        //     //通过postcss执行加前缀和压缩代码的操作
        //     page.pipe(postcss(options));
        // }

    // //写入文件
    // page.pipe(gulp.dest(folder.dist + "css/"))

})




//创建监听任务
gulp.task("watch", function() {
    watch(folder.src + "html/*", gulp.parallel('html'));
    watch(folder.src + "js/*", gulp.parallel('js'));
    watch(folder.src + "css/*", gulp.parallel('css'));
    watch(folder.src + "images/*", gulp.parallel('images'));
    // gulp.watch(folder.src + "html/*", ['html']).on('change', browserSync.reload);
    // gulp.watch(folder.src + "html/*", ["html"]);
    // //监听html的变化 并压缩导处
    // gulp.watch(folder.src + "html/*", function() {
    //     //取文件
    //     var page = gulp.src(folder.src + "html/*")
    //         //html文件改变时浏览器热刷新
    //         .pipe(connect.reload())
    //         //判断是否为开发环境，如果是，则不压缩代码
    //     if (!devMode) {
    //         //压缩html文件
    //         page.pipe(htmlClean())
    //     }
    //     //写入文件
    //     page.pipe(gulp.dest(folder.dist + "html/"))
    // });
    // //监听images的变化 并压缩导处
    // gulp.watch(folder.src + "images/*", function() {
    //     //取图片
    //     gulp.src(folder.src + "images/*")
    //         //images文件改变时浏览器热刷新
    //         .pipe(connect.reload())
    //         //压缩图片
    //         .pipe(imageMin())
    //         //写入文件
    //         .pipe(gulp.dest(folder.dist + "images/"))
    // });
    // //监听js文件的变化 并压缩导处
    // gulp.watch(folder.src + "js/*", function() {
    //     //取js文件
    //     var page = gulp.src(folder.src + "js/*")
    //         //js文件改变时浏览器热刷新
    //         .pipe(connect.reload())
    //         //判断是否为开发环境，如果是，则不压缩代码
    //     if (!devMode) {
    //         //压缩之前去掉调试语句
    //         page.pipe(stripDebug())
    //             // //拼接js文件concat("合并之后的文件名")
    //             // page.pipe(concat('main.js'))
    //             //压缩js文件
    //         page.pipe(uglify())
    //     }
    //     //写入文件
    //     page.pipe(gulp.dest(folder.dist + "js/"))
    // });
    // //监听css文件的变化 并转义压缩到处
    // gulp.watch(folder.src + "css/*", function() {
    //     console.log(454)
    //         //把加前缀和压缩代码的操作放到一个options数组里方便一起执行
    //     var options = [autoprefixer(), cssnano()];
    //     //取css文件
    //     var page = gulp.src(folder.src + "css/*")
    //         //less转换成css文件
    //         .pipe(less())
    //         //css文件改变时浏览器热刷新
    //         .pipe(connect.reload())
    //         //判断是否为开发环境，如果是，则不压缩代码
    //     if (!devMode) {
    //         //通过postcss执行加前缀和压缩代码的操作
    //         page.pipe(postcss(options))
    //     }
    //     //写入文件
    //     page.pipe(gulp.dest(folder.dist + "css/"))
    // });
})

//创建启动服务器的任务
gulp.task("server", function() {
        //启动本地服务器
        connect.server({
            //设置端口号
            port: "8090",
            //设置浏览器热刷新
            livereload: true
        });
    })
    //可以设置并行默认任务
gulp.task('default', gulp.parallel('html', 'images', 'js', 'css', 'watch', 'server', function() {
    // Build the website.
    console.log('12112')
}));