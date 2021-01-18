const { resolve } = require("path");
const fs = require("fs");

const dirPath = resolve(__dirname);

const exportObj = {};


fs.readdirSync(dirPath).forEach((filename) => {
  if (filename === "index.js") return;
  const key = filename.split(".")[0];
  const path = resolve(__dirname, filename);
  exportObj[key] = require(path);
});

module.exports = exportObj;
