const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseUrl = path.resolve(__dirname, 'dist');

let config = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: baseUrl,
		libraryTarget: 'var',
		library: 'App',
	},
	devServer: {
		host: '0.0.0.0',
		port: 8090
	},
	watch: false,
	watchOptions: {
		ignored: [ './node_modules' ]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.html' }),
		new CopyPlugin([
			{ from: './src/assets', to: 'assets', ignore: ['scss/{**/*,*}'] },
			{ from: './src/app/main-page/main-page.html', to: 'views/main-page.html' },
			{ from: './src/app/about-me/about-me.html', to: 'views/about-me.html' },
			{ from: './src/app/my-skills/my-skills.html', to: 'views/my-skills.html',  },
			{ from: './src/app/talk-me/talk-me.html', to: 'views/talk-me.html'  },
			{ from: './src/app/my-works/my-works.html', to: 'views/my-works.html' }
		])
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css|ttf|eot|svg|png|jpg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: 'src'
						}
					}
				]
			},
			{
				test:/\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader" 
				]
			}
		]
	}
};
module.exports = config;