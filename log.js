const fs = require('fs');
var LOG_MODE = 'log';
const TO_FILE = "tofile";
const DEFAULT_LOG_FILE = "./default_logger.log";
var logFile = DEFAULT_LOG_FILE; 
function setLoggingOptions(options){
    if(!options) return;
    LOG_MODE = options.logmode || LOG_MODE;
    if(LOG_MODE.toLowerCase() === TO_FILE){
      logFile = options.logfile || DEFAULT_LOG_FILE;
    }
}

function log(...content) {
  switch (LOG_MODE) {
    case "debug":
      console.debug(...content);
      break;
    case TO_FILE:
      var data = content.join(" ")+ "\n";
      console.log(data);
      fs.appendFileSync(logFile,data);
      break;
    case "log":
    default:
      console.log(...content);
      
  }
}

module.exports = {
  log,
  setLoggingOptions
};
