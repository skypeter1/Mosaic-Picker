var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

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
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader','sass-loader'],
					publicPath: '/dist'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: ["html-loader", "pug-html-loader"]
			},
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
	    	// minify: {
	    	// 	collapseWhitespace: true
	    	// },
			hash: true,
			excludeChunks: ['contact'],
			filename: 'index.html',
	    	template: './src/index.pug', // Load a custom template (lodash by default see the FAQ for details)
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
			disabled: false,
			allChunks: true
		})
	]
}