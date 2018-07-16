
var fs = require("fs");
var log = require("./log").log;
var dir_reader = require("./directory-reader");
var getCoreModules = require("./core-module-lister");
var flag_parser = require('./flag-parser');
const core_modules = getCoreModules();
const flags = flag_parser.parseFlags();


const directory = flags.dir;
log("Currently reading dir: ", directory);
dir_reader.walk(directory, walkerCallback);

function walkerCallback(err, results) {
  var matches, success = true;
  if (err) throw err;
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
  (success)?log("Free of core modules"):log("Contains few Core Modules");
}

