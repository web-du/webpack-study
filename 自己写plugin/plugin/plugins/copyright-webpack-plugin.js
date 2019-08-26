// loader是一个函数，
// plugin是一个类
class CopyrightWebpackPlugin {
    // constructor (options) {
    //     console.log("插件被使用了",options)
    // }
    apply(compiler) {
        // 当你打包完成放入出口文件夹的时刻
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(compilation,cb) => {
            compilation.assets['copyright.txt'] = {
                source:function () {
                    return 'copyright by web_du'
                },
                size:function () {
                    return 30;
                }
            };
            cb();
        })
    }
}

module.exports = CopyrightWebpackPlugin;