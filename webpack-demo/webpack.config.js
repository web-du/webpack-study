const path = require('path');
module.exports = {
    // 打包的模式,如果没有填写默认为production:打包后的代码是压缩的，还有一种为development模式，打包的代码不是压缩的
    mode: 'development',
    // 项目打包的入口文件
    // entry: './src/index.js',// 这是简写
    entry: {
        main: './src/index.js'
    },
    // 打包完成后的相关配置
    output: {
        // 打包后的文件名
        filename: 'bundle.js',
        // 打包后的文件存放的位置，为绝对路径，得引入node得核心模块path,调用resolve方法，其中__dirname指的是当前webpack.confih.js所在的路径,与后面的‘boundle’结合就是把打包生成的bundle.js文件放到与webpack.config.js同级的boundle目录下,一般会把文件夹的名字默认取为dist文件夹
        path: path.resolve(__dirname, 'dist')
    }
}