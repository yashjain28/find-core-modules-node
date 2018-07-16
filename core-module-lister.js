const fs = require('fs');
function getCoreModules(filename) {
  var natives = process.binding("natives");
  var core_node_modules = [];
  for (var key in natives) {
    if (key.indexOf("_") !== 0 && key.indexOf("/") === -1) {
      core_node_modules.push(key);
    }
  }
  if(filename){
    fs.writeFileSync(filename, core_modules);
  }
  return core_node_modules;
}

module.exports = getCoreModules;