const genConfig = require("./webpack.common");
const merge = require("webpack-merge");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const webpack = require("webpack");

const baseConfig = genConfig();
const config = merge(baseConfig, {
	output: {
		filename: "[name].js",
		chunkFilename: "[name].chunk.js"
	},
	devtool: "cheap-module-eval-source-map",
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development")
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsPlugin()
	]
});

module.exports = config;
