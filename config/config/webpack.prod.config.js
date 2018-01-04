const genConfig = require("./webpack.common");
const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = genConfig(true);
const config = merge(baseConfig, {
	output: {
		filename: "js/[name].[chunkhash:6].js",
		chunkFilename: "js/[name].[chunkhash:6].chunk.js"
	},
	devtool: false,
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.HashedModuleIdsPlugin()
	]
});

module.exports = config;
