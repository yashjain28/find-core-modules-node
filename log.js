const fs = require('fs');
const LOG_MODE = 'log';
const TO_FILE = "toFile";
const DEFAULT_LOG_FILE = "./default_logger.log";
const logFile = DEFAULT_LOG_FILE; 
function setMode(mode, filename){
    LOG_MODE = mode || LOG_MODE;
    if(LOG_MODE === TO_FILE){
      logFile = filename || DEFAULT_LOG_FILE;
    }
}
function log(...content) {
  switch (LOG_MODE) {
    case "debug":
      console.debug(...content);
      break;
    case TO_FILE:
      fs.appendFileSync(logFile, ...content);
      break;  
    case "log":
    default:
      console.log(...content);
      
  }
}

module.exports = {
    log, setMode
}
