var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry : './src/app.js',
	output: {
		path: __dirname + '/dist',
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