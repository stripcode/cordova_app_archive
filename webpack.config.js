const path = require("path")

module.exports = {

	entry: "./src/js/app.js",

	output: {
		path: path.resolve(__dirname, "www"),
		filename: "app.js"
	},

	devtool: "source-map",

	resolve: {
		alias: {
			templates: path.resolve(__dirname, "src/templates/")
		},
	},

	module: {
		rules:[{
			test: /.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
			}
		},{

			test: /.tpl$/,
			exclude: /node_modules/,
			use: {
				loader:"twig-loader"
			}
		},{
      test: /\.(css|html|eot|ttf|svg|woff)$/,
      use: [
        'file-loader?name=[name].[ext]'
      ]
    }]
	},

	node: {
		// Херня необходимая для твига
        fs: "empty" // avoids error messages
    }

}