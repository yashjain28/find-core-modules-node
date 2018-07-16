var fs = require('fs');
function walk(dir, callback) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return callback(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return callback(null, results);
      file = dir + "/" + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          if (file.endsWith(".js")) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
};

module.exports = {walk};