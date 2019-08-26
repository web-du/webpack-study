const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。 只需添加插件到你的 webpack 配置中。
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 开启模块热替换需要引入webpack，webpack有一个内置的插件
const webpack = require('webpack');
module.exports = {
    // 打包的模式,如果没有填写默认为production:打包后的代码是压缩的，还有一种为development模式，打包的代码不是压缩的
    mode: 'development',
    // 在production 下一般用'cheap-module-source-map
    // 当你js有错误时，source-map会提示你的js具体哪行有错误，
    // 当devtool:'none'时，只会报打包后的错误，很难排查。
    // 一般建议为'cheap-module-eval-source-map'，这个模式性能较好。
    devtool:'cheap-module-eval-source-map',
    // 项目打包的入口文件
    // entry: './src/index.js',// 这是简写
    entry: {
        main: './src/index.js'
    },
    // 如果我想打包两次
    // entry: {
    //     main: './src/index.js',
    //     sub: './src/index.js'
    // },
    // 在本地起一个服务，需要安装webpack-dev-server
    devServer: {
        // 因为我们的打包文件的位置在dist目录下，所以我们的服务可以起在dist目录下
        contentBase:'./dist',
        // 启动服务时，自动跟你打开服务器
        open:true,
        // 默认的端口号
        // port:8080,
        // 跨域的代理：当用户访问你的服务下的/api时其实会给你访问的是后面的地址
        // proxy:{
        //     '/api': {
        //           targer:'http://localhost:3000',
        //          如果你请求的网站是https的网站
        //          secure:false,
        //          防止有的网站禁止代理转发
        //          changeOrigin"true
        // }
        // 开启模块热替换的功能
        hot:true,
        // 即使模块热替换功能没有生效，也不让浏览器重新刷新
        hotOnly:true
    },
    // module里面的配置选项决定了如何处理项目中的不同类型的模块。
    module: {
        // 打包的规则，告诉webpack不同的文件类型已什么样的方式打包。
        rules: [
            {
                // 匹配需要打包的文件名后缀，多个用括号括起来
                // test:/\.jpg$/,
                test:/\.(jpg|png|gif)$/,
                use: {
                    // loader:'file-loader',
                    // url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。url-loader会把图片已base64的格式放到你打包后的js文件中。
                    loader:'url-loader',
                    options: {
                        // 希望打包出来的图片的名字是之前图片的名字，后缀也是之前图片的后缀
                        name: '[name].[ext]',
                        // 打包后的文件输出目录
                        outputPath:'images/',
                        // limit限制图片转化为base64的大小，当图片大于1024(1kB)字节时，url-loader会像file-loader一样，把图片打包到用户配置的指定的目录下。
                        limit:102400
                    }
                }
            },{
                // 当需要打包的文件是css时，我们需要多个loader,则下面的use需改为数组。
                // test: /\.css$/,
                // 当需要打包的文件是scss等样式文件时还需要借助其他额外的loader把scss翻译成css.
                test: /\.scss$/,
                // css-loader主要作用是根据多个css文件之间的关系，把多个css最后合并成一个css,
                // style-loader的作用是，得到css-loader的css后会把内容挂载到html页面的header部分。
                // use:['style-loader','css-loader']
                // 多个loader的执行顺序是从下到上，从右到左。
                // 当需要用到css3属性时，前面加上兼容性的前缀是很麻烦得到。可以用到postcss-loader帮你自动的添加。需要在本地创建postcss.config.js的配置文件。
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options: {
                            // 当你需要的scss文件中有引入的其他的scss文件，加上该配置，则使得引入的scss也要从postcss-loader开始从右往左执行loader.
                            importLoaders:2,
                            // 开启css的模块化打包(引用css时可以import xxx from 'xxx')
                            modules:true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },{
                test: /\.css$/,
                // css-loader主要作用是根据多个css文件之间的关系，把多个css最后合并成一个css,
                // style-loader的作用是，得到css-loader的css后会把内容挂载到html页面的header部分。
                // use:['style-loader','css-loader']
                // 多个loader的执行顺序是从下到上，从右到左。
                // 当需要用到css3属性时，前面加上兼容性的前缀是很麻烦得到。可以用到postcss-loader帮你自动的添加。需要在本地创建postcss.config.js的配置文件。
                use:[
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
            }
        ]
    },
    // 打包完成后的相关配置
    output: {
        // 打包后的文件名
        // filename: 'dist.js',
        filename: '[name].js',
        // 如果打包多个文件
        // filename: '[name].js',
        // 如果你的最后的路径是cdn上的路径，
        // publicPath:'http://cdn.com.cn',
        // 打包后的文件存放的位置，为绝对路径，得引入node得核心模块path,调用resolve方法，其中__dirname指的是当前webpack.confih.js所在的路径,与后面的‘boundle’结合就是把打包生成的bundle.js文件放到与webpack.config.js同级的boundle目录下,一般会把文件夹的名字默认取为dist文件夹
        path: path.resolve(__dirname, 'dist')
    },
    // 插件是 webpack 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！插件目的在于解决 loader 无法实现的其他事。
    // new CleanWebpackPlugin() 这个插件可以在我们每次打包之前删除dist目录下的内容。
    plugins: [
        new HtmlWebpackPlugin({template:'src/index.html'}),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}