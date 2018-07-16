const DEFAULT_LOG_FILE = "./default_logger.log";
const DEFAULT_LOG_MODE = "log";
const DEFAULT_DIR = path.join(__dirname, "node_modules");
const TO_FILE = "toFile";
function parseFlags(){
    var dir = DEFAULT_DIR;
    var logFile = DEFAULT_LOG_FILE;
    var logMode = DEFAULT_LOG_MODE;
    if (process.argv.indexOf("--dir") !== -1){
      dir = process.argv[process.argv.indexOf("--file") + 1]; 
    }
    
    if (process.argv.indexOf("--log-mode") !== -1) {
      logMode = process.argv[process.argv.indexOf("--log-mode") + 1];
      if (logMode === TO_FILE && process.argv.indexOf("--log-file") != -1) {
        logFile = process.argv[process.argv.indexOf("--log-file") + 1]; //grab the next item
      } 
    }
    return {
        logFile,
        logMode,
        dir        
    }
}



module.exports = {parseFlags};


