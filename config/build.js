const webpackConfig = require("./config/webpack.prod.config");
const webpack = require("webpack");
const chalk = require("chalk");
const ora = require("ora");
const { alertSuccess } = require("./utils");

const spinner = ora("webpack building...");
spinner.start();
webpack(webpackConfig, (err, stats) => {
	spinner.stop();
	if (err) reject(err);
	process.stdout.write(
		stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + "\n\n"
	);
	console.log(chalk.cyan("  Build complete.\n"));
	alertSuccess("Build successfully.");
});
