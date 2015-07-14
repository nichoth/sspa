var hyperstream = require('hyperstream');
var fs = require('fs');
var tmplStream = fs.createReadStream(__dirname + '/index.html');

// return html as stream
module.exports = function(page) {
  var hs = hyperstream({
    '#content': page
  });
  return tmplStream.pipe(hs);
};
