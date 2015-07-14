var fs = require('fs');

// return html as stream
module.exports = fs.createReadStream(__dirname + '/index.html');
