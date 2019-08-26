const path = require('path');
module.exports = {
    mode:'production',
    entry: {
        main: './src/index.js'
    },
    // 当你封装的库引入了别的库时如：lodash,这个配置可以让打包时不打包你指定的库
    externals:['lodash'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'library.js',
        // 加上这个参数别人就可以在用script src='library.js'这样引用了，并且引用时:library.math
        library:'library',
        // 加上这个参数的意思，你打包生成的文件别人引用时不管是使用es module还是commonJs,还是amd的语法都能引用
        libraryTarget:'umd'
    }
}