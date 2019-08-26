const path = require('path');
module.exports = {
    mode:'production',
    entry:{
        main:'./src/index.tsx'
    },
    module:{
        rules:[{
            test:/\.tsx?$/, // 打包typescript语法要下载ts-loader,typescript两个模块，并且要在根路径下创建tsconfig.json文件
            use:'ts-loader',
            exclude:/node_modules/
        }]
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}