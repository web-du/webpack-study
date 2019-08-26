const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	// 分割代码的配置，可以打包的时候把你的业务代码与插件代码分开
	optimization: {
		splitChunks: {
			// 配置代码分割时对所有类型代码有效
			chunks: 'all',
			// 需分割的代码的最小字节数
			minSize: 30000,
			// 当一个模块被用了至少多少次时才对他进行代码分割
      minChunks: 1,
      maxAsyncRequests: 5,
			maxInitialRequests: 3,
			// 分割后的js文件名的连接符
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
					// 检查你引用的库是不是在node_modules中，当你需分割的代码不在node_modules中时会走下面的default的配置。
          test: /[\\/]node_modules[\\/]/,
					priority: -10,
					// 当你加载同步的代码时，会把你引用的js库打包到下面你配置的js文件中
          // filename: 'vendors.js',
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}