const path = require('path');
module.exports = {
    mode:'development',
    entry: {
        main:'./src/index.js'
    },
    module: {
        rules:[
            {
                test:/\.js/,
                use:[
                    {
                        loader:path.resolve(__dirname,'../loaders/replaceLoader.js'),
                        options:{
                            name:'web_du'
                        }
                    }
                ]
            }
        ]
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    }
}