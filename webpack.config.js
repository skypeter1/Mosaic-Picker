var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
	entry : './src/app.js',
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: 'app.bundle.js'
	},
	module : {
		rules: [
			{
				test: /\.scss$/, 
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader','sass-loader'],
					publicPath: '/dist'
				})
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000,
		stats: "errors-only",
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
	    	title: 'Change Title to test webpack',
	    	minify: {
	    		collapseWhitespace: true
	    	},
	    	hash: true,
	    	template: './src/index.html', // Load a custom template (lodash by default see the FAQ for details)
	  }),
		new ExtractTextPlugin({
			filename: 'app.css',
			disabled: false,
			allChunks: true
		})
	]
}