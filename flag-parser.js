const path = require('path');
const DEFAULT_LOG_FILE = "./default_logger.log";
const DEFAULT_LOG_MODE = "log";
const DEFAULT_DIR = path.join(__dirname, "./node_modules");
//console.log("logging default dir: ",DEFAULT_DIR);
const TO_FILE = "toFile";
function parseFlags(){
    var dir = DEFAULT_DIR;
    var logFile = DEFAULT_LOG_FILE;
    var logMode = DEFAULT_LOG_MODE;
    var packageName = "";
    if (process.argv.indexOf("--dir") !== -1){
      dir = process.argv[process.argv.indexOf("--dir") + 1]; 
    }
    
    if (process.argv.indexOf("--log-mode") !== -1) {
      logMode = process.argv[process.argv.indexOf("--log-mode") + 1];
      if (logMode === TO_FILE && process.argv.indexOf("--log-file") != -1) {
        logFile = process.argv[process.argv.indexOf("--log-file") + 1]; //grab the next item
      } 
    }

    if (process.argv.indexOf("--package") !== -1) {
      packageName = process.argv[process.argv.indexOf("--package") + 1];
    }

    return {
        logFile,
        logMode,
        dir,
        packageName        
    }
}



module.exports = {parseFlags};


