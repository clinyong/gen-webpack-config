const notifier = require("node-notifier");

exports.alertSuccess = function alertSuccess(message) {
	notifier.notify({
		title: "webpack",
		message
	});
};
