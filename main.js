

const flag_parser = require('./flag-parser');
const flags = flag_parser.parseFlags();
const helper = require('./helper');
const mkdirp = require("mkdirp");
const crypto = require("crypto");
const exec = require("child_process").exec;
const path = require('path')

const cwd = process.cwd();
const packageName = flags.packageName;
if (!packageName) {
  console.log("Package name not passed");
  process.exit(1);
}

const hashedValue = crypto
  .createHash("md5")
  .update(packageName)
  .digest("hex");
const directory = path.join(cwd, hashedValue);

mkdirp.sync(directory);

options = {
    cwd:directory
}
const command = "npm init --loglevel=error -y && npm i --loglevel=error " + flags.packageName;
var child = exec(command, options,  function(err, stdout, stderr){
    if(err){
        console.log("error: ", err);
        helper.deleteFolderRecursive(directory);
        return;
    }
    console.log(`stdout: ${stdout}`);
    
    if(stderr) console.log(`stderr: ${stderr}`);
    const package = path.join(directory, "node_modules");
    const searchOptions = {
        logfile:flags.logFile,
        logmode:flags.logMode
    }
    console.log("Searching: ", package);
    helper.search(package,searchOptions,  function(err, success){
        helper.deleteFolderRecursive(directory);
    });
});