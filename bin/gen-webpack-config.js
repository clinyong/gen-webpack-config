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

for (let i in originPKG.devDependencies) {
	if (newPKG.devDependencies[i] || newPKG.dependencies[i]) {
		delete originPKG.devDependencies[i];
	}
}

newPKG.devDependencies = Object.assign(
	{},
	newPKG.devDependencies,
	originPKG.devDependencies
);
newPKG.scripts = Object.assign({}, newPKG.scripts, originPKG.scripts);

fse
	.writeJson("./package.json", newPKG, { spaces: 4 })
	.then(() => {
		console.log("update package.json success!");
	})
	.catch(e => {
		console.log(e);
	});
