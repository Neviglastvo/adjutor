const paths = require("./config/paths");
const express = require("express");
const path = require("path");
const PACKAGE = require(paths.appPackageJson);

const app = express();

require("dotenv").config({
	path: ".env",
});
const environment = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, "./build"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const mockResponse = {
	foo: "bar",
	bar: "foo",
	version: PACKAGE.version,
};

app.use(express.static(DIST_DIR)); // NEW
app.get("/ping", (req, res) => {
	res.send(mockResponse);
});
app.get("*", (req, res) => {
	res.sendFile(HTML_FILE); // EDIT
});
app.listen(port, function () {
	console.warn("environment: ", environment);
	console.warn(`> Ready on http://localhost:${port}`);
});
