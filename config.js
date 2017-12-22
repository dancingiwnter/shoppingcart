var fs = require("fs");
var groceries = JSON.parse(fs.readFileSync('config.json', 'utf8'));
module.exports = groceries;