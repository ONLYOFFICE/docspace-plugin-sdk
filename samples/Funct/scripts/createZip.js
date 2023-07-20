const JSZip = require("jszip");
const fs = require("fs");

const zip = new JSZip();

const jsData = fs.readFileSync(`./dist/Funct.js`, "utf-8");
const jsonData = fs.readFileSync(`package.json`, "utf-8");

const jsonDataObj = JSON.parse(jsonData);

const docspace = {
  name: jsonDataObj.name,
  version: jsonDataObj.version,
  description: jsonDataObj.description,
  license: jsonDataObj.license,
  author: jsonDataObj.author,
  pluginName: jsonDataObj.pluginName,
  scopes: jsonDataObj.scopes,
};

zip.file("Funct.js", jsData);
zip.file("docspace.json", JSON.stringify(docspace, null, 2));

if (fs.existsSync("./assets")) {
  const assetsFiles = fs.readdirSync("./assets");

  assetsFiles.forEach((file) => {
    const data = fs.readFileSync(`./assets/${file}`, "base64");
    zip.file(`assets/${file}`, data, { base64: true });
  });
}

zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
  fs.writeFileSync("./dist/plugin.zip", content);
});
