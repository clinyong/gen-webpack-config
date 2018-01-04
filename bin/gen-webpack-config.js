const fse = require("fs-extra");
const path = require("path");

const configPath = path.resolve(__dirname, "../config");
const pkgPath = path.resolve(__dirname, "../package.json");
const originPKG = require(pkgPath);
const newPKG = require(path.resolve("./package.json"));

fse
	.copy(configPath, "webpack")
	.then(() => {
		console.log("move success");
	})
	.catch(e => {
		console.log(e);
	});

newPKG.devDependencies = originPKG.devDependencies;
newPKG.scripts = originPKG.scripts;

fse
	.writeJson("./package.json", newPKG, { spaces: 4 })
	.then(() => {
		console.log("update package.json success!");
	})
	.catch(e => {
		console.log(e);
	});
