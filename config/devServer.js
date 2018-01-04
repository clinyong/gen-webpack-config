const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./config/webpack.dev.config");

const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
	logLevel: "silent",
	headers: {
		"Access-Control-Allow-Origin": "*"
	}
});
const hotMiddle = webpackHotMiddleware(compiler, {
	log: false
});
app.use(devMiddleware);
app.use(hotMiddle);

const port = 3435;
const host = "0.0.0.0";
devMiddleware.waitUntilValid(() => {
	console.log(`Listening at: http://127.0.0.1:${port}`);
});
console.log("> Starting dev server...");
app.listen(port, host);
