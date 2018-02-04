var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var path = require("path");

var isProd = process.env.NODE_ENV === "production"; //true or false
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd =  ExtractTextPlugin.extract({
	fallbackLoader: 'style-loader',
	loader: ['css-loader','sass-loader'],
	publicPath: '/dist'
})
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry : {
		app: './src/app.js',
		contact: './src/contact.js'
	}, 
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: '[name].bundle.js'
	},
	module : {
		rules: [
			{
				test: /\.scss$/,
				use: cssConfig
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: [
					"html-loader", 
					"pug-html-loader"
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					//"file-loader?name=images/[name].[ext]",
					"file-loader?name=[name].[ext]&outputPath=images/&publicPath=./",
					//"image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
				]
			},
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000,
		stats: "errors-only",
		open: true,
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
	    	title: 'Change Title to test webpack',
			hash: true,
			excludeChunks: ['contact'],
			filename: 'index.html',
			template: './src/index.html',
			/* Uncomment to use pug template
			template: './src/index.pug',
			*/
	  }),
		  
	  new HtmlWebpackPlugin({
		title: 'Contact Page',
			// minify: {
			// 	collapseWhitespace: true
			// },
			hash: true,
			chunks: ['contact'],
			filename: 'contact.html',
			template: './src/contact.html', // Load a custom template (lodash by default see the FAQ for details)
  		}),

		new ExtractTextPlugin({
			filename: 'app.css',
			disabled: !isProd,
			allChunks: true
		}),

		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
	]
}