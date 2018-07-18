var fs = require("fs");
var logger = require('./log');
var log = logger.log;
var dir_reader = require("./directory-reader");
var getCoreModules = require("./core-module-lister");


function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath); //delete
      }
    });
    fs.rmdirSync(path);
  }
};

function search(directory, options, callback){
  dir_reader.walk(directory, walkerCallback);
  const core_modules = getCoreModules();
  logger.setLoggingOptions(options);
  function walkerCallback(err, results) {
    var matches,
      success = true;
    if (err) callback(false, err);
    for (const abspath of results) {
      var content = fs.readFileSync(abspath, "utf8");
      var regex = /require\('(.*)'\)/g;
      while ((matches = regex.exec(content))) {
        if (core_modules.includes(matches[1])) {
          log(abspath, matches[1]);
          success = false;
        }
      }
    }
    success ? log("Green Flag: Free of core modules") : log("Red Flag: Contains few Core Modules");
    callback(err, success);
  }
}

module.exports = {
  deleteFolderRecursive, 
  search
};

