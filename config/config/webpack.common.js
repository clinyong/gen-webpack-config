const path = require("path");
const webpack = require("webpack");
const DllLinkPlugin = require("dll-link-webpack-plugin");

function resolve(p) {
	return path.resolve(__dirname, p);
}

const babelOptions = {
	presets: [
		[
			"@babel/preset-env",
			{
				modules: false
			}
		],
		"@babel/preset-react"
	]
};

const outputPath = resolve("../../dist");

function genDllConfig(isProd) {
	const env = isProd ? "production" : "development";
	const filename = isProd
		? `js/[name].[chunkhash:8].dll.js`
		: "[name].dll.js";

	const library = "[name]_lib";
	return {
		entry: {},
		output: {
			filename,
			path: outputPath,
			library
		},
		plugins: [
			new webpack.DllPlugin({
				path: "[name]-manifest.json",
				name: library,
				context: outputPath
			}),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify(env)
			})
		].concat(
			isProd
				? [
						new webpack.optimize.UglifyJsPlugin({
							compress: {
								warnings: false
							}
						}),
						new webpack.HashedModuleIdsPlugin(),
						new webpack.optimize.ModuleConcatenationPlugin()
					]
				: []
		)
	};
}

function genConfig(isProd = false) {
	return {
		entry: {},
		output: {
			path: outputPath
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, loader: "ts-loader" },
				{
					test: /\.jsx?$/,
					use: {
						loader: "babel-loader",
						options: babelOptions
					}
				},
				{
					test: /\.less$/,
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: {
								modules: true,
								localIdentName:
									"[folder]--[local]--[hash:base64:5]",
								importLoaders: 1
							}
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: function() {
									return [require("autoprefixer")];
								}
							}
						},
						"less-loader"
					]
				}
			]
		},
		plugins: [
			new DllLinkPlugin({
				config: genDllConfig(isProd),
				appendVersion: isProd,
				assetsMode: true,
				htmlMode: true
			})
		]
	};
}

module.exports = genConfig;
